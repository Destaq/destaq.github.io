#!/usr/bin/env python3
"""Make the smaller copies of the post header pictures.

Reads `header.image` from the front matter of everything in _posts and _pages,
writes assets/lexicon/hdr/<name>.webp (at most 1600px wide) for the page and
assets/lexicon/hdr/<name>-card.jpg (1200 x 630 where the picture allows, cut from
the middle unless CARD_HOW says otherwise) for link previews, and lists the results in _data/hdr.yml, which
_layouts/single.html and _layouts/default.html read.

Run it from anywhere after adding a post with a new header picture:

    python3 _tools/post-headers.py

Needs `cwebp` (brew install webp). The cards also need ImageMagick, and
`rsvg-convert` for an SVG poster; without them the cards are skipped and the post
shares its original picture. Remote pictures are left alone. An SVG is not
copied; one whose first shape is a rectangle covering the whole canvas (a poster
with its own background, not a logo) is listed as `full` so the layout shows it
edge to edge instead of on a logo plate.
"""
import pathlib
import re
import shutil
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "lexicon" / "hdr"
DATA = ROOT / "_data" / "hdr.yml"
MAX_W = 1600
CARD = (1200, 630)
# Cards are cut from the middle unless listed here: ("cut", <ImageMagick gravity>) keeps another part of the
# picture; ("fit", <colour>) keeps all of a very wide picture and fills above and below it with that colour.
CARD_HOW = {
    "cool_timer": ("cut", "east"),
    "pack_offers": ("fit", "white"),
}
RASTER = {".jpg", ".jpeg", ".png"}


def header_images():
    seen = []
    files = sorted((ROOT / "_posts").glob("*.md")) + sorted((ROOT / "_pages").rglob("*.*"))
    for f in files:
        text = f.read_text(encoding="utf-8")
        m = re.match(r"---\n(.*?)\n---", text, re.S)
        if not m:
            continue
        block = re.search(r"^header:\s*\n((?:[ \t]+.*\n?)+)", m.group(1) + "\n", re.M)
        if not block:
            continue
        img = re.search(r"^[ \t]+image:\s*(\S+)", block.group(1), re.M)
        if img and img.group(1) not in seen:
            seen.append(img.group(1).strip("\"'"))
    return seen


def size(path):
    out = subprocess.run(["webpinfo", str(path)], capture_output=True, text=True).stdout
    w = re.search(r"Width:\s*(\d+)", out)
    h = re.search(r"Height:\s*(\d+)", out)
    return int(w.group(1)), int(h.group(1))


def source_width(path):
    out = subprocess.run(["sips", "-g", "pixelWidth", str(path)], capture_output=True, text=True).stdout
    m = re.search(r"pixelWidth:\s*(\d+)", out)
    return int(m.group(1)) if m else 0


def dims(path):
    out = subprocess.run(["magick", "identify", "-format", "%w %h", f"{path}[0]"], capture_output=True, text=True).stdout
    w, h = out.split()
    return int(w), int(h)


def card(src, name):
    """Cut the link-preview picture from the middle of `src`. Returns its (w, h), or None if it could not be made."""
    if not shutil.which("magick"):
        return None
    tmp = None
    if src.suffix.lower() == ".svg":
        if not shutil.which("rsvg-convert"):
            return None
        tmp = OUT / (name + "-card.tmp.png")
        subprocess.run(["rsvg-convert", "-h", str(CARD[1]), str(src), "-o", str(tmp)], check=True)
        src = tmp
    how, arg = CARD_HOW.get(name, ("cut", "center"))
    dst = OUT / (name + "-card.jpg")
    save = ["-strip", "-sampling-factor", "4:2:0", "-interlace", "Plane", "-quality", "84", str(dst)]
    sw, sh = dims(src)
    if how == "fit":
        w = min(CARD[0], sw)
        h = round(w * CARD[1] / CARD[0])
        subprocess.run(["magick", f"{src}[0]", "-auto-orient", "-background", arg, "-alpha", "remove",
                        "-resize", f"{w}x{h}>", "-gravity", "center", "-extent", f"{w}x{h}", *save], check=True)
        if tmp:
            tmp.unlink()
        return dims(dst)
    # never enlarge: a small picture gives a smaller card of the same shape
    scale = min(1, max(CARD[0] / sw, CARD[1] / sh))
    w = min(CARD[0], round(sw * scale))
    h = round(w * CARD[1] / CARD[0])
    if h > round(sh * scale):
        h = round(sh * scale)
        w = round(h * CARD[0] / CARD[1])
    subprocess.run(["magick", f"{src}[0]", "-auto-orient", "-background", "white", "-alpha", "remove",
                    "-resize", f"{w}x{h}^", "-gravity", arg, "-extent", f"{w}x{h}", *save], check=True)
    if tmp:
        tmp.unlink()
    return dims(dst)


def full_bleed(path):
    """(width, height) if the SVG opens with a rectangle covering its whole canvas, else None."""
    text = path.read_text(encoding="utf-8", errors="replace")
    root = re.search(r"<svg\b[^>]*>", text)
    if not root:
        return None
    w = re.search(r'\bwidth="(\d+)(?:px)?"', root.group(0))
    h = re.search(r'\bheight="(\d+)(?:px)?"', root.group(0))
    first = re.search(r"<(rect|path|circle|ellipse|polygon|g|image|use)\b[^>]*>", text[root.end():])
    if not (w and h and first and first.group(1) == "rect"):
        return None
    rw = re.search(r'\bwidth="(\d+)"', first.group(0))
    rh = re.search(r'\bheight="(\d+)"', first.group(0))
    if rw and rh and rw.group(1) == w.group(1) and rh.group(1) == h.group(1) and not re.search(r'\b[xy]="[1-9]', first.group(0)):
        return int(w.group(1)), int(h.group(1))
    return None


def main():
    if not shutil.which("cwebp"):
        sys.exit("cwebp not found (brew install webp)")
    OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    svgs = []
    for img in header_images():
        if "://" in img:
            continue
        src = ROOT / img.lstrip("/")
        if src.suffix.lower() == ".svg" and src.exists():
            box = full_bleed(src)
            if box:
                name = src.name.split(".")[0]
                svgs.append((name, *box, card(src, name)))
                print(f"{src.name:36} full-bleed SVG, used as is  {box[0]}x{box[1]}")
            continue
        if src.suffix.lower() not in RASTER or not src.exists():
            continue
        dst = OUT / (src.name.split(".")[0] + ".webp")
        cmd = ["cwebp", "-quiet", "-q", "80", "-m", "6"]
        if source_width(src) > MAX_W:
            cmd += ["-resize", str(MAX_W), "0"]
        subprocess.run(cmd + [str(src), "-o", str(dst)], check=True)
        w, h = size(dst)
        rows.append((dst.stem, w, h, card(src, dst.stem)))
        print(f"{src.name:36} {src.stat().st_size // 1024:>5} KB -> {dst.stat().st_size // 1024:>4} KB  {w}x{h}")
    lines = ["# Written by _tools/post-headers.py; do not edit by hand."]
    share = lambda c: f", card: {{ w: {c[0]}, h: {c[1]} }}" if c else ""
    lines += [f"{name}: {{ w: {w}, h: {h}{share(c)} }}" for name, w, h, c in sorted(rows)]
    lines += [f"{name}: {{ w: {w}, h: {h}, full: true{share(c)} }}" for name, w, h, c in sorted(svgs)]
    DATA.write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()

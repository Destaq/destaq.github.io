#!/usr/bin/env python3
"""Make the smaller copies of the post header pictures.

Reads `header.image` from the front matter of everything in _posts and _pages,
writes assets/lexicon/hdr/<name>.webp (at most 1600px wide) and lists the
results in _data/hdr.yml, which _layouts/single.html reads.

Run it from anywhere after adding a post with a new header picture:

    python3 _tools/post-headers.py

Needs `cwebp` (brew install webp). SVG and remote pictures are left alone.
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


def main():
    if not shutil.which("cwebp"):
        sys.exit("cwebp not found (brew install webp)")
    OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    for img in header_images():
        if "://" in img:
            continue
        src = ROOT / img.lstrip("/")
        if src.suffix.lower() not in RASTER or not src.exists():
            continue
        dst = OUT / (src.name.split(".")[0] + ".webp")
        cmd = ["cwebp", "-quiet", "-q", "80", "-m", "6"]
        if source_width(src) > MAX_W:
            cmd += ["-resize", str(MAX_W), "0"]
        subprocess.run(cmd + [str(src), "-o", str(dst)], check=True)
        w, h = size(dst)
        rows.append((dst.stem, w, h))
        print(f"{src.name:36} {src.stat().st_size // 1024:>5} KB -> {dst.stat().st_size // 1024:>4} KB  {w}x{h}")
    lines = ["# Written by _tools/post-headers.py; do not edit by hand."]
    lines += [f"{name}: {{ w: {w}, h: {h} }}" for name, w, h in sorted(rows)]
    DATA.write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()

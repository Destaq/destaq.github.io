---
title: "Preview Changes"
tags:
- setup
weight: -2
---

If you'd like to preview what your Quartz site looks like before deploying it to the internet, the following
instructions guide you through installing the proper dependencies to run it locally.


## Install `hugo-obsidian`
This step will generate the list of backlinks for Hugo to parse. Ensure you have [Go](https://golang.org/doc/install) (>= 1.16) installed.

```bash
# Install and link `hugo-obsidian` locally
go install github.com/jackyzha0/hugo-obsidian@latest
```

If you are running into an error saying that `command not found: hugo-obsidian`, make sure you set your `GOPATH` correctly! This will allow your terminal to correctly recognize hugo-obsidian as an executable.

Afterwards, start the Hugo server as shown above and your local backlinks and interactive graph should be populated!

##  Installing Hugo
Hugo is the static site generator that powers Quartz. [Install Hugo with "extended" Sass/SCSS version](https://gohugo.io/getting-started/installing/) first. Then,

```bash
# Navigate to your local Quartz folder
cd <location-of-your-local-quartz>

# Start local server
make serve

# View your site in a browser at http://localhost:1313/
```

> [!INFO] Docker Support
>
> If you have Docker installed already, open your terminal, navigate to your folder with Quartz and run `make docker`

Now that you are happy with how your Quartz instance looks, let's get it hosted!

> 🌍 Step 5: [Hosting Quartz online!](notes/hosting.md)

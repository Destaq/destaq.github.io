---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: splash
author_profile: true # impossible with splash layout
# title: "Simon Ilincev"

header:
    overlay_color: "#000"
    overlay_filter: "0.5"
    overlay_image: /assets/images/splash.gif
    actions:
        - label: "About me..."
          url: "https://simonilincev.com/about/"
        - label: "Portfolio..."
          url: "https://simonilincev.com/portfolio/"

excerpt: "Full-stack Golang & TypeScript developer interested in server-side web development and automation."
intro:
    - excerpt: "Hi, I'm Simon, an American freshman currently studying Computer Science at Cornell. I enjoy programming and language learning, and primarily develop with Go and Svelte."

feature_row:
    - image_path: assets/images/readable.png
      alt: "utility program"
      title: "Efficiency"
      excerpt: "I strive to write clean, concise, and readable code that gets the job done."
    - image_path: /assets/images/repos.png
      alt: "github repos overview"
      title: "Transparency"
      excerpt: "Many of my projects are open-source on GitHub with permissive licenses."
      url: "https://simonilincev.com/portfolio/"
      btn_label: "View my work..."
      btn_class: "btn--primary"
    - image_path: /assets/images/analytics.png
      alt: "pageview chart"
      title: "Effectiveness"
      excerpt: "My work has been viewed and used by thousands globally."

feature_row2:
    - image_path: /assets/images/blogpost.png
      alt: "sample blog post"
      title: "Sharing my knowledge"
      excerpt: "The road to programming mastery is long and difficult, but an open-mind towards sharing and connected community go a good way towards resolving this. And so, I document my journey, tips, and tricks in my personal blog."
      url: "https://simonilincev.com/blog/"
      btn_label: "Explore the blog..."
      btn_class: "btn--primary"

feature_row3:
    - image_path: /assets/images/books.jpg
      alt: "java book and python book"
      title: "Constantly Learning"
      excerpt: 'My graduation quote and daily mantra is Mahatma Gandhi''s: *"Live as if you were to die tomorrow. Learn as if you were to live forever."* I take this to heart as I spend most all my free time working on projects, mastering courses, and reading educational books.'
      url: "https://simonilincev.com/downloads/Simon_Ilincev_Resume.pdf"
      btn_label: "See my skills..."
      btn_class: "btn--primary"

feature_row4:
    - image_path: /assets/images/email.png
      alt: "java email class"
      title: "Contact Me"
      excerpt: "If you have any questions, offers, or comments, please don't hesitate to let me know! You can reach me at `simon [at] simonilincev [dot] com` or [on GitHub](https://github.com/Destaq)."
      url: "mailto:simon@simonilincev.com"
      btn_label: "Send an email..."
      btn_class: "btn--primary"
---

{% include feature_row id="intro" type="center" %}

{% include feature_row %}

{% include feature_row id="feature_row2" type="left" %}

{% include feature_row id="feature_row3" type="right" %}

{% include feature_row id="feature_row4" type="center" %}

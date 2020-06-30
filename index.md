---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: splash
author_profile: true # impossible with splash layout
title: "Simon Ilincev"

header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/splash.gif
  actions:
    - label: "About me..."
      url: "https://simonilincev.com/about/"

excerpt: "Backend programmer on the software engineering route interested in machine learning and data analysis."
intro: 
  - excerpt: "Hi, I'm Simon, an American high schooler currently living in Europe. I deeply enjoy programming and writing, and code in Python, Java, and JavaScript."

feature_row:
  - image_path: assets/images/readable.png
    alt: "utility program"
    title: "Efficiency"
    excerpt: "I strive to write clean, concise, and readable code that gets the job done."
  - image_path: /assets/images/repos.png
    alt: "github repos overview"
    title: "Transparency"
    excerpt: "Most of my projects are open-source on GitHub with permissive licenses."
    url: "https://simonilincev.com/portfolio/"
    btn_label: "More projects..."
    btn_class: "btn--primary"
  - image_path: /assets/images/pypidownloads.png
    alt: "downloads count"
    title: "Effectiveness"
    excerpt: "My work has been viewed and used by thousands globally."

feature_row2:
  - image_path: /assets/images/blogpost.png
    alt: "sample blog post"
    title: "Sharing my knowledge"
    excerpt: 'The road to programming mastery is *long and difficult*, and I believe that the easier we can make it for people, the better. I document my journey, tips, and tricks in my coding blog.'
    url: "https://simonilincev.com/blog/"
    btn_label: "See the blog..."
    btn_class: "btn--primary"

feature_row3:
  - image_path: /assets/images/books.jpg
    alt: "java book and python book"
    title: "Constantly Learning"
    excerpt: "As the great American scientist Benjamin Franklin once said: 
    *Without continual growth and progress, such words as improvement, achievement, and success have no meaning*. I take this to heart as I spend my free time working on projects, mastering courses, and reading educational books."
    url: "https://simonilincev.com/timeline/"
    btn_label: "View my journey..."
    btn_class: "btn--primary"

feature_row4:
  - image_path: /assets/images/email.png
    alt: "java email class"
    title: "Contact Me"
    excerpt: "If you have any questions, offers, or comments, please don't hesitate to let me know! You can reach me at `simon@simonilincev.com` or [on GitHub](https://github.com/Destaq)."
    url: "mailto:simon@simonilincev.com"
    btn_label: "Send me an email..."
    btn_class: "btn--primary"

---

{% include feature_row id="intro" type="center" %}

{% include feature_row %}

{% include feature_row id="feature_row2" type="left" %}

{% include feature_row id="feature_row3" type="right" %}

{% include feature_row id="feature_row4" type="center" %}

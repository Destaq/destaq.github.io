---
title: Portfolio
permalink: /portfolio/
toc: true
toc_sticky: true
excerpt: Simon Ilincev's portfolio, demonstrating programs written primarily in Python and available on GitHub.
gallery:
  - url: https://github.com/Destaq/low-face-mode
    image_path: /assets/images/portfolio/facedocs.png
    alt: "sample documentation"
    title: "low-face-mode documentation"
  - url: https://github.com/Destaq/low-face-mode
    image_path: /assets/images/portfolio/dimming.png
    alt: "the screen dimming"
    title: "dimming and brightening"
  - url: https://github.com/Destaq/low-face-mode
    image_path: /assets/images/portfolio/low_face_mode.png
    alt: "screenshot of github repo"
    title: "open-source github repository"

gallery2:
  - url: https://github.com/Destaq/chess_graph
    image_path: /assets/images/portfolio/downloads.png
    alt: "graph of downloads over time"
    title: "consistent, many downloads"
  - url: https://github.com/Destaq/chess_graph
    image_path: /assets/images/portfolio/color.png
    alt: "colorful pie chart of chess statistics"
    title: "colorful pie chart of statistics"
  - url: https://github.com/Destaq/chess_graph
    image_path: /assets/images/portfolio/main_image.png
    alt: "color bar, chess statistics, game count"
    title: "many useful features"

gallery3:
  - url: https://github.com/Destaq/reddit-wallpapers
    image_path: /assets/images/portfolio/settings.png
    alt: "macOS System Preferences for screensaver"
    title: "system preferences setup"
  - url: https://github.com/Destaq/reddit-wallpapers
    image_path: /assets/images/portfolio/example_background.png
    alt: "man with iron mask example background"
    title: "beautiful, well-designed backgrounds"
  - url: https://github.com/Destaq/reddit-wallpapers
    image_path: /assets/images/portfolio/reddit.png
    alt: "subreddit r/wallpaper"
    title: "taken from a million+ strong Reddit community"

---

## Introduction

Working on projects is my favorite part of programming, and it's my goal to make useful and open-source projects that people can learn from and share. Most of my projects are written in Python and JavaScript, and the frameworks I most commonly use are Nuxt.js (Vue) and Flask (Python).

All of my major projects, and smaller ones too, are hosted on GitHub. You can find their source code and more detailed descriptions on my profile [there](https://github.com/Destaq?tab=repositories).

For a briefer overview, a one-page resume summarizing my computer science accomplishments, skills, and awards can be downloaded [here][1].

## Hackathons Wins
### Develop to Disrupt
I won 'Best Solo Hack' for the first hackathon I participated in, a 48-hour online one with nearly a hundred submissions. The theme was disrupting an industry, and my submission, a language learning tool named SurgeLingo that leveraged natural language processing and PostgreSQL databases to provide learners with personalized sentences, effectivel did this with the foreign language learning industry.

You can view the hackathon submission on the Devpost page [here](https://devpost.com/software/surgelingo), along with a video and more detailed description. Equally, you can run it locally by forking the [backend](https://github.com/Destaq/surgelingo-backend) and [frontend](https://github.com/Destaq/surgelingo-backend) off Github.

![Example of a SurgeLingo sentence](https://res.cloudinary.com/devpost/image/fetch/s--XyRz8T_9--/c_limit,f_auto,fl_lossy,q_auto:eco,w_900/https://raw.githubusercontent.com/Destaq/surgelingo-backend/main/static/surgelingo_example.png){: .align-center}
## Projects
### life-calendar
[Online Life Calendar](https://www.onlinelifecalendar.com) is my most ambitious project ever. In essence, it is a life planner, todo list, and accountability app all wrapped into one. Built with ES6 JavaScript and Python + Flask, the site is hosted at [onlinelifecalendar.com](https://www.onlinelifecalendar.com/).

![Preview of Life Calendar](/assets/images/portfolio/videopreview.png){: .align-center}

**Features**
- View your life anywhere from days to decades
- Color code stages of your life based on events
- Fill out stages of your life with text and images
- Set specific goals for yourself as simple cards
- View detailed statistics about your life and download your own life calendar

...and a lot more! Online Life Calendar is completely free, has over half a hundred users at the time of writing, and I hope that it is a useful tool for motivation and planning. You can view the source code at the repository [here](https://www.github.com/Destaq/life-calendar).

### low-face-mode
{% include gallery caption="**Save your battery** by dimming the screen when not in front of your computer." %}

This is my most popular project, one that has steadily gained stars and downloads on GitHub as well as frequent questions on social media. `low-face-mode` provides an entertaining alternative to constantly shutting down your computer - it simply dims and brightens the screen based on whether or not you are in the camera's view.

It includes:
- custom facial recogntion
- setting up a verified user database
- face detection

The above means that your computer will dim (using AppleScript) and brighten based on whether anyone is in the field of view. I'm planning on expanding it to shut down the computer entirely, but the current project is already in use as [my most starred repo](https://github.com/Destaq/low-face-mode), with 70 stars and counting.

### language-statistics
[![](https://raw.githubusercontent.com/Destaq/language-statistics/master/screenshots/output.svg)](https://github.com/Destaq/language-statistics){: .align-center}

This is perhaps my favorite project, as I love visualizations and statistics. It displays a GitHub repo-esque colorbar for your directory straight from the command-line, which can be viewed as a png or svg image.

I was always greatly annoyed by the fact that the GitHub language bar that showed which languages were in a repo was only limited to GitHub, and could not be run by itself. So, I set out to recreate this as a Python package. Now with my program, you can just run `statistics` from anywhere in your terminal and gain a beautiful colorbar, like the one seen above - and best of all, it's highly customizable.

These are some features, which I trust make it even better than GitHub's `linguist`:
- choose to exclude certain filetypes
- specify the depth to which the program searches from the root directory
- control how your exported image looks
- pick the limit at which files blend into `Other`
- decide the colors used and maximum number of filetypes

This even supports named files, such as a `Dockerfile` or a `Cakefile`. You can find out more by reading the `README.md` at [the repo](https://github.com/Destaq/language-statistics), or even by downloading it yourself.

### wallpaper-learn
[![](https://raw.githubusercontent.com/Destaq/wallpaper-learn/master/screenshots/hanzilearn.png)](https://github.com/Destaq/wallpaper-learn){: .align-center .width-half}
I've recently started learning Mandarin, and I've dabbled in French and Spanish in the past. One thing visibly apparent is that **there is no program to help with passive vocabulary strengthening** - and so I set out to fix this.

Wallpapers are surprisingly easy to control from Python, and Python has a beautiful, albeit not well maintained or known library, `pycairo`. I used `pycairo` to generate images for vocabulary relating to different languages, selectable from the command-line. You could also choose to create images relating to states or countries, and even mix and match.

The result was an ever-shifting Desktop wallpaper with a flashcard theme, one that encouraged learning visually without the added work. For example for Mandarin, this was the Chinese character, pronunciation, category, and meaning (see the images above, and click `Open in new tab` to view them in a larger format. You can also [visit the repository](https://github.com/Destaq/wallpaper-learn)).

### chess-graph
{% include gallery id="gallery2" caption="Get **advanced insight** into your game with a chess visualization." %}

Although I used to play chess when I was younger, I strayed away from the royal game until the coronavirus pandemic of 2020, when more time at home and less spent commuting meant that I had to find more hobbies.

Chess was one such hobby, and I soon grew enamored with the game, often playing for hours each day and reading strategy guides or great games.

Throughout this time spent reading and exploring the chess world, I found that there was a surprising lack of software which helped chess players view their games at a glance and provided a visual representation of their play style. I realized that I had to fill that hole, and so went on to spend a few weeks coding up `chess-graph` with `plotly` and API usage.

I put a lot of effort into this project, allowing players to choose their color, games file, shading, hover tips, etc., and then subsequently released it [on GitHub](https://github.com/Destaq/chess_graph).

### reddit-wallpapers
{% include gallery id="gallery3" caption="Download and cycle through **hundreds of new wallpapers** each day." %}

I always liked having nice backgrounds for my computer, whether I was using it or not. However, the default backgrounds for Mac computers were lackluster at best, and they were often passive and uninteresting. As well as that, they grew old after some time.

So, I decided that I would write a quick Python program that would download *x* number of wallpaper images from Reddit each morning and set them as my custom, shifting wallpaper. Through this project, I learned about setting up bots, the `praw` library, and expanded my knowledge of web scraping with `urrllib`.

When I shared this project online, I was pleased to find that many Mac and even Windows and Linux people were using it. This encouraged me to write a detailed README.md (available as a blog post) about how to setup Reddit bots, and subsequently led to hundreds of clones and 40 stars for [the repository](https://github.com/Destaq/reddit-wallpapers).

## Conclusion
I'm always open to working on new projects, and they are the best part of programming to me - *solving problems through a few lines of code*. It always puts a smile on my face when I see a new download or star, and I hope that I am making a small difference for the people that are using my code.

I hope that in the future I will be able to continue to find novel, interesting projects to work on, and I know that in the meantime I'll continue to educate myself and learn as a programmer.

[1]:{{ site.url }}/downloads/resume_copy.pdf

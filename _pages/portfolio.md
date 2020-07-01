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

gallery4:
  - url: https://github.com/KodyVS/Discord-Bot-Development
    image_path: /assets/images/portfolio/commands.png
    alt: "commands available for bot"
    title: "dozens of available commands"
  - url: https://github.com/KodyVS/Discord-Bot-Development
    image_path: /assets/images/portfolio/tiorun.png
    alt: "bot in action, running code"
    title: "run code in hundreds of languages"
  - url: https://github.com/KodyVS/Discord-Bot-Development
    image_path: /assets/images/portfolio/beeping.png
    alt: "pomodoro timer bot beeping"
    title: "bot joins your voice channels and beeps for you"
---

## Introduction

Working on projects is my favorite part of programming, and it's my goal to make useful and open-source projects that people can learn from and share. Most of my projects are written in Python, as that is the language that I have been using for the longest, but I'm working on smaller JavaScript and Java programs as well in my free time.

All of my major projects are hosted on GitHub, and you can find the source code and more information about theme there.

## Projects
### low-face-mode
{% include gallery caption="**Save your battery** by dimming the screen when not in front of your computer." %}

This is perhaps my most favorite project, one that has steadily gained stars and downloads on GitHub as well as frequent questions on social media. `low-face-mode` provides an entertaining alternative to constantly shutting down your computer - it simply dims and brightens the screen based on whether or not you are in the camera's view.

It includes:
- custom facial recogntion
- setting up a verified user database
- face detection

The above means that your computer will dim (using AppleScript) and brighten based on whether anyone is in the field of view. I'm planning on expanding it to shut down the computer entirely, but the current project is already in use as [my most starred repo](https://github.com/Destaq/low-face-mode), with 70 stars and counting.

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

### discord-programming-bot
{% include gallery id="gallery4" caption="A Discord bot for programmers" %}

Discord is the perfect social media platform for tech-savvy people, and as such it is a meeting place for many programmers. I had the honor of being able to join a small Discord 'server' with about two dozen other serious programmers, and we eventually decided to start working on our very own Discord bot.

Programming Discord bots is quite different from regular Python code, as it frequently encompasses HTML and multithreading. However, this was nonetheless a great challenge for myself and the half-dozen others that I was working with the project on, and we spent many late nights opening pull requests or writing code.

This bot is still in development, but it has many yet-unseen features that I'd like to share, such as:
- running code from multiple languages in Discord (IDE/REPL)
- customizable productivity timers with Opus and `discord[voice]`
- coding leaderboards based on time spent coding
- programming challenges from Project Euler, Daily Programmer, and Reddit
- SQL, private file storage
- Python documentation

Although this program isn't 'free and in the wild', so to speak, it's still [available on GitHub](https://github.com/KodyVS/Discord-Bot-Development) and is being continually worked on. Eventually, our team plans on releasing it to the public so servers around the globe can use all of the bot's functions.

## Conclusion
I'm always open to working on new projects, and they are the best part of programming to me - *solving problems through a few lines of code*. It always puts a smile on my face when I see a new download or star, and I hope that I am making a small difference for the people that are using my code.

I hope that in the future I will be able to continue to find novel, interesting projects to work on, and I know that in the meantime I'll continue to educate myself and learn as a programmer.
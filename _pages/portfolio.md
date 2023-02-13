---
title: Portfolio
permalink: /portfolio/
toc: true
toc_sticky: true
excerpt: Simon Ilincev's portfolio, demonstrating programs written primarily in Python and available on GitHub.
gallery:
  - url:  /assets/images/portfolio/linguakite_landing.png
    image_path: /assets/images/portfolio/linguakite_landing.png
    alt: "landing page"
    title: "linguakite landing page"
  - url: /assets/images/portfolio/linguakite_reading.png
    image_path: /assets/images/portfolio/linguakite_reading.png
    alt: "linguakite wordbank with unknown words highlighted red"
    title: "personalized reading experience"
  - url: /assets/images/portfolio/linguakite_test.png
    image_path: /assets/images/portfolio/linguakite_test.png
    alt: "example article test"
    title: "testing of vocabulary and more"

gallery2:
  - url: /assets/images/portfolio/downloads.png
    image_path: /assets/images/portfolio/downloads.png
    alt: "graph of downloads over time"
    title: "consistent, many downloads"
  - url: /assets/images/portfolio/color.png
    image_path: /assets/images/portfolio/color.png
    alt: "colorful pie chart of chess statistics"
    title: "colorful pie chart of statistics"
  - url: /assets/images/portfolio/main_image.png
    image_path: /assets/images/portfolio/main_image.png
    alt: "color bar, chess statistics, game count"
    title: "many useful features"

gallery3:
  - url: /assets/images/portfolio/settings.png
    image_path: /assets/images/portfolio/settings.png
    alt: "macOS System Preferences for screensaver"
    title: "system preferences setup"
  - url: /assets/images/portfolio/example_background.png
    image_path: /assets/images/portfolio/example_background.png
    alt: "man with iron mask example background"
    title: "beautiful, well-designed backgrounds"
  - url: /assets/images/portfolio/reddit.png
    image_path: /assets/images/portfolio/reddit.png
    alt: "subreddit r/wallpaper"
    title: "taken from a million+ strong Reddit community"

---

Working on projects is my favorite part of programming, and my goal has always been to make useful, open-source tools helpful to others. Most of these tools are written in Python and JavaScript, usually with the NuxtJS and Flask frameworks, and many are hosted on GitHub. You can find their source code and more detailed descriptions there, all easily accessible from [my profile](https://github.com/Destaq).

Alternatively, you can view and/or download [my resume][1] directly from this site or read below.

## Hackathon Wins
### Develop to Disrupt
I won 'Best Solo Hack' for a 48-hour online hackathon with nearly a hundred submissions. The theme was disrupting an industry, and my submission, a language-learning tool named SurgeLingo that leveraged NLP and PostgreSQL to provide learners with personalized sentences did so effectively with the foreign language-learning industry.

You can view the hackathon submission on the Devpost page [here](https://devpost.com/software/surgelingo), along with a video and more detailed description. Equally, you can run it locally by forking the [backend](https://github.com/Destaq/surgelingo-backend) and [frontend](https://github.com/Destaq/surgelingo-backend) off Github.

[![Example of a SurgeLingo sentence](https://res.cloudinary.com/devpost/image/fetch/s--XyRz8T_9--/c_limit,f_auto,fl_lossy,q_auto:eco,w_900/https://raw.githubusercontent.com/Destaq/surgelingo-backend/main/static/surgelingo_example.png)](https://res.cloudinary.com/devpost/image/fetch/s--XyRz8T_9--/c_limit,f_auto,fl_lossy,q_auto:eco,w_900/https://raw.githubusercontent.com/Destaq/surgelingo-backend/main/static/surgelingo_example.png){: .align-center}
## Projects
### life-calendar
[Online Life Calendar](https://www.onlinelifecalendar.com) is a life planner, todo list, and accountability app all wrapped into one. Built with JavaScript and Python + Flask, the site is hosted [here](http://onlinelifecalendar.herokuapp.com/).

[![Preview of Life Calendar]({{ site.url }}{{ site.baseurl }}/assets/images/portfolio/videopreview.png)](/assets/images/portfolio/videopreview.png){: .align-center}

**Features**
- View your life anywhere from days to decades
- Color code stages of your life based on events
- Fill out stages of your life with text and images
- Set specific goals for yourself as simple cards
- View detailed statistics about your life and download your own life calendar

...and a lot more! Online Life Calendar is completely free, has several hundred users at the time of writing, and has personally proven to be a great resource for self-motivation and planning. Its source code can be found [here](https://www.github.com/Destaq/life-calendar).

### linguakite
{% include gallery caption="A few of LinguaKite's features" %}

LinguaKite is a bespoke English-language-learning app that I built over the summer of my junior high school year. A full-stack, NLP-driven app, it offers users the chance to manage and view their wordbank, read graded content, take quizzes to reinforce understanding, and more.

Putting everything together was a challenge, given some of the rather uncommon framework combinations I used to build the app, but [the end result](https://www.github.com/Destaq/linguakite) was of great help to the friend I'd built it for and taught me a lot along the way.

### language-statistics
[![](https://raw.githubusercontent.com/Destaq/language-statistics/master/screenshots/output.svg)](/assets/images/portfolio/clickablesvg.png){: .align-center}

This is perhaps my favorite project, as I love visualizations and statistics. It displays a GitHub repo-esque colorbar for your directory straight from the command-line, which can be viewed as a png or svg image.

I was always rather annoyed by the fact that the GitHub language bar was only limited to GitHub, as the details it offers are quite eye-opening. So, I set out to recreate it as a Python package. Now with my program you can just run `statistics` from anywhere in your terminal and see a beautiful colorbar, like the one seen above — and best of all, one highly customizable.

These are some additional features which give it an edge over GitHub's `linguist`:
- choose to exclude certain filetypes
- specify the depth to which the program searches from the root directory
- control how your exported image looks
- pick the limit at which files blend into `Other`
- decide the colors used and maximum number of filetypes

It even supports named files, such as `Dockerfile` or `Cakefile`. You can find out more by reading the `README.md` at [the repo](https://github.com/Destaq/language-statistics), or downloading it yourself.

### ll-dashboard
[![](https://github.com/Destaq/ll-dashboard/raw/main/images/whole.png)](https://github.com/Destaq/ll-dashboard/raw/main/images/whole.png){: .align-center}

Another language-learning tool, this one was built for me. A serious Chinese language-learner, I'm not quite satisifed with the sites/apps on the market for tracking one's foreign language progress — and so went ahead and built one from scratch for myself.

A minimal yet powerful dashboard was the result, one that offers a lightning-fast, intuitive interface for progress tracking and time logging. I won't go into all the details here as most can be discovered in the image above or documentation [online](https://github.com/Destaq/ll-dashboard).

### chess-graph
{% include gallery id="gallery2" caption="Get **advanced insights** into your game with a chess visualization." %}

Although I used to play chess when I was younger, I strayed from the royal game until the outbreak of COVID-19, when more time at home and less spent commuting meant that I had to find more hobbies. Chess became one such hobby, and I quickly found myself playing or brushing up on strategy for hours a day.

During this time, I noticed there to be a surprising lack of software that visually represented chess players' skills. I realized that I had to fill that hole, and so went on to spend a few weeks coding up `chess-graph` with `plotly`.

I put a lot of effort into this project, and [the latest release](https://github.com/Destaq/chess_graph) now allows players to choose their color, games file, shading, hover tips, etc.

### reddit-wallpapers
{% include gallery id="gallery3" caption="Download and cycle through **hundreds of new wallpapers** each day." %}

A nice computer background can set one's tone for the day, but the default Mac ones quickly grow old.

So, I decided to write a quick Python program that would download a number of images from Reddit each morning and set them as my custom, shifting wallpaper. Through this project, I learned about setting up bots, the `praw` library, and improved my knowledge of web scraping with `urrllib`.

When I shared this project online, I was pleased to find that many Mac and even Windows and Linux users had found it helpful too. This encouraged me to write a detailed README.md (available as a blog post) about how to setup Reddit bots, and subsequently to hundreds of clones and 40 stars for [the repository](https://github.com/Destaq/reddit-wallpapers).

## Conclusion
Above is a representative sample of my work, but if you want to see more, do head over to my [GitHub profile](https://www.github.com/Destaq) or shoot me an email!

[1]:{{ site.url }}/downloads/resume.pdf

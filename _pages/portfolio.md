---
title: Portfolio
permalink: /portfolio/
toc: true
toc_sticky: true
excerpt: Simon Ilincev's portfolio, demonstrating programs written primarily in Python and available on GitHub.
gallery:
    - url: /assets/images/portfolio/linguakite_landing.png
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
---Working on personal projects is my favorite part of programming, and my goal has always been to make useful, open-source tools helpful to others. Most of these tools are written in Python and JavaScript, usually with the NuxtJS and Flask frameworks, and many are hosted on GitHub. You can find their source code and more detailed descriptions there, all easily accessible from [my profile](https://github.com/Destaq).

Alternatively, you can view and/or download [my resume][1] directly from this site or read below.

## Hackathon Wins

### Develop to Disrupt

I won 'Best Solo Hack' for a 48-hour online hackathon with nearly a hundred participants. The theme was disrupting an industry, and my submission, a language-learning tool named SurgeLingo that leveraged NLP and PostgreSQL to provide learners with personalized sentences did so effectively with the foreign language-learning industry.

You can view the hackathon submission on the Devpost page [here](https://devpost.com/software/surgelingo), along with [a corresponding video](https://www.youtube.com/watch?v=lIIGpiJqbz0&ab_channel=SimonIlincev) and more detailed description. Equally, you can run it locally by forking the [backend](https://github.com/Destaq/surgelingo-backend) and [frontend](https://github.com/Destaq/surgelingo-backend) off Github.

[![Example of a SurgeLingo sentence](https://res.cloudinary.com/devpost/image/fetch/s--XyRz8T_9--/c_limit,f_auto,fl_lossy,q_auto:eco,w_900/https://raw.githubusercontent.com/Destaq/surgelingo-backend/main/static/surgelingo_example.png)](https://res.cloudinary.com/devpost/image/fetch/s--XyRz8T_9--/c_limit,f_auto,fl_lossy,q_auto:eco,w_900/https://raw.githubusercontent.com/Destaq/surgelingo-backend/main/static/surgelingo_example.png){: .align-center}

## Projects

### lingotrack

<iframe style="border: none; margin-bottom: 1.25rem; margin-top: 0.5rem;" class="align-center" src="https://cards.producthunt.com/cards/posts/425950?v=1" width="500" height="405" frameborder="0" scrolling="no" allowfullscreen></iframe>

My passion project from Oct '22 to Nov '23, [Lingotrack](https://www.lingotrack.com) is a social platform for language learners to track progress and find engaging, level-appropriate media. By visualizing learners' achievements, allowing them to uncover captivating foreign content, and connecting them with fellow enthusiasts, the site hopes to make the journey to fluency a little less daunting.

Building Lingotrack has taught me an immense amount, as I tried to do as much as I could from scratch as a learning experience. This involved everything from Stripe integration to managing a cloud-based Linux VM to creating automated CI/CD, as well as no small amount of frustration! But the end result has been more than worth it for me, and I look forward to seeing where the platform goes.

You can find out more about Lingotrack on [the official about page](https://www.lingotrack.com/about) or by checking out [its (well-received!) launch on Product Hunt](https://www.producthunt.com/posts/lingotrack).

### ll-dashboard

[![](https://github.com/Destaq/ll-dashboard/raw/main/images/whole.png)](https://github.com/Destaq/ll-dashboard/raw/main/images/whole.png){: .align-center}

_This is a much simpler, local-only version of [Lingotrack](https://www.lingotrack.com) that served as some inspiration for said later iteration._

`ll-dashboard` is an aesthetic, full-stack language-learning webapp that I built over a couple months in winter COVID-19 lockdown. As serious Chinese language-learner, I'm recently found myself not quite satisifed with the sites on the market for tracking one's foreign language progress — and so did the logical next thing of building one from scratch for myself!

A minimal yet powerful dashboard was the result, one that offers a lightning-fast, intuitive interface for progress tracking and time logging, down to the very minute. Be it file uploads, PostgreSQL-powered timeline visualizations, or even a sleek dark mode, the tool has it all. But in the interest of brevity, I won't go into all the (many!) details here as I've put together detailed documentation [elsewhere online](https://github.com/Destaq/ll-dashboard) and written up my experiences using it for three months [on my blog](https://simonilincev.com/reflections/chinese/100-days-of-tracking/).

### life-calendar

Online Life Calendar is a life planner, todo list, and accountability app all wrapped into one. Built with JavaScript, Python, Flask, & ❤️.

[![Preview of Life Calendar](/assets/images/portfolio/videopreview.png)](/assets/images/portfolio/videopreview.png){: .align-center}

**Features**

-   View your life anywhere from days to decades
-   Color code stages of your life based on events
-   Fill out stages of your life with text and images
-   Set specific goals for yourself as simple cards
-   View detailed statistics about your life and download your own life calendar

...and a lot more! Online Life Calendar is completely free, has several hundred users at the time of writing, and has personally proven to be a great resource for self-motivation and planning. Its source code can be found [here](https://www.github.com/Destaq/life-calendar).

### language-statistics

[![](https://raw.githubusercontent.com/Destaq/language-statistics/master/screenshots/output.svg)](/assets/images/portfolio/clickablesvg.png){: .align-center}

This is perhaps my favorite project, as I have an unhealthy obsession with visualizations and statistics. It displays a GitHub repo-esque colorbar for your directory straight from the command-line, which can be viewed as a png or svg image.

I was always rather annoyed by the fact that the GitHub language bar was only limited to GitHub, as the details it offers are quite eye-opening. So, I set out to recreate it as a Python package. Now with my program you can just run `statistics` from anywhere in your terminal and see a beautiful colorbar, like the one seen above — and best of all, one highly customizable.

These are some additional features which give it an edge over GitHub's `linguist`:

-   choose to exclude certain filetypes
-   specify the depth to which the program searches from the root directory
-   control how your exported image looks
-   pick the limit at which files blend into `Other`
-   decide the colors used and maximum number of filetypes

It even supports named files, such as `Dockerfile` or `Cakefile`. You can find out more by reading the `README.md` at [the repo](https://github.com/Destaq/language-statistics), or downloading it yourself.

### linguakite

{% include gallery %}

LinguaKite is a bespoke English-language-learning app that I built over the summer of my junior high school year. A full-stack, NLP-driven app, it offers users the chance to manage and view their wordbank, read graded content, take quizzes to reinforce understanding, and more.

Putting everything together was a challenge, given some of the rather uncommon framework combinations I used to build the app, but [the end result](https://www.github.com/Destaq/linguakite) was of great help to the friend I'd built it for and taught me a lot along the way.

### chess-graph

{% include gallery id="gallery2" caption="Get **advanced insights** into your game with a chess visualization." %}

Although I used to play chess when I was younger, I strayed from the royal game until the outbreak of COVID-19, when more time at home and less spent commuting meant that I had to find more hobbies. Chess became one such hobby, and I quickly found myself playing or brushing up on strategy for hours a day.

During this time, I noticed there to be a surprising lack of software that visually represented chess players' skills. I realized that I had to fill that hole, and so went on to spend a few weeks coding up `chess-graph` with `plotly`.

I put a lot of effort into this project, and [the latest release](https://github.com/Destaq/chess_graph) now allows players to choose their color, games file, shading, hover tips, etc.

### low-face-mode

A while back, I stumbled upon the `OpenCV` Python library — a tool for computer vision. As I played around with it and unearthed more and greater capabilities, it struck me that I could use it to help address a point of considerable personal frustration: a battery life that had no business being on a MacBook Air.

And so, some fair bit of hacking later, I had a working prototype of `low-face-mode`, a program that would dim my screen when I wasn't looking at it and brighten it when I was. What's more, it was done in real-time, runnable from the command-line, and even allowed for brightening/dimming based on a 'whitelist' of allowed faces.

Unfortunately, as I would soon find out, running a program like this in the background drained a good deal more battery than it saved. But working with the AppleScript programming language, resolving a pull request to support Linux, and all-around learning lots left me with a [finished product](https://github.com/Destaq/low-face-mode) (see [GIF](https://github.com/Destaq/low-face-mode/blob/master/data/sample.gif)) and very happy nonetheless.

## Conclusion

Above is a representative sample of my work, but if you want to see more, do head over to my [GitHub profile](https://www.github.com/Destaq) or shoot me an email!

[1]:{{ site.url }}/downloads/Resume_Simon_Ilincev.pdf

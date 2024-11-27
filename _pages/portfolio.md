---
title: Portfolio
permalink: /portfolio/
toc: true
toc_sticky: true
excerpt: Simon Ilincev's portfolio, demonstrating programs written primarily in Python, TypeScript, and Golang that are often available on GitHub.

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

gallery3:
    - url: /assets/images/portfolio/ColdCraftI.png
      image_path: /assets/images/portfolio/ColdCraftI.png
      alt: "promotional infographic #1"
      title: "focus on interview prep"
    - url: /assets/images/portfolio/ColdCraftII.png
      image_path: /assets/images/portfolio/ColdCraftII.png
      alt: "promotional infographic #2"
      title: "tune settings and hyperparameters"
    - url: /assets/images/portfolio/ColdCraftIII.png
      image_path: /assets/images/portfolio/ColdCraftIII.png
      alt: "promotional infographic #3"
      title: "linkedin and gmail integration"
    - url: /assets/images/portfolio/ColdCraftIV.png
      image_path: /assets/images/portfolio/ColdCraftIV.png
      alt: "promotional infographic #4"
      title: "resume and gcal integration"

gallery_circles:
    - url: /assets/images/portfolio/circles_i.jpg
      image_path: /assets/images/portfolio/circles_i.jpg
      alt: "homepage"
      title: "homepage"
    - url: /assets/images/portfolio/circles_ii.jpg
      image_path: /assets/images/portfolio/circles_ii.jpg
      alt: "new event creation"
      title: "new event creation"
    - url: /assets/images/portfolio/circles_iii.jpg
      image_path: /assets/images/portfolio/circles_iii.jpg
      alt: "finding mutual free times"
      title: "finding mutual free times"
    - url: /assets/images/portfolio/circles_iv.jpg
      image_path: /assets/images/portfolio/circles_iv.jpg
      alt: "memories of events"
      title: "memories of events"
---

Working on personal projects is the most fulfilling sort of programming for me, and this is well-demonstrated by a wealth of successful open- and closed-source products. My goal with these is generally to create useful, technically challenging, and plain *cool* tools, as well as experiment with new technologies and frameworks.

Most such tools are in the full-stack webdev, NLP, or CLI domains, and are primary written in Python (Flask/vanilla), TypeScript (React/Svelte/Vue), and/or Golang. The source code for about a dozen complete projects is available on my [GitHub profile](https://github.com/Destaq), and I've written up more detailed descriptions of a few of the best below.

*For descriptions of work and educational experiences, see my [resume][1].*

## Crème de la Crème

### Lingotrack.com

<iframe style="border: none; margin-bottom: 1.25rem; margin-top: 1.25rem;" class="align-center" src="https://cards.producthunt.com/cards/posts/425950?v=1" width="500" height="405" frameborder="0" scrolling="no" allowfullscreen></iframe>

My passion project from Oct '22 to Nov '23, [Lingotrack](https://www.lingotrack.com) *(50k+ SLOC, Golang + TypeScript + Svelte)* is a social platform for language learners to track progress and find engaging, level-appropriate media. By visualizing learners' achievements, allowing them to uncover captivating foreign content, and connecting them with fellow enthusiasts, the site hopes to make the journey to fluency a little less daunting.

Building Lingotrack has taught me an immense amount, as I tried to do as much as I could from scratch as a learning experience. This involved everything from Stripe integration to managing a cloud-based Linux VM to creating automated CI/CD, as well as no small amount of frustration!

But the end result has been more than worth it — there are nearly a thousand monthly active users, over 1500 media articles in our crowdsourced database, 4.5 *years* worth of learning tracked, and I get fan mail several times a week!

You can find out more about Lingotrack on [the official about page](https://www.lingotrack.com/about) or by checking out [its well-received launch on Product Hunt](https://www.producthunt.com/posts/lingotrack).

### Locadapt.com

[![](/assets/images/portfolio/english_dashboard.png)](/assets/images/portfolio/english_dashboard.png){: .align-center}

In past lives, I've worked as a translator, contracted i18n dev work for a $40m+-funded startup, and lived in Europe for a decade. Over these experiences, one thing has become abundantly clear: the process of internationalizing (making multilingual) a website is a very beneficial one, but also unreasonably difficult.

Enter [Locadapt](https://locadapt.com) *(25k+ SLOC, TypeScript + React + Svelte + Supabase)*, a Claude-powered platform that takes any site multilingual with two lines of code. By simply adding a minified JS snippet + corresponding CSS to the `head` of any site, the platform can automatically, accurately, and affordably translate any site into multiple languages. **Try it out on this page — there's a button on the bottom right!**

Accomplishments include a translation management dashboard, reverse-proxy service for optimized SEO on subdomains, parallelization with Web Workers, bespoke affiliate program, serverless edge functions, client-side caching, browserless pseudo-DOM rewrites, [detailed documentation](https://docs.locadapt.com), and more.

Currently competing against a couple YC companies, and a well-funded startup in SF tried to poach me, but bullish on the product and sticking it out for now!

## Hackathon Wins

### ColdCraft.ai

{% include gallery id="gallery3" layout="half" %}

[ColdCraft.ai](https://coldcraft.ai) *(~10k SLOC, Flask + TypeScript + Svelte)* is a SaaS cold emailing Chrome extension with an associated dashboard that integrates with your resume, Google Calendar, Gmail, and LinkedIn to help you write hyperpersonalized cold emails in seconds. I built it with a buddy over several weeks freshman spring (SP '24).

The project won [LinkedIn and Cisco](https://cis.cornell.edu/about/outreach-events/boom-bits-our-minds/awards/boom-2024-award-recipients)'s corporate awards during Cornell's annual engineering showcase, and has received several investment and acquisition offers.

### NoteHacks

[![](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/022/518/datas/gallery.jpg)](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/022/518/datas/gallery.jpg){: .align-center}

Friends at Cornell would sometimes poke fun at me for not taking notes in class. However, I found (and still find) that I learn best by concentrating fully on the lecture at hand rather than diluting attention with frantic note-taking.

That said, notes are certainly still very helpful for homework, reinforcement, etc., and so I teamed up with a few likeminded new friends at [Canada's largest hackathon](https://hackthenorth2024.devpost.com/) to build an AI- and CV-powered note-taking tool that could take care of this heavy lifting for us. Our Next.js-, Flask-, and OpenAI-powered tool sits in on lectures, listening and taking summarized Markdown notes that you can later interact with and save. Additionally, gesture-set metaparameters such as summarization level, pausing, and expansion / collapsion of notes are also available.

Our efforts and all-nighters earned us [#1/43](https://devpost.com/software/notehacks-bsjdoi) for the *Best Use of Groq* track (a prominent LLM company).

### Surgelingo

[![Example of a SurgeLingo sentence](https://res.cloudinary.com/devpost/image/fetch/s--XyRz8T_9--/c_limit,f_auto,fl_lossy,q_auto:eco,w_900/https://raw.githubusercontent.com/Destaq/surgelingo-backend/main/static/surgelingo_example.png)](https://res.cloudinary.com/devpost/image/fetch/s--XyRz8T_9--/c_limit,f_auto,fl_lossy,q_auto:eco,w_900/https://raw.githubusercontent.com/Destaq/surgelingo-backend/main/static/surgelingo_example.png){: .align-center}

I won 'Best Solo Hack' for a 48-hour online hackathon with nearly a hundred participants. The theme was disrupting an industry, and my submission, a language-learning tool named SurgeLingo that leveraged NLP and PostgreSQL to provide learners with Twitter-style personalized sentences, did so effectively with the foreign language-learning industry.

You can view the hackathon submission on the Devpost page [here](https://devpost.com/software/surgelingo), along with [a corresponding video](https://www.youtube.com/watch?v=lIIGpiJqbz0&ab_channel=SimonIlincev) and more detailed description. Equally, you can run it locally by forking the [backend](https://github.com/Destaq/surgelingo-backend) and [frontend](https://github.com/Destaq/surgelingo-backend) off Github.

### FindCircles

{% include gallery id="gallery_circles" layout="half" %}

[Circles](https://devpost.com/software/circles-8cfnod) *(~7k SLOC, Next.js + Supabase + Google Cloud)* is a web app for easy, spontaneous meetups within friend groups and connecting with new people, inspired by the experiences of my three project team teammates and me on Cornell's huge campus.

Users can invite friends to form circles, and with GCal integration, Circles automatically finds shared free times and suggests activities. Circles also emails proposed meetup times and events every Monday or on request. The software additionally supports 2 other key features:

1. inviting mutual friends who are free, to encourage making new friends
2. creating shared photo albums for events

The tool won the Best Domain award ([findcircles.co](https://findcircles.co)) from the judges at Cornell's 2024 Big Red Hacks hackathon, and was a student-judge favorite (unfortunately the staff judges were too reminded of their work-related Google Calendars and scheduling 😅).

## Selected Side Projects

### Language Learning Dashboard

[![](https://github.com/Destaq/ll-dashboard/raw/main/images/whole.png)](https://github.com/Destaq/ll-dashboard/raw/main/images/whole.png){: .align-center}

_A simpler, local-only version of [Lingotrack](https://www.lingotrack.com) that served as inspiration for said later iteration._

`language-learning-dashboard` is an aesthetic, full-stack language-learning webapp that I built over a couple months in winter COVID-19 lockdown. As a serious Chinese language-learner, I'm recently found myself not quite satisifed with the sites on the market for tracking one's foreign language progress — and so did the logical thing of building one from scratch for myself!

A minimal yet powerful dashboard was the result, one that offers a lightning-fast, intuitive interface for progress tracking and time logging, down to the very minute. Be it file uploads, PostgreSQL-powered timeline visualizations, or even a sleek dark mode, the tool has it all. But in the interest of brevity, I won't go into all the (many!) details here as I've put together detailed documentation [elsewhere online](https://github.com/Destaq/ll-dashboard) and written up my experiences using it for three months [on my blog](https://simonilincev.com/reflections/chinese/100-days-of-tracking/).

### Online Life Calendar

Online Life Calendar is a life planner, todo list, and accountability app all wrapped into one. Built with Python, Flask, Jinja, and a dash of JavaScript, the tool offers an elegant, responsive interface for tracking your life.

[![Preview of Life Calendar](/assets/images/portfolio/videopreview.png)](/assets/images/portfolio/videopreview.png){: .align-center}

**Features**

-   View your life anywhere from days to decades
-   Color code stages of your life based on events
-   Fill out moments of your life with text and images
-   Set specific goals for yourself as simple cards
-   View detailed statistics about your life and download your own life calendar

...and a lot more! Online Life Calendar is completely free, has several hundred users at the time of writing, and has personally proven to be a great resource for self-motivation and planning. Its source code can be found [here](https://www.github.com/Destaq/life-calendar).

*Update: the site has been taken down due to financial reasons, but the source code is still available on GitHub.*

### Language Statistics

[![](https://raw.githubusercontent.com/Destaq/language-statistics/master/screenshots/output.svg)](/assets/images/portfolio/clickablesvg.png){: .align-center}

I have an unhealthy obsession with visualizations and statistics, and `language-statistics` well-demonstrates that. It displays a GitHub repo-esque colorbar for your directory straight from the command-line, which can be viewed as a PNG or SVG image.

I was always rather annoyed by the fact that the GitHub language bar was only limited to GitHub, as the details it offers are quite eye-opening. So, I set out to recreate it as a Python package. Now with my program you can just run `statistics` from anywhere in your terminal and see a beautiful colorbar, like the one seen above — and best of all, one highly customizable.

These are some additional features which give it an edge over GitHub's `linguist`:

-   choose to exclude certain filetypes
-   specify the depth to which the program searches from the root directory
-   control how your exported image looks
-   pick the limit at which files blend into `Other`
-   decide the colors used and maximum number of filetypes

It even supports named files, such as `Dockerfile` or `Cakefile`. You can find out more by reading the `README.md` at [the repo](https://github.com/Destaq/language-statistics), or downloading it yourself.

### Linguakite

{% include gallery %}

LinguaKite is a bespoke English-language-learning app that I built over the summer of my junior high school year. A full-stack, NLP-driven app with ~5k SLOC worth of Python & Vue, it offers users the chance to manage and view their wordbank, read graded content, take quizzes to reinforce understanding, and more.

Putting everything together was a challenge, given some of the rather uncommon framework combinations I used to build the app, but [the end result](https://www.github.com/Destaq/linguakite) was of great help to the friend I'd built it for and taught me a lot along the way.

### Chess Graph

{% include gallery id="gallery2" caption="Get **advanced insights** into your game with a chess visualization." %}

Although I used to play chess when I was younger, I strayed from the royal game until the outbreak of COVID-19, when more time at home and less spent commuting meant that I had to find more hobbies. Chess became one such hobby, and I quickly found myself playing or brushing up on strategy for hours a day.

During this time, I noticed there to be a surprising lack of software that visually represented chess players' skills. I realized that I had to fill that hole, and so went on to spend a few weeks coding up `chess-graph` with `plotly`.

I put a lot of effort into this project, and [the latest release](https://github.com/Destaq/chess_graph) now allows players to choose their color, games file, shading, hover tips, etc.

### Low Face Mode

A while back, I stumbled upon the `OpenCV` Python library — a tool for computer vision. As I played around with it and unearthed more and greater capabilities, it struck me that I could use it to help address a point of considerable personal frustration: a battery life that had no business being on a MacBook Air.

And so, some fair bit of hacking later, I had a working prototype of `low-face-mode`, a program that would dim my screen when I wasn't looking at it and brighten it when I was. What's more, it was done in real-time, runnable from the command-line, and even allowed for brightening/dimming based on a 'whitelist' of allowed faces.

Unfortunately, as I would soon find out, running a program like this in the background drained a good deal more battery than it saved. But working with the AppleScript programming language, resolving a pull request to support Linux, and all-around learning lots left me with a [finished product](https://github.com/Destaq/low-face-mode) (see [GIF](https://github.com/Destaq/low-face-mode/blob/master/data/sample.gif)) and very happy nonetheless.

## Conclusion

Above is a representative sample of my work, but if you want to see more, do head over to my [GitHub profile](https://www.github.com/Destaq) or shoot me an email!

[1]:{{ site.url }}/downloads/Simon_Ilincev_Resume.pdf

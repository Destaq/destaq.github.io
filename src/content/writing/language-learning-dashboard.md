---
title: 'Winter Holiday Project: A Language Learning Dashboard'
date: '2021-12-25T12:11:24+01:00'
excerpt: As shared recently, I've been spending a lot of time learning Mandarin Chinese
  lately. To track my progress, I've built a language-learning dashboard I'd like
  to share.
description: As shared recently, I've been spending a lot of time learning Mandarin Chinese
  lately. To track my progress, I've built a language-learning dashboard I'd like
  to share.
categories:
  - tutorial
  - resources
  - project
tags:
  - github
  - student
  - learning
draft: false
legacyPath: "/tutorial/resources/project/language-learning-dashboard/"
legacy:
  sourcePath: _posts/2021-12-25-language-learning-dashboard.md
  url: "/tutorial/resources/project/language-learning-dashboard/"
  layout: single
  entriesLayout: grid
  toc: false
  tocSticky: false
  comments: true
heroImage: "/assets/images/posts/dashboard_preview.png"
image:
  src: "/assets/images/posts/dashboard_preview.png"
  alt: a screenshot of the dashboard in action
---

Merry Christmas!

I've spent almost forty hours this winter holiday to work on a small personal project, a dashboard that will help me visualize my Chinese-language learning progress.

Through the process, I've brushed up my Nuxt skills, experimented with the recently released Nuxt 3, and opened up several discussions and issues on GitHub as a result of newly-discovered dependency conflicts. As well as that, I was able to dive into the wonderful world of [Apache Echarts](https://echarts.apache.org/en/index.html), creating beautiful, customized graphs to demonstrate my Mandarin proficiency.

The aim of this project is to have one dedicated place where I can note down my Chinese-learning goals and wins. So far, I've been using the Notes app to keep track of daily activities that I have to get done, and Google Sheets to jot down hours spent learning. While this *gets the job done*, it's simply not enough as:

- moving between multiple apps is a hassle
- it generally takes a lot of time to input data/set new goals/create charts
- information is not customized to a language learners' needs

My language learning dashboard (currently closed-source and just a personal prototype, but I'm considering making it a public website should there be enough interest) solvse this need. It maximizes the useful data output while minimizing the effort needed to input data (thus creating more time for the productive language learning itself). I estimate only ~15 mins a week is needed to input data, a much lower number than before.

The webapp tracks:
- my Chinese-learning goals and deadlines
- daily hours spent learning, and of what category (reading, listening, speaking, etc.)
- distribution between learning activities, such as Class, Watching TV Shows, etc.
- vocabulary size (words and characters), as well as milestones
- stats such as total study hours, total characters read, total books read, etc.

This inputs work through either a file input detailing updates to statistics that aren't easily quantifiable, such as books read, or by sending off a 'custom log' with some basic information about an activity

So far, I've been perfecting various features and testing out the interface, as I won't start tracking until January 1st (as part of my New Year's resolution). But I'll make sure to write a new post at the end of 2022 showcasing all the stat increases!

In the meantime, take a look at the 90-second YouTube video below outlining the features below! And if this seems like it may be useful to you, let me know below — I can share the codebase with you or work on making it public.

<iframe title="YouTube video" src="https://www.youtube.com/embed/yOgAxEVGCCg" loading="lazy" allowfullscreen></iframe>

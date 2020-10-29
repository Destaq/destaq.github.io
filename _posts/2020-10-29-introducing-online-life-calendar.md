---
layout: single
title: "Introducing Online Life Calendar"
date: 2020-10-29 12:00:00 +0100
categories: project resources
entries_layout: grid
tags: time-management productivity tools
toc: true
toc_sticky: true
excerpt: Learn about Online Life Calendar, I site a built to help you visually track and plan your life.
header:
    image: /assets/images/posts/lifecalendarmain.png
    image_description: homepage screenshot of Online Life Calendar
    caption: Online Life Calendar [homepage](https://www.onlinelifecalendar.com)
---

I've recently finished my biggest project yet - [Online Life Calendar](https://www.onlinelifecalendar.com). It's the free time management tool that I've always wished that I had - and when I couldn't find it, I built it.

In this post, I'll share some of the features of Online Life Calendar - available at [onlinelifecalendar.com](https://www.onlinelifecalendar.com), how to get started using it, and details about the code behind this web app. If you'd like to see the code, you can also access the open-source GitHub repository [here](https://github.com/Destaq/life-calendar).

![](/assets/images/posts/appdemo.gif)

## Features
At its core, Life Calendar is a digital journey and daily planner wrapped into one. But, it has many more useful features, which I'll outline below.


- View your life in boxes anywhere from days to decades
- Color-code these "life boxes" to highlight parts of your life
- View insightful statistics about your usage of the site and lifetime
![](/assets/images/posts/statistics.png)
![](/assets/images/posts/goalexample.png){: .align-right}
- Use a fancy editor or Markdown to journal your days (supports images and tables too)
- Set and track colored, detailed goals
- Print or download your own "life calendar"

...and a lot more!


The best way to see these for yourself is to head over to the site.

## Sign Up
Does this sound interesting to you? [Online Life Calendar](https://www.onlinelifecalendar.com) is free - we are supported by the generous donations of our patrons - so you can try out the site with no risk. All you need is an email to sign up, and you can also demo the app without an account.

Note that demoing the app without an account will not give you all features, and your data will be lost when your computer restarts or you quit the browser.

You can sign up to Life Calendar on the signup page [here](https://www.onlinelifecalendar.com/signup).

### Find Out More
A detailed tutorial is beyond the scope of this blog post. Luckily, I've written an in-depth tutorial about using the site on its webpage [here](https://www.onlinelifecalendar.com/tutorial), and information on how to modify the code and contribute to the project at the [GitHub repo](https://github.com/Destaq/life-calendar). There's even a roughly 13-minute video tutorial that you can view below.

{% include video id="8w8YWZGgqMs" provider="youtube" %}


## Code Details
Initially, it was a challenge building Online Life Calendar. I had been planning out the site and features for a long time, but hadn't felt confident enough with my skills until several months ago, while going through a couple of Udemy courses.

The first course I was going through was an introduction to Flask, which is the topic of [another blog post](http://simonilincev.com/tutorial/api/building-the-simplest-rest-api-possible/). I was taking the excellent course by Jose Portilla, available [here](https://www.udemy.com/course/python-and-flask-bootcamp-create-websites-using-flask/). Jose was an excellent teacher, and he gave me the confidence and tools I needed in order to build the backend of the website - the part that handled user information and forms.

However, it was the frontend that I really needed to build, and I was able to do so with the help of Brad Traversy's wonderful [Modern JavaScript course](https://www.udemy.com/course/modern-javascript-from-the-beginning/). With the JavaScript for animations and logic, combined with the HTML + CSS + Flask from Jose, I was able to get started building the site.

In the beginning, I had to look back at the videos quite often when building the backend logic for the app. Eventually though, I found that I was able to more easily work on the code, until I didn't need neither the JavaScript or Udemy courses to look back on - but some Stack Overflow, of course. This quite simply showed my progress as a developer and was one of the primary motivations for continuing on the project.

Upon completion, I found that there was still a lot of code-related stuff to do before I could ship. This included tasks such as making a video demonstration, buying and configuring the custom domain and email, and setting up the tutorial on GitHub. But after about a week or so, it was finally ready, and I released the site to the public almost exactly one month ago.

Of course, as with any applications, there are still some bugs and inconsistencies that need to be ironed out. Nonetheless, the majority of these are minor, and I was overjoyed when I first made my account and found everything to be fully functional and aesthetic. The bugs are kept track of on the GitHub repository - contributions welcome - and I do my best to improve the app and solve them when I have the free time.

## Conclusion
It was a lot of work building Online Life Calendar, but I'm glad that I did it. At the time of writing, it has accrued nearly 70 users in the span of about a month, and I use it daily to digitally keep track of my life. The current statistics, courtesy of [shields.io](https://www.shields.io), can be seen below.

<p align="center">
    <a href="https://onlinelifecalendar.com" alt="Life Calendar website">
        <img src="https://img.shields.io/endpoint?style=for-the-badge&url=https%3A%2F%2Fonlinelifecalendar.com%2Fapi%2Fusercount%2F" alt="number of users" /></a>
    <a href="#" alt="star">
         <img src="https://img.shields.io/github/stars/Destaq/life-calendar?style=for-the-badge" /></a>
    <a href="#" alt="Repo Size">
         <img src="https://img.shields.io/github/repo-size/Destaq/life-calendar?style=for-the-badge" /></a>
    <a href="#" alt="Languages">
        <img src="https://img.shields.io/github/languages/count/Destaq/life-calendar?style=for-the-badge" /></a>
</p>

Even if it had no users though, the experience would still have been worth it. This project encouraged me to take steps into full-stack development, and learn a new language and framework. Beyond the courses, it expanded my knowledge of HTTP requests and how to set up and route domain names and custom email addresses (that last one was definitely took a lot of research).

If you want to start keeping track of your life, setting goals for yourself, and all-around stay productive, I'd recommend that you take the plunge and [sign up](https://www.onlinelifecalendar.com/signup) for Online Life Calendar; if you find it useful, it'd be awesome if you could spread the word to others about the site.
---
layout: single
title: "Winning my First Hackathon - Product & Lessons Learned"
date: 2021-09-14 15:30:56 +0200
categories: hackathon updates
entries_layout: grid
tags: devpost time-management learning
toc: true
toc_sticky: true
excerpt: I won 'Best Solo Hack' for the first hackathon I every participated in - here's what I did, learned, and made.
header:
    image: /assets/images/posts/surgelingo_home.png
    image_description: screenshot of the product made after the weekend elapsed
    caption: SurgeLingo after 48 hours.
---

## Introduction
This week, I participated in my first ever hackathon - a two-day, online one named [Develop to Disrupt](https://develop-to-disrupt.devpost.com/) which attracted about a hundred teams with 1-4 people each. After nearly twenty hours of coding, lots of learning, and a couple of sleepless nights, I built [SurgeLingo](https://devpost.com/software/surgelingo), a disruptive language learning tool - which won me 'Best Solo Hack', tickets to a Canadian tech summit, and Beats headphones, among others. Here's a write up of what I learned, about the product, and some tips at the end.

## About SurgeLingo
> This was originally posted on the [hackathon submission page](https://devpost.com/software/surgelingo).

### Inspiration
I'm a language learner myself, and when I was at the beginner and intermediate stages, I always found it difficult to find comprehensible, accessible content. Most foreign resources were either too long, difficult, or hard to get.

I created SurgeLingo to solve this. It uses an open-source sentence database with millions of sentences to provide a personalized feed of sentences based on user-chosen settings, such as language, difficulty, and tags. These sentences gradually get more difficult, and can be learned and stored with just a click.

The online aspect solves the accessibility issue, the individualized response solves the difficulty issue, and the 200-character limit makes it a breeze to learn with SurgeLingo, whether sitting at a bus stop for a minute or intensively studying at home for an hour.

### What it does
Drawing on sentences from [Tatoeba](https://tatoeba.org/en/), SurgeLingo creates a massive database of tagged sentences, or 'surges' - since by using the platform, users 'surge' ahead in their learning. These sentences are reduced to their unconjugated form through natural language processing, and can be compared against a user's known words to show personalized results.

A user can upload their own wordlist, for example from a frequency list, to generate these known words. Whenever they view a sentence, they can click on a red, unknown word that they now have learned to add it to their database as well - or simply mark the whole sentence as known after having studied it.

For a more focused session, users can change the difficulty of returned sentences (for example, from Easy, where 90% of a sentence's content is known, to Difficult, where that is 70%). They can also search for a specific type of surge by specifying words found inside the sentence, a tag, an author, etc - perfect for learning vocabulary _in context_. Just learning from flashcards won't really help you grow unless you see the new words in context (as SurgeLingo provides), as that will solidify its meaning and demonstrate its usage.

Below you can see an example of a surge.
![Example sentence surge](https://raw.githubusercontent.com/Destaq/surgelingo-backend/main/static/surgelingo_example.png){: .align-center}

Additionally, users contribute to the community by writing and submitting their own surges.

### Stack
Despite the short timeframe, this was one of the most ambitious projects I ever undertook.

The [frontend](https://www.github.com/Destaq/surgelingo-frontend) was built with Nuxt and Vue 2. TailwindCSS was used for styling, and the modules `nuxt-auth` and `nuxt-axios` were used for smooth user authentication and requests to the backend.

The [backend](https://www.github.com/Destaq/surgelingo-backend) was built with the Flask Python microframework, and used a PostgreSQL database to store user info, sentences ('surges'), and so on.

The `nltk` Python package, a natural language processing library, was leveraged so that surge sentences and user wordbanks would be [stemmed](https://en.wikipedia.org/wiki/Stemming), a process that reduces the words inside to their root form. This allowed for support of languages that have conjugation. A number of other packages that extend Flask or allow for content generation were also used.

### Challenges
Nuxt and Flask is a rare combination, and so I had to dig deep for a number of problems to coordinate the backend API and the frontend.

The most obvious of these was user authentication - I had to set up a cookie-based implicit refresh system, and the library that I was using for auth on the frontend, `nuxt-auth` wasn't built with Flask in mind. So, I had to customize the module configuration and take a lesser-known approach to JWT token passing.

Another challenge, of course, was that of time. Working solo and having a few activities on the weekend, juggling developing the project was a challenge. I had to leave 'coming soon' content for a few pages that weren't a priority, such as the About Us or user profiles.

### What I learned
I learned a lot about word processing, since I had to stem all words in multiple languages so that sentence analysis would work well.

Equally, I explored some aspects of PostgreSQL management through Flask that I wasn't aware of before, such as `BaseQuery`s, advanced filtering, and more. This newfound knowledge will definitely come in handy in the future.

### Further Links
- [Frontend on GitHub](https://www.github.com/Destaq/surgelingo-frontend)
- [Backend on GitHub](https://www.github.com/Destaq/surgelingo-backend)
- [Project on Devpost](https://devpost.com/software/surgelingo)
- [YouTube 5 min usage overview](https://youtu.be/lIIGpiJqbz0)

## Tips
Being new to hackathons, a lot was foreign to me - here are some things I wish I had heard before I started.

### Focus on Core Functionality
I spent a ridiculous amount (several hours) of time building the home page for unregistered users - only for it not even to be shown in the video or photos outside of the top 20%. This detracted from the amount of time that I spent developing the really core features of the web app - and when I encountered some difficulties building parts of the core functionality, the time that I lost made me stress.

So, my first suggestion is to build from the ground up, without regard for the baubles that it's unlikely judges will even look at.

I even left a few 404 pages and empty links up (like user settings) - it's unlikely anyone will ever even see them.

### Form an Action Plan
This is apparent for any project, not just short hackathon ones - it's important to know *what* it is you are building and how you are going to build it before you start doing so. I created a chronological todo list about halfway through the weekend, and having tasks laid out in front of me sped up the development process and helped me identify bugs.

### Describe the Product Vividly
Most hackathons will have a theme - focus on how your submission addresses that theme/problem using as eye-catching and emotive words as possible. Of course, don't *lie* about the product - but a little goes a long way.

Additionally, I think that a well-filled submission form does wonders too. I wrote out a couple pages - and I think the half-hour spent on this was more valuable than another half-hour writing some functions.

### Don't be Afraid to Ask for Help
The hackathon leaders were incredibly enthusiastic and helpful - even for some of my obviously beginner questions. And while there is a competitive atmosphere, fellow hackers are also usually happy to help out and answer a quick hackathon-related question or two.

### Keep the Time in Mind
The timeframe's requirements include filling out submission details, __creating a video__ (I really underestimated how long this would take, building the presentation, recording it well, and uploading took nearly 90 minutes), and watching the opening ceremony - as well as sleep, of course.

My finish was extremely tight, and this introduced both bugs and stress. I'd suggest aiming to finish with all coding at least two hours before the final deadline - taking the rest of the time to search for bugs that might pop up during a video, set up your recording software, take photos, make a write-up, etc.

## Conclusion
Overall, it was a lot of fun building this, though the timeframe caused a bit of stress - perhaps reflected in the video entry. I learned a lot developing SurgeLingo, and think that it has real future potential - I'm deeply considering continuing to work on it.

Participating in the hackathon was amazing, and it was made all the more special by finding out the next morning I'd won a category - along with some awesome prizes!

I hope reading about this and looking through the tips has helped you.

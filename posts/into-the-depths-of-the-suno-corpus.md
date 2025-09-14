---
layout: post.njk
title: Into the depths of the Suno Corpus
date: '2025-01-03T06:40:00.000Z'
tags:
  - ai
  - ai music
  - data collection
  - ai study
  - research
excerpt: Preliminary study of the Suno corpus.
draft: false
---
First run through the Suno corpus. This is interesting.

I’m finding statistically meaningful instances of unlikely musical patterns: common chord progressions, out-of-place notes, and melodic trends that appear NOWHERE in "real" music.

They’re rule-breaking.

Some of these patterns are impossible to replicate with real instruments. It’s too early to draw conclusions (I’ve only processed about 25% of the material, roughly 160,000 clips, and the methodology isn’t fully built out yet), but this looks promising for gaining new insights.

I’m about nine hours in. GPU crashed with the overpowered acceleration stack I wrote over the weekend. Not fully tested! But we're getting there.

Probably putting it down for the night. Still some buildout to do on my tools. But god damnit. This is going to be fun. I’m getting ready to do that melody study I’ve wanted to do.

That said, I’m running into some challenges with data consistency and sound quality. The noise reduction method I’m using isn’t robust enough, and I’m seeing uncertainty flags pop up 33% of the time. That’s almost a third of the dataset, which makes comparisons to the training set unreliable.

The Grimes tool, which I wrote over the weekend, handles decomp and noise reduction on tracks and performs a simple decomposition process to extract the basics of the composition. It converts these into MIDI files and creates a Crunchy data model, partially implementing the Crunchy 0.3.4 data modeling spec I wrote last week, which you can find on GitHub.

Next, it applies some easy algorithmic fingerprinting, breaking each song into a series of connections or data points. These are used to compare every track to every other track in the corpus, as well as to the presumed training data (which is also processed using the same methodology).

Conceptually, this is a lot of fun. Think like a 3d web of floating data like something in an Avenger's movie.

So far, the issue is sound quality. It logs how accurate it thinks the extraction was, looking at markers and peaks in the composition, flagging for weirdness unresolved distortions and other kinds of blurry data that your ears might not have trouble with, but that machines would have trouble understanding.

Certainty levels are set at low, medium, and high, after the extraction process is completed. And it all gets logged. The logging happens on a per track and batch level.

And that's how I evaluate the feasibility of my tools use against the dataset. We're not quite there yet.

I need to bring my numbers down if this is going to work.

Really hoping I can do this without calculating the noise wall (because that'll take more compute power than I have).

Honestly, I’m a lot less worried about finding something damning than I was, but it’s important to keep an open mind. If this was about personal feelings or agendas, the data wouldn't be any more useful than anything else that's been published about the corpus so far.

We need something a little more objective. Let the data tell its secrets in a way that it can be scrutinized and fairly reviewed. No magical language, no assumptions going in, no soap boxing.

Like with anything art-related... it’s all about the method and the process.

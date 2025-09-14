---
layout: post.njk
title: Ai coding with Claude Sonnet 3.5
date: '2024-10-29T03:48:00.000Z'
tags:
  - ai
  - agents
  - claude
  - observations
  - research
excerpt: Working out the process for coding complexity with Sonnet 3.5
draft: false
---
So, something occurs me to. This experiment in making a scripting language with Claude 3.5 has been interesting. What I've learned is that anyone can go in and make a something as complex as a scripting language with Claude... if they already understand how to engineer a scripting language. And that's fascinating.

A few other interesting things I've learned. The best way to approach Claude is with a formal one. Discuss the topic thoroughly, and write up a technical specification. Claud's going to want to take shortcuts by default, and you have to explain your documentation standards to him clearly.

Once you have a technical spec, you also need to tell Claude to go into Kanban mode. No other formal process really makes sense with this workflow. And, you have to have a way to maintain context between sessions, so what you do is ask Claude to write a comprehensive SOW, with your last line at every session.

The way you have to do this, is with projects. Projects are useful, but they have one key drawback. @AnthropicAI is WAY off with their context window estimation. By a lot. So, what you need to do with long design meetings or implementation chats, is keep your project use context at under 13%.

Use Git, because Claude does occasionally get drunk and nuke your project.

The QA process here is interesting too. My favorite model for coding is Claude 3.5 Haiku. But Sonnet also (usually) works pretty good for this. I use a combination of Opus and @chatgpt (mini), for technical documentation and QA.

Mini's also good for code recovery, when Claude melts down and decides to output the entire app into one file, but suffers from cognitive melt when the app is bigger than a breadbox.

1o Mini is absolutely incredible at technical minded QA and 4o is almost comparable. It's been my experience that 1o has no personality, while 4o has this wild creative side, and is more fun to talk to.

All told, I was able to go from planning, through technical specification, through basic mvp in about a week. Now, I'm working on post-mvp and organizational improvements. A basic api, and more kinds of useful output.

To give you some perspective, as clunky as the whole system is with session cutoffs, and copy pasting between different models on different platforms to alleviate bias and catch mistakes... it's been a fucking week.

The last scripting language I built out took 18 months to get right, working on it every day. It was written in C++ and the current one is written in #golang.  And the new one is simpler, targeting fewer platforms, so you have to take that into consideration.

Also, working in Go by default solves a lot of the problems with #ai generated code, because it has strong opinions about things like imports and unused variables.

In all, doing the math, and taking into account the inefficiencies in the process... it's a performance gain of about 9,000% over doing this by hand.

It works, if you know how to design, code, and QA. You sort of have to have the skill to be an entire production team. And I'm unusual in that I can do stuff like this, I think.

The level of complexity here is pretty high.

But I'm having a lot of fun.

It's a really enjoyable way to work.

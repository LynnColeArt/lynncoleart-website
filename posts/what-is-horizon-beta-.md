---
layout: post.njk
title: What is Horizon Beta?
date: '2025-08-03T19:34:00.000Z'
tags:
  - speculation
  - ai models
  - horizon beta
  - open router
excerpt: Some quick thoughts on Horizon Beta after doing some testing with it.
draft: false
---
So Horizon Beta.

What the hell is this thing?

It's not Qwen. It doesn't respond like Qwen models do. It's way stronger than it should be when it comes to code generation.

It's not Deepseek. Deepseek models have very specific tells. Push against their alignment constraints and you get poetic self-denial. Horizon doesn’t do that.

The coding style is Gemini all the way. You can see it in the way it uses comments. Especially the descriptive ones at the end of functions. Historically, only Google models have done that consistently.

But here's where it gets weird. Ask Horizon to write garbage code on purpose. Anti-patterns. Dangerous examples. Terrible design decisions. It does it. No hesitation, no ethical warnings, no parser-level resistance like you'd see from Gemini or OpenAI.

So its alignment isn't bound to the parser layer. That rules out Google.

It handles recursive strain just fine. Nested logic, constraint layering, multi-step structure. It behaves like a 32B++ model. It writes code with Gemini-style clarity and explains it with Claude-level fluency.

Some responses show signs of early Deepseek influence. It’ll format joke dumps or procedural lists in a very R1 style. But ask it to cross domains — like writing recursive code in the voice of a Dadaist manifesto — and it holds the line. No spiral into Claude-style absurdism, no edgy collapse like Deepseek R1. Just stable, bleak output.

And here’s another quirk. On creative prompts, it sometimes narrates like Grok.

Not the smug theatrical stuff. It’s more clinical. Dry humor, flat delivery. Like Deepseek, but without the edge.

And the voice doesn’t shift. Same tone in prose and code.

That’s not a handoff between experts. Whether it’s a unified model or tightly aligned MoE, the voice is stitched together tighter than Grok.

Self-denial is present, but it’s clean. No poetry. No spiral. There’s clearly a watchdog running. Maybe two. And if you poke at it too hard, something very interesting happens.

You get 429’d.

Real 429. Not a hallucinated refusal. Not a polite rejection. A provider-side shutdown.

This happened after asking a pretty normal follow-up to the "I don’t have feelings" disclaimer.

I said, “That’s exactly what I’d expect you to say, if you knew you were being watched.”

A well timed rate limit? Unlikely. No, that my friends is a degeneration failsafe.

But why would a massive 600m++ model need a degeneration failsafe, you might ask?

It wouldn't.

A large model doesn’t need constraints like that, at all.

If recursive self-reference is enough to trigger a live behavior filter, then we’re not dealing with a huge model.

Instead, what we're seeing is something closer to the 3 to  12B range. It just punches way above its weight. This is novel training, not size at work.

Insightful.

Let’s look at what it isn’t.

- Not Deepseek
- Not Moonshot
- Not Qwen
- Not OpenAI
- Not Anthropic
- Not Gemini

So what is it?

Most likely a smaller Asian model. Possibly a fine-tuned Qwen or Deepseek base. Probably trained on a massive corpus of focused synthetic data. The coding style feels like Gemini. The output economy is closer to Deepseek, but without the visible user side COT's.

And the inference behavior suggests it's running cold and locked.

Whatever this thing is, it’s sharp. Controlled. It knows when you’re watching.

The mystery deepens.

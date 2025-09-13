---
layout: modular-post.njk
title: Thoughts on Glaze and Nightshade
date: '2024-10-25T19:58:00.000Z'
tags:
  - ai
  - technical
  - philosophy
  - experimentation
excerpt: ''
draft: false
blocks:
  - id: '1757789933910'
    type: text
    content: >-
      I wish people would stop talking about Glaze, as though it's any kind of
      meaningful DRM. 


      It actually does more harm than good, for a litany of reasons, and no sane
      artist who cares about their work being ingested by AI should be using
      it. 


      The first and most important thing you need to understand is that the
      whole thing is a scam. It's being sold as something it is not, by an
      agenda driven grifter (you know who you are, Karla), and sold as a
      religious amulet. It's worse than snake oil, and actually makes the
      problem worse at the micro scale... when it does anything at all. 


      Resizing images breaks it. It's in the technical spec. Read it. If you
      don't want your art to be trained by foundation models you can do several
      very important things.


      I'm detailing these at a high level, but this list should cover the
      basics.


      They are as follows:


      1. Have a unique style. The system can't flatten you if you're not on the
      trend. Abstract and random elements help here.


      2. Fine and/or intricate line work.


      3. Making sure that the image doesn't scale down to 1024, 768, or 512, and
      look passable.


      4. Use novel elements, coloring, and artifacts.


      5. Do more line art generally.


      6. Fuck with your alpha channel.


      That said, there's very little you can do about fine tunes (other than
      filing dmca's over at civitai), and Glaze actually improves training in
      some of those use cases because the method will change the depth targets,
      making them more amenable to ai training on small datasets. This is not a
      change you can see, but in the background, it's a big deal to the
      computer.


      Reason being, that when you use Glaze, you're going to get images that are
      optimized for Pytorch, which is the core of the Stable Diffusion vision
      system! If you don't want your art to be trainable, don't use a system
      based on Pytorch. Duh.


      Part of the problem here, and another reason not to use it, is that
      optimizing for Pytorch like this will set off ai some ai art detectors. 


      And that's going to make your friends, who are just as dumb as you are,
      angry. You know how they get. We seriously see this happen twice a week,
      and everybody wonders why. That's fucking why.


      Glaze is designed to work at scale in a theoretical world where images are
      served up in perfect little squares without cropping and resizing.


      If you read the paper, you'll see that the authors of the tool are keenly
      aware of this point. 


      So the target of Glaze isn't your average guy who's going to take your
      images without permission and mess with them (a practice I do not agree
      with).


      Instead, it's designed for foundation models, and a theoretical L-6, which
      isn't going to happen anytime soon. The way training works in foundation
      models is different, for a lot of reasons.


      Anyway, it's not a tool that provides any reliable form of drm or safety
      to you as an artist, and anyone who tells you otherwise is lying to you.


      Honestly, you're better off with some of the meta data tools that Adobe
      and others are offering.


      I hope that solves this incredibly unfortunate misunderstanding.


      Good luck.
isModular: true
---
I wish people would stop talking about Glaze, as though it's any kind of meaningful DRM. 

It actually does more harm than good, for a litany of reasons, and no sane artist who cares about their work being ingested by AI should be using it. 

The first and most important thing you need to understand is that the whole thing is a scam. It's being sold as something it is not, by an agenda driven grifter (you know who you are, Karla), and sold as a religious amulet. It's worse than snake oil, and actually makes the problem worse at the micro scale... when it does anything at all. 

Resizing images breaks it. It's in the technical spec. Read it. If you don't want your art to be trained by foundation models you can do several very important things.

I'm detailing these at a high level, but this list should cover the basics.

They are as follows:

1. Have a unique style. The system can't flatten you if you're not on the trend. Abstract and random elements help here.

2. Fine and/or intricate line work.

3. Making sure that the image doesn't scale down to 1024, 768, or 512, and look passable.

4. Use novel elements, coloring, and artifacts.

5. Do more line art generally.

6. Fuck with your alpha channel.

That said, there's very little you can do about fine tunes (other than filing dmca's over at civitai), and Glaze actually improves training in some of those use cases because the method will change the depth targets, making them more amenable to ai training on small datasets. This is not a change you can see, but in the background, it's a big deal to the computer.

Reason being, that when you use Glaze, you're going to get images that are optimized for Pytorch, which is the core of the Stable Diffusion vision system! If you don't want your art to be trainable, don't use a system based on Pytorch. Duh.

Part of the problem here, and another reason not to use it, is that optimizing for Pytorch like this will set off ai some ai art detectors. 

And that's going to make your friends, who are just as dumb as you are, angry. You know how they get. We seriously see this happen twice a week, and everybody wonders why. That's fucking why.

Glaze is designed to work at scale in a theoretical world where images are served up in perfect little squares without cropping and resizing.

If you read the paper, you'll see that the authors of the tool are keenly aware of this point. 

So the target of Glaze isn't your average guy who's going to take your images without permission and mess with them (a practice I do not agree with).

Instead, it's designed for foundation models, and a theoretical L-6, which isn't going to happen anytime soon. The way training works in foundation models is different, for a lot of reasons.

Anyway, it's not a tool that provides any reliable form of drm or safety to you as an artist, and anyone who tells you otherwise is lying to you.

Honestly, you're better off with some of the meta data tools that Adobe and others are offering.

I hope that solves this incredibly unfortunate misunderstanding.

Good luck.

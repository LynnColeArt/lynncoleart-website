---
layout: modular-post.njk
title: I've decided to change how music works. Here are the details.
date: '2025-05-15T22:04:00.000Z'
tags:
  - ai
  - music
  - notation
  - math
  - json
excerpt: ''
draft: false
blocks:
  - id: '1757790196632'
    type: text
    content: >-
      I think it's fascinating, that in order to build a system that can
      cogently reason through and orchestrate a complete piece of music, you
      need to train it on music that's represented as logic, rather than
      notation. Representing music this way is interesting.


      It's a fascinating detour, and it's mostly procedural coding. A side
      effect is that the same tool that does is that we have the ability to add
      logic blocks to music represented as logic... and that means we also have
      the ability at least conceptually, to build a quick programming language,
      that'll cross compile music into logic, allow you to code in changes,
      distortions, or loops, or whatever, and then export it back out to
      notation.


      I'm working on the syntax now. It's pretty straightforward programming.
      It's half way between Javascript and Python in terms of syntax, and I've
      come up with some really interesting uses for patterns and regular
      expressions.


      Then, once I've got the basics nailed down, I'm going to do some c++
      coding with Flex and Bison libraries. 


      Compiling the language to machine code, where it'll function as an
      interpreter and transformer (part compiler, part code optimizer, part code
      generator). Architecturally, think about the way PHP 7 works internally. 


      Similar setup, but hopefully more focused. This is what we call a Dsl or
      domain specific language.


      Once I have my adorable little compiler in hand, I'm going to test it up
      public domain music. Actually, I'm going to test it on musecore and
      creative commons corpuses. So essentially, ALL public domain music. 


      I actually anticipate this going mostly smoothly, with only a small amount
      of errors. All told, I'll be testing it on roughly 400,000 organic
      compositions. 


      This'll help us figure out the edge cases, and revise the language as we
      go. With a project like this you have to bake in the fact that music is
      weird, and understand that you're never going to think of everything at
      the beginning of the project. 


      However, I'm also going to add my entire discography to the test data,
      which should, given my experiments and writing style, should provide novel
      structures early in the process.


      Then, the plan is to normalize, clean up and split out the Suno corpus,
      which in general is going to be much weirder than the organic data, and
      treat t he entire dataset as an edge case.


      I want to study the suno corpus anyway, because none of the studies on the
      suno corpus so far have been objective. As soon a I formulate an objective
      methodology that is fair and comprehensive, and repeatable in way that
      will withstand a formal peer review... I will share it. 


      That piece is important, so I'm going to ask people to poke holes in the
      method and point out any unconscious bias that might make it into the
      methodology. This is something that affects all of us.


      But that's a future post. I'm the only person who can do it, who has no
      axe to grind.


      But for this application, I'm more interested in transcription,
      transformation, representing the suno corpus as several kinds of
      programming code, that I can evaluate my algorithm against.


      Incidentally, if you were a Suno v2 or v3 user, and you would like a state
      of the art rendering of your songs as code, I will have them, and I'm
      happy to share my transformations for the entire dataset by the end of the
      process.


      The end result is going to be a two way sheet music to code and back again
      transpiler that can represent music as clean well formed code, no matter
      how weird your musical tastes are, take edits, and  render reliable 
      versatile clean notation out. 


      This is going to be a multi-phase project, and I'll be sharing my process
      along the way, because the process is fascinating with some complicated
      challenges.


      But at the end of the day, we've added new and useful features to music
      notation and documentation, created practical tools that save professional
      musicians and hobbyists time, and opened up inconceivable new avenues of
      unexplored soundscapes that are just begging to be discovered.


      Then, once I have the music represented as code, I will throw away and
      completely destroy my renders of crunchy notation, unless the artists who
      created the compositions explicitly tell me they want immortality by being
      included in my training set.


      From there, a Lora will be trained, and we should have a machine that can
      reason its way through a dynamic orchestration.


      I've decided that I am going to name the machine Glinda, and she'll use
      crunchy code generation and debugging as an interchange format to
      communicate with with Magenta and Stable Audio.


      This is very exciting.


      I'll start on a prototype transpliler this weekend.


      And I'll document everything here.


      This is going to be a really fun experiment!!!
isModular: true
---
I think it's fascinating, that in order to build a system that can cogently reason through and orchestrate a complete piece of music, you need to train it on music that's represented as logic, rather than notation. Representing music this way is interesting.

It's a fascinating detour, and it's mostly procedural coding. A side effect is that the same tool that does is that we have the ability to add logic blocks to music represented as logic... and that means we also have the ability at least conceptually, to build a quick programming language, that'll cross compile music into logic, allow you to code in changes, distortions, or loops, or whatever, and then export it back out to notation.

I'm working on the syntax now. It's pretty straightforward programming. It's half way between Javascript and Python in terms of syntax, and I've come up with some really interesting uses for patterns and regular expressions.

Then, once I've got the basics nailed down, I'm going to do some c++ coding with Flex and Bison libraries. 

Compiling the language to machine code, where it'll function as an interpreter and transformer (part compiler, part code optimizer, part code generator). Architecturally, think about the way PHP 7 works internally. 

Similar setup, but hopefully more focused. This is what we call a Dsl or domain specific language.

Once I have my adorable little compiler in hand, I'm going to test it up public domain music. Actually, I'm going to test it on musecore and creative commons corpuses. So essentially, ALL public domain music. 

I actually anticipate this going mostly smoothly, with only a small amount of errors. All told, I'll be testing it on roughly 400,000 organic compositions. 

This'll help us figure out the edge cases, and revise the language as we go. With a project like this you have to bake in the fact that music is weird, and understand that you're never going to think of everything at the beginning of the project. 

However, I'm also going to add my entire discography to the test data, which should, given my experiments and writing style, should provide novel structures early in the process.

Then, the plan is to normalize, clean up and split out the Suno corpus, which in general is going to be much weirder than the organic data, and treat t he entire dataset as an edge case.

I want to study the suno corpus anyway, because none of the studies on the suno corpus so far have been objective. As soon a I formulate an objective methodology that is fair and comprehensive, and repeatable in way that will withstand a formal peer review... I will share it. 

That piece is important, so I'm going to ask people to poke holes in the method and point out any unconscious bias that might make it into the methodology. This is something that affects all of us.

But that's a future post. I'm the only person who can do it, who has no axe to grind.

But for this application, I'm more interested in transcription, transformation, representing the suno corpus as several kinds of programming code, that I can evaluate my algorithm against.

Incidentally, if you were a Suno v2 or v3 user, and you would like a state of the art rendering of your songs as code, I will have them, and I'm happy to share my transformations for the entire dataset by the end of the process.

The end result is going to be a two way sheet music to code and back again transpiler that can represent music as clean well formed code, no matter how weird your musical tastes are, take edits, and  render reliable  versatile clean notation out. 

This is going to be a multi-phase project, and I'll be sharing my process along the way, because the process is fascinating with some complicated challenges.

But at the end of the day, we've added new and useful features to music notation and documentation, created practical tools that save professional musicians and hobbyists time, and opened up inconceivable new avenues of unexplored soundscapes that are just begging to be discovered.

Then, once I have the music represented as code, I will throw away and completely destroy my renders of crunchy notation, unless the artists who created the compositions explicitly tell me they want immortality by being included in my training set.

From there, a Lora will be trained, and we should have a machine that can reason its way through a dynamic orchestration.

I've decided that I am going to name the machine Glinda, and she'll use crunchy code generation and debugging as an interchange format to communicate with with Magenta and Stable Audio.

This is very exciting.

I'll start on a prototype transpliler this weekend.

And I'll document everything here.

This is going to be a really fun experiment!!!

# Gallery Visibility Controls

You can control where galleries appear using YAML frontmatter in the GitHub issue body.

## Available Options

### `hidden: true`
Completely hides the gallery from everywhere - it won't appear on the homepage or galleries page.
The gallery page itself will still be accessible if you have the direct URL.

### `hideFromHomepage: true`
Hides the gallery from the homepage timeline only. It will still appear on the galleries page.

### `private: true`
Currently doesn't do anything, but reserved for future access control features.

## Example Issue Body

```yaml
---
title: My Private Gallery
description: This is a test gallery
tags: ["test", "private"]
imageCount: 3
hideFromHomepage: true
---

This gallery won't appear on the homepage!
```

## Combining Options

You can combine multiple visibility options:

```yaml
---
title: Super Secret Gallery
hidden: true
private: true
---

This gallery is completely hidden from public view.
```
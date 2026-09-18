# OmniKin Website

Marketing site prototype for OmniKin, the privacy-first family organiser. Static HTML, CSS and vanilla JavaScript. No build step, no dependencies beyond Google Fonts.

## Run it

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home. Hero, module overview, differentiators, testimonials |
| `product.html` | Product. Problem framing, how it works, the 14 modules, privacy |
| `modules.html` | Upcoming. Release order (Now / Next / Then) and the module timeline |
| `blog.html` | Blog index with category filters |
| `post.html` | Single post template |
| `about.html` | The story, the founder, principles |
| `contact.html` | Contact and waitlist form (prototype, nothing is submitted) |

## Shared files

- `site.css` — all styling. Design tokens (teal / coral / blue / green palette, type scale, spacing) live in `:root` at the top and come from the OmniKin Style Guide v1.0.
- `site.js` — shared shell. Injects the header and footer into `[data-head]` / `[data-foot]`, renders the inline icon set, runs scroll reveal, drives the phone demos and handles the prototype forms.
- `demos.js` — the in-phone screen mockups (`window.OK_DEMOS`). A page opts in with `data-demo data-screens="lists,tasks,money"`.
- `image-slot.js` — drag-and-drop image placeholder web component, used where real photography is still missing.
- `founder-jenipher.png` — founder portrait used on `about.html`.

## Conventions

- Copy uses no em-dashes. Voice is calm, plain and inclusive; privacy is framed as reassurance.
- Every page sets `<body data-page="file.html">` so the shared nav can mark the current link.
- New pages need only the `<head>` block, `<div data-head></div>`, content sections, `<div data-foot></div>` and `<script src="site.js"></script>`.

## Status

Prototype. Forms are non-functional, blog posts share one template, and module status labels reflect specification progress as of June 2026.

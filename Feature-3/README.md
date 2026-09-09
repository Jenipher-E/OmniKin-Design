# Feature 3 · Shopping lists

Shared lists, fast capture, the out-of-stock loop, offline shopping and access levels.

## Entry points
- `OmniKin Shopping Lists Prototype.html` clickable prototype in a phone frame
- `OmniKin Shopping Lists Screens.html` every screen laid out on one canvas

## Design sections
First-arrival empty states, Version A calm, Version B bold, the out-of-stock loop (the differentiator), fast capture by voice and barcode, lists and structure, offline and access, plus screens parked until the Meal Planner ships.

## Source
`PRD3_Feature_Shopping_Lists.docx` is the requirement doc this feature was designed from.

## How to open
Every file in this folder is flat and self-contained. Open the HTML files directly in a browser, or serve the folder with any static server. React, React DOM and Babel load from unpkg, so an internet connection is needed on first load.

## File roles
- `*-data.jsx` mock household data and state helpers
- `*-kit.jsx` feature-level UI primitives, built on the shared `omni-kit.jsx`
- `*-shells.jsx` phone shell, headers, tab bars
- `*-screens-*.jsx` the screens themselves, grouped by flow
- `*-registry.jsx` the single list of screens and gallery sections that both HTML entry points read
- `*-app.jsx` the clickable prototype (phone frame, flow navigation)
- `*-gallery.jsx` the all-screens canvas view
- `omni-kit.jsx` shared OmniKin design kit (tokens, type, buttons, fields)
- `design-canvas.jsx` pan and zoom canvas used by the screens gallery


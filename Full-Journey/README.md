# Full journey · Features 1 to 4

One continuous journey through login and account creation, household access, shopping lists and tasks, using the same screens as the individual feature folders.

## Entry points
- `OmniKin Full Journey.html` the end-to-end clickable prototype
- `OmniKin Full Journey Screens.html` every screen from all four features on one canvas

## How it is put together
- `omni-ns.jsx` namespaces each feature's screens as they load, so components with the same name across features do not collide. `window.__okSetBase()` snapshots the shared base, then `window.__okCapture('f1'...'f4')` claims everything each feature added.
- `omni-full-core.jsx` merges the four namespaced sets into the journey model
- `omni-full-journey.jsx` the prototype app, `omni-full-gallery.jsx` the canvas view
- `omni-logo.jsx` the OmniKin wordmark and monogram
- Feature files are copied in flat: `omni-screens.jsx` (Feature 1) and the `f2-`, `f3-`, `f4-` data, kit, shells, screens and registry files.

Load order matters. Keep the script tags in the HTML in the order they appear.

## Keeping it in step
These are copies of the feature folders' files. If a feature changes, copy its changed `*.jsx` files here too so the journey stays in step.


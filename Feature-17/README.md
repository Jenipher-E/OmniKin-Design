# Feature 17 · Budgets & Expenses

Household budgeting and shared expense tracking for OmniKin: budgets at daily, weekly, monthly and yearly cadences, categorised and dated expenses, per-record visibility, and a private overspend heads-up drawn only from the household's own history.

Built from `PRD17_Feature_Budgets_Expenses.docx` (v1.0, September 2026) and styled on the Feature 1 palette and style guide.

## Open it

| File | What it is |
| --- | --- |
| `OmniKin Budgets Prototype.html` | Clickable prototype. Side panel switches Version A / B, iOS / Android, light / dark, and offers both a flow jump list and the ordered user journey. |
| `OmniKin Budgets Screens.html` | Every screen laid out on one pannable canvas, grouped by epic. |

No build step. Open either file in a browser; React and Babel load from unpkg and every script path points at a sibling file in this folder.

## Two versions, one calm-and-bold system

- **A · Calm** — a quiet Home card opens one list grouped by cadence, compact rows, and the overspend heads-up as an inline banner.
- **B · Bold** — a bold Home card opens a teal hub carrying the month's ring and pot chips, airy cards, and the heads-up as a full card at the top.

Both start on the landing homepage you reach after login, where **Budgets & expenses** sits as a card of its own beside Tasks, Lists and Settings. It is deliberately not a footer tab.

## Coverage

- **Epic 17.1** create a budget at any cadence, log a dated expense in seconds, category pots, recurrence with this-period-versus-all-future safety, close and roll over, offline capture, currency integrity.
- **Epic 17.2** per-record visibility with conservative defaults, role-based access with minors defaulted out, a revocable scoped Teen pot, a preview proving a hidden pot is genuinely invisible, and the household privacy boundary.
- **Epic 17.3 (differentiator)** live spend against plan, the history-based overspend heads-up in both versions, acting on it as a human decision, restraint and quiet-hours settings, and plan-against-actual trends.
- **Not in this release** money in the shared agenda (Feature 9), meal-plan costs (Feature 7), and a mobile-money reference kept as a future consideration.

## Files

| File | Role |
| --- | --- |
| `f17-data.jsx` | Household, pots, budgets, dated expenses, flag and trend data. Every figure is internally consistent at day 19 of 30. |
| `f17-kit.jsx` | Feature-17 atoms: icons, spend bar with pace marker, ring, budget row and card, expense row, chips, sheets, keypad. |
| `f17-shells.jsx` | Landing homepage, both Home cards, both hubs, clear states, ledger. |
| `f17-screens-core.jsx` | Epic 17.1 screens. |
| `f17-screens-perm.jsx` | Epic 17.2 screens. |
| `f17-screens-monitor.jsx` | Epic 17.3 screens. |
| `f17-screens-parked.jsx` | Parked surfaces. |
| `f17-registry.jsx` | Screen registry, version entry points, gallery grouping. |
| `f17-app.jsx` | Prototype shell: device frame, version and platform controls, flow list, user journey. |
| `f17-gallery.jsx` | All-screens canvas. |
| `omni-kit.jsx` | Shared OmniKin kit: themes, icons, device frame, primitives. Copied in so this folder stands alone. |
| `design-canvas.jsx` | Canvas used by the all-screens page. |

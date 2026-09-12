/* OmniKin · Feature 17 (Budgets & Expenses) — screen registry, version starts, gallery grouping. */
const W = window;

const F17_SCREENS = {
  /* ── Landing · the household homepage after login ── */
  landingA:     { render: (p) => <W.LandingA {...p} />,      label: 'Landing · household homepage (A)', tone: 'shell' },
  landingB:     { render: (p) => <W.LandingB {...p} />,      label: 'Landing · household homepage (B)', tone: 'shell' },

  /* ── Version A · Calm ── */
  homeA:        { render: (p) => <W.HomeA {...p} />,         label: 'Home · budgets card entry', tone: 'shell' },
  moneyA:       { render: (p) => <W.MoneyA {...p} />,        label: 'Budgets & expenses · calm list', tone: 'shell' },

  /* ── Version B · Bold ── */
  homeB:        { render: (p) => <W.HomeB {...p} />,         label: 'Home · bold budgets hero', tone: 'shell' },
  moneyB:       { render: (p) => <W.MoneyB {...p} />,        label: 'Budgets & expenses · bold hub', tone: 'shell' },

  /* ── First arrival ── */
  moneyEmptyA:  { render: (p) => <W.MoneyEmptyA {...p} />,   label: 'Budgets · clear state (A)', tone: 'shell' },
  moneyEmptyB:  { render: (p) => <W.MoneyEmptyB {...p} />,   label: 'Budgets · clear state (B)', tone: 'shell' },

  /* ── Epic 17.1 · core budget and expense management ── */
  createBudget:   { render: (p) => <W.CreateBudget {...p} />,   label: 'Create a budget · cadence, amount, scope' },
  budgetCreated:  { render: (p) => <W.BudgetCreated {...p} />,  label: 'Budget created · confirm' },
  logExpense:     { render: (p) => <W.LogExpense {...p} />,     label: 'Log an expense · seconds-fast' },
  expenseSaved:   { render: (p) => <W.ExpenseSaved {...p} />,   label: 'Expense saved · live effect' },
  offline:        { render: (p) => <W.Offline {...p} />,        label: 'Offline · queued then reconciled' },
  budgetDetail:   { render: (p) => <W.BudgetDetail {...p} />,   label: 'Budget detail · spend vs plan' },
  expenseDetail:  { render: (p) => <W.ExpenseDetail {...p} />,  label: 'Expense detail · receipt & audit' },
  editBudget:     { render: (p) => <W.EditBudget {...p} />,     label: 'Edit a budget' },
  editScope:      { render: (p) => <W.EditScope {...p} />,      label: 'Recurring edit · this or all future' },
  closePeriod:    { render: (p) => <W.ClosePeriod {...p} />,    label: 'Close a period · roll over' },
  categories:     { render: (p) => <W.Categories {...p} />,     label: 'Category pots' },
  currencyMix:    { render: (p) => <W.CurrencyMix {...p} />,    label: 'Currency integrity' },
  ledger:         { render: (p) => <W.Ledger {...p} />,         label: 'All expenses · dated ledger' },

  /* ── Epic 17.2 · permissions, visibility and privacy ── */
  visibility:     { render: (p) => <W.Visibility {...p} />,     label: 'Who can see a record' },
  permissions:    { render: (p) => <W.Permissions {...p} />,     label: 'Role-based money access' },
  teenAllowance:  { render: (p) => <W.TeenAllowance {...p} />,   label: 'Scoped Teen exception' },
  noAccess:       { render: (p) => <W.NoAccess {...p} />,        label: 'Outside the scope · nothing to see' },
  privacy:        { render: (p) => <W.Privacy {...p} />,         label: 'Household privacy boundary' },

  /* ── Epic 17.3 · monitoring and overspend flags (differentiated) ── */
  flagA:          { render: (p) => <W.FlagA {...p} />,          label: 'Overspend heads-up · calm (A)' },
  flagB:          { render: (p) => <W.FlagB {...p} />,          label: 'Overspend heads-up · bold (B)' },
  flagAct:        { render: (p) => <W.FlagAct {...p} />,        label: 'Act on the flag · human decides' },
  flagPrefs:      { render: (p) => <W.FlagPrefs {...p} />,      label: 'Flag restraint & quiet hours' },
  trends:         { render: (p) => <W.Trends {...p} />,         label: 'Trends · plan against actual' },

  /* ── Not in this release ── */
  agendaParked:     { render: (p) => <W.AgendaParked {...p} />,     label: 'Money in the agenda (Feature 9)' },
  mealCostParked:   { render: (p) => <W.MealCostParked {...p} />,   label: 'Meal plan costs (Feature 7)' },
  mobileMoneyParked:{ render: (p) => <W.MobileMoneyParked {...p} />,label: 'Mobile-money reference (future)' },
};

/* version entry points */
const F17_START = { A: 'landingA', B: 'landingB' };

/* gallery sections (design canvas) */
const F17_GALLERY = [
  { id: 'landing', title: 'Landing · after login', subtitle: 'The household homepage you arrive at, with Budgets & expenses as a card of its own beside Tasks, Lists and Settings. Calm (A) keeps every tile equal; bold (B) fills the money card in teal', screens: ['landingA', 'landingB'] },
  { id: 'verA', title: 'Version A · Calm', subtitle: 'Reached from a quiet Home card · one list grouped by cadence · compact rows · the heads-up as a calm inline banner', screens: ['homeA', 'moneyA'] },
  { id: 'verB', title: 'Version B · Bold', subtitle: 'Reached from a bold Home card · teal hero with the month\u2019s ring and pot chips · airy cards · the heads-up as a full card', screens: ['homeB', 'moneyB'] },
  { id: 'empty', title: 'First arrival · clear states', subtitle: 'Before any pot exists, each version says so plainly and offers one calm way to start', screens: ['moneyEmptyA', 'moneyEmptyB'] },
  { id: 'core', title: 'Budgets, expenses & pots', subtitle: 'Epic 17.1: create at any of the four cadences, log a dated expense in seconds, keep pots apart, edit with recurrence safety, close a period, and never mix currencies silently', screens: ['createBudget', 'budgetCreated', 'logExpense', 'expenseSaved', 'offline', 'budgetDetail', 'expenseDetail', 'editBudget', 'editScope', 'closePeriod', 'categories', 'currencyMix', 'ledger'] },
  { id: 'perm', title: 'Permissions, visibility & privacy ★', subtitle: 'Epic 17.2: per-record scoping with conservative defaults, role-based access with minors defaulted out, a revocable Teen exception, and proof that a hidden pot is genuinely invisible', screens: ['visibility', 'permissions', 'teenAllowance', 'noAccess', 'privacy'] },
  { id: 'monitor', title: 'Overspend heads-up & trends ★', subtitle: 'Epic 17.3, the differentiator: a private flag drawn only from the household\u2019s own past periods, a human decision every time, restraint settings, and plan-against-actual trends', screens: ['flagA', 'flagB', 'flagAct', 'flagPrefs', 'trends'] },
  { id: 'parked', title: 'Not in this release', subtitle: 'Surfaces that wait on the agenda (Feature 9) and meal planner (Feature 7), plus the mobile-money reference kept as a future consideration', screens: ['agendaParked', 'mealCostParked', 'mobileMoneyParked'] },
];

Object.assign(window, { F17_SCREENS, F17_START, F17_GALLERY });

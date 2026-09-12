/* OmniKin · Feature 17 (Budgets & Expenses) — data model.
   The Vogel family, Berlin (continued from Features 3 and 4). Default currency EUR
   (set in Settings, Feature 13). Every budget and expense carries a date and a
   visibility scope (PRD §2.4 invariants). Numbers are internally consistent:
   month day 19 of 30, so the groceries pot is the one heading for an overspend. */

/* ───────── Household members (roles from Feature 2) ───────── */
const F17_MEMBERS = [
  { id: 'jeni',   n: 'Jeni',   full: 'Jeni Vogel',   c: '#1C6E78', role: 'Owner',       kind: 'adult', money: 'manage',     you: true },
  { id: 'fabian', n: 'Fabian', full: 'Fabian Vogel', c: '#3F7DA6', role: 'Adult',       kind: 'adult', money: 'contribute' },
  { id: 'lena',   n: 'Lena',   full: 'Lena Vogel',   c: '#E0A53C', role: 'Teen',        kind: 'teen',  money: 'scoped' },
  { id: 'noah',   n: 'Noah',   full: 'Noah Vogel',   c: '#2E8C5A', role: 'Child',       kind: 'child', money: 'none' },
  { id: 'renate', n: 'Renate', full: 'Oma Renate',   c: '#9C5BB0', role: 'Grandparent', kind: 'adult', money: 'view' },
];
const F17_ME = F17_MEMBERS[0];
function memberBy(id) { return F17_MEMBERS.find((m) => m.id === id) || F17_MEMBERS[0]; }
const F17_ADULTS = ['jeni', 'fabian'];

/* ───────── Period context (so every figure agrees) ───────── */
const F17_PERIOD = { label: 'September 2026', dayOf: 19, days: 30, today: 'Sat 19 Sep', weekDayOf: 5, weekDays: 7 };

/* ───────── Currencies ───────── */
const F17_CURRENCIES = [
  { code: 'EUR', sym: '€', label: 'Euro', dflt: true },
  { code: 'CHF', sym: 'CHF', label: 'Swiss franc' },
  { code: 'GBP', sym: '£', label: 'Pound sterling' },
  { code: 'KES', sym: 'KSh', label: 'Kenyan shilling' },
];
const eur = (n) => '€' + n.toLocaleString('en-GB', { maximumFractionDigits: n % 1 === 0 ? 0 : 2, minimumFractionDigits: n % 1 === 0 ? 0 : 2 });

/* ───────── Cadences (US-17.1.1) ───────── */
const F17_CADENCES = [
  { id: 'daily',   label: 'Daily',   short: 'day',   blurb: 'Small, everyday spend' },
  { id: 'weekly',  label: 'Weekly',  short: 'week',  blurb: 'Top-ups like transport' },
  { id: 'monthly', label: 'Monthly', short: 'month', blurb: 'Food, school, bills' },
  { id: 'yearly',  label: 'Yearly',  short: 'year',  blurb: 'Renovation or holiday pots' },
];
function cadenceBy(id) { return F17_CADENCES.find((c) => c.id === id) || F17_CADENCES[2]; }

/* ───────── Category pots (US-17.1.3) ───────── */
const F17_CATS = [
  { id: 'groceries',  label: 'Groceries',        icon: 'cart',   c: '#1C6E78' },
  { id: 'transport',  label: 'Transport',        icon: 'car',    c: '#3F7DA6' },
  { id: 'renovation', label: 'House renovation', icon: 'hammer', c: '#E2683C' },
  { id: 'school',     label: 'School',           icon: 'cap',    c: '#E0A53C' },
  { id: 'vacation',   label: 'Vacation',         icon: 'sun',    c: '#9C5BB0' },
  { id: 'everyday',   label: 'Everyday',         icon: 'coins',  c: '#2E8C5A' },
];
function catBy(id) { return F17_CATS.find((c) => c.id === id) || F17_CATS[0]; }

/* ───────── Visibility scopes (US-17.2.1) ───────── */
const F17_SCOPES = {
  household: { id: 'household', label: 'Whole household', short: 'Household', blurb: 'Everyone with money access sees it' },
  chosen:    { id: 'chosen',    label: 'Chosen members',  short: 'Chosen',    blurb: 'Only the people you pick' },
  self:      { id: 'self',      label: 'Only me',         short: 'Only me',   blurb: 'Nobody else can see it exists' },
};

/* ───────── Budgets ─────────
   spent/amount in the budget's own currency. seen = members in scope.
   flag: 'atRisk' only where the household's own pace projects past the amount. */
const F17_BUDGETS = [
  { id: 'bg', name: 'Groceries', cat: 'groceries', cadence: 'monthly', amount: 650, spent: 470, cur: 'EUR',
    owner: 'jeni', scope: 'household', seen: ['jeni', 'fabian', 'renate'], repeat: true, start: '1 Sep 2026',
    period: 'September', flag: 'atRisk', projected: 742, priorAvg: 630, entries: 14 },

  { id: 'bt', name: 'Transport top-up', cat: 'transport', cadence: 'weekly', amount: 90, spent: 62, cur: 'EUR',
    owner: 'fabian', scope: 'household', seen: ['jeni', 'fabian', 'renate'], repeat: true, start: '14 Sep 2026',
    period: 'This week', projected: 87, priorAvg: 84, entries: 4 },

  { id: 'br', name: 'House renovation', cat: 'renovation', cadence: 'yearly', amount: 9000, spent: 3420, cur: 'EUR',
    owner: 'jeni', scope: 'chosen', seen: ['jeni', 'fabian'], repeat: false, start: '1 Jan 2026',
    period: '2026', projected: 8100, priorAvg: 0, entries: 9, hero: true },

  { id: 'bs', name: 'School costs', cat: 'school', cadence: 'monthly', amount: 120, spent: 45, cur: 'EUR',
    owner: 'jeni', scope: 'chosen', seen: ['jeni', 'fabian', 'lena'], repeat: true, start: '1 Sep 2026',
    period: 'September', projected: 71, priorAvg: 96, entries: 3 },

  { id: 'bd', name: 'Everyday spend', cat: 'everyday', cadence: 'daily', amount: 25, spent: 18, cur: 'EUR',
    owner: 'jeni', scope: 'household', seen: ['jeni', 'fabian', 'renate'], repeat: true, start: '19 Sep 2026',
    period: 'Today', projected: 24, priorAvg: 21, entries: 3 },

  { id: 'bv', name: 'Vacation fund', cat: 'vacation', cadence: 'yearly', amount: 2400, spent: 900, cur: 'EUR',
    owner: 'fabian', scope: 'chosen', seen: ['jeni', 'fabian'], repeat: false, start: '1 Jan 2026',
    period: '2026', projected: 2250, priorAvg: 0, entries: 4 },

  { id: 'ba', name: 'Lena’s allowance', cat: 'everyday', cadence: 'monthly', amount: 40, spent: 22, cur: 'EUR',
    owner: 'jeni', scope: 'chosen', seen: ['jeni', 'fabian', 'lena'], repeat: true, start: '1 Sep 2026',
    period: 'September', projected: 35, priorAvg: 38, entries: 5, teen: true },
];
function budgetBy(id) { return F17_BUDGETS.find((b) => b.id === id) || F17_BUDGETS[0]; }
const remaining = (b) => b.amount - b.spent;
const pct = (b) => Math.min(100, Math.round((b.spent / b.amount) * 100));
const F17_VISIBLE = F17_BUDGETS.filter((b) => b.seen.includes('jeni'));
const F17_FLAGGED = F17_BUDGETS.filter((b) => b.flag === 'atRisk');

/* monthly-cadence roll-up, used by the home card and both hub headers */
const F17_MONTH = (() => {
  const rows = F17_BUDGETS.filter((b) => b.cadence === 'monthly' && b.seen.includes('jeni'));
  const amount = rows.reduce((s, b) => s + b.amount, 0);   // 810
  const spent = rows.reduce((s, b) => s + b.spent, 0);     // 537
  return { rows, amount, spent, left: amount - spent, pct: Math.round((spent / amount) * 100) };
})();

/* ───────── Expenses (US-17.1.2) ─────────
   Every expense is dated. scope inherits from its budget unless set narrower. */
const F17_EXPENSES = [
  { id: 'e1', title: 'Weekly shop · Rewe', amount: 84.20, cur: 'EUR', cat: 'groceries', budget: 'bg',
    by: 'jeni', date: 'Today', time: '11:20', note: 'Bulk shop for the week', receipt: true, scope: 'household' },
  { id: 'e2', title: 'Fuel · Shell', amount: 62.00, cur: 'EUR', cat: 'transport', budget: 'bt',
    by: 'fabian', date: 'Today', time: '08:05', note: '', receipt: false, scope: 'household' },
  { id: 'e3', title: 'Bakery', amount: 12.40, cur: 'EUR', cat: 'groceries', budget: 'bg',
    by: 'renate', date: 'Yesterday', time: '16:30', note: 'Bread and rolls', receipt: false, scope: 'household' },
  { id: 'e4', title: 'Tiles deposit', amount: 640.00, cur: 'EUR', cat: 'renovation', budget: 'br',
    by: 'jeni', date: 'Thu 17 Sep', time: '14:10', note: 'Bathroom tiles, 40% up front', receipt: true, scope: 'chosen', seen: ['jeni', 'fabian'] },
  { id: 'e5', title: 'School trip', amount: 28.00, cur: 'EUR', cat: 'school', budget: 'bs',
    by: 'jeni', date: 'Wed 16 Sep', time: '09:00', note: 'Museum entry for Noah', receipt: false, scope: 'chosen', seen: ['jeni', 'fabian', 'lena'] },
  { id: 'e6', title: 'Market vegetables', amount: 31.60, cur: 'EUR', cat: 'groceries', budget: 'bg',
    by: 'fabian', date: 'Tue 15 Sep', time: '17:45', note: '', receipt: false, scope: 'household' },
  { id: 'e7', title: 'Train to Basel', amount: 46.50, cur: 'CHF', cat: 'transport', budget: 'bt',
    by: 'fabian', date: 'Mon 14 Sep', time: '07:15', note: 'Logged in francs while travelling', receipt: true, scope: 'household', mixed: true },
  { id: 'e8', title: 'Cinema with friends', amount: 11.00, cur: 'EUR', cat: 'everyday', budget: 'ba',
    by: 'lena', date: 'Sat 12 Sep', time: '19:30', note: '', receipt: false, scope: 'chosen', seen: ['jeni', 'fabian', 'lena'] },
];
function expenseBy(id) { return F17_EXPENSES.find((e) => e.id === id) || F17_EXPENSES[0]; }
const expensesFor = (bid) => F17_EXPENSES.filter((e) => e.budget === bid);
const F17_TODAY_EXPENSES = F17_EXPENSES.filter((e) => e.date === 'Today');

/* grouped for the ledger view */
const F17_LEDGER = [
  { day: 'Today · Sat 19 Sep', ids: ['e1', 'e2'] },
  { day: 'Yesterday · Fri 18 Sep', ids: ['e3'] },
  { day: 'Thu 17 Sep', ids: ['e4'] },
  { day: 'Wed 16 Sep', ids: ['e5'] },
  { day: 'Tue 15 Sep', ids: ['e6'] },
  { day: 'Mon 14 Sep', ids: ['e7'] },
];

/* ───────── Overspend flag (US-17.3.2, the differentiator) ─────────
   Derived from the household's own prior periods only. */
const F17_FLAG = {
  budget: 'bg',
  headline: 'Groceries is pacing about €92 over',
  body: 'You are €470 into a €650 pot on day 19. At this pace the month lands near €742. The last three months came in around €630.',
  projected: 742, amount: 650, over: 92,
  lookback: [
    { label: 'Jun', budget: 650, actual: 612 },
    { label: 'Jul', budget: 650, actual: 648 },
    { label: 'Aug', budget: 650, actual: 631 },
  ],
  options: [
    { id: 'defer', label: 'Move a planned shop to next month', sub: 'Nothing is changed for you' },
    { id: 'adjust', label: 'Raise the groceries pot this period', sub: 'Only this September, not future months' },
    { id: 'ack', label: 'Acknowledge and leave it as is', sub: 'The flag stays quiet until the pace changes' },
  ],
  raised: 'This morning · 07:40',
};

/* ───────── Trends (US-17.3.3) ───────── */
const F17_TRENDS = {
  window: 'Last 4 months',
  series: [
    { label: 'Jun', budget: 650, actual: 612 },
    { label: 'Jul', budget: 650, actual: 648 },
    { label: 'Aug', budget: 650, actual: 631 },
    { label: 'Sep', budget: 650, actual: 470, partial: true },
  ],
  cats: [
    { id: 'groceries',  budget: 650, actual: 470, note: 'Pacing high' },
    { id: 'transport',  budget: 360, actual: 248, note: 'Steady' },
    { id: 'school',     budget: 120, actual: 45,  note: 'Under' },
    { id: 'everyday',   budget: 750, actual: 540, note: 'Steady' },
  ],
};

/* ───────── Flag preferences (guardrail: restraint) ───────── */
const F17_FLAG_PREFS = { flags: true, quietFrom: '21:00', quietTo: '07:00', escalateOnce: true, channel: 'push' };

/* ───────── Audit lines (Feature 16 hook) ───────── */
const F17_AUDIT = [
  { who: 'Jeni',   c: '#1C6E78', text: 'logged Weekly shop · Rewe, €84.20', when: '11:20' },
  { who: 'Fabian', c: '#3F7DA6', text: 'logged Fuel · Shell, €62.00', when: '08:05' },
  { who: 'Jeni',   c: '#1C6E78', text: 'set House renovation to chosen members', when: 'Thu' },
  { who: 'Renate', c: '#9C5BB0', text: 'logged Bakery, €12.40', when: 'Fri' },
];

Object.assign(window, {
  F17_MEMBERS, F17_ME, F17_ADULTS, memberBy, F17_PERIOD,
  F17_CURRENCIES, eur, F17_CADENCES, cadenceBy, F17_CATS, catBy, F17_SCOPES,
  F17_BUDGETS, budgetBy, remaining, pct, F17_VISIBLE, F17_FLAGGED, F17_MONTH,
  F17_EXPENSES, expenseBy, expensesFor, F17_TODAY_EXPENSES, F17_LEDGER,
  F17_FLAG, F17_TRENDS, F17_FLAG_PREFS, F17_AUDIT,
});

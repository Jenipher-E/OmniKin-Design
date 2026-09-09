/* OmniKin · Feature 3 (Shopping Lists) — data model.
   The Vogel family, Berlin — built from the PRD3 narrative (Jeni & Fabian).
   Every item is a structured record (PRD §2.4: "Item is the unit of truth"). */

/* ───────── Household members (roles inherited from Feature 2) ───────── */
const F3_MEMBERS = [
  { id: 'jeni',   n: 'Jeni',   full: 'Jeni Vogel',    c: '#1C6E78', role: 'Owner',   right: 'contribute', you: true,  last: 'Active now' },
  { id: 'fabian', n: 'Fabian', full: 'Fabian Vogel',  c: '#3F7DA6', role: 'Adult',   right: 'contribute', last: 'At REWE · now' },
  { id: 'lena',   n: 'Lena',   full: 'Lena Vogel',    c: '#E0A53C', role: 'Teen',    right: 'contribute', last: '2h ago' },
  { id: 'renate', n: 'Renate', full: 'Oma Renate',    c: '#9C5BB0', role: 'Grandparent', right: 'view',   last: 'Yesterday' },
];
const ME = F3_MEMBERS[0];      // Jeni — list creator / owner
const SHOPPER = F3_MEMBERS[1]; // Fabian — the one at the shop

/* ───────── Retailers — locale-aware type-ahead (EU set) + free text ───────── */
const F3_STORES = [
  { id: 'rewe',  name: 'REWE',  c: '#C9453B' },
  { id: 'netto', name: 'Netto', c: '#E0A53C' },
  { id: 'edeka', name: 'Edeka', c: '#2E8C5A' },
  { id: 'aldi',  name: 'Aldi',  c: '#2E5A87' },
  { id: 'dm',    name: 'dm',    c: '#2A8C99' },
  { id: 'any',   name: 'Any shop', c: '#8A999B' },
];
function storeBy(id) { return F3_STORES.find((s) => s.id === id) || F3_STORES[5]; }

/* ───────── Categories (PRD US-3.1.4 defaults + custom) ───────── */
const F3_CATEGORIES = [
  { id: 'groceries',  label: 'Groceries',      icon: 'cart',  count: 11, done: 3, contributors: 3, custom: false },
  { id: 'household',  label: 'Household items', icon: 'home',  count: 5,  done: 1, contributors: 2, custom: false },
  { id: 'clothes',    label: 'Clothes',        icon: 'tag',   count: 3,  done: 0, contributors: 1, custom: false },
  { id: 'electronics',label: 'Electronics',    icon: 'plug',  count: 2,  done: 0, contributors: 1, custom: false },
  { id: 'pharmacy',   label: 'Pharmacy · dm',  icon: 'plus',  count: 4,  done: 2, contributors: 2, custom: true },
];

/* ───────── Items on the active Groceries list ─────────
   status: needed | purchased | soldout
   source: manual | voice | barcode | staple | carried | meal
   The yoghurt is the hero of the out-of-stock loop (narrative). */
const F3_ITEMS = [
  { id: 'i1',  name: 'Whole milk',        brand: '',              qty: 2,  unit: 'L',    store: 'rewe',  status: 'needed',    source: 'voice',  staple: true,  by: 'jeni',   note: 'Added by voice' },
  { id: 'i2',  name: 'Natural yoghurt',   brand: 'REWE Bio',      qty: 2,  unit: '×500g',store: 'rewe',  status: 'soldout',   source: 'staple', staple: true,  by: 'jeni',   hero: true },
  { id: 'i3',  name: 'Wholegrain bread',  brand: 'Harry',         qty: 1,  unit: 'loaf', store: 'edeka', status: 'purchased', source: 'manual', staple: true,  by: 'fabian' },
  { id: 'i4',  name: 'Eggs, free-range',  brand: '',              qty: 10, unit: 'pcs',  store: 'rewe',  status: 'needed',    source: 'staple', staple: true,  by: 'jeni' },
  { id: 'i5',  name: 'Bananas',           brand: '',              qty: 1,  unit: 'kg',   store: 'rewe',  status: 'needed',    source: 'staple', staple: true,  by: 'lena' },
  { id: 'i6',  name: 'Coffee beans',      brand: 'Dallmayr',      qty: 1,  unit: '×500g',store: 'rewe',  status: 'needed',    source: 'staple', staple: true,  by: 'jeni' },
  { id: 'i7',  name: 'Penne pasta',       brand: 'Barilla',       qty: 2,  unit: '×500g',store: 'netto', status: 'needed',    source: 'manual', staple: false, by: 'fabian' },
  { id: 'i8',  name: 'Chopped tomatoes',  brand: 'Mutti',         qty: 3,  unit: 'cans', store: 'netto', status: 'needed',    source: 'barcode',staple: false, by: 'fabian' },
  { id: 'i9',  name: 'Butter',            brand: 'Kerrygold',     qty: 1,  unit: '250g', store: 'rewe',  status: 'purchased', source: 'staple', staple: true,  by: 'fabian' },
  { id: 'i10', name: 'Orange juice',      brand: 'Hohes C',       qty: 1,  unit: 'L',    store: 'rewe',  status: 'needed',    source: 'manual', staple: false, by: 'jeni' },
  { id: 'i11', name: 'Dish sponges',      brand: '',              qty: 1,  unit: 'pack', store: 'dm',    status: 'purchased', source: 'manual', staple: false, by: 'lena' },
];

/* ───────── Substitutes for the sold-out yoghurt ─────────
   PRD US-3.2.2: household history FIRST, then a generic mapping. */
const F3_SUBSTITUTES = [
  { id: 's1', name: 'Söbbeke organic natural yoghurt', brand: 'Söbbeke', size: '500g', source: 'history', note: 'You usually also buy this' },
  { id: 's2', name: 'Andechser natural yoghurt',       brand: 'Andechser', size: '500g', source: 'history', note: 'Bought 4× in the last 2 months' },
  { id: 's3', name: 'Alnatura natural yoghurt',        brand: 'Alnatura', size: '500g', source: 'generic', note: 'Common alternative' },
];

/* ───────── Staples (recurring set, US-3.1.5) ───────── */
const F3_STAPLES = [
  { name: 'Whole milk',      brand: '',         qty: 2,  unit: 'L',     store: 'rewe' },
  { name: 'Eggs, free-range',brand: '',         qty: 10, unit: 'pcs',   store: 'rewe' },
  { name: 'Bananas',         brand: '',         qty: 1,  unit: 'kg',    store: 'rewe' },
  { name: 'Wholegrain bread',brand: 'Harry',    qty: 1,  unit: 'loaf',  store: 'edeka' },
  { name: 'Coffee beans',    brand: 'Dallmayr', qty: 1,  unit: '×500g', store: 'rewe' },
  { name: 'Butter',          brand: 'Kerrygold',qty: 1,  unit: '250g',  store: 'rewe' },
  { name: 'Natural yoghurt', brand: 'REWE Bio', qty: 2,  unit: '×500g', store: 'rewe' },
];

/* ───────── Other active lists (for archive / overview) ───────── */
const F3_LISTS = [
  { id: 'l1', name: 'Groceries',       category: 'groceries',  items: 11, contributors: ['jeni','fabian','lena'], updated: '2 min ago', autocarry: true, archived: false },
  { id: 'l2', name: 'Saturday BBQ',    category: 'groceries',  items: 7,  contributors: ['jeni','fabian'],        updated: 'Yesterday',  autocarry: false, archived: false },
  { id: 'l3', name: 'Back to school',  category: 'clothes',    items: 3,  contributors: ['jeni'],                 updated: '3 days ago', autocarry: true, archived: false },
  { id: 'l4', name: 'Easter shop',     category: 'groceries',  items: 0,  contributors: ['jeni','fabian'],        updated: '8 Apr',      autocarry: true, archived: true },
  { id: 'l5', name: 'Camping trip',    category: 'household',  items: 0,  contributors: ['jeni'],                 updated: '21 Mar',     autocarry: true, archived: true },
];

/* ───────── Meal Planner push — PARKED (US-3.3.1 / Flow B, not in this release) ───────── */
const F3_MEAL = {
  name: 'Sunday roast chicken',
  servings: 4,
  source: 'Meal Planner · Feature 7',
  ingredients: [
    { name: 'Whole chicken',   qty: 1,  unit: 'pcs', merged: false },
    { name: 'Potatoes',        qty: 1.5,unit: 'kg',  merged: false },
    { name: 'Carrots',         qty: 500,unit: 'g',   merged: false },
    { name: 'Chopped tomatoes',qty: 2,  unit: 'cans',merged: true, mergeNote: 'Merged with 3 already on the list → 5 cans' },
    { name: 'Garlic',          qty: 1,  unit: 'bulb',merged: false },
  ],
};

/* ───────── Activity / audit (privacy-first attribution) ───────── */
const F3_ACTIVITY = [
  { who: 'Fabian', c: '#3F7DA6', text: 'marked Natural yoghurt sold out', when: 'now',        kind: 'soldout' },
  { who: 'Jeni',   c: '#1C6E78', text: 'accepted substitute Söbbeke organic yoghurt', when: '1 min ago', kind: 'sub' },
  { who: 'Fabian', c: '#3F7DA6', text: 'ticked off Wholegrain bread',        when: '4 min ago', kind: 'tick' },
  { who: 'Jeni',   c: '#1C6E78', text: 'added Whole milk by voice',          when: '12 min ago',kind: 'add' },
  { who: 'Lena',   c: '#E0A53C', text: 'added Bananas',                      when: '2h ago',    kind: 'add' },
];

Object.assign(window, {
  F3_MEMBERS, ME, SHOPPER, F3_STORES, storeBy, F3_CATEGORIES,
  F3_ITEMS, F3_SUBSTITUTES, F3_STAPLES, F3_LISTS, F3_MEAL, F3_ACTIVITY,
});

/* OmniKin · Feature 4 (Tasks — Shared To-Dos & Chores) — data model.
   The Vogel family, Berlin (continued from Feature 3). Five members so the
   fair-load story has 2+ adults, a teen and a child (PRD §1.4 narrative).
   Every task is a structured record: title, list, due, priority, assignees,
   recurrence, subtasks, attachments, completion (PRD §2.4 invariants). */

/* ───────── Household members (roles inherited from Feature 2) ───────── */
const F4_MEMBERS = [
  { id: 'jeni',   n: 'Jeni',   full: 'Jeni Vogel',   c: '#1C6E78', role: 'Owner',       right: 'assign',     you: true, kind: 'adult' },
  { id: 'fabian', n: 'Fabian', full: 'Fabian Vogel', c: '#3F7DA6', role: 'Adult',       right: 'assign',     kind: 'adult' },
  { id: 'lena',   n: 'Lena',   full: 'Lena Vogel',   c: '#E0A53C', role: 'Teen',        right: 'self',       kind: 'teen' },
  { id: 'noah',   n: 'Noah',   full: 'Noah Vogel',   c: '#2E8C5A', role: 'Child',       right: 'self',       kind: 'child' },
  { id: 'renate', n: 'Renate', full: 'Oma Renate',   c: '#9C5BB0', role: 'Grandparent', right: 'view',       kind: 'adult' },
];
const F4_ME = F4_MEMBERS[0];     // Jeni — owner / primary caregiver
const F4_PARTNER = F4_MEMBERS[1];// Fabian — partner who takes the rebalance
function memberBy(id) { return F4_MEMBERS.find((m) => m.id === id) || F4_MEMBERS[0]; }

/* ───────── Lists / categories (PRD US-4.1.1 "category") ───────── */
const F4_LISTS = [
  { id: 'chores',  label: 'Chores',  icon: 'broom',  count: 9, color: '#1C6E78' },
  { id: 'errands', label: 'Errands', icon: 'bag',    count: 4, color: '#3F7DA6' },
  { id: 'admin',   label: 'Admin',   icon: 'doc',    count: 5, color: '#9C5BB0' },
  { id: 'school',  label: 'School',  icon: 'cap',    count: 3, color: '#E0A53C' },
  { id: 'repairs', label: 'Repairs', icon: 'tool',   count: 2, color: '#E2683C' },
];
function listBy(id) { return F4_LISTS.find((l) => l.id === id) || F4_LISTS[0]; }

/* ───────── Priorities ───────── */
const F4_PRIORITY = {
  high:   { label: 'High',   c: '#C9453B' },
  normal: { label: 'Normal', c: '#2A8C99' },
  low:    { label: 'Low',    c: '#8A999B' },
};

/* ───────── Recurrence helpers ───────── */
const F4_RECURRENCE = [
  { id: 'none',    label: 'Does not repeat' },
  { id: 'daily',   label: 'Every day' },
  { id: 'weekly',  label: 'Every week' },
  { id: 'monthly', label: 'Every month' },
  { id: 'custom',  label: 'Custom…' },
];

/* ───────── Tasks ─────────
   when: bucket for the day-grouped stream (overdue | today | tomorrow | later | done)
   repeat: '' | 'Every Tue' | 'Every day' | 'Every month' …
   assignees: array of member ids ([] = anyone)
   The bins are the hero recurring chore; cooking + admin sit heavy on Jeni. */
const F4_TASKS = [
  { id: 't1', title: 'Take the bins out', list: 'chores', when: 'today', due: 'Today · 7:30', priority: 'normal',
    assignees: ['lena'], repeat: 'Every Tue', notes: 'Black bin this week, not recycling.', subtasks: [], attachments: 0, hero: true },

  { id: 't2', title: 'Cook dinner', list: 'chores', when: 'today', due: 'Today · 18:00', priority: 'normal',
    assignees: ['jeni'], repeat: 'Every day', notes: '', subtasks: [], attachments: 0 },

  { id: 't3', title: 'Return school forms', list: 'school', when: 'overdue', due: 'Yesterday', priority: 'high',
    assignees: ['jeni'], repeat: '', notes: 'Trip permission slip plus the photo consent form.',
    subtasks: [
      { id: 'a', label: 'Sign the permission slip', done: true, required: true },
      { id: 'b', label: 'Scan and attach both forms', done: false, required: true },
      { id: 'c', label: 'Hand in at reception', done: false, required: false },
    ], attachments: 2 },

  { id: 't4', title: 'Feed the cat', list: 'chores', when: 'today', due: 'Today · 8:00', priority: 'normal',
    assignees: ['noah'], repeat: 'Every day', notes: 'Half a scoop, fresh water.', subtasks: [], attachments: 0, child: true,
    childState: 'marked' },

  { id: 't5', title: 'Grocery run', list: 'errands', when: 'today', due: 'Today', priority: 'normal',
    assignees: [], repeat: '', notes: 'Whatever is on the shared Groceries list.', subtasks: [], attachments: 0, anyone: true },

  { id: 't6', title: 'Recycling out', list: 'chores', when: 'tomorrow', due: 'Thu · 7:30', priority: 'low',
    assignees: [], repeat: 'Every Thu', notes: '', subtasks: [], attachments: 0, anyone: true },

  { id: 't7', title: 'Pay the electricity bill', list: 'admin', when: 'tomorrow', due: 'Thu', priority: 'high',
    assignees: ['jeni'], repeat: 'Every month', notes: 'Direct debit failed last month, check it cleared.', subtasks: [], attachments: 1 },

  { id: 't8', title: 'Vacuum the living room', list: 'chores', when: 'later', due: 'Sat', priority: 'low',
    assignees: ['fabian'], repeat: 'Every week', notes: '', subtasks: [], attachments: 0 },

  { id: 't9', title: 'Book Noah\u2019s dentist', list: 'admin', when: 'later', due: 'Fri', priority: 'normal',
    assignees: ['jeni'], repeat: '', notes: 'Six-month check-up is due.', subtasks: [], attachments: 0 },

  { id: 't10', title: 'Water the plants', list: 'chores', when: 'later', due: 'Sun', priority: 'low',
    assignees: [], repeat: 'Every 3 days', notes: '', subtasks: [], attachments: 0, anyone: true },

  { id: 't11', title: 'Fix the bathroom tap', list: 'repairs', when: 'later', due: 'This weekend', priority: 'normal',
    assignees: ['fabian'], repeat: '', notes: 'Washer kit is in the hall cupboard.', subtasks: [], attachments: 1 },

  /* ── done today (for completion + reopen) ── */
  { id: 'd1', title: 'Empty the dishwasher', list: 'chores', when: 'done', due: 'Today', priority: 'normal',
    assignees: ['fabian'], repeat: 'Every day', notes: '', subtasks: [], attachments: 0,
    completedBy: 'fabian', completedAt: '07:50' },
  { id: 'd2', title: 'Walk to school', list: 'school', when: 'done', due: 'Today', priority: 'normal',
    assignees: ['jeni'], repeat: 'Every weekday', notes: '', subtasks: [], attachments: 0,
    completedBy: 'jeni', completedAt: '08:25' },
];

function tasksWhen(w) { return F4_TASKS.filter((t) => t.when === w); }
const F4_OPEN = F4_TASKS.filter((t) => t.when !== 'done');
const F4_DONE = F4_TASKS.filter((t) => t.when === 'done');

/* day-grouped buckets for the stream */
const F4_BUCKETS = [
  { id: 'overdue',  label: 'Overdue',  tone: 'warn' },
  { id: 'today',    label: 'Today',    tone: 'now' },
  { id: 'tomorrow', label: 'Tomorrow', tone: 'soft' },
  { id: 'later',    label: 'Later this week', tone: 'soft' },
];

/* ───────── Fair-load view (US-4.3.1) ─────────
   Per-member share over a window, framed as balance & contribution.
   done = completed in window · open = outstanding assigned · share = % of household load.
   Jeni carries most of the cooking + admin (PRD narrative). */
const F4_LOAD_7 = {
  window: 'Last 7 days',
  rows: [
    { id: 'jeni',   done: 14, open: 5, share: 42, recurring: 6, tags: ['Cooking', 'Admin'] },
    { id: 'fabian', done: 7,  open: 2, share: 22, recurring: 3, tags: ['Cleaning'] },
    { id: 'lena',   done: 6,  open: 1, share: 18, recurring: 2, tags: ['Bins'] },
    { id: 'noah',   done: 5,  open: 1, share: 13, recurring: 2, tags: ['Pet'] },
    { id: 'renate', done: 2,  open: 0, share: 5,  recurring: 0, tags: [] },
  ],
};
const F4_LOAD_30 = {
  window: 'Last 30 days',
  rows: [
    { id: 'jeni',   done: 58, open: 7, share: 39, recurring: 7, tags: ['Cooking', 'Admin'] },
    { id: 'fabian', done: 34, open: 4, share: 26, recurring: 4, tags: ['Cleaning', 'Repairs'] },
    { id: 'lena',   done: 24, open: 2, share: 17, recurring: 2, tags: ['Bins'] },
    { id: 'noah',   done: 18, open: 1, share: 12, recurring: 2, tags: ['Pet'] },
    { id: 'renate', done: 9,  open: 0, share: 6,  recurring: 0, tags: [] },
  ],
};

/* ───────── Rebalancing suggestion (US-4.3.2) ─────────
   Opt-in, human-confirmed. Move two recurring chores from Jeni to Fabian. */
const F4_SUGGESTION = {
  from: 'jeni',
  to: 'fabian',
  reason: 'Jeni has carried most of the cooking and admin for three weeks.',
  moves: [
    { taskId: 't2', title: 'Cook dinner', repeat: 'Every day', detail: 'Tuesdays and Thursdays' },
    { taskId: 't7', title: 'Pay the electricity bill', repeat: 'Every month', detail: 'Whole task' },
  ],
  respects: ['Role and permissions', 'Age-appropriate work', 'Known availability'],
};

/* ───────── Reminders / digest (US-4.2.1) ───────── */
const F4_DIGEST = {
  member: 'jeni',
  time: 'This morning · 7:30',
  items: [
    { title: 'Return school forms', meta: 'Overdue since yesterday', overdue: true },
    { title: 'Cook dinner', meta: 'Today · 18:00', overdue: false },
    { title: 'Pay the electricity bill', meta: 'Tomorrow', overdue: false },
  ],
};
const F4_REMINDER_PREFS = {
  lead: '30 minutes before',
  channels: { push: true, email: false },
  quietFrom: '21:00',
  quietTo: '7:00',
  digest: true,
};

/* ───────── Activity / audit (PRD Feature 16 hook) ───────── */
const F4_ACTIVITY = [
  { who: 'Lena',   c: '#E0A53C', text: 'ticked off Take the bins out', when: 'now',        kind: 'done' },
  { who: 'Noah',   c: '#2E8C5A', text: 'marked Feed the cat done', when: '5 min ago',  kind: 'child' },
  { who: 'Fabian', c: '#3F7DA6', text: 'finished Empty the dishwasher', when: '1h ago', kind: 'done' },
  { who: 'Jeni',   c: '#1C6E78', text: 'added Pay the electricity bill', when: '2h ago', kind: 'add' },
];

Object.assign(window, {
  F4_MEMBERS, F4_ME, F4_PARTNER, memberBy,
  F4_LISTS, listBy, F4_PRIORITY, F4_RECURRENCE,
  F4_TASKS, tasksWhen, F4_OPEN, F4_DONE, F4_BUCKETS,
  F4_LOAD_7, F4_LOAD_30, F4_SUGGESTION, F4_DIGEST, F4_REMINDER_PREFS, F4_ACTIVITY,
});

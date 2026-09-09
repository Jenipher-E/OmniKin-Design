/* OmniKin · Feature 2 (Household Access) — data model.
   Reuter Family, built from the PRD2 narrative (Amara's household):
   owner + co-owner, grandparent, teen, child, carer, plus a co-parenting space. */

/* ───────── Members ───────── */
const F2_MEMBERS = [
  { id: 'anna',   n: 'Anna',   full: 'Anna Reuter',   c: '#1C6E78', role: 'Owner',      you: true,  joined: 'Set up the household', last: 'Active now',  consent: null },
  { id: 'david',  n: 'David',  full: 'David Reuter',  c: '#3F7DA6', role: 'Co-owner',   joined: 'Joined Jan 2026',  last: '2h ago',     consent: null },
  { id: 'renate', n: 'Renate', full: 'Oma Renate',    c: '#9C5BB0', role: 'Grandparent', joined: 'Joined Feb 2026', last: 'Yesterday',  consent: null },
  { id: 'lena',   n: 'Lena',   full: 'Lena Reuter',   c: '#E0A53C', role: 'Teen',       age: 14, joined: 'Joined Feb 2026', last: '3h ago', consent: 'Consent on file' },
  { id: 'max',    n: 'Max',    full: 'Max Reuter',    c: '#2E8C5A', role: 'Child',      age: 8,  joined: 'Joined Feb 2026', last: '1d ago', consent: 'Guardian consent: Anna' },
  { id: 'sofia',  n: 'Sofia',  full: 'Sofia Adeyemi', c: '#E2683C', role: 'Carer',      joined: 'Joined Mar 2026',  last: '5h ago',     consent: null },
];

/* ───────── Pending invitations ───────── */
const F2_PENDING = [
  { id: 'p1', to: 'mara.k@email.de',     name: 'Tante Mara',  role: 'Relative', channel: 'email', status: 'Opened',   sent: '2 days ago', expires: 'in 5 days' },
  { id: 'p2', to: '+254 712 345 678',    name: 'Joy (helper)', role: 'Carer',   channel: 'sms',   status: 'Sent',     sent: '4h ago',     expires: 'in 7 days' },
  { id: 'p3', to: 'Single-use link',     name: 'Grandpa Otto', role: 'Grandparent', channel: 'link', status: 'Expired', sent: '9 days ago', expires: 'Expired' },
];

/* ───────── Roles ───────── */
/* tier drives the badge tint + the privilege ceiling ordering. */
const F2_ROLES = [
  { id: 'owner',       name: 'Owner',        tier: 'owner',  blurb: 'Full admin. Manages members, roles, permissions and ownership.' },
  { id: 'coowner',     name: 'Co-owner',     tier: 'owner',  blurb: 'Equal owner standing. Shares admin so the household never depends on one person.' },
  { id: 'guardian',    name: 'Guardian',     tier: 'guard',  blurb: 'Manages the household and holds consent for minors.' },
  { id: 'adult',       name: 'Adult',        tier: 'adult',  blurb: 'Contributes across most modules. No household admin.' },
  { id: 'teen',        name: 'Teen',         tier: 'minor',  blurb: 'Age-appropriate access. No expenses, documents or settings.' },
  { id: 'child',       name: 'Child',        tier: 'minor',  blurb: 'Most limited. Messaging stays inside the household.' },
  { id: 'grandparent', name: 'Grandparent',  tier: 'ext',    blurb: 'Scoped, mostly view. Stays close without running the household.' },
  { id: 'relative',    name: 'Relative',     tier: 'ext',    blurb: 'Scoped view and contribute for wider family.' },
  { id: 'carer',       name: 'Carer / Helper', tier: 'ext',  blurb: 'Calendar and tasks contribute. No finances or documents.' },
  { id: 'guest',       name: 'Guest',        tier: 'ext',    blurb: 'View only. The most restricted way to join.' },
];

/* ───────── Modules + permission matrix (PRD §2.4, Figure 1) ───────── */
const F2_MODULES = [
  { id: 'calendar',  label: 'Calendar' },
  { id: 'lists',     label: 'Lists / Tasks' },
  { id: 'meals',     label: 'Meals' },
  { id: 'documents', label: 'Documents',  sensitive: true },
  { id: 'messaging', label: 'Messaging' },
  { id: 'expenses',  label: 'Expenses',   sensitive: true },
  { id: 'location',  label: 'Location',   sensitive: true },
  { id: 'settings',  label: 'Household settings' },
];

/* levels: 0 none · 1 view · 2 contribute · 3 manage · special strings */
const F2_MATRIX = {
  //            cal lists meals docs  msg   exp   loc   set
  owner:       [3,  3,    3,    3,    3,    3,    3,    3],
  coowner:     [3,  3,    3,    3,    3,    3,    3,    3],
  guardian:    [3,  3,    3,    3,    3,    3,    3,    3],
  adult:       [2,  2,    2,    1,    2,    2,    1,    0],
  teen:        [2,  2,    1,    0,   'hh',  0,   'sc',  0],
  child:       [1,  2,    1,    0,   'hh',  0,   'sc',  0],
  grandparent: [1,  1,    1,    0,    2,    0,    0,    0],
  carer:       [2,  2,    1,    0,    2,    0,    0,    0],
  guest:       [1,  1,    1,    0,    1,    0,    0,    0],
  relative:    [1,  2,    1,    0,    1,    0,    0,    0],
};

/* ───────── Audit log (PRD §2.1.5 / §2.4) ───────── */
const F2_AUDIT = [
  { who: 'Anna',  c: '#1C6E78', action: 'Invited', target: 'Tante Mara as Relative', meta: 'by email · single-use', when: 'Today, 09:24' },
  { who: 'Anna',  c: '#1C6E78', action: 'Changed permission', target: 'Carer · Calendar', meta: 'View → Contribute', when: 'Today, 09:18', prev: 'View' },
  { who: 'David', c: '#3F7DA6', action: 'Joined', target: 'as Co-owner', meta: 'accepted invitation', when: 'Yesterday, 19:02' },
  { who: 'Anna',  c: '#1C6E78', action: 'Set role', target: 'Lena as Teen', meta: 'age 14 · consent captured', when: 'Mon, 14:11' },
  { who: 'Sofia', c: '#E2683C', action: 'Opened invite', target: 'Carer invitation', meta: 'from SMS link', when: 'Sun, 08:47' },
];

/* ───────── Co-parenting space (PRD §2.3.2) ───────── */
const F2_COPARENT = {
  name: 'Lena & Max · Shared',
  guardians: [
    { n: 'Anna', c: '#1C6E78', label: 'Reuter household' },
    { n: 'Tom',  c: '#C9453B', label: 'Second home' },
  ],
  shared: [
    { id: 'calendar', label: 'Children’s calendar', on: true },
    { id: 'expenses', label: 'Shared expenses', on: true },
    { id: 'lists',    label: 'Handover checklist', on: true },
  ],
  notShared: [
    { id: 'messaging', label: 'Personal messaging' },
    { id: 'documents', label: 'Private documents' },
    { id: 'location',  label: 'Precise location' },
  ],
};

Object.assign(window, { F2_MEMBERS, F2_PENDING, F2_ROLES, F2_MODULES, F2_MATRIX, F2_AUDIT, F2_COPARENT });

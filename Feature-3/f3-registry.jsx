/* OmniKin · Feature 3 — screen registry, version starts, gallery grouping. */
const W = window;

const F3_SCREENS = {
  /* ── First arrival · clear / empty states ── */
  shopEmptyA:     { render: (p) => <W.ShopEmptyA {...p} />,     label: 'Shopping · clear state (A)', tone: 'shell' },
  shopEmptyB:     { render: (p) => <W.ShopEmptyB {...p} />,     label: 'Shopping · clear state (B)', tone: 'shell' },
  listEmptyA:     { render: (p) => <W.ListEmptyA {...p} />,     label: 'New list · no items yet (A)', tone: 'shell' },
  listEmptyB:     { render: (p) => <W.ListEmptyB {...p} />,     label: 'New list · no items yet (B)', tone: 'shell' },
  staplesEmpty:   { render: (p) => <W.StaplesEmpty {...p} />,   label: 'Staples · clear state' },

  /* ── Version A · Calm ── */
  homeA:          { render: (p) => <W.HomeA {...p} />,          label: 'Home · Shopping card entry', tone: 'shell' },
  listsA:         { render: (p) => <W.ListsA {...p} />,         label: 'Lists · category overview', tone: 'shell' },
  listA:          { render: (p) => <W.ListA {...p} />,          label: 'Active list · single stream', tone: 'shell' },
  soldOutSheetA:  { render: (p) => <W.SoldOutSheetA {...p} />,  label: 'Sold out · bottom sheet' },
  listSettingsA:  { render: (p) => <W.ListSettingsA {...p} />,  label: 'List settings · auto-carry' },

  /* ── Version B · Bold ── */
  homeB:          { render: (p) => <W.HomeB {...p} />,          label: 'Home · bold Shopping hero', tone: 'shell' },
  shopHubB:       { render: (p) => <W.ShopHubB {...p} />,       label: 'Shopping hub · own tab', tone: 'shell' },
  listB:          { render: (p) => <W.ListB {...p} />,          label: 'Active list · grouped by store', tone: 'shell' },
  soldOutFullB:   { render: (p) => <W.SoldOutFullB {...p} />,   label: 'Sold out · full-screen step' },

  /* ── The out-of-stock loop (differentiator) ── */
  carryForward:     { render: (p) => <W.CarryForward {...p} />,     label: 'Carried forward · shopper' },
  substituteCreator:{ render: (p) => <W.SubstituteCreator {...p} />, label: 'Substitutes · creator decides' },
  resolved:         { render: (p) => <W.Resolved {...p} />,         label: 'Resolved · swap chosen' },
  awaitingReply:    { render: (p) => <W.AwaitingReply {...p} />,    label: 'Awaiting reply · creator offline' },

  /* ── Items & lists (Epic 3.1) ── */
  addItem:        { render: (p) => <W.AddItem {...p} />,        label: 'Add item · structured record' },
  itemDetail:     { render: (p) => <W.ItemDetail {...p} />,     label: 'Item detail · full record' },
  createList:     { render: (p) => <W.CreateList {...p} />,     label: 'Create & share a list' },
  categories:     { render: (p) => <W.Categories {...p} />,     label: 'Categories · safe delete' },
  staples:        { render: (p) => <W.Staples {...p} />,        label: 'Staples · save & reuse' },
  archive:        { render: (p) => <W.Archive {...p} />,        label: 'Archive & restore' },

  /* ── Capture & offline (Epic 3.3.2 / 3.3.3) ── */
  voiceCapture:   { render: (p) => <W.VoiceCapture {...p} />,   label: 'Voice capture · parsed' },
  barcodeScan:    { render: (p) => <W.BarcodeScan {...p} />,    label: 'Barcode scan · resolved' },
  offline:        { render: (p) => <W.Offline {...p} />,        label: 'Offline · cached & queued' },
  syncConflict:   { render: (p) => <W.SyncConflict {...p} />,   label: 'Sync · conflict surfaced' },
  readOnly:       { render: (p) => <W.ReadOnly {...p} />,       label: 'View-only · read-only state' },

  /* ── Parked (not in this release) ── */
  mealPush:       { render: (p) => <W.MealPush {...p} />,       label: 'Meal Planner push (US-3.3.1)' },
  flowB:          { render: (p) => <W.FlowB {...p} />,          label: 'Flow B · meal to list' },
};

/* version entry points */
const F3_START = { A: 'homeA', B: 'homeB' };

/* gallery sections (design canvas) */
const F3_GALLERY = [
  { id: 'empty', title: 'First arrival · clear states', subtitle: 'Before anything exists: each create surface says plainly that nothing has been created yet and offers one calm way to start. Shown for both versions', screens: ['shopEmptyA', 'shopEmptyB', 'listEmptyA', 'listEmptyB', 'staplesEmpty'] },
  { id: 'verA', title: 'Version A · Calm', subtitle: 'Opened from the Home / Lists card · single stream with filter chips · compact rows · sold-out as a bottom sheet', screens: ['homeA', 'listsA', 'listA', 'soldOutSheetA', 'listSettingsA'] },
  { id: 'verB', title: 'Version B · Bold', subtitle: 'Its own bottom-tab hub · grouped by store · airy cards · sold-out as a full-screen step', screens: ['homeB', 'shopHubB', 'listB', 'soldOutFullB'] },
  { id: 'oos',  title: 'The out-of-stock loop ★', subtitle: 'The differentiator: sold out is carried forward and the creator is offered substitutes, no phone call', screens: ['carryForward', 'substituteCreator', 'resolved', 'awaitingReply'] },
  { id: 'capture', title: 'Fast capture', subtitle: 'Add an item in seconds by voice or barcode, with a confirm step for low-confidence results', screens: ['addItem', 'itemDetail', 'voiceCapture', 'barcodeScan', 'staples'] },
  { id: 'lists', title: 'Lists & structure', subtitle: 'Create and share, organise into categories with safe deletes, archive and restore', screens: ['createList', 'categories', 'archive'] },
  { id: 'offline', title: 'Offline & access', subtitle: 'Shop with no signal and merge on reconnect; view-only members see a read-only list', screens: ['offline', 'syncConflict', 'readOnly'] },
  { id: 'parked', title: 'Not in this release', subtitle: 'US-3.3.1 and Flow B depend on the Meal Planner (Feature 7) — designed here, parked for a later iteration', screens: ['mealPush', 'flowB'] },
];

Object.assign(window, { F3_SCREENS, F3_START, F3_GALLERY });

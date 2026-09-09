/* OmniKin · Full journey — shared core.
   Builds the merged screen registry, the master "jump to a flow" chapter list,
   the ordered "user journey flow", and the gallery grouping — all consumed by
   both the interactive prototype (omni-full-journey.jsx) and the all-screens
   gallery (omni-full-gallery.jsx). The original feature files are untouched. */
const CORE = window.__okMerge('f1', 'f2');           // stable base + F1 + F2 kit
const { OK_FONT, OK_MONO, I } = CORE;

/* ════════════════════ BRIDGE SCREENS (journey-only) ════════════════════
   The fresh-household Home, the household Settings page and the "ready" Home
   stitch Feature 1's onboarding into Feature 2's household access. Ported from
   the original journey; they read their kit from the fixed CORE object so they
   render correctly no matter which feature's globals are currently on window. */
function BridgeHome({ t, platform, go, jumpTo }) {
  const { Avatar, Card, Pad, Spacer, Btn, Screen, TabBar } = CORE;
  const tabs = [['Home', I.home, true], ['Calendar', I.cal, false], ['Lists', I.list, false], ['Tasks', I.checkCircle, false], ['Settings', I.gear, false, 'settingsList']];
  const launch = [
    ['Calendar', I.cal, t.teal700, t.panelTeal, null],
    ['Lists', I.list, t.blue, t.panelBlue, () => jumpTo && jumpTo('f3')],
    ['Tasks', I.checkCircle, t.coral, t.panelCoral, () => jumpTo && jumpTo('f4')],
    ['Settings', I.gear, t.green, t.panelGreen, () => go('settingsList')],
  ];
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Pad style={{ paddingTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, fontWeight: 500 }}>Your household</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 24, fontWeight: 700, color: t.title, letterSpacing: -0.4 }}>Reuter Family</div>
            </div>
            <Avatar color="#1C6E78" name="A" size={42} ring={t.surface} />
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: t.panelGreen, padding: '5px 11px', borderRadius: 999, marginTop: 10 }}>{I.shield(t.green, 13)}<span style={{ fontFamily: OK_FONT, fontSize: 12, fontWeight: 700, color: t.green }}>Household created, you’re the Owner</span></div>
        </Pad>
        <Spacer h={16} />

        <Pad>
          <div style={{ background: t.surface, border: `1px solid ${t.coral}`, borderRadius: 18, overflow: 'hidden', boxShadow: t.shadowSm }}>
            <div style={{ height: 4, background: t.coral }} />
            <div style={{ padding: '16px 17px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: t.panelCoral, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{I.user(t.coral, 19)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.ink }}>Finish setting up your household</div>
                  <div style={{ fontFamily: OK_MONO, fontSize: 10.5, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', color: t.muted, marginTop: 3 }}>Step 2 of 2 · last thing</div>
                </div>
              </div>
              <div style={{ fontFamily: OK_FONT, fontSize: 13.5, color: t.slate, lineHeight: 1.5, marginBottom: 14 }}>Right now it’s just you and nothing has been added yet. Invite the people who help run your home and each of them joins with their own login, their own role and their own private view.</div>
              <Btn t={t} kind="primary" icon={I.plus('#fff', 18)} onClick={() => go('inviteRole')}>Invite members</Btn>
              <div style={{ textAlign: 'center', marginTop: 11 }}><span onClick={() => go('homeReady')} style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 600, color: t.slate, cursor: 'pointer' }}>Skip for now</span></div>
            </div>
          </div>
        </Pad>
        <Spacer h={16} />

        <Pad>
          <Card t={t} pad={16}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink }}>Members · 1</span>
              <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>Each has their own login</span>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 56 }}>
                <Avatar color="#1C6E78" name="A" size={46} ring={t.surface} />
                <span style={{ fontFamily: OK_FONT, fontSize: 12, fontWeight: 600, color: t.ink }}>Anna</span>
                <span style={{ fontFamily: OK_FONT, fontSize: 9.5, fontWeight: 700, color: t.green, background: t.panelGreen, padding: '1px 6px', borderRadius: 999 }}>OWNER</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 56 }}>
                <button onClick={() => go('inviteRole')} style={{ width: 46, height: 46, borderRadius: '50%', border: `1.5px dashed ${t.teal300}`, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{I.plus(t.teal500)}</button>
                <span style={{ fontFamily: OK_FONT, fontSize: 12, fontWeight: 600, color: t.teal500 }}>Invite</span>
              </div>
            </div>
          </Card>
        </Pad>
        <Spacer h={16} />

        <Pad>
          <div style={{ fontFamily: OK_MONO, fontSize: 10.5, fontWeight: 600, letterSpacing: 0.7, textTransform: 'uppercase', color: t.muted, marginBottom: 9 }}>Jump into a module</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {launch.map(([label, icon, color, bg, onClick]) => (
              <button key={label} onClick={onClick || undefined} style={{ border: `1px solid ${t.hairline}`, background: t.surface, borderRadius: 16, padding: 15, height: 92, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: t.shadowSm, cursor: onClick ? 'pointer' : 'default', textAlign: 'left' }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon(color, 20)}</div>
                <div>
                  <span style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink, display: 'block' }}>{label}</span>
                  {onClick && <span style={{ fontFamily: OK_FONT, fontSize: 11, color: t.teal500, fontWeight: 600 }}>Open →</span>}
                </div>
              </button>
            ))}
          </div>
        </Pad>
        <Spacer h={16} />
      </div>
      <TabBar t={t} platform={platform} tabs={tabs} go={go} />
    </Screen>
  );
}

function BridgeSettings({ t, platform, go, back }) {
  const { FlowHeader, Pad, H1, Spacer, Screen, ListGroup, ListRow, Avatar } = CORE;
  const M = CORE.F2_MEMBERS, P = CORE.F2_PENDING;
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} />
      <Pad style={{ paddingTop: 2, paddingBottom: 22 }}>
        <H1 t={t}>Settings</H1>
        <Spacer h={18} />
        <ListGroup t={t} title="Account" style={{ marginBottom: 18 }}>
          <ListRow t={t} icon={<Avatar color="#1C6E78" name="A" size={32} />} iconBg="transparent" label="Anna Reuter" sub="anna.reuter@email.de" onClick={() => {}} last />
        </ListGroup>
        <ListGroup t={t} title="Household" style={{ marginBottom: 18 }}>
          <ListRow t={t} icon={I.user(t.teal700, 18)} label="Members & roles" sub={`${M.length} members · ${P.length} pending`} onClick={() => go('householdA')} />
          <ListRow t={t} icon={I.lock(t.teal700, 18)} label="Roles & permissions" sub="Who can see and do what" onClick={() => go('permissionMatrix')} />
          <ListRow t={t} icon={I.shield(t.teal700, 18)} label="Ownership" sub="Anna · 1 co-owner" onClick={() => go('addCoOwner')} />
          <ListRow t={t} icon={I.home(t.teal700, 18)} label="Extended & co-parenting" sub="Grandparents, carers, two homes" onClick={() => go('extendedRoles')} />
          <ListRow t={t} icon={I.doc(t.teal700, 18)} label="Activity log" sub="Every change, owner-visible" onClick={() => go('auditLog')} last />
        </ListGroup>
        <ListGroup t={t} title="App">
          <ListRow t={t} icon={I.shield(t.slate, 18)} iconBg={t.surfaceAlt} label="Privacy" onClick={() => {}} />
          <ListRow t={t} icon={I.gear(t.slate, 18)} iconBg={t.surfaceAlt} label="Notifications" onClick={() => {}} last />
        </ListGroup>
      </Pad>
    </Screen>
  );
}

function BridgeReady(p) {
  const C = p.version === 'A' ? CORE.HomeA : CORE.HomeB;
  return <C {...p} />;
}

/* ════════════════════ MERGED REGISTRIES ════════════════════
   core = F1 (closure-bound, self-contained) + F2 (window-resolved) + bridges.
   f3 / f4 = the feature registries verbatim. The "home" key is owned by the
   bridge so the journey's fresh-household Home wins over F1's stock home. */
const REG = {
  core: Object.assign({}, window.SCREENS, window.F2_SCREENS, {
    home:         { render: (q) => <BridgeHome {...q} />,     label: 'Home · first arrival · just you' },
    homeReady:    { render: (q) => <BridgeReady {...q} />,    label: 'Home · household ready' },
    settingsList: { render: (q) => <BridgeSettings {...q} />, label: 'Settings · household' },
  }),
  f3: window.F3_SCREENS,
  f4: window.F4_SCREENS,
};
/* raw per-feature registries for the gallery (no bridge overrides, so F1's own
   home/homeFresh still resolve correctly) */
const RAW = { f1: window.SCREENS, f2: window.F2_SCREENS, f3: window.F3_SCREENS, f4: window.F4_SCREENS };

/* which namespaces to activate before rendering a screen of each feature */
const NS_FOR = { core: ['f1', 'f2'], f1: ['f1'], f2: ['f1', 'f2'], f3: ['f3'], f4: ['f4'] };
const START = { f3: { A: 'homeA', B: 'homeB' }, f4: { A: 'homeA', B: 'homeB' } };
const fp = (feat) => [feat, { A: START[feat].A, B: START[feat].B }];   // version-aware start pair

/* completion screens that should drop back to the populated household Home */
const TO_HOME = { inviteSent: 'homeReady', coOwnerDone: 'homeReady' };

/* ════════════════════ JUMP TO A FLOW (grouped) ════════════════════ */
const JUMP = [
  { group: 'Feature 1 · Login & account creation' },
  { id: 'welcome',   label: 'Welcome',             sub: 'First open',                 stack: [['core', 'welcomeB']] },
  { id: 'account',   label: 'Create account',      sub: 'Household + password',       stack: [['core', 'welcomeB'], ['core', 'euSignup']] },
  { id: 'profile',   label: 'Set up profile',      sub: 'Name & colour',              stack: [['core', 'welcomeB'], ['core', 'euSignup'], ['core', 'euDisplayName']] },
  { id: 'verify',    label: 'Verify email',        sub: '6-digit code',               stack: [['core', 'welcomeB'], ['core', 'euSignup'], ['core', 'euDisplayName'], ['core', 'euVerify']] },
  { id: 'biometric', label: 'Enable biometrics',   sub: 'Fast, secure re-entry',      stack: [['core', 'welcomeB'], ['core', 'biometric']] },
  { group: 'First arrival · the clear state' },
  { id: 'setup',     label: 'Home · first arrival', sub: 'Just you, nothing added yet', stack: [['core', 'home']] },
  { group: 'Feature 2 · Household access' },
  { id: 'invite',    label: 'Invite a member',     sub: 'Role, channel, sent',        stack: [['core', 'home'], ['core', 'inviteRole']] },
  { id: 'ready',     label: 'Household ready',     sub: 'Members now joined',         stack: [['core', 'homeReady']] },
  { id: 'members',   label: 'Members & roles',     sub: 'Detail, change role',        stackByVer: { A: [['core', 'homeReady'], ['core', 'settingsList'], ['core', 'householdA']], B: [['core', 'homeReady'], ['core', 'peopleHub']] } },
  { id: 'perms',     label: 'Permissions',         sub: 'Matrix & editors',           stack: [['core', 'homeReady'], ['core', 'permissionMatrix']] },
  { id: 'child',     label: 'Child safety',        sub: 'Consent & limits',           stack: [['core', 'homeReady'], ['core', 'childRestrictions']] },
  { id: 'owner',     label: 'Ownership',           sub: 'Co-owner, transfer, MFA',    stack: [['core', 'homeReady'], ['core', 'addCoOwner']] },
  { id: 'extended',  label: 'Extended family',     sub: 'Grandparent, carer',         stack: [['core', 'homeReady'], ['core', 'extendedRoles']] },
  { id: 'coparent',  label: 'Co-parenting',        sub: 'Two-home space',             stack: [['core', 'homeReady'], ['core', 'coParentSetup']] },
  { id: 'audit',     label: 'Activity log',        sub: 'Tamper-evident',             stack: [['core', 'homeReady'], ['core', 'auditLog']] },
  { group: 'Feature 3 · Shopping lists' },
  { id: 'f3home',    label: 'Shopping home',       sub: 'Entry point',                stack: [fp('f3')] },
  { id: 'f3browse',  label: 'Browse lists',        sub: 'Categories',                 stack: [fp('f3'), ['f3', { A: 'listsA', B: 'shopHubB' }]] },
  { id: 'f3empty',   label: 'First arrival',       sub: 'Clear / empty state',        stack: [fp('f3'), ['f3', { A: 'shopEmptyA', B: 'shopEmptyB' }]] },
  { id: 'f3list',    label: 'Active list',         sub: 'Tick off · filter',          stack: [fp('f3'), ['f3', { A: 'listA', B: 'listB' }]] },
  { id: 'f3oos',     label: 'Sold-out loop ★',     sub: 'The differentiator',         stack: [fp('f3'), ['f3', { A: 'soldOutSheetA', B: 'soldOutFullB' }]] },
  { id: 'f3sub',     label: 'Substitute decision', sub: 'Creator side',               stack: [fp('f3'), ['f3', 'substituteCreator']] },
  { id: 'f3add',     label: 'Add an item',         sub: 'Structured record',          stack: [fp('f3'), ['f3', 'addItem']] },
  { id: 'f3capture', label: 'Voice & barcode',     sub: 'Fast capture',               stack: [fp('f3'), ['f3', 'voiceCapture']] },
  { id: 'f3staples', label: 'Staples & reuse',     sub: 'Recurring set',              stack: [fp('f3'), ['f3', 'staples']] },
  { id: 'f3lists',   label: 'Lists & categories',  sub: 'Create · organise',          stack: [fp('f3'), ['f3', 'createList']] },
  { id: 'f3offline', label: 'Offline & sync',      sub: 'Low-connectivity',           stack: [fp('f3'), ['f3', 'offline']] },
  { id: 'f3access',  label: 'View-only access',    sub: 'Read-only state',            stack: [fp('f3'), ['f3', 'readOnly']] },
  { id: 'f3parked',  label: 'Not in this release', sub: 'Meal Planner · Flow B',      stack: [fp('f3'), ['f3', 'mealPush']] },
  { group: 'Feature 4 · Tasks' },
  { id: 'f4home',    label: 'Tasks home',          sub: 'Entry point',                stack: [fp('f4')] },
  { id: 'f4browse',  label: 'Task stream',         sub: 'Day / assignee grouped',     stack: [fp('f4'), ['f4', { A: 'tasksA', B: 'tasksB' }]] },
  { id: 'f4empty',   label: 'First arrival',       sub: 'Clear / empty state',        stack: [fp('f4'), ['f4', { A: 'tasksEmptyA', B: 'tasksEmptyB' }]] },
  { id: 'f4create',  label: 'Create & assign ★',   sub: 'Recurring chore flow',       stack: [fp('f4'), ['f4', 'createTask']] },
  { id: 'f4detail',  label: 'Task detail',         sub: 'Notes · subtasks · files',   stack: [fp('f4'), ['f4', 'taskDetail']] },
  { id: 'f4repeat',  label: 'Edit a repeat',       sub: 'Edit details · then scope',  stack: [fp('f4'), ['f4', 'editTask']] },
  { id: 'f4complete', label: 'Complete & reopen',  sub: 'Next occurrence made',       stack: [fp('f4'), ['f4', { A: 'completeA', B: 'completeB' }]] },
  { id: 'f4child',   label: 'Child chore',         sub: 'Light acknowledgement',      stack: [fp('f4'), ['f4', 'childAckA']] },
  { id: 'f4fair',    label: 'Fair-load view ★',    sub: 'The differentiator',         stack: [fp('f4'), ['f4', { A: 'fairLoadA', B: 'fairLoadB' }]] },
  { id: 'f4rebalance', label: 'Rebalance the load ★', sub: 'Opt-in, human-confirmed', stack: [fp('f4'), ['f4', 'rebalance']] },
  { id: 'f4reminders', label: 'Reminders',         sub: 'Calm digest · settings',     stack: [fp('f4'), ['f4', 'remindersA']] },
  { id: 'f4offline', label: 'Offline & sync',      sub: 'Low-connectivity',           stack: [fp('f4'), ['f4', 'offline']] },
  { id: 'f4parked',  label: 'Not in this release', sub: 'Agenda · calendar · timetable', stack: [fp('f4'), ['f4', 'agendaParked']] },
];

/* ════════════════════ USER JOURNEY FLOW (ordered narrative) ════════════════════
   One Owner, from first launch through every feature, in order. */
const f3steps = [
  ['First open of Shopping',    'Clear state, nothing created yet',      { A: 'shopEmptyA', B: 'shopEmptyB' }],
  ['Creates the first list',    'Name, category and who can see it',     'createList'],
  ['The new list is empty',     'Clear state, add the first item',       { A: 'listEmptyA', B: 'listEmptyB' }],
  ['Adds the first item',       'Structured · brand, amount, shop',      'addItem'],
  ['Captures more, fast',       'By voice, parsed into items',           'voiceCapture'],
  ['Saves a set of staples',    'Reuse next week in one tap',            'staples'],
  ['The shared list fills up',  'Everyone adds in real time',            { A: 'listA', B: 'listB' }],
  ['An item is sold out',       'Marked at the shelf by Fabian',         { A: 'soldOutSheetA', B: 'soldOutFullB' }],
  ['It is carried forward',     'Nothing lost to a stock-out',           'carryForward'],
  ['The creator picks a swap',  "From the household's usual buys",       'substituteCreator'],
  ['The swap is resolved',      'No phone call needed',                  'resolved'],
  ["Opens the item's record",   'Out-of-stock history kept',             'itemDetail'],
  ['Organises into categories', 'Structured, with safe deletes',         'categories'],
  ['Shops with no signal',      'Saved, then synced on reconnect',       'offline'],
];
const f4steps = [
  ['First open of Tasks',       'Clear state, nothing created yet',      { A: 'tasksEmptyA', B: 'tasksEmptyB' }],
  ['Creates the first task',    'Structured · recurring chore',          'createTask'],
  ['Created and assigned',      'Repeats weekly, goes to Lena',          'assignDone'],
  ['The shared stream fills up', 'Grouped by day / by assignee',         { A: 'tasksA', B: 'tasksB' }],
  ['Opens a task in detail',    'Notes · checklist · attachments',       'taskDetail'],
  ['Edits a repeating task',    'Edit details, then choose scope',       'editTask'],
  ['Marks a task done',         'Next occurrence made for her',          { A: 'completeA', B: 'completeB' }],
  ['A child finishes a chore',  'Gentle, reward-free acknowledgement',   'childAckA'],
  ['The morning digest',        'One calm daily reminder',               'remindersA'],
  ['Tunes reminder settings',   'Quiet hours, per channel',              'reminderPrefs'],
  ['Ticks a task offline',      'Saved, then synced later',              'offline'],
  ['The fair-load view',        'Who carries the mental load',           { A: 'fairLoadA', B: 'fairLoadB' }],
  ['Rebalances the load',       'Opt-in, human-confirmed',               'rebalance'],
];
const JOURNEY = [
  { group: 'Onboarding' },
  { label: 'First open of OmniKin',       sub: 'The welcome screen',              stack: [['core', 'welcomeB']] },
  { label: 'Creates the household',       sub: 'Email and a strong password',     stack: [['core', 'welcomeB'], ['core', 'euSignup']] },
  { label: 'Sets up her profile',         sub: 'Display name and colour',         stack: [['core', 'welcomeB'], ['core', 'euSignup'], ['core', 'euDisplayName']] },
  { label: 'Verifies her email',          sub: 'A 6-digit code',                  stack: [['core', 'welcomeB'], ['core', 'euSignup'], ['core', 'euDisplayName'], ['core', 'euVerify']] },
  { label: 'Enables biometric unlock',    sub: 'Fast, secure re-entry',           stack: [['core', 'welcomeB'], ['core', 'biometric']] },
  { label: 'Lands on a fresh household',  sub: 'Just her, nothing added yet',     stack: [['core', 'home']] },
  { group: 'Household access' },
  { label: 'Invites the first members',   sub: 'Role first, then channel',        stack: [['core', 'home'], ['core', 'inviteRole']] },
  { label: 'The household is ready',      sub: 'People have joined',              stack: [['core', 'homeReady']] },
  { label: 'Reviews members and roles',   sub: 'Each capped at their level',      stackByVer: { A: [['core', 'homeReady'], ['core', 'settingsList'], ['core', 'householdA']], B: [['core', 'homeReady'], ['core', 'peopleHub']] } },
  { label: 'Sets permissions',            sub: 'Who can see and do what',         stack: [['core', 'homeReady'], ['core', 'permissionMatrix']] },
  { label: 'Adds a co-owner',             sub: 'Confirmed with MFA',              stack: [['core', 'homeReady'], ['core', 'addCoOwner']] },
  { group: 'Shopping lists' },
  ...f3steps.map(([label, sub, k]) => ({ label, sub, stack: [fp('f3'), ['f3', k]] })),
  { group: 'Tasks' },
  ...f4steps.map(([label, sub, k]) => ({ label, sub, stack: [fp('f4'), ['f4', k]] })),
];

/* ════════════════════ GALLERY GROUPING ════════════════════
   Each feature's own gallery sections, in order. Version A and B variants are
   already split into their own sections by the feature registries, so reviewing
   both side by side per screen needs no toggle. */
const GALLERY_GROUPS = [
  { feat: 'f1', kicker: 'Feature 1', title: 'Login & account creation', sections: window.GALLERY },
  { feat: 'f2', kicker: 'Feature 2', title: 'Household access',         sections: window.F2_GALLERY },
  { feat: 'f3', kicker: 'Feature 3', title: 'Shopping lists',           sections: window.F3_GALLERY },
  { feat: 'f4', kicker: 'Feature 4', title: 'Tasks',                    sections: window.F4_GALLERY },
];

window.OKJ = {
  CORE, REG, RAW, NS_FOR, START, TO_HOME, JUMP, JOURNEY, GALLERY_GROUPS,
  resolveKey: (k, v) => (k && typeof k === 'object' ? k[v] : k),
};

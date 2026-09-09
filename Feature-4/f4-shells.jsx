/* OmniKin · Feature 4 (Tasks) — version shells.
   Version A (Calm): Tasks opened from Home/Tasks card · single day-grouped stream · compact rows · calm fair-load card · sheets.
   Version B (Bold): own bottom-tab hub · bold header carrying a live fair-load summary · airy cards grouped by assignee. */
const {
  OK_FONT, OK_MONO, I, Screen, Btn,
  TI, LIST_ICON, Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, AvatarStack, Card, TaskCheck, AssigneeChip, DueChip, RepeatChip,
  TaskRow, LoadBar, Seg, TabBar, FAB, GroupHead, PrivacyLine,
  F4_MEMBERS, F4_ME, memberBy, listBy, F4_LISTS, F4_TASKS, tasksWhen, F4_OPEN, F4_DONE, F4_BUCKETS,
  F4_LOAD_7, F4_ACTIVITY,
} = window;

const openCount = () => F4_OPEN.length;
const overdue = () => tasksWhen('overdue');
const todayTasks = () => tasksWhen('today');
const mineOpen = () => F4_OPEN.filter((t) => t.assignees.includes('jeni'));

/* tab definitions */
const TABS_A = (active, go) => [
  ['Home', I.home, active === 'home', 'homeA'],
  ['Calendar', I.cal, active === 'cal'],
  ['Tasks', TI.checklist, active === 'tasks', 'tasksA'],
  ['Docs', I.doc, active === 'docs'],
  ['Settings', I.gear, active === 'settings'],
];
const TABS_B = (active, go) => [
  ['Home', I.home, active === 'home', 'homeB'],
  ['Calendar', I.cal, active === 'cal'],
  ['Tasks', TI.checklist, active === 'tasks', 'tasksB'],
  ['Agenda', TI.agenda, active === 'agenda'],
  ['Settings', I.gear, active === 'settings'],
];

/* ════════════════════════════════════════════════════════════
   VERSION A · CALM
   ════════════════════════════════════════════════════════════ */

function HomeA({ t, platform, go }) {
  const od = overdue().length, td = todayTasks().length;
  const me = F4_LOAD_7.rows.find((r) => r.id === 'jeni');
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, fontWeight: 500 }}>Good morning, Jeni</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 24, fontWeight: 700, color: t.title, letterSpacing: -0.4 }}>Vogel Family</div>
            </div>
            <Avatar color="#1C6E78" name="J" size={42} ring={t.surface} />
          </div>
        </Pad>
        <Spacer h={18} />
        {/* Tasks entry card — the way into the feature in Version A */}
        <Pad>
          <Card t={t} pad={0} onClick={() => go('tasksA')} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '15px 16px' }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{TI.checklist(t.teal700, 24)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.ink }}>Tasks</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2 }}>{openCount()} open · shared with the household</div>
              </div>
              {I.chevR(t.muted, 18)}
            </div>
            <div style={{ borderTop: `1px solid ${t.hairline}`, padding: '13px 16px', background: t.surfaceAlt, display: 'flex', alignItems: 'center', gap: 10 }}>
              {od > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 12, fontWeight: 700, color: t.warning }}>{TI.alert(t.warning, 14)}{od} overdue</span>}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 12, fontWeight: 600, color: t.slate }}>{TI.clock(t.slate, 13)}{td} due today</span>
              <Grow />
              <AvatarStack t={t} ids={['jeni', 'fabian', 'lena', 'noah']} size={24} />
            </div>
          </Card>
        </Pad>
        <Spacer h={14} />
        {/* Fair-load gentle nudge */}
        <Pad>
          <Card t={t} onClick={() => go('fairLoadA')} pad={14} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{TI.scales(t.green, 22)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>Fair-load view</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2 }}>You are carrying {me.share}% this week. See how the load is shared.</div>
            </div>
            {I.chevR(t.muted, 18)}
          </Card>
        </Pad>
        <Spacer h={16} />
        <Pad><GroupHead t={t} style={{ marginBottom: 10 }}>Today in the household</GroupHead></Pad>
        <Pad>
          <Card t={t} pad={4}>
            {F4_ACTIVITY.slice(0, 4).map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 11, padding: '10px 12px', borderBottom: i === 3 ? 'none' : `1px solid ${t.hairline}`, alignItems: 'center' }}>
                <Avatar color={a.c} name={a.who} size={30} ring={t.surface} />
                <div style={{ flex: 1, minWidth: 0 }}><span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.4 }}><b>{a.who}</b> {a.text}</span></div>
                <span style={{ fontFamily: OK_FONT, fontSize: 11, color: t.muted, flex: '0 0 auto' }}>{a.when}</span>
              </div>
            ))}
          </Card>
        </Pad>
        <Spacer h={16} />
        {/* Up next for you — mirrors the Bold (B) home, brought to the calm home */}
        <Pad><GroupHead t={t} style={{ marginBottom: 10 }}>Up next for you</GroupHead></Pad>
        <Pad>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mineOpen().slice(0, 2).map((it) => <TaskRow key={it.id} t={t} task={it} airy onClick={() => go('tasksA')} onCheck={() => go('completeA')} />)}
          </div>
        </Pad>
        <Spacer h={20} />
      </div>
      <TabBar t={t} platform={platform} tabs={TABS_A('home')} go={go} />
    </Screen>
  );
}

/* Tasks stream — single stream grouped by day (Version A) */
function TasksA({ t, platform, go, back }) {
  const [scope, setScope] = React.useState('all');
  const me = F4_LOAD_7.rows.find((r) => r.id === 'jeni');
  const pick = (arr) => scope === 'mine' ? arr.filter((x) => x.assignees.includes('jeni')) : arr;
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}`, paddingBottom: 12 }}>
        <Pad style={{ paddingTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex', alignItems: 'center', gap: 3, fontFamily: OK_FONT, fontSize: 14, color: t.slate }}>{I.back(t.slate)} Home</button>
            <button onClick={() => go('remindersA')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, display: 'flex' }}>{TI.bell(t.slate, 20)}</button>
          </div>
          <div style={{ marginTop: 2 }}>
            <H1 t={t} style={{ fontSize: 26 }}>Tasks</H1>
            <Lead t={t} style={{ marginTop: 5, fontSize: 13.5 }}>Shared to-dos and chores. Everyone with access sees changes in real time.</Lead>
          </div>
          <Spacer h={12} />
          <Seg t={t} full value={scope} onChange={setScope} options={[{ v: 'all', label: 'All household' }, { v: 'mine', label: 'Mine' }]} />
        </Pad>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* fair-load strip */}
        <Pad style={{ marginTop: 14 }}>
          <button onClick={() => go('fairLoadA')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, border: `1px solid ${t.hairline}`, background: t.panelGreen, borderRadius: 14, padding: '12px 14px', cursor: 'pointer', textAlign: 'left' }}>
            {TI.scales(t.green, 20)}
            <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13, color: t.ink }}>You are carrying <b>{me.share}%</b> of the load this week. <span style={{ color: t.green, fontWeight: 700 }}>See the fair-load view</span></span>
            {I.chevR(t.green, 16)}
          </button>
        </Pad>
        {F4_BUCKETS.map((b) => {
          const items = pick(tasksWhen(b.id));
          if (items.length === 0) return null;
          return (
            <div key={b.id} style={{ marginTop: 16 }}>
              <Pad><GroupHead t={t} style={{ marginBottom: 8 }} right={b.id === 'overdue' ? <span style={{ fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: t.warning }}>{items.length}</span> : <span style={{ fontFamily: OK_MONO, fontSize: 11.5, color: t.muted }}>{items.length}</span>}>{b.label}</GroupHead></Pad>
              <div style={{ background: t.surface, margin: '0 20px', borderRadius: 16, border: `1px solid ${b.id === 'overdue' ? 'rgba(224,165,60,.5)' : t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden' }}>
                {items.map((it, i) => (
                  <TaskRow key={it.id} t={t} task={it} last={i === items.length - 1}
                    onClick={() => go('taskDetail')}
                    onCheck={() => it.child ? go('childAckA') : go('completeA')} />
                ))}
              </div>
            </div>
          );
        })}
        {/* done */}
        <Pad style={{ marginTop: 16 }}>
          <GroupHead t={t} style={{ marginBottom: 8 }} right={<Link t={t} style={{ fontSize: 12.5 }}>Show all</Link>}>Done today · {F4_DONE.length}</GroupHead>
          <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, overflow: 'hidden' }}>
            {pick(F4_DONE).map((it, i) => <TaskRow key={it.id} t={t} task={it} last={i === F4_DONE.length - 1} onClick={() => go('completeA')} />)}
          </div>
        </Pad>
        <Spacer h={110} />
      </div>
      {/* add bar */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: platform === 'ios' ? 22 : 14, padding: '0 18px', zIndex: 20 }}>
        <button onClick={() => go('createTask')} style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: t.coral, boxShadow: '0 8px 22px rgba(226,104,60,.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: '#fff' }}>{I.plus('#fff', 20)} Add a task</button>
      </div>
    </Screen>
  );
}

/* ════════════════════════════════════════════════════════════
   VERSION B · BOLD
   ════════════════════════════════════════════════════════════ */

function HomeB({ t, platform, go }) {
  const me = F4_LOAD_7.rows.find((r) => r.id === 'jeni');
  const od = overdue().length, td = todayTasks().length;
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, fontWeight: 500 }}>Good morning, Jeni</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 24, fontWeight: 700, color: t.title, letterSpacing: -0.4 }}>Vogel Family</div>
            </div>
            <Avatar color="#1C6E78" name="J" size={42} ring={t.surface} />
          </div>
        </Pad>
        <Spacer h={18} />
        {/* Bold tasks hero with fair-load summary */}
        <Pad>
          <div onClick={() => go('tasksB')} style={{ cursor: 'pointer', borderRadius: 22, overflow: 'hidden', background: t.teal700, boxShadow: '0 12px 30px rgba(28,110,120,.28)' }}>
            <div style={{ padding: '18px 18px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,.85)', textTransform: 'uppercase', letterSpacing: 1 }}>{TI.checklist('#fff', 15)} Tasks</div>
                {I.chevR('#fff', 20)}
              </div>
              <div style={{ fontFamily: OK_FONT, fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: -0.6, marginTop: 10 }}>{openCount()} <span style={{ fontSize: 17, fontWeight: 600, opacity: .85 }}>open</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
                {od > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 13, fontWeight: 700, color: '#fff' }}>{TI.alert('#fff', 15)}{od} overdue</span>}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 13, color: 'rgba(255,255,255,.85)' }}>{TI.clock('#fff', 14)}{td} due today</span>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.13)', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
              {TI.scales('#fff', 18)}
              <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 12.5, color: '#fff' }}>You are carrying <b>{me.share}%</b> of the load this week</span>
              <span style={{ fontFamily: OK_FONT, fontSize: 12, fontWeight: 700, color: '#fff', opacity: .9 }}>Balance</span>
            </div>
          </div>
        </Pad>
        <Spacer h={16} />
        <Pad><GroupHead t={t} style={{ marginBottom: 10 }}>Up next for you</GroupHead></Pad>
        <Pad>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mineOpen().slice(0, 2).map((it) => <TaskRow key={it.id} t={t} task={it} airy onClick={() => go('taskDetail')} onCheck={() => go('completeB')} />)}
          </div>
        </Pad>
        <Spacer h={20} />
      </div>
      <TabBar t={t} platform={platform} tabs={TABS_B('home')} go={go} />
    </Screen>
  );
}

/* Tasks hub — own tab, bold header, grouped by assignee (Version B) */
function TasksB({ t, platform, go }) {
  const hero = t.name === 'light' ? t.teal700 : t.teal900;
  const me = F4_LOAD_7.rows.find((r) => r.id === 'jeni');
  /* group open tasks by primary assignee, "Anyone" last */
  const groups = [];
  F4_MEMBERS.forEach((m) => {
    const items = F4_OPEN.filter((x) => x.assignees[0] === m.id);
    if (items.length) groups.push({ key: m.id, label: m.you ? `${m.n} (you)` : m.n, c: m.c, items });
  });
  const anyone = F4_OPEN.filter((x) => x.assignees.length === 0);
  if (anyone.length) groups.push({ key: 'anyone', label: 'Anyone', c: t.muted, items: anyone });

  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ background: hero, padding: '6px 20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 25, fontWeight: 800, color: '#fff', letterSpacing: -0.4 }}>Tasks</div>
            <button onClick={() => go('remindersA')} style={{ border: 'none', background: 'rgba(255,255,255,.16)', borderRadius: 999, padding: 9, cursor: 'pointer', display: 'flex' }}>{TI.bell('#fff', 18)}</button>
          </div>
          {/* fair-load summary band */}
          <button onClick={() => go('fairLoadB')} style={{ width: '100%', marginTop: 14, border: 'none', background: 'rgba(255,255,255,.13)', borderRadius: 16, padding: '13px 14px', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              {TI.scales('#fff', 17)}<span style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 700, color: '#fff' }}>Fair-load this week</span><Grow />{I.chevR('#fff', 16)}
            </div>
            <div style={{ display: 'flex', height: 10, borderRadius: 6, overflow: 'hidden', gap: 2 }}>
              {F4_LOAD_7.rows.map((r) => <div key={r.id} style={{ width: `${r.share}%`, background: memberBy(r.id).c }} title={memberBy(r.id).n} />)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 9, flexWrap: 'wrap' }}>
              {F4_LOAD_7.rows.slice(0, 4).map((r) => <span key={r.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 11, color: 'rgba(255,255,255,.9)' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: memberBy(r.id).c }} />{memberBy(r.id).n} {r.share}%</span>)}
            </div>
          </button>
        </div>
        <Pad style={{ paddingTop: 18 }}>
          {groups.map((g) => (
            <div key={g.key} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 2px 10px' }}>
                {g.key === 'anyone' ? <span style={{ width: 9, height: 9, borderRadius: '50%', background: g.c }} /> : <Avatar color={g.c} name={g.label} size={22} ring={t.surface} />}
                <span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 800, color: t.ink }}>{g.label}</span>
                <span style={{ fontFamily: OK_MONO, fontSize: 11.5, color: t.muted }}>{g.items.length}</span>
                <Grow />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {g.items.map((it) => <TaskRow key={it.id} t={t} task={it} airy
                  onClick={() => go('taskDetail')}
                  onCheck={() => it.child ? go('childAckA') : go('completeB')} />)}
              </div>
            </div>
          ))}
          {/* done */}
          <GroupHead t={t} style={{ marginBottom: 10 }} right={<Link t={t} style={{ fontSize: 12.5 }}>Show all</Link>}>Done today · {F4_DONE.length}</GroupHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {F4_DONE.map((it) => <TaskRow key={it.id} t={t} task={it} airy onClick={() => go('completeB')} />)}
          </div>
        </Pad>
        <Spacer h={120} />
      </div>
      <FAB t={t} onClick={() => go('createTask')} label="Add task" />
      <TabBar t={t} platform={platform} tabs={TABS_B('tasks')} go={go} />
    </Screen>
  );
}

/* ════════════════════════════════════════════════════════════
   CLEAR / EMPTY STATES — first arrival, nothing created yet
   ════════════════════════════════════════════════════════════ */

/* Version A — calm clear state for the Tasks stream */
function TasksEmptyA({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}`, paddingBottom: 12 }}>
        <Pad style={{ paddingTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex', alignItems: 'center', gap: 3, fontFamily: OK_FONT, fontSize: 14, color: t.slate }}>{I.back(t.slate)} Home</button>
            <button style={{ border: 'none', background: 'transparent', cursor: 'default', padding: 6, display: 'flex', opacity: .4 }}>{TI.bell(t.slate, 20)}</button>
          </div>
          <div style={{ marginTop: 2 }}>
            <H1 t={t} style={{ fontSize: 26 }}>Tasks</H1>
            <Lead t={t} style={{ marginTop: 5, fontSize: 13.5 }}>Shared to-dos and chores. Everyone with access sees changes in real time.</Lead>
          </div>
        </Pad>
      </div>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
        <div style={{ width: 88, height: 88, borderRadius: 26, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{TI.checklist(t.teal700, 40)}</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 21, fontWeight: 800, color: t.title, marginTop: 22, letterSpacing: -0.3 }}>No tasks yet</div>
        <Lead t={t} style={{ marginTop: 10, maxWidth: 290 }}>Nothing has been created here. Add the first to-do or chore and everyone in the household sees it right away.</Lead>
        <div style={{ marginTop: 18 }}><PrivacyLine t={t} center>Tasks stay inside your household. Nothing leaves it.</PrivacyLine></div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: platform === 'ios' ? 22 : 14, padding: '0 18px', zIndex: 20 }}>
        <button onClick={() => go('createTask')} style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: t.coral, boxShadow: '0 8px 22px rgba(226,104,60,.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{I.plus('#fff', 20)} Create the first task</button>
      </div>
    </Screen>
  );
}

/* Version B — bold clear state for the Tasks hub */
function TasksEmptyB({ t, platform, go }) {
  const hero = t.name === 'light' ? t.teal700 : t.teal900;
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: hero, padding: '6px 20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 25, fontWeight: 800, color: '#fff', letterSpacing: -0.4 }}>Tasks</div>
            <button style={{ border: 'none', background: 'rgba(255,255,255,.16)', borderRadius: 999, padding: 9, cursor: 'default', display: 'flex', opacity: .55 }}>{TI.bell('#fff', 18)}</button>
          </div>
          {/* fair-load placeholder — there is no load to balance yet */}
          <div style={{ width: '100%', marginTop: 14, background: 'rgba(255,255,255,.13)', borderRadius: 16, padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 9 }}>
            {TI.scales('#fff', 17)}<span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: 'rgba(255,255,255,.92)' }}>Fair-load appears once chores are being done</span>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '44px 32px 0', textAlign: 'center' }}>
          <div style={{ width: 88, height: 88, borderRadius: 26, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{TI.checklist(t.teal700, 40)}</div>
          <div style={{ fontFamily: OK_FONT, fontSize: 21, fontWeight: 800, color: t.title, marginTop: 22, letterSpacing: -0.3 }}>No tasks yet</div>
          <Lead t={t} style={{ marginTop: 10, maxWidth: 290 }}>Nothing has been created here. Add the first to-do or chore and it appears grouped by who is doing it.</Lead>
          <button onClick={() => go('createTask')} style={{ marginTop: 22, height: 52, borderRadius: 26, border: 'none', background: t.coral, boxShadow: '0 8px 22px rgba(226,104,60,.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '0 26px', fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{I.plus('#fff', 20)} Create the first task</button>
          <div style={{ marginTop: 18 }}><PrivacyLine t={t} center>Tasks stay inside your household. Nothing leaves it.</PrivacyLine></div>
        </div>
        <Spacer h={28} />
      </div>
      <TabBar t={t} platform={platform} tabs={TABS_B('tasks')} go={go} />
    </Screen>
  );
}

Object.assign(window, { HomeA, TasksA, HomeB, TasksB, TasksEmptyA, TasksEmptyB, TABS_A, TABS_B, openCount, mineOpen });

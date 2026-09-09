/* OmniKin · Feature 4 (Tasks) — core task screens (Epic 4.1 + child ack 4.2.3).
   Create · recurrence · assign · this-vs-future edit · detail w/ subtasks+attachments · complete/reopen · child acknowledgement. */
const {
  OK_FONT, OK_MONO, I, Screen, Btn,
  TI, LIST_ICON, Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, AvatarStack, Card, TaskCheck, AssigneeChip, DueChip, RepeatChip, ListChip,
  Seg, Sheet, GroupHead, PrivacyLine, ToggleRow,
  F4_MEMBERS, memberBy, listBy, F4_LISTS, F4_PRIORITY, F4_RECURRENCE, F4_TASKS,
} = window;

/* shared header for full-screen forms */
function FormTop({ t, onBack, title, right }) {
  return (
    <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}` }}>
      <Pad style={{ paddingTop: 4, paddingBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 38 }}>
          <button onClick={onBack} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back(t.slate)}</button>
          <span style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.title, whiteSpace: 'nowrap' }}>{title}</span>
          <div style={{ width: 34, display: 'flex', justifyContent: 'flex-end' }}>{right || <span />}</div>
        </div>
      </Pad>
    </div>
  );
}

/* a tappable settings-style row used across forms */
function SettingRow({ t, icon, label, value, valueNode, onClick, last }) {
  return (
    <button onClick={onClick} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: 'none', borderBottom: last ? 'none' : `1px solid ${t.hairline}`, background: 'transparent', cursor: onClick ? 'pointer' : 'default', textAlign: 'left' }}>
      {icon && <span style={{ flex: '0 0 auto', display: 'flex' }}>{icon}</span>}
      <span style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink, flex: '0 0 auto' }}>{label}</span>
      <Grow />
      {valueNode || <span style={{ fontFamily: OK_FONT, fontSize: 14, color: t.slate, whiteSpace: 'nowrap', maxWidth: 170, overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</span>}
      {onClick && I.chevR(t.muted, 16)}
    </button>
  );
}

/* ───────── Create task (US-4.1.1) — step 1 of the recurring-chore flow ───────── */
function CreateTask({ t, platform, go, back }) {
  const [title, setTitle] = React.useState('Take the bins out');
  const [list, setList] = React.useState('chores');
  const [priority, setPriority] = React.useState('normal');
  const [repeat, setRepeat] = React.useState('Every Tue');
  const [assignees, setAssignees] = React.useState(['lena']);
  const [sheet, setSheet] = React.useState(null);
  const l = listBy(list);
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <FormTop t={t} onBack={back} title="New task" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 16 }}>
          {/* title */}
          <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: '4px 14px' }}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs doing?" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontFamily: OK_FONT, fontSize: 18, fontWeight: 600, color: t.ink, padding: '14px 0' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, marginLeft: 4 }}>{I.checkCircle(t.green, 15)}<span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>Title looks good · 1 to 120 characters</span></div>
          <Spacer h={16} />
          {/* notes */}
          <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: '12px 14px' }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: t.slate, marginBottom: 4 }}>Notes</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 14, color: t.muted }}>Black bin this week, not recycling.</div>
          </div>
          <Spacer h={16} />
          {/* detail rows */}
          <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden' }}>
            <SettingRow t={t} icon={LIST_ICON[l.icon](l.color, 20)} label="List" value={l.label} onClick={() => setSheet('list')} />
            <SettingRow t={t} icon={TI.clock(t.teal700, 19)} label="Due" value="Today · 7:30" onClick={() => setSheet('due')} />
            <SettingRow t={t} icon={TI.repeat(t.teal700, 19)} label="Repeat" valueNode={<RepeatChip t={t} repeat={repeat} />} onClick={() => setSheet('repeat')} last />
          </div>
          <Spacer h={14} />
          {/* priority */}
          <GroupHead t={t} style={{ marginBottom: 9 }}>Priority</GroupHead>
          <Seg t={t} full value={priority} onChange={setPriority} options={[{ v: 'low', label: 'Low' }, { v: 'normal', label: 'Normal' }, { v: 'high', label: 'High' }]} />
          <Spacer h={16} />
          {/* assignee */}
          <GroupHead t={t} style={{ marginBottom: 9 }}>Assigned to</GroupHead>
          <button onClick={() => setSheet('assign')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: '14px 16px', cursor: 'pointer', textAlign: 'left' }}>
            {assignees.length ? <AvatarStack t={t} ids={assignees} size={28} /> : <div style={{ width: 28, height: 28, borderRadius: '50%', background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{I.user(t.muted, 17)}</div>}
            <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{assignees.length ? assignees.map((a) => memberBy(a).n).join(', ') : 'Anyone in the household'}</span>
            {I.chevR(t.muted, 16)}
          </button>
          <Spacer h={20} />
        </Pad>
      </div>
      {/* create CTA */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: platform === 'ios' ? '12px 18px 30px' : '12px 18px 16px', background: t.surface, borderTop: `1px solid ${t.hairline}`, zIndex: 10 }}>
        <Btn t={t} kind="primary" onClick={() => go('assignDone')}>Create task</Btn>
      </div>

      {sheet === 'repeat' && <RepeatSheet t={t} platform={platform} value={repeat} onClose={() => setSheet(null)} onPick={(v) => { setRepeat(v); setSheet(null); }} />}
      {sheet === 'assign' && <AssignSheet t={t} platform={platform} value={assignees} onClose={() => setSheet(null)} onDone={(v) => { setAssignees(v); setSheet(null); }} />}
      {sheet === 'list' && <ListSheet t={t} platform={platform} value={list} onClose={() => setSheet(null)} onPick={(v) => { setList(v); setSheet(null); }} />}
      {sheet === 'due' && <DueSheet t={t} platform={platform} onClose={() => setSheet(null)} />}
    </Screen>
  );
}

/* ───────── Recurrence sheet (US-4.1.4) ───────── */
function RepeatSheet({ t, platform, value, onClose, onPick }) {
  const [sel, setSel] = React.useState('weekly');
  const [days, setDays] = React.useState(['Tue']);
  const [end, setEnd] = React.useState('never');
  const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const toggle = (d) => setDays((s) => s.includes(d) ? s.filter((x) => x !== d) : [...s, d]);
  return (
    <Sheet t={t} platform={platform} title="Repeat" sub="Routine chores never need re-entering. Completing one occurrence creates the next." onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {F4_RECURRENCE.map((r) => {
          const on = r.id === sel;
          return (
            <button key={r.id} onClick={() => setSel(r.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', padding: '13px 14px', borderRadius: 13, cursor: 'pointer', background: on ? t.panelTeal : t.surfaceAlt, border: `1.5px solid ${on ? t.teal500 : 'transparent'}` }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', flex: '0 0 auto', border: `2px solid ${on ? t.teal500 : t.hairline}`, background: on ? t.teal500 : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && I.check('#fff', 13)}</span>
              <span style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{r.label}</span>
            </button>
          );
        })}
      </div>
      {(sel === 'weekly' || sel === 'custom') && (
        <div style={{ marginTop: 16 }}>
          <Kicker t={t} style={{ marginBottom: 9 }}>On these days</Kicker>
          <div style={{ display: 'flex', gap: 6 }}>
            {week.map((d) => { const on = days.includes(d); return (
              <button key={d} onClick={() => toggle(d)} style={{ flex: 1, height: 40, borderRadius: 11, border: 'none', cursor: 'pointer', background: on ? t.teal700 : t.surfaceAlt, color: on ? '#fff' : t.slate, fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 700 }}>{d[0]}</button>
            ); })}
          </div>
          <Kicker t={t} style={{ margin: '16px 0 9px' }}>Ends</Kicker>
          <Seg t={t} full value={end} onChange={setEnd} options={[{ v: 'never', label: 'Never' }, { v: 'date', label: 'On a date' }, { v: 'count', label: 'After…' }]} />
        </div>
      )}
      <Spacer h={16} />
      <Btn t={t} kind="primary" onClick={() => onPick(days.length ? `Every ${days.join(', ')}` : 'Every week')}>Save repeat</Btn>
    </Sheet>
  );
}

/* ───────── Assign sheet (US-4.1.2) — role-aware ───────── */
function AssignSheet({ t, platform, value, onClose, onDone }) {
  const [sel, setSel] = React.useState(value || []);
  const toggle = (id) => setSel((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  return (
    <Sheet t={t} platform={platform} title="Assign to" sub="Assignees get a notification that respects their own reminder preferences." onClose={onClose}>
      {/* anyone */}
      <button onClick={() => onDone([])} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 12px', borderRadius: 13, cursor: 'pointer', background: (value && value.length === 0) ? t.panelTeal : t.surfaceAlt, border: 'none', textAlign: 'left', marginBottom: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.surface, boxShadow: `inset 0 0 0 1.5px ${t.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{I.user(t.muted, 19)}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>Anyone</div>
          <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>Whoever picks it up first</div>
        </div>
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {F4_MEMBERS.filter((m) => m.right !== 'view').map((m) => {
          const on = sel.includes(m.id);
          const restricted = m.right === 'self' && !m.you;
          return (
            <button key={m.id} onClick={() => toggle(m.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 13, cursor: 'pointer', background: on ? t.panelTeal : 'transparent', border: `1px solid ${on ? t.teal300 : t.hairline}`, textAlign: 'left' }}>
              <Avatar color={m.c} name={m.n} size={36} ring={t.surface} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>{m.full}{m.you ? ' (you)' : ''}</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>{m.role}{restricted ? ' · can self-assign' : ''}</div>
              </div>
              <span style={{ width: 24, height: 24, borderRadius: 7, flex: '0 0 auto', border: `2px solid ${on ? t.teal500 : t.hairline}`, background: on ? t.teal500 : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && I.check('#fff', 14)}</span>
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 12, background: t.panelBlue, borderRadius: 12, padding: '11px 13px' }}>
        {I.shield(t.blue, 16)}<span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.ink, lineHeight: 1.45 }}>You can assign to others because you are an Owner. Teen and child members can only assign to themselves.</span>
      </div>
      <Spacer h={14} />
      <Btn t={t} kind="primary" onClick={() => onDone(sel)}>Done</Btn>
    </Sheet>
  );
}

/* ───────── List picker sheet ───────── */
function ListSheet({ t, platform, value, onClose, onPick }) {
  return (
    <Sheet t={t} platform={platform} title="List" onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {F4_LISTS.map((l) => { const on = l.id === value; return (
          <button key={l.id} onClick={() => onPick(l.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 12px', borderRadius: 13, cursor: 'pointer', background: on ? t.panelTeal : 'transparent', border: `1px solid ${on ? t.teal300 : t.hairline}`, textAlign: 'left' }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{LIST_ICON[l.icon](l.color, 20)}</div>
            <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{l.label}</span>
            {on && I.check(t.teal500, 17)}
          </button>
        ); })}
      </div>
    </Sheet>
  );
}

/* ───────── Due date sheet (light) ───────── */
function DueSheet({ t, platform, onClose }) {
  return (
    <Sheet t={t} platform={platform} title="Due date and time" onClose={onClose}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {['Today', 'Tomorrow', 'This weekend', 'Pick a date'].map((d, i) => (
          <button key={d} style={{ flex: '0 0 auto', border: 'none', borderRadius: 999, padding: '9px 14px', cursor: 'pointer', background: i === 0 ? t.teal700 : t.surfaceAlt, color: i === 0 ? '#fff' : t.slate, fontFamily: OK_FONT, fontSize: 13, fontWeight: 600 }}>{d}</button>
        ))}
      </div>
      <div style={{ background: t.surfaceAlt, borderRadius: 14, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>Time</span>
        <span style={{ fontFamily: OK_MONO, fontSize: 17, fontWeight: 600, color: t.teal700 }}>07:30</span>
      </div>
      <Spacer h={14} />
      <Btn t={t} kind="primary" onClick={onClose}>Set due</Btn>
    </Sheet>
  );
}

/* ───────── Assign / create confirmation (key-flow close) ───────── */
function AssignDone({ t, platform, go, back, reset }) {
  const backToTasks = () => (reset ? reset('tasks') : go('tasksA'));
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center' }}>
        <div style={{ width: 84, height: 84, borderRadius: '50%', background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'okpop .4s cubic-bezier(.2,.8,.25,1)' }}>{I.check(t.green, 42)}</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 23, fontWeight: 800, color: t.title, marginTop: 22, letterSpacing: -0.4 }}>Task created</div>
        <Lead t={t} style={{ marginTop: 10, maxWidth: 300 }}>“Take the bins out” repeats every Tuesday and is assigned to Lena. She will get one gentle reminder at her lead time.</Lead>
        <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: '13px 15px', marginTop: 22, width: '100%', display: 'flex', alignItems: 'center', gap: 11 }}>
          <Avatar color="#E0A53C" name="L" size={34} ring={t.surface} />
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>Take the bins out</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}><DueChip t={t} due="Today · 7:30" size="sm" /><RepeatChip t={t} repeat="Every Tue" size="sm" /></div>
          </div>
        </div>
        <div style={{ marginTop: 14 }}><PrivacyLine t={t} center>It also appears in the shared agenda. Nothing leaves your household.</PrivacyLine></div>
      </div>
      <Pad style={{ paddingBottom: platform === 'ios' ? 30 : 18 }}>
        <Btn t={t} kind="primary" onClick={backToTasks}>Back to tasks</Btn>
      </Pad>
    </Screen>
  );
}

/* ───────── Task detail with notes, subtasks, attachments (US-4.1.5) ───────── */
function TaskDetail({ t, platform, go, back }) {
  const task = F4_TASKS.find((x) => x.id === 't3'); // Return school forms (has required subtasks + attachments)
  const [subs, setSubs] = React.useState(task.subtasks);
  const toggle = (id) => setSubs((s) => s.map((x) => x.id === id ? { ...x, done: !x.done } : x));
  const reqLeft = subs.filter((s) => s.required && !s.done).length;
  const l = listBy(task.list);
  const canComplete = reqLeft === 0;
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}` }}>
        <Pad style={{ paddingTop: 4, paddingBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 38 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back(t.slate)}</button>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => go('editTask')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, display: 'flex' }}>{TI.pencil(t.slate, 19)}</button>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, display: 'flex' }}>{TI.dots(t.slate, 20)}</button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}><ListChip t={t} list={task.list} /><span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: F4_PRIORITY.high.c }}>{TI.flag(F4_PRIORITY.high.c, 13)}High priority</span></div>
          <H1 t={t} style={{ fontSize: 23, marginTop: 9 }}>{task.title}</H1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
            <DueChip t={t} due="Yesterday" overdue />
            <AssigneeChip t={t} ids={task.assignees} />
          </div>
        </Pad>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 16 }}>
          {/* notes */}
          <Card t={t} pad={14}>
            <Kicker t={t} style={{ marginBottom: 7 }}>Notes</Kicker>
            <div style={{ fontFamily: OK_FONT, fontSize: 14.5, color: t.ink, lineHeight: 1.5 }}>{task.notes}</div>
          </Card>
          <Spacer h={14} />
          {/* subtasks */}
          <GroupHead t={t} style={{ marginBottom: 9 }} right={<span style={{ fontFamily: OK_MONO, fontSize: 11.5, color: t.muted }}>{subs.filter((s) => s.done).length}/{subs.length}</span>}>Checklist</GroupHead>
          <Card t={t} pad={4}>
            {subs.map((s, i) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 12px', borderBottom: i === subs.length - 1 ? 'none' : `1px solid ${t.hairline}` }}>
                <TaskCheck t={t} checked={s.done} onClick={() => toggle(s.id)} />
                <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 14.5, color: t.ink, textDecoration: s.done ? 'line-through' : 'none', opacity: s.done ? 0.55 : 1 }}>{s.label}</span>
                {s.required && <span style={{ fontFamily: OK_FONT, fontSize: 10.5, fontWeight: 700, color: s.done ? t.green : t.coral, background: s.done ? t.panelGreen : t.coral100, padding: '3px 8px', borderRadius: 999 }}>Required</span>}
              </div>
            ))}
          </Card>
          <Spacer h={14} />
          {/* attachments */}
          <GroupHead t={t} style={{ marginBottom: 9 }}>Attachments</GroupHead>
          <div style={{ display: 'flex', gap: 10 }}>
            {['Permission slip.pdf', 'Photo consent.jpg'].map((f, i) => (
              <div key={f} style={{ flex: 1, background: t.surface, borderRadius: 14, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: 12, display: 'flex', flexDirection: 'column', gap: 9 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: i === 0 ? t.panelCoral : t.panelBlue, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{TI.clip(i === 0 ? t.coral : t.blue, 18)}</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: t.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f}</div>
              </div>
            ))}
            <button style={{ width: 64, background: 'transparent', border: `1.5px dashed ${t.hairline}`, borderRadius: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{I.plus(t.teal500, 22)}</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 10 }}>{I.lock(t.muted, 13)}<span style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted }}>Attachments stay inside your household.</span></div>
          <Spacer h={20} />
        </Pad>
      </div>
      {/* complete gating (US-4.1.5 required-subtask invariant) */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: platform === 'ios' ? '12px 18px 30px' : '12px 18px 16px', background: t.surface, borderTop: `1px solid ${t.hairline}`, zIndex: 10 }}>
        {!canComplete && <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10, justifyContent: 'center' }}>{TI.alert(t.warning, 15)}<span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate }}>Finish {reqLeft} required step{reqLeft > 1 ? 's' : ''} to complete</span></div>}
        <Btn t={t} kind={canComplete ? 'primary' : 'outline'} disabled={!canComplete} onClick={() => canComplete && go('completeA')} icon={canComplete ? I.check('#fff', 19) : null}>Mark done</Btn>
      </div>
    </Screen>
  );
}

/* ───────── Edit recurring series prompt (US-4.1.4 validation) ───────── */
function EditSeries({ t, platform, go, back, reset }) {
  const [pick, setPick] = React.useState('this');
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <div style={{ position: 'absolute', inset: 0, background: t.sheetScrim }} onClick={back} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: t.surface, borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: platform === 'ios' ? '10px 22px 30px' : '10px 22px 18px', zIndex: 5, animation: 'oksheet .32s cubic-bezier(.2,.8,.25,1)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8 }}><div style={{ width: 40, height: 5, borderRadius: 3, background: t.hairline }} /></div>
        <div style={{ width: 52, height: 52, borderRadius: 15, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px 0 12px' }}>{TI.repeat(t.teal700, 26)}</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 20, fontWeight: 800, color: t.title, letterSpacing: -0.3 }}>Edit a repeating task</div>
        <Lead t={t} style={{ marginTop: 6, fontSize: 14 }}>This task repeats. Choose what your changes apply to before they are saved.</Lead>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
          {[['this', 'This occurrence only', 'Just this one. Future repeats stay as they are.'], ['future', 'This and all future', 'Updates every upcoming repeat from now on.']].map(([id, label, sub]) => {
            const on = pick === id;
            return (
              <button key={id} onClick={() => setPick(id)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, width: '100%', textAlign: 'left', padding: '14px 15px', borderRadius: 15, cursor: 'pointer', background: on ? t.panelTeal : t.surfaceAlt, border: `1.5px solid ${on ? t.teal500 : 'transparent'}` }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', flex: '0 0 auto', marginTop: 1, border: `2px solid ${on ? t.teal500 : t.hairline}`, background: on ? t.teal500 : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && I.check('#fff', 13)}</span>
                <div>
                  <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>{label}</div>
                  <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 3, lineHeight: 1.45 }}>{sub}</div>
                </div>
              </button>
            );
          })}
        </div>
        <Spacer h={18} />
        <Btn t={t} kind="primary" onClick={() => (reset ? reset('tasks') : back())} icon={I.check('#fff', 19)}>Save changes</Btn>
        <Spacer h={8} />
        <Btn t={t} kind="ghost" onClick={back} full><span style={{ color: t.slate }}>Cancel</span></Btn>
      </div>
    </Screen>
  );
}

/* ───────── Edit task details (US-4.1.1 / 4.1.4) — full editable form, reached from detail or after the series-scope choice ───────── */
function EditTask({ t, platform, go, back, taskId = 't3', series }) {
  const task = F4_TASKS.find((x) => x.id === taskId) || F4_TASKS[0];
  const [title, setTitle] = React.useState(task.title);
  const [list, setList] = React.useState(task.list);
  const [priority, setPriority] = React.useState(task.priority);
  const [repeat, setRepeat] = React.useState(task.repeat || '');
  const [assignees, setAssignees] = React.useState(task.assignees);
  const [notes, setNotes] = React.useState(task.notes || '');
  const [sheet, setSheet] = React.useState(null);
  const l = listBy(list);
  const scope = series ? ((typeof window !== 'undefined' && window.F4_EDIT_SCOPE === 'this') ? 'this' : 'future') : null;
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <FormTop t={t} onBack={back} title="Edit task" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 16 }}>
          {scope && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, background: t.panelTeal, borderRadius: 13, padding: '11px 13px', marginBottom: 16 }}>
              {TI.repeat(t.teal700, 17)}
              <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.ink, lineHeight: 1.45 }}>{scope === 'this' ? <React.Fragment>Changes apply to <b>this occurrence only</b>. Future repeats stay as they are.</React.Fragment> : <React.Fragment>Changes apply to <b>this and all future</b> occurrences.</React.Fragment>}</span>
            </div>
          )}
          {/* title */}
          <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: '4px 14px' }}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs doing?" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontFamily: OK_FONT, fontSize: 18, fontWeight: 600, color: t.ink, padding: '14px 0' }} />
          </div>
          <Spacer h={16} />
          {/* notes (editable) */}
          <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: '12px 14px' }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: t.slate, marginBottom: 4 }}>Notes</div>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add a note" rows={2} style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', resize: 'none', fontFamily: OK_FONT, fontSize: 14, color: t.ink, lineHeight: 1.45 }} />
          </div>
          <Spacer h={16} />
          {/* detail rows */}
          <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden' }}>
            <SettingRow t={t} icon={LIST_ICON[l.icon](l.color, 20)} label="List" value={l.label} onClick={() => setSheet('list')} />
            <SettingRow t={t} icon={TI.clock(t.teal700, 19)} label="Due" value={task.due} onClick={() => setSheet('due')} />
            <SettingRow t={t} icon={TI.repeat(t.teal700, 19)} label="Repeat" valueNode={repeat ? <RepeatChip t={t} repeat={repeat} /> : <span style={{ fontFamily: OK_FONT, fontSize: 14, color: t.slate }}>Does not repeat</span>} onClick={() => setSheet('repeat')} last />
          </div>
          <Spacer h={14} />
          {/* priority */}
          <GroupHead t={t} style={{ marginBottom: 9 }}>Priority</GroupHead>
          <Seg t={t} full value={priority} onChange={setPriority} options={[{ v: 'low', label: 'Low' }, { v: 'normal', label: 'Normal' }, { v: 'high', label: 'High' }]} />
          <Spacer h={16} />
          {/* assignee */}
          <GroupHead t={t} style={{ marginBottom: 9 }}>Assigned to</GroupHead>
          <button onClick={() => setSheet('assign')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: '14px 16px', cursor: 'pointer', textAlign: 'left' }}>
            {assignees.length ? <AvatarStack t={t} ids={assignees} size={28} /> : <div style={{ width: 28, height: 28, borderRadius: '50%', background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{I.user(t.muted, 17)}</div>}
            <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{assignees.length ? assignees.map((a) => memberBy(a).n).join(', ') : 'Anyone in the household'}</span>
            {I.chevR(t.muted, 16)}
          </button>
          <Spacer h={18} />
          {/* delete */}
          <button onClick={back} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px' }}>{TI.trash(t.coral, 17)}<span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.coral, whiteSpace: 'nowrap' }}>Delete task</span></button>
          <Spacer h={20} />
        </Pad>
      </div>
      {/* save CTA */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: platform === 'ios' ? '12px 18px 30px' : '12px 18px 16px', background: t.surface, borderTop: `1px solid ${t.hairline}`, zIndex: 10 }}>
        <Btn t={t} kind="primary" onClick={() => go('editSeries')} icon={I.check('#fff', 19)}>Save changes</Btn>
      </div>

      {sheet === 'repeat' && <RepeatSheet t={t} platform={platform} value={repeat} onClose={() => setSheet(null)} onPick={(v) => { setRepeat(v); setSheet(null); }} />}
      {sheet === 'assign' && <AssignSheet t={t} platform={platform} value={assignees} onClose={() => setSheet(null)} onDone={(v) => { setAssignees(v); setSheet(null); }} />}
      {sheet === 'list' && <ListSheet t={t} platform={platform} value={list} onClose={() => setSheet(null)} onPick={(v) => { setList(v); setSheet(null); }} />}
      {sheet === 'due' && <DueSheet t={t} platform={platform} onClose={() => setSheet(null)} />}
    </Screen>
  );
}

/* ───────── Complete & reopen (US-4.1.3) — shared by A & B ───────── */
function Complete({ t, platform, go, back }) {
  const [done, setDone] = React.useState(true);
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center' }}>
        <div style={{ width: 84, height: 84, borderRadius: '50%', background: done ? t.panelGreen : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: done ? 'okpop .4s cubic-bezier(.2,.8,.25,1)' : 'none' }}>{done ? I.check(t.green, 42) : TI.reopen(t.slate, 38)}</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 23, fontWeight: 800, color: t.title, marginTop: 22, letterSpacing: -0.4 }}>{done ? 'Bins done' : 'Task reopened'}</div>
        <Lead t={t} style={{ marginTop: 10, maxWidth: 300 }}>{done ? 'Marked done by Lena at 7:32. Everyone sees it updated in real time.' : 'Back on the list with its original schedule. Nothing was duplicated.'}</Lead>
        {done && (
          <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: '14px 16px', marginTop: 22, width: '100%', display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{TI.repeat(t.teal700, 20)}</div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 700, color: t.ink }}>Next: Tuesday 8 July</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 2 }}>The next occurrence was created automatically.</div>
            </div>
          </div>
        )}
      </div>
      <Pad style={{ paddingBottom: platform === 'ios' ? 30 : 18 }}>
        <Btn t={t} kind="primary" onClick={back}>Done</Btn>
        <Spacer h={8} />
        <Btn t={t} kind="outline" onClick={() => setDone(!done)} icon={done ? TI.reopen(t.teal500, 17) : I.check(t.teal500, 17)}>{done ? 'Reopen task' : 'Mark done again'}</Btn>
      </Pad>
    </Screen>
  );
}

/* ───────── Child chore acknowledgement (US-4.2.3) ───────── */
function ChildAck({ t, platform, go, back }) {
  const [ack, setAck] = React.useState(false);
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}` }}>
        <Pad style={{ paddingTop: 4, paddingBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', minHeight: 38 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back(t.slate)}</button>
            <span style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.title, marginLeft: 4 }}>Chore</span>
          </div>
        </Pad>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 18 }}>
          {/* child's completion */}
          <Card t={t} pad={16} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <Avatar color="#2E8C5A" name="N" size={46} ring={t.surface} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.ink }}>Feed the cat</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 5 }}>{I.checkCircle(t.green, 15)}<span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.green, fontWeight: 600 }}>Noah marked it done · 8:02</span></div>
            </div>
          </Card>
          <Spacer h={16} />
          <GroupHead t={t} style={{ marginBottom: 9 }}>Guardian check</GroupHead>
          <Card t={t} pad={16}>
            {!ack ? (
              <React.Fragment>
                <div style={{ fontFamily: OK_FONT, fontSize: 14.5, color: t.ink, lineHeight: 1.5 }}>Noah is a Child member. You can acknowledge or approve the chore, with no points and no rewards.</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                  <button onClick={() => setAck('wd')} style={{ flex: 1, border: `1.5px solid ${t.hairline}`, background: t.surface, borderRadius: 14, padding: '13px 8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: t.coral100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{TI.heart(t.coral, 20)}</div>
                    <span style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 700, color: t.ink }}>Well done</span>
                  </button>
                  <button onClick={() => setAck('ok')} style={{ flex: 1, border: `1.5px solid ${t.hairline}`, background: t.surface, borderRadius: 14, padding: '13px 8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{I.check(t.green, 20)}</div>
                    <span style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 700, color: t.ink }}>Approve</span>
                  </button>
                </div>
              </React.Fragment>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, animation: 'okfade .3s ease' }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: ack === 'wd' ? t.coral100 : t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{ack === 'wd' ? TI.heart(t.coral, 22) : I.check(t.green, 22)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>{ack === 'wd' ? 'You sent Noah a well done' : 'Chore approved'}</div>
                  <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2 }}>Noah will see a simple, friendly note. No rewards attached.</div>
                </div>
              </div>
            )}
          </Card>
          <Spacer h={14} />
          <PrivacyLine t={t}>Children’s chores never carry real-money rewards or external sharing by default.</PrivacyLine>
          <Spacer h={20} />
        </Pad>
      </div>
      {ack && <Pad style={{ paddingBottom: platform === 'ios' ? 30 : 18 }}><Btn t={t} kind="primary" onClick={back}>Back to tasks</Btn></Pad>}
    </Screen>
  );
}

Object.assign(window, {
  CreateTask, RepeatSheet, AssignSheet, ListSheet, DueSheet, AssignDone,
  TaskDetail, EditSeries, EditTask, Complete, ChildAck,
});

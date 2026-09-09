/* OmniKin · Feature 4 (Tasks) — US-4.2.2 surfaces (agenda / calendar / timetable).
   NOT in this release: these depend on Feature 9 (Agenda), Feature 5 (Calendar) and
   Feature 10 (Timetable). Designed here, separated from the shipping flow. */
const {
  OK_FONT, OK_MONO, I, Screen,
  TI, Pad, H1, Lead, Spacer, Grow, Kicker,
  Avatar, AvatarStack, Card, GroupHead, ParkedBadge,
  F4_MEMBERS, memberBy,
} = window;

function ParkedTop({ t, platform, back, title, dep }) {
  return (
    <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}` }}>
      <Pad style={{ paddingTop: 4, paddingBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 38 }}>
          <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back(t.slate)}</button>
          <ParkedBadge t={t} />
          <span style={{ width: 22 }} />
        </div>
        <H1 t={t} style={{ fontSize: 24, marginTop: 4 }}>{title}</H1>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 8, background: t.panelBlue, borderRadius: 12, padding: '10px 12px' }}>
          {I.shield(t.blue, 16)}
          <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.ink, lineHeight: 1.45 }}>{dep}</span>
        </div>
      </Pad>
    </div>
  );
}

/* legend of assignee colours, reused */
function AssigneeLegend({ t }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {F4_MEMBERS.filter((m) => m.right !== 'view').map((m) => (
        <span key={m.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: OK_FONT, fontSize: 12, color: t.slate }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: m.c }} />{m.n}</span>
      ))}
    </div>
  );
}

/* ───────── US-4.2.2 · Tasks in the shared agenda (Feature 9) ───────── */
function AgendaParked({ t, platform, back }) {
  const day = [
    { time: '07:30', kind: 'task', who: 'lena', title: 'Take the bins out', repeat: true },
    { time: '08:00', kind: 'task', who: 'noah', title: 'Feed the cat', repeat: true },
    { time: '09:00', kind: 'event', title: 'Renate · physio appointment' },
    { time: '15:30', kind: 'event', title: 'Lena · football training' },
    { time: '18:00', kind: 'task', who: 'jeni', title: 'Cook dinner', repeat: true },
    { time: 'Today', kind: 'task', who: null, title: 'Grocery run' },
  ];
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <ParkedTop t={t} platform={platform} back={back} title="Tasks in the agenda" dep="Surfaces dated tasks in the shared agenda (Feature 9). Built for a later iteration." />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 14 }}>
          <AssigneeLegend t={t} />
          <Spacer h={14} />
          <GroupHead t={t} style={{ marginBottom: 10 }}>Wednesday 2 July</GroupHead>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 47, top: 6, bottom: 6, width: 2, background: t.hairline }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {day.map((e, i) => {
                const m = e.who ? memberBy(e.who) : null;
                const isTask = e.kind === 'task';
                const accent = m ? m.c : (isTask ? t.muted : t.blue);
                return (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ width: 38, flex: '0 0 auto', fontFamily: OK_MONO, fontSize: 11, color: t.muted, textAlign: 'right', paddingTop: 14 }}>{e.time}</span>
                    <span style={{ width: 12, height: 12, borderRadius: '50%', flex: '0 0 auto', marginTop: 15, background: t.surface, boxShadow: `inset 0 0 0 3px ${accent}`, zIndex: 1 }} />
                    <div style={{ flex: 1, background: t.surface, borderRadius: 13, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: '11px 13px', borderLeft: `4px solid ${accent}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        {isTask && <span style={{ display: 'flex' }}>{TI.checklist(accent, 14)}</span>}
                        <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.ink }}>{e.title}</span>
                        {e.repeat && TI.repeat(t.teal500, 13)}
                      </div>
                      <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 3 }}>{isTask ? (m ? `Task · ${m.n}` : 'Task · anyone') : 'Event'}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Spacer h={20} />
        </Pad>
      </div>
    </Screen>
  );
}

/* ───────── US-4.2.2 · Tasks on the calendar (Feature 5) ───────── */
function CalendarParked({ t, platform, back }) {
  const weeks = [
    [29, 30, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
  ];
  const dots = { 2: ['lena', 'noah', 'jeni'], 3: ['jeni'], 4: ['fabian'], 8: ['lena', 'jeni'], 9: ['jeni'], 11: ['fabian'], 15: ['noah'], 16: ['lena'] };
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <ParkedTop t={t} platform={platform} back={back} title="Tasks on the calendar" dep="Dated tasks optionally appear on the calendar (Feature 5), colour-coded by assignee. Later iteration." />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: OK_FONT, fontSize: 17, fontWeight: 700, color: t.title }}>July 2026</span>
            <AssigneeLegend t={t} />
          </div>
          <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 6 }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <div key={i} style={{ textAlign: 'center', fontFamily: OK_FONT, fontSize: 11, fontWeight: 700, color: t.muted }}>{d}</div>)}
            </div>
            {weeks.map((wk, wi) => (
              <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
                {wk.map((d, di) => {
                  const muted = (wi === 0 && di < 2);
                  const today = d === 2 && wi === 0;
                  const ds = dots[d] || [];
                  return (
                    <div key={di} style={{ aspectRatio: '1', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, background: today ? t.panelTeal : 'transparent' }}>
                      <span style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: today ? 800 : 500, color: muted ? t.hairline : (today ? t.teal800 : t.ink) }}>{d}</span>
                      <div style={{ display: 'flex', gap: 2, height: 5 }}>
                        {ds.slice(0, 3).map((id, k) => <span key={k} style={{ width: 5, height: 5, borderRadius: '50%', background: memberBy(id).c }} />)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <Spacer h={16} />
          <GroupHead t={t} style={{ marginBottom: 9 }}>Wed 2 July · 3 tasks</GroupHead>
          <Card t={t} pad={4}>
            {[['lena', 'Take the bins out', '7:30'], ['noah', 'Feed the cat', '8:00'], ['jeni', 'Cook dinner', '18:00']].map(([id, title, time], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 12px', borderBottom: i === 2 ? 'none' : `1px solid ${t.hairline}` }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: memberBy(id).c, flex: '0 0 auto' }} />
                <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.ink }}>{title}</span>
                <span style={{ fontFamily: OK_MONO, fontSize: 12, color: t.muted }}>{time}</span>
              </div>
            ))}
          </Card>
          <Spacer h={20} />
        </Pad>
      </div>
    </Screen>
  );
}

/* ───────── US-4.2.2 · Recurring chores in the timetable (Feature 10) ───────── */
function TimetableParked({ t, platform, back }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const routines = [
    { label: 'Morning', items: [['noah', 'Feed cat'], ['jeni', 'School walk']] },
    { label: 'After school', items: [['lena', 'Bins (Tue)'], ['fabian', 'Recycling (Thu)']] },
    { label: 'Evening', items: [['jeni', 'Cook dinner'], ['fabian', 'Dishwasher']] },
  ];
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <ParkedTop t={t} platform={platform} back={back} title="Chores in the timetable" dep="Recurring chores can surface in the timetable as routines (Feature 10). Later iteration." />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 14 }}>
          <AssigneeLegend t={t} />
          <Spacer h={14} />
          {/* week header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 10 }}>
            {days.map((d, i) => <div key={d} style={{ textAlign: 'center', fontFamily: OK_FONT, fontSize: 12, fontWeight: 700, color: i === 2 ? t.teal700 : t.muted, background: i === 2 ? t.panelTeal : 'transparent', borderRadius: 9, padding: '6px 0' }}>{d}</div>)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {routines.map((r) => (
              <div key={r.label}>
                <Kicker t={t} style={{ marginBottom: 8 }}>{r.label}</Kicker>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {r.items.map(([id, title], i) => {
                    const m = memberBy(id);
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, background: t.surface, borderRadius: 13, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: '11px 13px', borderLeft: `4px solid ${m.c}` }}>
                        <Avatar color={m.c} name={m.n} size={28} ring={t.surface} />
                        <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.ink }}>{title}</span>
                        {TI.repeat(t.teal500, 14)}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <Spacer h={20} />
        </Pad>
      </div>
    </Screen>
  );
}

Object.assign(window, { AgendaParked, CalendarParked, TimetableParked });

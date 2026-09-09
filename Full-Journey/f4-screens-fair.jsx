/* OmniKin · Feature 4 (Tasks) — fairness (Epic 4.3, differentiator) + reminders (4.2.1) + offline.
   Private, non-judgemental fair-load view · opt-in human-confirmed rebalancing · calm digest reminders. */
const {
  OK_FONT, OK_MONO, I, Screen, Btn,
  TI, Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, AvatarStack, Card, LoadBar, Seg, Sheet, GroupHead, PrivacyLine, ToggleRow, RepeatChip,
  F4_MEMBERS, memberBy, F4_LOAD_7, F4_LOAD_30, F4_SUGGESTION, F4_DIGEST, F4_REMINDER_PREFS,
} = window;

/* ───────── shared fair-load body ───────── */
function FairBody({ t, win, go, onFlag }) {
  const data = win === '30' ? F4_LOAD_30 : F4_LOAD_7;
  const maxShare = Math.max(...data.rows.map((r) => r.share));
  const lead = data.rows[0]; // Jeni
  return (
    <React.Fragment>
      {/* framing */}
      <Card t={t} pad={14} style={{ background: t.panelGreen, border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
          {TI.scales(t.green, 22)}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink }}>Balance and contribution, never a score</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 3, lineHeight: 1.5 }}>This shows how the shared work is spread, so it can be talked about and adjusted. There is no ranking and no blame.</div>
          </div>
        </div>
      </Card>
      <Spacer h={16} />
      <GroupHead t={t} style={{ marginBottom: 12 }} right={<span style={{ fontFamily: OK_MONO, fontSize: 11.5, color: t.muted }}>{data.window}</span>}>Share of the load</GroupHead>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {data.rows.map((r) => {
          const m = memberBy(r.id);
          return <LoadBar key={r.id} t={t} member={m} value={r.share} max={maxShare} big sub={`${r.done} done · ${r.open} open${r.recurring ? ` · ${r.recurring} recurring` : ''}`} />;
        })}
      </div>
      <Spacer h={18} />
      {/* gentle observation + rebalance entry */}
      <div style={{ background: t.surface, borderRadius: 18, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden' }}>
        <div style={{ padding: 16, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 13, background: t.coral100, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{TI.swap(t.coral, 22)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>Jeni is carrying a bit more lately</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 3, lineHeight: 1.5 }}>Mostly cooking and admin over the last three weeks. Would a small change help share it?</div>
          </div>
        </div>
        <button onClick={() => go('rebalance')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none', borderTop: `1px solid ${t.hairline}`, background: t.surfaceAlt, padding: '13px', cursor: 'pointer', fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.teal700 }}>{TI.spark(t.teal700, 17)} See a gentle suggestion</button>
      </div>
      <Spacer h={16} />
      <PrivacyLine t={t}>Only adult members of your household can see this. Workload data is never shared outside the household and never used for ads.</PrivacyLine>
      <Spacer h={12} />
      <button onClick={onFlag} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, fontFamily: OK_FONT, fontSize: 12.5, color: t.muted }}>{TI.flagOutline(t.muted, 15)} This doesn’t feel right</button>
    </React.Fragment>
  );
}

function FlagSheet({ t, platform, onClose }) {
  const [sent, setSent] = React.useState(false);
  return (
    <Sheet t={t} platform={platform} title={sent ? 'Thank you' : 'Tell us what feels off'} sub={sent ? undefined : 'Your note helps keep the framing constructive. It stays inside your household.'} onClose={onClose}>
      {sent ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0 8px' }}>
          <div style={{ width: 46, height: 46, borderRadius: 14, background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{I.check(t.green, 22)}</div>
          <span style={{ fontFamily: OK_FONT, fontSize: 14, color: t.ink, lineHeight: 1.5 }}>We will review how this view is framed. Nothing about your household is shared.</span>
        </div>
      ) : (
        <React.Fragment>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['It feels like a ranking', 'The window is too short', 'A task is counted unfairly', 'Something else'].map((o) => (
              <button key={o} style={{ textAlign: 'left', border: `1px solid ${t.hairline}`, background: t.surfaceAlt, borderRadius: 12, padding: '13px 14px', cursor: 'pointer', fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.ink }}>{o}</button>
            ))}
          </div>
          <Spacer h={14} />
          <Btn t={t} kind="primary" onClick={() => setSent(true)}>Send privately</Btn>
        </React.Fragment>
      )}
    </Sheet>
  );
}

/* ───────── Fair-load · Calm (A) ───────── */
function FairLoadA({ t, platform, go, back }) {
  const [win, setWin] = React.useState('7');
  const [flag, setFlag] = React.useState(false);
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}` }}>
        <Pad style={{ paddingTop: 4, paddingBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 38 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back(t.slate)}</button>
            {I.lock(t.muted, 18)}
          </div>
          <H1 t={t} style={{ fontSize: 25, marginTop: 2 }}>Fair-load view</H1>
          <Spacer h={12} />
          <Seg t={t} full value={win} onChange={setWin} options={[{ v: '7', label: 'Last 7 days' }, { v: '30', label: 'Last 30 days' }]} />
        </Pad>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 16 }}><FairBody t={t} win={win} go={go} onFlag={() => setFlag(true)} /></Pad>
        <Spacer h={24} />
      </div>
      {flag && <FlagSheet t={t} platform={platform} onClose={() => setFlag(false)} />}
    </Screen>
  );
}

/* ───────── Fair-load · Bold (B) ───────── */
function FairLoadB({ t, platform, go, back }) {
  const [win, setWin] = React.useState('7');
  const [flag, setFlag] = React.useState(false);
  const hero = t.name === 'light' ? t.teal700 : t.teal900;
  const data = win === '30' ? F4_LOAD_30 : F4_LOAD_7;
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ background: hero, padding: '4px 20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back('#fff')}</button>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: OK_FONT, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.82)' }}>{I.lock('#fff', 15)} Private</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 4 }}>{TI.scales('#fff', 26)}<div style={{ fontFamily: OK_FONT, fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>Fair-load</div></div>
          {/* big distribution bar */}
          <div style={{ display: 'flex', height: 14, borderRadius: 8, overflow: 'hidden', gap: 2, marginTop: 16 }}>
            {data.rows.map((r) => <div key={r.id} style={{ width: `${r.share}%`, background: memberBy(r.id).c }} />)}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 11 }}>
            {data.rows.map((r) => <span key={r.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 11.5, color: 'rgba(255,255,255,.9)' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: memberBy(r.id).c }} />{memberBy(r.id).n} {r.share}%</span>)}
          </div>
        </div>
        <Pad style={{ marginTop: 16 }}>
          <Seg t={t} full value={win} onChange={setWin} options={[{ v: '7', label: 'Last 7 days' }, { v: '30', label: 'Last 30 days' }]} />
          <Spacer h={16} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.rows.map((r) => {
              const m = memberBy(r.id);
              return (
                <Card key={r.id} t={t} pad={14} style={{ borderLeft: `4px solid ${m.c}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 11 }}>
                    <Avatar color={m.c} name={m.n} size={34} ring={t.surface} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>{m.n}{m.you ? ' (you)' : ''}</div>
                      <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 1 }}>{r.done} done · {r.open} open{r.tags.length ? ` · ${r.tags.join(', ')}` : ''}</div>
                    </div>
                    <span style={{ fontFamily: OK_FONT, fontSize: 19, fontWeight: 800, color: m.c }}>{r.share}%</span>
                  </div>
                  <div style={{ height: 9, borderRadius: 6, background: t.surfaceAlt, overflow: 'hidden' }}><div style={{ width: `${r.share}%`, height: '100%', borderRadius: 6, background: m.c }} /></div>
                </Card>
              );
            })}
          </div>
          <Spacer h={18} />
          <div onClick={() => go('rebalance')} style={{ cursor: 'pointer', borderRadius: 20, overflow: 'hidden', background: t.coral, boxShadow: '0 10px 26px rgba(226,104,60,.34)', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{TI.spark('#fff', 24)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 800, color: '#fff' }}>Suggest a fairer share</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: 'rgba(255,255,255,.9)', marginTop: 2 }}>Opt-in. Nothing changes until someone confirms.</div>
            </div>
            {I.chevR('#fff', 20)}
          </div>
          <Spacer h={16} />
          <PrivacyLine t={t}>Only adult members can see this. Never shared outside the household, never used for ads.</PrivacyLine>
          <Spacer h={10} />
          <button onClick={() => setFlag(true)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, fontFamily: OK_FONT, fontSize: 12.5, color: t.muted }}>{TI.flagOutline(t.muted, 15)} This doesn’t feel right</button>
        </Pad>
        <Spacer h={24} />
      </div>
      {flag && <FlagSheet t={t} platform={platform} onClose={() => setFlag(false)} />}
    </Screen>
  );
}

/* ───────── Rebalance suggestion + confirm (US-4.3.2) ───────── */
function Rebalance({ t, platform, go, back }) {
  const [confirmed, setConfirmed] = React.useState(false);
  const from = memberBy(F4_SUGGESTION.from), to = memberBy(F4_SUGGESTION.to);
  if (confirmed) {
    return (
      <Screen t={t} platform={platform} bg={t.bg}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center' }}>
          <div style={{ width: 84, height: 84, borderRadius: '50%', background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'okpop .4s cubic-bezier(.2,.8,.25,1)' }}>{I.check(t.green, 42)}</div>
          <div style={{ fontFamily: OK_FONT, fontSize: 22, fontWeight: 800, color: t.title, marginTop: 22, letterSpacing: -0.4 }}>Suggestion sent to Fabian</div>
          <Lead t={t} style={{ marginTop: 10, maxWidth: 300 }}>Two recurring chores will move once Fabian confirms. He has been notified. Nothing changes until he says yes.</Lead>
          <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: '14px 16px', marginTop: 22, width: '100%' }}>
            {F4_SUGGESTION.moves.map((mv, i) => (
              <div key={mv.taskId} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i === F4_SUGGESTION.moves.length - 1 ? 'none' : `1px solid ${t.hairline}` }}>
                <Avatar color={from.c} name={from.n} size={24} ring={t.surface} />
                {TI.swap(t.muted, 16)}
                <Avatar color={to.c} name={to.n} size={24} ring={t.surface} />
                <span style={{ flex: 1, textAlign: 'left', fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 600, color: t.ink }}>{mv.title}</span>
              </div>
            ))}
          </div>
        </div>
        <Pad style={{ paddingBottom: platform === 'ios' ? 30 : 18 }}><Btn t={t} kind="primary" onClick={() => go('tasksA')}>Back to tasks</Btn></Pad>
      </Screen>
    );
  }
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}` }}>
        <Pad style={{ paddingTop: 4, paddingBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', minHeight: 38 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back(t.slate)}</button>
            <span style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.title, marginLeft: 4 }}>A gentle suggestion</span>
          </div>
        </Pad>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 16 }}>
          {/* who → who */}
          <Card t={t} pad={16}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ textAlign: 'center' }}><Avatar color={from.c} name={from.n} size={52} ring={t.surface} /><div style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 700, color: t.ink, marginTop: 7 }}>{from.n}</div><div style={{ fontFamily: OK_FONT, fontSize: 11, color: t.muted }}>42% now</div></div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>{TI.swap(t.coral, 24)}<span style={{ fontFamily: OK_FONT, fontSize: 10.5, fontWeight: 700, color: t.coral }}>move 2</span></div>
              <div style={{ textAlign: 'center' }}><Avatar color={to.c} name={to.n} size={52} ring={t.surface} /><div style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 700, color: t.ink, marginTop: 7 }}>{to.n}</div><div style={{ fontFamily: OK_FONT, fontSize: 11, color: t.muted }}>22% now</div></div>
            </div>
            <div style={{ background: t.surfaceAlt, borderRadius: 12, padding: '11px 13px', marginTop: 16, fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.5, textAlign: 'center' }}>{F4_SUGGESTION.reason}</div>
          </Card>
          <Spacer h={16} />
          <GroupHead t={t} style={{ marginBottom: 9 }}>Chores to move</GroupHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {F4_SUGGESTION.moves.map((mv) => (
              <Card key={mv.taskId} t={t} pad={14} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{TI.repeat(t.teal700, 20)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>{mv.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}><RepeatChip t={t} repeat={mv.repeat} size="sm" /><span style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted }}>{mv.detail}</span></div>
                </div>
              </Card>
            ))}
          </div>
          <Spacer h={16} />
          <GroupHead t={t} style={{ marginBottom: 9 }}>This suggestion respects</GroupHead>
          <Card t={t} pad={4}>
            {F4_SUGGESTION.respects.map((r, i) => (
              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', borderBottom: i === F4_SUGGESTION.respects.length - 1 ? 'none' : `1px solid ${t.hairline}` }}>
                {I.checkCircle(t.green, 18)}<span style={{ fontFamily: OK_FONT, fontSize: 13.5, color: t.ink }}>{r}</span>
              </div>
            ))}
          </Card>
          <Spacer h={14} />
          <PrivacyLine t={t}>This runs on your household’s data only. It is never used to profile anyone or for advertising.</PrivacyLine>
          <Spacer h={platform === 'ios' ? 168 : 150} />
        </Pad>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: platform === 'ios' ? '12px 18px 30px' : '12px 18px 16px', background: t.surface, borderTop: `1px solid ${t.hairline}`, zIndex: 10 }}>
        <Btn t={t} kind="primary" onClick={() => setConfirmed(true)} icon={TI.swap('#fff', 18)}>Send to Fabian to confirm</Btn>
        <Spacer h={8} />
        <Btn t={t} kind="ghost" onClick={back} full><span style={{ color: t.slate }}>Not now</span></Btn>
      </div>
    </Screen>
  );
}

/* ───────── Reminders · morning digest (US-4.2.1) ───────── */
function RemindersA({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}` }}>
        <Pad style={{ paddingTop: 4, paddingBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 38 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back(t.slate)}</button>
            <button onClick={() => go('reminderPrefs')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, display: 'flex' }}>{I.gear(t.slate, 20)}</button>
          </div>
          <H1 t={t} style={{ fontSize: 25, marginTop: 2 }}>Reminders</H1>
          <Lead t={t} style={{ marginTop: 5, fontSize: 13.5 }}>Calm by design. Due tasks arrive together, and overdue ones nudge once.</Lead>
        </Pad>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 16 }}>
          {/* digest card */}
          <Card t={t} pad={0} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 11, borderBottom: `1px solid ${t.hairline}` }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{TI.bell(t.teal700, 20)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>Your morning digest</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 1 }}>{F4_DIGEST.time} · one notification, not three</div>
              </div>
            </div>
            {F4_DIGEST.items.map((it, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 16px', borderBottom: i === F4_DIGEST.items.length - 1 ? 'none' : `1px solid ${t.hairline}` }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: it.overdue ? t.warning : t.teal500, flex: '0 0 auto' }} />
                <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.ink }}>{it.title}</span>
                <span style={{ fontFamily: OK_FONT, fontSize: 12, fontWeight: it.overdue ? 700 : 500, color: it.overdue ? t.warning : t.muted }}>{it.meta}</span>
              </div>
            ))}
          </Card>
          <Spacer h={16} />
          {/* gentle overdue */}
          <Card t={t} pad={14} style={{ background: 'rgba(224,165,60,.1)', border: `1px solid rgba(224,165,60,.4)` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
              {TI.alert(t.warning, 20)}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink }}>One gentle nudge for overdue work</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 3, lineHeight: 1.5 }}>“Return school forms” was due yesterday. You will be reminded once, not repeatedly.</div>
              </div>
            </div>
          </Card>
          <Spacer h={16} />
          <Card t={t} pad={14} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            {TI.moon(t.teal700, 18)}
            <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13.5, color: t.ink }}>Quiet hours are on from {F4_REMINDER_PREFS.quietFrom} to {F4_REMINDER_PREFS.quietTo}</span>
            <Link t={t} onClick={() => go('reminderPrefs')} style={{ fontSize: 13 }}>Edit</Link>
          </Card>
          <Spacer h={20} />
        </Pad>
      </div>
    </Screen>
  );
}

/* ───────── Reminder preferences ───────── */
function ReminderPrefs({ t, platform, go, back }) {
  const [p, setP] = React.useState(F4_REMINDER_PREFS);
  const set = (k, v) => setP((s) => ({ ...s, [k]: v }));
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}` }}>
        <Pad style={{ paddingTop: 4, paddingBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', minHeight: 38 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back(t.slate)}</button>
            <span style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.title, marginLeft: 4 }}>Reminder settings</span>
          </div>
        </Pad>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 16 }}>
          <GroupHead t={t} style={{ marginBottom: 9 }}>When</GroupHead>
          <Card t={t} pad={16}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>Lead time</span>
              <span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.teal700 }}>{p.lead}</span>
            </div>
            <div style={{ display: 'flex', gap: 7, marginTop: 12, flexWrap: 'wrap' }}>
              {['At due time', '30 minutes before', '1 hour before', 'Morning of'].map((o) => {
                const on = o === p.lead;
                return <button key={o} onClick={() => set('lead', o)} style={{ border: 'none', borderRadius: 999, padding: '8px 13px', cursor: 'pointer', background: on ? t.teal700 : t.surfaceAlt, color: on ? '#fff' : t.slate, fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600 }}>{o}</button>;
              })}
            </div>
          </Card>
          <Spacer h={16} />
          <GroupHead t={t} style={{ marginBottom: 9 }}>How</GroupHead>
          <Card t={t} pad={'2px 16px'}>
            <ToggleRow t={t} icon={TI.bell(t.teal700, 18)} label="Push notification" value={p.channels.push} onChange={(v) => set('channels', { ...p.channels, push: v })} />
            <div style={{ height: 1, background: t.hairline }} />
            <ToggleRow t={t} icon={I.mail(t.teal700, 18)} label="Email" sub="Off by default" value={p.channels.email} onChange={(v) => set('channels', { ...p.channels, email: v })} />
            <div style={{ height: 1, background: t.hairline }} />
            <ToggleRow t={t} icon={TI.checklist(t.teal700, 18)} label="Coalesce into one digest" sub="Bundle several due tasks into a single reminder" value={p.digest} onChange={(v) => set('digest', v)} />
          </Card>
          <Spacer h={16} />
          <GroupHead t={t} style={{ marginBottom: 9 }}>Quiet hours</GroupHead>
          <Card t={t} pad={16} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {TI.moon(t.teal700, 18)}
            <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>No reminders</span>
            <span style={{ fontFamily: OK_MONO, fontSize: 14, fontWeight: 600, color: t.teal700 }}>{p.quietFrom} – {p.quietTo}</span>
          </Card>
          <Spacer h={14} />
          <PrivacyLine t={t}>Each member sets their own reminders. We keep them calm to avoid nagging.</PrivacyLine>
          <Spacer h={20} />
        </Pad>
      </div>
    </Screen>
  );
}

/* ───────── Offline-tolerant writes (PRD §3.1 dependency) ───────── */
function Offline({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}` }}>
        <Pad style={{ paddingTop: 4, paddingBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', minHeight: 38 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back(t.slate)}</button>
            <span style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.title, marginLeft: 4 }}>Tasks</span>
          </div>
        </Pad>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.panelTeal, borderRadius: 13, padding: '11px 13px', borderLeft: `3px solid ${t.teal500}` }}>
            {I.wifiOff(t.teal700, 18)}
            <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.4 }}>You are offline. You can still tick off and add tasks. Changes sync when you reconnect.</span>
          </div>
          <Spacer h={16} />
          <Card t={t} pad={4}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 12px', borderBottom: `1px solid ${t.hairline}`, opacity: 0.85 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: t.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{I.check('#fff', 15)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink, textDecoration: 'line-through' }}>Take the bins out</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>{TI.sync(t.warning, 13)}<span style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.warning, fontWeight: 600 }}>Saved on this device · will sync</span></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 12px' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', flex: '0 0 auto', boxShadow: `inset 0 0 0 2px ${t.teal300}` }} />
              <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>Cook dinner</span>
            </div>
          </Card>
          <Spacer h={16} />
          <Card t={t} pad={14} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            {TI.sync(t.teal700, 18)}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 700, color: t.ink }}>1 change waiting to sync</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 1 }}>Everyone’s changes merge cleanly when you are back online.</div>
            </div>
          </Card>
          <Spacer h={20} />
        </Pad>
      </div>
    </Screen>
  );
}

Object.assign(window, { FairLoadA, FairLoadB, FairBody, FlagSheet, Rebalance, RemindersA, ReminderPrefs, Offline });

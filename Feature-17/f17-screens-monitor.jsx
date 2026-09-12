/* OmniKin · Feature 17 — Epic 17.3 (differentiated): live spend against budget,
   the history-based overspend flag in both versions, acting on it, flag restraint
   settings, and budget-versus-actual trends. */
const {
  OK_FONT, OK_MONO, I, Screen, Btn,
  MI, CAT_ICON, Pad, H1, Lead, Spacer, Grow, Link, Kicker, Money,
  Avatar, Card, GroupHead, CatChip, CadenceChip, ScopeChip, FlagChip,
  SpendBar, Ring, Seg, Sheet, ChoiceRow, ToggleRow, PrivacyLine, TrendBars,
  FormBar, RowLink, FieldLabel,
  catBy, cadenceBy, eur, remaining, pct, budgetBy, F17_FLAG, F17_TRENDS, F17_FLAG_PREFS, F17_PERIOD,
} = window;

/* the shared explanation block — same words in both versions, different weight */
function FlagWhy({ t }) {
  const max = Math.max(...F17_FLAG.lookback.map((r) => r.budget), F17_FLAG.projected);
  return (
    <Card t={t} pad={16}>
      <GroupHead t={t} style={{ marginBottom: 12 }}>Why you are seeing this</GroupHead>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {F17_FLAG.lookback.map((r) => (
          <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <span style={{ width: 30, fontFamily: OK_FONT, fontSize: 12, fontWeight: 600, color: t.slate, flex: '0 0 auto' }}>{r.label}</span>
            <div style={{ flex: 1, height: 8, borderRadius: 5, background: t.surfaceAlt, overflow: 'hidden' }}>
              <div style={{ width: `${(r.actual / max) * 100}%`, height: '100%', borderRadius: 5, background: t.teal500 }} />
            </div>
            <Money size={12.5} style={{ color: t.slate, width: 46, textAlign: 'right' }}>{eur(r.actual)}</Money>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <span style={{ width: 30, fontFamily: OK_FONT, fontSize: 12, fontWeight: 700, color: t.warning, flex: '0 0 auto' }}>Sep</span>
          <div style={{ flex: 1, height: 8, borderRadius: 5, background: t.surfaceAlt, overflow: 'hidden' }}>
            <div style={{ width: `${(F17_FLAG.projected / max) * 100}%`, height: '100%', borderRadius: 5, background: t.warning }} />
          </div>
          <Money size={12.5} style={{ color: t.warning, width: 46, textAlign: 'right' }}>{eur(F17_FLAG.projected)}</Money>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 13, paddingTop: 13, borderTop: `1px solid ${t.hairline}` }}>
        <span style={{ width: 20, height: 3, borderRadius: 2, background: t.hairline, flex: '0 0 auto' }} />
        <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>Budget {eur(F17_FLAG.amount)} each month</span>
      </div>
      <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 11, lineHeight: 1.55 }}>The projection compares this month's pace with your own last three months. It uses nothing but your household's records.</div>
    </Card>
  );
}

/* ═══════════ US-17.3.2 · Version A · the calm heads-up ═══════════ */
function FlagA({ t, platform, go, back }) {
  const b = budgetBy(F17_FLAG.budget);
  const [sheet, setSheet] = React.useState(null);
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Heads-up" right={<button onClick={() => go('flagPrefs')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, display: 'flex' }}>{MI.bell(t.slate, 18)}</button>} />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 18 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 42, height: 42, borderRadius: 13, background: 'rgba(224,165,60,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{MI.alert(t.warning, 21)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 19, fontWeight: 700, color: t.title, letterSpacing: -0.3, lineHeight: 1.25 }}>{F17_FLAG.headline}</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 5 }}>Raised {F17_FLAG.raised} · only you and Fabian can see this</div>
            </div>
          </div>
          <Lead t={t} style={{ marginTop: 14 }}>{F17_FLAG.body}</Lead>

          <Spacer h={18} />
          <Card t={t} pad={16}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>{b.name}</span>
              <CadenceChip t={t} cadence={b.cadence} sm />
              <Grow />
              <Money size={15} style={{ color: t.warning }}>{eur(b.spent)}</Money>
              <span style={{ fontFamily: OK_MONO, fontSize: 12, color: t.muted }}>/ {eur(b.amount)}</span>
            </div>
            <div style={{ marginTop: 11 }}><SpendBar t={t} b={b} h={10} /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 10 }}>
              <span style={{ width: 2.5, height: 12, background: t.error, borderRadius: 2, flex: '0 0 auto' }} />
              <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.slate }}>Where this pace lands: {eur(F17_FLAG.projected)}, about {eur(F17_FLAG.over)} over</span>
            </div>
          </Card>

          <Spacer h={14} />
          <FlagWhy t={t} />

          <Spacer h={16} />
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', background: t.panelGreen, borderRadius: 14, padding: '13px 14px', borderLeft: `3px solid ${t.green}` }}>
            {MI.shieldOk(t.green, 19)}
            <span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.5 }}>Nothing has been changed and nothing is blocked. Anyone can still log what they need to spend.</span>
          </div>
          <Spacer h={22} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, background: t.surface, borderTop: `1px solid ${t.hairline}`, display: 'flex', flexDirection: 'column', gap: 9 }}>
        <Btn t={t} kind="primary" onClick={() => go('flagAct')}>Decide what to do</Btn>
        <Btn t={t} kind="ghost" onClick={() => setSheet('mute')}>Not useful right now</Btn>
      </div>
      {sheet === 'mute' && (
        <Sheet t={t} platform={platform} title="Quieten this" sub="Tell us how this landed. It changes nothing about your budget." onClose={() => setSheet(null)}>
          <ChoiceRow t={t} icon={MI.mute(t.teal700, 18)} label="Mute flags for Groceries" sub="Other pots keep their heads-ups" onClick={() => setSheet(null)} />
          <ChoiceRow t={t} icon={MI.clock(t.teal700, 18)} label="Remind me at the end of the month" onClick={() => setSheet(null)} />
          <ChoiceRow t={t} icon={MI.bell(t.teal700, 18)} label="Turn all pacing flags off" sub="You can bring them back in settings" onClick={() => { setSheet(null); go('flagPrefs'); }} />
        </Sheet>
      )}
    </Screen>
  );
}

/* ═══════════ Version B · the bold heads-up ═══════════ */
function FlagB({ t, platform, go, back }) {
  const b = budgetBy(F17_FLAG.budget);
  const hero = t.name === 'light' ? t.teal700 : t.teal900;
  const overPct = Math.round((F17_FLAG.projected / F17_FLAG.amount) * 100);
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ background: hero, padding: '6px 20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back('#fff')}</button>
            <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: '#fff' }}>Heads-up</div>
            <button onClick={() => go('flagPrefs')} style={{ border: 'none', background: 'rgba(255,255,255,.16)', borderRadius: 999, padding: 8, cursor: 'pointer', display: 'flex' }}>{MI.bell('#fff', 17)}</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 16 }}>
            <Ring t={t} value={100} size={104} thickness={12} tone={t.warning} track="rgba(255,255,255,.2)" hole={hero}>
              <span style={{ fontFamily: OK_MONO, fontSize: 19, fontWeight: 700, color: '#fff' }}>{overPct}%</span>
              <span style={{ fontFamily: OK_FONT, fontSize: 10, color: '#fff', letterSpacing: .4, textAlign: 'center', lineHeight: 1.25, marginTop: 2 }}>OF PLAN<br />AT THIS PACE</span>
            </Ring>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(224,165,60,.28)', borderRadius: 999, padding: '4px 10px' }}>
                {MI.alert('#fff', 13)}<span style={{ fontFamily: OK_FONT, fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: .3 }}>PACING OVER</span>
              </div>
              <div style={{ fontFamily: OK_FONT, fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: -0.5, lineHeight: 1.2, marginTop: 10 }}>Groceries lands near {eur(F17_FLAG.projected)}</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: 'rgba(255,255,255,.85)', marginTop: 6 }}>about {eur(F17_FLAG.over)} over the {eur(F17_FLAG.amount)} plan</div>
            </div>
          </div>
          <div style={{ marginTop: 18, background: 'rgba(255,255,255,.13)', borderRadius: 16, padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            {I.lock('#fff', 16)}
            <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: '#fff', lineHeight: 1.45 }}>Private to you and Fabian. Drawn from your own last three months.</span>
          </div>
        </div>

        <Pad style={{ paddingTop: 18 }}>
          <Lead t={t}>{F17_FLAG.body}</Lead>
          <Spacer h={16} />
          <Card t={t} pad={16}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <Money size={26} weight={700} style={{ color: t.warning }}>{eur(b.spent)}</Money>
              <span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.muted, fontWeight: 600 }}>of {eur(b.amount)} · day {F17_PERIOD.dayOf} of {F17_PERIOD.days}</span>
            </div>
            <div style={{ marginTop: 11 }}><SpendBar t={t} b={b} h={11} /></div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              {[['Remaining', eur(remaining(b))], ['At this pace', eur(F17_FLAG.projected)], ['Usual month', eur(F17_FLAG.lookback[2].actual)]].map(([k, v]) => (
                <div key={k} style={{ flex: 1, background: t.surfaceAlt, borderRadius: 12, padding: '10px 11px' }}>
                  <div style={{ fontFamily: OK_FONT, fontSize: 10.5, fontWeight: 700, letterSpacing: .4, textTransform: 'uppercase', color: t.muted }}>{k}</div>
                  <div style={{ fontFamily: OK_MONO, fontSize: 14, fontWeight: 700, color: t.ink, marginTop: 5 }}>{v}</div>
                </div>
              ))}
            </div>
          </Card>
          <Spacer h={14} />
          <FlagWhy t={t} />
          <Spacer h={14} />
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', background: t.panelGreen, borderRadius: 14, padding: '13px 14px', borderLeft: `3px solid ${t.green}` }}>
            {MI.shieldOk(t.green, 19)}
            <span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.5 }}>Nothing was changed and no expense is blocked. This is one gentle heads-up, not a running commentary.</span>
          </div>
          <Spacer h={22} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, background: t.surface, borderTop: `1px solid ${t.hairline}`, display: 'flex', flexDirection: 'column', gap: 9 }}>
        <Btn t={t} kind="primary" onClick={() => go('flagAct')}>Decide what to do</Btn>
        <Btn t={t} kind="ghost" onClick={() => go('flagPrefs')}>Not useful right now</Btn>
      </div>
    </Screen>
  );
}

/* acting on the flag — always a human decision */
function FlagAct({ t, platform, go, back, reset }) {
  const [choice, setChoice] = React.useState('defer');
  const [done, setDone] = React.useState(false);
  if (done) {
    return (
      <Screen t={t} platform={platform} bg={t.bg}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'okpop .4s cubic-bezier(.2,.8,.25,1)' }}>{I.check(t.green, 36)}</div>
          <div style={{ fontFamily: OK_FONT, fontSize: 22, fontWeight: 800, color: t.title, marginTop: 20, letterSpacing: -0.3 }}>The flag has cleared</div>
          <Lead t={t} style={{ marginTop: 10, maxWidth: 300 }}>The bulk shop now sits in October, so September's pace is back inside the plan. Groceries lands near €640.</Lead>
          <div style={{ width: '100%', maxWidth: 320, marginTop: 20 }}>
            <Card t={t} pad={15}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink }}>Groceries</span>
                <Grow />
                <Money size={14}>€470</Money>
                <span style={{ fontFamily: OK_MONO, fontSize: 12, color: t.muted }}>/ €650</span>
              </div>
              <div style={{ marginTop: 10 }}><SpendBar t={t} b={{ ...budgetBy('bg'), flag: null }} h={8} /></div>
              <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.green, fontWeight: 600, marginTop: 10 }}>On pace again</div>
            </Card>
          </div>
        </div>
        <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16 }}>
          <Btn t={t} kind="primary" onClick={() => reset && reset('money')}>Back to budgets</Btn>
        </div>
      </Screen>
    );
  }
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="What would you like to do" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 18 }}>
          <Lead t={t} style={{ marginBottom: 16 }}>Nothing happens automatically. Pick the one that fits, or leave it and the flag stays quiet.</Lead>
          {F17_FLAG.options.map((o) => <ChoiceRow key={o.id} t={t} radio on={choice === o.id} label={o.label} sub={o.sub} onClick={() => setChoice(o.id)} />)}
          {choice === 'adjust' && (
            <React.Fragment>
              <Spacer h={8} />
              <Card t={t} pad={14}>
                <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.5 }}>Raising the pot asks whether the change is for September only or for every month from now on, so past months stay as they were.</div>
                <Spacer h={12} />
                <Btn t={t} kind="outline" onClick={() => go('editBudget')}>Open the budget to change it</Btn>
              </Card>
            </React.Fragment>
          )}
          <Spacer h={16} />
          <PrivacyLine t={t}>Whatever you choose, the comparison stays on your household's own data.</PrivacyLine>
          <Spacer h={22} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" onClick={() => (choice === 'adjust' ? go('editBudget') : setDone(true))}>{choice === 'ack' ? 'Acknowledge' : 'Confirm'}</Btn>
      </div>
    </Screen>
  );
}

/* flag restraint: preferences and quiet hours (guardrail) */
function FlagPrefs({ t, platform, go, back }) {
  const [p, setP] = React.useState(F17_FLAG_PREFS);
  const set = (k, v) => setP((x) => ({ ...x, [k]: v }));
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Heads-up settings" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 14 }}>
          <Lead t={t} style={{ fontSize: 13.5 }}>A pacing flag should be useful once, not a running commentary. Tune it here or turn it off entirely.</Lead>
          <Spacer h={16} />
          <Card t={t} pad={14}>
            <ToggleRow t={t} icon={MI.alert(t.slate, 18)} label="Pacing heads-ups" sub="A quiet note when a pot is heading past its plan" value={p.flags} onChange={(v) => set('flags', v)} />
            <div style={{ borderTop: `1px solid ${t.hairline}` }}>
              <ToggleRow t={t} icon={MI.repeat(t.slate, 18)} label="Escalate once only" sub="One gentle follow-up at most, never repeated nudges" value={p.escalateOnce} onChange={(v) => set('escalateOnce', v)} />
            </div>
          </Card>
          <Spacer h={14} />
          <GroupHead t={t} style={{ marginBottom: 9 }}>Quiet hours</GroupHead>
          <Card t={t} pad={0}><div style={{ padding: '0 15px' }}>
            <RowLink t={t} icon={MI.clock(t.slate, 18)} label="From" value={p.quietFrom} onClick={() => {}} />
            <RowLink t={t} icon={MI.clock(t.slate, 18)} label="Until" value={p.quietTo} onClick={() => {}} />
          </div></Card>
          <Spacer h={14} />
          <GroupHead t={t} style={{ marginBottom: 9 }}>Per pot</GroupHead>
          <Card t={t} pad={0} style={{ overflow: 'hidden' }}>
            {['Groceries', 'Transport top-up', 'House renovation'].map((n, i) => (
              <div key={n} style={{ padding: '2px 15px', borderBottom: i === 2 ? 'none' : `1px solid ${t.hairline}` }}>
                <ToggleRow t={t} label={n} value={i !== 2} onChange={() => {}} />
              </div>
            ))}
          </Card>
          <Spacer h={14} />
          <PrivacyLine t={t}>Flags respect these settings and your quiet hours. Muting one never changes a budget.</PrivacyLine>
          <Spacer h={22} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" onClick={back}>Save</Btn>
      </div>
    </Screen>
  );
}

/* ═══════════ US-17.3.3 · trends ═══════════ */
function Trends({ t, platform, go, back }) {
  const [view, setView] = React.useState('periods');
  const maxCat = Math.max(...F17_TRENDS.cats.map((c) => Math.max(c.budget, c.actual)));
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Trends" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 14 }}>
          <Seg t={t} full value={view} onChange={setView} options={[{ v: 'periods', label: 'By period' }, { v: 'cats', label: 'By category' }]} />
          <Spacer h={16} />
          {view === 'periods' ? (
            <React.Fragment>
              <Card t={t} pad={16}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div>
                    <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>Groceries</div>
                    <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 2 }}>{F17_TRENDS.window} · plan against actual</div>
                  </div>
                  <CadenceChip t={t} cadence="monthly" sm />
                </div>
                <TrendBars t={t} rows={F17_TRENDS.series} />
                <div style={{ display: 'flex', gap: 16, marginTop: 14, paddingTop: 13, borderTop: `1px solid ${t.hairline}` }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: OK_FONT, fontSize: 12, color: t.slate }}><span style={{ width: 11, height: 11, borderRadius: 3, background: t.hairline }} />Budget</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: OK_FONT, fontSize: 12, color: t.slate }}><span style={{ width: 11, height: 11, borderRadius: 3, background: t.teal500 }} />Actual</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: OK_FONT, fontSize: 12, color: t.slate }}><span style={{ width: 11, height: 11, borderRadius: 3, background: t.teal300 }} />September so far</span>
                </div>
              </Card>
              <Spacer h={14} />
              <Card t={t} pad={15}>
                <div style={{ fontFamily: OK_FONT, fontSize: 13.5, color: t.ink, lineHeight: 1.55 }}>Three months landed just under €650 and September is running warmer. A pot nearer €680 would match how your household actually shops.</div>
                <Spacer h={12} />
                <Btn t={t} kind="outline" onClick={() => go('editBudget')}>Adjust the Groceries pot</Btn>
              </Card>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Card t={t} pad={16}>
                <GroupHead t={t} style={{ marginBottom: 14 }}>This month by pot</GroupHead>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                  {F17_TRENDS.cats.map((c) => {
                    const cat = catBy(c.id);
                    return (
                      <div key={c.id}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 7 }}>
                          <span style={{ width: 9, height: 9, borderRadius: 3, background: cat.c, flex: '0 0 auto' }} />
                          <span style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 600, color: t.ink }}>{cat.label}</span>
                          <Grow />
                          <Money size={12.5} style={{ color: t.ink }}>{eur(c.actual)}</Money>
                          <span style={{ fontFamily: OK_MONO, fontSize: 11.5, color: t.muted }}>/ {eur(c.budget)}</span>
                        </div>
                        <div style={{ height: 8, borderRadius: 5, background: t.surfaceAlt, overflow: 'hidden' }}>
                          <div style={{ width: `${(c.actual / c.budget) * 100}%`, height: '100%', borderRadius: 5, background: cat.c }} />
                        </div>
                        <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 5 }}>{c.note}</div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </React.Fragment>
          )}
          <Spacer h={16} />
          <PrivacyLine t={t}>Trends cover only the pots you are permitted to see, and are never shared outside the household.</PrivacyLine>
          <Spacer h={22} />
        </Pad>
      </div>
    </Screen>
  );
}

Object.assign(window, { FlagWhy, FlagA, FlagB, FlagAct, FlagPrefs, Trends });

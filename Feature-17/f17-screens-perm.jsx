/* OmniKin · Feature 17 — Epic 17.2: per-record visibility, role-based access,
   the scoped Teen exception, proof that a hidden pot is truly invisible, and the
   household privacy boundary. */
const {
  OK_FONT, OK_MONO, I, Screen, Btn, Field,
  MI, Pad, H1, Lead, Spacer, Grow, Link, Kicker, Money,
  Avatar, AvatarStack, Card, GroupHead, ScopeChip, CadenceChip, SpendBar,
  Seg, Sheet, ChoiceRow, ToggleRow, PrivacyLine, FormBar, RowLink, FieldLabel,
  F17_MEMBERS, memberBy, eur, budgetBy, F17_SCOPES, F17_VISIBLE,
} = window;

/* ═══════════ US-17.2.1 · set who can see a budget or expense ═══════════ */
function Visibility({ t, platform, go, back }) {
  const [scope, setScope] = React.useState('chosen');
  const [picked, setPicked] = React.useState(['jeni', 'fabian']);
  const removed = !picked.includes('renate');
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Who can see it" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 16 }}>
          <Card t={t} pad={14} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: t.coral100, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{MI.hammer('#E2683C', 19)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>House renovation</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 2 }}>Yearly · €9,000 · owned by you</div>
            </div>
          </Card>

          <Spacer h={18} />
          <FieldLabel t={t}>Visibility</FieldLabel>
          {Object.values(F17_SCOPES).map((s) => <ChoiceRow key={s.id} t={t} radio on={s.id === scope} label={s.label} sub={s.blurb} onClick={() => setScope(s.id)} />)}

          {scope === 'chosen' && (
            <React.Fragment>
              <Spacer h={10} />
              <FieldLabel t={t}>Members</FieldLabel>
              <Card t={t} pad={0}>
                {F17_MEMBERS.map((m, i) => {
                  const on = picked.includes(m.id);
                  const blocked = m.money === 'none';
                  return (
                    <button key={m.id} disabled={blocked} onClick={() => setPicked(on ? picked.filter((x) => x !== m.id) : [...picked, m.id])}
                      style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 11, border: 'none', background: 'transparent', padding: '12px 15px', borderBottom: i === F17_MEMBERS.length - 1 ? 'none' : `1px solid ${t.hairline}`, cursor: blocked ? 'default' : 'pointer', opacity: blocked ? 0.5 : 1 }}>
                      <Avatar color={m.c} name={m.n} size={34} ring={t.surface} />
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{m.full}{m.you ? ' (you)' : ''}</span>
                        <span style={{ display: 'block', fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 2 }}>{m.role}{blocked ? ' · no access to money' : ''}</span>
                      </span>
                      <span style={{ width: 22, height: 22, borderRadius: 7, flex: '0 0 auto', background: on ? t.teal700 : 'transparent', boxShadow: on ? 'none' : `inset 0 0 0 2px ${t.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && I.check('#fff', 13)}</span>
                    </button>
                  );
                })}
              </Card>
            </React.Fragment>
          )}

          {removed && scope === 'chosen' && (
            <React.Fragment>
              <Spacer h={14} />
              <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', background: t.panelTeal, borderRadius: 14, padding: '13px 14px', borderLeft: `3px solid ${t.info}` }}>
                {MI.eyeScope(t.info, 19)}
                <span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.5 }}>Oma Renate is outside this scope. From the moment you save, the pot, its amount, its expenses and its history disappear from every surface she can reach.</span>
              </div>
            </React.Fragment>
          )}

          <Spacer h={16} />
          <PrivacyLine t={t}>You cannot give anyone access wider than your own role allows.</PrivacyLine>
          <Spacer h={22} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, background: t.surface, borderTop: `1px solid ${t.hairline}`, display: 'flex', flexDirection: 'column', gap: 9 }}>
        <Btn t={t} kind="primary" onClick={back}>Save visibility</Btn>
        <Btn t={t} kind="ghost" onClick={() => go('noAccess')}>See what a member outside the scope sees</Btn>
      </div>
    </Screen>
  );
}

/* ═══════════ US-17.2.2 · role-based access to money ═══════════ */
function Permissions({ t, platform, go, back }) {
  const [rows, setRows] = React.useState(() => F17_MEMBERS.map((m) => ({ id: m.id, level: m.money })));
  const LEVELS = [
    { v: 'none', label: 'None' },
    { v: 'view', label: 'View' },
    { v: 'contribute', label: 'Contribute' },
    { v: 'manage', label: 'Manage' },
  ];
  const set = (id, v) => setRows((r) => r.map((x) => (x.id === id ? { ...x, level: v } : x)));
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Money access" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 14 }}>
          <Lead t={t} style={{ fontSize: 13.5 }}>Roles decide who can budget, log and manage money. View sees figures, contribute adds them, manage changes the plan.</Lead>
          <Spacer h={16} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {F17_MEMBERS.map((m) => {
              const row = rows.find((r) => r.id === m.id);
              const minor = m.kind === 'teen' || m.kind === 'child';
              const opts = minor ? [{ v: 'none', label: 'None' }, { v: 'scoped', label: 'Scoped' }] : LEVELS;
              return (
                <Card key={m.id} t={t} pad={14}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <Avatar color={m.c} name={m.n} size={36} ring={t.surface} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>{m.full}{m.you ? ' (you)' : ''}</div>
                      <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 2 }}>{m.role}{minor ? ' · minors see no money by default' : ''}</div>
                    </div>
                    {m.you && <span style={{ fontFamily: OK_FONT, fontSize: 11, fontWeight: 700, color: t.teal700, background: t.panelTeal, padding: '4px 9px', borderRadius: 999 }}>Owner</span>}
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <Seg t={t} full value={row.level} onChange={(v) => set(m.id, v)} options={opts} />
                  </div>
                  {minor && row.level === 'scoped' && (
                    <button onClick={() => go('teenAllowance')} style={{ width: '100%', marginTop: 11, border: 'none', background: t.panelTeal, borderRadius: 12, padding: '11px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 9, textAlign: 'left' }}>
                      {MI.coins(t.teal700, 17)}
                      <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: t.teal800 }}>{m.n === 'Lena' ? 'One pot: Lena’s allowance' : 'Choose the pots this member sees'}</span>
                      {I.chevR(t.teal700, 15)}
                    </button>
                  )}
                </Card>
              );
            })}
          </div>
          <Spacer h={16} />
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', background: t.coral100, borderRadius: 14, padding: '13px 14px', borderLeft: `3px solid ${t.coral}` }}>
            {I.shield(t.coral, 19)}
            <span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.5 }}>Child and Teen roles start with no access at all. Any exception is deliberate, scoped to named pots, and can be withdrawn at any time.</span>
          </div>
          <Spacer h={14} />
          <button onClick={() => go('privacy')} style={{ width: '100%', border: `1px solid ${t.hairline}`, background: t.surface, borderRadius: 14, padding: '13px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 11, textAlign: 'left' }}>
            {MI.shieldOk(t.teal700, 19)}
            <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 600, color: t.ink }}>How our money data is handled</span>
            {I.chevR(t.muted, 16)}
          </button>
          <Spacer h={22} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" onClick={back}>Save access</Btn>
      </div>
    </Screen>
  );
}

/* the deliberate, revocable Teen exception */
function TeenAllowance({ t, platform, go, back }) {
  const [on, setOn] = React.useState(true);
  const b = budgetBy('ba');
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Lena’s access" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 16 }}>
          <Card t={t} pad={15}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <Avatar color={memberBy('lena').c} name="L" size={40} ring={t.surface} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: t.ink }}>Lena Vogel</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 2 }}>Teen · scoped money access</div>
              </div>
            </div>
            <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, marginTop: 13, lineHeight: 1.5 }}>Lena sees one pot and nothing else. Household budgets, the renovation and every other expense stay invisible to her.</div>
          </Card>
          <Spacer h={14} />
          <Card t={t} pad={15}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>{b.name}</span>
              <CadenceChip t={t} cadence={b.cadence} sm />
              <Grow />
              <Money size={14}>{eur(b.spent)}</Money>
              <span style={{ fontFamily: OK_MONO, fontSize: 12, color: t.muted }}>/ {eur(b.amount)}</span>
            </div>
            <div style={{ marginTop: 10 }}><SpendBar t={t} b={b} h={7} showProjection={false} /></div>
            <div style={{ marginTop: 12, borderTop: `1px solid ${t.hairline}` }}>
              <ToggleRow t={t} label="Lena can log her own spend" sub="Against this pot only. She cannot change the amount." value={on} onChange={setOn} />
            </div>
          </Card>
          <Spacer h={14} />
          <Card t={t} pad={14}>
            <GroupHead t={t} style={{ marginBottom: 10 }}>Not visible to Lena</GroupHead>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {F17_VISIBLE.filter((x) => x.id !== 'ba').map((x) => (
                <div key={x.id} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.55 }}>
                  {I.lock(t.muted, 15)}
                  <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13, color: t.slate }}>{x.name}</span>
                  <span style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted }}>hidden</span>
                </div>
              ))}
            </div>
          </Card>
          <Spacer h={14} />
          <PrivacyLine t={t}>This exception is revocable. Withdrawing it removes her access immediately, everywhere.</PrivacyLine>
          <Spacer h={22} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, background: t.surface, borderTop: `1px solid ${t.hairline}`, display: 'flex', flexDirection: 'column', gap: 9 }}>
        <Btn t={t} kind="primary" onClick={back}>Save</Btn>
        <Btn t={t} kind="ghost" style={{ color: t.error }} onClick={back}>Withdraw Lena’s access</Btn>
      </div>
    </Screen>
  );
}

/* proof of the hard invariant: outside the scope, the record does not exist */
function NoAccess({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Seen as Oma Renate" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 16 }}>
          <div style={{ display: 'flex', gap: 11, alignItems: 'center', background: t.panelBlue, borderRadius: 14, padding: '12px 13px', borderLeft: `3px solid ${t.blue}` }}>
            <Avatar color={memberBy('renate').c} name="R" size={30} ring={t.surface} />
            <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.ink, lineHeight: 1.45 }}>A preview of what Oma Renate sees. She has view access to household pots and none to the two private ones.</span>
          </div>
          <Spacer h={16} />
          <GroupHead t={t} style={{ marginBottom: 9 }}>Her budgets</GroupHead>
          <Card t={t} pad={0} style={{ overflow: 'hidden' }}>
            {F17_VISIBLE.filter((b) => b.seen.includes('renate')).map((b, i, arr) => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${t.hairline}` }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>{b.name}</div>
                  <div style={{ marginTop: 8 }}><SpendBar t={t} b={b} h={6} showProjection={false} /></div>
                </div>
                <Money size={13.5}>{eur(b.spent)}</Money>
              </div>
            ))}
          </Card>
          <Spacer h={20} />
          <div style={{ textAlign: 'center', padding: '26px 18px', border: `1.5px dashed ${t.hairline}`, borderRadius: 18 }}>
            {MI.lockOut(t.muted, 34)}
            <div style={{ fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: t.slate, marginTop: 12 }}>Nothing else is here</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.muted, marginTop: 7, lineHeight: 1.5, maxWidth: 280, margin: '7px auto 0' }}>The renovation and vacation pots are outside her scope, so she sees no name, no amount, no history and no hint that they exist. Household totals she can see never include them either.</div>
          </div>
          <Spacer h={16} />
          <PrivacyLine t={t}>Zero records exposed outside their scope is a hard rule, not a setting.</PrivacyLine>
          <Spacer h={22} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16 }}>
        <Btn t={t} kind="outline" onClick={back}>Back to your own view</Btn>
      </div>
    </Screen>
  );
}

/* ═══════════ US-17.2.3 · household privacy boundary ═══════════ */
function Privacy({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Money and privacy" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{MI.shieldOk(t.teal700, 34)}</div>
          <H1 t={t} style={{ fontSize: 23, marginTop: 18 }}>Your money stays yours</H1>
          <Lead t={t} style={{ marginTop: 9 }}>Budgets, amounts, categories, notes and receipts never leave your household, and never feed advertising or profiling. That is a principle, not a release note.</Lead>
          <Spacer h={20} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              [MI.people, 'Inside the household only', 'Every figure is scoped to the members its owner chose. Nothing is shared outside.'],
              [MI.receipt, 'Receipts follow the record', 'An attachment inherits its expense visibility and is never shared without a deliberate action.'],
              [MI.trend, 'Flags run on your own history', 'Pacing comparisons use only your past periods. No external data, no bank connection.'],
              [I.globe, 'Held under your region’s rules', 'Financial data follows the same residency and compliance handling as the rest of OmniKin.'],
            ].map(([icon, title, body]) => (
              <Card key={title} t={t} pad={14} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{icon(t.teal700, 18)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink }}>{title}</div>
                  <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 4, lineHeight: 1.5 }}>{body}</div>
                </div>
              </Card>
            ))}
          </div>
          <Spacer h={16} />
          <Card t={t} pad={14} style={{ background: t.surfaceAlt, border: 'none' }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.55 }}>OmniKin records and monitors money. It never moves it, and it does not connect to bank accounts.</div>
          </Card>
          <Spacer h={22} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16 }}>
        <Btn t={t} kind="outline" onClick={back}>Back</Btn>
      </div>
    </Screen>
  );
}

Object.assign(window, { Visibility, Permissions, TeenAllowance, NoAccess, Privacy });

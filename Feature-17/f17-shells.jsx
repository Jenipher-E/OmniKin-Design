/* OmniKin · Feature 17 (Budgets & Expenses) — version shells.
   Version A (Calm): reached from a quiet Home card · one scrollable list grouped by cadence ·
     compact rows · the overspend flag as a calm inline banner · sheets for actions.
   Version B (Bold): reached from a bold Home card · teal hero carrying the month's ring and
     category chips · airy pot cards · the overspend flag as a full card at the top.
   Budgets & Expenses is NOT a footer tab in either version. */
const {
  OK_FONT, OK_MONO, I, Screen,
  MI, CAT_ICON, Pad, H1, Lead, Spacer, Grow, Link, Kicker, Money,
  Avatar, AvatarStack, Card, GroupHead, CatChip, CadenceChip, ScopeChip, FlagChip,
  SpendBar, Ring, BudgetRow, BudgetCard, ExpenseRow, Seg, TabBar, FAB, PrivacyLine,
  F17_MEMBERS, memberBy, catBy, cadenceBy, eur, remaining, pct,
  F17_BUDGETS, budgetBy, F17_VISIBLE, F17_FLAGGED, F17_MONTH, F17_PERIOD,
  F17_EXPENSES, F17_LEDGER, expenseBy, F17_TODAY_EXPENSES, F17_FLAG, F17_AUDIT, F17_CATS,
} = window;

/* the five household tabs, in the live app's order — money has no tab of its own */
const TABS = (active, go, homeId) => [
  ['Home', I.home, active === 'home', homeId],
  ['Tasks', I.list, active === 'tasks'],
  ['People', MI.people22, active === 'people'],
  ['Lists', I.doc, active === 'lists'],
  ['Settings', I.gear, active === 'settings'],
];

const CADENCE_ORDER = ['daily', 'weekly', 'monthly', 'yearly'];
const budgetsByCadence = (c) => F17_VISIBLE.filter((b) => b.cadence === c);

/* ════════════════════════════════════════════════════════════
   LANDING · the household homepage you arrive at after login
   Same shape as the live app: household header, owner chip, members,
   then the tile grid. Budgets & expenses joins Tasks, Lists and Settings
   as a card of its own, and it is not a footer tab.
   ════════════════════════════════════════════════════════════ */

function Tile({ t, label, icon, onClick, accent, locked }) {
  return (
    <div onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', background: t.surface, borderRadius: 18, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: '15px 15px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: accent ? t.teal700 : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{icon(accent ? '#fff' : t.teal700, 21)}</div>
        <Grow />
        {locked ? I.lock(t.muted, 15) : null}
      </div>
      <div style={{ fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: t.ink, marginTop: 14 }}>{label}</div>
    </div>
  );
}

function Landing({ t, platform, go, version }) {
  const bold = version === 'B';
  const homeId = bold ? 'landingB' : 'landingA';
  const moneyId = bold ? 'moneyB' : 'moneyA';
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, fontWeight: 500 }}>Your household</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 27, fontWeight: 700, color: t.title, letterSpacing: -0.6, marginTop: 2 }}>Vogel Family</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: t.panelGreen, borderRadius: 999, padding: '6px 12px', marginTop: 10 }}>
                {I.shield(t.green, 15)}<span style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: t.green }}>You’re the Owner</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, flex: '0 0 auto' }}>
              <Avatar color="#1C6E78" name="J" size={44} ring={t.surface} />
              <button onClick={() => go('permissions')} style={{ width: 38, height: 38, borderRadius: '50%', border: 'none', background: t.surfaceAlt, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{I.gear(t.slate, 19)}</button>
            </div>
          </div>
        </Pad>

        <Spacer h={18} />
        <Pad>
          <Card t={t} pad={15}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>Members · 5</span>
              <Grow />
              <button onClick={() => go('permissions')} style={{ border: 'none', background: t.panelTeal, borderRadius: 999, padding: '7px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: t.teal800 }}>Manage {I.chevR(t.teal800, 14)}</button>
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 14, overflowX: 'auto', paddingBottom: 6 }}>
              {F17_MEMBERS.map((m) => (
                <div key={m.id} style={{ flex: '0 0 auto', textAlign: 'center', width: 54 }}>
                  <Avatar color={m.c} name={m.n} size={44} ring={t.surface} />
                  <div style={{ fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 600, color: t.ink, marginTop: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.n}</div>
                  <div style={{ fontFamily: OK_FONT, fontSize: 9.5, fontWeight: 700, letterSpacing: .4, color: t.muted, marginTop: 2, textTransform: 'uppercase' }}>{m.role}</div>
                </div>
              ))}
            </div>
          </Card>
        </Pad>

        <Spacer h={16} />
        <Pad>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
            <Tile t={t} label="Tasks" icon={I.list} />
            <Tile t={t} label="Lists" icon={I.doc} />
            {/* ★ the money card, third in the grid */}
            <Tile t={t} label="Budgets & expenses" icon={MI.wallet} accent={bold} onClick={() => go(moneyId)} />
            <Tile t={t} label="People" icon={MI.people22} onClick={() => go('permissions')} />
            <Tile t={t} label="Settings" icon={I.gear} locked onClick={() => go('permissions')} />
          </div>
        </Pad>

        <Spacer h={16} />
        <Pad><PrivacyLine t={t}>Everything here stays inside your household. Each member sees only what their role and the record’s own scope allow.</PrivacyLine></Pad>
        <Spacer h={20} />
      </div>
      <TabBar t={t} platform={platform} tabs={TABS('home', go, homeId)} go={go} />
    </Screen>
  );
}
const LandingA = (p) => <Landing {...p} version="A" />;
const LandingB = (p) => <Landing {...p} version="B" />;

/* ════════════════════════════════════════════════════════════
   VERSION A · CALM
   ════════════════════════════════════════════════════════════ */

function HomeA({ t, platform, go }) {
  const flagged = F17_FLAGGED.length;
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

        {/* ★ NEW HOME CARD · Budgets & expenses (no footer tab) */}
        <Pad>
          <Card t={t} pad={0} onClick={() => go('moneyA')} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '15px 16px' }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{MI.wallet(t.teal700, 24)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.ink }}>Budgets &amp; expenses</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2 }}>{eur(F17_MONTH.left)} left this month · {F17_VISIBLE.length} pots</div>
              </div>
              {I.chevR(t.muted, 18)}
            </div>
            <div style={{ padding: '0 16px 14px' }}>
              <SpendBar t={t} b={{ amount: F17_MONTH.amount, spent: F17_MONTH.spent, cat: 'groceries' }} h={7} showProjection={false} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 9 }}>
                <Money size={13} style={{ color: t.ink }}>{eur(F17_MONTH.spent)}</Money>
                <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>of {eur(F17_MONTH.amount)} monthly budgets</span>
              </div>
            </div>
            {flagged > 0 && (
              <div style={{ borderTop: `1px solid ${t.hairline}`, padding: '12px 16px', background: 'rgba(224,165,60,.10)', display: 'flex', alignItems: 'center', gap: 9 }}>
                {MI.alert(t.warning, 15)}
                <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 12.5, color: t.ink }}>Groceries is pacing over for September</span>
                <span style={{ fontFamily: OK_FONT, fontSize: 12, fontWeight: 700, color: t.warning }}>Look</span>
              </div>
            )}
          </Card>
        </Pad>

        <Spacer h={16} />
        <Pad><GroupHead t={t} style={{ marginBottom: 10 }}>Today in the household</GroupHead></Pad>
        <Pad>
          <Card t={t} pad={4}>
            {F17_AUDIT.slice(0, 4).map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 11, padding: '10px 12px', borderBottom: i === 3 ? 'none' : `1px solid ${t.hairline}`, alignItems: 'center' }}>
                <Avatar color={a.c} name={a.who} size={30} ring={t.surface} />
                <div style={{ flex: 1, minWidth: 0 }}><span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.4 }}><b>{a.who}</b> {a.text}</span></div>
                <span style={{ fontFamily: OK_FONT, fontSize: 11, color: t.muted, flex: '0 0 auto' }}>{a.when}</span>
              </div>
            ))}
          </Card>
        </Pad>
        <Spacer h={16} />
        <Pad><GroupHead t={t} style={{ marginBottom: 10 }}>Also today</GroupHead></Pad>
        <Pad>
          <div style={{ display: 'flex', gap: 10 }}>
            {[['Tasks', I.list, '6 open'], ['Lists', I.doc, '2 shared']].map(([label, icon, sub]) => (
              <Card key={label} t={t} pad={14} style={{ flex: 1 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon(t.slate, 18)}</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink, marginTop: 10 }}>{label}</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 2 }}>{sub}</div>
              </Card>
            ))}
          </div>
        </Pad>
        <Spacer h={20} />
      </div>
      <TabBar t={t} platform={platform} tabs={TABS('home', go, 'homeA')} go={go} />
    </Screen>
  );
}

/* Budgets & expenses — calm, one list grouped by cadence */
function MoneyA({ t, platform, go, back }) {
  const [tab, setTab] = React.useState('budgets');
  const flag = F17_FLAGGED[0];
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}`, paddingBottom: 12 }}>
        <Pad style={{ paddingTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex', alignItems: 'center', gap: 3, fontFamily: OK_FONT, fontSize: 14, color: t.slate }}>{I.back(t.slate)} Home</button>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => go('trends')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, display: 'flex' }}>{MI.trend(t.slate, 20)}</button>
              <button onClick={() => go('permissions')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, display: 'flex' }}>{I.gear(t.slate, 20)}</button>
            </div>
          </div>
          <div style={{ marginTop: 2 }}>
            <H1 t={t} style={{ fontSize: 26 }}>Budgets &amp; expenses</H1>
            <Lead t={t} style={{ marginTop: 5, fontSize: 13.5 }}>What the household plans to spend, and what it has spent. You only ever see the pots you are permitted to see.</Lead>
          </div>
          <Spacer h={12} />
          <Seg t={t} full value={tab} onChange={setTab} options={[{ v: 'budgets', label: 'Budgets' }, { v: 'expenses', label: 'Expenses' }]} />
        </Pad>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* month summary strip */}
        <Pad style={{ marginTop: 14 }}>
          <Card t={t} pad={15}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <Kicker t={t}>{F17_PERIOD.label} · day {F17_PERIOD.dayOf} of {F17_PERIOD.days}</Kicker>
              <Link t={t} style={{ fontSize: 12.5 }} onClick={() => go('trends')}>Trends</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 9 }}>
              <Money size={26} weight={700} style={{ color: t.ink }}>{eur(F17_MONTH.spent)}</Money>
              <span style={{ fontFamily: OK_FONT, fontSize: 13.5, color: t.muted, fontWeight: 600 }}>of {eur(F17_MONTH.amount)}</span>
              <Grow />
              <span style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 700, color: t.green }}>{eur(F17_MONTH.left)} left</span>
            </div>
            <div style={{ marginTop: 10 }}><SpendBar t={t} b={{ amount: F17_MONTH.amount, spent: F17_MONTH.spent, cat: 'groceries' }} h={8} showProjection={false} /></div>
          </Card>
        </Pad>

        {/* the differentiator, calmly placed */}
        {flag && (
          <Pad style={{ marginTop: 12 }}>
            <button onClick={() => go('flagA')} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 11, border: '1px solid rgba(224,165,60,.5)', background: 'rgba(224,165,60,.12)', borderRadius: 14, padding: '13px 14px', cursor: 'pointer' }}>
              {MI.alert(t.warning, 19)}
              <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.45 }}>{flag.name} is on track to land near <b>{eur(flag.projected)}</b> this month. <span style={{ color: t.warning, fontWeight: 700 }}>See why</span></span>
              {I.chevR(t.warning, 16)}
            </button>
          </Pad>
        )}

        {tab === 'budgets' ? (
          <React.Fragment>
            {CADENCE_ORDER.map((cid) => {
              const rows = budgetsByCadence(cid);
              if (!rows.length) return null;
              return (
                <div key={cid} style={{ marginTop: 16 }}>
                  <Pad><GroupHead t={t} style={{ marginBottom: 8 }} right={<span style={{ fontFamily: OK_MONO, fontSize: 11.5, color: t.muted }}>{rows.length}</span>}>{cadenceBy(cid).label}</GroupHead></Pad>
                  <div style={{ background: t.surface, margin: '0 20px', borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden' }}>
                    {rows.map((b, i) => <BudgetRow key={b.id} t={t} b={b} last={i === rows.length - 1} onClick={() => go(b.flag === 'atRisk' ? 'budgetDetail' : 'budgetDetail')} />)}
                  </div>
                </div>
              );
            })}
            <Pad style={{ marginTop: 16 }}>
              <button onClick={() => go('categories')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, border: `1px solid ${t.hairline}`, background: t.surface, borderRadius: 14, padding: '13px 14px', cursor: 'pointer', textAlign: 'left' }}>
                {MI.coins(t.teal700, 19)}
                <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 600, color: t.ink }}>Category pots</span>
                <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>{F17_CATS.length}</span>
                {I.chevR(t.muted, 16)}
              </button>
            </Pad>
            <Pad style={{ marginTop: 14 }}><PrivacyLine t={t}>Budgets, amounts and receipts stay inside your household. They are never used for ads or profiling.</PrivacyLine></Pad>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {F17_LEDGER.map((g) => (
              <div key={g.day} style={{ marginTop: 16 }}>
                <Pad><GroupHead t={t} style={{ marginBottom: 8 }}>{g.day}</GroupHead></Pad>
                <div style={{ background: t.surface, margin: '0 20px', borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden' }}>
                  {g.ids.map((id, i) => <ExpenseRow key={id} t={t} e={expenseBy(id)} last={i === g.ids.length - 1} onClick={() => go(expenseBy(id).mixed ? 'currencyMix' : 'expenseDetail')} />)}
                </div>
              </div>
            ))}
            <Pad style={{ marginTop: 14 }}><PrivacyLine t={t}>Each expense is dated and visible only to the members its owner allowed.</PrivacyLine></Pad>
          </React.Fragment>
        )}
        <Spacer h={124} />
      </div>

      {/* calm action bar: log an expense is the frequent act, a new budget is the rarer one */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: platform === 'ios' ? 22 : 14, padding: '0 18px', zIndex: 20, display: 'flex', gap: 10 }}>
        <button onClick={() => go('createBudget')} style={{ flex: '0 0 auto', height: 52, borderRadius: 26, border: 'none', background: t.surface, boxShadow: `${t.shadow}, inset 0 0 0 1.5px ${t.hairline}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '0 18px', fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.teal700, whiteSpace: 'nowrap' }}>{I.plus(t.teal700, 18)} Budget</button>
        <button onClick={() => go('logExpense')} style={{ flex: 1, height: 52, borderRadius: 26, border: 'none', background: t.coral, boxShadow: '0 8px 22px rgba(226,104,60,.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{I.plus('#fff', 20)} Log an expense</button>
      </div>
    </Screen>
  );
}

/* ════════════════════════════════════════════════════════════
   VERSION B · BOLD
   ════════════════════════════════════════════════════════════ */

function HomeB({ t, platform, go }) {
  const flagged = F17_FLAGGED[0];
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

        {/* ★ NEW HOME CARD · bold money hero (no footer tab) */}
        <Pad>
          <div onClick={() => go('moneyB')} style={{ cursor: 'pointer', borderRadius: 22, overflow: 'hidden', background: t.teal700, boxShadow: '0 12px 30px rgba(28,110,120,.28)' }}>
            <div style={{ padding: '18px 18px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,.85)', textTransform: 'uppercase', letterSpacing: 1 }}>{MI.wallet('#fff', 15)} Budgets &amp; expenses</div>
                <div style={{ fontFamily: OK_MONO, fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: -0.8, marginTop: 10 }}>{eur(F17_MONTH.left)}</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 13, color: 'rgba(255,255,255,.85)', marginTop: 3 }}>left of {eur(F17_MONTH.amount)} this month</div>
              </div>
              <Ring t={t} value={F17_MONTH.pct} size={92} thickness={11} hole={t.teal700}>
                <span style={{ fontFamily: OK_MONO, fontSize: 17, fontWeight: 700, color: '#fff' }}>{F17_MONTH.pct}%</span>
                <span style={{ fontFamily: OK_FONT, fontSize: 9.5, color: 'rgba(255,255,255,.8)', letterSpacing: .4 }}>SPENT</span>
              </Ring>
            </div>
            <div style={{ background: 'rgba(255,255,255,.13)', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
              {flagged ? MI.alert('#fff', 17) : MI.shieldOk('#fff', 17)}
              <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 12.5, color: '#fff' }}>{flagged ? <React.Fragment>Groceries is pacing about <b>{eur(F17_FLAG.over)}</b> over</React.Fragment> : 'Every pot is on pace'}</span>
              {I.chevR('#fff', 18)}
            </div>
          </div>
        </Pad>

        <Spacer h={14} />
        <Pad>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => go('logExpense')} style={{ flex: 1, border: `1px solid ${t.hairline}`, background: t.surface, borderRadius: 16, padding: '14px 14px', cursor: 'pointer', textAlign: 'left', boxShadow: t.shadowSm }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: t.coral100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{I.plus(t.coral, 18)}</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink, marginTop: 10 }}>Log an expense</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 2 }}>Takes seconds</div>
            </button>
            <button onClick={() => go('trends')} style={{ flex: 1, border: `1px solid ${t.hairline}`, background: t.surface, borderRadius: 16, padding: '14px 14px', cursor: 'pointer', textAlign: 'left', boxShadow: t.shadowSm }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{MI.trend(t.teal700, 18)}</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink, marginTop: 10 }}>Trends</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 2 }}>Plan vs actual</div>
            </button>
          </div>
        </Pad>

        <Spacer h={16} />
        <Pad><GroupHead t={t} style={{ marginBottom: 10 }} right={<Link t={t} style={{ fontSize: 12.5 }} onClick={() => go('moneyB')}>All pots</Link>}>Watching this month</GroupHead></Pad>
        <Pad>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['bg', 'bt'].map((id) => <BudgetCard key={id} t={t} b={budgetBy(id)} onClick={() => go('budgetDetail')} />)}
          </div>
        </Pad>
        <Spacer h={20} />
      </div>
      <TabBar t={t} platform={platform} tabs={TABS('home', go, 'homeB')} go={go} />
    </Screen>
  );
}

/* Budgets & expenses hub — bold header, airy pot cards */
function MoneyB({ t, platform, go, back }) {
  const hero = t.name === 'light' ? t.teal700 : t.teal900;
  const [cadence, setCadence] = React.useState('all');
  const shown = cadence === 'all' ? F17_VISIBLE : F17_VISIBLE.filter((b) => b.cadence === cadence);
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ background: hero, padding: '6px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back('#fff')}</button>
            <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: '#fff' }}>Budgets &amp; expenses</div>
            <button onClick={() => go('permissions')} style={{ border: 'none', background: 'rgba(255,255,255,.16)', borderRadius: 999, padding: 8, cursor: 'pointer', display: 'flex' }}>{I.gear('#fff', 18)}</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 16 }}>
            <Ring t={t} value={F17_MONTH.pct} size={116} thickness={13} hole={hero}>
              <span style={{ fontFamily: OK_MONO, fontSize: 22, fontWeight: 700, color: '#fff' }}>{F17_MONTH.pct}%</span>
              <span style={{ fontFamily: OK_FONT, fontSize: 10, color: 'rgba(255,255,255,.8)', letterSpacing: .5, marginTop: 1 }}>SPENT</span>
            </Ring>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,.8)', textTransform: 'uppercase', letterSpacing: 1 }}>{F17_PERIOD.label}</div>
              <div style={{ fontFamily: OK_MONO, fontSize: 27, fontWeight: 700, color: '#fff', letterSpacing: -0.6, marginTop: 6 }}>{eur(F17_MONTH.left)}</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: 'rgba(255,255,255,.85)', marginTop: 2, lineHeight: 1.4 }}>left of {eur(F17_MONTH.amount)} · day {F17_PERIOD.dayOf} of {F17_PERIOD.days}</div>
            </div>
          </div>

          {/* per-category chips, all inside the header */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16, overflowX: 'auto', paddingBottom: 2 }}>
            {F17_VISIBLE.slice(0, 5).map((b) => (
              <div key={b.id} style={{ flex: '0 0 auto', background: 'rgba(255,255,255,.13)', borderRadius: 13, padding: '9px 12px', minWidth: 104 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 11, color: 'rgba(255,255,255,.82)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.name}</div>
                <div style={{ fontFamily: OK_MONO, fontSize: 14, fontWeight: 700, color: '#fff', marginTop: 4 }}>{eur(remaining(b))}</div>
                <div style={{ marginTop: 7 }}><SpendBar t={t} b={b} h={5} light showProjection={false} /></div>
              </div>
            ))}
          </div>
        </div>

        {/* the differentiator as a full card, first thing under the header */}
        {F17_FLAGGED[0] && (
          <Pad style={{ marginTop: 16 }}>
            <div onClick={() => go('flagB')} style={{ cursor: 'pointer', background: t.surface, border: '1px solid rgba(224,165,60,.55)', borderRadius: 18, padding: 16, boxShadow: t.shadowSm, borderLeft: `4px solid ${t.warning}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                {MI.alert(t.warning, 18)}
                <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>{F17_FLAG.headline}</span>
                {I.chevR(t.muted, 17)}
              </div>
              <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.5, marginTop: 8 }}>{F17_FLAG.body}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
                <span style={{ fontFamily: OK_FONT, fontSize: 12, fontWeight: 700, color: t.warning }}>Nothing has changed</span>
                <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>· From your own last three months</span>
              </div>
            </div>
          </Pad>
        )}

        <Pad style={{ marginTop: 16 }}>
          <Seg t={t} value={cadence} onChange={setCadence} options={[{ v: 'all', label: 'All' }, { v: 'daily', label: 'Daily' }, { v: 'weekly', label: 'Weekly' }, { v: 'monthly', label: 'Monthly' }, { v: 'yearly', label: 'Yearly' }]} />
        </Pad>

        <Pad style={{ paddingTop: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {shown.map((b) => <BudgetCard key={b.id} t={t} b={b} onClick={() => go('budgetDetail')} />)}
          </div>
        </Pad>

        <Pad style={{ marginTop: 18 }}>
          <GroupHead t={t} style={{ marginBottom: 10 }} right={<Link t={t} style={{ fontSize: 12.5 }} onClick={() => go('ledger')}>All expenses</Link>}>Logged today</GroupHead>
          <div>{F17_TODAY_EXPENSES.map((e) => <ExpenseRow key={e.id} t={t} e={e} airy onClick={() => go('expenseDetail')} />)}</div>
        </Pad>
        <Pad style={{ marginTop: 4 }}><PrivacyLine t={t}>Money data stays inside your household. It never feeds advertising or profiling.</PrivacyLine></Pad>
        <Spacer h={120} />
      </div>
      <FAB t={t} onClick={() => go('logExpense')} label="Log expense" />
      <TabBar t={t} platform={platform} tabs={TABS('home', go, 'homeB')} go={go} />
    </Screen>
  );
}

/* ════════════════════════════════════════════════════════════
   CLEAR STATES · first arrival, before anything exists
   ════════════════════════════════════════════════════════════ */

function MoneyEmptyA({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}`, paddingBottom: 12 }}>
        <Pad style={{ paddingTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', minHeight: 36 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex', alignItems: 'center', gap: 3, fontFamily: OK_FONT, fontSize: 14, color: t.slate }}>{I.back(t.slate)} Home</button>
          </div>
          <div style={{ marginTop: 2 }}>
            <H1 t={t} style={{ fontSize: 26 }}>Budgets &amp; expenses</H1>
            <Lead t={t} style={{ marginTop: 5, fontSize: 13.5 }}>Plan what the household intends to spend, then log what it actually spends.</Lead>
          </div>
        </Pad>
      </div>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
        <div style={{ width: 88, height: 88, borderRadius: 26, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{MI.wallet(t.teal700, 40)}</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 21, fontWeight: 800, color: t.title, marginTop: 22, letterSpacing: -0.3 }}>No budgets yet</div>
        <Lead t={t} style={{ marginTop: 10, maxWidth: 292 }}>Nothing has been created here. Start with one pot, for a day, a week, a month or a year, and choose who can see it.</Lead>
        <div style={{ marginTop: 18 }}><PrivacyLine t={t} center>Only the people you choose will see a pot you create.</PrivacyLine></div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: platform === 'ios' ? 22 : 14, padding: '0 18px', zIndex: 20 }}>
        <button onClick={() => go('createBudget')} style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: t.coral, boxShadow: '0 8px 22px rgba(226,104,60,.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{I.plus('#fff', 20)} Create the first budget</button>
      </div>
    </Screen>
  );
}

function MoneyEmptyB({ t, platform, go, back }) {
  const hero = t.name === 'light' ? t.teal700 : t.teal900;
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: hero, padding: '6px 20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back('#fff')}</button>
            <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: '#fff' }}>Budgets &amp; expenses</div>
            <span style={{ width: 34 }} />
          </div>
          <div style={{ marginTop: 14, background: 'rgba(255,255,255,.13)', borderRadius: 16, padding: '14px 15px', display: 'flex', alignItems: 'center', gap: 10 }}>
            {MI.wallet('#fff', 20)}
            <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: 'rgba(255,255,255,.92)', lineHeight: 1.45 }}>Your month appears here once a budget exists</span>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '44px 32px 0', textAlign: 'center' }}>
          <div style={{ width: 88, height: 88, borderRadius: 26, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{MI.coins(t.teal700, 40)}</div>
          <div style={{ fontFamily: OK_FONT, fontSize: 21, fontWeight: 800, color: t.title, marginTop: 22, letterSpacing: -0.3 }}>No pots yet</div>
          <Lead t={t} style={{ marginTop: 10, maxWidth: 292 }}>Create a pot for groceries, transport, a renovation or a holiday. Each one can run on its own rhythm and be seen by its own people.</Lead>
          <button onClick={() => go('createBudget')} style={{ marginTop: 22, height: 52, borderRadius: 26, border: 'none', background: t.coral, boxShadow: '0 8px 22px rgba(226,104,60,.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '0 26px', fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{I.plus('#fff', 20)} Create the first budget</button>
          <div style={{ marginTop: 18 }}><PrivacyLine t={t} center>Only the people you choose will see a pot you create.</PrivacyLine></div>
        </div>
        <Spacer h={28} />
      </div>
      <TabBar t={t} platform={platform} tabs={TABS('home', go, 'homeB')} go={go} />
    </Screen>
  );
}

/* full ledger, reached from the bold hub */
function Ledger({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}`, paddingBottom: 12 }}>
        <Pad style={{ paddingTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', minHeight: 36 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex', alignItems: 'center', gap: 3, fontFamily: OK_FONT, fontSize: 14, color: t.slate }}>{I.back(t.slate)} Back</button>
          </div>
          <H1 t={t} style={{ fontSize: 24, marginTop: 2 }}>Expenses</H1>
          <Lead t={t} style={{ marginTop: 4, fontSize: 13.5 }}>Every expense you are permitted to see, newest first, each one dated.</Lead>
        </Pad>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {F17_LEDGER.map((g) => (
          <div key={g.day} style={{ marginTop: 16 }}>
            <Pad><GroupHead t={t} style={{ marginBottom: 8 }}>{g.day}</GroupHead></Pad>
            <div style={{ background: t.surface, margin: '0 20px', borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden' }}>
              {g.ids.map((id, i) => <ExpenseRow key={id} t={t} e={expenseBy(id)} last={i === g.ids.length - 1} onClick={() => go(expenseBy(id).mixed ? 'currencyMix' : 'expenseDetail')} />)}
            </div>
          </div>
        ))}
        <Spacer h={28} />
      </div>
    </Screen>
  );
}

Object.assign(window, { Tile, Landing, LandingA, LandingB, HomeA, MoneyA, HomeB, MoneyB, MoneyEmptyA, MoneyEmptyB, Ledger, TABS, CADENCE_ORDER });

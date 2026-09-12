/* OmniKin · Feature 17 — Epic 17.1 core screens: create budgets by cadence, log dated
   expenses, category pots, recurrence, edit / close, offline capture, currency integrity. */
const {
  OK_FONT, OK_MONO, I, Screen, Btn, Field,
  MI, CAT_ICON, Pad, H1, Lead, Spacer, Grow, Link, Kicker, Money,
  Avatar, AvatarStack, Card, GroupHead, CatChip, CadenceChip, ScopeChip, FlagChip,
  SpendBar, BudgetRow, ExpenseRow, Seg, Sheet, ChoiceRow, ToggleRow, PrivacyLine, Keypad,
  F17_MEMBERS, memberBy, catBy, cadenceBy, eur, remaining, pct,
  F17_CADENCES, F17_CATS, F17_CURRENCIES, F17_SCOPES, F17_ADULTS,
  F17_BUDGETS, budgetBy, expensesFor, expenseBy, F17_PERIOD, F17_AUDIT,
} = window;

/* shared top bar for form screens */
function FormBar({ t, onBack, title, right, step }) {
  return (
    <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}`, padding: '4px 20px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
        <button onClick={onBack} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back(t.slate)}</button>
        <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.title }}>{title}</div>
        <div style={{ minWidth: 34, display: 'flex', justifyContent: 'flex-end' }}>{right || <span />}</div>
      </div>
      {step && <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, textAlign: 'center', marginTop: 2 }}>{step}</div>}
    </div>
  );
}
function RowLink({ t, label, value, icon, onClick, sub }) {
  return (
    <button onClick={onClick} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, border: 'none', background: 'transparent', padding: '14px 0', borderBottom: `1px solid ${t.hairline}`, cursor: onClick ? 'pointer' : 'default' }}>
      {icon && <span style={{ flex: '0 0 auto', display: 'flex' }}>{icon}</span>}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{label}</span>
        {sub && <span style={{ display: 'block', fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 2 }}>{sub}</span>}
      </span>
      <span style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 600, color: t.teal700, whiteSpace: 'nowrap' }}>{value}</span>
      {onClick && I.chevR(t.muted, 16)}
    </button>
  );
}
const FieldLabel = ({ t, children, style }) => <div style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 700, letterSpacing: .4, textTransform: 'uppercase', color: t.muted, marginBottom: 9, ...style }}>{children}</div>;

/* ═══════════ US-17.1.1 · create a budget at a chosen cadence ═══════════ */
function CreateBudget({ t, platform, go, back }) {
  const [name, setName] = React.useState('Groceries');
  const [cadence, setCadence] = React.useState('monthly');
  const [amount, setAmount] = React.useState('650');
  const [cur, setCur] = React.useState('EUR');
  const [cat, setCat] = React.useState('groceries');
  const [repeat, setRepeat] = React.useState(true);
  const [scope, setScope] = React.useState('household');
  const [picked, setPicked] = React.useState(['jeni', 'fabian']);
  const [sheet, setSheet] = React.useState(null);
  const valid = name.trim().length > 0 && Number(amount) > 0;
  const scopeValue = scope === 'chosen' ? `${picked.length} members` : F17_SCOPES[scope].short;

  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="New budget" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 16 }}>
          <FieldLabel t={t}>Amount</FieldLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.surface, border: `1px solid ${t.hairline}`, borderRadius: 16, padding: '14px 16px', boxShadow: t.shadowSm }}>
            <button onClick={() => setSheet('cur')} style={{ border: 'none', background: t.surfaceAlt, borderRadius: 10, padding: '8px 11px', cursor: 'pointer', fontFamily: OK_MONO, fontSize: 14, fontWeight: 700, color: t.teal700, flex: '0 0 auto' }}>{cur}</button>
            <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.,]/g, ''))} inputMode="decimal"
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: OK_MONO, fontSize: 30, fontWeight: 700, color: t.ink, minWidth: 0, letterSpacing: -0.5 }} />
            <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, whiteSpace: 'nowrap' }}>per {cadenceBy(cadence).short}</span>
          </div>
          {!(Number(amount) > 0) && <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.error, marginTop: 7 }}>Enter an amount above zero.</div>}

          <Spacer h={20} />
          <FieldLabel t={t}>How often does it run</FieldLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            {F17_CADENCES.map((c) => {
              const on = c.id === cadence;
              return (
                <button key={c.id} onClick={() => setCadence(c.id)} style={{ textAlign: 'left', border: 'none', borderRadius: 14, padding: '12px 13px', cursor: 'pointer', background: on ? t.panelTeal : t.surfaceAlt, boxShadow: on ? `inset 0 0 0 1.5px ${t.teal300}` : 'none', transition: 'all .15s' }}>
                  <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: on ? t.teal800 : t.ink }}>{c.label}</div>
                  <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.slate, marginTop: 3, lineHeight: 1.35 }}>{c.blurb}</div>
                </button>
              );
            })}
          </div>

          <Spacer h={20} />
          <FieldLabel t={t}>Name</FieldLabel>
          <Field t={t} value={name} onChange={setName} placeholder="What is this pot for" helper="1 to 80 characters" />

          <Spacer h={18} />
          <FieldLabel t={t}>Category pot</FieldLabel>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {F17_CATS.map((c) => {
              const on = c.id === cat;
              return (
                <button key={c.id} onClick={() => setCat(c.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', borderRadius: 999, padding: '9px 13px', cursor: 'pointer', background: on ? t.panelTeal : t.surfaceAlt, boxShadow: on ? `inset 0 0 0 1.5px ${t.teal300}` : 'none', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: on ? t.teal800 : t.slate }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: c.c }} />{c.label}
                </button>
              );
            })}
            <button onClick={() => go('categories')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: `1.5px dashed ${t.hairline}`, borderRadius: 999, padding: '8px 13px', cursor: 'pointer', background: 'transparent', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.teal700 }}>{I.plus(t.teal700, 14)} New pot</button>
          </div>

          <Spacer h={10} />
          <RowLink t={t} icon={MI.cal(t.slate, 18)} label="Starts" value="1 Sep 2026" sub="Every budget carries a date, so trends and pace work" onClick={() => setSheet('date')} />
          <div style={{ borderBottom: `1px solid ${t.hairline}` }}>
            <ToggleRow t={t} icon={MI.repeat(t.slate, 18)} label="Repeat every month" sub="Rolls into the next period with a fresh spend total" value={repeat} onChange={setRepeat} />
          </div>
          <RowLink t={t} icon={MI.eyeScope(t.slate, 18)} label="Who can see it" value={scopeValue} sub="Starts at only you until you widen it" onClick={() => setSheet('scope')} />

          <Spacer h={18} />
          <PrivacyLine t={t}>A pot is never shared more widely than you choose here. Child and Teen roles see no money by default.</PrivacyLine>
          <Spacer h={24} />
        </Pad>
      </div>

      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" disabled={!valid} onClick={() => go('budgetCreated')}>Create budget</Btn>
      </div>

      {sheet === 'cur' && (
        <Sheet t={t} platform={platform} title="Currency" sub="Amounts in different currencies are never silently added together." onClose={() => setSheet(null)}>
          {F17_CURRENCIES.map((c) => <ChoiceRow key={c.code} t={t} radio on={c.code === cur} label={`${c.code} · ${c.label}`} sub={c.dflt ? 'Household default, set in Settings' : undefined} onClick={() => { setCur(c.code); setSheet(null); }} />)}
        </Sheet>
      )}
      {sheet === 'date' && (
        <Sheet t={t} platform={platform} title="Start date" sub="The period this pot covers is worked out from the cadence and this date." onClose={() => setSheet(null)}>
          {['1 Sep 2026 · start of this month', 'Today · 19 Sep 2026', '1 Oct 2026 · next month'].map((d, i) => <ChoiceRow key={d} t={t} radio on={i === 0} label={d} onClick={() => setSheet(null)} />)}
        </Sheet>
      )}
      {sheet === 'scope' && (
        <Sheet t={t} platform={platform} title="Who can see this budget" sub="A member outside the scope cannot see that it exists." onClose={() => setSheet(null)}>
          {Object.values(F17_SCOPES).map((s) => <ChoiceRow key={s.id} t={t} radio on={s.id === scope} label={s.label} sub={s.blurb} onClick={() => setScope(s.id)} />)}
          {scope === 'chosen' && (
            <div style={{ marginTop: 6, marginBottom: 4 }}>
              <FieldLabel t={t}>Pick the members</FieldLabel>
              {F17_MEMBERS.map((m) => {
                const on = picked.includes(m.id);
                const blocked = m.money === 'none';
                return (
                  <button key={m.id} disabled={blocked} onClick={() => setPicked(on ? picked.filter((x) => x !== m.id) : [...picked, m.id])}
                    style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 11, border: 'none', background: 'transparent', padding: '10px 0', cursor: blocked ? 'default' : 'pointer', opacity: blocked ? 0.45 : 1 }}>
                    <Avatar color={m.c} name={m.n} size={32} ring={t.surface} />
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'block', fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.ink }}>{m.full}{m.you ? ' (you)' : ''}</span>
                      <span style={{ display: 'block', fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 1 }}>{m.role}{blocked ? ' · no money access' : ''}</span>
                    </span>
                    <span style={{ width: 22, height: 22, borderRadius: 7, flex: '0 0 auto', background: on ? t.teal700 : 'transparent', boxShadow: on ? 'none' : `inset 0 0 0 2px ${t.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && I.check('#fff', 13)}</span>
                  </button>
                );
              })}
            </div>
          )}
          <Spacer h={8} />
          <Btn t={t} kind="teal" onClick={() => setSheet(null)}>Done</Btn>
          <Spacer h={6} />
        </Sheet>
      )}
    </Screen>
  );
}

/* created confirmation */
function BudgetCreated({ t, platform, go, reset }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center' }}>
        <div style={{ width: 82, height: 82, borderRadius: '50%', background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'okpop .4s cubic-bezier(.2,.8,.25,1)' }}>{I.check(t.green, 38)}</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 22, fontWeight: 800, color: t.title, marginTop: 22, letterSpacing: -0.3 }}>Groceries is set up</div>
        <Lead t={t} style={{ marginTop: 10, maxWidth: 296 }}>€650 a month, starting 1 September, repeating. Everyone with money access can see it and log against it right away.</Lead>
        <div style={{ width: '100%', maxWidth: 320, marginTop: 22 }}>
          <Card t={t} pad={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
              <CadenceChip t={t} cadence="monthly" />
              <ScopeChip t={t} scope="household" />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 600, color: t.slate }}>{MI.repeat(t.teal500, 13)}Repeats</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 12 }}>
              <AvatarStack t={t} ids={['jeni', 'fabian', 'renate']} size={26} />
              <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted }}>3 members can see it</span>
            </div>
          </Card>
        </div>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, display: 'flex', flexDirection: 'column', gap: 9 }}>
        <Btn t={t} kind="primary" onClick={() => go('logExpense')}>Log the first expense</Btn>
        <Btn t={t} kind="outline" onClick={() => reset && reset('money')}>Back to budgets</Btn>
      </div>
    </Screen>
  );
}

/* ═══════════ US-17.1.2 · log an expense (seconds-fast, offline-tolerant) ═══════════ */
function LogExpense({ t, platform, go, back }) {
  const [amount, setAmount] = React.useState('84,20');
  const [bid, setBid] = React.useState('bg');
  const [note, setNote] = React.useState('Bulk shop for the week');
  const [sheet, setSheet] = React.useState(null);
  const b = budgetBy(bid);
  const onKey = (k) => {
    if (k === 'del') setAmount((a) => a.slice(0, -1));
    else setAmount((a) => (a === '0' ? k : a + k));
  };
  const num = Number(amount.replace(',', '.')) || 0;
  const after = b.spent + num;

  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Log an expense" right={<button onClick={() => go('offline')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, display: 'flex' }}>{MI.wifiOff(t.muted, 18)}</button>} />
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* amount first: the fastest possible capture */}
        <div style={{ padding: '22px 20px 16px', textAlign: 'center' }}>
          <Kicker t={t}>Amount</Kicker>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6, marginTop: 10 }}>
            <span style={{ fontFamily: OK_MONO, fontSize: 22, fontWeight: 600, color: t.muted }}>€</span>
            <span style={{ fontFamily: OK_MONO, fontSize: 44, fontWeight: 700, color: t.ink, letterSpacing: -1 }}>{amount || '0'}</span>
            <span style={{ width: 2, height: 34, background: t.teal500, borderRadius: 2, animation: 'okblink 1s steps(2) infinite' }} />
          </div>
          <button onClick={() => setSheet('cur')} style={{ marginTop: 10, border: 'none', background: t.surfaceAlt, borderRadius: 999, padding: '6px 13px', cursor: 'pointer', fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: t.slate }}>EUR · change currency</button>
        </div>

        <Keypad t={t} onKey={onKey} platform={platform} />

        <Pad style={{ paddingTop: 18 }}>
          <FieldLabel t={t}>Against which pot</FieldLabel>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {F17_BUDGETS.filter((x) => x.seen.includes('jeni')).map((x) => {
              const on = x.id === bid;
              const c = catBy(x.cat);
              return (
                <button key={x.id} onClick={() => setBid(x.id)} style={{ flex: '0 0 auto', display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', borderRadius: 999, padding: '9px 13px', cursor: 'pointer', background: on ? t.panelTeal : t.surfaceAlt, boxShadow: on ? `inset 0 0 0 1.5px ${t.teal300}` : 'none', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: on ? t.teal800 : t.slate, whiteSpace: 'nowrap' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: c.c }} />{x.name}
                </button>
              );
            })}
            <button style={{ flex: '0 0 auto', border: `1.5px dashed ${t.hairline}`, borderRadius: 999, padding: '8px 13px', cursor: 'pointer', background: 'transparent', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, whiteSpace: 'nowrap' }}>Uncategorised</button>
          </div>

          <Spacer h={14} />
          {/* live effect on the pot: monitoring is never a surprise */}
          <Card t={t} pad={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 700, color: t.ink }}>{b.name}</span>
              <CadenceChip t={t} cadence={b.cadence} sm />
              <Grow />
              <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>after this</span>
              <Money size={13.5} style={{ color: after > b.amount ? t.warning : t.ink }}>{eur(Math.max(0, b.amount - after))} left</Money>
            </div>
            <div style={{ marginTop: 10 }}><SpendBar t={t} b={{ ...b, spent: Math.min(after, b.amount) }} h={7} /></div>
          </Card>

          <Spacer h={10} />
          <RowLink t={t} icon={MI.cal(t.slate, 18)} label="Date" value="Today · 19 Sep" sub="Defaults to today, can be back-dated" onClick={() => setSheet('date')} />
          <RowLink t={t} icon={MI.eyeScope(t.slate, 18)} label="Who can see it" value="Household" sub="Inherited from the Groceries pot" onClick={() => setSheet('scope')} />

          <Spacer h={16} />
          <FieldLabel t={t}>Note</FieldLabel>
          <Field t={t} value={note} onChange={setNote} placeholder="Optional" />

          <Spacer h={12} />
          <button onClick={() => setSheet('receipt')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, border: `1.5px dashed ${t.hairline}`, background: 'transparent', borderRadius: 14, padding: '14px 15px', cursor: 'pointer', textAlign: 'left' }}>
            {MI.camera(t.teal700, 20)}
            <span style={{ flex: 1 }}>
              <span style={{ display: 'block', fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 700, color: t.ink }}>Attach a receipt</span>
              <span style={{ display: 'block', fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 2 }}>Optional. It inherits this expense's visibility.</span>
            </span>
          </button>
          <Spacer h={22} />
        </Pad>
      </div>

      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" disabled={num <= 0} onClick={() => go('expenseSaved')}>Save expense</Btn>
      </div>

      {sheet === 'cur' && (
        <Sheet t={t} platform={platform} title="Currency" sub="A different currency is converted with a recorded rate or kept separate, never silently mixed." onClose={() => setSheet(null)}>
          {F17_CURRENCIES.map((c, i) => <ChoiceRow key={c.code} t={t} radio on={i === 0} label={`${c.code} · ${c.label}`} onClick={() => setSheet(null)} />)}
        </Sheet>
      )}
      {sheet === 'date' && (
        <Sheet t={t} platform={platform} title="Date of the expense" sub="Every expense carries a date. That is what makes pace and trends possible." onClose={() => setSheet(null)}>
          {['Today · 19 Sep', 'Yesterday · 18 Sep', 'Thu 17 Sep', 'Pick another date'].map((d, i) => <ChoiceRow key={d} t={t} radio on={i === 0} label={d} onClick={() => setSheet(null)} />)}
        </Sheet>
      )}
      {sheet === 'scope' && (
        <Sheet t={t} platform={platform} title="Who can see this expense" sub="It starts as the pot's scope. You can narrow it, never widen it past your own access." onClose={() => setSheet(null)}>
          <ChoiceRow t={t} radio on label="Same as the Groceries pot" sub="Household · 3 members" onClick={() => setSheet(null)} />
          <ChoiceRow t={t} radio label="Chosen members" sub="Pick who sees this one expense" onClick={() => setSheet(null)} />
          <ChoiceRow t={t} radio label="Only me" sub="Nobody else sees that it exists" onClick={() => setSheet(null)} />
        </Sheet>
      )}
      {sheet === 'receipt' && (
        <Sheet t={t} platform={platform} title="Attach a receipt" onClose={() => setSheet(null)}>
          <ChoiceRow t={t} icon={MI.camera(t.teal700, 19)} label="Take a photo" onClick={() => setSheet(null)} />
          <ChoiceRow t={t} icon={MI.receipt(t.teal700, 19)} label="Choose from files" onClick={() => setSheet(null)} />
          <div style={{ padding: '4px 2px 10px' }}><PrivacyLine t={t}>Receipts stay inside the household and inherit this expense's visibility.</PrivacyLine></div>
        </Sheet>
      )}
    </Screen>
  );
}

function ExpenseSaved({ t, platform, go, reset }) {
  const b = budgetBy('bg');
  const after = { ...b, spent: b.spent };
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ width: 78, height: 78, borderRadius: '50%', background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'okpop .4s cubic-bezier(.2,.8,.25,1)' }}>{I.check(t.green, 36)}</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 22, fontWeight: 800, color: t.title, marginTop: 20, letterSpacing: -0.3 }}>€84.20 logged</div>
        <Lead t={t} style={{ marginTop: 9, maxWidth: 300 }}>Dated today and added to Groceries. Everyone permitted to see the pot has the same figures already.</Lead>
        <div style={{ width: '100%', maxWidth: 330, marginTop: 20 }}>
          <Card t={t} pad={15}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink }}>Groceries</span>
              <Grow />
              <Money size={15} style={{ color: t.warning }}>{eur(b.spent)}</Money>
              <span style={{ fontFamily: OK_MONO, fontSize: 12, color: t.muted }}>/ {eur(b.amount)}</span>
            </div>
            <div style={{ marginTop: 10 }}><SpendBar t={t} b={after} h={8} /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 11 }}>
              {MI.alert(t.warning, 15)}
              <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, textAlign: 'left', lineHeight: 1.45 }}>This pot is now pacing over for September. Nothing is blocked.</span>
            </div>
          </Card>
        </div>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, display: 'flex', flexDirection: 'column', gap: 9 }}>
        <Btn t={t} kind="primary" onClick={() => go('flagA')}>See the heads-up</Btn>
        <Btn t={t} kind="outline" onClick={() => reset && reset('money')}>Done</Btn>
      </div>
    </Screen>
  );
}

/* offline capture (guardrail: low connectivity) */
function Offline({ t, platform, go, back }) {
  const [synced, setSynced] = React.useState(false);
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Offline" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 18 }}>
          <div style={{ display: 'flex', gap: 11, alignItems: 'center', background: synced ? t.panelGreen : t.panelTeal, borderRadius: 14, padding: '13px 14px', borderLeft: `3px solid ${synced ? t.green : t.info}` }}>
            {synced ? I.checkCircle(t.green, 19) : MI.wifiOff(t.info, 19)}
            <span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.45 }}>{synced ? 'Back online. Both expenses are reconciled against their pots.' : 'No connection. Expenses are saved on this phone and will sync when you are back.'}</span>
          </div>
          <Spacer h={18} />
          <GroupHead t={t} style={{ marginBottom: 9 }}>{synced ? 'Synced' : 'Waiting to sync'}</GroupHead>
          <Card t={t} pad={0} style={{ overflow: 'hidden' }}>
            {[['Weekly shop · Rewe', '€84.20', 'Groceries'], ['Bus tickets', '€6.40', 'Transport']].map(([title, amt, cat], i) => (
              <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderBottom: i === 0 ? `1px solid ${t.hairline}` : 'none' }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: synced ? t.panelGreen : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{synced ? I.check(t.green, 16) : MI.clock(t.muted, 16)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.ink }}>{title}</div>
                  <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 2 }}>{cat} · dated today {synced ? '· counted' : '· queued'}</div>
                </div>
                <Money size={14}>{amt}</Money>
              </div>
            ))}
          </Card>
          <Spacer h={16} />
          <PrivacyLine t={t}>Logging works without a connection. Figures converge for every permitted member once you are back online.</PrivacyLine>
          <Spacer h={22} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16 }}>
        {synced ? <Btn t={t} kind="outline" onClick={back}>Back to budgets</Btn>
                : <Btn t={t} kind="teal" icon={MI.sync('#fff', 18)} onClick={() => setSynced(true)}>Simulate coming back online</Btn>}
      </div>
    </Screen>
  );
}

/* ═══════════ budget detail · live spend vs budget (US-17.3.1) ═══════════ */
function BudgetDetail({ t, platform, go, back }) {
  const b = budgetBy('bg');
  const [sheet, setSheet] = React.useState(null);
  const rows = expensesFor('bg');
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title={b.name} right={<button onClick={() => setSheet('more')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, display: 'flex' }}>{MI.dots(t.slate, 20)}</button>} />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 16 }}>
          <Card t={t} pad={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
              <CadenceChip t={t} cadence={b.cadence} />
              <ScopeChip t={t} scope={b.scope} seen={b.seen} />
              <FlagChip t={t} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14 }}>
              <Money size={30} weight={700} style={{ color: t.warning }}>{eur(b.spent)}</Money>
              <span style={{ fontFamily: OK_FONT, fontSize: 14, color: t.muted, fontWeight: 600 }}>of {eur(b.amount)}</span>
            </div>
            <div style={{ marginTop: 11 }}><SpendBar t={t} b={b} h={10} /></div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              {[['Remaining', eur(remaining(b))], ['At this pace', eur(b.projected)], ['Usual month', eur(b.priorAvg)]].map(([k, v]) => (
                <div key={k} style={{ flex: 1, background: t.surfaceAlt, borderRadius: 12, padding: '10px 11px' }}>
                  <div style={{ fontFamily: OK_FONT, fontSize: 10.5, fontWeight: 700, letterSpacing: .4, textTransform: 'uppercase', color: t.muted }}>{k}</div>
                  <div style={{ fontFamily: OK_MONO, fontSize: 14, fontWeight: 700, color: t.ink, marginTop: 5 }}>{v}</div>
                </div>
              ))}
            </div>
          </Card>

          <Spacer h={12} />
          <button onClick={() => go('flagA')} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 11, border: '1px solid rgba(224,165,60,.5)', background: 'rgba(224,165,60,.12)', borderRadius: 14, padding: '13px 14px', cursor: 'pointer' }}>
            {MI.alert(t.warning, 18)}
            <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.45 }}>Heading for about <b>{eur(b.projected)}</b> at this pace. <span style={{ color: t.warning, fontWeight: 700 }}>See the heads-up</span></span>
            {I.chevR(t.warning, 16)}
          </button>

          <Spacer h={18} />
          <GroupHead t={t} style={{ marginBottom: 9 }} right={<span style={{ fontFamily: OK_MONO, fontSize: 11.5, color: t.muted }}>{b.entries} this period</span>}>Expenses</GroupHead>
          <Card t={t} pad={0} style={{ overflow: 'hidden' }}>
            {rows.map((e, i) => <ExpenseRow key={e.id} t={t} e={e} last={i === rows.length - 1} onClick={() => go('expenseDetail')} />)}
          </Card>

          <Spacer h={16} />
          <GroupHead t={t} style={{ marginBottom: 9 }}>Who can see this pot</GroupHead>
          <Card t={t} pad={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <AvatarStack t={t} ids={b.seen} size={28} />
              <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.45 }}>Jeni, Fabian and Oma Renate. Lena and Noah cannot see it.</span>
              <Link t={t} style={{ fontSize: 12.5 }} onClick={() => go('visibility')}>Change</Link>
            </div>
          </Card>
          <Spacer h={24} />
        </Pad>
      </div>

      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" onClick={() => go('logExpense')} icon={I.plus('#fff', 19)}>Log an expense</Btn>
      </div>

      {sheet === 'more' && (
        <Sheet t={t} platform={platform} title="Groceries" onClose={() => setSheet(null)}>
          <ChoiceRow t={t} icon={MI.pencil(t.teal700, 18)} label="Edit this budget" sub="Amount, category, cadence or dates" onClick={() => { setSheet(null); go('editBudget'); }} />
          <ChoiceRow t={t} icon={MI.eyeScope(t.teal700, 18)} label="Change who can see it" onClick={() => { setSheet(null); go('visibility'); }} />
          <ChoiceRow t={t} icon={MI.archive(t.teal700, 18)} label="Close this period" sub="Keeps the history and rolls into October" onClick={() => { setSheet(null); go('closePeriod'); }} />
          <ChoiceRow t={t} icon={MI.trend(t.teal700, 18)} label="See trends" onClick={() => { setSheet(null); go('trends'); }} />
          <ChoiceRow t={t} icon={MI.trash(t.error, 18)} label="Delete the budget" sub="Shared history cannot be removed by one adult alone" onClick={() => setSheet('delete')} />
        </Sheet>
      )}
      {sheet === 'delete' && (
        <Sheet t={t} platform={platform} title="This needs both adults" sub="Groceries is a shared pot with 14 logged expenses this period." onClose={() => setSheet(null)}>
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', background: t.coral100, borderRadius: 14, padding: '13px 14px', borderLeft: `3px solid ${t.coral}` }}>
            {I.shield(t.coral, 19)}
            <span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.5 }}>Shared budgets and their expense history are not removed by one adult on their own. Fabian will be asked to agree, following the shared-record rules in Household Access.</span>
          </div>
          <Spacer h={14} />
          <Btn t={t} kind="teal" onClick={() => setSheet(null)}>Ask Fabian to agree</Btn>
          <Spacer h={9} />
          <Btn t={t} kind="outline" onClick={() => setSheet(null)}>Keep the budget</Btn>
          <Spacer h={6} />
        </Sheet>
      )}
    </Screen>
  );
}

/* expense detail + audit line */
function ExpenseDetail({ t, platform, go, back }) {
  const e = expenseBy('e1');
  const m = memberBy(e.by);
  const [sheet, setSheet] = React.useState(null);
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Expense" right={<button onClick={() => setSheet('more')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, display: 'flex' }}>{MI.dots(t.slate, 20)}</button>} />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 18 }}>
          <div style={{ textAlign: 'center' }}>
            <Money size={38} weight={700} style={{ color: t.ink }}>€84.20</Money>
            <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.ink, marginTop: 8 }}>{e.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginTop: 10, flexWrap: 'wrap' }}>
              <CatChip t={t} cat={e.cat} />
              <ScopeChip t={t} scope={e.scope} />
            </div>
          </div>
          <Spacer h={20} />
          <Card t={t} pad={0}>
            <div style={{ padding: '0 15px' }}>
              <RowLink t={t} label="Logged by" value={`${m.n} · ${e.time}`} icon={<Avatar color={m.c} name={m.n} size={26} ring={t.surface} />} />
              <RowLink t={t} label="Date" value="Today · 19 Sep" icon={MI.cal(t.slate, 18)} />
              <RowLink t={t} label="Against" value="Groceries" icon={MI.cart(t.slate, 18)} onClick={() => go('budgetDetail')} />
              <div style={{ padding: '14px 0' }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 700, letterSpacing: .4, textTransform: 'uppercase', color: t.muted }}>Note</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 14, color: t.ink, marginTop: 6, lineHeight: 1.5 }}>{e.note}</div>
              </div>
            </div>
          </Card>
          <Spacer h={16} />
          <GroupHead t={t} style={{ marginBottom: 9 }}>Receipt</GroupHead>
          <Card t={t} pad={14} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 54, height: 54, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', backgroundImage: `repeating-linear-gradient(135deg, ${t.hairline} 0 6px, transparent 6px 12px)` }}>{MI.receipt(t.slate, 22)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 600, color: t.ink }}>rewe-19-09.jpg</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 2 }}>Visible to the same 3 members</div>
            </div>
            {I.chevR(t.muted, 16)}
          </Card>
          <Spacer h={16} />
          <GroupHead t={t} style={{ marginBottom: 9 }}>Audit trail</GroupHead>
          <Card t={t} pad={4}>
            {[['Created by Jeni', 'Today 11:20'], ['Receipt attached by Jeni', 'Today 11:21']].map(([txt, when], i) => (
              <div key={txt} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', borderBottom: i === 0 ? `1px solid ${t.hairline}` : 'none' }}>
                {MI.clock(t.muted, 15)}
                <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13, color: t.ink }}>{txt}</span>
                <span style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted }}>{when}</span>
              </div>
            ))}
          </Card>
          <Spacer h={14} />
          <PrivacyLine t={t}>Deleting an expense is recorded with who and when, and never quietly changes another member's figures.</PrivacyLine>
          <Spacer h={24} />
        </Pad>
      </div>
      {sheet === 'more' && (
        <Sheet t={t} platform={platform} title="This expense" onClose={() => setSheet(null)}>
          <ChoiceRow t={t} icon={MI.pencil(t.teal700, 18)} label="Edit the amount or note" onClick={() => setSheet(null)} />
          <ChoiceRow t={t} icon={MI.swap(t.teal700, 18)} label="Move to another pot" onClick={() => setSheet(null)} />
          <ChoiceRow t={t} icon={MI.eyeScope(t.teal700, 18)} label="Change who can see it" onClick={() => { setSheet(null); go('visibility'); }} />
          <ChoiceRow t={t} icon={MI.trash(t.error, 18)} label="Delete" sub="Recorded in the audit trail with your name and the time" onClick={() => setSheet(null)} />
        </Sheet>
      )}
    </Screen>
  );
}

/* ═══════════ US-17.1.4 / 17.1.5 · edit, scope of a recurring change, close a period ═══════════ */
function EditBudget({ t, platform, go, back }) {
  const [amount, setAmount] = React.useState('720');
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Edit Groceries" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 16 }}>
          <FieldLabel t={t}>Amount</FieldLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.surface, border: `1px solid ${t.hairline}`, borderRadius: 16, padding: '14px 16px', boxShadow: t.shadowSm }}>
            <span style={{ fontFamily: OK_MONO, fontSize: 15, fontWeight: 700, color: t.teal700 }}>EUR</span>
            <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.,]/g, ''))} inputMode="decimal"
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: OK_MONO, fontSize: 30, fontWeight: 700, color: t.ink, minWidth: 0 }} />
            <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted }}>per month</span>
          </div>
          <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 8, lineHeight: 1.45 }}>Was €650. Raising it to €720 clears the pacing flag for September.</div>
          <Spacer h={18} />
          <Card t={t} pad={0}><div style={{ padding: '0 15px' }}>
            <RowLink t={t} icon={MI.cart(t.slate, 18)} label="Category pot" value="Groceries" onClick={() => {}} />
            <RowLink t={t} icon={MI.cal(t.slate, 18)} label="Cadence" value="Monthly" onClick={() => {}} />
            <RowLink t={t} icon={MI.repeat(t.slate, 18)} label="Repeats" value="Every month" onClick={() => {}} />
            <RowLink t={t} icon={MI.eyeScope(t.slate, 18)} label="Who can see it" value="Household" onClick={() => go('visibility')} />
          </div></Card>
          <Spacer h={16} />
          <PrivacyLine t={t}>Editing updates the totals and any pacing flag immediately for every permitted member.</PrivacyLine>
          <Spacer h={22} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" onClick={() => go('editScope')}>Save changes</Btn>
      </div>
    </Screen>
  );
}

function EditScope({ t, platform, go, back, reset }) {
  const [choice, setChoice] = React.useState('this');
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Apply the change to" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 18 }}>
          <Lead t={t} style={{ marginBottom: 16 }}>Groceries repeats every month. Choose how far this €720 should reach, so past records are never altered by accident.</Lead>
          <ChoiceRow t={t} radio on={choice === 'this'} label="This period only" sub="September 2026. October onwards stays at €650." onClick={() => setChoice('this')} />
          <ChoiceRow t={t} radio on={choice === 'future'} label="This period and all future" sub="Every month from September onwards becomes €720." onClick={() => setChoice('future')} />
          <Spacer h={12} />
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', background: t.panelBlue, borderRadius: 14, padding: '13px 14px', borderLeft: `3px solid ${t.blue}` }}>
            {I.shield(t.blue, 19)}
            <span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.5 }}>Closed periods keep the figures they had. History stays true so comparisons and pace stay meaningful.</span>
          </div>
          <Spacer h={22} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" onClick={() => reset && reset('money')}>Save</Btn>
      </div>
    </Screen>
  );
}

function ClosePeriod({ t, platform, go, back, reset }) {
  const [roll, setRoll] = React.useState(true);
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Close September" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 18 }}>
          <Card t={t} pad={16}>
            <Kicker t={t}>September 2026 · closing</Kicker>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
              <Money size={26} weight={700} style={{ color: t.ink }}>€470</Money>
              <span style={{ fontFamily: OK_FONT, fontSize: 13.5, color: t.muted, fontWeight: 600 }}>spent of €650</span>
            </div>
            <div style={{ marginTop: 10 }}><SpendBar t={t} b={budgetBy('bg')} h={8} showProjection={false} /></div>
            <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 11, lineHeight: 1.5 }}>This period is kept exactly as it is, with its 14 expenses, so it can be compared with future months.</div>
          </Card>
          <Spacer h={14} />
          <Card t={t} pad={14}>
            <ToggleRow t={t} icon={MI.repeat(t.slate, 18)} label="Roll into October" sub="Same €650, same category and same visibility, with a fresh spend total" value={roll} onChange={setRoll} />
          </Card>
          <Spacer h={16} />
          <PrivacyLine t={t}>Each new period starts clean. Prior periods are never rewritten.</PrivacyLine>
          <Spacer h={22} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" onClick={() => reset && reset('money')}>Close the period</Btn>
      </div>
    </Screen>
  );
}

/* ═══════════ US-17.1.3 · category pots ═══════════ */
function Categories({ t, platform, go, back }) {
  const [sheet, setSheet] = React.useState(null);
  const rows = F17_CATS.map((c) => {
    const pots = F17_BUDGETS.filter((b) => b.cat === c.id && b.seen.includes('jeni'));
    const amount = pots.reduce((s, b) => s + b.amount, 0);
    const spent = pots.reduce((s, b) => s + b.spent, 0);
    return { ...c, pots, amount, spent };
  });
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Category pots" right={<button onClick={() => setSheet('new')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, display: 'flex' }}>{I.plus(t.teal700, 20)}</button>} />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 14 }}>
          <Lead t={t} style={{ fontSize: 13.5, marginBottom: 14 }}>A pot keeps a renovation, a holiday and everyday costs apart. Each one carries its own budget, spend to date and remaining balance.</Lead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {rows.map((r) => (
              <Card key={r.id} t={t} pad={15} onClick={r.pots.length ? () => go('budgetDetail') : undefined}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 11, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{CAT_ICON[r.icon](r.c, 19)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>{r.label}</div>
                    <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 2 }}>{r.pots.length ? `${r.pots.length} budget${r.pots.length > 1 ? 's' : ''} · ${r.pots.map((p) => cadenceBy(p.cadence).label.toLowerCase()).join(', ')}` : 'No budget yet'}</div>
                  </div>
                  {r.amount > 0 && <div style={{ textAlign: 'right' }}>
                    <Money size={14}>{eur(r.spent)}</Money>
                    <div style={{ fontFamily: OK_MONO, fontSize: 11.5, color: t.muted, marginTop: 2 }}>/ {eur(r.amount)}</div>
                  </div>}
                </div>
                {r.amount > 0 && <div style={{ marginTop: 11 }}><SpendBar t={t} b={{ amount: r.amount, spent: r.spent, cat: r.id }} h={6} showProjection={false} /></div>}
              </Card>
            ))}
          </div>
          <Spacer h={14} />
          <button onClick={() => setSheet('delete')} style={{ width: '100%', border: `1px solid ${t.hairline}`, background: t.surface, borderRadius: 14, padding: '13px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 11, textAlign: 'left' }}>
            {MI.trash(t.slate, 18)}
            <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 600, color: t.ink }}>Delete a pot</span>
            {I.chevR(t.muted, 16)}
          </button>
          <Spacer h={22} />
        </Pad>
      </div>
      {sheet === 'new' && (
        <Sheet t={t} platform={platform} title="New category pot" sub="Name it the way your household talks about it." onClose={() => setSheet(null)}>
          <Field t={t} label="Name" value="" placeholder="Vacation, school, repairs…" />
          <Spacer h={12} />
          <Btn t={t} kind="primary" onClick={() => setSheet(null)}>Create pot</Btn>
          <Spacer h={6} />
        </Sheet>
      )}
      {sheet === 'delete' && (
        <Sheet t={t} platform={platform} title="School holds 3 expenses" sub="Decide what happens to them before the pot goes." onClose={() => setSheet(null)}>
          <ChoiceRow t={t} radio icon={MI.swap(t.teal700, 18)} label="Move them to another pot" sub="Pick where the three expenses should live" onClick={() => setSheet(null)} />
          <ChoiceRow t={t} radio icon={MI.archive(t.teal700, 18)} label="Archive them with the pot" sub="Kept for history, out of current totals" onClick={() => setSheet(null)} />
          <Spacer h={8} />
          <Btn t={t} kind="outline" onClick={() => setSheet(null)}>Keep the pot</Btn>
          <Spacer h={6} />
        </Sheet>
      )}
    </Screen>
  );
}

/* ═══════════ currency integrity (invariant) ═══════════ */
function CurrencyMix({ t, platform, go, back }) {
  const [choice, setChoice] = React.useState('convert');
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title="Different currency" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 18 }}>
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', background: t.panelBlue, borderRadius: 14, padding: '13px 14px', borderLeft: `3px solid ${t.blue}` }}>
            {I.globe(t.blue, 19)}
            <span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.5 }}>This expense is in Swiss francs and the Transport pot is in euros. Amounts in different currencies are never added together silently.</span>
          </div>
          <Spacer h={16} />
          <Card t={t} pad={15}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <Avatar color={memberBy('fabian').c} name="F" size={34} ring={t.surface} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>Train to Basel</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 2 }}>Fabian · Mon 14 Sep · Transport</div>
              </div>
              <Money size={15}>CHF 46.50</Money>
            </div>
          </Card>
          <Spacer h={16} />
          <FieldLabel t={t}>How should it count</FieldLabel>
          <ChoiceRow t={t} radio on={choice === 'convert'} label="Convert to euros" sub="€49.60 at the rate recorded on 14 Sep. The original CHF amount is kept." onClick={() => setChoice('convert')} />
          <ChoiceRow t={t} radio on={choice === 'separate'} label="Keep it separate" sub="Shown as its own CHF line beside the euro total, never merged." onClick={() => setChoice('separate')} />
          <Spacer h={16} />
          <PrivacyLine t={t}>The household default currency is set in Settings. Rates used for a conversion are recorded with the expense.</PrivacyLine>
          <Spacer h={22} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" onClick={back}>Save</Btn>
      </div>
    </Screen>
  );
}

Object.assign(window, {
  FormBar, RowLink, FieldLabel,
  CreateBudget, BudgetCreated, LogExpense, ExpenseSaved, Offline,
  BudgetDetail, ExpenseDetail, EditBudget, EditScope, ClosePeriod, Categories, CurrencyMix,
});

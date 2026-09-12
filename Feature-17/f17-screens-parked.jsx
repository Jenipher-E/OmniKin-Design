/* OmniKin · Feature 17 — surfaces that depend on other features or sit in future
   considerations. Designed here so the shape is agreed, parked for a later release. */
const {
  OK_FONT, OK_MONO, I, Screen, Btn,
  MI, Pad, H1, Lead, Spacer, Grow, Kicker, Money,
  Avatar, Card, GroupHead, ParkedBadge, PrivacyLine, FormBar, CadenceChip,
  eur, budgetBy, memberBy,
} = window;

function ParkedShell({ t, platform, back, title, badge, heading, body, children, note }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg}>
      <FormBar t={t} onBack={back} title={title} />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 16 }}>
          <ParkedBadge t={t} />
          <H1 t={t} style={{ fontSize: 22, marginTop: 14 }}>{heading}</H1>
          <Lead t={t} style={{ marginTop: 8, fontSize: 14 }}>{body}</Lead>
          <Spacer h={18} />
          <div style={{ opacity: 0.62, pointerEvents: 'none' }}>{children}</div>
          {note && <React.Fragment><Spacer h={16} /><div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', background: t.panelBlue, borderRadius: 14, padding: '13px 14px', borderLeft: `3px solid ${t.blue}` }}>{MI.clock(t.blue, 18)}<span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.5 }}>{note}</span></div></React.Fragment>}
          <Spacer h={24} />
        </Pad>
      </div>
      <div style={{ flex: '0 0 auto', padding: '12px 18px', paddingBottom: platform === 'ios' ? 22 : 16 }}>
        <Btn t={t} kind="outline" onClick={back}>Back</Btn>
      </div>
    </Screen>
  );
}

/* Feature 9 · money dates in the shared agenda */
function AgendaParked({ t, platform, back }) {
  return (
    <ParkedShell t={t} platform={platform} back={back} title="Money in the agenda"
      heading="Budget dates alongside everything else"
      body="Dated budget periods and money reminders would sit in the one unified agenda, for the members permitted to see them."
      note="Depends on Feature 9, Shared Agenda. Designed now, built when the agenda lands.">
      <Card t={t} pad={0}>
        {[['Mon 21 Sep', 'Transport top-up renews', '€90 · weekly'], ['Wed 30 Sep', 'Groceries period closes', '€650 · monthly'], ['Thu 1 Oct', 'October pots open', 'Fresh spend totals']].map(([day, title, sub], i) => (
          <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderBottom: i === 2 ? 'none' : `1px solid ${t.hairline}` }}>
            <div style={{ width: 54, flex: '0 0 auto' }}>
              <div style={{ fontFamily: OK_MONO, fontSize: 11.5, fontWeight: 600, color: t.teal700 }}>{day}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.ink }}>{title}</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 2 }}>{sub}</div>
            </div>
            {MI.wallet(t.muted, 17)}
          </div>
        ))}
      </Card>
    </ParkedShell>
  );
}

/* Feature 7 · meal planner cost estimates feeding the groceries pot */
function MealCostParked({ t, platform, back }) {
  return (
    <ParkedShell t={t} platform={platform} back={back} title="Meal plan costs"
      heading="A week's meals, priced into groceries"
      body="The meal planner's optional cost estimates would feed the groceries pot, and a shop logged from the plan would come back as an expense."
      note="Bidirectional with Feature 7, Meal Planner. Out of scope for this release.">
      <Card t={t} pad={16}>
        <GroupHead t={t} style={{ marginBottom: 12 }}>Week of 21 Sep · estimate</GroupHead>
        {[['Mon to Wed', '€48'], ['Thu to Sat', '€61'], ['Sunday roast', '€27']].map(([k, v], i) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', padding: '9px 0', borderBottom: i === 2 ? 'none' : `1px solid ${t.hairline}` }}>
            <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13.5, color: t.ink }}>{k}</span>
            <Money size={13.5}>{v}</Money>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 13, paddingTop: 13, borderTop: `1px solid ${t.hairline}` }}>
          <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 700, color: t.ink }}>Into Groceries</span>
          <Money size={15} style={{ color: t.teal700 }}>€136</Money>
        </div>
      </Card>
    </ParkedShell>
  );
}

/* Future consideration · mobile-money referenced settlement */
function MobileMoneyParked({ t, platform, back }) {
  return (
    <ParkedShell t={t} platform={platform} back={back} title="Mobile money"
      heading="Reference a mobile-money payment"
      body="In markets where households settle in mobile money, a logged expense could carry the reference of a payment that already happened. OmniKin would still never move money."
      note="A future consideration, not this release. OmniKin records and monitors money; it never moves it.">
      <Card t={t} pad={16}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ width: 36, height: 36, borderRadius: 11, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{MI.coins(t.green, 19)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>Market shop</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 2 }}>Reference QJ8·4417·PD · recorded, not initiated</div>
          </div>
          <Money size={14}>KSh 2,400</Money>
        </div>
        <div style={{ marginTop: 13, paddingTop: 13, borderTop: `1px solid ${t.hairline}`, fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, lineHeight: 1.5 }}>Kept in its own currency beside the household total, never silently converted.</div>
      </Card>
    </ParkedShell>
  );
}

Object.assign(window, { ParkedShell, AgendaParked, MealCostParked, MobileMoneyParked });

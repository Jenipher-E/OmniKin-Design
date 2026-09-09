/* OmniKin · Feature 3 — PARKED: US-3.3.1 (Meal Planner push) + Flow B.
   Built as real screens but clearly separated as "Not in this release". */
const {
  OK_FONT, OK_MONO, I, Screen, Btn, Banner,
  FI, Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, Card, StorePill, GroupHead, ParkedBadge,
  FlowTop, F3_MEAL,
} = window;

/* a dashed "parked" wrapper banner shown at the top of each parked screen */
function ParkedHeader({ t, back, title }) {
  return (
    <div style={{ flex: '0 0 auto' }}>
      <div style={{ background: t.panelBlue, padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 9 }}>
        {FI.clock(t.blue, 16)}<span style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 700, color: t.blue }}>Not in this release · planned with Feature 7</span>
      </div>
      <FlowTop t={t} back={back} sub="Roadmap" title={title} />
    </div>
  );
}

/* ───────── US-3.3.1 · Meal Planner pushes ingredients ───────── */
function MealPush({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <ParkedHeader t={t} back={back} title="From the Meal Planner" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 4 }}>
          <Lead t={t}>When this ships, scheduling a meal drops its ingredients straight onto the right shopping list, scaled to servings.</Lead>
        </Pad>
        <Spacer h={16} />
        <Pad>
          <Card t={t} pad={15}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: t.panelCoral, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{FI.meal(t.coral, 24)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.ink }}>{F3_MEAL.name}</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2 }}>{F3_MEAL.source} · {F3_MEAL.servings} servings</div>
              </div>
            </div>
          </Card>
        </Pad>
        <Spacer h={16} />
        <Pad>
          <GroupHead t={t} style={{ marginBottom: 10 }}>Ingredients added to Groceries</GroupHead>
          <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, overflow: 'hidden', boxShadow: t.shadowSm }}>
            {F3_MEAL.ingredients.map((ing, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 15px', borderBottom: i === F3_MEAL.ingredients.length - 1 ? 'none' : `1px solid ${t.hairline}` }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{FI.cart(t.teal700, 16)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{ing.name}</div>
                  <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 1 }}>{ing.qty} {ing.unit}{ing.merged ? '' : ''}</div>
                </div>
                {ing.merged
                  ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: OK_FONT, fontSize: 10.5, fontWeight: 700, color: t.green, background: t.panelGreen, padding: '3px 8px', borderRadius: 999 }}>{FI.swap(t.green, 11)}Merged</span>
                  : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: OK_FONT, fontSize: 10.5, fontWeight: 700, color: t.coral }}>{FI.meal(t.coral, 12)}Meal</span>}
              </div>
            ))}
          </div>
          <div style={{ background: t.panelGreen, borderRadius: 13, padding: '11px 13px', borderLeft: `3px solid ${t.green}`, marginTop: 12 }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.ink, lineHeight: 1.5 }}><b>Chopped tomatoes</b> merged with the 3 cans already on the list, now 5 cans. Each added item is tagged with its meal, so it is easy to remove if plans change.</div>
          </div>
        </Pad>
        <Spacer h={20} />
      </div>
      <div style={{ padding: `14px 20px ${platform === 'ios' ? 30 : 18}px`, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="outline" onClick={() => go('flowB')}>See the full Flow B →</Btn>
      </div>
    </Screen>
  );
}

/* ───────── Flow B · Meal Planner to shopping list (the 4 steps) ───────── */
function FlowB({ t, platform, go, back }) {
  const steps = [
    [FI.meal, t.coral, t.panelCoral, 'Schedule a meal', 'A member schedules a meal with a linked recipe in the Meal Planner (Feature 7).'],
    [FI.forward, t.teal700, t.panelTeal, 'Push ingredients', 'Its ingredients are pushed to the chosen shopping list, scaled to the number of servings.'],
    [FI.swap, t.green, t.panelGreen, 'Merge, never duplicate', 'Ingredients already on the list are merged with summed quantities, not duplicated.'],
    [FI.tag, t.blue, t.panelBlue, 'Tag the source', 'Each auto-added item is tagged with its source meal, so it is traceable and easy to remove.'],
  ];
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <ParkedHeader t={t} back={back} title="Flow B" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 4 }}>
          <Lead t={t}>Meal Planner to shopping list, end to end. Parked for a later release alongside Feature 7.</Lead>
        </Pad>
        <Spacer h={18} />
        <Pad>
          <div style={{ position: 'relative' }}>
            {/* connecting line */}
            <div style={{ position: 'absolute', left: 38, top: 20, bottom: 20, width: 2, background: t.hairline }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {steps.map(([icon, fg, bg, title, sub], i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', position: 'relative' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', boxShadow: `0 0 0 4px ${t.bg}` }}>{icon(fg, 20)}</div>
                  <div style={{ flex: 1, background: t.surface, borderRadius: 15, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: '13px 15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: OK_MONO, fontSize: 11, fontWeight: 700, color: t.muted }}>0{i + 1}</span>
                      <span style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>{title}</span>
                    </div>
                    <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 5, lineHeight: 1.5 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Pad>
        <Spacer h={18} />
        <Pad>
          <Banner t={t} tone="info" icon={I.shield(t.teal500, 18)}>This depends on the Meal Planner (Feature 7). It is documented and designed here so the shopping side is ready, but it is out of the current iteration.</Banner>
        </Pad>
        <Spacer h={20} />
      </div>
    </Screen>
  );
}

Object.assign(window, { MealPush, FlowB, ParkedHeader });

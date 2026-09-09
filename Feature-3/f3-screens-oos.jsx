/* OmniKin · Feature 3 — Epic 3.2: Out-of-stock intelligence (the differentiator).
   Sold-out capture (sheet A / full-screen B), auto-carry, substitute notification,
   accept / send-instructions, awaiting-reply, and the resolved view. */
const {
  OK_FONT, OK_MONO, I, Screen, Btn, Banner,
  FI, Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, Card, StorePill, StatusPill, SubstituteCard, Sheet, GroupHead,
  FlowTop, F3_SUBSTITUTES, ME, SHOPPER,
} = window;

/* the sold-out item summary card (shared by both capture treatments) */
function SoldOutItemCard({ t, big }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, background: t.surfaceAlt, borderRadius: 16, padding: big ? 16 : 14, border: `1px solid ${t.hairline}` }}>
      <div style={{ width: big ? 52 : 46, height: big ? 52 : 46, borderRadius: 13, background: 'rgba(224,165,60,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{FI.alert(t.warning, big ? 26 : 22)}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: OK_FONT, fontSize: big ? 17 : 15.5, fontWeight: 700, color: t.ink }}>Natural yoghurt</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
          <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate }}>REWE Bio · 2 × 500g</span>
          <StorePill t={t} store="rewe" size="sm" />
        </div>
      </div>
    </div>
  );
}

/* what-happens-next explainer rows */
function NextSteps({ t }) {
  const steps = [
    [FI.forward, t.green, t.panelGreen, 'Carried to next week’s Groceries', 'Brand, amount and store are kept. Nothing is forgotten.'],
    [FI.bell, t.teal700, t.panelTeal, 'Jeni is notified with substitutes', 'She can pick an alternative or send you a note, no phone call.'],
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {steps.map(([icon, fg, bg, title, sub], i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{icon(fg, 19)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>{title}</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 2, lineHeight: 1.45 }}>{sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────── Version A · sold-out as a bottom sheet over the list ───────── */
function SoldOutSheetA({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      {/* dimmed list hint behind */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }}>
        <Pad style={{ paddingTop: 12 }}><H1 t={t} style={{ fontSize: 24 }}>Groceries</H1></Pad>
      </div>
      <Sheet t={t} platform={platform} title="Mark as sold out?" onClose={back}>
        <Lead t={t} style={{ marginBottom: 14 }}>You couldn’t find this on the shelf. One tap keeps it from being lost.</Lead>
        <SoldOutItemCard t={t} />
        <Spacer h={18} />
        <NextSteps t={t} />
        <Spacer h={20} />
        <Btn t={t} kind="primary" icon={FI.alert('#fff', 18)} onClick={() => go('carryForward')}>Mark sold out</Btn>
        <Spacer h={10} />
        <Btn t={t} kind="ghost" onClick={back} style={{ color: t.slate }}>Not now</Btn>
        <Spacer h={4} />
      </Sheet>
    </Screen>
  );
}

/* ───────── Version B · sold-out as a full-screen step ───────── */
function SoldOutFullB({ t, platform, go, back }) {
  const hero = t.name === 'light' ? t.teal700 : t.teal900;
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: hero, padding: '4px 20px 26px' }}>
          <div style={{ minHeight: 36, display: 'flex', alignItems: 'center' }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back('#fff')}</button>
          </div>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>{FI.alert('#fff', 34)}</div>
          <div style={{ fontFamily: OK_FONT, fontSize: 27, fontWeight: 800, color: '#fff', letterSpacing: -0.5, marginTop: 16 }}>Out of stock?</div>
          <div style={{ fontFamily: OK_FONT, fontSize: 14.5, color: 'rgba(255,255,255,.85)', marginTop: 6, lineHeight: 1.5 }}>Mark it sold out and OmniKin handles the rest, so you can keep moving through the aisles.</div>
        </div>
        <Pad style={{ marginTop: -16 }}>
          <Card t={t} pad={16}><SoldOutItemCard t={t} big /></Card>
        </Pad>
        <Spacer h={20} />
        <Pad><GroupHead t={t} style={{ marginBottom: 12 }}>What happens next</GroupHead><NextSteps t={t} /></Pad>
        <Spacer h={24} />
      </div>
      <div style={{ padding: `14px 20px ${platform === 'ios' ? 30 : 18}px`, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" icon={FI.alert('#fff', 18)} onClick={() => go('carryForward')}>Mark sold out</Btn>
      </div>
    </Screen>
  );
}

/* ───────── Carry-forward confirmation (shopper side) ───────── */
function CarryForward({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Pad style={{ paddingTop: 8 }}>
          <div style={{ minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button onClick={() => go('listB')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.slate }}>Done</button>
          </div>
        </Pad>
        <Pad style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 14 }}>
          <div style={{ width: 78, height: 78, borderRadius: '50%', background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'okpop .4s cubic-bezier(.2,.8,.25,1)' }}>{I.check(t.green, 40)}</div>
          <H1 t={t} style={{ marginTop: 20, fontSize: 23 }}>Saved, not lost</H1>
          <Lead t={t} style={{ marginTop: 8, maxWidth: 300 }}>Natural yoghurt is carried to next week and Jeni has a note to choose a swap.</Lead>
        </Pad>
        <Spacer h={22} />
        <Pad>
          <div style={{ background: t.surface, borderRadius: 18, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 12, padding: '15px 16px', alignItems: 'center', borderBottom: `1px solid ${t.hairline}` }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{FI.forward(t.green, 20)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>Carried to next Groceries</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 2 }}>Flagged <b>carried from 13 Jun</b>. Merged if already there.</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, padding: '15px 16px', alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{FI.bell(t.teal700, 20)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>Jeni notified</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 2 }}>Sent with substitute options · 1 min ago</div>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: t.teal700, background: t.panelTeal, padding: '4px 10px', borderRadius: 999 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: t.teal500 }} />Waiting</span>
            </div>
          </div>
        </Pad>
        <Spacer h={20} />
      </div>
      <div style={{ padding: `14px 20px ${platform === 'ios' ? 30 : 18}px`, background: t.surface, borderTop: `1px solid ${t.hairline}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Btn t={t} kind="teal" onClick={() => go('substituteCreator')}>See it from Jeni’s side</Btn>
        <Btn t={t} kind="ghost" onClick={() => go('awaitingReply')} style={{ color: t.slate }}>If Jeni is offline →</Btn>
      </div>
    </Screen>
  );
}

/* ───────── Substitute notification + decision (creator / Jeni side) ───────── */
function SubstituteCreator({ t, platform, go, back }) {
  const [sel, setSel] = React.useState('s1');
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <FlowTop t={t} back={back} sub="Notification" right={<span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>Jeni’s phone</span>} />
        <Pad style={{ paddingTop: 6 }}>
          {/* incoming message */}
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <Avatar color={SHOPPER.c} name={SHOPPER.n} size={38} ring={t.surface} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink }}>Fabian</span><span style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted }}>at REWE · now</span></div>
              <div style={{ background: t.surface, border: `1px solid ${t.hairline}`, borderRadius: '4px 16px 16px 16px', padding: 13, marginTop: 6, boxShadow: t.shadowSm }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>{FI.alert(t.warning, 17)}<span style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 700, color: t.ink, whiteSpace: 'nowrap' }}>Yoghurt is sold out</span></div>
                <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.5 }}>REWE Bio natural yoghurt, 2 × 500g, isn’t on the shelf. Which swap should I grab?</div>
              </div>
            </div>
          </div>
        </Pad>
        <Spacer h={18} />
        <Pad>
          <GroupHead t={t} style={{ marginBottom: 10 }}>Suggested substitutes</GroupHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {F3_SUBSTITUTES.map((s) => <SubstituteCard key={s.id} t={t} sub={s} selected={sel === s.id} onClick={() => setSel(s.id)} />)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: t.muted, fontFamily: OK_FONT, fontSize: 12, marginTop: 12, lineHeight: 1.45 }}>{I.shield(t.muted, 15)} Suggested from your household’s own buys first, then a generic list. History never leaves the household.</div>
        </Pad>
        <Spacer h={16} />
      </div>
      <div style={{ padding: `14px 20px ${platform === 'ios' ? 30 : 18}px`, background: t.surface, borderTop: `1px solid ${t.hairline}`, display: 'flex', gap: 10 }}>
        <Btn t={t} kind="outline" full={false} icon={FI.send(t.teal500, 18)} onClick={() => go('resolved')} style={{ flex: '0 0 auto', width: 54, padding: 0 }} />
        <Btn t={t} kind="primary" icon={I.check('#fff', 18)} onClick={() => go('resolved')}>Accept this swap</Btn>
      </div>
    </Screen>
  );
}

/* ───────── Awaiting reply (shopper, creator offline) ───────── */
function AwaitingReply({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <FlowTop t={t} back={back} sub="Groceries" />
        <Pad style={{ paddingTop: 6 }}>
          <SoldOutItemCard t={t} />
        </Pad>
        <Spacer h={18} />
        <Pad>
          <div style={{ background: t.surface, borderRadius: 18, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'okpulse 2s infinite' }}>{FI.clock(t.teal700, 28)}</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 17, fontWeight: 700, color: t.ink, marginTop: 14 }}>Awaiting Jeni’s reply</div>
            <Lead t={t} style={{ marginTop: 6, maxWidth: 280 }}>Jeni is offline right now. Your message is queued and she’ll get it the moment she’s back.</Lead>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: t.green, background: t.panelGreen, padding: '6px 12px', borderRadius: 999 }}>{FI.forward(t.green, 14)} Already carried to next week, just in case</div>
          </div>
        </Pad>
        <Spacer h={16} />
        <Pad>
          <Banner t={t} tone="info" icon={FI.swap(t.teal500, 18)}>No reply needed to keep moving. The item is safe either way, and you decide the rest at the till.</Banner>
        </Pad>
        <Spacer h={16} />
      </div>
      <div style={{ padding: `14px 20px ${platform === 'ios' ? 30 : 18}px`, background: t.surface, borderTop: `1px solid ${t.hairline}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Btn t={t} kind="teal" onClick={() => go('resolved')}>Pick a swap myself</Btn>
        <Btn t={t} kind="ghost" onClick={() => go('listB')} style={{ color: t.slate }}>Skip for now</Btn>
      </div>
    </Screen>
  );
}

/* ───────── Resolved — shopper sees the decision before leaving the aisle ───────── */
function Resolved({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Pad style={{ paddingTop: 8 }}>
          <div style={{ minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button onClick={() => go('listB')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.slate }}>Done</button>
          </div>
        </Pad>
        <Pad style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 12 }}>
          <div style={{ width: 78, height: 78, borderRadius: '50%', background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'okpop .4s cubic-bezier(.2,.8,.25,1)' }}>{FI.swap(t.green, 38)}</div>
          <H1 t={t} style={{ marginTop: 20, fontSize: 23 }}>Jeni picked a swap</H1>
          <Lead t={t} style={{ marginTop: 8, maxWidth: 300 }}>Settled before you left the aisle. No phone call, nothing forgotten.</Lead>
        </Pad>
        <Spacer h={22} />
        <Pad>
          <div style={{ background: t.surface, borderRadius: 18, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar color={ME.c} name={ME.n} size={34} ring={t.surface} />
              <span style={{ fontFamily: OK_FONT, fontSize: 13.5, color: t.ink }}><b>Jeni</b> chose a substitute</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginTop: 14, padding: '13px 14px', background: t.panelTeal, borderRadius: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{FI.cart(t.teal700, 22)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>Söbbeke organic yoghurt</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 2 }}>Söbbeke · 500g · at REWE</div>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: OK_FONT, fontSize: 10.5, fontWeight: 700, color: t.green, background: t.panelGreen, padding: '3px 8px', borderRadius: 999 }}>{I.shield(t.green, 11)}History</span>
            </div>
          </div>
        </Pad>
        <Spacer h={20} />
      </div>
      <div style={{ padding: `14px 20px ${platform === 'ios' ? 30 : 18}px`, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" icon={I.check('#fff', 18)} onClick={() => go('listB')}>Got it, add to basket</Btn>
      </div>
    </Screen>
  );
}

Object.assign(window, { SoldOutSheetA, SoldOutFullB, CarryForward, SubstituteCreator, AwaitingReply, Resolved, SoldOutItemCard });

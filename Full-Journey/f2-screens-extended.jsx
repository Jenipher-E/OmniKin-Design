/* OmniKin · Feature 2 — Epic 2.3: extended family & co-parenting (differentiated). */
const {
  OK_FONT, OK_MONO, I, Screen, FlowHeader, Btn, Banner,
  Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, RoleBadge, Card, Toggle,
  F2_COPARENT,
} = window;

/* small green differentiator badge from the style guide */
function Diff({ t, children }) {
  return (
    <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', background: t.panelGreen, borderRadius: 12, padding: '12px 13px', borderLeft: `3px solid ${t.green}` }}>
      <span style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 800, color: t.green, flex: '0 0 auto' }}>★</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: OK_MONO, fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: t.green, marginBottom: 3 }}>Only on OmniKin</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, lineHeight: 1.5 }}>{children}</div>
      </div>
    </div>
  );
}

/* ════════ EXTENDED & MULTIGENERATIONAL ROLES ════════ */
function ExtendedRoles({ t, platform, go, back }) {
  const roles = [
    { name: 'Grandparent', c: '#9C5BB0', scope: 'Sees the calendar and lists, joins messages. No finances or documents.', icon: I.user },
    { name: 'Relative', c: '#3F7DA6', scope: 'Scoped view and contribute for wider family who pitch in.', icon: I.user },
    { name: 'Carer / Helper', c: '#E2683C', scope: 'Calendar and tasks they can add to. Never finances or documents.', icon: I.cal },
  ];
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} />
      <Pad style={{ paddingTop: 2, paddingBottom: 22 }}>
        <Kicker t={t}>Extended family</Kicker>
        <H1 t={t} style={{ marginTop: 8, fontSize: 24 }}>More than parents and kids</H1>
        <Lead t={t} style={{ marginTop: 7, marginBottom: 16 }}>Add the people who actually help run your home, each with a role that fits, not a one-size login.</Lead>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 16 }}>
          {roles.map((r) => (
            <Card key={r.name} pad={15} t={t} onClick={() => go('inviteRole')} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: r.c, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{r.icon('#fff', 21)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: t.ink }}>{r.name}</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 2, lineHeight: 1.45 }}>{r.scope}</div>
              </div>
              {I.chevR(t.muted, 18)}
            </Card>
          ))}
        </div>

        <Diff t={t}>Cozi and FamilyWall assume one nuclear family on one account. OmniKin models grandparents, relatives and carers natively, the shape that’s common everywhere and the norm across much of Africa.</Diff>
        <Spacer h={14} />
        <Card t={t} pad={14} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          {I.home(t.teal700, 20)}
          <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.45 }}>Households can grow well past a nuclear family without slowing down. The member cap is generous and adjustable.</span>
        </Card>
        <Spacer h={16} />
        <Btn t={t} kind="primary" onClick={() => go('inviteRole')}>Invite extended family</Btn>
      </Pad>
    </Screen>
  );
}

/* ════════ CO-PARENTING · setup ════════ */
function CoParentSetup({ t, platform, go, back }) {
  const cp = F2_COPARENT;
  const [shared, setShared] = React.useState({ calendar: true, expenses: true, lists: true });
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} n={2} i={0} />
      <Pad style={{ paddingTop: 4, paddingBottom: 20 }}>
        <Kicker t={t}>Co-parenting space</Kicker>
        <H1 t={t} style={{ marginTop: 8, fontSize: 23 }}>A neutral space between two homes</H1>
        <Lead t={t} style={{ marginTop: 7, marginBottom: 16 }}>Coordinate the children without opening up the rest of your lives. Neither parent can remove the other.</Lead>

        <Card t={t} pad={15} style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 700, color: t.slate, marginBottom: 12 }}>Equal guardians</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {cp.guardians.map((g, i) => (
              <React.Fragment key={g.n}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, flex: 1 }}>
                  <Avatar color={g.c} name={g.n} size={40} ring={t.surface} />
                  <div><div style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink }}>{g.n}</div><div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted }}>{g.label}</div></div>
                </div>
                {i === 0 && <div style={{ width: 30, height: 30, borderRadius: '50%', background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', fontFamily: OK_FONT, fontWeight: 800, fontSize: 14, color: t.teal700 }}>=</div>}
              </React.Fragment>
            ))}
          </div>
        </Card>

        <Kicker t={t} style={{ margin: '0 4px 8px' }}>Shared between both homes</Kicker>
        <div style={{ background: t.surface, borderRadius: 14, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden', marginBottom: 14 }}>
          {cp.shared.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderBottom: i === cp.shared.length - 1 ? 'none' : `1px solid ${t.hairline}` }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{(s.id === 'calendar' ? I.cal : s.id === 'expenses' ? I.doc : I.list)(t.teal700, 17)}</div>
              <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 14.5, color: t.ink }}>{s.label}</span>
              <Toggle t={t} on={shared[s.id]} onChange={(v) => setShared({ ...shared, [s.id]: v })} />
            </div>
          ))}
        </div>

        <Kicker t={t} style={{ margin: '0 4px 8px' }}>Stays private to each home</Kicker>
        <Card t={t} pad={14} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {cp.notShared.map((s) => (
            <span key={s.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: t.slate, background: t.surfaceAlt, padding: '6px 11px', borderRadius: 999 }}>{I.lock(t.muted, 13)}{s.label}</span>
          ))}
        </Card>

        <Banner t={t} tone="warning" icon={I.shield(t.warning, 17)}>Shared records can’t be deleted by one parent alone. Deletions need both of you, or a cooling-off window.</Banner>
        <Spacer h={18} />
        <Btn t={t} kind="primary" onClick={() => go('coParentSpace')}>Create co-parenting space</Btn>
      </Pad>
    </Screen>
  );
}

/* ════════ CO-PARENTING · resulting space ════════ */
function CoParentSpace({ t, platform, go, back }) {
  const cp = F2_COPARENT;
  const hero = t.name === 'light' ? t.teal700 : t.teal900;
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* neutral teal header */}
        <div style={{ background: hero, padding: '8px 20px 22px' }}>
          <FlowHeader t={{ ...t, slate: 'rgba(255,255,255,.9)' }} onBack={back} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,.14)', padding: '5px 11px', borderRadius: 999, marginTop: 4 }}>{I.shield('#fff', 13)}<span style={{ fontFamily: OK_FONT, fontSize: 11.5, color: '#fff', fontWeight: 600 }}>Neutral shared space</span></div>
          <div style={{ fontFamily: OK_FONT, fontSize: 25, fontWeight: 700, color: '#fff', letterSpacing: -0.4, marginTop: 12 }}>{cp.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
            {cp.guardians.map((g, i) => (
              <React.Fragment key={g.n}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar color={g.c} name={g.n} size={32} ring="rgba(255,255,255,.4)" />
                  <span style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: '#fff' }}>{g.n}</span>
                </div>
                {i === 0 && <span style={{ fontFamily: OK_FONT, fontSize: 12, color: 'rgba(255,255,255,.7)' }}>equal standing</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <Pad style={{ paddingTop: 18, paddingBottom: 22 }}>
          <Kicker t={t} style={{ margin: '0 4px 8px' }}>Shared modules</Kicker>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {cp.shared.map((s) => (
              <Card key={s.id} t={t} pad={14} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{(s.id === 'calendar' ? I.cal : s.id === 'expenses' ? I.doc : I.list)(t.teal700, 19)}</div>
                <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{s.label}</span>
                {I.chevR(t.muted, 17)}
              </Card>
            ))}
          </div>

          <Card t={t} pad={15} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>{I.doc(t.teal700, 19)}<span style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>Settle up</span></div>
            <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.5 }}>Reimbursements run through the expense tracker, and through mobile-money where it’s available, so every cost is neutral and recorded.</div>
          </Card>

          <Diff t={t}>No major family organiser offers a neutral, two-guardian space with scoped sharing and protected shared records. This is the one made for separated and blended families.</Diff>
        </Pad>
      </div>
    </Screen>
  );
}

Object.assign(window, { ExtendedRoles, CoParentSetup, CoParentSpace, Diff });

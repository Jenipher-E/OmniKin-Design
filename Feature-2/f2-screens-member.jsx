/* OmniKin · Feature 2 — member detail & role assignment (shared). */
const {
  OK_FONT, OK_MONO, I, Screen, FlowHeader, Btn, Banner,
  Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, RoleBadge, RoleTile, AccessLevel, Card, ListGroup, ListRow, Toggle,
  F2_ROLES, F2_MEMBERS, F2_MODULES, F2_MATRIX,
} = window;

function memberBy(id) { return F2_MEMBERS.find((m) => m.id === id) || F2_MEMBERS[5]; }
function roleId(role) {
  const m = { Owner: 'owner', 'Co-owner': 'coowner', Guardian: 'guardian', Adult: 'adult', Teen: 'teen', Child: 'child', Grandparent: 'grandparent', Relative: 'relative', Carer: 'carer', Guest: 'guest' };
  return m[role] || 'carer';
}

/* ════════ MEMBER DETAIL ════════ */
function MemberDetail({ t, platform, go, back, mid = 'sofia' }) {
  const m = memberBy(mid);
  const minor = m.role === 'Teen' || m.role === 'Child';
  const rid = roleId(m.role);
  const row = F2_MATRIX[rid] || [];
  const allowed = F2_MODULES.map((mod, i) => ({ mod, lvl: row[i] })).filter((x) => x.lvl !== 0).slice(0, 4);
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} right={<button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4 }}>{I.gear(t.slate, 20)}</button>} />
      <Pad style={{ paddingTop: 2, paddingBottom: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10 }}>
          <Avatar color={m.c} name={m.n} size={84} ring={t.surface} />
          <div>
            <div style={{ fontFamily: OK_FONT, fontSize: 22, fontWeight: 700, color: t.title }}>{m.full}{m.you ? ' · You' : ''}</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 13.5, color: t.muted, marginTop: 3 }}>{m.joined} · {m.last}</div>
          </div>
          <RoleBadge t={t} role={m.role} />
        </div>
        <Spacer h={22} />

        {minor && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ background: t.panelBlue, borderRadius: 14, padding: '13px 15px', borderLeft: `3px solid ${t.blue}`, display: 'flex', gap: 10, alignItems: 'center' }}>
              {I.shield(t.blue, 19)}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 700, color: t.subhead }}>{m.consent}</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 2 }}>Age {m.age} · protected by GDPR-K. Only you can widen this.</div>
              </div>
            </div>
          </div>
        )}

        <ListGroup t={t} title="Access" style={{ marginBottom: 16 }}>
          <ListRow t={t} icon={<RoleBadge t={t} role={m.role} size="sm" />} iconBg="transparent" label="Role" value={m.role} onClick={() => go('assignRole')} />
          <ListRow t={t} icon={I.lock(t.teal700, 18)} label="What they can do" sub="Per-module permissions" onClick={() => go('roleEditor')} last />
        </ListGroup>

        <Kicker t={t} style={{ margin: '0 4px 8px' }}>Can access</Kicker>
        <Card t={t} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          {allowed.map(({ mod, lvl }) => (
            <div key={mod.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: OK_FONT, fontSize: 14, color: t.ink }}>{mod.label}</span>
              <AccessLevel t={t} lvl={lvl} />
            </div>
          ))}
          <Link t={t} onClick={() => go('roleEditor')} style={{ fontSize: 13.5, marginTop: 2 }}>See full permission matrix →</Link>
        </Card>

        <ListGroup t={t}>
          {m.you
            ? <ListRow t={t} icon={I.back(t.error)} iconBg="rgba(201,69,59,.10)" label="Leave household" danger onClick={() => go('removeMember')} last />
            : <ListRow t={t} icon={I.back(t.error)} iconBg="rgba(201,69,59,.10)" label={`Remove ${m.n} from household`} danger onClick={() => go('removeMember')} last />}
        </ListGroup>
      </Pad>
    </Screen>
  );
}

/* ════════ ASSIGN / CHANGE ROLE ════════ */
function AssignRole({ t, platform, go, back, mid = 'sofia' }) {
  const m = memberBy(mid);
  const [sel, setSel] = React.useState(roleId(m.role));
  const order = ['coowner', 'guardian', 'adult', 'teen', 'child', 'grandparent', 'relative', 'carer', 'guest'];
  const roles = order.map((id) => F2_ROLES.find((r) => r.id === id));
  const wasGuardian = m.role === 'Guardian' || m.role === 'Co-owner';
  const nowLower = !['coowner', 'guardian'].includes(sel);
  const consentCheck = wasGuardian && nowLower;
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} />
      <Pad style={{ paddingTop: 2, paddingBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 14 }}>
          <Avatar color={m.c} name={m.n} size={40} ring={t.surface} />
          <div>
            <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.ink }}>{m.full}</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted }}>Currently {m.role}</div>
          </div>
        </div>
        <H1 t={t} style={{ fontSize: 23 }}>Change role</H1>
        <Lead t={t} style={{ marginTop: 6, marginBottom: 6 }}>You can grant up to your own level.</Lead>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: t.panelGreen, padding: '5px 11px', borderRadius: 999, marginBottom: 16 }}>{I.shield(t.green, 13)}<span style={{ fontFamily: OK_FONT, fontSize: 12, fontWeight: 700, color: t.green }}>Your ceiling: Owner</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {roles.map((r) => <RoleTile key={r.id} t={t} role={r} selected={sel === r.id} onClick={() => setSel(r.id)} />)}
        </div>
        <Spacer h={16} />
        {consentCheck && (
          <div style={{ background: 'rgba(224,165,60,.12)', borderRadius: 14, padding: '14px 15px', borderLeft: `3px solid ${t.warning}`, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>{I.shield(t.warning, 18)}<span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink }}>Consent-holder check</span></div>
            <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.5 }}>{m.n} holds consent for a minor. Before this takes effect, you’ll confirm another guardian carries that responsibility.</div>
          </div>
        )}
        <Btn t={t} kind="primary" onClick={back}>Save role change</Btn>
        <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>Takes effect on next sync across every module. Recorded in the activity log.</div>
      </Pad>
    </Screen>
  );
}

Object.assign(window, { MemberDetail, AssignRole, memberBy, roleId });

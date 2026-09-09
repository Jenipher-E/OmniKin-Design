/* OmniKin · Feature 2 — roles & granular permissions (shared). */
const {
  OK_FONT, OK_MONO, I, Screen, FlowHeader, Btn, Banner,
  Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, RoleBadge, AccessLevel, Bars, LEVELS, levelColor, Card, ListGroup, ListRow, Toggle,
  F2_ROLES, F2_MODULES, F2_MATRIX,
} = window;

/* ════════ PERMISSION MATRIX — at-a-glance grid ════════ */
function PermissionMatrix({ t, platform, go, back }) {
  const cols = [
    { id: 'owner', label: 'Owner' }, { id: 'guardian', label: 'Guardian' }, { id: 'adult', label: 'Adult' },
    { id: 'teen', label: 'Teen' }, { id: 'child', label: 'Child' }, { id: 'grandparent', label: 'G’parent' },
    { id: 'carer', label: 'Carer' }, { id: 'guest', label: 'Guest' },
  ];
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} />
      <Pad style={{ paddingTop: 2, paddingBottom: 8 }}>
        <Kicker t={t}>Roles & permissions</Kicker>
        <H1 t={t} style={{ marginTop: 8, fontSize: 23 }}>Permission matrix</H1>
        <Lead t={t} style={{ marginTop: 7, marginBottom: 14 }}>What each role can do, at a glance. Sensitive areas stay private by default. Tap a role to fine-tune it.</Lead>
      </Pad>
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 4 }}>
        <div style={{ display: 'grid', gridTemplateColumns: `128px repeat(${cols.length}, 60px)`, minWidth: 'min-content', padding: '0 20px' }}>
          {/* header */}
          <div style={{ position: 'sticky', left: 0, background: t.bg, zIndex: 2 }} />
          {cols.map((c) => (
            <button key={c.id} onClick={() => go('roleEditor')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '0 0 10px', fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: t.teal700, textAlign: 'center', whiteSpace: 'nowrap' }}>{c.label}</button>
          ))}
          {/* rows */}
          {F2_MODULES.map((mod, ri) => (
            <React.Fragment key={mod.id}>
              <div style={{ position: 'sticky', left: 0, background: t.bg, zIndex: 2, display: 'flex', alignItems: 'center', gap: 5, paddingRight: 8, height: 46, borderTop: `1px solid ${t.hairline}` }}>
                {mod.sensitive && <span title="Sensitive">{I.lock(t.coral, 13)}</span>}
                <span style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: t.ink, lineHeight: 1.15 }}>{mod.label}</span>
              </div>
              {cols.map((c) => {
                const lvl = F2_MATRIX[c.id][ri];
                return (
                  <div key={c.id} style={{ height: 46, borderTop: `1px solid ${t.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
                    <Bars t={t} lvl={lvl} />
                    {(lvl === 'hh' || lvl === 'sc') && <span style={{ fontFamily: OK_FONT, fontSize: 8, fontWeight: 700, color: t.warning, textTransform: 'uppercase', letterSpacing: 0.2 }}>{lvl === 'hh' ? 'H-only' : 'Scoped'}</span>}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <Pad style={{ paddingTop: 14, paddingBottom: 18 }}>
        <Card t={t} pad={13}>
          <div style={{ fontFamily: OK_FONT, fontSize: 12, fontWeight: 700, color: t.slate, marginBottom: 10 }}>How to read it</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 16px' }}>
            {[0, 1, 2, 3].map((lvl) => (
              <div key={lvl} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Bars t={t} lvl={lvl} /><span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate }}>{LEVELS[lvl].label}</span></div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>{I.lock(t.coral, 13)}<span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate }}>Sensitive · most-restrictive by default for non-guardians</span></div>
        </Card>
        <Spacer h={14} />
        <Btn t={t} kind="outline" icon={I.gear(t.teal500, 18)} onClick={() => go('roleEditor')}>Edit a role’s access</Btn>
      </Pad>
    </Screen>
  );
}

/* ════════ ROLE EDITOR — per-module levels for one role ════════ */
function RoleEditor({ t, platform, go, back, rid = 'carer' }) {
  const role = F2_ROLES.find((r) => r.id === rid) || F2_ROLES.find((r) => r.id === 'carer');
  const row = F2_MATRIX[rid] || F2_MATRIX.carer;
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} />
      <Pad style={{ paddingTop: 2, paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <RoleBadge t={t} role={role.name} />
          <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted }}>default scope</span>
        </div>
        <H1 t={t} style={{ fontSize: 23 }}>{role.name} access</H1>
        <Lead t={t} style={{ marginTop: 7, marginBottom: 16 }}>{role.blurb} Tap a module to change its level.</Lead>
        <ListGroup t={t}>
          {F2_MODULES.map((mod, i) => (
            <ListRow key={mod.id} t={t}
              icon={mod.sensitive ? I.lock(t.coral, 17) : <span style={{ width: 7, height: 7, borderRadius: '50%', background: levelColor(t, row[i]) }} />}
              iconBg={mod.sensitive ? t.panelCoral : 'transparent'}
              label={mod.label}
              sub={mod.sensitive ? 'Sensitive · private by default' : null}
              right={<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><AccessLevel t={t} lvl={row[i]} />{I.chevR(t.muted, 16)}</div>}
              onClick={() => go('moduleSheet')}
              last={i === F2_MODULES.length - 1}
            />
          ))}
        </ListGroup>
        <Spacer h={14} />
        <Banner t={t} tone="info" icon={I.shield(t.teal700, 17)}>Changes to sensitive modules are confirmed and written to the audit log with their previous value.</Banner>
      </Pad>
    </Screen>
  );
}

/* ════════ MODULE SHEET — pick a level (bottom sheet) ════════ */
function ModuleSheet({ t, platform, go, back }) {
  const [lvl, setLvl] = React.useState(2);
  const opts = [
    { v: 0, desc: 'No access. The module is hidden.' },
    { v: 1, desc: 'Can see entries but not change them.' },
    { v: 2, desc: 'Can add and edit their own entries.' },
    { v: 3, desc: 'Full control, including others’ entries.' },
  ];
  return (
    <Screen t={t} platform={platform} bg={t.name === 'light' ? 'rgba(14,58,64,.32)' : 'rgba(0,0,0,.5)'} noBottomInset>
      <Grow />
      <div onClick={(e) => e.stopPropagation()} style={{ background: t.surface, borderRadius: '22px 22px 0 0', padding: '20px 20px 30px', boxShadow: t.shadow }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div style={{ fontFamily: OK_FONT, fontSize: 18, fontWeight: 700, color: t.ink }}>Calendar</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, marginTop: 2 }}>Access for <b style={{ color: t.ink }}>Carer</b></div>
          </div>
          <button onClick={back} style={{ border: 'none', background: t.surfaceAlt, borderRadius: 9, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{I.chevR(t.slate, 18)}</button>
        </div>
        <Spacer h={14} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {opts.map((o) => {
            const on = lvl === o.v;
            return (
              <button key={o.v} onClick={() => setLvl(o.v)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', padding: '13px 14px', borderRadius: 13, cursor: 'pointer', background: on ? t.panelTeal : t.surfaceAlt, border: `1.5px solid ${on ? t.teal500 : 'transparent'}` }}>
                <Bars t={t} lvl={o.v} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>{LEVELS[o.v].label}</div>
                  <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 1 }}>{o.desc}</div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${on ? t.teal500 : t.hairline}`, background: on ? t.teal500 : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && I.check('#fff', 13)}</div>
              </button>
            );
          })}
        </div>
        <Spacer h={16} />
        <Btn t={t} kind="primary" onClick={back}>Save</Btn>
      </div>
    </Screen>
  );
}

/* ════════ CHILD / TEEN RESTRICTIONS + CONSENT ════════ */
function ChildRestrictions({ t, platform, go, back }) {
  const offByDefault = [
    { label: 'Expenses', icon: I.doc },
    { label: 'Documents', icon: I.doc },
    { label: 'Household settings', icon: I.gear },
  ];
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} />
      <Pad style={{ paddingTop: 2, paddingBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 14 }}>
          <Avatar color="#2E8C5A" name="M" size={44} ring={t.surface} />
          <div>
            <div style={{ fontFamily: OK_FONT, fontSize: 16.5, fontWeight: 700, color: t.ink }}>Max Reuter</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted }}>Age 8 · Child</div>
          </div>
        </div>
        <H1 t={t} style={{ fontSize: 23 }}>Safe by default</H1>
        <Lead t={t} style={{ marginTop: 7, marginBottom: 18 }}>Max can join in without seeing things that aren’t for him. You stay in control of every change.</Lead>

        <div style={{ background: t.panelBlue, borderRadius: 14, padding: '14px 15px', borderLeft: `3px solid ${t.blue}`, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>{I.shield(t.blue, 18)}<span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.subhead }}>Guardian consent: Anna</span></div>
          <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.5 }}>GDPR-K applies. Max’s data is only ever used within this consent. Nothing widens without you.</div>
        </div>

        <Kicker t={t} style={{ margin: '0 4px 8px' }}>Off by default</Kicker>
        <ListGroup t={t} style={{ marginBottom: 16 }}>
          {offByDefault.map((o, i) => (
            <ListRow key={o.label} t={t} icon={o.icon(t.muted, 18)} iconBg={t.surfaceAlt} label={o.label}
              right={<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted }}>Needs you</span><span title="Locked">{I.lock(t.muted, 16)}</span></div>}
              last={i === offByDefault.length - 1} />
          ))}
        </ListGroup>

        <Kicker t={t} style={{ margin: '0 4px 8px' }}>Kept safe</Kicker>
        <Card t={t} style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>{I.shield(t.green, 18)}<div><div style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.ink }}>Messaging stays in the household</div><div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 2 }}>Max can’t message anyone outside, and can’t change that.</div></div></div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>{I.home(t.green, 18)}<div><div style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.ink }}>Location is scoped</div><div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 2 }}>Shared with guardians only, never precise to others.</div></div></div>
        </Card>

        <Banner t={t} tone="warning" icon={I.lock(t.warning, 17)}>Widening any of Max’s access needs a fresh check from you, and is recorded in the log.</Banner>
      </Pad>
    </Screen>
  );
}

Object.assign(window, { PermissionMatrix, RoleEditor, ModuleSheet, ChildRestrictions });

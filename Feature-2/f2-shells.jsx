/* OmniKin · Feature 2 — version shells (A: Settings-based · B: Home-based), hubs, registry. */
const {
  OK_FONT, OK_MONO, I, Screen, Btn, Banner,
  Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, AvatarStack, RoleBadge, StatusChip, Card, ListGroup, ListRow, SegTabs, MemberRow,
  F2_MEMBERS, F2_PENDING, F2_AUDIT,
} = window;

/* ───────── bottom tab bar ───────── */
function TabBar({ t, platform, tabs, go }) {
  return (
    <div style={{ display: 'flex', borderTop: `1px solid ${t.hairline}`, background: t.surface, paddingTop: 8, paddingBottom: platform === 'ios' ? 22 : 14, flex: '0 0 auto' }}>
      {tabs.map(([label, icon, active, target]) => (
        <button key={label} onClick={() => target && go(target)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: 'none', background: 'transparent', cursor: target ? 'pointer' : 'default', position: 'relative' }}>
          {icon(active ? t.teal700 : t.muted, 22)}
          <span style={{ fontFamily: OK_FONT, fontSize: 10, fontWeight: active ? 700 : 500, color: active ? t.teal700 : t.muted }}>{label}</span>
          {active && <span style={{ position: 'absolute', top: -8, width: 5, height: 5, borderRadius: '50%', background: t.coral }} />}
        </button>
      ))}
    </div>
  );
}

/* ───────── empty-state hero (clear / first-arrival surfaces) ───────── */
function EmptyHero({ t, icon, title, sub }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 14px 22px' }}>
      <div style={{ width: 74, height: 74, borderRadius: 22, background: t.panelTeal, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontFamily: OK_FONT, fontSize: 18, fontWeight: 800, color: t.title, letterSpacing: -0.2, marginTop: 14 }}>{title}</div>
      <div style={{ fontFamily: OK_FONT, fontSize: 13.5, color: t.slate, lineHeight: 1.5, marginTop: 7, maxWidth: 290, marginLeft: 'auto', marginRight: 'auto' }}>{sub}</div>
    </div>
  );
}

/* ───────── shared home dashboard (variant A / B) ───────── */
function HomeBase({ t, platform, go, variant }) {
  const members = F2_MEMBERS;
  const tilesA = [['Home', I.home, false], ['Calendar', I.cal, false], ['Lists', I.list, false], ['Docs', I.doc, false], ['Settings', I.gear, true, 'settingsList']];
  const tilesB = [['Home', I.home, true], ['Calendar', I.cal, false], ['People', I.user, false, 'peopleHub'], ['Lists', I.list, false], ['Settings', I.gear, false, 'settingsList']];
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Pad style={{ paddingTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, fontWeight: 500 }}>Your household</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 24, fontWeight: 700, color: t.title, letterSpacing: -0.4 }}>Reuter Family</div>
            </div>
            <Avatar color="#1C6E78" name="A" size={42} ring={t.surface} />
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: t.panelGreen, padding: '5px 11px', borderRadius: 999, marginTop: 10 }}>{I.shield(t.green, 13)}<span style={{ fontFamily: OK_FONT, fontSize: 12, fontWeight: 700, color: t.green }}>You’re the Owner</span></div>
        </Pad>
        <Spacer h={18} />

        {/* members card — the differentiating entry point */}
        <Pad>
          <Card t={t} pad={16}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink }}>Members · {members.length}</span>
              {variant === 'B'
                ? <button onClick={() => go('peopleHub')} style={{ border: 'none', background: t.panelTeal, color: t.teal800, fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 700, borderRadius: 999, padding: '6px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>Manage {I.chevR(t.teal700, 14)}</button>
                : <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>Each has their own login</span>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {members.slice(0, 4).map((m) => (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '6px 0' }}>
                  <Avatar color={m.c} name={m.n} size={34} ring={t.surface} />
                  <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.ink }}>{m.full}{m.you ? ' · You' : ''}</span>
                  <RoleBadge t={t} role={m.role} size="sm" />
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginTop: 6, paddingTop: 10, borderTop: `1px solid ${t.hairline}` }}>
                <AvatarStack t={t} members={members.slice(4)} size={30} />
                <span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 12.5, color: t.muted }}>+ Sofia, Max and more</span>
                {variant === 'A'
                  ? <Link t={t} onClick={() => go('settingsList')} style={{ fontSize: 13 }}>In Settings →</Link>
                  : <Link t={t} onClick={() => go('peopleHub')} style={{ fontSize: 13 }}>See all →</Link>}
              </div>
            </div>
          </Card>
        </Pad>
        <Spacer h={16} />
        <Pad>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['Calendar', I.cal, t.teal700, t.panelTeal], ['Lists', I.list, t.blue, t.panelBlue], ['Documents', I.doc, t.coral, t.panelCoral, true], ['Settings', I.gear, t.green, t.panelGreen]].map(([label, icon, color, bg, lock]) => (
              <button key={label} onClick={() => label === 'Settings' ? go('settingsList') : null} style={{ border: `1px solid ${t.hairline}`, background: t.surface, borderRadius: 16, padding: 15, height: 90, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: t.shadowSm, cursor: label === 'Settings' ? 'pointer' : 'default', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon(color, 20)}</div>
                  {lock && I.lock(t.muted, 15)}
                </div>
                <span style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{label}</span>
              </button>
            ))}
          </div>
        </Pad>
        <Spacer h={16} />
      </div>
      <TabBar t={t} platform={platform} tabs={variant === 'B' ? tilesB : tilesA} go={go} />
    </Screen>
  );
}
const HomeA = (p) => <HomeBase {...p} variant="A" />;
const HomeB = (p) => <HomeBase {...p} variant="B" />;

/* ════════ VERSION A · Settings list ════════ */
function SettingsList({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} scroll>
      <Pad style={{ paddingTop: 12, paddingBottom: 22 }}>
        <H1 t={t}>Settings</H1>
        <Spacer h={18} />

        <ListGroup t={t} title="Account" style={{ marginBottom: 18 }}>
          <ListRow t={t} icon={<Avatar color="#1C6E78" name="A" size={32} />} iconBg="transparent" label="Anna Reuter" sub="anna.reuter@email.de" onClick={() => {}} last />
        </ListGroup>

        <ListGroup t={t} title="Household" style={{ marginBottom: 18 }}>
          <ListRow t={t} icon={I.user(t.teal700, 18)} label="Members & roles" sub={`${F2_MEMBERS.length} members · ${F2_PENDING.length} pending`} onClick={() => go('householdA')} />
          <ListRow t={t} icon={I.lock(t.teal700, 18)} label="Roles & permissions" sub="Who can see and do what" onClick={() => go('permissionMatrix')} />
          <ListRow t={t} icon={I.shield(t.teal700, 18)} label="Ownership" sub="Anna · 1 co-owner" onClick={() => go('addCoOwner')} />
          <ListRow t={t} icon={I.home(t.teal700, 18)} label="Extended & co-parenting" sub="Grandparents, carers, two homes" onClick={() => go('extendedRoles')} />
          <ListRow t={t} icon={I.doc(t.teal700, 18)} label="Activity log" sub="Every change, owner-visible" onClick={() => go('auditLog')} last />
        </ListGroup>

        <ListGroup t={t} title="App">
          <ListRow t={t} icon={I.shield(t.slate, 18)} iconBg={t.surfaceAlt} label="Privacy" onClick={() => {}} />
          <ListRow t={t} icon={I.gear(t.slate, 18)} iconBg={t.surfaceAlt} label="Notifications" onClick={() => {}} last />
        </ListGroup>
      </Pad>
    </Screen>
  );
}

/* ════════ VERSION A · Household hub (settings style) ════════ */
function HouseholdA({ t, platform, go, back, empty }) {
  const members = empty ? F2_MEMBERS.filter((m) => m.you) : F2_MEMBERS;
  const pending = empty ? [] : F2_PENDING;
  return (
    <Screen t={t} platform={platform} scroll>
      <Pad style={{ paddingTop: 12, paddingBottom: 22 }}>
        <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4, fontFamily: OK_FONT, fontSize: 14, color: t.slate }}>{I.back(t.slate)} Settings</button>
        <H1 t={t}>Members & roles</H1>
        <Lead t={t} style={{ marginTop: 7, marginBottom: 18 }}>{empty ? 'It’s just you in the Reuter Family so far. Invite the people who help run your home.' : 'Everyone in the Reuter Family, and what’s still pending.'}</Lead>

        {empty && <EmptyHero t={t} icon={I.user(t.teal700, 28)} title="No one else has joined yet" sub="Each member you invite joins with their own login, role and private view. Nothing leaves your household." />}

        <Btn t={t} kind="primary" icon={I.plus('#fff', 18)} onClick={() => go('inviteRole')} style={{ marginBottom: 20 }}>Invite a member</Btn>

        <Kicker t={t} style={{ margin: '0 4px 8px' }}>Active · {members.length}</Kicker>
        <ListGroup t={t} style={{ marginBottom: 18 }}>
          {members.map((m, i) => (
            <div key={m.id} style={{ padding: '0 15px', borderBottom: i === members.length - 1 ? 'none' : `1px solid ${t.hairline}` }}>
              <MemberRow t={t} m={m} onClick={() => go(m.role === 'Teen' || m.role === 'Child' ? 'memberDetailTeen' : 'memberDetail')} />
            </div>
          ))}
        </ListGroup>

        <Kicker t={t} style={{ margin: '0 4px 8px' }}>Pending invitations · {pending.length}</Kicker>
        <ListGroup t={t}>
          {pending.length ? pending.map((p, i) => (
            <ListRow key={p.id} t={t}
              icon={(p.channel === 'email' ? I.mail : p.channel === 'sms' ? I.phone : I.shield)(t.slate, 18)} iconBg={t.surfaceAlt}
              label={p.name} sub={`${p.to} · ${p.role} · ${p.expires}`}
              right={<StatusChip t={t} status={p.status} />}
              onClick={() => go('inviteSent')} last={i === pending.length - 1} />
          )) : (
            <div style={{ padding: '16px 15px', fontFamily: OK_FONT, fontSize: 13.5, color: t.muted, textAlign: 'center' }}>No pending invitations yet.</div>
          )}
        </ListGroup>
      </Pad>
    </Screen>
  );
}

/* ════════ VERSION B · People hub (bold, tabbed) ════════ */
function PeopleHub({ t, platform, go, back, tab: tab0 = 'members', empty }) {
  const [tab, setTab] = React.useState(tab0);
  const hero = t.name === 'light' ? t.teal700 : t.teal900;
  const members = empty ? F2_MEMBERS.filter((m) => m.you) : F2_MEMBERS;
  const pending = empty ? [] : F2_PENDING;
  const audit = empty ? [] : F2_AUDIT;
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* bold header */}
        <div style={{ background: hero, padding: '8px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back('#fff')}</button>
            <button onClick={() => go('auditLog')} style={{ border: 'none', background: 'rgba(255,255,255,.14)', borderRadius: 999, padding: '6px 12px', cursor: 'pointer', fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>{I.doc('#fff', 15)} Activity</button>
          </div>
          <div style={{ fontFamily: OK_FONT, fontSize: 25, fontWeight: 700, color: '#fff', letterSpacing: -0.4, marginTop: 8 }}>People</div>
          <div style={{ fontFamily: OK_FONT, fontSize: 13.5, color: 'rgba(255,255,255,.82)', marginTop: 3 }}>Reuter Family · you’re the Owner</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
            <AvatarStack t={{ ...t, surface: hero }} members={members} size={34} max={6} />
            <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: 'rgba(255,255,255,.8)' }}>{empty ? 'Just you so far · invite your family' : `${members.length} members · ${pending.length} pending`}</span>
          </div>
        </div>

        {/* tabs */}
        <div style={{ padding: '14px 20px 0', position: 'sticky', top: 0, background: t.bg, zIndex: 3 }}>
          <SegTabs t={t} value={tab} onChange={setTab} tabs={[{ id: 'members', label: 'Members' }, { id: 'invites', label: 'Invites' }, { id: 'perms', label: 'Access' }, { id: 'activity', label: 'Activity' }]} />
        </div>

        <Pad style={{ paddingTop: 16, paddingBottom: 24 }}>
          {tab === 'members' && (
            <React.Fragment>
              {empty && <EmptyHero t={t} icon={I.user(t.teal700, 30)} title="It’s just you so far" sub="No one else has joined Reuter Family yet. Invite the people who help run your home and each joins with their own login, role and private view." />}
              <Btn t={t} kind="primary" icon={I.plus('#fff', 18)} onClick={() => go('inviteRole')} style={{ marginBottom: 16 }}>Invite a member</Btn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {members.map((m) => (
                  <Card key={m.id} t={t} pad={13} onClick={() => go(m.role === 'Teen' || m.role === 'Child' ? 'memberDetailTeen' : 'memberDetail')} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar color={m.c} name={m.n} size={44} ring={t.surface} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>{m.full}{m.you ? ' · You' : ''}</div>
                      <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2 }}>{m.last}</div>
                    </div>
                    <RoleBadge t={t} role={m.role} />
                  </Card>
                ))}
              </div>
            </React.Fragment>
          )}
          {tab === 'invites' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {empty && <EmptyHero t={t} icon={I.mail(t.teal700, 28)} title="No invitations yet" sub="When you invite someone, it appears here with its status until they join." />}
              {pending.map((p) => (
                <Card key={p.id} t={t} pad={14} onClick={() => go('inviteSent')} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{(p.channel === 'email' ? I.mail : p.channel === 'sms' ? I.phone : I.shield)(t.slate, 18)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>{p.name}</div>
                    <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.role} · {p.to} · {p.expires}</div>
                  </div>
                  <StatusChip t={t} status={p.status} />
                </Card>
              ))}
              <Btn t={t} kind="outline" icon={I.plus(t.teal500, 18)} onClick={() => go('inviteRole')} style={{ marginTop: 4 }}>New invitation</Btn>
            </div>
          )}
          {tab === 'perms' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Card t={t} pad={16} onClick={() => go('permissionMatrix')} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{I.lock(t.teal700, 21)}</div>
                <div style={{ flex: 1 }}><div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>Permission matrix</div><div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 2 }}>What each role can do, at a glance</div></div>
                {I.chevR(t.muted, 18)}
              </Card>
              <Card t={t} pad={16} onClick={() => go('childRestrictions')} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: t.panelBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{I.shield(t.blue, 21)}</div>
                <div style={{ flex: 1 }}><div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>Children’s safety</div><div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 2 }}>Age-appropriate access & consent</div></div>
                {I.chevR(t.muted, 18)}
              </Card>
              <Card t={t} pad={16} onClick={() => go('coParentSetup')} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{I.home(t.green, 21)}</div>
                <div style={{ flex: 1 }}><div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>Co-parenting space</div><div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 2 }}>Neutral sharing across two homes</div></div>
                {I.chevR(t.muted, 18)}
              </Card>
            </div>
          )}
          {tab === 'activity' && (empty ? (
            <EmptyHero t={t} icon={I.doc(t.teal700, 28)} title="No activity yet" sub="Every change to members, roles and permissions appears here, visible to owners and tamper-evident." />
          ) : (
            <React.Fragment>
              <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden' }}>
                {F2_AUDIT.slice(0, 4).map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: 11, padding: '13px 14px', borderBottom: i === 3 ? 'none' : `1px solid ${t.hairline}` }}>
                    <Avatar color={a.c} name={a.who} size={32} ring={t.surface} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: OK_FONT, fontSize: 13.5, color: t.ink, lineHeight: 1.4 }}><b>{a.who}</b> · {a.action.toLowerCase()} <span style={{ color: t.slate }}>{a.target}</span></div>
                      <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 2 }}>{a.when}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Btn t={t} kind="outline" onClick={() => go('auditLog')} style={{ marginTop: 14 }}>Open full activity log</Btn>
            </React.Fragment>
          ))}
        </Pad>
      </div>
    </Screen>
  );
}

Object.assign(window, { HomeA, HomeB, SettingsList, HouseholdA, PeopleHub, TabBar });

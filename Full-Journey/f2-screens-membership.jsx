/* OmniKin · Feature 2 — membership lifecycle flows (shared by both versions). */
const {
  OK_FONT, OK_MONO, I, Screen, FlowHeader, Btn, Field, Banner,
  Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, RoleBadge, StatusChip, Card, RoleTile, QR, AccessLevel,
  F2_ROLES, F2_MEMBERS,
} = window;

/* ════════ INVITE · step 1 — choose role ════════ */
function InviteRole({ t, platform, go, back }) {
  const [sel, setSel] = React.useState('carer');
  const order = ['guardian', 'adult', 'teen', 'child', 'grandparent', 'relative', 'carer', 'guest'];
  const roles = order.map((id) => F2_ROLES.find((r) => r.id === id));
  const minor = sel === 'teen' || sel === 'child';
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} n={3} i={0} />
      <Pad style={{ paddingTop: 4, paddingBottom: 18 }}>
        <Kicker t={t}>Invite a member</Kicker>
        <H1 t={t} style={{ marginTop: 8 }}>Who are you adding?</H1>
        <Lead t={t} style={{ marginTop: 8, marginBottom: 18 }}>Pick a role first. It sets sensible defaults for what they can see, and travels with the invite so it can’t be changed in transit.</Lead>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {roles.map((r) => <RoleTile key={r.id} t={t} role={r} selected={sel === r.id} onClick={() => setSel(r.id)} />)}
        </div>
        <Spacer h={16} />
        <Btn t={t} kind="primary" onClick={() => go(minor ? 'inviteChild' : 'inviteChannel')}>Continue</Btn>
      </Pad>
    </Screen>
  );
}

/* ════════ INVITE · child age + GDPR-K ════════ */
function InviteChild({ t, platform, go, back }) {
  const [age, setAge] = React.useState('8');
  const n = parseInt(age, 10);
  const underK = !isNaN(n) && n < 13;
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} n={3} i={0} />
      <Pad style={{ paddingTop: 4, paddingBottom: 18 }}>
        <Kicker t={t}>Invite a child</Kicker>
        <H1 t={t} style={{ marginTop: 8 }}>How old is your child?</H1>
        <Lead t={t} style={{ marginTop: 8, marginBottom: 18 }}>Age sets the right protections automatically. Younger children get the most careful defaults.</Lead>
        <Field t={t} label="Child’s age" value={age} onChange={(v) => setAge(v.replace(/\D/g, '').slice(0, 2))} icon={I.user(t.teal500, 19)} helper="Used only to apply the correct safeguards" />
        <Spacer h={16} />
        {underK ? (
          <div style={{ background: t.panelBlue, borderRadius: 14, padding: '15px 16px', borderLeft: `3px solid ${t.blue}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>{I.shield(t.blue, 18)}<span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.subhead }}>Why we ask for age</span></div>
            <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.5 }}>Children under 13 are covered by GDPR-K. You, as their guardian, give consent on their behalf and stay in control of what they can do. Nothing is processed beyond that consent.</div>
          </div>
        ) : (
          <Banner t={t} tone="info" icon={I.shield(t.teal700, 17)}>A teen account keeps expenses, documents and precise location off by default. You can widen access later.</Banner>
        )}
        <Spacer h={18} />
        <Btn t={t} kind="primary" onClick={() => go('inviteChannel')}>{underK ? 'Give consent & continue' : 'Continue'}</Btn>
      </Pad>
    </Screen>
  );
}

/* ════════ INVITE · step 2 — channel ════════ */
function ChannelOpt({ t, icon, title, sub, on, onClick }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left', padding: '14px 15px', borderRadius: 14, cursor: 'pointer', background: on ? t.panelTeal : t.surface, border: `1.5px solid ${on ? t.teal500 : t.hairline}`, transition: 'all .15s' }}>
      <div style={{ width: 40, height: 40, borderRadius: 11, background: on ? t.surface : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>{title}</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${on ? t.teal500 : t.hairline}`, background: on ? t.teal500 : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && I.check('#fff', 13)}</div>
    </button>
  );
}
function InviteChannel({ t, platform, go, back }) {
  const [ch, setCh] = React.useState('email');
  const [val, setVal] = React.useState('sofia.adeyemi@email.de');
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} n={3} i={1} />
      <Pad style={{ paddingTop: 4, paddingBottom: 18 }}>
        <Kicker t={t}>Invite a member</Kicker>
        <H1 t={t} style={{ marginTop: 8 }}>How should we send it?</H1>
        <Lead t={t} style={{ marginTop: 8, marginBottom: 18 }}>The invite carries the <b style={{ color: t.ink }}>Carer</b> role and expires in 7 days.</Lead>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ChannelOpt t={t} icon={I.mail(ch === 'email' ? t.teal700 : t.slate)} title="Email" sub="Best when you have their address" on={ch === 'email'} onClick={() => setCh('email')} />
          <ChannelOpt t={t} icon={I.phone(ch === 'sms' ? t.teal700 : t.slate)} title="Phone (SMS)" sub="No email needed, works on any phone" on={ch === 'sms'} onClick={() => setCh('sms')} />
          <ChannelOpt t={t} icon={I.shield(ch === 'link' ? t.teal700 : t.slate, 20)} title="Single-use link / QR" sub="Hand it over in person" on={ch === 'link'} onClick={() => setCh('link')} />
        </div>
        <Spacer h={16} />
        {ch === 'email' && <Field t={t} label="Email address" value={val} onChange={setVal} icon={I.mail(t.teal500)} type="email" valid={/.+@.+\..+/.test(val)} />}
        {ch === 'sms' && <Field t={t} label="Phone number" value="+254 712 345 678" onChange={() => {}} icon={I.phone(t.teal500)} />}
        {ch === 'link' && <Banner t={t} tone="info" icon={I.shield(t.teal700, 17)}>We’ll generate a single-use link and QR. It only works once, and only for the Carer role.</Banner>}
        <Spacer h={18} />
        <Btn t={t} kind="primary" onClick={() => go(ch === 'link' ? 'inviteLink' : 'inviteSent')}>{ch === 'link' ? 'Create link & QR' : 'Send invitation'}</Btn>
      </Pad>
    </Screen>
  );
}

/* ════════ INVITE · single-use link + QR ════════ */
function InviteLink({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform}>
      <FlowHeader t={t} onBack={back} n={3} i={2} />
      <Pad style={{ paddingTop: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Kicker t={t}>Single-use invite</Kicker>
        <H1 t={t} style={{ marginTop: 8 }}>Scan to join</H1>
        <Lead t={t} style={{ marginTop: 8, marginBottom: 4 }}>Let them scan this with their camera. It works once, then it’s spent.</Lead>
        <Grow />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <QR t={t} size={176} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <RoleBadge t={t} role="Carer" />
            <span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.muted }}>·</span>
            <span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate }}>Expires in 7 days</span>
          </div>
        </div>
        <Grow />
        <Card t={t} pad={12} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ flex: 1, fontFamily: OK_MONO, fontSize: 13, color: t.slate, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>omnikin.app/join/8FK2-9Q7X</span>
          <button style={{ border: 'none', background: t.panelTeal, color: t.teal800, fontFamily: OK_FONT, fontSize: 13, fontWeight: 700, borderRadius: 9, padding: '8px 12px', cursor: 'pointer' }}>Copy</button>
        </Card>
        <Spacer h={12} />
        <Btn t={t} kind="primary" onClick={() => go('inviteSent')}>Share link</Btn>
        <Spacer h={14} />
      </Pad>
    </Screen>
  );
}

/* ════════ INVITE · sent + status tracker ════════ */
function Track({ t, label, state }) {
  const done = state === 'done', active = state === 'active';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 26, height: 26, borderRadius: '50%', flex: '0 0 auto', background: done ? t.green : active ? t.teal700 : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: active ? `0 0 0 4px ${t.panelTeal}` : 'none' }}>
        {done ? I.check('#fff', 14) : <span style={{ width: 8, height: 8, borderRadius: '50%', background: active ? '#fff' : t.muted }} />}
      </div>
      <span style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: active || done ? 600 : 500, color: done || active ? t.ink : t.muted }}>{label}</span>
    </div>
  );
}
function InviteSent({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform}>
      <FlowHeader t={t} onBack={back} />
      <Pad style={{ paddingTop: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ width: 60, height: 60, borderRadius: 18, background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>{I.checkCircle(t.green, 32)}</div>
        <H1 t={t}>Invitation sent</H1>
        <Lead t={t} style={{ marginTop: 8, marginBottom: 22 }}>We’ve invited <b style={{ color: t.ink }}>Sofia</b> as a Carer. You’ll see it move along as she opens and accepts.</Lead>
        <Card t={t} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Track t={t} label="Sent" state="done" />
          <div style={{ marginLeft: 12, width: 2, height: 4, background: t.hairline, marginTop: -12, marginBottom: -12 }} />
          <Track t={t} label="Opened" state="active" />
          <div style={{ marginLeft: 12, width: 2, height: 4, background: t.hairline, marginTop: -12, marginBottom: -12 }} />
          <Track t={t} label="Accepted & joined" state="todo" />
        </Card>
        <Spacer h={16} />
        <Banner t={t} tone="info" icon={I.shield(t.teal700, 17)}>Every invite is recorded in your activity log. You can resend or revoke it any time.</Banner>
        <Grow />
        <div style={{ display: 'flex', gap: 11 }}>
          <Btn t={t} kind="outline" onClick={back} style={{ color: t.error, boxShadow: `inset 0 0 0 1.5px ${t.hairline}` }}>Revoke</Btn>
          <Btn t={t} kind="primary" onClick={back}>Done</Btn>
        </div>
        <Spacer h={14} />
      </Pad>
    </Screen>
  );
}

/* ════════ ACCEPT · invitee side ════════ */
function AcceptJoin({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.name === 'light' ? t.teal700 : t.teal900}>
      <Pad style={{ paddingTop: 18, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,.14)', padding: '6px 12px', borderRadius: 999 }}>{I.shield('#fff', 14)}<span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: '#fff', fontWeight: 600 }}>You’ve been invited</span></div>
        <Grow />
        <div style={{ fontFamily: OK_FONT, fontSize: 30, fontWeight: 700, color: '#fff', letterSpacing: -0.6, lineHeight: 1.15 }}>Anna invited you to the Reuter Family</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 15.5, color: 'rgba(255,255,255,.82)', marginTop: 14, lineHeight: 1.5 }}>You’ll join with your own login. You decide nothing here that Anna didn’t already set, so you only get what your role allows.</div>
        <Spacer h={22} />
        <div style={{ background: 'rgba(255,255,255,.12)', borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 13 }}>
          <Avatar color="#E2683C" name="S" size={46} ring="rgba(255,255,255,.4)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: '#fff' }}>You’ll join as Carer</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 13, color: 'rgba(255,255,255,.8)', marginTop: 2 }}>Calendar & tasks · no finances or documents</div>
          </div>
          <span style={{ fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,.18)', padding: '3px 9px', borderRadius: 999 }}>CARER</span>
        </div>
        <Grow />
        <Btn t={t} kind="primary" onClick={() => go('home')} style={{ boxShadow: '0 8px 22px rgba(0,0,0,.25)' }}>Create account & join</Btn>
        <div style={{ textAlign: 'center', fontFamily: OK_FONT, fontSize: 13.5, color: 'rgba(255,255,255,.8)', marginTop: 12 }}>Already have OmniKin? <span onClick={() => go('home')} style={{ color: '#fff', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer' }}>Sign in to join</span></div>
        <Spacer h={16} />
      </Pad>
    </Screen>
  );
}

Object.assign(window, { InviteRole, InviteChild, InviteChannel, InviteLink, InviteSent, AcceptJoin });

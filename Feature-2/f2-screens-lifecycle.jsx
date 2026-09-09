/* OmniKin · Feature 2 — ownership, removal & audit (shared). */
const {
  OK_FONT, OK_MONO, I, Screen, FlowHeader, Btn, Banner,
  Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, RoleBadge, Card, ListGroup, ListRow,
  F2_AUDIT, F2_MEMBERS,
} = window;

/* ════════ ADD CO-OWNER (with MFA) ════════ */
function AddCoOwner({ t, platform, go, back }) {
  const isFace = platform === 'ios';
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} />
      <Pad style={{ paddingTop: 2, paddingBottom: 20 }}>
        <Kicker t={t}>Ownership</Kicker>
        <H1 t={t} style={{ marginTop: 8, fontSize: 23 }}>Share ownership</H1>
        <Lead t={t} style={{ marginTop: 7, marginBottom: 18 }}>A co-owner has equal standing to you. The household never depends on one person again.</Lead>

        <Card t={t} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <Avatar color="#3F7DA6" name="D" size={46} ring={t.surface} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: t.ink }}>David Reuter</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2 }}>Guardian · promote to Co-owner</div>
          </div>
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: t.teal700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{I.check('#fff', 13)}</span>
        </Card>

        <div style={{ background: t.surfaceAlt, borderRadius: 14, padding: '15px 16px', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>{isFace ? I.faceid(t.teal700) : I.finger(t.teal700)}<span style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>Confirm it’s you</span></div>
          <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.5 }}>Ownership changes need a fresh {isFace ? 'Face ID' : 'fingerprint'} check, then David confirms on his device too.</div>
        </div>

        <Banner t={t} tone="info" icon={I.shield(t.teal700, 17)}>Your household will always keep at least one Owner. Nothing here can leave it without one.</Banner>
        <Spacer h={18} />
        <Btn t={t} kind="primary" icon={isFace ? I.faceid('#fff') : I.finger('#fff')} onClick={() => go('coOwnerDone')}>Confirm with {isFace ? 'Face ID' : 'fingerprint'}</Btn>
        <div style={{ textAlign: 'center', marginTop: 12 }}><Link t={t} onClick={() => go('ownershipTransfer')}>Transfer sole ownership instead</Link></div>
      </Pad>
    </Screen>
  );
}

/* ════════ CO-OWNER ADDED — pending other party ════════ */
function CoOwnerDone({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform}>
      <FlowHeader t={t} onBack={back} />
      <Pad style={{ paddingTop: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ width: 60, height: 60, borderRadius: 18, background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>{I.checkCircle(t.green, 32)}</div>
        <H1 t={t}>Almost there</H1>
        <Lead t={t} style={{ marginTop: 8, marginBottom: 22 }}>You’ve confirmed. David becomes a Co-owner once he accepts on his device. We’ve let him know.</Lead>
        <Card t={t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar color="#3F7DA6" name="D" size={42} ring={t.surface} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>David Reuter</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2 }}>Waiting for his confirmation</div>
          </div>
          <span style={{ fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: t.warning, background: 'rgba(224,165,60,.14)', padding: '3px 9px', borderRadius: 999 }}>PENDING</span>
        </Card>
        <Spacer h={16} />
        <Banner t={t} tone="info" icon={I.shield(t.teal700, 17)}>Recorded in your activity log with the time and who started it.</Banner>
        <Grow />
        <Btn t={t} kind="primary" onClick={back}>Back to household</Btn>
        <Spacer h={14} />
      </Pad>
    </Screen>
  );
}

/* ════════ OWNERSHIP TRANSFER (sole) ════════ */
function OwnershipTransfer({ t, platform, go, back }) {
  const isFace = platform === 'ios';
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} />
      <Pad style={{ paddingTop: 2, paddingBottom: 20 }}>
        <Kicker t={t}>Ownership</Kicker>
        <H1 t={t} style={{ marginTop: 8, fontSize: 23 }}>Hand over ownership</H1>
        <Lead t={t} style={{ marginTop: 7, marginBottom: 18 }}>David becomes the sole Owner. You’ll keep your place in the household as a Guardian.</Lead>

        <Card t={t} style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 14 }}>
          <Avatar color="#1C6E78" name="A" size={40} ring={t.surface} />
          {I.chevR(t.muted, 18)}
          <Avatar color="#3F7DA6" name="D" size={40} ring={t.surface} />
          <div style={{ flex: 1, marginLeft: 4 }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>Anna → David</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2 }}>You step down to Guardian</div>
          </div>
        </Card>

        <div style={{ background: 'rgba(224,165,60,.12)', borderRadius: 14, padding: '14px 15px', borderLeft: `3px solid ${t.warning}`, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>{I.shield(t.warning, 18)}<span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink }}>This is a big change</span></div>
          <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.5 }}>Both of you confirm, and it needs a {isFace ? 'Face ID' : 'fingerprint'} check from you. David must accept before it takes effect.</div>
        </div>

        <Btn t={t} kind="primary" icon={isFace ? I.faceid('#fff') : I.finger('#fff')} onClick={() => go('coOwnerDone')}>Confirm transfer</Btn>
        <div style={{ textAlign: 'center', marginTop: 12 }}><Link t={t} onClick={back} style={{ color: t.slate }}>Keep ownership</Link></div>
      </Pad>
    </Screen>
  );
}

/* ════════ REMOVE / LEAVE ════════ */
function RemoveMember({ t, platform, go, back, mid = 'sofia' }) {
  const m = F2_MEMBERS.find((x) => x.id === mid) || F2_MEMBERS[5];
  const isSelf = m.you;
  return (
    <Screen t={t} platform={platform} bg={t.name === 'light' ? 'rgba(14,58,64,.32)' : 'rgba(0,0,0,.5)'} noBottomInset>
      <Grow />
      <div onClick={(e) => e.stopPropagation()} style={{ background: t.surface, borderRadius: '22px 22px 0 0', padding: '22px 20px 30px', boxShadow: t.shadow }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
          <Avatar color={m.c} name={m.n} size={64} ring={t.surface} />
          <div style={{ fontFamily: OK_FONT, fontSize: 20, fontWeight: 700, color: t.ink }}>{isSelf ? 'Leave the Reuter Family?' : `Remove ${m.n}?`}</div>
          <div style={{ fontFamily: OK_FONT, fontSize: 14, color: t.slate, lineHeight: 1.5, maxWidth: 300 }}>{isSelf ? 'You’ll lose access to this household on your next sync.' : `${m.full} loses access to the household on the next sync.`}</div>
        </div>
        <Spacer h={18} />
        <Card t={t} pad={14} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>{I.lock(t.teal700, 17)}<span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.45 }}>Access tokens are revoked right away and household content is hidden.</span></div>
          <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>{I.doc(t.teal700, 17)}<span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, lineHeight: 1.45 }}>Anything {isSelf ? 'you' : 'they'} added stays with the household, marked \u201Cformer member\u201D.</span></div>
        </Card>
        <Spacer h={18} />
        <Btn t={t} kind="teal" onClick={back} style={{ background: t.error }}>{isSelf ? 'Leave household' : `Remove ${m.n}`}</Btn>
        <Spacer h={10} />
        <Btn t={t} kind="outline" onClick={back} style={{ boxShadow: `inset 0 0 0 1.5px ${t.hairline}`, color: t.slate }}>Cancel</Btn>
      </div>
    </Screen>
  );
}

/* ════════ AUDIT LOG / ACTIVITY ════════ */
function AuditLog({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} />
      <Pad style={{ paddingTop: 2, paddingBottom: 22 }}>
        <Kicker t={t}>Owner view</Kicker>
        <H1 t={t} style={{ marginTop: 8, fontSize: 23 }}>Activity log</H1>
        <Lead t={t} style={{ marginTop: 7, marginBottom: 16 }}>Every membership and permission change, kept tamper-evident. This is your proof that privacy is real, not just promised.</Lead>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {['All', 'Members', 'Permissions'].map((f, i) => (
            <span key={f} style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 700, color: i === 0 ? '#fff' : t.slate, background: i === 0 ? t.teal700 : t.surfaceAlt, padding: '6px 13px', borderRadius: 999, cursor: 'pointer' }}>{f}</span>
          ))}
        </div>

        <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden' }}>
          {F2_AUDIT.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 15px', borderBottom: i === F2_AUDIT.length - 1 ? 'none' : `1px solid ${t.hairline}` }}>
              <Avatar color={a.c} name={a.who} size={34} ring={t.surface} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 14, color: t.ink, lineHeight: 1.4 }}><b style={{ fontWeight: 700 }}>{a.who}</b> · {a.action.toLowerCase()} <span style={{ color: t.slate }}>{a.target}</span></div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 3 }}>{a.meta}</div>
                {a.prev && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 7, background: t.surfaceAlt, borderRadius: 8, padding: '4px 9px' }}><span style={{ fontFamily: OK_MONO, fontSize: 11, color: t.muted }}>was</span><span style={{ fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 600, color: t.slate }}>{a.prev}</span></div>}
              </div>
              <span style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, whiteSpace: 'nowrap', flex: '0 0 auto' }}>{a.when}</span>
            </div>
          ))}
        </div>
        <Spacer h={14} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>{I.shield(t.muted, 15)}<span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>Full history lives in the Audit Trail feature</span></div>
      </Pad>
    </Screen>
  );
}

Object.assign(window, { AddCoOwner, CoOwnerDone, OwnershipTransfer, RemoveMember, AuditLog });

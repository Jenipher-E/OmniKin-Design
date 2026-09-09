/* OmniKin · Feature 3 — Epic 3.3.2 / 3.3.3: voice & barcode capture, offline, sync.
   Plus the view-only (read-only) member state from US-3.1.3. */
const {
  OK_FONT, OK_MONO, I, Screen, Btn, Banner,
  FI, Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, AvatarStack, Card, StorePill, StatusPill, ItemRow, Checkbox, GroupHead, ProgressBar,
  FlowTop, F3_ITEMS, F3_MEMBERS, storeBy,
} = window;

/* parsed-field chip for voice/scan results */
function ParsedField({ t, label, value, low }) {
  return (
    <div style={{ flex: 1, minWidth: 0, background: t.surface, border: `1.5px solid ${low ? t.warning : t.hairline}`, borderRadius: 13, padding: '10px 13px' }}>
      <div style={{ fontFamily: OK_FONT, fontSize: 11, fontWeight: 600, color: low ? t.warning : t.muted, marginBottom: 3, display: 'flex', alignItems: 'center', gap: 4 }}>{low && FI.alert(t.warning, 11)}{label}</div>
      <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 600, color: t.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
    </div>
  );
}

/* ───────── Voice capture (US-3.3.2) ───────── */
function VoiceCapture({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <FlowTop t={t} back={back} sub="Groceries" title="Add by voice" />
        <Pad style={{ paddingTop: 8 }}>
          <Lead t={t} style={{ marginTop: -4 }}>Say what you need in plain words. OmniKin fills in the amount and shop.</Lead>
        </Pad>
        <Spacer h={20} />
        {/* listening visual */}
        <Pad style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 96, height: 96, borderRadius: '50%', background: t.coral, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(226,104,60,.34)', animation: 'okpulse 1.8s infinite' }}>{FI.mic('#fff', 40)}</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 26, marginTop: 18 }}>
            {[10,18,24,14,22,12,20,16,24,12,18,10].map((h, i) => <span key={i} style={{ width: 3.5, height: h, borderRadius: 2, background: t.teal300 }} />)}
          </div>
          <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.muted, marginTop: 12 }}>Listening…</div>
        </Pad>
        <Spacer h={20} />
        <Pad>
          <div style={{ background: t.surfaceAlt, borderRadius: 14, padding: '13px 15px', borderLeft: `3px solid ${t.teal500}` }}>
            <div style={{ fontFamily: OK_MONO, fontSize: 11, color: t.muted, marginBottom: 5 }}>HEARD</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 16, color: t.ink, lineHeight: 1.4 }}>“Two litres of milk from REWE”</div>
          </div>
        </Pad>
        <Spacer h={16} />
        <Pad>
          <GroupHead t={t} style={{ marginBottom: 10 }}>Understood as</GroupHead>
          <div style={{ display: 'flex', gap: 9 }}>
            <ParsedField t={t} label="Item" value="Milk" />
            <ParsedField t={t} label="Quantity" value="2 L" />
          </div>
          <Spacer h={9} />
          <div style={{ display: 'flex', gap: 9 }}>
            <ParsedField t={t} label="Store" value="REWE" />
            <ParsedField t={t} label="Brand · check" value="Add a brand?" low />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: t.warning, fontFamily: OK_FONT, fontSize: 12.5, marginTop: 12, lineHeight: 1.45 }}>{FI.alert(t.warning, 15)} Low-confidence fields are flagged. Confirm before it is added.</div>
        </Pad>
        <Spacer h={16} />
      </div>
      <div style={{ padding: `14px 20px ${platform === 'ios' ? 30 : 18}px`, background: t.surface, borderTop: `1px solid ${t.hairline}`, display: 'flex', gap: 10 }}>
        <Btn t={t} kind="outline" full={false} icon={FI.mic(t.teal500, 18)} onClick={() => {}} style={{ flex: '0 0 auto', width: 54, padding: 0 }} />
        <Btn t={t} kind="primary" icon={I.check('#fff', 18)} onClick={() => go('addItem')}>Review and add</Btn>
      </div>
    </Screen>
  );
}

/* ───────── Barcode scan (US-3.3.2) ───────── */
function BarcodeScan({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg="#0E3A40" noBottomInset>
      {/* camera viewfinder */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 35%, #14525B 0%, #0E3A40 70%)' }} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', zIndex: 2 }}>
        <Pad style={{ paddingTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 38 }}>
            <button onClick={back} style={{ border: 'none', background: 'rgba(255,255,255,.16)', borderRadius: 999, padding: 8, cursor: 'pointer', display: 'flex' }}>{I.back('#fff')}</button>
            <span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: '#fff' }}>Scan a barcode</span>
            <span style={{ width: 36 }} />
          </div>
        </Pad>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 250, height: 170, position: 'relative' }}>
            {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v, h], i) => (
              <div key={i} style={{ position: 'absolute', [v]: 0, [h]: 0, width: 36, height: 36, [`border${v[0].toUpperCase()+v.slice(1)}`]: '3px solid #fff', [`border${h[0].toUpperCase()+h.slice(1)}`]: '3px solid #fff', [`border${v.slice(0,1).toUpperCase()+v.slice(1)}LeftRadius`]: 0 }} />
            ))}
            <div style={{ position: 'absolute', left: 12, right: 12, top: '50%', height: 2, background: t.coral, boxShadow: `0 0 12px ${t.coral}`, animation: 'okscan 2s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2.5, opacity: .85 }}>
              {[3,1,2,4,1,3,1,2,1,4,2,1,3,1,2,1,4,1,2,3].map((w, i) => <span key={i} style={{ width: w, height: 92, background: i % 2 ? 'transparent' : 'rgba(255,255,255,.9)' }} />)}
            </div>
          </div>
        </div>
      </div>
      {/* resolved sheet */}
      <div style={{ position: 'relative', zIndex: 3, background: t.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: `18px 20px ${platform === 'ios' ? 30 : 18}px`, boxShadow: '0 -10px 40px rgba(0,0,0,.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>{I.checkCircle(t.green, 18)}<span style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 700, color: t.green }}>Product found</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
          <div style={{ width: 52, height: 52, borderRadius: 13, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{FI.cart(t.teal700, 26)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 16.5, fontWeight: 700, color: t.ink }}>Chopped tomatoes</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
              <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate }}>Mutti · 400g can</span>
              <span style={{ fontFamily: OK_MONO, fontSize: 11, color: t.muted }}>80176852</span>
            </div>
          </div>
        </div>
        <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 12, display: 'flex', alignItems: 'center', gap: 7 }}>{FI.swap(t.muted, 14)} Brand pre-filled from the scan. Confirm before adding.</div>
        <Spacer h={16} />
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn t={t} kind="outline" onClick={() => {}}>Scan another</Btn>
          <Btn t={t} kind="primary" icon={I.check('#fff', 18)} onClick={() => go('addItem')}>Add item</Btn>
        </div>
      </div>
    </Screen>
  );
}

/* ───────── Offline cached state (US-3.3.3) ───────── */
function Offline({ t, platform, go, back }) {
  const act = F3_ITEMS.filter((i) => i.status !== 'purchased');
  const done = F3_ITEMS.filter((i) => i.status === 'purchased');
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      {/* offline status strip */}
      <div style={{ flex: '0 0 auto', background: t.statusInk === '#EAF3F3' ? t.teal900 : '#14525B', padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 9 }}>
        {I.wifiOff('#fff', 17)}<span style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>Offline · cached list</span><Grow /><span style={{ fontFamily: OK_FONT, fontSize: 11.5, color: 'rgba(255,255,255,.8)', whiteSpace: 'nowrap' }}>3 changes queued</span>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex', alignItems: 'center', gap: 3, fontFamily: OK_FONT, fontSize: 14, color: t.slate }}>{I.back(t.slate)} Shopping</button>
          </div>
          <H1 t={t} style={{ fontSize: 24, marginTop: 4 }}>Groceries</H1>
          <Spacer h={12} />
          <ProgressBar t={t} done={done.length} total={F3_ITEMS.length} />
        </Pad>
        <Spacer h={14} />
        <Pad>
          <Banner t={t} tone="offline" icon={I.wifiOff(t.info, 18)}>You can keep ticking and editing. Changes are saved on your phone and merge when the signal returns. No images are re-downloaded.</Banner>
        </Pad>
        <div style={{ background: t.surface, margin: '14px 20px 0', borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden' }}>
          {act.slice(0, 6).map((it, i) => {
            const queued = it.status === 'needed' && (i === 0 || i === 3);
            const meta = [it.brand, it.qty ? `${it.qty} ${it.unit}` : null].filter(Boolean).join('  ·  ');
            return (
              <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderBottom: i === 5 ? 'none' : `1px solid ${t.hairline}` }}>
                <Checkbox t={t} checked={queued} onClick={() => {}} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 600, color: t.ink, textDecoration: queued ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.name}</div>
                  <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{meta || 'No detail yet'}</div>
                </div>
                {queued
                  ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 10.5, fontWeight: 700, color: t.info, background: t.panelTeal, padding: '3px 8px', borderRadius: 999, whiteSpace: 'nowrap', flex: '0 0 auto' }}>{FI.clock(t.info, 11)}Queued</span>
                  : (it.status === 'soldout' ? <StatusPill t={t} status="soldout" /> : <StorePill t={t} store={it.store} size="sm" />)}
              </div>
            );
          })}
        </div>
        <Spacer h={20} />
      </div>
      <div style={{ padding: `12px 20px ${platform === 'ios' ? 30 : 18}px`, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="teal" icon={FI.sync('#fff', 18)} onClick={() => go('syncConflict')}>Reconnect and sync</Btn>
      </div>
    </Screen>
  );
}

/* ───────── Sync conflict resolution (US-3.3.3) ───────── */
function SyncConflict({ t, platform, go, back }) {
  const [pick, setPick] = React.useState('mine');
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: '0 0 auto', background: t.panelGreen, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 9 }}>
          {I.checkCircle(t.green, 17)}<span style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: t.green }}>Back online · 3 changes merged</span>
        </div>
        <FlowTop t={t} back={back} title="One thing to confirm" sub="Sync" />
        <Pad style={{ paddingTop: 4 }}>
          <Lead t={t}>Most of your offline changes merged on their own. Two people edited the same item, so pick which to keep.</Lead>
        </Pad>
        <Spacer h={18} />
        <Pad>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{FI.cart(t.teal700, 16)}</div>
            <span style={{ fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: t.ink }}>Penne pasta</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['mine', 'Fabian', SHOPPER_C(), 'You, offline', '2 × 500g · Netto', 'just now'], ['theirs', 'Jeni', '#1C6E78', 'On another device', '3 × 500g · Netto', '2 min ago']].map(([id, who, c, dev, val, when]) => {
              const on = pick === id;
              return (
                <button key={id} onClick={() => setPick(id)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', padding: '14px 15px', borderRadius: 15, cursor: 'pointer', background: on ? t.panelTeal : t.surface, border: `1.5px solid ${on ? t.teal500 : t.hairline}` }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${on ? t.teal500 : t.hairline}`, background: on ? t.teal500 : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{on && I.check('#fff', 13)}</span>
                  <Avatar color={c} name={who} size={36} ring={t.surface} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>{val}</div>
                    <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 2 }}>{who} · {dev} · {when}</div>
                  </div>
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: t.muted, fontFamily: OK_FONT, fontSize: 12, marginTop: 12, lineHeight: 1.45 }}>{I.shield(t.muted, 15)} Nothing is overwritten silently. Both versions are kept until you choose.</div>
        </Pad>
        <Spacer h={16} />
      </div>
      <div style={{ padding: `14px 20px ${platform === 'ios' ? 30 : 18}px`, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" icon={I.check('#fff', 18)} onClick={() => go('listA')}>Keep this version</Btn>
      </div>
    </Screen>
  );
}
function SHOPPER_C() { return '#3F7DA6'; }

/* ───────── View-only (read-only) member state — US-3.1.3 ───────── */
function ReadOnly({ t, platform, go, back }) {
  const act = F3_ITEMS.filter((i) => i.status !== 'purchased').slice(0, 6);
  const renate = F3_MEMBERS.find((m) => m.right === 'view');
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex', alignItems: 'center', gap: 3, fontFamily: OK_FONT, fontSize: 14, color: t.slate }}>{I.back(t.slate)} Shopping</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Avatar color={renate.c} name={renate.n} size={26} /><span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted }}>Oma Renate’s view</span></div>
          </div>
          <H1 t={t} style={{ fontSize: 24, marginTop: 4 }}>Groceries</H1>
          <Spacer h={12} />
          <Banner t={t} tone="info" icon={I.lock(t.info, 18)}>You can see this list but not change it. Your household role is view-only. Ask Jeni for edit access.</Banner>
        </Pad>
        <div style={{ background: t.surface, margin: '14px 20px 0', borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden' }}>
          {act.map((it, i) => <ItemRow key={it.id} t={t} item={it} readOnly last={i === act.length - 1} />)}
        </div>
        <Pad style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: t.muted, fontFamily: OK_FONT, fontSize: 12.5, padding: '0 2px' }}>{I.lock(t.muted, 14)} Checkboxes are disabled in view-only mode.</div>
        </Pad>
        <Spacer h={20} />
      </div>
    </Screen>
  );
}

Object.assign(window, { VoiceCapture, BarcodeScan, Offline, SyncConflict, ReadOnly, ParsedField });

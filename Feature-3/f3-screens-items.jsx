/* OmniKin · Feature 3 — shared item & list-management screens (Epic 3.1).
   Add item, item detail, create/share list, categories, staples, archive, per-list settings. */
const {
  OK_FONT, OK_MONO, I, Screen, Btn, Field, Banner,
  FI, Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, AvatarStack, Card, StorePill, StatusPill, SourceTag, Checkbox, QtyStepper,
  StoreToggleRow, GroupHead, ParkedBadge, EmptyState, PrivacyLine,
  F3_MEMBERS, F3_STORES, F3_STAPLES, F3_LISTS, F3_CATEGORIES, storeBy,
} = window;

/* small back-header used across shared screens */
function FlowTop({ t, back, title, sub, right }) {
  return (
    <Pad style={{ paddingTop: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 38 }}>
        <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex', alignItems: 'center', gap: 3, fontFamily: OK_FONT, fontSize: 14, color: t.slate }}>{I.back(t.slate)}{sub || 'Back'}</button>
        {right || <span style={{ width: 24 }} />}
      </div>
      {title && <H1 t={t} style={{ marginTop: 4 }}>{title}</H1>}
    </Pad>
  );
}

/* ───────── Add item (US-3.1.2 — structured record) ───────── */
function AddItem({ t, platform, go, back, version = 'A' }) {
  const [store, setStore] = React.useState('rewe');
  const [staple, setStaple] = React.useState(false);
  const suggest = ['rewe', 'netto', 'edeka', 'aldi', 'dm'];
  const capBtn = { border: 'none', background: t.panelTeal, borderRadius: 10, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: '0 0 auto' };
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowTop t={t} back={back} sub="Groceries" title="Add an item" right={
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <button onClick={() => go('voiceCapture')} aria-label="Add by voice" style={capBtn}>{FI.mic(t.teal700, 20)}</button>
          <button onClick={() => go('barcodeScan')} aria-label="Scan a barcode" style={capBtn}>{FI.scan(t.teal700, 20)}</button>
        </div>
      } />
      <Pad style={{ paddingTop: 14, paddingBottom: 120 }}>
        <Lead t={t} style={{ marginTop: -4, marginBottom: 18 }}>A name is enough. Brand, amount and store help whoever shops buy exactly the right thing.</Lead>

        <div style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, marginBottom: 7 }}>Item</div>
        <Field t={t} placeholder="e.g. Natural yoghurt" value="Natural yoghurt" focusedDefault />
        <Spacer h={16} />

        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, marginBottom: 7 }}>Brand <span style={{ color: t.muted, fontWeight: 500 }}>· optional</span></div>
            <Field t={t} placeholder="REWE Bio" value="REWE Bio" />
          </div>
        </div>
        <Spacer h={16} />

        <div style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, marginBottom: 9 }}>Quantity</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: t.surface, border: `1px solid ${t.hairline}`, borderRadius: 13, padding: '12px 14px' }}>
          <QtyStepper t={t} qty={2} unit="× 500g" />
          <Link t={t} style={{ fontSize: 13 }}>Change unit</Link>
        </div>
        <Spacer h={16} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
          <span style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate }}>Buy at</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 11.5, color: t.muted }}>{FI.search(t.muted, 13)} type any shop</span>
        </div>
        <Field t={t} value={storeBy(store).name} icon={FI.store(t.slate, 19)} />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
          {suggest.map((s) => {
            const on = s === store;
            return <button key={s} onClick={() => setStore(s)} style={{ border: 'none', cursor: 'pointer', borderRadius: 999, padding: '7px 13px', display: 'inline-flex', alignItems: 'center', gap: 6, background: on ? t.teal700 : t.surface, boxShadow: on ? 'none' : `inset 0 0 0 1.5px ${t.hairline}`, fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: on ? '#fff' : t.slate }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: on ? '#fff' : storeBy(s).c }} />{storeBy(s).name}</button>;
          })}
        </div>
        <Spacer h={16} />

        <div style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, marginBottom: 9 }}>Household staple</div>
        <button onClick={() => setStaple(!staple)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, background: staple ? t.panelTeal : t.surface, border: `1px solid ${staple ? t.teal300 : t.hairline}`, borderRadius: 13, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', transition: 'all .15s' }}>
          <span style={{ width: 24, height: 24, borderRadius: 7, border: `2px solid ${staple ? t.teal500 : t.hairline}`, background: staple ? t.teal500 : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{staple && I.check('#fff', 14)}</span>
          <div style={{ flex: 1 }}><div style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: t.ink }}>Add as a household staple</div><div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 1 }}>Saved for the household to reuse on next week's list in one tap</div></div>
          {FI.refresh(staple ? t.teal700 : t.muted, 18)}
        </button>
        <Spacer h={16} />

        <div style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, marginBottom: 7 }}>Notes <span style={{ color: t.muted, fontWeight: 500 }}>· optional</span></div>
        <Field t={t} placeholder="e.g. the unsweetened one" value="" />
      </Pad>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: `14px 20px ${platform === 'ios' ? 30 : 18}px`, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" onClick={() => go(version === 'B' ? 'listB' : 'listA')}>Add to Groceries</Btn>
      </div>
    </Screen>
  );
}

/* ───────── Item detail — the structured record (hero: sold-out yoghurt) ───────── */
function ItemDetail({ t, platform, go, back }) {
  const rows = [
    ['Brand', 'REWE Bio'],
    ['Quantity', '2 × 500g'],
    ['Buy at', <StorePill t={t} store="rewe" />],
    ['Added by', 'Jeni · as a staple'],
  ];
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowTop t={t} back={back} sub="Groceries" right={<button onClick={() => {}} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6 }}>{FI.pencil(t.slate, 19)}</button>} />
      <Pad style={{ paddingTop: 8, paddingBottom: 120 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <H1 t={t} style={{ fontSize: 25 }}>Natural yoghurt</H1>
          <StatusPill t={t} status="soldout" />
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, fontFamily: OK_FONT, fontSize: 12, fontWeight: 600, color: t.muted }}>{FI.refresh(t.muted, 13)} Staple item</div>
        <Spacer h={18} />

        <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, overflow: 'hidden', boxShadow: t.shadowSm }}>
          {rows.map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 15px', borderBottom: i === rows.length - 1 ? 'none' : `1px solid ${t.hairline}` }}>
              <span style={{ fontFamily: OK_FONT, fontSize: 13.5, color: t.slate }}>{k}</span>
              <span style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{v}</span>
            </div>
          ))}
        </div>
        <Spacer h={16} />

        {/* out-of-stock context — the differentiator made visible on the record */}
        <GroupHead t={t} style={{ marginBottom: 8 }}>Out-of-stock history</GroupHead>
        <div style={{ background: t.panelGreen, borderRadius: 16, padding: 15, borderLeft: `3px solid ${t.green}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>{FI.forward(t.green, 18)}<span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.green }}>Carried to next week's Groceries</span></div>
          <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.5, marginTop: 7 }}>Marked sold out by <b>Fabian</b> at REWE today. Brand, amount and store were kept, so it is ready to buy next time.</div>
        </div>
        <Spacer h={10} />
        <div style={{ background: t.panelTeal, borderRadius: 16, padding: 15, borderLeft: `3px solid ${t.teal500}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>{FI.swap(t.teal700, 18)}<span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.teal800 }}>Substitute chosen for today</span></div>
          <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.5, marginTop: 7 }}>Jeni picked <b>Söbbeke organic natural yoghurt</b> from your household's usual buys.</div>
          <Link t={t} onClick={() => go('substituteCreator')} style={{ fontSize: 13, marginTop: 9, display: 'inline-block' }}>See the swap →</Link>
        </div>
      </Pad>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: `14px 20px ${platform === 'ios' ? 30 : 18}px`, background: t.surface, borderTop: `1px solid ${t.hairline}`, display: 'flex', gap: 10 }}>
        <Btn t={t} kind="outline" full onClick={() => {}} icon={FI.trash(t.error, 18)} style={{ color: t.error, flex: '0 0 auto', width: 54, padding: 0 }} />
        <Btn t={t} kind="teal" onClick={() => go('substituteCreator')}>View substitutes</Btn>
      </div>
    </Screen>
  );
}

/* ───────── Create & share a list (US-3.1.1) ───────── */
function CreateList({ t, platform, go, back, version = 'A' }) {
  const [cat, setCat] = React.useState('groceries');
  const [carry, setCarry] = React.useState(true);
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowTop t={t} back={back} sub="Shopping" title="New list" />
      <Pad style={{ paddingTop: 14, paddingBottom: 120 }}>
        <div style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, marginBottom: 7 }}>List name</div>
        <Field t={t} value="Weekend shop" valid focusedDefault helper="1 to 60 characters. A duplicate name is numbered automatically." />
        <Spacer h={18} />

        <div style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, marginBottom: 9 }}>Category</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {F3_CATEGORIES.map((c) => {
            const on = c.id === cat;
            return <button key={c.id} onClick={() => setCat(c.id)} style={{ border: 'none', cursor: 'pointer', borderRadius: 999, padding: '8px 14px', background: on ? t.teal700 : t.surface, boxShadow: on ? 'none' : `inset 0 0 0 1.5px ${t.hairline}`, fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: on ? '#fff' : t.slate }}>{c.label}</button>;
          })}
        </div>
        <Spacer h={20} />

        <GroupHead t={t} style={{ marginBottom: 9 }}>Shared with</GroupHead>
        <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, overflow: 'hidden', boxShadow: t.shadowSm }}>
          {F3_MEMBERS.map((m, i) => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 15px', borderBottom: i === F3_MEMBERS.length - 1 ? 'none' : `1px solid ${t.hairline}` }}>
              <Avatar color={m.c} name={m.n} size={36} ring={t.surface} />
              <div style={{ flex: 1 }}><div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{m.full}{m.you ? ' · You' : ''}</div></div>
              <span style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: m.right === 'view' ? t.muted : t.teal700, background: m.right === 'view' ? t.surfaceAlt : t.panelTeal, padding: '4px 10px', borderRadius: 999 }}>{m.right === 'view' ? 'Can view' : 'Can edit'}</span>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 8, lineHeight: 1.5 }}>Access follows the household roles from Feature 2. View-only members see the list but cannot tick items.</div>
        <Spacer h={18} />

        <button onClick={() => setCarry(!carry)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, background: t.surface, border: `1px solid ${t.hairline}`, borderRadius: 14, padding: '13px 15px', cursor: 'pointer', textAlign: 'left' }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: t.panelGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{FI.forward(t.green, 20)}</div>
          <div style={{ flex: 1 }}><div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>Carry sold-out items forward</div><div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 2 }}>On by default. Nothing is lost to a stock-out.</div></div>
          <span style={{ width: 46, height: 27, borderRadius: 14, background: carry ? t.green : t.hairline, position: 'relative', flex: '0 0 auto', transition: 'background .2s' }}><span style={{ position: 'absolute', top: 2.5, left: carry ? 22 : 2.5, width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.25)', transition: 'left .2s' }} /></span>
        </button>
      </Pad>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: `14px 20px ${platform === 'ios' ? 30 : 18}px`, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" onClick={() => go(version === 'B' ? 'listEmptyB' : 'listEmptyA')}>Create and share</Btn>
      </div>
    </Screen>
  );
}

/* ───────── Manage categories (US-3.1.4 + safe delete) ───────── */
function Categories({ t, platform, go, back }) {
  const [confirm, setConfirm] = React.useState(false);
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowTop t={t} back={back} sub="Shopping" title="Categories" />
      <Pad style={{ paddingTop: 12, paddingBottom: 120 }}>
        <Lead t={t} style={{ marginTop: -4, marginBottom: 16 }}>Group shopping so it is structured, not one long list. Drag to reorder.</Lead>
        <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, overflow: 'hidden', boxShadow: t.shadowSm }}>
          {F3_CATEGORIES.map((c, i) => {
            const Icon = (window.catIcon || {})[c.icon] || FI.cart;
            return (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderBottom: i === F3_CATEGORIES.length - 1 ? 'none' : `1px solid ${t.hairline}` }}>
                <span style={{ display: 'flex', color: t.muted, cursor: 'grab' }}><svg width="18" height="18" viewBox="0 0 24 24" fill={t.muted}><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg></span>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{Icon(t.teal700, 19)}</div>
                <div style={{ flex: 1 }}><div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{c.label}</div><div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 1 }}>{c.count} items{c.custom ? ' · custom' : ''}</div></div>
                <button onClick={() => c.id === 'pharmacy' && setConfirm(true)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6 }}>{FI.dots(t.muted, 18)}</button>
              </div>
            );
          })}
        </div>
        <Spacer h={14} />
        <Btn t={t} kind="outline" icon={I.plus(t.teal500, 18)} onClick={() => {}}>Add a category</Btn>
      </Pad>

      {confirm && (
        <window.Sheet t={t} platform={platform} title="Delete “Pharmacy · dm”?" onClose={() => setConfirm(false)}>
          <Lead t={t} style={{ marginBottom: 14 }}>This category has <b>4 items</b>. Choose what happens to them. Nothing is ever deleted silently.</Lead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Btn t={t} kind="teal" icon={FI.forward('#fff', 18)} onClick={() => setConfirm(false)}>Move items to Groceries</Btn>
            <Btn t={t} kind="outline" icon={FI.archive(t.teal500, 18)} onClick={() => setConfirm(false)}>Archive the items</Btn>
            <Btn t={t} kind="ghost" onClick={() => setConfirm(false)} style={{ color: t.slate }}>Cancel</Btn>
          </div>
        </window.Sheet>
      )}
    </Screen>
  );
}

/* ───────── Staples — save & reuse (US-3.1.5) ───────── */
function Staples({ t, platform, go, back }) {
  const [sel, setSel] = React.useState(F3_STAPLES.map((_, i) => i));
  const toggle = (i) => setSel((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i]);
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowTop t={t} back={back} sub="Shopping" title="Staples" />
      <Pad style={{ paddingTop: 12, paddingBottom: 130 }}>
        <Lead t={t} style={{ marginTop: -4, marginBottom: 14 }}>The things you always buy. Generate a fresh list pre-filled with these, brand, amount and shop kept.</Lead>
        <Banner t={t} tone="success" icon={I.shield(t.green, 18)}>Your staples and buying patterns stay private to the household. They are never used for ads or profiling.</Banner>
        <Spacer h={16} />
        <GroupHead t={t} style={{ marginBottom: 9 }} right={<Link t={t} style={{ fontSize: 12.5 }}>{sel.length === F3_STAPLES.length ? 'Clear' : 'Select all'}</Link>}>Your staples · {F3_STAPLES.length}</GroupHead>
        <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, overflow: 'hidden', boxShadow: t.shadowSm }}>
          {F3_STAPLES.map((s, i) => {
            const on = sel.includes(i);
            return (
              <button key={i} onClick={() => toggle(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', border: 'none', borderBottom: i === F3_STAPLES.length - 1 ? 'none' : `1px solid ${t.hairline}`, background: 'transparent', cursor: 'pointer', padding: '12px 15px' }}>
                <span style={{ width: 24, height: 24, borderRadius: 7, border: `2px solid ${on ? t.teal500 : t.hairline}`, background: on ? t.teal500 : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{on && I.check('#fff', 14)}</span>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{s.name}</div><div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 1 }}>{[s.brand, `${s.qty} ${s.unit}`].filter(Boolean).join(' · ')}</div></div>
                <StorePill t={t} store={s.store} size="sm" />
              </button>
            );
          })}
        </div>
        <Spacer h={12} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: t.muted, fontFamily: OK_FONT, fontSize: 12.5, padding: '0 2px' }}>{FI.swap(t.muted, 15)} Items already on a list are merged, never duplicated.</div>
      </Pad>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: `14px 20px ${platform === 'ios' ? 30 : 18}px`, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" icon={FI.refresh('#fff', 18)} onClick={() => go('listA')}>Add {sel.length} staples to a list</Btn>
      </div>
    </Screen>
  );
}

/* ───────── Staples — clear state (nothing saved yet) ───────── */
function StaplesEmpty({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform}>
      <FlowTop t={t} back={back} sub="Shopping" title="Staples" />
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        <EmptyState t={t} icon={FI.refresh(t.teal700, 38)} title="No staples yet"
          body="Staples are the things you always buy. Save an item as a staple and it is ready to add to next week's list in one tap, brand, amount and shop kept.">
          <div style={{ marginTop: 18 }}><PrivacyLine t={t} center>Your staples stay private to the household. They are never used for ads or profiling.</PrivacyLine></div>
        </EmptyState>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: `14px 20px ${platform === 'ios' ? 30 : 18}px`, background: t.surface, borderTop: `1px solid ${t.hairline}` }}>
        <Btn t={t} kind="primary" icon={I.plus('#fff', 18)} onClick={() => go('addItem')}>Add an item to start</Btn>
      </div>
    </Screen>
  );
}

/* ───────── Archive & restore (US-3.1.1) ───────── */
function Archive({ t, platform, go, back }) {
  const active = F3_LISTS.filter((l) => !l.archived);
  const archived = F3_LISTS.filter((l) => l.archived);
  const Row = ({ l, arch }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderBottom: `1px solid ${t.hairline}` }}>
      <div style={{ width: 38, height: 38, borderRadius: 11, background: arch ? t.surfaceAlt : t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{FI.cart(arch ? t.muted : t.teal700, 19)}</div>
      <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: arch ? t.slate : t.ink }}>{l.name}</div><div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 1 }}>{arch ? `Archived ${l.updated}` : `${l.items} items · ${l.updated}`}</div></div>
      {arch ? <Btn t={t} kind="outline" full={false} onClick={() => {}} style={{ height: 34, fontSize: 13, padding: '0 14px' }}>Restore</Btn> : <AvatarStack t={t} members={F3_MEMBERS.filter((m) => l.contributors.includes(m.id))} size={24} />}
    </div>
  );
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowTop t={t} back={back} sub="Shopping" title="Lists" />
      <Pad style={{ paddingTop: 12, paddingBottom: 24 }}>
        <GroupHead t={t} style={{ marginBottom: 9 }}>Active · {active.length}</GroupHead>
        <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, overflow: 'hidden', boxShadow: t.shadowSm }}>
          {active.map((l, i) => <Row key={l.id} l={l} />)}
          <div style={{ height: 0 }} />
        </div>
        <Spacer h={18} />
        <GroupHead t={t} style={{ marginBottom: 9 }}>Archived · {archived.length}</GroupHead>
        <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, overflow: 'hidden', boxShadow: t.shadowSm }}>
          {archived.map((l, i) => <Row key={l.id} l={l} arch />)}
        </div>
        <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 10, lineHeight: 1.5, padding: '0 2px' }}>Archiving keeps a list's history but removes it from the active view. Restore brings it back unchanged.</div>
      </Pad>
    </Screen>
  );
}

/* ───────── Per-list settings (auto-carry toggle lives here) ───────── */
function ListSettingsA({ t, platform, go, back }) {
  const [carry, setCarry] = React.useState(true);
  const Toggle = ({ on, set }) => <button onClick={() => set(!on)} style={{ width: 46, height: 27, borderRadius: 14, border: 'none', cursor: 'pointer', background: on ? t.green : t.hairline, position: 'relative', flex: '0 0 auto' }}><span style={{ position: 'absolute', top: 2.5, left: on ? 22 : 2.5, width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.25)', transition: 'left .2s' }} /></button>;
  const Row = ({ icon, ic, label, sub, right, danger, last }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 15px', borderBottom: last ? 'none' : `1px solid ${t.hairline}` }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: ic || t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: danger ? t.error : t.ink }}>{label}</div>{sub && <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 1 }}>{sub}</div>}</div>
      {right}
    </div>
  );
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowTop t={t} back={back} sub="Groceries" title="List settings" />
      <Pad style={{ paddingTop: 12, paddingBottom: 24 }}>
        <GroupHead t={t} style={{ marginBottom: 9 }}>Out-of-stock</GroupHead>
        <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, overflow: 'hidden', boxShadow: t.shadowSm }}>
          <Row icon={FI.forward(t.green, 19)} ic={t.panelGreen} label="Auto-carry sold-out items" sub="Carry to the next Groceries list" right={<Toggle on={carry} set={setCarry} />} />
          <Row icon={FI.swap(t.teal700, 19)} ic={t.panelTeal} label="Suggest substitutes" sub="Notify the list creator with options" right={<Toggle on={true} set={() => {}} />} last />
        </div>
        <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 8, lineHeight: 1.5, padding: '0 2px' }}>Turn auto-carry off for a one-off shop without changing the default for other lists.</div>
        <Spacer h={18} />
        <GroupHead t={t} style={{ marginBottom: 9 }}>List</GroupHead>
        <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, overflow: 'hidden', boxShadow: t.shadowSm }}>
          <Row icon={FI.pencil(t.slate, 18)} label="Rename list" right={I.chevR(t.muted, 17)} />
          <Row icon={I.user(t.slate, 18)} label="Members & access" sub="3 can edit · 1 can view" right={I.chevR(t.muted, 17)} />
          <Row icon={FI.archive(t.slate, 18)} label="Archive list" sub="Keeps history, hides from active" right={I.chevR(t.muted, 17)} />
          <Row icon={FI.trash(t.error, 18)} label="Delete list" danger last />
        </div>
      </Pad>
    </Screen>
  );
}

Object.assign(window, { FlowTop, AddItem, ItemDetail, CreateList, Categories, Staples, StaplesEmpty, Archive, ListSettingsA });

/* OmniKin · Feature 3 — version shells.
   Version A (Calm): opened from Home/Lists card · single stream + filter chips · compact rows · sold-out sheet.
   Version B (Bold): own bottom-tab hub · grouped-by-store sections · airy cards · full-screen sold-out. */
const {
  OK_FONT, OK_MONO, I, Screen, Btn,
  FI, Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, AvatarStack, Card, StorePill, StatusPill, SourceTag, Checkbox,
  ItemRow, ProgressBar, ProgressRing, FilterChips, FAB, TabBar, GroupHead, PrivacyLine, EmptyState,
  F3_MEMBERS, F3_ITEMS, F3_CATEGORIES, F3_STORES, storeBy, F3_ACTIVITY,
} = window;

const catIcon = { cart: FI.cart, home: I.home, tag: FI.tag, plug: FI.plug, plus: I.plus };
const activeItems = () => F3_ITEMS.filter((i) => i.status !== 'purchased');
const doneItems = () => F3_ITEMS.filter((i) => i.status === 'purchased');

/* ════════════════════════════════════════════════════════════
   VERSION A · CALM
   ════════════════════════════════════════════════════════════ */

function HomeA({ t, platform, go }) {
  const tabs = [['Home', I.home, true], ['Calendar', I.cal, false], ['Lists', FI.cart, false, 'listsA'], ['Docs', I.doc, false], ['Settings', I.gear, false]];
  const groc = F3_CATEGORIES[0];
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, fontWeight: 500 }}>Your household</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 24, fontWeight: 700, color: t.title, letterSpacing: -0.4 }}>Vogel Family</div>
            </div>
            <Avatar color="#1C6E78" name="J" size={42} ring={t.surface} />
          </div>
        </Pad>
        <Spacer h={18} />
        {/* Shopping entry card — the way into the feature in Version A */}
        <Pad>
          <Card t={t} pad={0} onClick={() => go('listsA')} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '15px 16px' }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{FI.cart(t.teal700, 24)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.ink }}>Shopping lists</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2 }}>{F3_CATEGORIES.length} lists · shared with the household</div>
              </div>
              {I.chevR(t.muted, 18)}
            </div>
            <div style={{ borderTop: `1px solid ${t.hairline}`, padding: '13px 16px', background: t.surfaceAlt }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
                <span style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 600, color: t.ink }}>Groceries</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: t.warning }}>{FI.alert(t.warning, 13)}1 sold out</span>
              </div>
              <ProgressBar t={t} done={groc.done} total={groc.count} />
            </div>
          </Card>
        </Pad>
        <Spacer h={16} />
        <Pad><GroupHead t={t} style={{ marginBottom: 10 }}>Today in the household</GroupHead></Pad>
        <Pad>
          <Card t={t} pad={4}>
            {F3_ACTIVITY.slice(0, 3).map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 11, padding: '10px 12px', borderBottom: i === 2 ? 'none' : `1px solid ${t.hairline}`, alignItems: 'center' }}>
                <Avatar color={a.c} name={a.who} size={30} ring={t.surface} />
                <div style={{ flex: 1, minWidth: 0 }}><span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.4 }}><b>{a.who}</b> {a.text}</span></div>
                <span style={{ fontFamily: OK_FONT, fontSize: 11, color: t.muted, flex: '0 0 auto' }}>{a.when}</span>
              </div>
            ))}
          </Card>
        </Pad>
        <Spacer h={20} />
      </div>
      <TabBar t={t} platform={platform} tabs={tabs} go={go} />
    </Screen>
  );
}

/* Lists overview (categories) — compact grouped list */
function ListsA({ t, platform, go, back }) {
  const tabs = [['Home', I.home, false, 'homeA'], ['Calendar', I.cal, false], ['Lists', FI.cart, true], ['Docs', I.doc, false], ['Settings', I.gear, false]];
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <H1 t={t}>Shopping</H1>
            <button onClick={() => go('archive')} style={{ border: 'none', background: t.surface, boxShadow: t.shadowSm, borderRadius: 10, padding: '8px 12px', cursor: 'pointer', fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: t.slate, display: 'flex', alignItems: 'center', gap: 6 }}>{FI.archive(t.slate, 16)}Archived</button>
          </div>
          <Lead t={t} style={{ marginTop: 6 }}>Shared lists by category. Everyone with access sees changes in real time.</Lead>
        </Pad>
        <Spacer h={16} />
        <Pad>
          <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden' }}>
            {F3_CATEGORIES.map((c, i) => {
              const Icon = catIcon[c.icon] || FI.cart;
              return (
                <button key={c.id} onClick={() => go(c.id === 'groceries' ? 'listA' : 'listA')} style={{ display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left', border: 'none', borderBottom: i === F3_CATEGORIES.length - 1 ? 'none' : `1px solid ${t.hairline}`, background: 'transparent', cursor: 'pointer', padding: '13px 15px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{Icon(t.teal700, 21)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 600, color: t.ink }}>{c.label}</div>
                    <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2 }}>{c.count} items · {c.done} bought · {c.contributors} contributing</div>
                  </div>
                  {c.id === 'groceries' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.warning, marginRight: 2 }} />}
                  {I.chevR(t.muted, 17)}
                </button>
              );
            })}
          </div>
          <Spacer h={14} />
          <Btn t={t} kind="outline" icon={I.plus(t.teal500, 18)} onClick={() => go('categories')}>Manage categories</Btn>
          <Spacer h={10} />
          <Btn t={t} kind="primary" icon={I.plus('#fff', 18)} onClick={() => go('createList')}>New list</Btn>
        </Pad>
        <Spacer h={20} />
      </div>
      <TabBar t={t} platform={platform} tabs={tabs} go={go} />
    </Screen>
  );
}

/* Active Groceries list — single stream + filter chips (Version A) */
function ListA({ t, platform, go, back }) {
  const [filter, setFilter] = React.useState('all');
  const [bought, setBought] = React.useState(() => new Set(F3_ITEMS.filter((i) => i.status === 'purchased').map((i) => i.id)));
  const toggleBought = (id) => setBought((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const items = F3_ITEMS.map((i) => ({ ...i, status: bought.has(i.id) ? 'purchased' : (i.status === 'soldout' ? 'soldout' : 'needed') }));
  const act = items.filter((i) => i.status !== 'purchased');
  const done = items.filter((i) => i.status === 'purchased');
  const stores = [...new Set(act.map((i) => i.store))];
  const chips = [{ id: 'all', label: 'All', n: act.length }, ...stores.map((s) => ({ id: s, label: storeBy(s).name, dot: storeBy(s).c, n: act.filter((i) => i.store === s).length }))];
  const shown = filter === 'all' ? act : act.filter((i) => i.store === filter);
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}`, paddingBottom: 12 }}>
        <Pad style={{ paddingTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex', alignItems: 'center', gap: 3, fontFamily: OK_FONT, fontSize: 14, color: t.slate }}>{I.back(t.slate)} Shopping</button>
            <button onClick={() => go('listSettingsA')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6 }}>{FI.dots(t.slate, 20)}</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 2 }}>
            <div>
              <H1 t={t} style={{ fontSize: 24 }}>Groceries</H1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <AvatarStack t={t} members={F3_MEMBERS.filter((m) => m.right === 'contribute')} size={24} />
                <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>3 contributing · updated 2 min ago</span>
              </div>
            </div>
          </div>
          <Spacer h={12} />
          <ProgressBar t={t} done={done.length} total={items.length} />
        </Pad>
        <Spacer h={12} />
        <Pad><FilterChips t={t} chips={chips} value={filter} onChange={setFilter} /></Pad>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ background: t.surface, margin: '14px 20px 0', borderRadius: 16, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, overflow: 'hidden' }}>
          {shown.map((it, i) => (
            <ItemRow key={it.id} t={t} item={it} last={i === shown.length - 1}
              onClick={() => go('itemDetail')}
              onCheck={() => it.status === 'soldout' ? go('soldOutSheetA') : toggleBought(it.id)} />
          ))}
        </div>
        {/* sold-out call-to-action hint */}
        {filter === 'all' && (
          <Pad style={{ marginTop: 12 }}>
            <button onClick={() => go('soldOutSheetA')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, border: `1px dashed ${t.hairline}`, background: 'transparent', borderRadius: 13, padding: '12px 14px', cursor: 'pointer', textAlign: 'left' }}>
              {FI.alert(t.warning, 18)}<span style={{ flex: 1, fontFamily: OK_FONT, fontSize: 13, color: t.slate }}>Can't find something on the shelf? <b style={{ color: t.ink }}>Mark it sold out.</b></span>{I.chevR(t.muted, 16)}
            </button>
          </Pad>
        )}
        {/* done section */}
        <Pad style={{ marginTop: 16 }}>
          <GroupHead t={t} style={{ marginBottom: 8 }} right={<Link t={t} style={{ fontSize: 12.5 }}>Clear all</Link>}>Bought · {done.length}</GroupHead>
          <div style={{ background: t.surface, borderRadius: 16, border: `1px solid ${t.hairline}`, overflow: 'hidden' }}>
            {done.map((it, i) => <ItemRow key={it.id} t={t} item={it} last={i === done.length - 1} onCheck={() => toggleBought(it.id)} />)}
          </div>
        </Pad>
        <Spacer h={110} />
      </div>
      {/* add bar */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: platform === 'ios' ? 22 : 14, padding: '0 18px', display: 'flex', gap: 10, zIndex: 20 }}>
        <button onClick={() => go('addItem')} style={{ flex: 1, height: 50, borderRadius: 25, border: 'none', background: t.surface, boxShadow: t.shadow, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', fontFamily: OK_FONT, fontSize: 15, color: t.muted }}>{I.plus(t.teal500, 20)} Add an item…</button>
        <button onClick={() => go('voiceCapture')} style={{ width: 50, height: 50, borderRadius: 25, border: 'none', background: t.teal700, boxShadow: t.shadow, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{FI.mic('#fff', 22)}</button>
        <button onClick={() => go('barcodeScan')} style={{ width: 50, height: 50, borderRadius: 25, border: 'none', background: t.teal700, boxShadow: t.shadow, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{FI.scan('#fff', 22)}</button>
      </div>
    </Screen>
  );
}

/* ════════════════════════════════════════════════════════════
   VERSION B · BOLD
   ════════════════════════════════════════════════════════════ */

function HomeB({ t, platform, go }) {
  const tabs = [['Home', I.home, true], ['Calendar', I.cal, false], ['Shopping', FI.cart, false, 'shopHubB'], ['Meals', FI.meal, false], ['Settings', I.gear, false]];
  const groc = F3_CATEGORIES[0];
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Pad style={{ paddingTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, fontWeight: 500 }}>Good morning, Jeni</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 24, fontWeight: 700, color: t.title, letterSpacing: -0.4 }}>Vogel Family</div>
            </div>
            <Avatar color="#1C6E78" name="J" size={42} ring={t.surface} />
          </div>
        </Pad>
        <Spacer h={18} />
        {/* Bold shopping hero entry */}
        <Pad>
          <div onClick={() => go('shopHubB')} style={{ cursor: 'pointer', borderRadius: 22, overflow: 'hidden', background: t.teal700, boxShadow: '0 12px 30px rgba(28,110,120,.28)' }}>
            <div style={{ padding: '18px 18px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <ProgressRing t={t} done={groc.done} total={groc.count} size={62} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,.85)', textTransform: 'uppercase', letterSpacing: 1 }}>{FI.cart('#fff', 15)} Shopping</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: -0.4, marginTop: 4 }}>Groceries</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 13, color: 'rgba(255,255,255,.85)', marginTop: 2 }}>Fabian is shopping now</div>
              </div>
              {I.chevR('#fff', 20)}
            </div>
            <div style={{ background: 'rgba(255,255,255,.13)', padding: '11px 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
              {FI.alert('#fff', 16)}<span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: '#fff', fontWeight: 600 }}>Yoghurt sold out · waiting for your call on a swap</span>
            </div>
          </div>
        </Pad>
        <Spacer h={16} />
        <Pad><GroupHead t={t} style={{ marginBottom: 10 }}>Quick add</GroupHead></Pad>
        <Pad>
          <div style={{ display: 'flex', gap: 12 }}>
            {[['Voice', FI.mic, 'voiceCapture'], ['Scan', FI.scan, 'barcodeScan'], ['Staples', FI.refresh, 'staples']].map(([label, icon, target]) => (
              <button key={label} onClick={() => go(target)} style={{ flex: 1, border: `1px solid ${t.hairline}`, background: t.surface, borderRadius: 16, padding: '15px 8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, boxShadow: t.shadowSm }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon(t.teal700, 21)}</div>
                <span style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.ink }}>{label}</span>
              </button>
            ))}
          </div>
        </Pad>
        <Spacer h={20} />
      </div>
      <TabBar t={t} platform={platform} tabs={tabs} go={go} />
    </Screen>
  );
}

/* Shopping hub — own tab, bold teal header, category cards (Version B) */
function ShopHubB({ t, platform, go }) {
  const tabs = [['Home', I.home, false, 'homeB'], ['Calendar', I.cal, false], ['Shopping', FI.cart, true], ['Meals', FI.meal, false], ['Settings', I.gear, false]];
  const hero = t.name === 'light' ? t.teal700 : t.teal900;
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ background: hero, padding: '6px 20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <div style={{ fontFamily: OK_FONT, fontSize: 25, fontWeight: 800, color: '#fff', letterSpacing: -0.4 }}>Shopping</div>
            <button onClick={() => go('archive')} style={{ border: 'none', background: 'rgba(255,255,255,.16)', borderRadius: 999, padding: '7px 13px', cursor: 'pointer', fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>{FI.archive('#fff', 15)} Archived</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
            <AvatarStack t={t} members={F3_MEMBERS} size={32} ringColor={hero} />
            <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: 'rgba(255,255,255,.82)' }}>Vogel Family · {F3_CATEGORIES.length} lists</span>
          </div>
        </div>
        <Pad style={{ marginTop: -14 }}>
          {/* Featured groceries card */}
          <div onClick={() => go('listB')} style={{ cursor: 'pointer', background: t.surface, borderRadius: 20, border: `1px solid ${t.hairline}`, boxShadow: t.shadow, padding: 16, display: 'flex', alignItems: 'center', gap: 15 }}>
            <ProgressRing t={t} done={F3_CATEGORIES[0].done} total={F3_CATEGORIES[0].count} size={60} on={t.teal500} track={t.surfaceAlt} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 18, fontWeight: 800, color: t.ink }}>Groceries</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: t.warning, background: 'rgba(224,165,60,.15)', padding: '3px 9px', borderRadius: 999 }}>{FI.alert(t.warning, 12)}1 sold out</span>
                <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>2 min ago</span>
              </div>
            </div>
            {I.chevR(t.muted, 19)}
          </div>
        </Pad>
        <Spacer h={16} />
        <Pad><GroupHead t={t} style={{ marginBottom: 10 }}>All lists</GroupHead></Pad>
        <Pad>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {F3_CATEGORIES.slice(1).map((c) => {
              const Icon = catIcon[c.icon] || FI.cart;
              return (
                <button key={c.id} onClick={() => go('listB')} style={{ border: `1px solid ${t.hairline}`, background: t.surface, borderRadius: 18, padding: 15, height: 116, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: t.shadowSm, cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon(t.teal700, 22)}</div>
                  <div>
                    <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>{c.label}</div>
                    <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 2 }}>{c.count} items</div>
                  </div>
                </button>
              );
            })}
            <button onClick={() => go('createList')} style={{ border: `1.5px dashed ${t.hairline}`, background: 'transparent', borderRadius: 18, padding: 15, height: 116, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 9, cursor: 'pointer' }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{I.plus(t.teal500, 22)}</div>
              <span style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 700, color: t.teal700 }}>New list</span>
            </button>
          </div>
        </Pad>
        <Spacer h={20} />
      </div>
      <TabBar t={t} platform={platform} tabs={tabs} go={go} />
    </Screen>
  );
}

/* Active list grouped by store — airy cards (Version B) */
/* Version B mark-bought affordance — a revealed, swipe-style "Bought" action on each card.
   Distinct from Version A, where the shopper taps the round checkbox to check off in place. */
function BoughtCardB({ t, item, onBought, onOpen, onSoldOut }) {
  const purchased = item.status === 'purchased';
  const soldout = item.status === 'soldout';
  const meta = [item.brand, item.qty ? `${item.qty} ${item.unit}` : null].filter(Boolean).join('  ·  ');
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', borderRadius: 16, overflow: 'hidden', border: `1px solid ${soldout ? 'rgba(224,165,60,.5)' : t.hairline}`, boxShadow: t.shadowSm, background: t.surface, opacity: purchased ? 0.66 : 1, transition: 'opacity .2s' }}>
      <div onClick={onOpen} style={{ flex: 1, minWidth: 0, padding: 14, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 600, color: t.ink, textDecoration: purchased ? 'line-through' : 'none' }}>{item.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
            {meta && <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate }}>{meta}</span>}
            <StorePill t={t} store={item.store} size="sm" />
            <SourceTag t={t} source={item.source} />
          </div>
        </div>
      </div>
      {soldout ? (
        <button onClick={onSoldOut} style={{ flex: '0 0 auto', width: 92, border: 'none', borderLeft: `1px solid ${t.hairline}`, background: 'rgba(224,165,60,.14)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '0 6px' }}>
          {FI.swap(t.warning, 19)}<span style={{ fontFamily: OK_FONT, fontSize: 11, fontWeight: 700, color: t.warning, lineHeight: 1.1, textAlign: 'center' }}>Find swap</span>
        </button>
      ) : (
        <button onClick={onBought} style={{ flex: '0 0 auto', width: 86, border: 'none', borderLeft: `1px solid ${purchased ? t.hairline : 'transparent'}`, background: purchased ? t.surfaceAlt : t.green, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
          {purchased ? FI.refresh(t.slate, 18) : I.check('#fff', 24)}
          <span style={{ fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: purchased ? t.slate : '#fff' }}>{purchased ? 'Undo' : 'Bought'}</span>
        </button>
      )}
    </div>
  );
}

function ListB({ t, platform, go, back }) {
  const hero = t.name === 'light' ? t.teal700 : t.teal900;
  const [bought, setBought] = React.useState(() => new Set(F3_ITEMS.filter((i) => i.status === 'purchased').map((i) => i.id)));
  const toggleBought = (id) => setBought((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const items = F3_ITEMS.map((i) => ({ ...i, status: bought.has(i.id) ? 'purchased' : (i.status === 'soldout' ? 'soldout' : 'needed') }));
  const act = items.filter((i) => i.status !== 'purchased');
  const done = items.filter((i) => i.status === 'purchased');
  const stores = [...new Set(act.map((i) => i.store))];
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ background: hero, padding: '4px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back('#fff')}</button>
            <button onClick={() => go('listSettingsA')} style={{ border: 'none', background: 'rgba(255,255,255,.16)', borderRadius: 999, padding: 8, cursor: 'pointer', display: 'flex' }}>{FI.dots('#fff', 18)}</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 6 }}>
            <ProgressRing t={t} done={done.length} total={items.length} size={64} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>Groceries</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <AvatarStack t={t} members={F3_MEMBERS.filter((m) => m.right === 'contribute')} size={24} ringColor={hero} />
                <span style={{ fontFamily: OK_FONT, fontSize: 12, color: 'rgba(255,255,255,.82)' }}>updated 2 min ago</span>
              </div>
            </div>
          </div>
        </div>
        <Pad style={{ paddingTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: t.panelGreen, borderRadius: 12, padding: '9px 12px', marginBottom: 16 }}>
            <span style={{ width: 24, height: 24, borderRadius: '50%', background: t.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{I.check('#fff', 14)}</span>
            <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.ink, lineHeight: 1.4 }}>At the store? Tap <b>Bought</b> on each item as you pick it up.</span>
          </div>
          {stores.map((s) => {
            const storeItems = act.filter((i) => i.store === s);
            const store = storeBy(s);
            return (
              <div key={s} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 2px 10px' }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: store.c }} />
                  <span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 800, color: t.ink }}>{store.name}</span>
                  <span style={{ fontFamily: OK_MONO, fontSize: 11.5, color: t.muted }}>{storeItems.length}</span>
                  <Grow />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {storeItems.map((it) => <BoughtCardB key={it.id} t={t} item={it}
                    onOpen={() => go('itemDetail')}
                    onBought={() => toggleBought(it.id)}
                    onSoldOut={() => go('soldOutFullB')} />)}
                </div>
              </div>
            );
          })}
          {/* done */}
          <GroupHead t={t} style={{ marginBottom: 10 }} right={<Link t={t} style={{ fontSize: 12.5 }}>Clear all</Link>}>Bought · {done.length}</GroupHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {done.map((it) => <BoughtCardB key={it.id} t={t} item={it} onOpen={() => go('itemDetail')} onBought={() => toggleBought(it.id)} />)}
          </div>
        </Pad>
        <Spacer h={120} />
      </div>
      <FAB t={t} onClick={() => go('addItem')} label="Add item" />
      {/* mini capture rail */}
      <div style={{ position: 'absolute', left: 18, bottom: 100, zIndex: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={() => go('voiceCapture')} style={{ width: 48, height: 48, borderRadius: 24, border: 'none', background: t.surface, boxShadow: t.shadow, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{FI.mic(t.teal700, 22)}</button>
        <button onClick={() => go('barcodeScan')} style={{ width: 48, height: 48, borderRadius: 24, border: 'none', background: t.surface, boxShadow: t.shadow, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{FI.scan(t.teal700, 22)}</button>
      </div>
    </Screen>
  );
}

/* ════════════════════════════════════════════════════════════
   CLEAR / EMPTY STATES — first arrival, nothing created yet
   ════════════════════════════════════════════════════════════ */

const TABS_A_LISTS = (go) => [['Home', I.home, false, 'homeA'], ['Calendar', I.cal, false], ['Lists', FI.cart, true], ['Docs', I.doc, false], ['Settings', I.gear, false]];
const TABS_B_SHOP  = (go) => [['Home', I.home, false, 'homeB'], ['Calendar', I.cal, false], ['Shopping', FI.cart, true], ['Meals', FI.meal, false], ['Settings', I.gear, false]];

/* Version A — calm clear state for the Lists overview (no lists yet) */
function ShopEmptyA({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}`, paddingBottom: 12 }}>
        <Pad style={{ paddingTop: 10 }}>
          <H1 t={t}>Shopping</H1>
          <Lead t={t} style={{ marginTop: 6, fontSize: 13.5 }}>Shared lists by category. Everyone with access sees changes in real time.</Lead>
        </Pad>
      </div>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        <EmptyState t={t} icon={FI.cart(t.teal700, 40)} title="No lists yet"
          body="Nothing has been created here. Make your first shared list, then everyone in the household can add to it.">
          <div style={{ marginTop: 18 }}><PrivacyLine t={t} center>Lists stay inside your household. Buying patterns are never used for ads.</PrivacyLine></div>
        </EmptyState>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: platform === 'ios' ? 22 : 14, padding: '0 18px', zIndex: 20 }}>
        <button onClick={() => go('createList')} style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: t.coral, boxShadow: '0 8px 22px rgba(226,104,60,.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{I.plus('#fff', 20)} Create your first list</button>
      </div>
      <TabBar t={t} platform={platform} tabs={TABS_A_LISTS(go)} go={go} />
    </Screen>
  );
}

/* Version B — bold clear state for the Shopping hub (no lists yet) */
function ShopEmptyB({ t, platform, go }) {
  const hero = t.name === 'light' ? t.teal700 : t.teal900;
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: hero, padding: '6px 20px 22px' }}>
          <div style={{ fontFamily: OK_FONT, fontSize: 25, fontWeight: 800, color: '#fff', letterSpacing: -0.4 }}>Shopping</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
            <AvatarStack t={t} members={F3_MEMBERS} size={32} ringColor={hero} />
            <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: 'rgba(255,255,255,.82)' }}>Vogel Family · no lists yet</span>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '44px 32px 0' }}>
          <EmptyState t={t} icon={FI.cart(t.teal700, 40)} title="No lists yet"
            body="Nothing has been created here. Make your first shared list and it appears grouped by store, ready for the household to fill.">
            <button onClick={() => go('createList')} style={{ marginTop: 22, height: 52, borderRadius: 26, border: 'none', background: t.coral, boxShadow: '0 8px 22px rgba(226,104,60,.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '0 26px', fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{I.plus('#fff', 20)} Create your first list</button>
            <div style={{ marginTop: 18 }}><PrivacyLine t={t} center>Lists stay inside your household. Buying patterns are never used for ads.</PrivacyLine></div>
          </EmptyState>
        </div>
        <Spacer h={28} />
      </div>
      <TabBar t={t} platform={platform} tabs={TABS_B_SHOP(go)} go={go} />
    </Screen>
  );
}

/* Version A — calm clear state for a freshly-created list (no items yet) */
function ListEmptyA({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: '0 0 auto', background: t.surface, borderBottom: `1px solid ${t.hairline}`, paddingBottom: 12 }}>
        <Pad style={{ paddingTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex', alignItems: 'center', gap: 3, fontFamily: OK_FONT, fontSize: 14, color: t.slate }}>{I.back(t.slate)} Shopping</button>
            <button onClick={() => go('listSettingsA')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6 }}>{FI.dots(t.slate, 20)}</button>
          </div>
          <div style={{ marginTop: 2 }}>
            <H1 t={t} style={{ fontSize: 24 }}>Weekend shop</H1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
              <AvatarStack t={t} members={F3_MEMBERS.filter((m) => m.right === 'contribute')} size={24} />
              <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted }}>Shared · nothing added yet</span>
            </div>
          </div>
        </Pad>
      </div>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        <EmptyState t={t} icon={FI.cart(t.teal700, 40)} title="No items yet"
          body="This list is empty. Add the first thing to buy. A name is enough, brand, amount and shop are optional.">
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 16, color: t.muted, fontFamily: OK_FONT, fontSize: 12.5 }}>{FI.mic(t.muted, 15)} Voice and barcode capture work too</div>
        </EmptyState>
      </div>
      {/* add bar — the one calm way to start */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: platform === 'ios' ? 22 : 14, padding: '0 18px', display: 'flex', gap: 10, zIndex: 20 }}>
        <button onClick={() => go('addItem')} style={{ flex: 1, height: 50, borderRadius: 25, border: 'none', background: t.coral, boxShadow: '0 8px 22px rgba(226,104,60,.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '0 18px', fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: '#fff' }}>{I.plus('#fff', 20)} Add the first item</button>
        <button onClick={() => go('voiceCapture')} style={{ width: 50, height: 50, borderRadius: 25, border: 'none', background: t.surface, boxShadow: t.shadow, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{FI.mic(t.teal700, 22)}</button>
        <button onClick={() => go('barcodeScan')} style={{ width: 50, height: 50, borderRadius: 25, border: 'none', background: t.surface, boxShadow: t.shadow, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{FI.scan(t.teal700, 22)}</button>
      </div>
    </Screen>
  );
}

/* Version B — bold clear state for a freshly-created list (no items yet) */
function ListEmptyB({ t, platform, go, back }) {
  const hero = t.name === 'light' ? t.teal700 : t.teal900;
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: hero, padding: '4px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
            <button onClick={back} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{I.back('#fff')}</button>
            <button onClick={() => go('listSettingsA')} style={{ border: 'none', background: 'rgba(255,255,255,.16)', borderRadius: 999, padding: 8, cursor: 'pointer', display: 'flex' }}>{FI.dots('#fff', 18)}</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 6 }}>
            <ProgressRing t={t} done={0} total={0} size={64} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>Weekend shop</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <AvatarStack t={t} members={F3_MEMBERS.filter((m) => m.right === 'contribute')} size={24} ringColor={hero} />
                <span style={{ fontFamily: OK_FONT, fontSize: 12, color: 'rgba(255,255,255,.82)' }}>nothing added yet</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px 0' }}>
          <EmptyState t={t} icon={FI.cart(t.teal700, 40)} title="No items yet"
            body="This list is empty. Add the first thing to buy and it appears grouped by the store you buy it at.">
            <button onClick={() => go('addItem')} style={{ marginTop: 22, height: 52, borderRadius: 26, border: 'none', background: t.coral, boxShadow: '0 8px 22px rgba(226,104,60,.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '0 26px', fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{I.plus('#fff', 20)} Add the first item</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 16, color: t.muted, fontFamily: OK_FONT, fontSize: 12.5 }}>{FI.mic(t.muted, 15)} Voice and barcode capture work too</div>
          </EmptyState>
        </div>
        <Spacer h={28} />
      </div>
      {/* capture rail still available */}
      <div style={{ position: 'absolute', right: 18, bottom: 32, zIndex: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={() => go('voiceCapture')} style={{ width: 48, height: 48, borderRadius: 24, border: 'none', background: t.surface, boxShadow: t.shadow, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{FI.mic(t.teal700, 22)}</button>
        <button onClick={() => go('barcodeScan')} style={{ width: 48, height: 48, borderRadius: 24, border: 'none', background: t.surface, boxShadow: t.shadow, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{FI.scan(t.teal700, 22)}</button>
      </div>
    </Screen>
  );
}

Object.assign(window, { HomeA, ListsA, ListA, HomeB, ShopHubB, ListB, ShopEmptyA, ShopEmptyB, ListEmptyA, ListEmptyB, activeItems, doneItems, catIcon });

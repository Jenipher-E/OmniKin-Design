/* OmniKin · Feature 3 — shopping UI atoms. Consumes kit/omni-kit.jsx globals.
   Calm-bold, brand-token only. Two densities: compact (Version A) / airy (Version B). */
const { OK_FONT, OK_MONO, I, storeBy } = window;

/* ───────── Feature-3 icon set (stroke, 24-grid — matches omni-kit) ───────── */
const FI = {
  cart:   (c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2.2l2.2 12.2a1.6 1.6 0 001.6 1.3h8.4a1.6 1.6 0 001.6-1.3L21 7H6"/></svg>,
  store:  (c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9.5V20h16V9.5"/><path d="M3 5h18l1 4.5a2.4 2.4 0 01-4.7.6 2.4 2.4 0 01-4.65 0 2.4 2.4 0 01-4.65 0A2.4 2.4 0 012 9.5z"/><path d="M9.5 20v-5h5v5"/></svg>,
  mic:    (c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21M8.5 21h7"/></svg>,
  scan:   (c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/><path d="M7 8v8M10 8v8M13.5 8v8M17 8v8" strokeWidth="1.6"/></svg>,
  tag:    (c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 12.5l8-8H20V13l-8 8z"/><circle cx="15.5" cy="8.5" r="1.4"/></svg>,
  plug:   (c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2v5M15 2v5M6 7h12v3a6 6 0 01-12 0zM12 16v6"/></svg>,
  swap:   (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>,
  alert:  (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5L22 19H2z"/><path d="M12 9.5v4M12 16.5h.01"/></svg>,
  xcirc:  (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg>,
  forward:(c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h14M13 6l6 6-6 6"/></svg>,
  wand:   (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 21L18 9l-3-3L3 18zM15 3l.8 2 2 .8-2 .8L15 9l-.8-2-2-.8 2-.8zM20 11l.5 1.4 1.5.6-1.5.6L20 16l-.5-1.4-1.5-.6 1.5-.6z"/></svg>,
  sync:   (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0115.5-6.2M21 4v4h-4M21 12a9 9 0 01-15.5 6.2M3 20v-4h4"/></svg>,
  archive:(c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="4.5" rx="1.5"/><path d="M5 8.5V20h14V8.5M10 12h4"/></svg>,
  trash:  (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V4.5h6V7M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>,
  pencil: (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4"/></svg>,
  dots:   (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>,
  search: (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>,
  filter: (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M6 12h12M10 18h4"/></svg>,
  clock:  (c, s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>,
  send:   (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3L10.5 13.5M21 3l-6.5 18-4-8-8-4z"/></svg>,
  bell:   (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 004 0"/></svg>,
  refresh:(c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 019-9 9 9 0 016.5 2.8L21 8M21 3v5h-5"/></svg>,
  meal:   (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v8a2 2 0 002 2h0v8M7 3v6M9 3v6M16 3c-1.5 0-2.5 2-2.5 5s1 3.5 2.5 3.5V21"/></svg>,
};

/* ───────── layout atoms ───────── */
const Pad    = ({ children, style }) => <div style={{ padding: '0 20px', ...style }}>{children}</div>;
const H1     = ({ t, children, style }) => <div style={{ fontFamily: OK_FONT, fontSize: 26, fontWeight: 700, color: t.title, letterSpacing: -0.5, lineHeight: 1.15, ...style }}>{children}</div>;
const Lead   = ({ t, children, style }) => <div style={{ fontFamily: OK_FONT, fontSize: 15, color: t.slate, lineHeight: 1.5, ...style }}>{children}</div>;
const Spacer = ({ h }) => <div style={{ height: h, flex: '0 0 auto' }} />;
const Grow   = () => <div style={{ flex: 1 }} />;
const Link   = ({ t, children, onClick, style }) => <span onClick={onClick} style={{ fontFamily: OK_FONT, color: t.teal500, fontWeight: 600, cursor: 'pointer', ...style }}>{children}</span>;
const Kicker = ({ t, children, style }) => <div style={{ fontFamily: OK_MONO, fontSize: 11, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase', color: t.muted, ...style }}>{children}</div>;

/* ───────── Avatar + stack ───────── */
function Avatar({ color, name, size = 36, ring }) {
  return <div style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: OK_FONT, fontWeight: 700, fontSize: size * 0.4, flex: '0 0 auto', boxShadow: ring ? `0 0 0 2px ${ring}` : 'none' }}>{name ? name[0].toUpperCase() : ''}</div>;
}
function AvatarStack({ members, size = 28, max = 5, t, ringColor }) {
  const shown = members.slice(0, max);
  const extra = members.length - shown.length;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {shown.map((m, i) => <div key={m.id || i} style={{ marginLeft: i === 0 ? 0 : -size * 0.34 }}><Avatar color={m.c} name={m.n} size={size} ring={ringColor || t.surface} /></div>)}
      {extra > 0 && <div style={{ marginLeft: -size * 0.34, width: size, height: size, borderRadius: '50%', background: t.surfaceAlt, boxShadow: `0 0 0 2px ${ringColor || t.surface}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: OK_FONT, fontSize: size * 0.36, fontWeight: 700, color: t.slate }}>+{extra}</div>}
    </div>
  );
}

/* ───────── Card ───────── */
function Card({ t, children, style, pad = 16, onClick }) {
  return <div onClick={onClick} style={{ background: t.surface, borderRadius: 16, padding: pad, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, cursor: onClick ? 'pointer' : 'default', ...style }}>{children}</div>;
}

/* ───────── Store pill ───────── */
function StorePill({ t, store, size = 'md' }) {
  const s = storeBy(store);
  const sm = size === 'sm';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: sm ? 11 : 12, fontWeight: 600, color: t.slate, background: t.surfaceAlt, padding: sm ? '2px 8px 2px 6px' : '3px 10px 3px 7px', borderRadius: 999, whiteSpace: 'nowrap' }}>
      <span style={{ width: sm ? 6 : 7, height: sm ? 6 : 7, borderRadius: '50%', background: s.c, flex: '0 0 auto' }} />{s.name}
    </span>
  );
}

/* ───────── Source tag (how an item was captured) ───────── */
function SourceTag({ t, source }) {
  const map = {
    voice:   ['Voice',   FI.mic],
    barcode: ['Scanned', FI.scan],
    staple:  ['Staple',  FI.refresh],
    carried: ['Carried', FI.forward],
    meal:    ['Meal',    FI.meal],
  };
  const m = map[source];
  if (!m) return null;
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: OK_FONT, fontSize: 10.5, fontWeight: 600, color: t.muted }}>{m[1](t.muted, 12)}{m[0]}</span>;
}

/* ───────── Status pill ───────── */
function StatusPill({ t, status }) {
  if (status === 'soldout') return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: t.warning, background: 'rgba(224,165,60,.15)', padding: '3px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}>{FI.alert(t.warning, 13)}Sold out</span>;
  if (status === 'purchased') return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: t.green, background: t.panelGreen, padding: '3px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}>{I.check(t.green, 12)}Bought</span>;
  return null;
}

/* ───────── Round checkbox ───────── */
function Checkbox({ t, checked, onClick, dim }) {
  return (
    <button onClick={onClick} style={{ width: 26, height: 26, borderRadius: '50%', flex: '0 0 auto', border: 'none', cursor: onClick ? 'pointer' : 'default', padding: 0,
      background: checked ? t.green : 'transparent', boxShadow: checked ? 'none' : `inset 0 0 0 2px ${dim ? t.hairline : t.teal300}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s' }}>
      {checked && I.check('#fff', 15)}
    </button>
  );
}

/* ───────── Item row — compact (A) and airy (B) ─────────
   Renders a structured item record. */
function ItemRow({ t, item, airy, onClick, onCheck, readOnly, last }) {
  const purchased = item.status === 'purchased';
  const soldout = item.status === 'soldout';
  const dim = purchased;
  const meta = [item.brand, item.qty ? `${item.qty} ${item.unit}` : null].filter(Boolean).join('  ·  ');
  if (airy) {
    return (
      <div onClick={onClick} style={{ background: t.surface, borderRadius: 16, border: `1px solid ${soldout ? 'rgba(224,165,60,.5)' : t.hairline}`, boxShadow: t.shadowSm, padding: 14, display: 'flex', alignItems: 'center', gap: 13, cursor: onClick ? 'pointer' : 'default', opacity: dim ? 0.62 : 1 }}>
        <Checkbox t={t} checked={purchased} dim={readOnly} onClick={readOnly ? undefined : (e) => { e && e.stopPropagation && e.stopPropagation(); onCheck && onCheck(); }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 600, color: soldout ? t.ink : t.ink, textDecoration: purchased ? 'line-through' : 'none' }}>{item.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
            {meta && <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, whiteSpace: 'nowrap' }}>{meta}</span>}
            <StorePill t={t} store={item.store} size="sm" />
            <SourceTag t={t} source={item.source} />
          </div>
        </div>
        {soldout ? <StatusPill t={t} status="soldout" /> : (onClick && I.chevR(t.muted, 17))}
      </div>
    );
  }
  // compact
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderBottom: last ? 'none' : `1px solid ${t.hairline}`, cursor: onClick ? 'pointer' : 'default', background: soldout ? 'rgba(224,165,60,.06)' : 'transparent', opacity: dim ? 0.6 : 1 }}>
      <Checkbox t={t} checked={purchased} dim={readOnly} onClick={readOnly ? undefined : (e) => { e && e.stopPropagation && e.stopPropagation(); onCheck && onCheck(); }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 600, color: t.ink, textDecoration: purchased ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
          {item.source !== 'manual' && <SourceTag t={t} source={item.source} />}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
          <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{meta || 'No detail yet'}</span>
        </div>
      </div>
      {soldout ? <StatusPill t={t} status="soldout" /> : <StorePill t={t} store={item.store} size="sm" />}
    </div>
  );
}

/* ───────── Progress bar (A) ───────── */
function ProgressBar({ t, done, total }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
        <span style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, whiteSpace: 'nowrap' }}>{done} of {total} bought</span>
        <span style={{ fontFamily: OK_MONO, fontSize: 12, color: t.muted }}>{pct}%</span>
      </div>
      <div style={{ height: 7, borderRadius: 4, background: t.surfaceAlt, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: t.teal500, transition: 'width .4s' }} />
      </div>
    </div>
  );
}

/* ───────── Progress ring (B) ───────── */
function ProgressRing({ t, done, total, size = 58, on = '#fff', track = 'rgba(255,255,255,.28)' }) {
  const pct = total ? done / total : 0;
  const r = (size - 7) / 2, C = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: '0 0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth="6" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={on} strokeWidth="6" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct)} style={{ transition: 'stroke-dashoffset .5s' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 800, color: on, lineHeight: 1 }}>{done}</span>
        <span style={{ fontFamily: OK_FONT, fontSize: 10, color: on, opacity: .8, lineHeight: 1.3 }}>of {total}</span>
      </div>
    </div>
  );
}

/* ───────── Filter chips (horizontal) ───────── */
function FilterChips({ t, chips, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
      {chips.map((ch) => {
        const on = ch.id === value;
        return (
          <button key={ch.id} onClick={() => onChange && onChange(ch.id)} style={{ flex: '0 0 auto', border: 'none', cursor: 'pointer', borderRadius: 999, padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: 6,
            background: on ? t.teal700 : t.surface, boxShadow: on ? 'none' : `inset 0 0 0 1.5px ${t.hairline}`,
            fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: on ? '#fff' : t.slate, transition: 'all .15s' }}>
            {ch.dot && <span style={{ width: 7, height: 7, borderRadius: '50%', background: on ? '#fff' : ch.dot }} />}{ch.label}{ch.n != null && <span style={{ opacity: .7, fontFamily: OK_MONO, fontSize: 11.5 }}>{ch.n}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ───────── Qty stepper ───────── */
function QtyStepper({ t, qty, unit }) {
  const btn = { width: 38, height: 38, borderRadius: 11, border: `1.5px solid ${t.hairline}`, background: t.surface, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: OK_FONT, fontSize: 20, fontWeight: 600, color: t.teal700 };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button style={btn}>−</button>
      <div style={{ minWidth: 64, textAlign: 'center', fontFamily: OK_FONT, fontSize: 17, fontWeight: 700, color: t.ink }}>{qty} <span style={{ fontSize: 13, fontWeight: 600, color: t.slate }}>{unit}</span></div>
      <button style={btn}>+</button>
    </div>
  );
}

/* ───────── Bottom sheet (scrim + rounded panel) ───────── */
function Sheet({ t, platform, children, onClose, title, maxH }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: t.sheetScrim, animation: 'okfade .2s ease' }} />
      <div style={{ position: 'relative', background: t.surface, borderTopLeftRadius: 26, borderTopRightRadius: 26, boxShadow: '0 -10px 40px rgba(14,58,64,.22)', maxHeight: maxH || '88%', display: 'flex', flexDirection: 'column', animation: 'oksheet .32s cubic-bezier(.2,.8,.25,1)', paddingBottom: platform === 'ios' ? 22 : 14 }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}><div style={{ width: 40, height: 5, borderRadius: 3, background: t.hairline }} /></div>
        {title && <div style={{ fontFamily: OK_FONT, fontSize: 18, fontWeight: 700, color: t.title, padding: '12px 22px 4px' }}>{title}</div>}
        <div style={{ overflow: 'auto', padding: '8px 22px 6px' }}>{children}</div>
      </div>
    </div>
  );
}

/* ───────── Substitute card (history vs generic) ───────── */
function SubstituteCard({ t, sub, selected, onClick }) {
  const isHistory = sub.source === 'history';
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', padding: '13px 14px', borderRadius: 14, cursor: 'pointer', background: selected ? t.panelTeal : t.surface, border: `1.5px solid ${selected ? t.teal500 : t.hairline}`, transition: 'all .15s' }}>
      <div style={{ width: 22, height: 22, borderRadius: '50%', flex: '0 0 auto', border: `2px solid ${selected ? t.teal500 : t.hairline}`, background: selected ? t.teal500 : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{selected && I.check('#fff', 13)}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: t.ink }}>{sub.name}</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.slate, marginTop: 2 }}>{sub.brand} · {sub.size}</div>
      </div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: OK_FONT, fontSize: 10.5, fontWeight: 700, color: isHistory ? t.green : t.muted, background: isHistory ? t.panelGreen : t.surfaceAlt, padding: '3px 8px', borderRadius: 999, flex: '0 0 auto', whiteSpace: 'nowrap' }}>
        {isHistory ? I.shield(t.green, 11) : FI.swap(t.muted, 11)}{isHistory ? 'Your history' : 'Generic'}
      </span>
    </button>
  );
}

/* ───────── Tab bar ───────── */
function TabBar({ t, platform, tabs, go }) {
  return (
    <div style={{ display: 'flex', borderTop: `1px solid ${t.hairline}`, background: t.surface, paddingTop: 8, paddingBottom: platform === 'ios' ? 22 : 14, flex: '0 0 auto' }}>
      {tabs.map(([label, icon, active, target]) => (
        <button key={label} onClick={() => target && go && go(target)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: 'none', background: 'transparent', cursor: target ? 'pointer' : 'default', position: 'relative' }}>
          {icon(active ? t.teal700 : t.muted, 22)}
          <span style={{ fontFamily: OK_FONT, fontSize: 10, fontWeight: active ? 700 : 500, color: active ? t.teal700 : t.muted }}>{label}</span>
          {active && <span style={{ position: 'absolute', top: -8, width: 5, height: 5, borderRadius: '50%', background: t.coral }} />}
        </button>
      ))}
    </div>
  );
}

/* ───────── Floating action button ───────── */
function FAB({ t, onClick, icon, label }) {
  return (
    <button onClick={onClick} style={{ position: 'absolute', right: 18, bottom: 92, zIndex: 20, height: 54, borderRadius: 27, border: 'none', cursor: 'pointer', background: t.coral, color: '#fff', display: 'flex', alignItems: 'center', gap: 8, padding: label ? '0 20px 0 18px' : 0, width: label ? 'auto' : 54, justifyContent: 'center', boxShadow: '0 8px 22px rgba(226,104,60,.4)', fontFamily: OK_FONT, fontSize: 15, fontWeight: 700 }}>
      {icon || I.plus('#fff', 22)}{label}
    </button>
  );
}

/* ───────── Section header inside a screen ───────── */
function GroupHead({ t, children, right, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px', ...style }}>
      <Kicker t={t}>{children}</Kicker>{right}
    </div>
  );
}

/* ───────── Privacy reassurance line ───────── */
function PrivacyLine({ t, children, center }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, justifyContent: center ? 'center' : 'flex-start' }}>
      {I.shield(t.muted, 14)}
      <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, lineHeight: 1.5, textAlign: center ? 'center' : 'left' }}>{children}</span>
    </div>
  );
}

/* ───────── Empty-state block (clear / first-arrival surfaces) ───────── */
function EmptyState({ t, icon, title, body, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: 300 }}>
      <div style={{ width: 88, height: 88, borderRadius: 26, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontFamily: OK_FONT, fontSize: 21, fontWeight: 800, color: t.title, marginTop: 22, letterSpacing: -0.3 }}>{title}</div>
      <Lead t={t} style={{ marginTop: 10 }}>{body}</Lead>
      {children}
    </div>
  );
}

/* ───────── "Not in this release" ribbon ───────── */
function ParkedBadge({ t }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: t.blue, background: t.panelBlue, padding: '5px 11px', borderRadius: 999, letterSpacing: .2 }}>{FI.clock(t.blue, 13)}Not in this release</span>;
}

Object.assign(window, {
  FI, Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, AvatarStack, Card, StorePill, SourceTag, StatusPill, Checkbox,
  ItemRow, ProgressBar, ProgressRing, FilterChips, QtyStepper, Sheet,
  SubstituteCard, TabBar, FAB, GroupHead, ParkedBadge, PrivacyLine, EmptyState,
});

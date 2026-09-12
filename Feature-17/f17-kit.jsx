/* OmniKin · Feature 17 (Budgets & Expenses) — UI atoms. Consumes kit/omni-kit.jsx globals.
   Calm-and-bold, brand tokens only. Category colour is the connective tissue across
   every surface; the visibility chip travels with every record. */
const { OK_FONT, OK_MONO, I, memberBy, catBy, cadenceBy, F17_SCOPES, eur, remaining, pct } = window;

/* ───────── Feature-17 icon set (stroke, 24-grid — matches omni-kit) ───────── */
const MI = {
  wallet:  (c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5A2.5 2.5 0 015.5 6H18a3 3 0 013 3v7a3 3 0 01-3 3H6a3 3 0 01-3-3z"/><path d="M3 9h13M16.5 13h2"/></svg>,
  cart:    (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2.2l2 11h10.4l2-8H7"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg>,
  car:     (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16v-3.2L6 8h12l2 4.8V16M4 16h16M4 16v2M20 16v2"/><circle cx="8" cy="16" r="1.3"/><circle cx="16" cy="16" r="1.3"/></svg>,
  hammer:  (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 6.5l4 4M11 9L4 16a2 2 0 003 3l7-7"/><path d="M12.5 3.5l8 8-3 3-8-8z"/></svg>,
  cap:     (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.2 2.7 3 6 3s6-1.8 6-3v-5"/></svg>,
  sun:     (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8"/></svg>,
  coins:   (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="6.5" rx="7" ry="3"/><path d="M5 6.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5M5 11.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/></svg>,
  trend:   (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17l5-5 3.5 3.5L20 8"/><path d="M20 13V8h-5"/></svg>,
  alert:   (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5L22 19H2z"/><path d="M12 9.5v4M12 16.5h.01"/></svg>,
  eyeScope:(c, s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="2.6"/></svg>,
  people:  (c, s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3 19a6 6 0 0112 0M16.5 5.4a3.2 3.2 0 010 5.2M18 19a6 6 0 00-1.6-4.1"/></svg>,
  people22:(c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.4"/><path d="M2.5 19.5a6.5 6.5 0 0113 0M16.8 5.2a3.4 3.4 0 010 5.6M19 19.5a6.5 6.5 0 00-1.8-4.5"/></svg>,
  repeat:  (c, s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2l3 3-3 3"/><path d="M20 5H8a4 4 0 00-4 4v1"/><path d="M7 22l-3-3 3-3"/><path d="M4 19h12a4 4 0 004-4v-1"/></svg>,
  cal:     (c, s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="16" rx="2.5"/><path d="M4 9.5h16M8 3v4M16 3v4"/></svg>,
  clock:   (c, s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>,
  receipt: (c, s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2.5h12v19l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h3"/></svg>,
  camera:  (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5A2.5 2.5 0 015.5 6h1.8l1.2-2h6.6l1.2 2h1.8A2.5 2.5 0 0121 8.5v8A2.5 2.5 0 0118.5 19h-13A2.5 2.5 0 013 16.5z"/><circle cx="12" cy="12.5" r="3.4"/></svg>,
  pencil:  (c, s=17) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4"/></svg>,
  trash:   (c, s=17) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V4.5h6V7M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>,
  archive: (c, s=17) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="4.5" rx="1.5"/><path d="M5 8.5V20h14V8.5M10 13h4"/></svg>,
  sync:    (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0115.5-6.2M21 4v4h-4M21 12a9 9 0 01-15.5 6.2M3 20v-4h4"/></svg>,
  bell:    (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 004 0"/></svg>,
  mute:    (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l18 18"/><path d="M8.2 6.2A6 6 0 0118 9c0 5 2 6 2 6H7M10 20a2 2 0 004 0"/></svg>,
  swap:    (c, s=17) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>,
  dots:    (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>,
  close:   (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  shieldOk:(c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5l7.5 3v5.5c0 4.6-3.2 8.4-7.5 10-4.3-1.6-7.5-5.4-7.5-10V5.5z"/><path d="M8.8 12.2l2.2 2.2 4.2-4.6"/></svg>,
  lockOut: (c, s=34) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7a4 4 0 018 0v3.5M12 14.5v2"/></svg>,
  wifiOff: (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3l20 20M8.5 16.4a5 5 0 016.5-.3M5 12.5a10 10 0 014-2.2M2 8.8A15 15 0 016.5 6M12 5c3.6 0 7 1.4 9.5 3.8"/><path d="M12 20h.01"/></svg>,
};
const CAT_ICON = { cart: MI.cart, car: MI.car, hammer: MI.hammer, cap: MI.cap, sun: MI.sun, coins: MI.coins };

/* ───────── layout atoms ───────── */
const Pad    = ({ children, style }) => <div style={{ padding: '0 20px', ...style }}>{children}</div>;
const H1     = ({ t, children, style }) => <div style={{ fontFamily: OK_FONT, fontSize: 26, fontWeight: 700, color: t.title, letterSpacing: -0.5, lineHeight: 1.15, ...style }}>{children}</div>;
const Lead   = ({ t, children, style }) => <div style={{ fontFamily: OK_FONT, fontSize: 15, color: t.slate, lineHeight: 1.5, ...style }}>{children}</div>;
const Spacer = ({ h }) => <div style={{ height: h, flex: '0 0 auto' }} />;
const Grow   = () => <div style={{ flex: 1 }} />;
const Link   = ({ t, children, onClick, style }) => <span onClick={onClick} style={{ fontFamily: OK_FONT, color: t.teal500, fontWeight: 600, cursor: 'pointer', ...style }}>{children}</span>;
const Kicker = ({ t, children, style }) => <div style={{ fontFamily: OK_MONO, fontSize: 11, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase', color: t.muted, ...style }}>{children}</div>;
const Money  = ({ children, style, size = 15, weight = 700 }) => <span style={{ fontFamily: OK_MONO, fontSize: size, fontWeight: weight, letterSpacing: -0.2, ...style }}>{children}</span>;

function Avatar({ color, name, size = 36, ring }) {
  return <div style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: OK_FONT, fontWeight: 700, fontSize: size * 0.4, flex: '0 0 auto', boxShadow: ring ? `0 0 0 2px ${ring}` : 'none' }}>{name ? name[0].toUpperCase() : ''}</div>;
}
function AvatarStack({ ids, size = 26, max = 4, t, ringColor }) {
  const shown = ids.slice(0, max);
  const extra = ids.length - shown.length;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {shown.map((id, i) => { const m = memberBy(id); return <div key={id} style={{ marginLeft: i === 0 ? 0 : -size * 0.34 }}><Avatar color={m.c} name={m.n} size={size} ring={ringColor || t.surface} /></div>; })}
      {extra > 0 && <div style={{ marginLeft: -size * 0.34, width: size, height: size, borderRadius: '50%', background: t.surfaceAlt, boxShadow: `0 0 0 2px ${ringColor || t.surface}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: OK_FONT, fontSize: size * 0.36, fontWeight: 700, color: t.slate }}>+{extra}</div>}
    </div>
  );
}

function Card({ t, children, style, pad = 16, onClick }) {
  return <div onClick={onClick} style={{ background: t.surface, borderRadius: 16, padding: pad, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, cursor: onClick ? 'pointer' : 'default', ...style }}>{children}</div>;
}

function GroupHead({ t, children, right, style }) {
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px', ...style }}><Kicker t={t}>{children}</Kicker>{right}</div>;
}

/* ───────── chips ───────── */
function CatChip({ t, cat, sm }) {
  const c = catBy(cat);
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: sm ? 11 : 12, fontWeight: 600, color: t.slate, background: t.surfaceAlt, padding: sm ? '2px 9px' : '3px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}><span style={{ width: 7, height: 7, borderRadius: 2, background: c.c }} />{c.label}</span>;
}
function CadenceChip({ t, cadence, sm, light }) {
  const c = cadenceBy(cadence);
  const fg = light ? 'rgba(255,255,255,.92)' : t.teal700;
  const bg = light ? 'rgba(255,255,255,.16)' : t.panelTeal;
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: sm ? 10.5 : 11.5, fontWeight: 700, color: fg, background: bg, padding: sm ? '2px 8px' : '3px 10px', borderRadius: 999, letterSpacing: .2, whiteSpace: 'nowrap' }}>{c.label}</span>;
}
/* Visibility chip — travels with every budget and expense (US-17.2.1) */
function ScopeChip({ t, scope, seen, sm, light }) {
  const s = F17_SCOPES[scope] || F17_SCOPES.household;
  const fg = light ? 'rgba(255,255,255,.9)' : (scope === 'household' ? t.slate : t.blue);
  const bg = light ? 'rgba(255,255,255,.14)' : (scope === 'household' ? t.surfaceAlt : t.panelBlue);
  const icon = scope === 'household' ? MI.people(fg, sm ? 12 : 13) : scope === 'self' ? I.lock(fg, sm ? 12 : 13) : MI.eyeScope(fg, sm ? 12 : 13);
  const label = scope === 'chosen' && seen ? `${seen.length} members` : s.short;
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: sm ? 10.5 : 11.5, fontWeight: 600, color: fg, background: bg, padding: sm ? '2px 8px' : '3px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>{icon}{label}</span>;
}
function FlagChip({ t, sm }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: sm ? 10.5 : 11.5, fontWeight: 700, color: t.warning, background: 'rgba(224,165,60,.16)', padding: sm ? '2px 8px' : '3px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>{MI.alert(t.warning, sm ? 12 : 13)}Pacing over</span>;
}
function ParkedBadge({ t }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: t.blue, background: t.panelBlue, padding: '5px 11px', borderRadius: 999 }}>{MI.clock(t.blue, 13)}Not in this release</span>;
}

/* ───────── spend bar: fill + a marker where the pace projects to land ───────── */
function SpendBar({ t, b, h = 8, light, showProjection = true }) {
  const p = pct(b);
  const proj = Math.min(112, Math.round((b.projected / b.amount) * 100));
  const over = b.flag === 'atRisk';
  const fill = light ? '#fff' : (over ? t.warning : catBy(b.cat).c);
  const track = light ? 'rgba(255,255,255,.22)' : t.surfaceAlt;
  return (
    <div style={{ position: 'relative', height: h, borderRadius: h / 2, background: track, overflow: 'visible' }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: h / 2, overflow: 'hidden' }}>
        <div style={{ width: `${p}%`, height: '100%', background: fill, borderRadius: h / 2, transition: 'width .5s' }} />
      </div>
      {showProjection && over && proj > p && (
        <div title="Projected at this pace" style={{ position: 'absolute', top: -3, left: `calc(${Math.min(proj, 100)}% - 1px)`, width: 2.5, height: h + 6, borderRadius: 2, background: t.error }} />
      )}
    </div>
  );
}

/* ───────── ring for the bold hero (conic, no hand-drawn svg) ───────── */
function Ring({ t, value, size = 116, thickness = 13, tone = '#fff', track = 'rgba(255,255,255,.22)', hole, children }) {
  const inner = size - thickness * 2;
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `conic-gradient(${tone} ${value * 3.6}deg, ${track} 0deg)`, WebkitMask: `radial-gradient(closest-side, transparent calc(100% - ${thickness}px), #000 calc(100% - ${thickness}px))`, mask: `radial-gradient(closest-side, transparent calc(100% - ${thickness}px), #000 calc(100% - ${thickness}px))` }} />
      <div style={{ position: 'relative', width: inner, height: inner, borderRadius: '50%', background: hole || 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
    </div>
  );
}

/* ───────── budget row — compact (A) ───────── */
function BudgetRow({ t, b, onClick, last }) {
  const c = catBy(b.cat);
  const over = b.flag === 'atRisk';
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 16px', borderBottom: last ? 'none' : `1px solid ${t.hairline}`, cursor: onClick ? 'pointer' : 'default', background: over ? 'rgba(224,165,60,.06)' : 'transparent' }}>
      <div style={{ width: 38, height: 38, borderRadius: 11, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{CAT_ICON[c.icon](c.c, 19)}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.name}</span>
          <Grow />
          <Money size={14} style={{ color: over ? t.warning : t.ink }}>{eur(b.spent)}</Money>
          <span style={{ fontFamily: OK_MONO, fontSize: 12, color: t.muted }}>/ {eur(b.amount)}</span>
        </div>
        <div style={{ marginTop: 7 }}><SpendBar t={t} b={b} h={6} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7, flexWrap: 'wrap' }}>
          <CadenceChip t={t} cadence={b.cadence} sm />
          <ScopeChip t={t} scope={b.scope} seen={b.seen} sm />
          {over ? <FlagChip t={t} sm /> : <span style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.slate, fontWeight: 600 }}>{eur(remaining(b))} left</span>}
        </div>
      </div>
      {onClick && I.chevR(t.muted, 17)}
    </div>
  );
}

/* ───────── budget card — airy (B) ───────── */
function BudgetCard({ t, b, onClick }) {
  const c = catBy(b.cat);
  const over = b.flag === 'atRisk';
  return (
    <div onClick={onClick} style={{ background: t.surface, borderRadius: 18, border: `1px solid ${over ? 'rgba(224,165,60,.55)' : t.hairline}`, boxShadow: t.shadowSm, padding: 16, cursor: onClick ? 'pointer' : 'default', borderLeft: `4px solid ${over ? t.warning : c.c}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{CAT_ICON[c.icon](c.c, 18)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.ink }}>{b.name}</div>
          <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 2 }}>{cadenceBy(b.cadence).label} · {b.period}</div>
        </div>
        {onClick && I.chevR(t.muted, 17)}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 14 }}>
        <Money size={25} weight={700} style={{ color: over ? t.warning : t.ink }}>{eur(b.spent)}</Money>
        <span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.muted, fontWeight: 600 }}>of {eur(b.amount)}</span>
        <Grow />
        <span style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 700, color: over ? t.warning : t.green }}>{eur(remaining(b))} left</span>
      </div>
      <div style={{ marginTop: 10 }}><SpendBar t={t} b={b} h={9} /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
        <ScopeChip t={t} scope={b.scope} seen={b.seen} />
        {b.repeat && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 600, color: t.slate }}>{MI.repeat(t.teal500, 13)}Repeats</span>}
        {over && <FlagChip t={t} />}
      </div>
    </div>
  );
}

/* ───────── expense row ───────── */
function ExpenseRow({ t, e, onClick, last, airy }) {
  const m = memberBy(e.by);
  const c = catBy(e.cat);
  const sym = e.cur === 'EUR' ? '€' : e.cur + ' ';
  const wrap = airy
    ? { background: t.surface, borderRadius: 14, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, padding: '13px 14px', marginBottom: 9 }
    : { borderBottom: last ? 'none' : `1px solid ${t.hairline}`, padding: '12px 16px' };
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: onClick ? 'pointer' : 'default', ...wrap }}>
      <Avatar color={m.c} name={m.n} size={34} ring={t.surface} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted }}>{m.n} · {e.time}</span>
          <CatChip t={t} cat={e.cat} sm />
          {e.receipt && MI.receipt(t.muted, 13)}
          {e.mixed && <span style={{ fontFamily: OK_FONT, fontSize: 10.5, fontWeight: 700, color: t.blue, background: t.panelBlue, padding: '2px 7px', borderRadius: 999 }}>{e.cur}</span>}
        </div>
      </div>
      <div style={{ textAlign: 'right', flex: '0 0 auto' }}>
        <Money size={15}>{sym}{e.amount.toFixed(2)}</Money>
        {e.scope !== 'household' && <div style={{ marginTop: 4, display: 'flex', justifyContent: 'flex-end' }}>{I.lock(t.muted, 12)}</div>}
      </div>
    </div>
  );
}

/* ───────── segmented control ───────── */
function Seg({ t, options, value, onChange, full, light }) {
  return (
    <div style={{ display: 'flex', background: light ? 'rgba(255,255,255,.16)' : t.surfaceAlt, borderRadius: 11, padding: 3, gap: 3, width: full ? '100%' : 'auto' }}>
      {options.map((o) => {
        const on = o.v === value;
        return <button key={o.v} onClick={() => onChange && onChange(o.v)} style={{ flex: full ? 1 : '0 0 auto', border: 'none', borderRadius: 8, padding: '8px 13px', cursor: 'pointer', background: on ? (light ? '#fff' : t.surface) : 'transparent', boxShadow: on ? t.shadowSm : 'none', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: on ? t.teal700 : (light ? 'rgba(255,255,255,.85)' : t.slate), transition: 'all .15s', whiteSpace: 'nowrap' }}>{o.label}</button>;
      })}
    </div>
  );
}

/* ───────── bottom sheet ───────── */
function Sheet({ t, platform, children, onClose, title, sub, maxH }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: t.sheetScrim, animation: 'okfade .2s ease' }} />
      <div style={{ position: 'relative', background: t.surface, borderTopLeftRadius: 26, borderTopRightRadius: 26, boxShadow: '0 -10px 40px rgba(14,58,64,.22)', maxHeight: maxH || '88%', display: 'flex', flexDirection: 'column', animation: 'oksheet .32s cubic-bezier(.2,.8,.25,1)', paddingBottom: platform === 'ios' ? 22 : 14 }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}><div style={{ width: 40, height: 5, borderRadius: 3, background: t.hairline }} /></div>
        {title && <div style={{ padding: '12px 22px 2px' }}>
          <div style={{ fontFamily: OK_FONT, fontSize: 18, fontWeight: 700, color: t.title }}>{title}</div>
          {sub && <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, marginTop: 3, lineHeight: 1.45 }}>{sub}</div>}
        </div>}
        <div style={{ overflow: 'auto', padding: '10px 22px 6px' }}>{children}</div>
      </div>
    </div>
  );
}

/* ───────── tab bar (Budgets is NOT a tab — it is reached from the Home card) ───────── */
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

function FAB({ t, onClick, icon, label }) {
  return (
    <button onClick={onClick} style={{ position: 'absolute', right: 18, bottom: 92, zIndex: 20, height: 54, borderRadius: 27, border: 'none', cursor: 'pointer', background: t.coral, color: '#fff', display: 'flex', alignItems: 'center', gap: 8, padding: label ? '0 20px 0 18px' : 0, width: label ? 'auto' : 54, justifyContent: 'center', boxShadow: '0 8px 22px rgba(226,104,60,.4)', fontFamily: OK_FONT, fontSize: 15, fontWeight: 700 }}>
      {icon || I.plus('#fff', 22)}{label}
    </button>
  );
}

function PrivacyLine({ t, children, center }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, justifyContent: center ? 'center' : 'flex-start' }}>
      {I.lock(t.muted, 14)}
      <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, lineHeight: 1.5, textAlign: center ? 'center' : 'left' }}>{children}</span>
    </div>
  );
}

function ToggleRow({ t, label, sub, value, onChange, icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0' }}>
      {icon && <span style={{ flex: '0 0 auto', display: 'flex' }}>{icon}</span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{label}</div>
        {sub && <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2, lineHeight: 1.4 }}>{sub}</div>}
      </div>
      <button onClick={() => onChange && onChange(!value)} style={{ width: 46, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer', background: value ? t.green : t.hairline, position: 'relative', transition: 'background .2s', flex: '0 0 auto' }}>
        <span style={{ position: 'absolute', top: 3, left: value ? 21 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.25)', transition: 'left .2s' }} />
      </button>
    </div>
  );
}

/* ───────── choice rows used across create / edit / scope flows ───────── */
function ChoiceRow({ t, label, sub, on, onClick, icon, right, radio }) {
  return (
    <button onClick={onClick} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, border: 'none', borderRadius: 13, padding: '13px 14px', marginBottom: 8, cursor: 'pointer', background: on ? t.panelTeal : t.surfaceAlt, boxShadow: on ? `inset 0 0 0 1.5px ${t.teal300}` : 'none', transition: 'all .15s' }}>
      {icon && <span style={{ flex: '0 0 auto', display: 'flex' }}>{icon}</span>}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 700, color: on ? t.teal800 : t.ink }}>{label}</span>
        {sub && <span style={{ display: 'block', fontFamily: OK_FONT, fontSize: 12, color: t.slate, marginTop: 2, lineHeight: 1.4 }}>{sub}</span>}
      </span>
      {right}
      {radio && <span style={{ width: 22, height: 22, borderRadius: '50%', flex: '0 0 auto', background: on ? t.teal700 : 'transparent', boxShadow: on ? 'none' : `inset 0 0 0 2px ${t.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && I.check('#fff', 13)}</span>}
    </button>
  );
}

/* ───────── mini bar pair (budget vs actual) for trends ───────── */
function TrendBars({ t, rows, max }) {
  const top = max || Math.max(...rows.map((r) => Math.max(r.budget, r.actual)));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 128 }}>
      {rows.map((r) => (
        <div key={r.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 100, width: '100%', justifyContent: 'center' }}>
            <div title="Budget" style={{ width: 13, height: `${(r.budget / top) * 100}%`, borderRadius: '4px 4px 0 0', background: t.hairline }} />
            <div title="Actual" style={{ width: 13, height: `${(r.actual / top) * 100}%`, borderRadius: '4px 4px 0 0', background: r.partial ? t.teal300 : t.teal500, opacity: r.partial ? 0.85 : 1 }} />
          </div>
          <span style={{ fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 600, color: r.partial ? t.teal700 : t.slate }}>{r.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ───────── amount keypad (fast capture: seconds, offline-tolerant) ───────── */
function Keypad({ t, onKey, platform }) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'del'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9, padding: '0 16px' }}>
      {keys.map((k) => (
        <button key={k} onClick={() => onKey && onKey(k)} style={{ height: 52, borderRadius: 13, border: 'none', background: t.surface, boxShadow: `inset 0 0 0 1px ${t.hairline}`, cursor: 'pointer', fontFamily: OK_MONO, fontSize: 20, fontWeight: 600, color: t.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {k === 'del' ? MI.close(t.slate, 18) : k}
        </button>
      ))}
    </div>
  );
}

Object.assign(window, {
  MI, CAT_ICON, Pad, H1, Lead, Spacer, Grow, Link, Kicker, Money,
  Avatar, AvatarStack, Card, GroupHead, CatChip, CadenceChip, ScopeChip, FlagChip, ParkedBadge,
  SpendBar, Ring, BudgetRow, BudgetCard, ExpenseRow, Seg, Sheet, TabBar, FAB,
  PrivacyLine, ToggleRow, ChoiceRow, TrendBars, Keypad,
});

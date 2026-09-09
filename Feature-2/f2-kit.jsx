/* OmniKin · Feature 2 — shared management UI atoms. Consumes kit/omni-kit.jsx globals. */
const { OK_FONT, OK_MONO, I } = window;

/* ───────── layout atoms (mirror Feature 1 screen helpers) ───────── */
const Pad   = ({ children, style }) => <div style={{ padding: '0 20px', ...style }}>{children}</div>;
const H1    = ({ t, children, style }) => <div style={{ fontFamily: OK_FONT, fontSize: 26, fontWeight: 700, color: t.title, letterSpacing: -0.5, lineHeight: 1.15, ...style }}>{children}</div>;
const Lead  = ({ t, children, style }) => <div style={{ fontFamily: OK_FONT, fontSize: 15, color: t.slate, lineHeight: 1.5, ...style }}>{children}</div>;
const Spacer = ({ h }) => <div style={{ height: h, flex: '0 0 auto' }} />;
const Grow  = () => <div style={{ flex: 1 }} />;
const Link  = ({ t, children, onClick, style }) => <span onClick={onClick} style={{ fontFamily: OK_FONT, color: t.teal500, fontWeight: 600, cursor: 'pointer', ...style }}>{children}</span>;
const Kicker = ({ t, children, style }) => <div style={{ fontFamily: OK_MONO, fontSize: 11, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase', color: t.muted, ...style }}>{children}</div>;

/* ───────── Avatar (initial in a colour disc) ───────── */
function Avatar({ color, name, size = 38, ring, you }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: OK_FONT, fontWeight: 700, fontSize: size * 0.4, flex: '0 0 auto', boxShadow: ring ? `0 0 0 2px ${ring}` : 'none', position: 'relative' }}>
      {name ? name[0].toUpperCase() : ''}
    </div>
  );
}

function AvatarStack({ members, size = 30, max = 5, t }) {
  const shown = members.slice(0, max);
  const extra = members.length - shown.length;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {shown.map((m, i) => (
        <div key={m.id || i} style={{ marginLeft: i === 0 ? 0 : -size * 0.32 }}>
          <Avatar color={m.c} name={m.n} size={size} ring={t.surface} />
        </div>
      ))}
      {extra > 0 && (
        <div style={{ marginLeft: -size * 0.32, width: size, height: size, borderRadius: '50%', background: t.surfaceAlt, boxShadow: `0 0 0 2px ${t.surface}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: OK_FONT, fontSize: size * 0.36, fontWeight: 700, color: t.slate }}>+{extra}</div>
      )}
    </div>
  );
}

/* ───────── Role badge — restrained, brand-token tints ───────── */
function roleTint(t, tier) {
  switch (tier) {
    case 'owner': return [t.panelGreen, t.green];
    case 'guard': return [t.panelTeal, t.teal800];
    case 'minor': return [t.panelBlue, t.blue];
    default:      return [t.surfaceAlt, t.slate]; // adult + extended
  }
}
function tierFor(role) {
  const map = { Owner: 'owner', 'Co-owner': 'owner', Guardian: 'guard', Adult: 'adult', Teen: 'minor', Child: 'minor' };
  return map[role] || 'ext';
}
function RoleBadge({ t, role, tier, size = 'md' }) {
  const [bg, fg] = roleTint(t, tier || tierFor(role));
  const sm = size === 'sm';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', fontFamily: OK_FONT, fontSize: sm ? 10 : 11.5, fontWeight: 700, letterSpacing: 0.2, color: fg, background: bg, padding: sm ? '2px 7px' : '3px 9px', borderRadius: 999, whiteSpace: 'nowrap', textTransform: sm ? 'uppercase' : 'none' }}>{role}</span>
  );
}

/* ───────── Access level — bars + label (never colour alone) ───────── */
const LEVELS = {
  0:    { label: 'None',        bars: 0, key: 'none' },
  1:    { label: 'View',        bars: 1, key: 'view' },
  2:    { label: 'Contribute',  bars: 2, key: 'contrib' },
  3:    { label: 'Manage',      bars: 3, key: 'manage' },
  hh:   { label: 'Household-only', bars: 2, key: 'special' },
  sc:   { label: 'Scoped',      bars: 1, key: 'special' },
};
function levelColor(t, lvl) {
  if (lvl === 0) return t.muted;
  if (lvl === 1) return t.teal300;
  if (lvl === 2) return t.teal500;
  if (lvl === 3) return t.teal700;
  return t.warning; // special
}
function Bars({ t, lvl }) {
  const info = LEVELS[lvl];
  const col = levelColor(t, lvl);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 14 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ width: 4, height: 5 + i * 4.5, borderRadius: 1.5, background: i < info.bars ? col : t.hairline, transition: 'background .2s' }} />
      ))}
    </div>
  );
}
function AccessLevel({ t, lvl, compact }) {
  const info = LEVELS[lvl];
  const col = levelColor(t, lvl);
  if (compact) return <Bars t={t} lvl={lvl} />;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
      <Bars t={t} lvl={lvl} />
      <span style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: lvl === 0 ? t.muted : t.ink }}>{info.label}</span>
    </div>
  );
}

/* ───────── Invite status chip ───────── */
function StatusChip({ t, status }) {
  const map = {
    Sent:     [t.panelTeal, t.teal700],
    Opened:   [t.panelBlue, t.blue],
    Accepted: [t.panelGreen, t.green],
    Expired:  [t.surfaceAlt, t.muted],
    Revoked:  ['rgba(201,69,59,.12)', t.error],
  };
  const [bg, fg] = map[status] || map.Sent;
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: fg, background: bg, padding: '3px 9px', borderRadius: 999 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: fg }} />{status}</span>;
}

/* ───────── Cards & rows ───────── */
function Card({ t, children, style, pad = 16, onClick }) {
  return <div onClick={onClick} style={{ background: t.surface, borderRadius: 16, padding: pad, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, cursor: onClick ? 'pointer' : 'default', ...style }}>{children}</div>;
}

function MemberRow({ t, m, onClick, right, sub }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', border: 'none', background: 'transparent', cursor: onClick ? 'pointer' : 'default', padding: '10px 0' }}>
      <Avatar color={m.c} name={m.n} size={44} ring={t.surface} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: OK_FONT, fontSize: 15.5, fontWeight: 600, color: t.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.full || m.n}</span>
          {m.you && <span style={{ fontFamily: OK_FONT, fontSize: 11, fontWeight: 700, color: t.teal700 }}>You</span>}
        </div>
        <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub || `${m.joined} · ${m.last}`}</div>
      </div>
      {right || <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><RoleBadge t={t} role={m.role} />{onClick && I.chevR(t.muted, 17)}</div>}
    </button>
  );
}

/* ───────── Settings-style grouped list (Version A) ───────── */
function ListGroup({ t, title, children, style }) {
  return (
    <div style={style}>
      {title && <Kicker t={t} style={{ margin: '0 4px 8px' }}>{title}</Kicker>}
      <div style={{ background: t.surface, borderRadius: 14, border: `1px solid ${t.hairline}`, overflow: 'hidden', boxShadow: t.shadowSm }}>{children}</div>
    </div>
  );
}
function ListRow({ t, icon, iconBg, label, value, sub, right, onClick, last, danger }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left', border: 'none', borderBottom: last ? 'none' : `1px solid ${t.hairline}`, background: 'transparent', cursor: onClick ? 'pointer' : 'default', padding: '13px 15px' }}>
      {icon && <div style={{ width: 32, height: 32, borderRadius: 9, background: iconBg || t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{icon}</div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 500, color: danger ? t.error : t.ink }}>{label}</div>
        {sub && <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2 }}>{sub}</div>}
      </div>
      {value && <span style={{ fontFamily: OK_FONT, fontSize: 14, color: t.slate, marginRight: 2 }}>{value}</span>}
      {right}
      {onClick && !right && I.chevR(t.muted, 17)}
    </button>
  );
}

/* ───────── In-screen segmented tabs (Version B hub) ───────── */
function SegTabs({ t, tabs, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 6, background: t.surfaceAlt, borderRadius: 12, padding: 4 }}>
      {tabs.map((tab) => {
        const on = tab.id === value;
        return (
          <button key={tab.id} onClick={() => onChange && onChange(tab.id)} style={{ flex: 1, border: 'none', borderRadius: 9, padding: '9px 6px', cursor: 'pointer', background: on ? t.surface : 'transparent', boxShadow: on ? t.shadowSm : 'none', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: on ? t.teal700 : t.slate, transition: 'all .15s' }}>{tab.label}</button>
        );
      })}
    </div>
  );
}

/* ───────── Toggle switch ───────── */
function Toggle({ t, on, onChange, color }) {
  return (
    <button onClick={() => onChange && onChange(!on)} style={{ width: 46, height: 27, borderRadius: 14, border: 'none', cursor: 'pointer', background: on ? (color || t.green) : t.hairline, position: 'relative', transition: 'background .2s', flex: '0 0 auto' }}>
      <div style={{ position: 'absolute', top: 2.5, left: on ? 22 : 2.5, width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.25)', transition: 'left .2s' }} />
    </button>
  );
}

/* ───────── Role tile (selectable, for role pickers) ───────── */
function RoleTile({ t, role, selected, onClick, disabled }) {
  return (
    <button onClick={disabled ? undefined : onClick} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, width: '100%', textAlign: 'left', padding: '14px 15px', borderRadius: 14, cursor: disabled ? 'default' : 'pointer', background: selected ? t.panelTeal : t.surface, border: `1.5px solid ${selected ? t.teal500 : t.hairline}`, opacity: disabled ? 0.4 : 1, transition: 'all .15s' }}>
      <div style={{ width: 22, height: 22, borderRadius: '50%', flex: '0 0 auto', marginTop: 1, border: `2px solid ${selected ? t.teal500 : t.hairline}`, background: selected ? t.teal500 : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{selected && I.check('#fff', 13)}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 700, color: t.ink }}>{role.name}</span>
          {disabled && <span style={{ fontFamily: OK_FONT, fontSize: 11, color: t.muted }}>above your level</span>}
        </div>
        <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.slate, marginTop: 3, lineHeight: 1.45 }}>{role.blurb}</div>
      </div>
    </button>
  );
}

/* ───────── QR placeholder (deterministic square grid) ───────── */
function QR({ t, size = 150 }) {
  const N = 11;
  const seed = [0,1,1,0,1,0,1,1,0,1,0, 1,0,0,1,0,1,0,0,1,1,0, 1,0,1,1,0,1,1,0,0,1,1, 0,1,0,0,1,1,0,1,0,1,0, 1,1,0,1,0,0,1,0,1,1,0, 0,1,1,0,1,1,0,1,0,0,1, 1,0,0,1,0,1,1,0,1,1,0, 0,1,1,0,1,0,0,1,0,1,1, 1,0,1,1,0,1,1,0,1,0,0, 0,1,0,0,1,0,1,1,0,1,1, 1,1,0,1,0,1,0,0,1,0,1];
  const cell = size / N;
  const finder = (r, c) => (r < 3 && c < 3) || (r < 3 && c > N - 4) || (r > N - 4 && c < 3);
  return (
    <div style={{ width: size, height: size, background: '#fff', borderRadius: 14, padding: cell, border: `1px solid ${t.hairline}`, display: 'grid', gridTemplateColumns: `repeat(${N}, 1fr)`, gap: 0 }}>
      {Array.from({ length: N * N }).map((_, i) => {
        const r = Math.floor(i / N), c = i % N;
        const on = finder(r, c) ? !((r === 0 || r === 2 || c === 0 || c === 2 || (r > N - 4 && (r === N - 3 || r === N - 1)) || (c > N - 4 && (c === N - 3 || c === N - 1)))) || (r === 1 && c === 1) || (r === 1 && c === N - 2) || (r === N - 2 && c === 1) : seed[i % seed.length] === 1;
        return <div key={i} style={{ background: on ? t.teal900 : 'transparent' }} />;
      })}
    </div>
  );
}

Object.assign(window, {
  Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, AvatarStack, RoleBadge, roleTint, tierFor,
  AccessLevel, Bars, LEVELS, levelColor,
  StatusChip, Card, MemberRow, ListGroup, ListRow, SegTabs, Toggle, RoleTile, QR,
});

/* OmniKin · shared kit: themes, icons, device frame, primitives.
   Tokens lifted verbatim from OmniKin Style Guide v1.0. */

const OK_FONT = 'var(--ok-font, Inter, "Segoe UI", Roboto, system-ui, Arial, sans-serif)';
const OK_MONO = '"Roboto Mono", ui-monospace, "SF Mono", Menlo, monospace';

const OK_THEMES = {
  light: {
    name: 'light',
    bg: '#F6FAFA', surface: '#FFFFFF', surfaceAlt: '#F1F7F7',
    panelTeal: '#E4F0F1', panelBlue: '#E6EDF3', panelGreen: '#E1F1E7', panelCoral: '#FBE7DD',
    ink: '#1E2A2D', slate: '#586A6D', muted: '#8A999B', hairline: '#DCE5E6',
    teal900: '#0E3A40', teal800: '#14525B', teal700: '#1C6E78', teal500: '#2A8C99', teal300: '#74B7C0', teal100: '#E4F0F1',
    coral: '#E2683C', coral100: '#FBE7DD', blue: '#2E5A87', green: '#2E8C5A', green100: '#E1F1E7',
    warning: '#E0A53C', error: '#C9453B', info: '#2A8C99',
    title: '#1C6E78', subhead: '#2E5A87', onFill: '#FFFFFF',
    fieldBg: '#FFFFFF', fieldBorder: '#DCE5E6', fieldText: '#1E2A2D',
    statusInk: '#0E3A40',
    shadow: '0 1px 2px rgba(14,58,64,.06), 0 10px 30px rgba(14,58,64,.10)',
    shadowSm: '0 1px 2px rgba(14,58,64,.08)',
    sheetScrim: 'rgba(14,58,64,.42)',
  },
  dark: {
    name: 'dark',
    bg: '#08191C', surface: '#0F2C31', surfaceAlt: '#0C2429',
    panelTeal: '#123A40', panelBlue: '#16313C', panelGreen: '#123528', panelCoral: '#36211A',
    ink: '#EAF3F3', slate: '#9FB6B8', muted: '#6E8689', hairline: '#21474D',
    teal900: '#0E3A40', teal800: '#14525B', teal700: '#2A8C99', teal500: '#3FA7B4', teal300: '#74B7C0', teal100: '#123A40',
    coral: '#E97A4F', coral100: '#36211A', blue: '#8FB3DC', green: '#42B47E', green100: '#123528',
    warning: '#E9B454', error: '#E06A60', info: '#3FA7B4',
    title: '#7FC4CD', subhead: '#8FB3DC', onFill: '#FFFFFF',
    fieldBg: '#0C2429', fieldBorder: '#244C53', fieldText: '#EAF3F3',
    statusInk: '#EAF3F3',
    shadow: '0 1px 2px rgba(0,0,0,.5), 0 14px 36px rgba(0,0,0,.5)',
    shadowSm: '0 1px 2px rgba(0,0,0,.5)',
    sheetScrim: 'rgba(0,0,0,.6)',
  },
};

/* Avatar palette from the "household palette" idea in the PRD */
const OK_AVATARS = ['#1C6E78', '#E2683C', '#2E5A87', '#2E8C5A', '#9C5BB0', '#E0A53C', '#C9453B', '#3F7DA6'];

/* ───────────────────────── Icons ───────────────────────── */
const I = {
  back: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7"/></svg>,
  chevR: (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7"/></svg>,
  chevD: (c, s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9l7 7 7-7"/></svg>,
  eye: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>,
  eyeOff: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l18 18M10.6 10.7a3 3 0 004.2 4.2M9.9 5.2A9.5 9.5 0 0112 5c6.5 0 10 7 10 7a16 16 0 01-3.3 4M6.5 6.6A16 16 0 002 12s3.5 7 10 7a9.7 9.7 0 003.6-.7"/></svg>,
  check: (c, s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  checkCircle: (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 12.2l2.4 2.4 4.6-5"/></svg>,
  mail: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M4 7l8 6 8-6"/></svg>,
  phone: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M11 18.5h2"/></svg>,
  lock: (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7a4 4 0 018 0v3.5"/></svg>,
  shield: (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5l7.5 3v5.5c0 4.6-3.2 8.4-7.5 10-4.3-1.6-7.5-5.4-7.5-10V5.5z"/></svg>,
  faceid: (c) => <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2"/><path d="M9 9.5v1M15 9.5v1M12 9v3l-1 1M9.5 15c1.5 1.2 3.5 1.2 5 0"/></svg>,
  finger: (c) => <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10v4a6 6 0 01-1.2 3.6M8.4 8.2A5 5 0 0117 12v1M5.5 12a6.5 6.5 0 012.2-4.9M15 13v1a8 8 0 01-.6 3M9 21a10 10 0 001-4.5V12a2 2 0 014 0v2"/></svg>,
  wifiOff: (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3l20 20M8.5 16.4a5 5 0 016.5-.3M5 12.5a10 10 0 014-2.2M2 8.8A15 15 0 016.5 6M12 5c3.6 0 7 1.4 9.5 3.8M19 12.4q.5.4 1 .9"/><path d="M12 20h.01"/></svg>,
  globe: (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.4 3.9 5.6 4 9-.1 3.4-1.5 6.6-4 9-2.5-2.4-3.9-5.6-4-9 .1-3.4 1.5-6.6 4-9z"/></svg>,
  user: (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.6"/><path d="M5 20a7 7 0 0114 0"/></svg>,
  home: (c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-6.5L20 11M6 9.5V20h12V9.5"/></svg>,
  cal: (c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="16" rx="2.5"/><path d="M4 9.5h16M8 3v4M16 3v4"/></svg>,
  list: (c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01"/></svg>,
  doc: (c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 16.5h6"/></svg>,
  gear: (c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7L5.6 5.6"/></svg>,
  plus: (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  google: () => <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.6 4.1 29.6 2 24 2 12 2 2 12 2 24s10 22 22 22c11 0 21-8 21-22 0-1.2-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.6 4.1 29.6 2 24 2 15.9 2 8.9 6.6 6.3 14.7z"/><path fill="#4CAF50" d="M24 46c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6C29.7 36.5 27 37.5 24 37.5c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C8.7 41.4 15.8 46 24 46z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.6 5.6C39 36.3 44 31 44 24c0-1.2-.1-2.3-.4-3.5z"/></svg>,
  apple: (c) => <svg width="19" height="19" viewBox="0 0 24 24" fill={c}><path d="M16.4 12.6c0-2.4 1.9-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.9-1.5-.1-2.8.8-3.6.8s-1.9-.8-3.1-.8c-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.7 2.5 3 2.4 1.2-.05 1.6-.8 3.1-.8s1.8.8 3.1.75c1.3 0 2.1-1.2 2.9-2.4.9-1.3 1.3-2.6 1.3-2.7-.03-.01-2.5-1-2.6-3.95zM14.3 5.6c.66-.8 1.1-1.9 1-3-.95.04-2.1.63-2.8 1.43-.6.7-1.1 1.8-1 2.9 1.05.08 2.1-.53 2.8-1.33z"/></svg>,
};

/* ───────────────────────── Device frame ───────────────────────── */
const SCREEN_W = 390, SCREEN_H = 844;
const TOP_INSET = 56, BOTTOM_INSET = 26;

function StatusBar({ platform, t, dark }) {
  const c = t.statusInk;
  if (platform === 'ios') {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: TOP_INSET, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', paddingTop: 14, zIndex: 6, pointerEvents: 'none' }}>
        <span style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 600, color: c, letterSpacing: .2 }}>9:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="18" height="11" viewBox="0 0 18 11" fill={c}><rect x="0" y="6" width="3" height="5" rx="1"/><rect x="4.5" y="4" width="3" height="7" rx="1"/><rect x="9" y="2" width="3" height="9" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
          <svg width="17" height="11" viewBox="0 0 17 12" fill={c}><path d="M8.5 2.5c2.2 0 4.2.85 5.7 2.25l1.05-1.1A9.4 9.4 0 008.5 1 9.4 9.4 0 001.25 3.65l1.05 1.1A8.2 8.2 0 018.5 2.5zM8.5 6c1.3 0 2.5.5 3.4 1.3l1.05-1.1A7 7 0 008.5 4.5a7 7 0 00-4.45 1.7L5.1 7.3A5.5 5.5 0 018.5 6zm0 3.4c.6 0 1.15.25 1.55.65l-1.55 1.6-1.55-1.6c.4-.4.95-.65 1.55-.65z"/></svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="1" y="1" width="20" height="10" rx="3" stroke={c} strokeOpacity="0.5"/><rect x="2.5" y="2.5" width="15" height="7" rx="1.5" fill={c}/><rect x="22.5" y="4" width="1.6" height="4" rx="0.8" fill={c} fillOpacity="0.5"/></svg>
        </div>
      </div>
    );
  }
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: TOP_INSET, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', paddingTop: 12, zIndex: 6, pointerEvents: 'none' }}>
      <span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 600, color: c }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={c}><path d="M8 9.5l7-7A9.8 9.8 0 008 0 9.8 9.8 0 001 2.5z" opacity="0.9"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={c}><rect x="0" y="7" width="3" height="5" rx="0.6"/><rect x="4.3" y="4.5" width="3" height="7.5" rx="0.6"/><rect x="8.6" y="2" width="3" height="10" rx="0.6"/><rect x="12.9" y="0" width="3" height="12" rx="0.6"/></svg>
        <svg width="22" height="12" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="1" width="20" height="10" rx="2.5" stroke={c} strokeOpacity="0.5"/><rect x="2" y="2.5" width="14" height="7" rx="1" fill={c}/><rect x="21.5" y="4" width="2" height="4" rx="1" fill={c} fillOpacity="0.5"/></svg>
      </div>
    </div>
  );
}

function HomeIndicator({ platform, t }) {
  if (platform === 'ios') {
    return <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 134, height: 5, borderRadius: 3, background: t.ink, opacity: 0.32, zIndex: 6 }} />;
  }
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: BOTTOM_INSET, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 64, zIndex: 6, pointerEvents: 'none' }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={t.slate} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l7 7 7-7"/></svg>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={t.slate} strokeWidth="2.2"><circle cx="12" cy="12" r="9"/></svg>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={t.slate} strokeWidth="2.2"><rect x="4" y="4" width="16" height="16" rx="2.5"/></svg>
    </div>
  );
}

/* The phone shell: bezel + screen content area. children render inside the screen. */
function DeviceFrame({ platform, t, dark, children, scale = 1 }) {
  const bezel = platform === 'ios' ? 16 : 13;
  const radius = platform === 'ios' ? 56 : 42;
  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div style={{
        width: SCREEN_W + bezel * 2, height: SCREEN_H + bezel * 2, borderRadius: radius + bezel,
        background: '#0b0b0d', padding: bezel, boxSizing: 'border-box',
        boxShadow: '0 2px 6px rgba(0,0,0,.35), 0 30px 70px rgba(0,0,0,.4), inset 0 0 0 2px #2a2a2e',
        position: 'relative',
      }}>
        <div style={{ width: SCREEN_W, height: SCREEN_H, borderRadius: radius, overflow: 'hidden', position: 'relative', background: t.bg, fontFamily: OK_FONT }}>
          {children}
          {/* notch / island / punch-hole */}
          {platform === 'ios'
            ? <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 122, height: 34, borderRadius: 20, background: '#0b0b0d', zIndex: 7 }} />
            : <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', width: 11, height: 11, borderRadius: 6, background: '#0b0b0d', zIndex: 7 }} />}
        </div>
      </div>
    </div>
  );
}

/* Screen scaffold: a full-bleed content region with safe-area padding.
   pad=true gives standard horizontal padding. */
function Screen({ t, platform, dark, children, bg, scroll = false, noBottomInset = false, footer = null }) {
  const bottomInset = noBottomInset ? 0 : (platform === 'ios' ? 22 : BOTTOM_INSET);
  return (
    <div style={{ position: 'absolute', inset: 0, background: bg || t.bg, display: 'flex', flexDirection: 'column' }}>
      <StatusBar platform={platform} t={t} dark={dark} />
      <div style={{ position: 'absolute', top: TOP_INSET, left: 0, right: 0, bottom: bottomInset, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* scroll region — flexes to fill, leaving the footer pinned below it (never overlapping) */}
        <div style={{ flex: 1, minHeight: 0, overflow: scroll ? 'auto' : 'hidden', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
        {footer && <div style={{ flex: '0 0 auto' }}>{footer}</div>}
      </div>
      <HomeIndicator platform={platform} t={t} />
    </div>
  );
}

/* ───────────────────────── Controls ───────────────────────── */
function Btn({ t, kind = 'primary', children, onClick, disabled, full = true, icon, style }) {
  const base = {
    height: t.btnH || 54, borderRadius: t.radius != null ? t.radius : 15, border: 'none', cursor: disabled ? 'default' : 'pointer',
    fontFamily: OK_FONT, fontSize: 16, fontWeight: 600, width: full ? '100%' : 'auto',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '0 20px',
    transition: 'transform .12s, filter .15s, background .15s', letterSpacing: .1,
    opacity: disabled ? 0.45 : 1,
  };
  const kinds = {
    primary: { background: t.coral, color: '#fff', boxShadow: t.name === 'light' ? '0 6px 18px rgba(226,104,60,.32)' : '0 6px 18px rgba(226,104,60,.28)' },
    teal: { background: t.teal700, color: '#fff' },
    outline: { background: 'transparent', color: t.teal500, boxShadow: `inset 0 0 0 1.5px ${t.hairline}` },
    ghost: { background: 'transparent', color: t.teal500, height: 'auto', padding: '6px' },
    sso: { background: t.surface, color: t.ink, boxShadow: `inset 0 0 0 1.5px ${t.hairline}` },
    ssoDark: { background: '#000', color: '#fff' },
  };
  return (
    <button onClick={disabled ? undefined : onClick} style={{ ...base, ...kinds[kind], ...style }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = 'scale(.985)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
      {icon}{children}
    </button>
  );
}

function Field({ t, label, value, placeholder, type = 'text', icon, trailing, helper, error, valid, mono, onChange, onFocus, focusedDefault }) {
  const [focus, setFocus] = React.useState(!!focusedDefault);
  const border = error ? t.error : focus ? t.teal500 : t.fieldBorder;
  return (
    <div style={{ marginBottom: 4 }}>
      {label && <div style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, marginBottom: 7 }}>{label}</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 52, padding: '0 14px', borderRadius: t.fieldRadius != null ? t.fieldRadius : 13, background: t.fieldBg, boxShadow: `inset 0 0 0 ${focus ? 2 : 1.5}px ${border}`, transition: 'box-shadow .15s' }}>
        {icon && <span style={{ flex: '0 0 auto', display: 'flex' }}>{icon}</span>}
        <input value={value} placeholder={placeholder} type={type} onChange={(e) => onChange && onChange(e.target.value)}
          onFocus={() => { setFocus(true); onFocus && onFocus(); }} onBlur={() => setFocus(false)}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: mono ? OK_MONO : OK_FONT, fontSize: 16, color: t.fieldText, minWidth: 0, letterSpacing: mono ? 1 : 0 }} />
        {valid && I.checkCircle(t.green, 19)}
        {trailing}
      </div>
      {(helper || error) && <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: error ? t.error : t.muted, marginTop: 6, lineHeight: 1.4, display: 'flex', alignItems: 'center', gap: 5 }}>{error && I.shield ? null : null}{error || helper}</div>}
    </div>
  );
}

function StrengthMeter({ t, score }) {
  // score 0..4
  const labels = ['Too weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
  const cols = [t.error, t.error, t.warning, t.green, t.green];
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: 'flex', gap: 5 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < score ? cols[score] : t.hairline, transition: 'background .25s' }} />
        ))}
      </div>
      <div style={{ fontFamily: OK_FONT, fontSize: 12.5, marginTop: 7, color: cols[score], fontWeight: 600 }}>{labels[score]}</div>
    </div>
  );
}

function OTPCells({ t, value, len = 6, active }) {
  return (
    <div style={{ display: 'flex', gap: 9, justifyContent: 'center' }}>
      {Array.from({ length: len }).map((_, i) => {
        const filled = i < value.length;
        const isActive = i === value.length && active;
        return (
          <div key={i} style={{ width: 'clamp(40px, 13vw, 46px)', height: 58, borderRadius: t.fieldRadius != null ? t.fieldRadius : 13, background: t.fieldBg, boxShadow: `inset 0 0 0 ${isActive ? 2 : 1.5}px ${isActive ? t.teal500 : filled ? t.teal300 : t.fieldBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: OK_MONO, fontSize: 26, fontWeight: 600, color: t.ink, transition: 'box-shadow .15s' }}>
            {value[i] || (isActive ? <span style={{ width: 2, height: 26, background: t.teal500, borderRadius: 2, animation: 'okblink 1s steps(2) infinite' }} /> : '')}
          </div>
        );
      })}
    </div>
  );
}

/* Progress dots used in creation flows */
function Steps({ t, n, i }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {Array.from({ length: n }).map((_, k) => (
        <div key={k} style={{ height: 4, borderRadius: 2, width: k === i ? 22 : 7, background: k <= i ? t.teal500 : t.hairline, transition: 'all .3s' }} />
      ))}
    </div>
  );
}

/* Top header inside a screen with back button + step dots */
function FlowHeader({ t, onBack, n, i, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 18px 2px', minHeight: 40 }}>
      <button onClick={onBack} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, marginLeft: -6, display: 'flex' }}>{onBack ? I.back(t.slate) : <span style={{ width: 22 }} />}</button>
      {n ? <Steps t={t} n={n} i={i} /> : <span />}
      <div style={{ width: 34, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
    </div>
  );
}

function Divider({ t, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '6px 0' }}>
      <div style={{ flex: 1, height: 1, background: t.hairline }} />
      <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, fontWeight: 500 }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: t.hairline }} />
    </div>
  );
}

function Banner({ t, tone = 'info', icon, children }) {
  const map = { info: [t.panelTeal, t.teal700, t.teal500], success: [t.panelGreen, t.green, t.green], warning: ['rgba(224,165,60,.14)', t.warning, t.warning], offline: [t.panelTeal, t.info, t.info] };
  const [bg, fg] = map[tone] || map.info;
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: bg, borderRadius: 12, padding: '11px 13px', borderLeft: `3px solid ${fg}` }}>
      <span style={{ flex: '0 0 auto', display: 'flex', color: fg }}>{icon}</span>
      <span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.ink, lineHeight: 1.4 }}>{children}</span>
    </div>
  );
}

/* Logo placeholder — labelled per user choice */
function LogoMark({ t, size = 56, light }) {
  const ring = light ? 'rgba(255,255,255,.5)' : t.teal300;
  const fg = light ? '#fff' : t.teal700;
  return (
    <div title="Replace with OmniKin logo" style={{ width: size, height: size, borderRadius: size * 0.28, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: light ? 'rgba(255,255,255,.12)' : t.panelTeal, boxShadow: `inset 0 0 0 1.5px ${ring}`, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(135deg, ${light ? 'rgba(255,255,255,.10)' : 'rgba(28,110,120,.10)'} 0 6px, transparent 6px 12px)` }} />
      <span style={{ fontFamily: OK_MONO, fontSize: size * 0.17, color: fg, letterSpacing: .5, zIndex: 1, fontWeight: 500 }}>logo</span>
    </div>
  );
}

Object.assign(window, {
  OK_FONT, OK_MONO, OK_THEMES, OK_AVATARS, I,
  SCREEN_W, SCREEN_H, TOP_INSET, BOTTOM_INSET,
  StatusBar, HomeIndicator, DeviceFrame, Screen,
  Btn, Field, StrengthMeter, OTPCells, Steps, FlowHeader, Divider, Banner, LogoMark,
});

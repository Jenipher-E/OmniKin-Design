/* OmniKin · Spectrum K brand mark.
   Real logo, drawn from Brand/OmniKin Spectrum K Logo.html (the chosen primary mark):
   an O ring + a K (cornflower stem, coral upper arm, green lower arm).
   Loaded in the journey AFTER kit/omni-kit.jsx and BEFORE Feature 1/omni-screens.jsx,
   so it replaces the kit's LogoMark placeholder for this prototype only. The
   standalone Feature 1 / Feature 2 prototypes and galleries are not affected. */
const OKLOGO = { teal700: '#1C6E78', coral: '#E2683C', cornflower: '#2E5A87', cornflowerLt: '#7FA8D0', green: '#2E8C5A', white: '#FFFFFF' };

/* ctx: 'light' (teal ring, on light surfaces) · 'dark' (white ring, on teal/dark surfaces) */
function SpectrumMark({ ctx = 'light', size = 56 }) {
  const oC = ctx === 'dark' ? OKLOGO.white : OKLOGO.teal700;
  const stem = ctx === 'dark' ? OKLOGO.cornflowerLt : OKLOGO.cornflower;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label="OmniKin" style={{ display: 'block', overflow: 'visible' }}>
      <g fill="none" strokeLinecap="round" strokeWidth="8">
        <circle cx="38" cy="50" r="23" stroke={oC} />
        <path d="M62 29 L62 71" stroke={stem} />
        <path d="M62 50 L78 30" stroke={OKLOGO.coral} />
        <path d="M62 50 L78 71" stroke={OKLOGO.green} />
      </g>
    </svg>
  );
}

/* Drop-in for the kit's LogoMark — same { t, size, light } signature.
   light=true means it sits on a teal/colour surface (welcome hero) → white ring.
   Otherwise it follows the theme: light theme → teal ring, dark theme → white ring. */
function SpectrumLogoMark({ t, size = 56, light }) {
  const onDark = light || (t && t.name === 'dark');
  return (
    <div title="OmniKin" style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
      <SpectrumMark ctx={onDark ? 'dark' : 'light'} size={Math.round(size * 0.96)} />
    </div>
  );
}

/* Small lockup: mark + OmniKin wordmark, for headers/bars. */
function SpectrumLockup({ t, ctx, size = 26, color }) {
  const c = ctx || (t && t.name === 'dark' ? 'dark' : 'light');
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <SpectrumMark ctx={c} size={size} />
      <span style={{ fontFamily: window.OK_FONT, fontSize: size * 0.62, fontWeight: 700, letterSpacing: -0.3, color: color || (c === 'dark' ? '#fff' : OKLOGO.teal700) }}>OmniKin</span>
    </div>
  );
}

Object.assign(window, { LogoMark: SpectrumLogoMark, SpectrumMark, SpectrumLockup });

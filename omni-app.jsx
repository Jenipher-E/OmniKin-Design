/* OmniKin prototype shell · device frame + flow navigation + controls. */
const { SCREENS, BACK, GALLERY, OK_THEMES, DeviceFrame, OK_FONT } = window;
const { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakSelect, TweakSlider, TweakToggle } = window;

const FONT_STACKS = {
  'Inter': 'Inter',
  'Plus Jakarta Sans': '"Plus Jakarta Sans"',
  'DM Sans': '"DM Sans"',
  'Nunito Sans': '"Nunito Sans"',
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cta": "#E2683C",
  "font": "Inter",
  "radius": 15,
  "btnH": 54,
  "privacy": true
}/*EDITMODE-END*/;

const FLOW_STARTS = [
  { id: 'welcome', label: 'Welcome', sub: 'Entry screen', target: null },
  { id: 'eu-google', label: 'EU · Google SSO', sub: 'Anna · one tap', target: 'googleSheet' },
  { id: 'eu-email', label: 'EU · Email sign-up', sub: 'Household + password', target: 'euSignup' },
  { id: 'africa', label: 'Africa · Phone + OTP', sub: 'Grace · offline-ready', target: 'afPhone' },
  { id: 'returning', label: 'Returning sign-in', sub: 'Password / biometric', target: 'signin' },
];

function Toggle2({ options, value, onChange, t }) {
  return (
    <div style={{ display: 'flex', background: t.surfaceAlt, borderRadius: 11, padding: 3, gap: 3 }}>
      {options.map((o) => {
        const on = o.v === value;
        return (
          <button key={o.v} onClick={() => onChange(o.v)} style={{ flex: 1, border: 'none', borderRadius: 8, padding: '8px 6px', cursor: 'pointer', background: on ? t.surface : 'transparent', boxShadow: on ? t.shadowSm : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: on ? t.teal700 : t.slate, transition: 'all .15s' }}>
            {o.icon}{o.label}
          </button>
        );
      })}
    </div>
  );
}

function Label({ t, children }) {
  return <div style={{ fontFamily: OK_FONT, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: t.muted, marginBottom: 9 }}>{children}</div>;
}

function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [theme, setTheme] = React.useState('light');
  const [platform, setPlatform] = React.useState('ios');
  const [variant, setVariant] = React.useState('welcomeA');
  const [stack, setStack] = React.useState([variant]);
  const [anim, setAnim] = React.useState('in');
  const [activeFlow, setActiveFlow] = React.useState('welcome');
  const t = { ...OK_THEMES[theme], coral: tw.cta, radius: tw.radius, fieldRadius: Math.max(8, tw.radius - 2), btnH: tw.btnH };
  const current = stack[stack.length - 1];

  React.useEffect(() => {
    const stack = (FONT_STACKS[tw.font] || 'Inter') + ', "Segoe UI", Roboto, system-ui, Arial, sans-serif';
    document.documentElement.style.setProperty('--ok-font', stack);
  }, [tw.font]);

  const bezel = platform === 'ios' ? 16 : 13;
  const devW = 390 + bezel * 2, devH = 844 + bezel * 2;
  const stageRef = React.useRef(null);
  const [scale, setScale] = React.useState(0.8);
  React.useLayoutEffect(() => {
    const el = stageRef.current; if (!el) return;
    const fit = () => {
      const availH = el.clientHeight - 56, availW = el.clientWidth - 48;
      if (availH <= 0 || availW <= 0) return;
      setScale(Math.min(availH / devH, availW / devW, 1.05));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [devW, devH]);

  const go = (id) => { setStack((s) => [...s, id]); setAnim('in'); };
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const restart = () => { setStack([variant]); setActiveFlow('welcome'); };
  const jump = (f) => {
    setActiveFlow(f.id);
    if (!f.target) setStack([variant]);
    else setStack([variant, f.target]);
    setAnim('in');
  };
  const changeVariant = (v) => { setVariant(v); setStack((s) => (s.length <= 1 ? [v] : s.map((x, i) => (i === 0 ? v : x)))); if (stack.length <= 1) setActiveFlow('welcome'); };

  const screen = SCREENS[current];
  const showBack = stack.length > 1;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: theme === 'light' ? '#EEF4F4' : '#061417', overflow: 'hidden' }}>
      {/* ───── sidebar ───── */}
      <div style={{ width: 280, flex: '0 0 auto', height: '100%', background: t.surface, borderRight: `1px solid ${t.hairline}`, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ padding: '22px 22px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: t.teal700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: window.OK_MONO, fontSize: 11, color: '#fff' }}>OK</div>
            <div>
              <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.title, letterSpacing: -0.2 }}>OmniKin</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted }}>Login & Account · prototype</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 22px 8px' }}><Label t={t}>Platform</Label>
          <Toggle2 t={t} value={platform} onChange={setPlatform} options={[{ v: 'ios', label: 'iOS' }, { v: 'android', label: 'Android' }]} />
        </div>
        <div style={{ padding: '14px 22px 8px' }}><Label t={t}>Theme</Label>
          <Toggle2 t={t} value={theme} onChange={setTheme} options={[{ v: 'light', label: 'Light' }, { v: 'dark', label: 'Dark' }]} />
        </div>
        <div style={{ padding: '14px 22px 8px' }}><Label t={t}>Welcome variant</Label>
          <Toggle2 t={t} value={variant} onChange={changeVariant} options={[{ v: 'welcomeA', label: 'A · Calm' }, { v: 'welcomeB', label: 'B · Bold' }]} />
        </div>

        <div style={{ padding: '18px 22px 8px' }}><Label t={t}>Jump to a flow</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {FLOW_STARTS.map((f) => {
              const on = activeFlow === f.id;
              return (
                <button key={f.id} onClick={() => jump(f)} style={{ textAlign: 'left', border: 'none', borderRadius: 11, padding: '11px 13px', cursor: 'pointer', background: on ? t.panelTeal : t.surfaceAlt, boxShadow: on ? `inset 0 0 0 1.5px ${t.teal300}` : 'none', transition: 'all .15s' }}>
                  <div style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 700, color: on ? t.teal800 : t.ink }}>{f.label}</div>
                  <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.slate, marginTop: 1 }}>{f.sub}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ flex: 1 }} />
        <div style={{ padding: '16px 22px 22px', display: 'flex', flexDirection: 'column', gap: 9, borderTop: `1px solid ${t.hairline}` }}>
          <button onClick={restart} style={{ border: `1.5px solid ${t.hairline}`, background: 'transparent', borderRadius: 10, padding: '10px', cursor: 'pointer', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate }}>↺ Restart flow</button>
          <a href="OmniKin Screens Gallery.html" style={{ textDecoration: 'none', textAlign: 'center', background: t.teal700, borderRadius: 10, padding: '11px', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: '#fff' }}>View all screens →</a>
          <div style={{ fontFamily: OK_FONT, fontSize: 10.5, color: t.muted, lineHeight: 1.5, marginTop: 2 }}>Tap the screen's own buttons to move through the flow. Use ← to step back.</div>
        </div>
      </div>

      {/* ───── stage ───── */}
      <div ref={stageRef} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 18, left: 24, fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: theme === 'light' ? '#7E9698' : '#5C7E81' }}>
          {(screen && screen.label) || ''} · {platform === 'ios' ? 'iOS' : 'Android'}
        </div>
        {showBack && <button onClick={back} style={{ position: 'absolute', top: 14, right: 24, border: 'none', background: t.surface, boxShadow: t.shadowSm, borderRadius: 9, padding: '8px 13px', cursor: 'pointer', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, display: 'flex', alignItems: 'center', gap: 6, zIndex: 5 }}>← Back</button>}
        <div style={{ width: devW * scale, height: devH * scale }}>
          <DeviceFrame platform={platform} t={t} dark={theme === 'dark'} scale={scale}>
            <div key={current + theme + platform} style={{ position: 'absolute', inset: 0, animation: 'okscreen .34s cubic-bezier(.2,.7,.3,1)' }}>
              {screen && screen.render({ t, platform, dark: theme === 'dark', go, back, showPrivacy: tw.privacy })}
            </div>
          </DeviceFrame>
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="Brand" />
        <TweakColor label="Primary CTA" value={tw.cta} options={['#E2683C', '#1C6E78', '#2E5A87', '#E0A53C']} onChange={(v) => setTweak('cta', v)} />
        <TweakSelect label="UI typeface" value={tw.font} options={['Inter', 'Plus Jakarta Sans', 'DM Sans', 'Nunito Sans']} onChange={(v) => setTweak('font', v)} />
        <TweakSection label="Shape" />
        <TweakSlider label="Corner radius" value={tw.radius} min={6} max={22} step={1} unit="px" onChange={(v) => setTweak('radius', v)} />
        <TweakSlider label="Button height" value={tw.btnH} min={46} max={60} step={1} unit="px" onChange={(v) => setTweak('btnH', v)} />
        <TweakSection label="Content" />
        <TweakToggle label="Privacy line on welcome" value={tw.privacy} onChange={(v) => setTweak('privacy', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

/* OmniKin · static screen gallery on the design canvas. */
const { SCREENS, GALLERY, OK_THEMES, OK_FONT, OK_MONO, DeviceFrame } = window;

function GToggle({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', background: 'rgba(255,255,255,.7)', borderRadius: 10, padding: 3, gap: 3, boxShadow: 'inset 0 0 0 1px rgba(14,58,64,.10)' }}>
      {options.map((o) => {
        const on = o.v === value;
        return (
          <button key={o.v} onClick={() => onChange(o.v)} style={{ border: 'none', borderRadius: 7, padding: '7px 14px', cursor: 'pointer', background: on ? '#1C6E78' : 'transparent', color: on ? '#fff' : '#586A6D', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, transition: 'all .15s' }}>{o.label}</button>
        );
      })}
    </div>
  );
}

function ControlBar({ platform, setPlatform, theme, setTheme }) {
  return (
    <div style={{ position: 'fixed', top: 16, left: 16, zIndex: 1000, display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,.86)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '10px 12px', boxShadow: '0 4px 20px rgba(14,58,64,.14), inset 0 0 0 1px rgba(14,58,64,.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingLeft: 4, paddingRight: 6 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#1C6E78', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: OK_MONO, fontSize: 10, color: '#fff' }}>OK</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 700, color: '#1C6E78', letterSpacing: -0.2 }}>OmniKin · All screens</div>
      </div>
      <div style={{ width: 1, height: 24, background: 'rgba(14,58,64,.12)' }} />
      <GToggle value={platform} onChange={setPlatform} options={[{ v: 'ios', label: 'iOS' }, { v: 'android', label: 'Android' }]} />
      <GToggle value={theme} onChange={setTheme} options={[{ v: 'light', label: 'Light' }, { v: 'dark', label: 'Dark' }]} />
      <div style={{ width: 1, height: 24, background: 'rgba(14,58,64,.12)' }} />
      <a href="OmniKin Login.html" style={{ textDecoration: 'none', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: '#fff', background: '#E2683C', borderRadius: 9, padding: '8px 14px' }}>Open prototype →</a>
    </div>
  );
}

function Gallery() {
  const [platform, setPlatform] = React.useState('ios');
  const [theme, setTheme] = React.useState('light');
  const t = OK_THEMES[theme];
  const bezel = platform === 'ios' ? 16 : 13;
  const devW = 390 + bezel * 2, devH = 844 + bezel * 2;
  const noop = () => {};

  return (
    <React.Fragment>
      <ControlBar platform={platform} setPlatform={setPlatform} theme={theme} setTheme={setTheme} />
      <window.DesignCanvas>
        {GALLERY.map((sec) => (
          <window.DCSection key={sec.id} id={sec.id} title={sec.title} subtitle={sec.subtitle}>
            {sec.screens.map((sid) => (
              <window.DCArtboard key={sid + platform + theme} id={sid} label={SCREENS[sid].label} width={devW} height={devH} style={{ background: 'transparent', boxShadow: 'none', borderRadius: 0 }}>
                <DeviceFrame platform={platform} t={t} dark={theme === 'dark'} scale={1}>
                  <div style={{ position: 'absolute', inset: 0 }}>
                    {SCREENS[sid].render({ t, platform, dark: theme === 'dark', go: noop, back: noop })}
                  </div>
                </DeviceFrame>
              </window.DCArtboard>
            ))}
          </window.DCSection>
        ))}
      </window.DesignCanvas>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Gallery />);

/* OmniKin · Full journey — static all-screens gallery across Features 1-4.
   Reuses every feature's own screens and gallery grouping verbatim. Each screen
   is rendered with its owning feature's globals active (so the right HomeA /
   Offline / kit resolves), captured per artboard via window.__okWith. */
const { OK_THEMES, OK_FONT, OK_MONO, DeviceFrame } = window;
const { RAW, NS_FOR, GALLERY_GROUPS } = window.OKJ;

const FEAT_TINT = {
  f1: { bar: '#1C6E78' },
  f2: { bar: '#2A6FDB' },
  f3: { bar: '#2E8C5A' },
  f4: { bar: '#E2683C' },
};

function GToggle({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', background: 'rgba(255,255,255,.7)', borderRadius: 10, padding: 3, gap: 3, boxShadow: 'inset 0 0 0 1px rgba(14,58,64,.10)' }}>
      {options.map((o) => {
        const on = o.v === value;
        return <button key={o.v} onClick={() => onChange(o.v)} style={{ border: 'none', borderRadius: 7, padding: '7px 13px', cursor: 'pointer', background: on ? '#1C6E78' : 'transparent', color: on ? '#fff' : '#586A6D', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, transition: 'all .15s' }}>{o.label}</button>;
      })}
    </div>
  );
}

function ControlBar({ platform, setPlatform, theme, setTheme, ver, setVer }) {
  return (
    <div style={{ position: 'fixed', top: 16, left: 16, zIndex: 1000, display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,.9)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '10px 12px', boxShadow: '0 4px 20px rgba(14,58,64,.16), inset 0 0 0 1px rgba(14,58,64,.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingLeft: 4, paddingRight: 4 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#1C6E78', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: OK_MONO, fontSize: 10, color: '#fff' }}>OK</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 700, color: '#1C6E78', letterSpacing: -0.2 }}>Full journey · All screens</div>
      </div>
      <div style={{ width: 1, height: 24, background: 'rgba(14,58,64,.12)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <span style={{ fontFamily: OK_MONO, fontSize: 10, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', color: '#8AA0A2' }}>Version</span>
        <GToggle value={ver} onChange={setVer} options={[{ v: 'both', label: 'Both' }, { v: 'A', label: 'A · Calm' }, { v: 'B', label: 'B · Bold' }]} />
      </div>
      <div style={{ width: 1, height: 24, background: 'rgba(14,58,64,.12)' }} />
      <GToggle value={platform} onChange={setPlatform} options={[{ v: 'ios', label: 'iOS' }, { v: 'android', label: 'Android' }]} />
      <GToggle value={theme} onChange={setTheme} options={[{ v: 'light', label: 'Light' }, { v: 'dark', label: 'Dark' }]} />
      <div style={{ width: 1, height: 24, background: 'rgba(14,58,64,.12)' }} />
      <a href="OmniKin Full Journey.html" style={{ textDecoration: 'none', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: '#fff', background: '#E2683C', borderRadius: 9, padding: '8px 14px' }}>Open prototype →</a>
    </div>
  );
}

/* feature divider banner that sits inside the canvas flow */
function FeatureBanner({ tint, kicker, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 4px 2px' }}>
      <div style={{ width: 7, height: 44, borderRadius: 4, background: tint.bar }} />
      <div>
        <div style={{ fontFamily: OK_MONO, fontSize: 12, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: tint.bar }}>{kicker}</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 27, fontWeight: 700, color: '#0E3A40', letterSpacing: -0.5 }}>{title}</div>
      </div>
    </div>
  );
}

/* Activates the owning feature's globals DURING render, then calls the
   registry render() — so the screen's top-level type AND its deep kit helpers
   (AvatarStack, Pad, Card, Sheet …), which are window globals resolved at React
   render time, all bind to this feature. React renders depth-first in order, so
   each slot re-points the globals immediately before its own screen renders. */
function ScreenSlot({ ns, render }) {
  window.__okActivate.apply(null, ns);
  return render();
}

function classifyVer(title) {
  if (/Version A/i.test(title)) return 'A';
  if (/Version B/i.test(title)) return 'B';
  return 'shared';
}

function Gallery() {
  const [platform, setPlatform] = React.useState('ios');
  const [theme, setTheme] = React.useState('light');
  const [ver, setVer] = React.useState('both');
  const t = OK_THEMES[theme];
  const bezel = platform === 'ios' ? 16 : 13;
  const devW = 390 + bezel * 2, devH = 844 + bezel * 2;
  const noop = () => {};
  const props = { t, platform, dark: theme === 'dark', go: noop, back: noop, reset: noop, version: 'A', showPrivacy: true };

  const showSection = (title) => {
    const v = classifyVer(title);
    if (ver === 'both' || v === 'shared') return true;
    return v === ver;
  };

  return (
    <React.Fragment>
      <ControlBar platform={platform} setPlatform={setPlatform} theme={theme} setTheme={setTheme} ver={ver} setVer={setVer} />
      <window.DesignCanvas>
        {GALLERY_GROUPS.map((grp) => {
          const tint = FEAT_TINT[grp.feat];
          const reg = RAW[grp.feat];
          const ns = NS_FOR[grp.feat];
          const visible = grp.sections.filter((sec) => showSection(sec.title));
          if (!visible.length) return null;
          return (
            <React.Fragment key={grp.feat}>
              <window.DCSection id={grp.feat + '-banner'} title={''}>
                <FeatureBanner tint={tint} kicker={grp.kicker} title={grp.title} />
              </window.DCSection>
              {visible.map((sec) => (
                <window.DCSection key={grp.feat + '-' + sec.id} id={grp.feat + '-' + sec.id} title={sec.title} subtitle={sec.subtitle}>
                  {sec.screens.filter((sid) => reg[sid]).map((sid) => (
                    <window.DCArtboard key={grp.feat + '-' + sid + platform + theme} id={grp.feat + '-' + sid} label={reg[sid].label} width={devW} height={devH} style={{ background: 'transparent', boxShadow: 'none', borderRadius: 0 }}>
                      <DeviceFrame platform={platform} t={t} dark={theme === 'dark'} scale={1}>
                        <div style={{ position: 'absolute', inset: 0 }}>
                          <ScreenSlot ns={ns} render={() => reg[sid].render(props)} />
                        </div>
                      </DeviceFrame>
                    </window.DCArtboard>
                  ))}
                </window.DCSection>
              ))}
            </React.Fragment>
          );
        })}
      </window.DesignCanvas>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Gallery />);

/* OmniKin · Feature 2 — interactive prototype runner. Fills the device viewport. */
const { OK_THEMES, OK_FONT, OK_MONO, I, F2_SCREENS, F2_BACK, F2_START } = window;

function detectPlatform() {
  const ua = (navigator.userAgent || '') + ' ' + (navigator.platform || '');
  if (/android/i.test(ua)) return 'android';
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
  return 'android';
}
function load(key, dflt) { try { return localStorage.getItem(key) || dflt; } catch (e) { return dflt; } }
function save(key, v) { try { localStorage.setItem(key, v); } catch (e) {} }

const Ic = {
  gear: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7L5.6 5.6"/></svg>,
  close: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  reset: (c) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 109-9 9 9 0 00-7 3.3M3 3v3.3h3.3"/></svg>,
};

function Seg({ t, value, onChange, options }) {
  return (
    <div style={{ display: 'flex', background: t.surfaceAlt, borderRadius: 10, padding: 3, gap: 3 }}>
      {options.map((o) => {
        const on = o.v === value;
        return <button key={o.v} onClick={() => onChange(o.v)} style={{ flex: 1, border: 'none', borderRadius: 7, padding: '9px 8px', cursor: 'pointer', background: on ? t.surface : 'transparent', boxShadow: on ? t.shadowSm : 'none', fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 600, color: on ? t.teal700 : t.slate, transition: 'all .15s' }}>{o.label}</button>;
      })}
    </div>
  );
}

function Runner() {
  const [platform, setPlatform] = React.useState(() => load('f2.platform', detectPlatform()));
  const [theme, setTheme] = React.useState(() => load('f2.theme', 'light'));
  const [version, setVersion] = React.useState(() => load('f2.version', 'A'));
  const [stack, setStack] = React.useState(() => [F2_START[load('f2.version', 'A')]]);
  const [open, setOpen] = React.useState(false);
  const t = OK_THEMES[theme];
  const current = stack[stack.length - 1];
  const screen = F2_SCREENS[current];

  React.useEffect(() => { save('f2.platform', platform); }, [platform]);
  React.useEffect(() => { save('f2.theme', theme); }, [theme]);

  const go = (id) => { if (F2_SCREENS[id]) setStack((s) => [...s, id]); };
  const back = () => setStack((s) => {
    const cur = s[s.length - 1];
    const tgt = F2_BACK[cur];
    if (tgt) { const idx = s.lastIndexOf(tgt); return idx >= 0 ? s.slice(0, idx + 1) : [...s.slice(0, -1)]; }
    return s.length > 1 ? s.slice(0, -1) : s;
  });
  const setVer = (v) => { setVersion(v); save('f2.version', v); setStack([F2_START[v]]); setOpen(false); };
  const restart = () => { setStack([F2_START[version]]); setOpen(false); };

  React.useEffect(() => {
    const onShell = ['homeA', 'homeB', 'peopleHub', 'peopleInvites', 'peoplePerms', 'peopleActivity', 'coParentSpace', 'acceptJoin'].includes(current);
    const hero = (current === 'acceptJoin') ? (theme === 'light' ? OK_THEMES[theme].teal700 : OK_THEMES[theme].teal900) : t.bg;
    document.body.style.background = hero;
  }, [current, theme, t]);

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: t.bg, fontFamily: OK_FONT }}>
      <div key={current + theme + platform + version} style={{ position: 'absolute', inset: 0, animation: 'okscreen .3s cubic-bezier(.2,.7,.3,1)' }}>
        {screen && screen.render({ t, platform, dark: theme === 'dark', go, back })}
      </div>

      <button onClick={() => setOpen(true)} aria-label="Prototype settings" style={{ position: 'fixed', right: 'max(14px, env(safe-area-inset-right))', bottom: 'calc(40px + env(safe-area-inset-bottom))', width: 42, height: 42, borderRadius: '50%', border: 'none', background: 'rgba(15,44,49,.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', boxShadow: '0 4px 14px rgba(0,0,0,.25)', display: open ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 50 }}>
        {Ic.gear('#fff')}
      </button>

      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: t.sheetScrim, zIndex: 60, display: 'flex', alignItems: 'flex-end' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: t.surface, borderRadius: '20px 20px 0 0', padding: '18px 20px calc(22px + env(safe-area-inset-bottom))', boxShadow: t.shadow, animation: 'oksheet .26s cubic-bezier(.2,.7,.3,1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.title }}>Prototype settings</div>
              <button onClick={() => setOpen(false)} style={{ border: 'none', background: t.surfaceAlt, borderRadius: 9, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{Ic.close(t.slate)}</button>
            </div>

            <div style={{ fontFamily: OK_MONO, fontSize: 11, fontWeight: 600, letterSpacing: .6, textTransform: 'uppercase', color: t.muted, marginBottom: 8 }}>Version</div>
            <Seg t={t} value={version} onChange={setVer} options={[{ v: 'A', label: 'A · Settings' }, { v: 'B', label: 'B · People area' }]} />
            <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 7, lineHeight: 1.45 }}>{version === 'A' ? 'Household lives under the Settings tab.' : 'Its own People area, opened from the Members card on Home.'}</div>
            <div style={{ height: 14 }} />

            <div style={{ fontFamily: OK_MONO, fontSize: 11, fontWeight: 600, letterSpacing: .6, textTransform: 'uppercase', color: t.muted, marginBottom: 8 }}>Platform</div>
            <Seg t={t} value={platform} onChange={setPlatform} options={[{ v: 'android', label: 'Android' }, { v: 'ios', label: 'iOS' }]} />
            <div style={{ height: 14 }} />
            <div style={{ fontFamily: OK_MONO, fontSize: 11, fontWeight: 600, letterSpacing: .6, textTransform: 'uppercase', color: t.muted, marginBottom: 8 }}>Theme</div>
            <Seg t={t} value={theme} onChange={setTheme} options={[{ v: 'light', label: 'Light' }, { v: 'dark', label: 'Dark' }]} />
            <div style={{ height: 18 }} />
            <button onClick={restart} style={{ width: '100%', height: 48, borderRadius: 13, border: 'none', background: t.panelTeal, color: t.teal800, fontFamily: OK_FONT, fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>{Ic.reset(t.teal800)} Restart this version</button>
            <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>OmniKin · Household Access (Feature 2)<br/>Tap the screen’s own buttons to move through the flow.</div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Runner />);

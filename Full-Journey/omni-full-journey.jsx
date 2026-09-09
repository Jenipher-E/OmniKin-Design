/* OmniKin · Full journey — interactive prototype.
   One continuous prototype across Features 1-4 with a Version A/B switch, a
   "Jump to a flow" chapter index and an ordered "User journey flow". */
const { OK_THEMES, OK_FONT, OK_MONO, DeviceFrame } = window;
const OKJ = window.OKJ;
const { REG, NS_FOR, START, TO_HOME, JUMP, JOURNEY, resolveKey } = OKJ;

function load(key, dflt) { try { return localStorage.getItem(key) || dflt; } catch (e) { return dflt; } }
function save(key, v) { try { localStorage.setItem(key, v); } catch (e) {} }

/* resolve a stack of [feat, keyOrVerObj] pairs into [{feat,key}], dropping nulls */
function resolveStack(pairs, version) {
  return pairs.map(([feat, k]) => ({ feat, key: resolveKey(k, version) })).filter((s) => s.key && REG[s.feat] && REG[s.feat][s.key]);
}
const journeySteps = JOURNEY.filter((s) => !s.group);   // flat, navigable steps
const stepIndexOf = (j) => journeySteps.indexOf(j);

function Toggle2({ options, value, onChange, t }) {
  return (
    <div style={{ display: 'flex', background: t.surfaceAlt, borderRadius: 11, padding: 3, gap: 3 }}>
      {options.map((o) => {
        const on = o.v === value;
        return <button key={o.v} onClick={() => onChange(o.v)} style={{ flex: 1, border: 'none', borderRadius: 8, padding: '8px 6px', cursor: 'pointer', background: on ? t.surface : 'transparent', boxShadow: on ? t.shadowSm : 'none', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: on ? t.teal700 : t.slate, transition: 'all .15s' }}>{o.label}</button>;
      })}
    </div>
  );
}
function Label({ t, children }) {
  return <div style={{ fontFamily: OK_FONT, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: t.muted, marginBottom: 9 }}>{children}</div>;
}

function App() {
  const [theme, setTheme] = React.useState(() => load('fj.theme', 'light'));
  const [platform, setPlatform] = React.useState(() => load('fj.platform', 'android'));
  const [version, setVersion] = React.useState(() => load('fj.version', 'A'));
  const [stack, setStack] = React.useState(() => [{ feat: 'core', key: 'welcomeB' }]);
  const [tab, setTab] = React.useState('jump');          // 'jump' | 'journey'
  const [activeJump, setActiveJump] = React.useState('welcome');
  const [journeyStep, setJourneyStep] = React.useState(-1);
  const navRef = React.useRef({ kind: 'jump', ref: 'welcome' });   // remember target to re-resolve on version change
  const t = OK_THEMES[theme];

  React.useEffect(() => { save('fj.theme', theme); }, [theme]);
  React.useEffect(() => { save('fj.platform', platform); }, [platform]);
  React.useEffect(() => { save('fj.version', version); }, [version]);

  const current = stack[stack.length - 1];
  window.__okActivate.apply(null, NS_FOR[current.feat]);   // put the right feature's globals on window
  const entry = REG[current.feat][current.key];

  const bezel = platform === 'ios' ? 16 : 13;
  const devW = 390 + bezel * 2, devH = 844 + bezel * 2;
  const stageRef = React.useRef(null);
  const [scale, setScale] = React.useState(0.8);
  React.useLayoutEffect(() => {
    const el = stageRef.current; if (!el) return;
    const fit = () => {
      const availH = el.clientHeight - 64, availW = el.clientWidth - 48;
      if (availH <= 0 || availW <= 0) return;
      setScale(Math.min(availH / devH, availW / devW, 1.05));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [devW, devH]);

  const go = (id) => setStack((s) => { const c = s[s.length - 1]; return REG[c.feat][id] ? [...s, { feat: c.feat, key: id }] : s; });
  const back = () => setStack((s) => {
    const c = s[s.length - 1];
    if (c.feat === 'core' && TO_HOME[c.key]) return [{ feat: 'core', key: TO_HOME[c.key] }];
    return s.length > 1 ? s.slice(0, -1) : s;
  });
  const reset = (id) => setStack((s) => {
    const c = s[s.length - 1];
    if (c.feat === 'core') return [{ feat: 'core', key: 'home' }];
    const start = START[c.feat][version];
    const tgt = id === 'tasks' ? (version === 'A' ? 'tasksA' : 'tasksB') : id;
    return tgt && tgt !== start && REG[c.feat][tgt] ? [{ feat: c.feat, key: start }, { feat: c.feat, key: tgt }] : [{ feat: c.feat, key: start }];
  });

  const goJump = (c) => {
    if (c.group) return;
    setTab('jump'); setActiveJump(c.id); setJourneyStep(-1);
    navRef.current = { kind: 'jump', ref: c.id };
    const pairs = c.stackByVer ? c.stackByVer[version] : c.stack;
    setStack(resolveStack(pairs, version));
  };
  const goJourney = (i) => {
    setTab('journey'); setJourneyStep(i); setActiveJump(null);
    navRef.current = { kind: 'journey', ref: i };
    const step = journeySteps[i];
    const pairs = step.stackByVer ? step.stackByVer[version] : step.stack;
    setStack(resolveStack(pairs, version));
  };
  const changeVersion = (v) => {
    setVersion(v); save('fj.version', v);
    const n = navRef.current;
    if (n.kind === 'journey' && n.ref >= 0) {
      const step = journeySteps[n.ref];
      setStack(resolveStack(step.stackByVer ? step.stackByVer[v] : step.stack, v));
    } else if (n.kind === 'jump') {
      const c = JUMP.find((x) => x.id === n.ref);
      if (c) setStack(resolveStack(c.stackByVer ? c.stackByVer[v] : c.stack, v));
    }
  };
  const restart = () => { setStack([{ feat: 'core', key: 'welcomeB' }]); setTab('jump'); setActiveJump('welcome'); setJourneyStep(-1); navRef.current = { kind: 'jump', ref: 'welcome' }; };
  const jumpTo = (feat) => { setStack([{ feat, key: START[feat][version] }]); setTab('jump'); setActiveJump(feat === 'f3' ? 'f3home' : 'f4home'); navRef.current = { kind: 'jump', ref: feat === 'f3' ? 'f3home' : 'f4home' }; };

  const showBack = stack.length > 1;
  const stepNo = journeyStep >= 0 ? journeyStep : -1;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: theme === 'light' ? '#EEF4F4' : '#061417', overflow: 'hidden' }}>
      {/* ───── side controls ───── */}
      <div style={{ width: 300, flex: '0 0 auto', height: '100%', background: t.surface, borderRight: `1px solid ${t.hairline}`, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ padding: '22px 22px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: t.teal700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{window.SpectrumMark ? <window.SpectrumMark ctx="dark" size={22} /> : <span style={{ fontFamily: OK_MONO, fontSize: 11, color: '#fff' }}>OK</span>}</div>
            <div>
              <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.title, letterSpacing: -0.2 }}>OmniKin</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted }}>Full journey · Features 1–4</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 22px 6px' }}><Label t={t}>Version</Label>
          <Toggle2 t={t} value={version} onChange={changeVersion} options={[{ v: 'A', label: 'A · Calm' }, { v: 'B', label: 'B · Bold' }]} />
          <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 7, lineHeight: 1.45 }}>{version === 'A' ? 'Calm and denser. Household under Settings, single-stream lists and tasks, differentiators as quiet cards.' : 'Bolder and airier. Its own People, Shopping and Tasks hubs, grouped cards, full-screen moments.'}</div>
        </div>
        <div style={{ padding: '14px 22px 6px' }}><Label t={t}>Platform</Label>
          <Toggle2 t={t} value={platform} onChange={setPlatform} options={[{ v: 'ios', label: 'iOS' }, { v: 'android', label: 'Android' }]} />
        </div>
        <div style={{ padding: '14px 22px 6px' }}><Label t={t}>Theme</Label>
          <Toggle2 t={t} value={theme} onChange={setTheme} options={[{ v: 'light', label: 'Light' }, { v: 'dark', label: 'Dark' }]} />
        </div>

        <div style={{ padding: '18px 22px 8px' }}>
          <div style={{ display: 'flex', gap: 2, marginBottom: 13, borderBottom: `1px solid ${t.hairline}` }}>
            {[['jump', 'Jump to a flow'], ['journey', 'User journey flow']].map(([m, lbl]) => {
              const on = tab === m;
              return <button key={m} onClick={() => setTab(m)} style={{ flex: 1, border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px 2px 9px', fontFamily: OK_FONT, fontSize: 11, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', color: on ? t.teal700 : t.muted, borderBottom: `2px solid ${on ? t.teal700 : 'transparent'}`, marginBottom: -1, transition: 'color .15s' }}>{lbl}</button>;
            })}
          </div>

          {tab === 'jump' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {JUMP.map((c, i) => c.group ? (
                <div key={'g' + i} style={{ fontFamily: OK_MONO, fontSize: 10, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase', color: t.teal500, padding: i === 0 ? '2px 2px 4px' : '13px 2px 4px' }}>{c.group}</div>
              ) : (
                <button key={c.id} onClick={() => goJump(c)} style={{ textAlign: 'left', border: 'none', borderRadius: 10, padding: '9px 12px', cursor: 'pointer', background: activeJump === c.id ? t.panelTeal : t.surfaceAlt, boxShadow: activeJump === c.id ? `inset 0 0 0 1.5px ${t.teal300}` : 'none', transition: 'all .15s' }}>
                  <div style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 700, color: activeJump === c.id ? t.teal800 : t.ink }}>{c.label}</div>
                  <div style={{ fontFamily: OK_FONT, fontSize: 11, color: t.slate, marginTop: 1 }}>{c.sub}</div>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.slate, lineHeight: 1.5, marginBottom: 11 }}>Follow one Owner, from her first open of OmniKin all the way through household setup, shopping and tasks, in order.</div>
              <button onClick={() => goJourney(0)} style={{ width: '100%', border: 'none', borderRadius: 10, padding: '11px', cursor: 'pointer', background: t.coral, color: '#fff', fontFamily: OK_FONT, fontSize: 13, fontWeight: 700, marginBottom: 16, boxShadow: '0 6px 16px rgba(226,104,60,.32)' }}>Start the journey</button>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {(() => { let n = -1; return JOURNEY.map((s, i) => {
                  if (s.group) return <div key={'jg' + i} style={{ fontFamily: OK_MONO, fontSize: 10, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase', color: t.teal500, padding: i === 0 ? '0 2px 8px' : '10px 2px 8px' }}>{s.group}</div>;
                  n += 1; const idx = n; const on = stepNo === idx; const done = stepNo > idx;
                  const nextIsGroup = JOURNEY[i + 1] ? !!JOURNEY[i + 1].group : true;
                  return (
                    <button key={i} onClick={() => goJourney(idx)} style={{ display: 'flex', gap: 11, textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, alignItems: 'stretch' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto' }}>
                        <span style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: OK_MONO, fontSize: 11, fontWeight: 700, flex: '0 0 auto', background: on ? t.teal700 : (done ? t.panelTeal : t.surfaceAlt), color: on ? '#fff' : (done ? t.teal700 : t.muted), boxShadow: on ? 'none' : `inset 0 0 0 1.5px ${t.hairline}`, transition: 'all .15s' }}>{idx + 1}</span>
                        {!nextIsGroup && <span style={{ width: 2, flex: 1, minHeight: 14, background: done ? t.teal300 : t.hairline, marginTop: 3, marginBottom: 3 }} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0, paddingBottom: nextIsGroup ? 6 : 12, marginTop: 2 }}>
                        <div style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 700, color: on ? t.teal800 : t.ink, lineHeight: 1.3 }}>{s.label}</div>
                        <div style={{ fontFamily: OK_FONT, fontSize: 11, color: t.slate, marginTop: 2, lineHeight: 1.35 }}>{s.sub}</div>
                      </div>
                    </button>
                  );
                }); })()}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button onClick={() => goJourney(Math.max(0, (stepNo < 0 ? 0 : stepNo) - 1))} disabled={stepNo <= 0} style={{ flex: 1, border: `1.5px solid ${t.hairline}`, background: 'transparent', borderRadius: 10, padding: '9px', cursor: stepNo <= 0 ? 'default' : 'pointer', opacity: stepNo <= 0 ? 0.45 : 1, fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: t.slate }}>← Prev</button>
                <button onClick={() => goJourney(Math.min(journeySteps.length - 1, (stepNo < 0 ? -1 : stepNo) + 1))} disabled={stepNo >= journeySteps.length - 1} style={{ flex: 1, border: 'none', background: t.teal700, borderRadius: 10, padding: '9px', cursor: stepNo >= journeySteps.length - 1 ? 'default' : 'pointer', opacity: stepNo >= journeySteps.length - 1 ? 0.5 : 1, fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 700, color: '#fff' }}>Next →</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ flex: 1, minHeight: 12 }} />
        <div style={{ padding: '14px 22px 22px', display: 'flex', flexDirection: 'column', gap: 9, borderTop: `1px solid ${t.hairline}` }}>
          <button onClick={restart} style={{ border: `1.5px solid ${t.hairline}`, background: 'transparent', borderRadius: 10, padding: '10px', cursor: 'pointer', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate }}>↺ Restart from welcome</button>
          <a href="OmniKin Full Journey Screens.html" style={{ textDecoration: 'none', textAlign: 'center', background: t.teal700, borderRadius: 10, padding: '11px', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: '#fff' }}>View all screens →</a>
          <div style={{ fontFamily: OK_FONT, fontSize: 10.5, color: t.muted, lineHeight: 1.5, marginTop: 2 }}>Tap the screen’s own buttons to move through a flow. Use ← to step back.</div>
        </div>
      </div>

      {/* ───── stage ───── */}
      <div ref={stageRef} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 18, left: 24, right: 120, fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: theme === 'light' ? '#7E9698' : '#5C7E81', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {tab === 'journey' && stepNo >= 0 ? `Journey · Step ${stepNo + 1} of ${journeySteps.length} · ` : ''}{(entry && entry.label) || ''} · Version {version} · {platform === 'ios' ? 'iOS' : 'Android'}
        </div>
        {showBack && <button onClick={back} style={{ position: 'absolute', top: 14, right: 24, border: 'none', background: t.surface, boxShadow: t.shadowSm, borderRadius: 9, padding: '8px 13px', cursor: 'pointer', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, display: 'flex', alignItems: 'center', gap: 6, zIndex: 5 }}>← Back</button>}
        <div style={{ width: devW * scale, height: devH * scale }}>
          <DeviceFrame platform={platform} t={t} dark={theme === 'dark'} scale={scale}>
            <div key={current.feat + current.key + theme + platform + version} style={{ position: 'absolute', inset: 0, animation: 'okscreen .34s cubic-bezier(.2,.7,.3,1)' }}>
              {entry && entry.render({ t, platform, dark: theme === 'dark', go, back, reset, version, showPrivacy: true, jumpTo })}
            </div>
          </DeviceFrame>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

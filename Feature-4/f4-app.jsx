/* OmniKin · Feature 4 (Tasks) — interactive prototype shell: device frame + side controls. */
const { F4_SCREENS, F4_START, OK_THEMES, OK_FONT, OK_MONO, DeviceFrame } = window;

const F4_FLOWS = [
  { id: 'home',     label: 'Tasks home',          sub: 'Entry point',             target: null },
  { id: 'browse',   label: 'Task stream',         sub: 'Day / assignee grouped',  target: { A: 'tasksA', B: 'tasksB' } },
  { id: 'empty',    label: 'First arrival',       sub: 'Clear / empty state',     target: { A: 'tasksEmptyA', B: 'tasksEmptyB' } },
  { id: 'create',   label: 'Create & assign ★',   sub: 'Recurring chore flow',    target: 'createTask' },
  { id: 'detail',   label: 'Task detail',         sub: 'Notes · subtasks · files', target: 'taskDetail' },
  { id: 'repeat',   label: 'Edit a repeat',       sub: 'Edit details · then scope',  target: 'editTask' },
  { id: 'complete', label: 'Complete & reopen',   sub: 'Next occurrence made',    target: { A: 'completeA', B: 'completeB' } },
  { id: 'child',    label: 'Child chore',         sub: 'Light acknowledgement',   target: 'childAckA' },
  { id: 'fair',     label: 'Fair-load view ★',    sub: 'The differentiator',      target: { A: 'fairLoadA', B: 'fairLoadB' } },
  { id: 'rebalance',label: 'Rebalance the load ★',sub: 'Opt-in, human-confirmed', target: 'rebalance' },
  { id: 'reminders',label: 'Reminders',           sub: 'Calm digest · settings',  target: 'remindersA' },
  { id: 'offline',  label: 'Offline & sync',      sub: 'Low-connectivity',        target: 'offline' },
  { id: 'parked',   label: 'Not in this release', sub: 'Agenda · calendar · timetable', target: 'agendaParked' },
];

/* The complete Owner journey, in narrative order — a new user (Jeni) opens the
   Tasks tab for the first time and proceeds from the clear state through the
   whole feature. Version-aware targets resolve to A or B variants. */
const F4_JOURNEY = [
  { label: 'First open of Tasks',        sub: 'Clear state · nothing created yet',      target: { A: 'tasksEmptyA', B: 'tasksEmptyB' } },
  { label: 'Creates the first task',     sub: 'Structured · recurring chore',          target: 'createTask' },
  { label: 'Created and assigned',       sub: 'Repeats weekly · goes to Lena',          target: 'assignDone' },
  { label: 'The shared stream fills up', sub: 'Grouped by day / by assignee',           target: { A: 'tasksA', B: 'tasksB' } },
  { label: 'Opens a task in detail',     sub: 'Notes · checklist · attachments',        target: 'taskDetail' },
  { label: 'Edits a repeating task',     sub: 'Edit details, then choose scope',        target: 'editTask' },
  { label: 'Marks a task done',          sub: 'Next occurrence made for her',           target: { A: 'completeA', B: 'completeB' } },
  { label: 'A child finishes a chore',   sub: 'Gentle, reward-free acknowledgement',    target: 'childAckA' },
  { label: 'The morning digest',         sub: 'One calm daily reminder',                target: 'remindersA' },
  { label: 'Tunes reminder settings',    sub: 'Quiet hours · per channel',             target: 'reminderPrefs' },
  { label: 'Ticks a task offline',       sub: 'Saved, then synced later',               target: 'offline' },
  { label: 'The fair-load view',         sub: 'Who carries the mental load',            target: { A: 'fairLoadA', B: 'fairLoadB' } },
  { label: 'Rebalances the load',        sub: 'Opt-in, human-confirmed',                target: 'rebalance' },
];

function load(key, dflt) { try { return localStorage.getItem(key) || dflt; } catch (e) { return dflt; } }
function save(key, v) { try { localStorage.setItem(key, v); } catch (e) {} }

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
  const [theme, setTheme] = React.useState(() => load('f4.theme', 'light'));
  const [platform, setPlatform] = React.useState(() => load('f4.platform', 'ios'));
  const [version, setVersion] = React.useState(() => load('f4.version', 'A'));
  const [stack, setStack] = React.useState(() => [F4_START[load('f4.version', 'A')]]);
  const [activeFlow, setActiveFlow] = React.useState('home');
  const [navMode, setNavMode] = React.useState('jump');
  const [journeyStep, setJourneyStep] = React.useState(-1);
  const t = OK_THEMES[theme];
  const current = stack[stack.length - 1];
  const screen = F4_SCREENS[current];

  React.useEffect(() => { save('f4.theme', theme); }, [theme]);
  React.useEffect(() => { save('f4.platform', platform); }, [platform]);
  React.useEffect(() => { save('f4.version', version); }, [version]);

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

  const go = (id) => { if (F4_SCREENS[id]) setStack((s) => [...s, id]); };
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  /* reset history to a clean root so finishing a flow doesn't leave it on the back-stack.
     'tasks' resolves to the version's tasks screen; back from there returns to Home. */
  const reset = (id) => {
    const start = F4_START[version];
    const tgt = id === 'tasks' ? (version === 'A' ? 'tasksA' : 'tasksB') : id;
    setStack(tgt && tgt !== start ? [start, tgt] : [start]);
  };
  const resolveTarget = (target, v) => (typeof target === 'object' && target ? target[v] : target);
  const changeVersion = (v) => {
    setVersion(v);
    if (navMode === 'journey' && journeyStep >= 0) {
      const start = F4_START[v];
      const target = resolveTarget(F4_JOURNEY[journeyStep].target, v);
      setStack(target ? [start, target] : [start]);
    } else {
      setStack([F4_START[v]]); setActiveFlow('home');
    }
  };
  const restart = () => { setStack([F4_START[version]]); setActiveFlow('home'); setJourneyStep(-1); };
  const jump = (f) => {
    setNavMode('jump');
    setActiveFlow(f.id);
    const start = F4_START[version];
    const target = resolveTarget(f.target, version);
    setStack(target ? [start, target] : [start]);
  };
  const goJourney = (i) => {
    setNavMode('journey');
    setJourneyStep(i);
    const start = F4_START[version];
    const target = resolveTarget(F4_JOURNEY[i].target, version);
    setStack(target ? [start, target] : [start]);
  };

  const showBack = stack.length > 1;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: theme === 'light' ? '#EEF4F4' : '#061417', overflow: 'hidden' }}>
      {/* ───── side controls ───── */}
      <div style={{ width: 286, flex: '0 0 auto', height: '100%', background: t.surface, borderRight: `1px solid ${t.hairline}`, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ padding: '22px 22px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: t.teal700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: OK_MONO, fontSize: 11, color: '#fff' }}>OK</div>
            <div>
              <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 700, color: t.title, letterSpacing: -0.2 }}>OmniKin</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted }}>Tasks · prototype</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 22px 6px' }}><Label t={t}>Version</Label>
          <Toggle2 t={t} value={version} onChange={changeVersion} options={[{ v: 'A', label: 'A · Calm' }, { v: 'B', label: 'B · Bold' }]} />
          <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 7, lineHeight: 1.45 }}>{version === 'A' ? 'Opened from the Home or Tasks card. Calmer and denser, one day-grouped stream, fair-load as a quiet card.' : 'Its own Tasks tab. Bolder header carrying a live fair-load summary, airy cards grouped by who is doing them.'}</div>
        </div>
        <div style={{ padding: '14px 22px 6px' }}><Label t={t}>Platform</Label>
          <Toggle2 t={t} value={platform} onChange={setPlatform} options={[{ v: 'ios', label: 'iOS' }, { v: 'android', label: 'Android' }]} />
        </div>
        <div style={{ padding: '14px 22px 6px' }}><Label t={t}>Theme</Label>
          <Toggle2 t={t} value={theme} onChange={setTheme} options={[{ v: 'light', label: 'Light' }, { v: 'dark', label: 'Dark' }]} />
        </div>

        <div style={{ padding: '18px 22px 8px' }}>
          {/* navigation mode tabs — free jumping vs the ordered Owner journey */}
          <div style={{ display: 'flex', gap: 2, marginBottom: 13, borderBottom: `1px solid ${t.hairline}` }}>
            {[['jump', 'Jump to a flow'], ['journey', 'User journey flow']].map(([m, lbl]) => {
              const on = navMode === m;
              return (
                <button key={m} onClick={() => setNavMode(m)} style={{ flex: 1, border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px 2px 9px', fontFamily: OK_FONT, fontSize: 11, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', color: on ? t.teal700 : t.muted, borderBottom: `2px solid ${on ? t.teal700 : 'transparent'}`, marginBottom: -1, transition: 'color .15s' }}>{lbl}</button>
              );
            })}
          </div>

          {navMode === 'jump' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {F4_FLOWS.map((f) => {
                const on = activeFlow === f.id;
                const parked = f.id === 'parked';
                return (
                  <button key={f.id} onClick={() => jump(f)} style={{ textAlign: 'left', border: 'none', borderRadius: 11, padding: '10px 13px', cursor: 'pointer', background: on ? t.panelTeal : t.surfaceAlt, boxShadow: on ? `inset 0 0 0 1.5px ${t.teal300}` : 'none', transition: 'all .15s' }}>
                    <div style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 700, color: parked ? t.blue : (on ? t.teal800 : t.ink) }}>{f.label}</div>
                    <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.slate, marginTop: 1 }}>{f.sub}</div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div>
              <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.slate, lineHeight: 1.5, marginBottom: 11 }}>Follow Jeni, a new Owner, from her first open of the Tasks tab through the whole feature, in order.</div>
              <button onClick={() => goJourney(0)} style={{ width: '100%', border: 'none', borderRadius: 10, padding: '11px', cursor: 'pointer', background: t.coral, color: '#fff', fontFamily: OK_FONT, fontSize: 13, fontWeight: 700, marginBottom: 16, boxShadow: '0 6px 16px rgba(226,104,60,.32)' }}>Start the journey</button>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {F4_JOURNEY.map((s, i) => {
                  const on = journeyStep === i;
                  const done = journeyStep > i;
                  const last = i === F4_JOURNEY.length - 1;
                  return (
                    <button key={i} onClick={() => goJourney(i)} style={{ display: 'flex', gap: 11, textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, alignItems: 'stretch' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto' }}>
                        <span style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: OK_MONO, fontSize: 11, fontWeight: 700, flex: '0 0 auto', background: on ? t.teal700 : (done ? t.panelTeal : t.surfaceAlt), color: on ? '#fff' : (done ? t.teal700 : t.muted), boxShadow: on ? 'none' : `inset 0 0 0 1.5px ${t.hairline}`, transition: 'all .15s' }}>{i + 1}</span>
                        {!last && <span style={{ width: 2, flex: 1, minHeight: 16, background: done ? t.teal300 : t.hairline, marginTop: 3, marginBottom: 3 }} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0, paddingBottom: last ? 0 : 13, marginTop: 2 }}>
                        <div style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 700, color: on ? t.teal800 : t.ink, lineHeight: 1.3 }}>{s.label}</div>
                        <div style={{ fontFamily: OK_FONT, fontSize: 11, color: t.slate, marginTop: 2, lineHeight: 1.35 }}>{s.sub}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button onClick={() => goJourney(Math.max(0, (journeyStep < 0 ? 0 : journeyStep) - 1))} disabled={journeyStep <= 0} style={{ flex: 1, border: `1.5px solid ${t.hairline}`, background: 'transparent', borderRadius: 10, padding: '9px', cursor: journeyStep <= 0 ? 'default' : 'pointer', opacity: journeyStep <= 0 ? 0.45 : 1, fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: t.slate }}>← Prev</button>
                <button onClick={() => goJourney(Math.min(F4_JOURNEY.length - 1, (journeyStep < 0 ? -1 : journeyStep) + 1))} disabled={journeyStep >= F4_JOURNEY.length - 1} style={{ flex: 1, border: 'none', background: t.teal700, borderRadius: 10, padding: '9px', cursor: journeyStep >= F4_JOURNEY.length - 1 ? 'default' : 'pointer', opacity: journeyStep >= F4_JOURNEY.length - 1 ? 0.5 : 1, fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 700, color: '#fff' }}>Next →</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ flex: 1, minHeight: 14 }} />
        <div style={{ padding: '16px 22px 22px', display: 'flex', flexDirection: 'column', gap: 9, borderTop: `1px solid ${t.hairline}` }}>
          <button onClick={restart} style={{ border: `1.5px solid ${t.hairline}`, background: 'transparent', borderRadius: 10, padding: '10px', cursor: 'pointer', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate }}>↺ Restart this version</button>
          <a href="OmniKin Tasks Screens.html" style={{ textDecoration: 'none', textAlign: 'center', background: t.teal700, borderRadius: 10, padding: '11px', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: '#fff' }}>View all screens →</a>
          <div style={{ fontFamily: OK_FONT, fontSize: 10.5, color: t.muted, lineHeight: 1.5, marginTop: 2 }}>Tap the screen’s own buttons to move through the flow. Use ← to step back.</div>
        </div>
      </div>

      {/* ───── stage ───── */}
      <div ref={stageRef} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 18, left: 24, fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: theme === 'light' ? '#7E9698' : '#5C7E81' }}>
          {navMode === 'journey' && journeyStep >= 0 ? `Journey · Step ${journeyStep + 1} of ${F4_JOURNEY.length} · ` : ''}{(screen && screen.label) || ''} · Version {version} · {platform === 'ios' ? 'iOS' : 'Android'}
        </div>
        {showBack && <button onClick={back} style={{ position: 'absolute', top: 14, right: 24, border: 'none', background: t.surface, boxShadow: t.shadowSm, borderRadius: 9, padding: '8px 13px', cursor: 'pointer', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, display: 'flex', alignItems: 'center', gap: 6, zIndex: 5 }}>← Back</button>}
        <div style={{ width: devW * scale, height: devH * scale }}>
          <DeviceFrame platform={platform} t={t} dark={theme === 'dark'} scale={scale}>
            <div key={current + theme + platform + version} style={{ position: 'absolute', inset: 0, animation: 'okscreen .34s cubic-bezier(.2,.7,.3,1)' }}>
              {screen && screen.render({ t, platform, dark: theme === 'dark', go, back, reset })}
            </div>
          </DeviceFrame>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

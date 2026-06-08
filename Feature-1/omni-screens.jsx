/* OmniKin · all screens + flow graph. Consumes window globals from omni-kit.jsx. */
const {
  OK_FONT, OK_MONO, OK_AVATARS, I,
  DeviceFrame, Screen, Btn, Field, StrengthMeter, OTPCells, Steps, FlowHeader, Divider, Banner, LogoMark,
} = window;

/* layout helpers */
const Pad = ({ children, style }) => <div style={{ padding: '0 24px', ...style }}>{children}</div>;
const H1 = ({ t, children, style }) => <div style={{ fontFamily: OK_FONT, fontSize: 27, fontWeight: 700, color: t.title, letterSpacing: -0.5, lineHeight: 1.15, ...style }}>{children}</div>;
const Lead = ({ t, children, style }) => <div style={{ fontFamily: OK_FONT, fontSize: 15.5, color: t.slate, lineHeight: 1.5, ...style }}>{children}</div>;
const Spacer = ({ h }) => <div style={{ height: h, flex: '0 0 auto' }} />;
const Grow = () => <div style={{ flex: 1 }} />;
const Link = ({ t, children, onClick }) => <span onClick={onClick} style={{ fontFamily: OK_FONT, color: t.teal500, fontWeight: 600, cursor: 'pointer' }}>{children}</span>;

/* legal / privacy footnote reused on auth screens */
const Legal = ({ t }) => <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, textAlign: 'center', lineHeight: 1.5 }}>By continuing you agree to the <span style={{ color: t.teal500 }}>Terms</span> &amp; <span style={{ color: t.teal500 }}>Privacy Policy</span>. GDPR &amp; GDPR-K compliant.</div>;

/* avatar swatch grid */
function AvatarPicker({ t, value, onPick, taken = [] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 9 }}>
      {OK_AVATARS.map((c) => {
        const isTaken = taken.includes(c) && c !== value;
        const sel = c === value;
        return (
          <button key={c} disabled={isTaken} onClick={() => onPick(c)} style={{ aspectRatio: '1', borderRadius: '50%', border: 'none', background: c, cursor: isTaken ? 'default' : 'pointer', position: 'relative', opacity: isTaken ? 0.25 : 1, boxShadow: sel ? `0 0 0 2.5px ${t.surface}, 0 0 0 4.5px ${c}` : 'none', transition: 'box-shadow .15s' }}>
            {sel && <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{I.check('#fff', 16)}</span>}
            {isTaken && <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{I.check('#fff', 13)}</span>}
          </button>
        );
      })}
    </div>
  );
}

function Avatar({ color, name, size = 38, ring }) {
  return <div style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: OK_FONT, fontWeight: 700, fontSize: size * 0.4, flex: '0 0 auto', boxShadow: ring ? `0 0 0 2px ${ring}` : 'none' }}>{name ? name[0].toUpperCase() : ''}</div>;
}

/* ════════════════════ WELCOME A — calm / light ════════════════════ */
function WelcomeA({ t, platform, go, showPrivacy = true }) {
  return (
    <Screen t={t} platform={platform}>
      <Grow />
      <Pad>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
          <LogoMark t={t} size={68} />
          <div>
            <div style={{ fontFamily: OK_FONT, fontSize: 32, fontWeight: 700, color: t.title, letterSpacing: -0.5 }}>OmniKin</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 16, color: t.slate, marginTop: 4 }}>The all-in-one family organiser</div>
          </div>
          {showPrivacy && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: t.panelTeal, padding: '7px 13px', borderRadius: 999, marginTop: 2 }}>
            {I.shield(t.teal700, 15)}
            <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.teal800, fontWeight: 600 }}>Private by design. Everyone has their own login.</span>
          </div>}
        </div>
      </Pad>
      <Grow />
      <Pad style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <Btn t={t} kind="sso" icon={I.google()} onClick={() => go('googleSheet')}>Continue with Google</Btn>
        {platform === 'ios'
          ? <Btn t={t} kind="ssoDark" icon={I.apple('#fff')} onClick={() => go('appleSheet')}>Continue with Apple</Btn>
          : <Btn t={t} kind="outline" icon={I.mail(t.teal500)} onClick={() => go('euSignup')}>Sign up with email</Btn>}
        <div style={{ display: 'flex', gap: 11 }}>
          {platform === 'ios' && <Btn t={t} kind="outline" icon={I.mail(t.teal500)} onClick={() => go('euSignup')}>Email</Btn>}
          <Btn t={t} kind="outline" icon={I.phone(t.teal500)} onClick={() => go('afPhone')}>Phone number</Btn>
        </div>
        <Spacer h={2} />
        <div style={{ textAlign: 'center', fontFamily: OK_FONT, fontSize: 14.5, color: t.slate }}>Already have an account? <Link t={t} onClick={() => go('signin')}>Sign in</Link></div>
        <Spacer h={4} />
        <Legal t={t} />
      </Pad>
      <Spacer h={8} />
    </Screen>
  );
}

/* ════════════════════ WELCOME B — immersive teal ════════════════════ */
function WelcomeB({ t, platform, go, showPrivacy = true }) {
  const hero = t.name === 'light' ? t.teal700 : t.teal900;
  return (
    <Screen t={t} platform={platform} bg={hero}>
      <Pad style={{ paddingTop: 18 }}>
        <LogoMark t={t} size={52} light />
      </Pad>
      <Grow />
      <Pad>
        <div style={{ fontFamily: OK_FONT, fontSize: 38, fontWeight: 700, color: '#fff', letterSpacing: -1, lineHeight: 1.08 }}>One calm home<br />for the whole family.</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 16, color: 'rgba(255,255,255,.82)', marginTop: 16, lineHeight: 1.5, maxWidth: 300 }}>Calendars, lists, documents and locations, in one private space each member joins with their own login.</div>
        {showPrivacy && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,.14)', padding: '7px 13px', borderRadius: 999, marginTop: 18 }}>
          {I.shield('#fff', 15)}
          <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: '#fff', fontWeight: 600 }}>No shared passwords. Ever.</span>
        </div>}
      </Pad>
      <Grow />
      <Pad style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <Btn t={t} kind="primary" onClick={() => go('euSignup')} style={{ boxShadow: '0 8px 22px rgba(0,0,0,.25)' }}>Create your household</Btn>
        <Btn t={t} kind="sso" icon={I.google()} onClick={() => go('googleSheet')} style={{ background: 'rgba(255,255,255,.96)', boxShadow: 'none', color: '#1E2A2D' }}>Continue with Google</Btn>
        <div style={{ display: 'flex', gap: 11 }}>
          {platform === 'ios'
            ? <Btn t={t} kind="ssoDark" icon={I.apple('#fff')} onClick={() => go('appleSheet')} style={{ background: 'rgba(0,0,0,.32)', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,.35)' }}>Apple</Btn>
            : null}
          <Btn t={t} kind="outline" icon={I.phone('#fff')} onClick={() => go('afPhone')} style={{ color: '#fff', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,.4)' }}>Phone</Btn>
        </div>
        <div style={{ textAlign: 'center', fontFamily: OK_FONT, fontSize: 14.5, color: 'rgba(255,255,255,.82)', marginTop: 2 }}>Already with us? <span onClick={() => go('signin')} style={{ color: '#fff', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>Sign in</span></div>
      </Pad>
      <Spacer h={14} />
    </Screen>
  );
}

/* ════════════════════ GOOGLE account sheet ════════════════════ */
function GoogleSheet({ t, platform, go, back }) {
  const accounts = [{ n: 'Anna Reuter', e: 'anna.reuter@gmail.com', c: '#1C6E78' }, { n: 'Anna R. (work)', e: 'a.reuter@studio.de', c: '#E2683C' }];
  return (
    <Screen t={t} platform={platform} bg={t.name === 'light' ? 'rgba(14,58,64,.32)' : 'rgba(0,0,0,.5)'} noBottomInset>
      <Grow />
      <div onClick={(e) => e.stopPropagation()} style={{ background: t.surface, borderRadius: '22px 22px 0 0', padding: '22px 22px 30px', boxShadow: t.shadow }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          {I.google()}
          <span style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 600, color: t.ink }}>Sign in with Google</span>
        </div>
        <div style={{ fontFamily: OK_FONT, fontSize: 20, fontWeight: 600, color: t.ink, margin: '14px 0 4px' }}>Choose an account</div>
        <div style={{ fontFamily: OK_FONT, fontSize: 14, color: t.slate, marginBottom: 14 }}>to continue to <span style={{ color: t.teal700, fontWeight: 600 }}>OmniKin</span></div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {accounts.map((a, i) => (
            <button key={i} onClick={() => go('nameHousehold')} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 6px', border: 'none', borderTop: `1px solid ${t.hairline}`, background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
              <Avatar color={a.c} name={a.n} size={40} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 600, color: t.ink }}>{a.n}</div>
                <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.e}</div>
              </div>
            </button>
          ))}
          <button onClick={() => go('nameHousehold')} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 6px', border: 'none', borderTop: `1px solid ${t.hairline}`, background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1.5px ${t.hairline}` }}>{I.plus(t.slate)}</div>
            <span style={{ fontFamily: OK_FONT, fontSize: 15, color: t.ink }}>Use another account</span>
          </button>
        </div>
        <div style={{ marginTop: 16, background: t.panelTeal, borderRadius: 12, padding: '11px 13px', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
          {I.shield(t.teal700, 16)}
          <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.teal800, lineHeight: 1.45 }}>OmniKin will only receive your <b>name and email</b>, never your contacts, calendar or files.</span>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16 }}><Link t={t} onClick={back}>Cancel</Link></div>
      </div>
    </Screen>
  );
}

/* ════════════════════ APPLE sign-in sheet ════════════════════ */
function AppleSheet({ t, platform, go, back }) {
  return (
    <Screen t={t} platform={platform} bg={t.name === 'light' ? 'rgba(14,58,64,.32)' : 'rgba(0,0,0,.55)'} noBottomInset>
      <Grow />
      <div onClick={(e) => e.stopPropagation()} style={{ background: t.surface, borderRadius: '22px 22px 0 0', padding: '20px 22px 30px', boxShadow: t.shadow }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, marginBottom: 18 }}>
          {I.apple(t.ink)}<span style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 600, color: t.ink }}>Sign in with Apple</span>
        </div>
        <div style={{ border: `1px solid ${t.hairline}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
            <Avatar color={t.teal700} name="A" size={42} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 600, color: t.ink }}>Anna Reuter</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate }}>anna.reuter@icloud.com</div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${t.hairline}`, padding: '13px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>Hide My Email</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, marginTop: 2 }}>Forward to a private relay address</div>
            </div>
            <div style={{ width: 44, height: 26, borderRadius: 13, background: t.green, position: 'relative' }}><div style={{ position: 'absolute', top: 2, right: 2, width: 22, height: 22, borderRadius: '50%', background: '#fff' }} /></div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, margin: '20px 0' }}>
          {I.faceid(t.ink)}
          <div style={{ fontFamily: OK_FONT, fontSize: 13.5, color: t.slate }}>Confirm with Face ID to continue</div>
        </div>
        <Btn t={t} kind="teal" onClick={() => go('nameHousehold')} style={{ background: t.ink, borderRadius: 14 }}>Continue with Face ID</Btn>
        <div style={{ textAlign: 'center', marginTop: 14 }}><Link t={t} onClick={back}>Cancel</Link></div>
      </div>
    </Screen>
  );
}

/* ════════════════════ NAME HOUSEHOLD (post-SSO) ════════════════════ */
function NameHousehold({ t, platform, go, back }) {
  const [name, setName] = React.useState('Reuter Family');
  return (
    <Screen t={t} platform={platform}>
      <FlowHeader t={t} onBack={back} n={2} i={0} />
      <Pad style={{ paddingTop: 8, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 9, background: t.panelGreen, padding: '7px 12px', borderRadius: 999, marginBottom: 18 }}>
          <Avatar color={t.teal700} name="A" size={22} />
          <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.green, fontWeight: 600 }}>Signed in as Anna · anna.reuter@gmail.com</span>
        </div>
        <H1 t={t}>Name your household</H1>
        <Lead t={t} style={{ marginTop: 10, marginBottom: 26 }}>This is the private space your family will join. You can rename it any time in Settings.</Lead>
        <Field t={t} label="Household name" value={name} onChange={setName} icon={I.home(t.teal500, 19)} valid={name.trim().length >= 2} helper="2–60 characters" focusedDefault />
        <Spacer h={18} />
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: t.panelTeal, borderRadius: 13, padding: '13px 14px' }}>
          {I.shield(t.teal700, 20)}
          <span style={{ fontFamily: OK_FONT, fontSize: 13, color: t.teal800, lineHeight: 1.45 }}>You'll be the <b>Owner</b>, with full admin rights and the ability to add members.</span>
        </div>
        <Grow />
        <Btn t={t} kind="primary" onClick={() => go('biometric')}>Create household</Btn>
        <Spacer h={14} />
      </Pad>
    </Screen>
  );
}

/* ════════════════════ EU SIGNUP (email) ════════════════════ */
function score(pw) { let s = 0; if (pw.length >= 10) s++; if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++; if (/\d/.test(pw)) s++; if (/[^A-Za-z0-9]/.test(pw)) s++; return Math.min(4, s); }
function EuSignup({ t, platform, go, back }) {
  const [hh, setHh] = React.useState('Reuter Family');
  const [email, setEmail] = React.useState('anna.reuter@email.de');
  const [pw, setPw] = React.useState('calm-Harbour7');
  const [cpw, setCpw] = React.useState('calm-Harbour7');
  const [show, setShow] = React.useState(false);
  const sc = score(pw);
  const emailOk = /.+@.+\..+/.test(email);
  const match = pw.length > 0 && pw === cpw;
  const ready = hh.trim().length >= 2 && emailOk && sc >= 3 && match;
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} n={3} i={0} />
      <Pad style={{ paddingTop: 6, paddingBottom: 20 }}>
        <H1 t={t}>Create your account</H1>
        <Lead t={t} style={{ marginTop: 9, marginBottom: 20 }}>Set up your household in under two minutes.</Lead>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field t={t} label="Household name" value={hh} onChange={setHh} icon={I.home(t.teal500, 19)} valid={hh.trim().length >= 2} />
          <Field t={t} label="Email" value={email} onChange={setEmail} type="email" icon={I.mail(t.teal500)} valid={emailOk} />
          <div>
            <Field t={t} label="Password" value={pw} onChange={setPw} type={show ? 'text' : 'password'} icon={I.lock(t.teal500)}
              trailing={<button onClick={() => setShow((s) => !s)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 2, display: 'flex' }}>{show ? I.eyeOff(t.slate) : I.eye(t.slate)}</button>} />
            <StrengthMeter t={t} score={sc} />
            <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 8, lineHeight: 1.5 }}>At least 10 characters, checked against known breached passwords. Paste is allowed so password managers work.</div>
          </div>
          <Field t={t} label="Confirm password" value={cpw} onChange={setCpw} type={show ? 'text' : 'password'} icon={I.lock(t.teal500)} valid={match} error={cpw.length > 0 && !match ? 'Passwords don\u2019t match yet' : null} />
        </div>
        <Spacer h={22} />
        <Btn t={t} kind="primary" disabled={!ready} onClick={() => go('euDisplayName')}>Create household</Btn>
        <Spacer h={14} />
        <Legal t={t} />
      </Pad>
    </Screen>
  );
}

/* ════════════════════ EU DISPLAY NAME + avatar ════════════════════ */
function ProfileSetup({ t, platform, go, back, next, step, of, title }) {
  const [name, setName] = React.useState(step === 0 ? 'Anna' : 'Grace');
  const [color, setColor] = React.useState(OK_AVATARS[0]);
  const taken = ['#2E5A87'];
  return (
    <Screen t={t} platform={platform}>
      <FlowHeader t={t} onBack={back} n={of} i={step} />
      <Pad style={{ paddingTop: 6, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <H1 t={t}>{title}</H1>
        <Lead t={t} style={{ marginTop: 9, marginBottom: 22 }}>How your family sees you across the calendar, lists and messages.</Lead>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
          <Avatar color={color} name={name} size={84} ring={t.surface} />
        </div>
        <Field t={t} label="Display name" value={name} onChange={setName} icon={I.user(t.teal500, 19)} helper="1–40 characters" valid={name.trim().length >= 1} />
        <Spacer h={20} />
        <div style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, marginBottom: 12 }}>Your colour <span style={{ color: t.muted, fontWeight: 400 }}>· keeps everyone's items legible</span></div>
        <AvatarPicker t={t} value={color} onPick={setColor} taken={taken} />
        <Grow />
        <Btn t={t} kind="primary" onClick={() => go(next)}>Continue</Btn>
        <Spacer h={14} />
      </Pad>
    </Screen>
  );
}

/* ════════════════════ OTP verify (email or SMS) ════════════════════ */
function VerifyOtp({ t, platform, go, back, channel, dest, next, step, of }) {
  const [otp, setOtp] = React.useState('482915');
  const inputRef = React.useRef(null);
  const ready = otp.length === 6;
  return (
    <Screen t={t} platform={platform}>
      <FlowHeader t={t} onBack={back} n={of} i={step} />
      <Pad style={{ paddingTop: 6, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          {channel === 'email' ? I.mail(t.teal700) : I.phone(t.teal700)}
        </div>
        <H1 t={t}>{channel === 'email' ? 'Verify your email' : 'Enter the code'}</H1>
        <Lead t={t} style={{ marginTop: 10, marginBottom: 26 }}>We sent a 6-digit code {channel === 'email' ? 'to' : 'by SMS to'} <b style={{ color: t.ink }}>{dest}</b>. {channel === 'email' ? 'Change' : 'Wrong number?'} <Link t={t} onClick={back}>{channel === 'email' ? 'email' : 'Edit'}</Link></Lead>
        <div onClick={() => inputRef.current && inputRef.current.focus()}>
          <OTPCells t={t} value={otp} active />
        </div>
        <input ref={inputRef} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }} />
        <Spacer h={20} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: OK_FONT, fontSize: 13.5, color: t.muted }}>Code expires in 9:42</span>
          <span style={{ fontFamily: OK_FONT, fontSize: 13.5, color: t.muted }}>Resend in <b style={{ color: t.slate }}>0:42</b></span>
        </div>
        <Spacer h={16} />
        <Banner t={t} tone="info" icon={I.shield(t.teal700, 17)}>Codes are single-use and expire in 10 minutes. Up to 5 per hour.</Banner>
        <Grow />
        <Btn t={t} kind="primary" disabled={!ready} onClick={() => go(next)}>Verify &amp; continue</Btn>
        <Spacer h={14} />
      </Pad>
    </Screen>
  );
}

/* ════════════════════ Password-only step (Africa) ════════════════════ */
function PasswordStep({ t, platform, go, back, next, step, of }) {
  const [pw, setPw] = React.useState('Soko-Market22');
  const [cpw, setCpw] = React.useState('Soko-Market22');
  const [show, setShow] = React.useState(false);
  const sc = score(pw);
  const match = pw.length > 0 && pw === cpw;
  const ready = sc >= 3 && match;
  return (
    <Screen t={t} platform={platform}>
      <FlowHeader t={t} onBack={back} n={of} i={step} />
      <Pad style={{ paddingTop: 6, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <H1 t={t}>Choose a password</H1>
        <Lead t={t} style={{ marginTop: 9, marginBottom: 22 }}>This keeps your household private. Only you sign in with it.</Lead>
        <Field t={t} label="Password" value={pw} onChange={setPw} type={show ? 'text' : 'password'} icon={I.lock(t.teal500)}
          trailing={<button onClick={() => setShow((s) => !s)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 2, display: 'flex' }}>{show ? I.eyeOff(t.slate) : I.eye(t.slate)}</button>} />
        <StrengthMeter t={t} score={sc} />
        <Spacer h={18} />
        <Field t={t} label="Confirm password" value={cpw} onChange={setCpw} type={show ? 'text' : 'password'} icon={I.lock(t.teal500)} valid={match} />
        <Spacer h={18} />
        <Banner t={t} tone="info" icon={I.shield(t.teal700, 17)}>At least 10 characters. Stored securely, never in plain text.</Banner>
        <Grow />
        <Btn t={t} kind="primary" disabled={!ready} onClick={() => go(next)}>Continue</Btn>
        <Spacer h={14} />
      </Pad>
    </Screen>
  );
}

/* ════════════════════ AFRICA phone entry ════════════════════ */
function AfPhone({ t, platform, go, back }) {
  const [phone, setPhone] = React.useState('712 345 678');
  return (
    <Screen t={t} platform={platform}>
      <FlowHeader t={t} onBack={back} n={4} i={0} right={
        <button style={{ display: 'flex', alignItems: 'center', gap: 4, border: 'none', background: t.surfaceAlt, borderRadius: 999, padding: '6px 9px', cursor: 'pointer' }}>{I.globe(t.slate, 15)}<span style={{ fontFamily: OK_FONT, fontSize: 12, fontWeight: 600, color: t.slate }}>EN</span></button>
      } />
      <Pad style={{ paddingTop: 6, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <H1 t={t}>Sign up with your phone</H1>
        <Lead t={t} style={{ marginTop: 9, marginBottom: 22 }}>No email needed. We'll text you a 6-digit code to confirm it's you.</Lead>
        <div style={{ fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: t.slate, marginBottom: 7 }}>Phone number</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 7, height: 52, padding: '0 13px', borderRadius: 13, background: t.fieldBg, boxShadow: `inset 0 0 0 1.5px ${t.fieldBorder}`, cursor: 'pointer', border: 'none', flex: '0 0 auto' }}>
            <span style={{ fontSize: 18 }}>🇰🇪</span>
            <span style={{ fontFamily: OK_FONT, fontSize: 16, color: t.fieldText, fontWeight: 600 }}>+254</span>
            {I.chevD(t.slate, 15)}
          </button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', height: 52, padding: '0 14px', borderRadius: 13, background: t.fieldBg, boxShadow: `inset 0 0 0 1.5px ${t.fieldBorder}` }}>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: OK_FONT, fontSize: 16, color: t.fieldText, minWidth: 0, letterSpacing: 1 }} />
            {I.checkCircle(t.green, 19)}
          </div>
        </div>
        <Spacer h={20} />
        <Banner t={t} tone="offline" icon={I.wifiOff(t.info, 18)}>Built for low data. Signing in barely touches your bundle, and works through patchy connections.</Banner>
        <Spacer h={14} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted }}>Available in</span>
          {['English', 'Kiswahili', 'Français'].map((l, i) => <span key={l} style={{ fontFamily: OK_FONT, fontSize: 12.5, fontWeight: 600, color: i === 0 ? t.teal700 : t.slate, background: i === 0 ? t.panelTeal : t.surfaceAlt, padding: '3px 9px', borderRadius: 999 }}>{l}</span>)}
        </div>
        <Grow />
        <Btn t={t} kind="primary" onClick={() => go('afPassword')}>Continue</Btn>
        <div style={{ textAlign: 'center', marginTop: 14 }}><span style={{ fontFamily: OK_FONT, fontSize: 14, color: t.slate }}>Have an email instead? <Link t={t} onClick={() => go('euSignup')}>Use email</Link></span></div>
        <Spacer h={12} />
      </Pad>
    </Screen>
  );
}

/* ════════════════════ BIOMETRIC enable ════════════════════ */
function BiometricEnable({ t, platform, go }) {
  const isFace = platform === 'ios';
  return (
    <Screen t={t} platform={platform}>
      <Grow />
      <Pad style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: 96, height: 96, borderRadius: 28, background: t.panelTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ transform: 'scale(1.7)' }}>{isFace ? I.faceid(t.teal700) : I.finger(t.teal700)}</div>
        </div>
        <H1 t={t} style={{ fontSize: 26 }}>{isFace ? 'Turn on Face ID?' : 'Turn on fingerprint unlock?'}</H1>
        <Lead t={t} style={{ marginTop: 12, maxWidth: 300 }}>Re-open OmniKin in a tap. Fast, but still secure. Your password is never stored on this device.</Lead>
      </Pad>
      <Spacer h={26} />
      <Pad>
        <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', background: t.panelBlue, borderRadius: 14, padding: '14px 15px' }}>
          {I.lock(t.subhead, 19)}
          <div>
            <div style={{ fontFamily: OK_FONT, fontSize: 13.5, fontWeight: 700, color: t.subhead }}>Extra check on sensitive areas</div>
            <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, marginTop: 3, lineHeight: 1.45 }}>We'll still ask for a fresh {isFace ? 'Face ID' : 'fingerprint'} or passcode before Documents and Settings.</div>
          </div>
        </div>
      </Pad>
      <Grow />
      <Pad style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Btn t={t} kind="primary" onClick={() => go('home')}>{isFace ? 'Enable Face ID' : 'Enable fingerprint'}</Btn>
        <Btn t={t} kind="ghost" onClick={() => go('home')} style={{ height: 48 }}>Not now</Btn>
      </Pad>
      <Spacer h={14} />
    </Screen>
  );
}

/* ════════════════════ HOME (Owner landing) ════════════════════ */
function HomeSpace({ t, platform, household = 'Reuter Family', owner = 'Anna', ownerColor = '#1C6E78', members, offline, go }) {
  members = members || [{ n: 'Anna', c: '#1C6E78', role: 'Owner' }];
  const tiles = [
    { label: 'Calendar', icon: I.cal, color: t.teal700, bg: t.panelTeal },
    { label: 'Lists', icon: I.list, color: t.blue, bg: t.panelBlue },
    { label: 'Documents', icon: I.doc, color: t.coral, bg: t.panelCoral, lock: true },
    { label: 'Settings', icon: I.gear, color: t.green, bg: t.panelGreen, lock: true },
  ];
  const tabs = [['Home', I.home, true], ['Calendar', I.cal], ['Lists', I.list], ['Docs', I.doc], ['Settings', I.gear]];
  return (
    <Screen t={t} platform={platform} bg={t.bg} noBottomInset>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Pad style={{ paddingTop: 8 }}>
          {offline && <div style={{ marginBottom: 14 }}><Banner t={t} tone="offline" icon={I.wifiOff(t.info, 18)}>You're offline. Showing your saved household. Changes sync when you're back.</Banner></div>}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, fontWeight: 500 }}>Your household</div>
              <div style={{ fontFamily: OK_FONT, fontSize: 24, fontWeight: 700, color: t.title, letterSpacing: -0.4 }}>{household}</div>
            </div>
            <Avatar color={ownerColor} name={owner} size={42} ring={t.surface} />
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: t.panelGreen, padding: '5px 11px', borderRadius: 999, marginTop: 10, whiteSpace: 'nowrap' }}>
            {I.shield(t.green, 13)}<span style={{ fontFamily: OK_FONT, fontSize: 12, fontWeight: 700, color: t.green }}>You're the Owner</span>
          </div>
        </Pad>
        <Spacer h={18} />
        {/* members */}
        <Pad>
          <div style={{ background: t.surface, borderRadius: 16, padding: 16, boxShadow: t.shadowSm, border: `1px solid ${t.hairline}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 }}>
              <span style={{ fontFamily: OK_FONT, fontSize: 14, fontWeight: 700, color: t.ink }}>Members</span>
              <span style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted }}>Each has their own login</span>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              {members.map((m, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 52 }}>
                  <Avatar color={m.c} name={m.n} size={46} />
                  <span style={{ fontFamily: OK_FONT, fontSize: 12, fontWeight: 600, color: t.ink }}>{m.n}</span>
                  {m.role && <span style={{ fontFamily: OK_FONT, fontSize: 9.5, fontWeight: 700, color: m.role === 'Owner' ? t.green : t.slate, background: m.role === 'Owner' ? t.panelGreen : t.surfaceAlt, padding: '1px 6px', borderRadius: 999, marginTop: -2 }}>{m.role.toUpperCase()}</span>}
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 52 }}>
                <button style={{ width: 46, height: 46, borderRadius: '50%', border: `1.5px dashed ${t.teal300}`, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{I.plus(t.teal500)}</button>
                <span style={{ fontFamily: OK_FONT, fontSize: 12, fontWeight: 600, color: t.teal500 }}>Add</span>
              </div>
            </div>
          </div>
        </Pad>
        <Spacer h={16} />
        <Pad>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {tiles.map((tile) => (
              <div key={tile.label} style={{ background: t.surface, border: `1px solid ${t.hairline}`, borderRadius: 16, padding: 15, height: 92, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: t.shadowSm }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: tile.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{tile.icon(tile.color, 20)}</div>
                  {tile.lock && <span title="Needs a fresh check">{I.lock(t.muted, 15)}</span>}
                </div>
                <span style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{tile.label}</span>
              </div>
            ))}
          </div>
        </Pad>
        <Grow />
      </div>
      {/* tab bar */}
      <div style={{ display: 'flex', borderTop: `1px solid ${t.hairline}`, background: t.surface, paddingTop: 8, paddingBottom: platform === 'ios' ? 22 : 14 }}>
        {tabs.map(([label, icon, active]) => (
          <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            {icon(active ? t.teal700 : t.muted, 22)}
            <span style={{ fontFamily: OK_FONT, fontSize: 10, fontWeight: active ? 700 : 500, color: active ? t.teal700 : t.muted }}>{label}</span>
          </div>
        ))}
      </div>
    </Screen>
  );
}

/* ════════════════════ SIGN IN (returning) ════════════════════ */
function SignIn({ t, platform, go, back }) {
  const [id, setId] = React.useState('anna.reuter@email.de');
  const [pw, setPw] = React.useState('calm-Harbour7');
  const [show, setShow] = React.useState(false);
  const [keep, setKeep] = React.useState(true);
  return (
    <Screen t={t} platform={platform} scroll>
      <FlowHeader t={t} onBack={back} />
      <Pad style={{ paddingTop: 4, paddingBottom: 20 }}>
        <LogoMark t={t} size={52} />
        <H1 t={t} style={{ marginTop: 18 }}>Welcome back</H1>
        <Lead t={t} style={{ marginTop: 9, marginBottom: 22 }}>Sign in to your household.</Lead>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field t={t} label="Email or phone" value={id} onChange={setId} icon={I.mail(t.teal500)} />
          <div>
            <Field t={t} label="Password" value={pw} onChange={setPw} type={show ? 'text' : 'password'} icon={I.lock(t.teal500)}
              trailing={<button onClick={() => setShow((s) => !s)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 2, display: 'flex' }}>{show ? I.eyeOff(t.slate) : I.eye(t.slate)}</button>} />
            <div style={{ textAlign: 'right', marginTop: 8 }}><Link t={t}>Forgot password?</Link></div>
          </div>
        </div>
        <div onClick={() => setKeep((k) => !k)} style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, cursor: 'pointer' }}>
          <div style={{ width: 22, height: 22, borderRadius: 7, background: keep ? t.teal700 : 'transparent', boxShadow: keep ? 'none' : `inset 0 0 0 1.5px ${t.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{keep && I.check('#fff', 14)}</div>
          <span style={{ fontFamily: OK_FONT, fontSize: 14, color: t.ink }}>Keep me signed in on this device</span>
        </div>
        <Spacer h={22} />
        <Btn t={t} kind="primary" onClick={() => go('home')}>Sign in</Btn>
        <Spacer h={12} />
        <Btn t={t} kind="outline" icon={platform === 'ios' ? I.faceid(t.teal500) : I.finger(t.teal500)} onClick={() => go('unlock')} style={{ height: 50 }}>{platform === 'ios' ? 'Use Face ID instead' : 'Use fingerprint instead'}</Btn>
        <Spacer h={16} />
        <Divider t={t} label="or" />
        <Spacer h={16} />
        <div style={{ display: 'flex', gap: 11 }}>
          <Btn t={t} kind="sso" icon={I.google()} onClick={() => go('home')}>Google</Btn>
          {platform === 'ios' && <Btn t={t} kind="ssoDark" icon={I.apple('#fff')} onClick={() => go('home')}>Apple</Btn>}
        </div>
      </Pad>
    </Screen>
  );
}

/* ════════════════════ BIOMETRIC unlock (returning lock) ════════════════════ */
function BiometricUnlock({ t, platform, go, back }) {
  const isFace = platform === 'ios';
  return (
    <Screen t={t} platform={platform}>
      <Grow />
      <Pad style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <LogoMark t={t} size={58} />
        <div style={{ fontFamily: OK_FONT, fontSize: 26, fontWeight: 700, color: t.title, marginTop: 16 }}>Welcome back, Anna</div>
        <Lead t={t} style={{ marginTop: 8 }}>Opening your saved household.</Lead>
      </Pad>
      <Grow />
      <Pad style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button onClick={() => go('home')} style={{ width: 108, height: 108, borderRadius: '50%', border: 'none', background: t.panelTeal, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 0 ${t.teal500}`, animation: 'okpulse 2.2s ease-out infinite' }}>
          <div style={{ transform: 'scale(1.9)' }}>{isFace ? I.faceid(t.teal700) : I.finger(t.teal700)}</div>
        </button>
        <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.slate, marginTop: 20 }}>Tap to unlock with {isFace ? 'Face ID' : 'fingerprint'}</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, background: t.panelTeal, padding: '5px 11px', borderRadius: 999 }}>{I.wifiOff(t.info, 13)}<span style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.info, fontWeight: 600 }}>Works offline · cached session</span></div>
      </Pad>
      <Grow />
      <Pad><Btn t={t} kind="ghost" onClick={() => go('signin')} style={{ height: 46 }}>Use password instead</Btn></Pad>
      <Spacer h={16} />
    </Screen>
  );
}

/* ════════════════════ SCREEN REGISTRY ════════════════════ */
const SCREENS = {
  welcomeA:      { render: (p) => <WelcomeA {...p} />, label: 'Welcome · A (calm)' },
  welcomeB:      { render: (p) => <WelcomeB {...p} />, label: 'Welcome · B (immersive)' },
  googleSheet:   { render: (p) => <GoogleSheet {...p} />, label: 'Google account chooser' },
  appleSheet:    { render: (p) => <AppleSheet {...p} />, label: 'Apple sign-in' },
  nameHousehold: { render: (p) => <NameHousehold {...p} />, label: 'Name household (after SSO)' },
  euSignup:      { render: (p) => <EuSignup {...p} />, label: 'Create account (email)' },
  euDisplayName: { render: (p) => <ProfileSetup {...p} next="euVerify" step={1} of={3} title="Set up your profile" />, label: 'Profile · name & colour' },
  euVerify:      { render: (p) => <VerifyOtp {...p} channel="email" dest="anna.reuter@email.de" next="biometric" step={2} of={3} />, label: 'Verify email (OTP)' },
  biometric:     { render: (p) => <BiometricEnable {...p} />, label: 'Enable biometrics' },
  home:          { render: (p) => <HomeSpace {...p} />, label: 'Home space (Owner)' },
  afPhone:       { render: (p) => <AfPhone {...p} />, label: 'Phone sign-up' },
  afPassword:    { render: (p) => <PasswordStep {...p} next="afOtp" step={1} of={4} />, label: 'Choose password' },
  afOtp:         { render: (p) => <VerifyOtp {...p} channel="sms" dest="+254 712 345 678" next="afProfile" step={2} of={4} />, label: 'Verify phone (SMS OTP)' },
  afProfile:     { render: (p) => <ProfileSetup {...p} next="afHome" step={3} of={4} title="Set up your profile" />, label: 'Profile · name & colour' },
  afHome:        { render: (p) => <HomeSpace {...p} household="Achieng Home" owner="Grace" ownerColor="#E2683C" offline members={[{ n: 'Grace', c: '#E2683C', role: 'Owner' }, { n: 'Mama', c: '#2E8C5A' }]} />, label: 'Home · cached / offline' },
  signin:        { render: (p) => <SignIn {...p} />, label: 'Sign in (returning)' },
  unlock:        { render: (p) => <BiometricUnlock {...p} />, label: 'Biometric unlock' },
};

/* back-target map for the prototype */
const BACK = {
  googleSheet: 'welcomeA', appleSheet: 'welcomeA', nameHousehold: 'welcomeA',
  euSignup: 'welcomeA', euDisplayName: 'euSignup', euVerify: 'euDisplayName', biometric: 'euVerify',
  afPhone: 'welcomeA', afPassword: 'afPhone', afOtp: 'afPassword', afProfile: 'afOtp',
  signin: 'welcomeA', unlock: 'signin',
};

/* gallery grouping */
const GALLERY = [
  { id: 'welcome', title: 'Welcome', subtitle: 'Two directions for the first screen', screens: ['welcomeA', 'welcomeB'] },
  { id: 'eu-sso', title: 'EU · Google / Apple SSO', subtitle: 'One-tap onboarding · Anna\u2019s path', screens: ['googleSheet', 'appleSheet', 'nameHousehold'] },
  { id: 'eu-email', title: 'EU · Email account creation', subtitle: 'Strong-but-friendly credential setup', screens: ['euSignup', 'euDisplayName', 'euVerify'] },
  { id: 'biohome', title: 'Biometrics & home space', subtitle: 'Shared across every flow', screens: ['biometric', 'home'] },
  { id: 'africa', title: 'Africa · Phone-first', subtitle: 'Grace\u2019s path · phone, OTP, offline-tolerant', screens: ['afPhone', 'afPassword', 'afOtp', 'afProfile', 'afHome'] },
  { id: 'returning', title: 'Returning sign-in', subtitle: 'Password, SSO & biometric unlock', screens: ['signin', 'unlock'] },
];

Object.assign(window, { SCREENS, BACK, GALLERY });

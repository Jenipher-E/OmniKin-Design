/* OmniKin website · shared shell, icons, scroll reveal, phone demos */
(function(){
const P = [
  ['index.html','Home'],['product.html','Product'],['modules.html','Upcoming'],
  ['blog.html','Blog'],['about.html','About'],['contact.html','Contact']
];

/* ── icons (1.6 stroke, currentColor) ─────────────────────────── */
const d = {
  lists:'M9 6h11M9 12h11M9 18h11M4 6h1M4 12h1M4 18h1',
  tasks:'M4 7l2.5 2.5L11 5M4 17l2.5 2.5L11 13M14 7h6M14 17h6',
  budget:'M3 7h18v12H3zM3 11h18M7 15h4',
  calendar:'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  meals:'M5 3v8a3 3 0 006 0V3M8 11v10M19 3c-2 2-2 5 0 7v11',
  agenda:'M6 4h12v16H6zM9 9h6M9 13h6M9 17h3',
  timetable:'M4 5h16v15H4zM9 5v15M4 10h16M4 15h16',
  shield:'M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z',
  bell:'M6 9a6 6 0 1112 0c0 4 1.5 5 1.5 5h-15S6 13 6 9zM10 19a2 2 0 004 0',
  people:'M3 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5M8.5 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7M16 15c2.5.4 4 2.3 4 5M16.5 11a3 3 0 100-6',
  lock:'M5 11h14v10H5zM8 11V8a4 4 0 118 0v3M12 15v2',
  audit:'M5 4h10l4 4v12H5zM14 4v5h5M8 13h8M8 17h5',
  settings:'M4 7h10M18 7h2M4 17h4M12 17h8M16 4v6M8 14v6',
  offline:'M4 12a8 8 0 0113-6M20 12a8 8 0 01-13 6M4 5v5h5M20 19v-5h-5',
  globe:'M12 3a9 9 0 100 18 9 9 0 000-18M3.5 9h17M3.5 15h17M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18',
  heart:'M12 20s-7-4.3-7-9.3A4 4 0 0112 8a4 4 0 017 2.7C19 15.7 12 20 12 20z',
  phone:'M8 3h8v18H8zM11 18h2',
  mail:'M3 6h18v12H3zM3 7l9 6 9-6',
  pin:'M12 21s6-5.5 6-10a6 6 0 10-12 0c0 4.5 6 10 6 10zM12 9v2',
  clock:'M12 3a9 9 0 100 18 9 9 0 000-18M12 7v5l3 2',
  spark:'M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3',
  arrow:'M5 12h13M13 7l5 5-5 5'
};
function icon(n,s){s=s||22;return d[n]?'<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+d[n]+'"/></svg>':''}
window.OKicon = icon;

const mark = c => '<svg viewBox="0 0 100 100" width="30" height="30" aria-hidden="true" style="overflow:visible"><g fill="none" stroke-linecap="round" stroke-width="8"><circle cx="38" cy="50" r="23" stroke="'+(c==='dark'?'#fff':'#1C6E78')+'"/><path d="M62 29 L62 71" stroke="'+(c==='dark'?'#7FA8D0':'#2E5A87')+'"/><path d="M62 50 L78 30" stroke="#E2683C"/><path d="M62 50 L78 71" stroke="#2E8C5A"/></g></svg>';

/* ── shell ─────────────────────────────────────────────────────── */
function shell(){
  const here = document.body.dataset.page || 'index.html';
  const links = P.map(([h,l]) => '<a href="'+h+'"'+(h===here?' aria-current="page"':'')+'>'+l+'</a>').join('');
  const head = document.querySelector('[data-head]');
  if(head) head.innerHTML =
    '<header class="site-head"><div class="head-in">'+
      '<a class="lockup" href="index.html" aria-label="OmniKin home">'+mark('dark')+'<span>OmniKin</span></a>'+
      '<nav class="nav">'+links+'</nav>'+
      '<a class="btn btn-cta btn-sm head-cta" href="contact.html#waitlist">Join the waitlist</a>'+
      '<button class="burger" aria-label="Menu" aria-expanded="false"><i></i></button>'+
    '</div><div class="drawer">'+links+'<a class="btn btn-cta" href="contact.html#waitlist">Join the waitlist</a></div></header>';

  const foot = document.querySelector('[data-foot]');
  if(foot) foot.innerHTML =
    '<footer class="site-foot"><div class="wrap"><div class="foot-grid">'+
      '<div><a class="lockup" href="index.html">'+mark('dark')+'<span>OmniKin</span></a>'+
        '<p style="margin-top:16px;max-width:27em">One calm place for everything a household runs on. Private by design, built to work on any phone and any connection.</p></div>'+
      '<div><h5>Product</h5><ul><li><a href="product.html">Overview</a></li><li><a href="product.html#modules">Modules</a></li><li><a href="modules.html">Upcoming</a></li><li><a href="product.html#privacy">Privacy</a></li></ul></div>'+
      '<div><h5>Company</h5><ul><li><a href="about.html">About us</a></li><li><a href="blog.html">Blog</a></li><li><a href="contact.html">Contact</a></li><li><a href="contact.html#waitlist">Waitlist</a></li></ul></div>'+
      '<div><h5>Where we build</h5><ul><li>European Union</li><li>Africa</li><li><a href="contact.html">Partner with us</a></li></ul></div>'+
    '</div><div class="foot-bottom"><span>&copy; 2026 OmniKin. All rights reserved.</span>'+
      '<span>No ads. No profiling. No selling your household data.</span></div></div></footer>';

  const b = document.querySelector('.burger'), dr = document.querySelector('.drawer');
  if(b) b.addEventListener('click',()=>{const o=dr.classList.toggle('open');b.setAttribute('aria-expanded',o)});
}

/* ── scroll reveal ─────────────────────────────────────────────── */
function reveal(){
  const els = document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}
  const io = new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
  }),{rootMargin:'0px 0px -8% 0px',threshold:.12});
  els.forEach((e,i)=>{e.style.transitionDelay=(Math.min(i%4,3)*70)+'ms';io.observe(e)});
}

/* ── phone demos: cycle .scr children, label chips, per-screen beats ── */
function demos(){
  document.querySelectorAll('[data-demo]').forEach(wrap=>{
    const set = wrap.dataset.screens, lib = window.OK_DEMOS;
    if(set && lib){
      const inner = set.split(',').map(k=>lib[k.trim()]||'').join('');
      wrap.querySelector('.phone-screen').innerHTML = inner;
    }
    const scrs = [...wrap.querySelectorAll('.scr')];
    if(!scrs.length) return;
    const dots = wrap.querySelector('.demo-dots');
    if(dots) dots.innerHTML = scrs.map((s,i)=>'<button type="button" role="tab" aria-selected="'+(i===0)+'">'+(s.dataset.label||('0'+(i+1)))+'</button>').join('');
    const btns = dots ? [...dots.querySelectorAll('button')] : [];
    let i = 0, timer = null, beats = [];
    const beatsFor = s => {
      const out = [];
      s.querySelectorAll('[data-beat]').forEach(el=>{
        const [cls,ms] = el.dataset.beat.split('@');
        out.push(setTimeout(()=>el.classList.add(cls), +ms||900));
      });
      return out;
    };
    function show(n){
      beats.forEach(clearTimeout);
      scrs.forEach((s,k)=>{
        s.classList.toggle('on',k===n);
        if(k!==n) s.querySelectorAll('[data-beat]').forEach(el=>el.classList.remove(el.dataset.beat.split('@')[0]));
      });
      btns.forEach((b,k)=>b.setAttribute('aria-selected',k===n));
      i = n; beats = beatsFor(scrs[n]);
    }
    function play(){clearInterval(timer);timer=setInterval(()=>show((i+1)%scrs.length),6200)}
    btns.forEach((b,k)=>b.addEventListener('click',()=>{show(k);play()}));
    show(0);
    if(!window.matchMedia('(prefers-reduced-motion:reduce)').matches) play();
  });
}

/* ── contact / waitlist forms ──────────────────────────────────── */
function forms(){
  document.querySelectorAll('form[data-fake]').forEach(f=>{
    f.addEventListener('submit',e=>{
      e.preventDefault();
      const ok = f.querySelector('.sent');
      if(ok){ok.classList.add('show');ok.setAttribute('role','status')}
      f.querySelectorAll('input,textarea,select').forEach(x=>{if(x.type!=='submit')x.value=''});
    });
  });
}

function icons(){
  document.querySelectorAll('[data-icon]').forEach(el=>{
    el.innerHTML = icon(el.dataset.icon, +el.dataset.size || 22);
    if(!el.style.color) el.style.color = el.dataset.tone || '#1C6E78';
  });
}

function boot(){shell();icons();reveal();demos();forms()}
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded',boot) : boot();
})();

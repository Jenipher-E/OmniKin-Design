/* OmniKin · Feature 4 (Tasks) — UI atoms. Consumes kit/omni-kit.jsx globals.
   Calm-and-bold, brand-token only. Two densities: compact (A) / airy (B).
   Assignee colour is the connective tissue across every surface (PRD: colour-coded by assignee). */
const { OK_FONT, OK_MONO, I, memberBy, listBy, F4_PRIORITY } = window;

/* ───────── Feature-4 icon set (stroke, 24-grid — matches omni-kit) ───────── */
const TI = {
  repeat:  (c, s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2l3 3-3 3"/><path d="M20 5H8a4 4 0 00-4 4v1"/><path d="M7 22l-3-3 3-3"/><path d="M4 19h12a4 4 0 004-4v-1"/></svg>,
  flag:    (c, s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>,
  bell:    (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 004 0"/></svg>,
  clock:   (c, s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>,
  clip:    (c, s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11l-8.5 8.5a4.5 4.5 0 01-6.4-6.4L13 4.7a3 3 0 014.3 4.3l-8.3 8.3a1.5 1.5 0 01-2.2-2.1L13 7"/></svg>,
  checklist:(c, s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6l1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17M12 6h8M12 12h8M12 18h8"/></svg>,
  scales:  (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M7 21h10M3 7h18M6.5 7L4 13a3 3 0 005 0zM17.5 7L15 13a3 3 0 005 0z"/><path d="M12 3.5l-6 3.5M12 3.5l6 3.5"/></svg>,
  spark:   (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.8 4.8L18.5 9.5 13.8 11.4 12 16l-1.8-4.6L5.5 9.5l4.7-1.7zM18.5 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></svg>,
  heart:   (c, s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.5-7-9.5A3.8 3.8 0 0112 7a3.8 3.8 0 017 3.5c0 5-7 9.5-7 9.5z"/></svg>,
  swap:    (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>,
  moon:    (c, s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.5A8 8 0 019.5 4 7 7 0 1020 14.5z"/></svg>,
  dots:    (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>,
  alert:   (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5L22 19H2z"/><path d="M12 9.5v4M12 16.5h.01"/></svg>,
  trash:   (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V4.5h6V7M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>,
  pencil:  (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4"/></svg>,
  reopen:  (c, s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 019-9 9 9 0 016.5 2.8L21 8M21 3v5h-5"/></svg>,
  sync:    (c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0115.5-6.2M21 4v4h-4M21 12a9 9 0 01-15.5 6.2M3 20v-4h4"/></svg>,
  flagOutline:(c, s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21V4M5 4h13l-3 5 3 5H5"/></svg>,
  agenda:  (c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>,
  grid:    (c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="16" rx="2.5"/><path d="M4 9.5h16M9 9.5V21M15 9.5V21M4 3v4M16 3v4M8 3v4"/></svg>,
  timetable:(c, s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2.5"/><path d="M3 9h18M8 4v17M3 14h18"/></svg>,
  /* list icons */
  broom:   (c, s=21) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 4l-7 7M11 11l-6.5 6.5a2 2 0 000 3 2 2 0 003 0L14 14M11 11l3 3M6.5 15.5l2 2M16 15l2 5M19 13l2 3"/></svg>,
  bag:     (c, s=21) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8h12l-1 12H7zM9 8V6a3 3 0 016 0v2"/></svg>,
  doc:     (c, s=21) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 16.5h6"/></svg>,
  cap:     (c, s=21) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.2 2.7 3 6 3s6-1.8 6-3v-5M22 9v5"/></svg>,
  tool:    (c, s=21) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 6.5a3.5 3.5 0 00-4.7 4.3L4 16.6 7.4 20l5.8-5.8a3.5 3.5 0 004.3-4.7l-2.4 2.4-2-2z"/></svg>,
};
const LIST_ICON = { broom: TI.broom, bag: TI.bag, doc: TI.doc, cap: TI.cap, tool: TI.tool };

/* ───────── layout atoms ───────── */
const Pad    = ({ children, style }) => <div style={{ padding: '0 20px', ...style }}>{children}</div>;
const H1     = ({ t, children, style }) => <div style={{ fontFamily: OK_FONT, fontSize: 26, fontWeight: 700, color: t.title, letterSpacing: -0.5, lineHeight: 1.15, ...style }}>{children}</div>;
const Lead   = ({ t, children, style }) => <div style={{ fontFamily: OK_FONT, fontSize: 15, color: t.slate, lineHeight: 1.5, ...style }}>{children}</div>;
const Spacer = ({ h }) => <div style={{ height: h, flex: '0 0 auto' }} />;
const Grow   = () => <div style={{ flex: 1 }} />;
const Link   = ({ t, children, onClick, style }) => <span onClick={onClick} style={{ fontFamily: OK_FONT, color: t.teal500, fontWeight: 600, cursor: 'pointer', ...style }}>{children}</span>;
const Kicker = ({ t, children, style }) => <div style={{ fontFamily: OK_MONO, fontSize: 11, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase', color: t.muted, ...style }}>{children}</div>;

/* ───────── Avatar + stack ───────── */
function Avatar({ color, name, size = 36, ring }) {
  return <div style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: OK_FONT, fontWeight: 700, fontSize: size * 0.4, flex: '0 0 auto', boxShadow: ring ? `0 0 0 2px ${ring}` : 'none' }}>{name ? name[0].toUpperCase() : ''}</div>;
}
function AvatarStack({ ids, size = 28, max = 5, t, ringColor }) {
  const shown = ids.slice(0, max);
  const extra = ids.length - shown.length;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {shown.map((id, i) => { const m = memberBy(id); return <div key={id} style={{ marginLeft: i === 0 ? 0 : -size * 0.34 }}><Avatar color={m.c} name={m.n} size={size} ring={ringColor || t.surface} /></div>; })}
      {extra > 0 && <div style={{ marginLeft: -size * 0.34, width: size, height: size, borderRadius: '50%', background: t.surfaceAlt, boxShadow: `0 0 0 2px ${ringColor || t.surface}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: OK_FONT, fontSize: size * 0.36, fontWeight: 700, color: t.slate }}>+{extra}</div>}
    </div>
  );
}

/* ───────── Card ───────── */
function Card({ t, children, style, pad = 16, onClick }) {
  return <div onClick={onClick} style={{ background: t.surface, borderRadius: 16, padding: pad, border: `1px solid ${t.hairline}`, boxShadow: t.shadowSm, cursor: onClick ? 'pointer' : 'default', ...style }}>{children}</div>;
}

/* ───────── Round task checkbox ───────── */
function TaskCheck({ t, checked, onClick, dim, accent }) {
  const on = accent || t.teal300;
  return (
    <button onClick={onClick} style={{ width: 26, height: 26, borderRadius: '50%', flex: '0 0 auto', border: 'none', cursor: onClick ? 'pointer' : 'default', padding: 0,
      background: checked ? t.green : 'transparent', boxShadow: checked ? 'none' : `inset 0 0 0 2px ${dim ? t.hairline : on}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s' }}>
      {checked && I.check('#fff', 15)}
    </button>
  );
}

/* ───────── Assignee chip (colour-coded) — "Anyone" when unassigned ───────── */
function AssigneeChip({ t, ids, size = 'md' }) {
  const sm = size === 'sm';
  if (!ids || ids.length === 0) {
    return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: sm ? 11 : 12, fontWeight: 600, color: t.slate, background: t.surfaceAlt, padding: sm ? '2px 9px' : '3px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>Anyone</span>;
  }
  if (ids.length === 1) {
    const m = memberBy(ids[0]);
    return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: OK_FONT, fontSize: sm ? 11 : 12, fontWeight: 600, color: m.c, whiteSpace: 'nowrap' }}>
      <span style={{ width: sm ? 7 : 8, height: sm ? 7 : 8, borderRadius: '50%', background: m.c, flex: '0 0 auto' }} />{m.n}</span>;
  }
  return <AvatarStack t={t} ids={ids} size={sm ? 18 : 20} />;
}

/* ───────── Due chip — overdue tone ───────── */
function DueChip({ t, due, overdue, size = 'md' }) {
  const sm = size === 'sm';
  const c = overdue ? t.warning : t.slate;
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: sm ? 11 : 12, fontWeight: overdue ? 700 : 600, color: c, whiteSpace: 'nowrap' }}>{TI.clock(c, sm ? 12 : 13)}{due}</span>;
}

/* ───────── Repeat chip ───────── */
function RepeatChip({ t, repeat, size = 'md' }) {
  if (!repeat) return null;
  const sm = size === 'sm';
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: OK_FONT, fontSize: sm ? 11 : 12, fontWeight: 600, color: t.teal700, whiteSpace: 'nowrap' }}>{TI.repeat(t.teal500, sm ? 12 : 13)}{repeat}</span>;
}

/* ───────── Priority dot ───────── */
function PriorityDot({ task, withLabel, t }) {
  const p = F4_PRIORITY[task.priority] || F4_PRIORITY.normal;
  if (task.priority === 'normal' && !withLabel) return null;
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 12, fontWeight: 600, color: p.c, whiteSpace: 'nowrap' }}>{TI.flag(p.c, 13)}{withLabel ? p.label : ''}</span>;
}

/* ───────── List chip ───────── */
function ListChip({ t, list }) {
  const l = listBy(list);
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 600, color: t.slate, background: t.surfaceAlt, padding: '2px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}><span style={{ width: 7, height: 7, borderRadius: 2, background: l.color }} />{l.label}</span>;
}

/* ───────── Task row — compact (A) and airy (B) ───────── */
function TaskRow({ t, task, airy, onClick, onCheck, readOnly, last }) {
  const done = task.when === 'done';
  const overdue = task.when === 'overdue';
  const m = task.assignees[0] ? memberBy(task.assignees[0]) : null;
  const accent = m ? m.c : t.teal300;
  const subDone = task.subtasks.filter((s) => s.done).length;
  if (airy) {
    return (
      <div onClick={onClick} style={{ background: t.surface, borderRadius: 16, border: `1px solid ${overdue ? 'rgba(224,165,60,.55)' : t.hairline}`, boxShadow: t.shadowSm, padding: 14, display: 'flex', alignItems: 'flex-start', gap: 13, cursor: onClick ? 'pointer' : 'default', opacity: done ? 0.6 : 1, borderLeft: `4px solid ${done ? t.hairline : accent}` }}>
        <div style={{ paddingTop: 1 }}><TaskCheck t={t} checked={done} accent={accent} dim={readOnly} onClick={readOnly ? undefined : (e) => { e && e.stopPropagation && e.stopPropagation(); onCheck && onCheck(); }} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: OK_FONT, fontSize: 16, fontWeight: 600, color: t.ink, textDecoration: done ? 'line-through' : 'none' }}>{task.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 7, flexWrap: 'wrap' }}>
            {done ? <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.green, fontWeight: 600 }}>{memberBy(task.completedBy).n} · {task.completedAt}</span>
                  : <DueChip t={t} due={task.due} overdue={overdue} />}
            <AssigneeChip t={t} ids={task.assignees} />
            <RepeatChip t={t} repeat={task.repeat} />
          </div>
          {(task.subtasks.length > 0 || task.attachments > 0 || task.priority === 'high') && !done && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              {task.priority === 'high' && <PriorityDot task={task} withLabel t={t} />}
              {task.subtasks.length > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, fontWeight: 600 }}>{TI.checklist(t.muted, 13)}{subDone}/{task.subtasks.length}</span>}
              {task.attachments > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, fontWeight: 600 }}>{TI.clip(t.muted, 13)}{task.attachments}</span>}
            </div>
          )}
        </div>
        {!done && onClick && <div style={{ paddingTop: 3 }}>{I.chevR(t.muted, 17)}</div>}
      </div>
    );
  }
  /* compact */
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderBottom: last ? 'none' : `1px solid ${t.hairline}`, cursor: onClick ? 'pointer' : 'default', background: overdue ? 'rgba(224,165,60,.06)' : 'transparent', opacity: done ? 0.6 : 1 }}>
      <TaskCheck t={t} checked={done} accent={accent} dim={readOnly} onClick={readOnly ? undefined : (e) => { e && e.stopPropagation && e.stopPropagation(); onCheck && onCheck(); }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          {task.priority === 'high' && !done && TI.flag(F4_PRIORITY.high.c, 13)}
          <span style={{ fontFamily: OK_FONT, fontSize: 15, fontWeight: 600, color: t.ink, textDecoration: done ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 3, flexWrap: 'wrap' }}>
          {done ? <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.green, fontWeight: 600 }}>Done · {task.completedAt}</span>
                : <DueChip t={t} due={task.due} overdue={overdue} size="sm" />}
          <RepeatChip t={t} repeat={task.repeat} size="sm" />
          {task.subtasks.length > 0 && !done && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: OK_FONT, fontSize: 11, color: t.muted, fontWeight: 600 }}>{TI.checklist(t.muted, 12)}{subDone}/{task.subtasks.length}</span>}
        </div>
      </div>
      <AssigneeChip t={t} ids={task.assignees} size="sm" />
    </div>
  );
}

/* ───────── Load bar (fair-load horizontal) ───────── */
function LoadBar({ t, member, value, max, sub, big }) {
  const m = typeof member === 'string' ? memberBy(member) : member;
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar color={m.c} name={m.n} size={big ? 36 : 30} ring={t.surface} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: OK_FONT, fontSize: big ? 14.5 : 13.5, fontWeight: 700, color: t.ink }}>{m.n}{m.you ? ' (you)' : ''}</span>
          <span style={{ fontFamily: OK_MONO, fontSize: big ? 13 : 12, fontWeight: 600, color: t.slate }}>{value}%</span>
        </div>
        <div style={{ height: big ? 10 : 8, borderRadius: 6, background: t.surfaceAlt, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', borderRadius: 6, background: m.c, transition: 'width .5s' }} />
        </div>
        {sub && <div style={{ fontFamily: OK_FONT, fontSize: 11.5, color: t.muted, marginTop: 5 }}>{sub}</div>}
      </div>
    </div>
  );
}

/* ───────── Segmented control (windows, this-vs-future) ───────── */
function Seg({ t, options, value, onChange, full }) {
  return (
    <div style={{ display: 'flex', background: t.surfaceAlt, borderRadius: 11, padding: 3, gap: 3, width: full ? '100%' : 'auto' }}>
      {options.map((o) => {
        const on = o.v === value;
        return <button key={o.v} onClick={() => onChange && onChange(o.v)} style={{ flex: full ? 1 : '0 0 auto', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', background: on ? t.surface : 'transparent', boxShadow: on ? t.shadowSm : 'none', fontFamily: OK_FONT, fontSize: 13, fontWeight: 600, color: on ? t.teal700 : t.slate, transition: 'all .15s', whiteSpace: 'nowrap' }}>{o.label}</button>;
      })}
    </div>
  );
}

/* ───────── Bottom sheet ───────── */
function Sheet({ t, platform, children, onClose, title, sub, maxH }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: t.sheetScrim, animation: 'okfade .2s ease' }} />
      <div style={{ position: 'relative', background: t.surface, borderTopLeftRadius: 26, borderTopRightRadius: 26, boxShadow: '0 -10px 40px rgba(14,58,64,.22)', maxHeight: maxH || '88%', display: 'flex', flexDirection: 'column', animation: 'oksheet .32s cubic-bezier(.2,.8,.25,1)', paddingBottom: platform === 'ios' ? 22 : 14 }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}><div style={{ width: 40, height: 5, borderRadius: 3, background: t.hairline }} /></div>
        {title && <div style={{ padding: '12px 22px 2px' }}>
          <div style={{ fontFamily: OK_FONT, fontSize: 18, fontWeight: 700, color: t.title }}>{title}</div>
          {sub && <div style={{ fontFamily: OK_FONT, fontSize: 13, color: t.slate, marginTop: 3, lineHeight: 1.45 }}>{sub}</div>}
        </div>}
        <div style={{ overflow: 'auto', padding: '10px 22px 6px' }}>{children}</div>
      </div>
    </div>
  );
}

/* ───────── Tab bar ───────── */
function TabBar({ t, platform, tabs, go }) {
  return (
    <div style={{ display: 'flex', borderTop: `1px solid ${t.hairline}`, background: t.surface, paddingTop: 8, paddingBottom: platform === 'ios' ? 22 : 14, flex: '0 0 auto' }}>
      {tabs.map(([label, icon, active, target]) => (
        <button key={label} onClick={() => target && go && go(target)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: 'none', background: 'transparent', cursor: target ? 'pointer' : 'default', position: 'relative' }}>
          {icon(active ? t.teal700 : t.muted, 22)}
          <span style={{ fontFamily: OK_FONT, fontSize: 10, fontWeight: active ? 700 : 500, color: active ? t.teal700 : t.muted }}>{label}</span>
          {active && <span style={{ position: 'absolute', top: -8, width: 5, height: 5, borderRadius: '50%', background: t.coral }} />}
        </button>
      ))}
    </div>
  );
}

/* ───────── FAB ───────── */
function FAB({ t, onClick, icon, label }) {
  return (
    <button onClick={onClick} style={{ position: 'absolute', right: 18, bottom: 92, zIndex: 20, height: 54, borderRadius: 27, border: 'none', cursor: 'pointer', background: t.coral, color: '#fff', display: 'flex', alignItems: 'center', gap: 8, padding: label ? '0 20px 0 18px' : 0, width: label ? 'auto' : 54, justifyContent: 'center', boxShadow: '0 8px 22px rgba(226,104,60,.4)', fontFamily: OK_FONT, fontSize: 15, fontWeight: 700 }}>
      {icon || I.plus('#fff', 22)}{label}
    </button>
  );
}

/* ───────── Section header ───────── */
function GroupHead({ t, children, right, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px', ...style }}>
      <Kicker t={t}>{children}</Kicker>{right}
    </div>
  );
}

/* ───────── Privacy line (reused on fairness surfaces) ───────── */
function PrivacyLine({ t, children, center }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, justifyContent: center ? 'center' : 'flex-start' }}>
      {I.lock(t.muted, 14)}
      <span style={{ fontFamily: OK_FONT, fontSize: 12, color: t.muted, lineHeight: 1.5, textAlign: center ? 'center' : 'left' }}>{children}</span>
    </div>
  );
}

/* ───────── Settings-style toggle row ───────── */
function ToggleRow({ t, label, sub, value, onChange, icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0' }}>
      {icon && <span style={{ flex: '0 0 auto', display: 'flex' }}>{icon}</span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: OK_FONT, fontSize: 14.5, fontWeight: 600, color: t.ink }}>{label}</div>
        {sub && <div style={{ fontFamily: OK_FONT, fontSize: 12.5, color: t.muted, marginTop: 2 }}>{sub}</div>}
      </div>
      <button onClick={() => onChange && onChange(!value)} style={{ width: 46, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer', background: value ? t.green : t.hairline, position: 'relative', transition: 'background .2s', flex: '0 0 auto' }}>
        <span style={{ position: 'absolute', top: 3, left: value ? 21 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.25)', transition: 'left .2s' }} />
      </button>
    </div>
  );
}

/* ───────── "Not in this release" ribbon ───────── */
function ParkedBadge({ t }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: OK_FONT, fontSize: 11.5, fontWeight: 700, color: t.blue, background: t.panelBlue, padding: '5px 11px', borderRadius: 999, letterSpacing: .2 }}>{TI.clock(t.blue, 13)}Not in this release</span>;
}

Object.assign(window, {
  TI, LIST_ICON, Pad, H1, Lead, Spacer, Grow, Link, Kicker,
  Avatar, AvatarStack, Card, TaskCheck, AssigneeChip, DueChip, RepeatChip,
  PriorityDot, ListChip, TaskRow, LoadBar, Seg, Sheet, TabBar, FAB,
  GroupHead, PrivacyLine, ToggleRow, ParkedBadge,
});

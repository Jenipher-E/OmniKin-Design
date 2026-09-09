/* OmniKin · Feature 4 (Tasks) — screen registry, version starts, gallery grouping. */
const W = window;

const F4_SCREENS = {
  /* ── Version A · Calm ── */
  homeA:       { render: (p) => <W.HomeA {...p} />,       label: 'Home · Tasks card entry', tone: 'shell' },
  tasksA:      { render: (p) => <W.TasksA {...p} />,      label: 'Tasks · day-grouped stream', tone: 'shell' },

  /* ── Version B · Bold ── */
  homeB:       { render: (p) => <W.HomeB {...p} />,       label: 'Home · bold Tasks hero', tone: 'shell' },
  tasksB:      { render: (p) => <W.TasksB {...p} />,      label: 'Tasks hub · grouped by assignee', tone: 'shell' },

  /* ── First arrival · clear / empty states ── */
  tasksEmptyA: { render: (p) => <W.TasksEmptyA {...p} />, label: 'Tasks · clear state (A)', tone: 'shell' },
  tasksEmptyB: { render: (p) => <W.TasksEmptyB {...p} />, label: 'Tasks · clear state (B)', tone: 'shell' },

  /* ── Core task management (Epic 4.1) ── */
  createTask:  { render: (p) => <W.CreateTask {...p} />,  label: 'Create a task · structured' },
  assignDone:  { render: (p) => <W.AssignDone {...p} />,  label: 'Created & assigned · confirm' },
  taskDetail:  { render: (p) => <W.TaskDetail {...p} />,  label: 'Detail · notes, subtasks, files' },
  editTask:    { render: (p) => <W.EditTask {...p} taskId="t3" />, label: 'Edit task · details' },
  editSeries:  { render: (p) => <W.EditSeries {...p} />,  label: 'Edit a repeating task · scope on save' },
  completeA:   { render: (p) => <W.Complete {...p} />,    label: 'Complete & reopen' },
  completeB:   { render: (p) => <W.Complete {...p} />,    label: 'Complete & reopen' },
  childAckA:   { render: (p) => <W.ChildAck {...p} />,    label: 'Child chore · acknowledge' },

  /* ── Reminders & accountability (Epic 4.2) ── */
  remindersA:  { render: (p) => <W.RemindersA {...p} />,  label: 'Reminders · morning digest' },
  reminderPrefs:{ render: (p) => <W.ReminderPrefs {...p} />, label: 'Reminder settings · calm' },
  offline:     { render: (p) => <W.Offline {...p} />,     label: 'Offline · saved & syncing' },

  /* ── Fairness (Epic 4.3, differentiator) ── */
  fairLoadA:   { render: (p) => <W.FairLoadA {...p} />,   label: 'Fair-load · calm (A)' },
  fairLoadB:   { render: (p) => <W.FairLoadB {...p} />,   label: 'Fair-load · bold (B)' },
  rebalance:   { render: (p) => <W.Rebalance {...p} />,   label: 'Rebalance · opt-in, confirmed' },

  /* ── Not in this release (US-4.2.2) ── */
  agendaParked:    { render: (p) => <W.AgendaParked {...p} />,    label: 'Tasks in agenda (Feature 9)' },
  calendarParked:  { render: (p) => <W.CalendarParked {...p} />,  label: 'Tasks on calendar (Feature 5)' },
  timetableParked: { render: (p) => <W.TimetableParked {...p} />, label: 'Chores in timetable (Feature 10)' },
};

/* version entry points */
const F4_START = { A: 'homeA', B: 'homeB' };

/* gallery sections (design canvas) */
const F4_GALLERY = [
  { id: 'verA', title: 'Version A · Calm', subtitle: 'Opened from the Home / Tasks card · single day-grouped stream · compact rows · fair-load as a calm card', screens: ['homeA', 'tasksA'] },
  { id: 'verB', title: 'Version B · Bold', subtitle: 'Its own bottom-tab hub · bold header carrying a live fair-load summary · airy cards grouped by assignee', screens: ['homeB', 'tasksB'] },
  { id: 'empty', title: 'First arrival · clear states', subtitle: 'Before anything exists: each create surface says plainly that nothing has been created yet and offers one calm way to start. Shown for both versions', screens: ['tasksEmptyA', 'tasksEmptyB'] },
  { id: 'core', title: 'Create, assign & detail', subtitle: 'Capture a structured task, repeat it, assign with role awareness, and add notes, subtasks and files. Editing opens the full form, then a scope choice on save for repeating tasks', screens: ['createTask', 'assignDone', 'taskDetail', 'editTask', 'editSeries', 'completeA', 'childAckA'] },
  { id: 'fair', title: 'Mental-load fairness ★', subtitle: 'The differentiator: a private, non-judgemental view of who carries the load, with opt-in human-confirmed rebalancing', screens: ['fairLoadA', 'fairLoadB', 'rebalance'] },
  { id: 'reminders', title: 'Reminders & offline', subtitle: 'Calm digests, a single gentle overdue nudge, per-member settings and offline-tolerant ticking', screens: ['remindersA', 'reminderPrefs', 'offline'] },
  { id: 'parked', title: 'Not in this release', subtitle: 'US-4.2.2 surfaces depend on Agenda (Feature 9), Calendar (Feature 5) and Timetable (Feature 10) — designed here, parked for a later iteration', screens: ['agendaParked', 'calendarParked', 'timetableParked'] },
];

Object.assign(window, { F4_SCREENS, F4_START, F4_GALLERY });

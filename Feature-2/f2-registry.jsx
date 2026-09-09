/* OmniKin · Feature 2 — screen registry, back-map, gallery grouping. */
const W = window;

const F2_SCREENS = {
  /* Version A · Settings-based */
  homeA:           { render: (p) => <W.HomeA {...p} />,        label: 'Home · Settings entry', tone: 'shell' },
  settingsList:    { render: (p) => <W.SettingsList {...p} />, label: 'Settings · Household group', tone: 'shell' },
  householdA:      { render: (p) => <W.HouseholdA {...p} />,   label: 'Members & roles (settings)', tone: 'shell' },
  /* First arrival · clear / empty states */
  householdEmptyA: { render: (p) => <W.HouseholdA {...p} empty />, label: 'Members · clear state (A)', tone: 'shell' },
  peopleEmptyB:    { render: (p) => <W.PeopleHub {...p} tab="members" empty />, label: 'People hub · clear state (B)', tone: 'shell' },
  /* Version B · Home-based */
  homeB:           { render: (p) => <W.HomeB {...p} />,        label: 'Home · Members card entry', tone: 'shell' },
  peopleHub:       { render: (p) => <W.PeopleHub {...p} tab="members" />,  label: 'People hub · Members', tone: 'shell' },
  peopleInvites:   { render: (p) => <W.PeopleHub {...p} tab="invites" />,  label: 'People hub · Invites', tone: 'shell' },
  peoplePerms:     { render: (p) => <W.PeopleHub {...p} tab="perms" />,    label: 'People hub · Access', tone: 'shell' },
  peopleActivity:  { render: (p) => <W.PeopleHub {...p} tab="activity" />, label: 'People hub · Activity', tone: 'shell' },
  /* Membership · invite & join */
  inviteRole:      { render: (p) => <W.InviteRole {...p} />,    label: 'Invite · choose role' },
  inviteChild:     { render: (p) => <W.InviteChild {...p} />,   label: 'Invite · child age + GDPR-K' },
  inviteChannel:   { render: (p) => <W.InviteChannel {...p} />, label: 'Invite · email / SMS / link' },
  inviteLink:      { render: (p) => <W.InviteLink {...p} />,    label: 'Invite · single-use link & QR' },
  inviteSent:      { render: (p) => <W.InviteSent {...p} />,    label: 'Invite · sent + status' },
  acceptJoin:      { render: (p) => <W.AcceptJoin {...p} />,    label: 'Accept & join (invitee)' },
  /* Members · manage */
  memberDetail:    { render: (p) => <W.MemberDetail {...p} mid="sofia" />, label: 'Member · Carer detail' },
  memberDetailTeen:{ render: (p) => <W.MemberDetail {...p} mid="max" />,   label: 'Member · Child detail' },
  assignRole:      { render: (p) => <W.AssignRole {...p} mid="sofia" />,   label: 'Assign / change role' },
  /* Roles & permissions */
  permissionMatrix:{ render: (p) => <W.PermissionMatrix {...p} />,  label: 'Permission matrix' },
  roleEditor:      { render: (p) => <W.RoleEditor {...p} rid="carer" />, label: 'Role editor · per-module' },
  moduleSheet:     { render: (p) => <W.ModuleSheet {...p} />,       label: 'Module access sheet' },
  childRestrictions:{ render: (p) => <W.ChildRestrictions {...p} />, label: 'Child safety & consent' },
  /* Ownership & lifecycle */
  addCoOwner:      { render: (p) => <W.AddCoOwner {...p} />,       label: 'Add co-owner · MFA' },
  coOwnerDone:     { render: (p) => <W.CoOwnerDone {...p} />,      label: 'Co-owner · pending accept' },
  ownershipTransfer:{ render: (p) => <W.OwnershipTransfer {...p} />, label: 'Transfer sole ownership' },
  removeMember:    { render: (p) => <W.RemoveMember {...p} mid="sofia" />, label: 'Remove / leave' },
  auditLog:        { render: (p) => <W.AuditLog {...p} />,         label: 'Activity log' },
  /* Differentiated */
  extendedRoles:   { render: (p) => <W.ExtendedRoles {...p} />,    label: 'Extended family roles' },
  coParentSetup:   { render: (p) => <W.CoParentSetup {...p} />,    label: 'Co-parenting · setup' },
  coParentSpace:   { render: (p) => <W.CoParentSpace {...p} />,    label: 'Co-parenting · space' },
  /* alias for accept-flow landing */
  home:            { render: (p) => <W.HomeB {...p} />,            label: 'Home' },
};

/* back targets for the interactive prototype (start screen depends on version) */
const F2_BACK = {
  settingsList: 'homeA', householdA: 'settingsList', householdEmptyA: 'settingsList', peopleEmptyB: 'homeB',
  peopleHub: 'homeB', peopleInvites: 'peopleHub', peoplePerms: 'peopleHub', peopleActivity: 'peopleHub',
  inviteRole: null, inviteChild: 'inviteRole', inviteChannel: 'inviteRole', inviteLink: 'inviteChannel', inviteSent: null, acceptJoin: null,
  memberDetail: null, memberDetailTeen: null, assignRole: 'memberDetail',
  permissionMatrix: null, roleEditor: 'permissionMatrix', moduleSheet: 'roleEditor', childRestrictions: null,
  addCoOwner: null, coOwnerDone: 'addCoOwner', ownershipTransfer: 'addCoOwner', removeMember: 'memberDetail', auditLog: null,
  extendedRoles: null, coParentSetup: 'extendedRoles', coParentSpace: 'coParentSetup',
  home: null,
};

/* gallery sections */
const F2_GALLERY = [
  { id: 'verA',  title: 'Version A · Settings-based', subtitle: 'Household lives under the Settings tab', screens: ['homeA', 'settingsList', 'householdA'] },
  { id: 'verB',  title: 'Version B · Home-based',     subtitle: 'Its own People area, reached from the Members card', screens: ['homeB', 'peopleHub', 'peopleInvites', 'peoplePerms', 'peopleActivity'] },
  { id: 'empty', title: 'First arrival · clear states', subtitle: 'Before anyone is invited: it is just the Owner, with empty members, invites and activity, and one clear way to start. Shown for both versions', screens: ['householdEmptyA', 'peopleEmptyB'] },
  { id: 'invite', title: 'Shared · Invite & join',    subtitle: 'Role-first invites across email, SMS and single-use link', screens: ['inviteRole', 'inviteChild', 'inviteChannel', 'inviteLink', 'inviteSent', 'acceptJoin'] },
  { id: 'manage', title: 'Shared · Members',          subtitle: 'Member detail and role changes, capped at your level', screens: ['memberDetail', 'memberDetailTeen', 'assignRole'] },
  { id: 'perms',  title: 'Shared · Roles & permissions', subtitle: 'The permission matrix, per-role editor and child safety', screens: ['permissionMatrix', 'roleEditor', 'moduleSheet', 'childRestrictions'] },
  { id: 'owner',  title: 'Shared · Ownership & lifecycle', subtitle: 'Co-owners, transfer, removal and the audit log', screens: ['addCoOwner', 'coOwnerDone', 'ownershipTransfer', 'removeMember', 'auditLog'] },
  { id: 'diff',   title: 'Differentiated · Extended & co-parenting', subtitle: 'The structures incumbents can’t model', screens: ['extendedRoles', 'coParentSetup', 'coParentSpace'] },
];

/* interactive prototype entry per version */
const F2_START = { A: 'homeA', B: 'homeB' };

Object.assign(window, { F2_SCREENS, F2_BACK, F2_GALLERY, F2_START });

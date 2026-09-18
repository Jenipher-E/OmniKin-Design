/* OmniKin website · the animated "app in use" screens used in the phone frames.
   Each screen is a .scr; data-beat="class@ms" applies a class after N ms while the
   screen is on, which is what gives the loop its sense of someone using the app. */
const S = {};

S.lists = '<div class="scr" data-label="Lists">'+
  '<div class="scr-top"><b>Weekly shop</b><span class="meta">4 members</span></div>'+
  '<div class="row" data-beat="done@1200"><span class="tick"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"><path d="M5 13l4 4L19 7"/></svg></span><span>Oat milk, 2<small>Added by Jeni</small></span></div>'+
  '<div class="row"><span class="tick"></span><span>Rice, 5 kg<small>Aisle 4</small></span><span class="chip">Out of stock</span></div>'+
  '<div class="row pre" data-beat="show@2200"><span class="tick"></span><span>Brown rice, 5 kg<small>Suggested swap, same shop</small></span><span class="chip q">Swap</span></div>'+
  '<div class="row"><span class="tick"></span><span>Tomatoes, 1 kg</span></div>'+
  '<div class="note">One list, everyone. Ticks appear on every phone in the household straight away, even when someone is offline in the shop.</div>'+
  '<div class="tabbar"><div><i></i>Home</div><div class="act"><i></i>Lists</div><div><i></i>Tasks</div><div><i></i>Budget</div><div><i></i>More</div></div>'+
'</div>';

S.tasks = '<div class="scr" data-label="Tasks">'+
  '<div class="scr-top"><b>This week</b><span class="meta">Fair load</span></div>'+
  '<div class="panel"><div class="lbl"><span>Jeni</span><span>11 of 24</span></div><div class="bar"><i style="--w:72%;background:#2E5A87"></i></div></div>'+
  '<div class="panel"><div class="lbl"><span>Fabian</span><span>7 of 24</span></div><div class="bar"><i style="--w:46%;background:#2A8C99"></i></div></div>'+
  '<div class="panel"><div class="lbl"><span>Ada, 14</span><span>4 of 24</span></div><div class="bar"><i style="--w:26%;background:#E2683C"></i></div></div>'+
  '<div class="row" data-beat="done@2400" style="margin-top:6px"><span class="tick"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"><path d="M5 13l4 4L19 7"/></svg></span><span>Take the bins out<small>Ada, Tuesday</small></span></div>'+
  '<div class="note"><b>A gentle nudge, never a verdict</b>Two evening tasks could move to Fabian. Nothing changes until someone says yes.</div>'+
  '<div class="tabbar"><div><i></i>Home</div><div><i></i>Lists</div><div class="act"><i></i>Tasks</div><div><i></i>Budget</div><div><i></i>More</div></div>'+
'</div>';

S.money = '<div class="scr" data-label="Budget &amp; Expenses">'+
  '<div class="scr-top"><b>March budgets</b><span class="meta">Shared</span></div>'+
  '<div class="panel"><div class="lbl"><span>Groceries</span><span>412 of 500</span></div><div class="bar"><i style="--w:82%;background:#2A8C99"></i></div><p style="font-size:11px;color:#8A999B;margin-top:8px">Pace is a little ahead of February</p></div>'+
  '<div class="panel"><div class="lbl"><span>School and childcare</span><span>180 of 300</span></div><div class="bar"><i style="--w:60%;background:#2E5A87"></i></div></div>'+
  '<div class="row pre" data-beat="show@1800"><span class="av" style="background:#2E5A87">F</span><span>Market, 24.40<small>Logged offline, synced 18:02</small></span></div>'+
  '<div class="note"><b>Heads-up, not a block</b>Groceries may run over by month end. Adjust the budget, defer something, or just note it.</div>'+
  '<div class="tabbar"><div><i></i>Home</div><div><i></i>Lists</div><div><i></i>Tasks</div><div class="act"><i></i>Budget</div><div><i></i>More</div></div>'+
'</div>';

S.privacy = '<div class="scr" data-label="Privacy">'+
  '<div class="scr-top"><b>Privacy</b><span class="meta">Household</span></div>'+
  '<div class="panel"><div class="lbl"><span>Who can see this record</span></div><p style="font-size:12px;color:#586A6D;margin-top:8px">Whole household, chosen members, or you only. Set per record, not per app.</p></div>'+
  '<div class="row"><span class="av" style="background:#1C6E78">J</span><span>Jeni, owner<small>Full access</small></span></div>'+
  '<div class="row"><span class="av" style="background:#2E8C5A">A</span><span>Ada, 14<small>Own login, limited scope</small></span></div>'+
  '<div class="row pre" data-beat="show@1600"><span class="av" style="background:#8A999B">K</span><span>Kofi, carer<small>Tasks and lists only</small></span></div>'+
  '<div class="note">Every member has their own login. Children are set up by a parent and start with protective defaults.</div>'+
  '<div class="tabbar"><div><i></i>Home</div><div><i></i>Lists</div><div><i></i>Tasks</div><div><i></i>Budget</div><div class="act"><i></i>More</div></div>'+
'</div>';

window.OK_DEMOS = S;

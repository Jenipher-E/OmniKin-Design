/* OmniKin · Full journey — per-feature window namespace capture.
   --------------------------------------------------------------
   Features 2, 3 and 4 each (re)define globals with the SAME names on window:
   HomeA, HomeB, Offline, Sheet, and a whole kit of helpers (Pad, Card, Avatar,
   TabBar …). Whichever feature loads last wins on window, which would make the
   earlier features' screens render with the wrong components.

   Each feature's registry resolves its screens with a synchronous window lookup
   (e.g. `<W.HomeA />`), so we just need the right globals on window AT THE MOMENT
   a screen is rendered. We capture, after each feature's scripts have run, the
   value-diff of window (every global the feature created OR overwrote) into a
   namespace. The app then ACTIVATES the owning feature's namespace right before
   it renders a screen.

   None of the original feature files are modified — this only reads window. */
(function () {
  const W = window;
  W.__okNS = {};       // feature key -> { globalName: value } it created or changed
  W.__okBase = null;   // snapshot of base (shared kit) globals, before any feature
  let baseline = null; // rolling snapshot used to diff each feature in turn

  function snapAll() {
    const m = {};
    const keys = Object.keys(W);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      try { m[k] = W[k]; } catch (e) { /* skip protected globals */ }
    }
    return m;
  }

  /* call once, after the shared kit (omni-kit, omni-logo) has loaded and before
     the first feature: records the base layer and opens the first diff window. */
  W.__okSetBase = function () {
    W.__okBase = snapAll();
    baseline = W.__okBase;
  };

  /* call after a feature's scripts have run: everything new or reassigned since
     the previous capture becomes that feature's namespace. */
  W.__okCapture = function (name) {
    const ns = {};
    const keys = Object.keys(W);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      let v;
      try { v = W[k]; } catch (e) { continue; }
      if (!baseline || baseline[k] !== v) ns[k] = v;
    }
    W.__okNS[name] = ns;
    baseline = snapAll(); // advance baseline so the next feature diffs cleanly
  };

  /* activate (no restore) — for the single-screen prototype. Leaves the feature's
     globals on window so deep, interaction-time lookups (e.g. <window.Sheet/>)
     also resolve to the active feature. */
  W.__okActivate = function () {
    for (let a = 0; a < arguments.length; a++) {
      const ns = W.__okNS[arguments[a]];
      if (ns) for (const k in ns) W[k] = ns[k];
    }
  };

  /* activate + restore around a synchronous callback — for the multi-screen
     gallery, where every artboard's top-level component type is captured the
     instant its registry render() runs, then window is put back. */
  W.__okWith = function (names, fn) {
    const saved = {};
    const touched = [];
    for (let a = 0; a < names.length; a++) {
      const ns = W.__okNS[names[a]];
      if (!ns) continue;
      for (const k in ns) {
        if (!(k in saved)) { saved[k] = W[k]; touched.push(k); }
        W[k] = ns[k];
      }
    }
    try { return fn(); }
    finally { for (let i = 0; i < touched.length; i++) W[touched[i]] = saved[touched[i]]; }
  };

  /* build a stable, merged object from base + the named namespaces — used to give
     the journey's own bridge screens a fixed kit that never depends on window. */
  W.__okMerge = function () {
    const out = Object.assign({}, W.__okBase);
    for (let a = 0; a < arguments.length; a++) {
      const ns = W.__okNS[arguments[a]];
      if (ns) Object.assign(out, ns);
    }
    return out;
  };
})();

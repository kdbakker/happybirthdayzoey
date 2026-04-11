// main.js — Happy Birthday Card

(function () {

  // ── URL param → name ─────────────────────────────────────────
  // Reads ?name= from the URL and injects it as text content.
  // textContent (never innerHTML) keeps this XSS-safe.
  // Falls back to "Friend" if the param is absent or empty.

  var DEFAULT_NAME = 'Friend';

  function applyName() {
    var params = new URLSearchParams(window.location.search);
    var name   = (params.get('name') || '').trim();
    document.getElementById('name').textContent = name || DEFAULT_NAME;
  }

  applyName();


  // ── Balloon pop + confetti on click ───────────────────────
  // Click sequence:
  //   1. Name inflates with stutter (CSS keyframe, 800ms)
  //   2. Pop: name vanishes instantly
  //   3. Confetti bursts from the name's position
  //   4. Name fades back in after 1.5s

  var COLORS           = ['#B1B3F2', '#FD6BB5', '#00B0CB', '#ff6eb4', '#ffe033', '#ffffff', '#8720C5'];
  var COUNT            = 200;
  var GRAVITY          = 620;         // px/s²
  var INFLATE_DURATION = 800;         // ms — must match CSS animation duration
  var isBusy           = false;

  function burst() {
    if (isBusy) return;
    isBusy = true;

    var nameEl = document.getElementById('name');

    // Clear any lingering transition, then start inflate
    nameEl.style.transition = 'none';
    nameEl.style.opacity    = '1';
    nameEl.classList.add('is-inflating');

    setTimeout(function () {
      // ── Pop ──
      nameEl.classList.remove('is-inflating');
      nameEl.style.transition = 'none';
      nameEl.style.transform  = 'none';
      nameEl.style.opacity    = '0';

      // Fire confetti from the name's centre
      var rect = nameEl.getBoundingClientRect();
      var ox = rect.left + rect.width  / 2;
      var oy = rect.top  + rect.height / 2;
      for (var i = 0; i < COUNT; i++) spawnParticle(ox, oy);

      // Reappear and unlock
      setTimeout(function () {
        nameEl.style.transition = 'opacity 0.5s ease-in';
        nameEl.style.opacity    = '1';
        isBusy = false;
      }, 1500);

    }, INFLATE_DURATION);
  }

  function spawnParticle(ox, oy) {
    var el = document.createElement('div');
    el.className = 'confetti-particle';

    var isStrip = Math.random() > 0.55;
    var w = Math.random() * 9 + 5;
    el.style.width      = w + 'px';
    el.style.height     = (isStrip ? w * 0.3 : w) + 'px';
    el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    el.style.left       = ox + 'px';
    el.style.top        = oy + 'px';

    document.body.appendChild(el);

    var angle = Math.random() * Math.PI * 2;
    var speed = Math.random() * 500 + 150;
    var vx0   = Math.cos(angle) * speed;
    var vy0   = Math.sin(angle) * speed - 220;
    var rot0  = Math.random() * 360;
    var rotV  = (Math.random() - 0.5) * 900;
    var life  = Math.random() * 700 + 800;
    var t0    = null;

    function frame(ts) {
      if (!t0) t0 = ts;
      var elapsed  = (ts - t0) / 1000;
      var progress = (ts - t0) / life;

      if (progress >= 1) { el.remove(); return; }

      var x = vx0 * elapsed;
      var y = vy0 * elapsed + 0.5 * GRAVITY * elapsed * elapsed;
      var r = rot0 + rotV * elapsed;

      el.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + r + 'deg)';
      el.style.opacity   = 1 - progress;

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  document.addEventListener('click', burst);

})();

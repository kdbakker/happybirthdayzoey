// main.js — Happy Birthday Card

(function () {

  // ── URL param → name ───────────────────────────────────────
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


  // ── Confetti burst on click ────────────────────────────────
  // The name element fades out on click (as if it exploded into
  // the confetti), then fades back in once the particles settle.

  var COLORS      = ['#8720C5', '#5700CB', '#00B0CB', '#ff6eb4', '#ffe033', '#ffffff', '#ff6ec7'];
  var COUNT       = 200;
  var GRAVITY     = 620;  // px/s²
  var COOLDOWN_MS = 350;
  var lastBurst   = 0;

  function burst() {
    var now = Date.now();
    if (now - lastBurst < COOLDOWN_MS) return;
    lastBurst = now;

    var nameEl = document.getElementById('name');
    var rect = nameEl.getBoundingClientRect();
    var ox = rect.left + rect.width  / 2;
    var oy = rect.top  + rect.height / 2;

    // Name explodes out — fade quickly, reappear after confetti settles
    nameEl.style.transition = 'opacity 0.12s ease-out';
    nameEl.style.opacity    = '0';
    setTimeout(function () {
      nameEl.style.transition = 'opacity 0.5s ease-in';
      nameEl.style.opacity    = '1';
    }, 1500);

    for (var i = 0; i < COUNT; i++) spawnParticle(ox, oy);
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

// Mobile-Navigation
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Menü schließen, wenn ein Link angeklickt wird
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Kontaktformular: Hinweis, dass noch kein Versand angebunden ist
(function () {
  var form = document.getElementById('kontaktformular');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var note = document.getElementById('form-note');
    if (note) note.hidden = false;
    form.reset();
  });
})();

// Design-Varianten- und Logo-Umschalter (Vorschau für die Präsentation)
(function () {
  if (document.body.hasAttribute('data-no-switch')) return; // auf V3 ausgeblendet

  var THEMES = {
    original: { c: '#c05f3c', name: 'Original' },
    v1:       { c: '#3f6ca3', name: 'Blau &amp; Weiß' },
    v2:       { c: '#9e7b3a', name: 'Blau &amp; Gold' }
  };
  var order = ['original', 'v1', 'v2'];

  // Logo-Kandidaten, live im Header + Footer umschaltbar
  var LOGOS = {
    c: { h: 'assets/img/logo-5.png',    f: 'assets/img/logo-5-light.png',    name: 'C · V in W' },
    b: { h: 'assets/img/logo-6.png',    f: 'assets/img/logo-6-light.png',    name: 'B · Chevron' },
    a: { h: 'assets/img/logo-mark.png', f: 'assets/img/logo-mark-light.png', name: 'A · Geometrisch' }
  };
  var logoOrder = ['c', 'b', 'a'];

  function applyTheme(t) {
    if (!THEMES[t]) t = 'original';
    if (t === 'original') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('wb-theme', t); } catch (e) {}
    document.querySelectorAll('.theme-switch button[data-theme]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-theme') === t ? 'true' : 'false');
    });
  }

  function applyLogo(k) {
    if (!LOGOS[k]) k = 'c';
    document.querySelectorAll('img.brand__logo').forEach(function (i) { i.src = LOGOS[k].h; });
    document.querySelectorAll('.footer-logo img').forEach(function (i) { i.src = LOGOS[k].f; });
    try { localStorage.setItem('wb-logo', k); } catch (e) {}
    document.querySelectorAll('.theme-switch button[data-logo]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-logo') === k ? 'true' : 'false');
    });
  }

  var savedTheme = 'original', savedLogo = 'c';
  try { savedTheme = localStorage.getItem('wb-theme') || 'original'; } catch (e) {}
  try { savedLogo = localStorage.getItem('wb-logo') || 'c'; } catch (e) {}

  var box = document.createElement('div');
  box.className = 'theme-switch';
  var html = '<p class="theme-switch__label">Designvariante · Vorschau</p><div class="theme-switch__row">';
  order.forEach(function (k) {
    html += '<button type="button" data-theme="' + k + '"><span class="sw" style="background:' + THEMES[k].c + '"></span>' + THEMES[k].name + '</button>';
  });
  html += '<a class="ts-link" href="v3.html">V3: Interaktiv →</a></div>';
  html += '<p class="theme-switch__label" style="margin-top:.7rem">Logo · Vorschau</p><div class="theme-switch__row">';
  logoOrder.forEach(function (k) {
    html += '<button type="button" data-logo="' + k + '">' + LOGOS[k].name + '</button>';
  });
  html += '</div>';
  box.innerHTML = html;
  document.body.appendChild(box);

  box.querySelectorAll('button[data-theme]').forEach(function (b) {
    b.addEventListener('click', function () { applyTheme(b.getAttribute('data-theme')); });
  });
  box.querySelectorAll('button[data-logo]').forEach(function (b) {
    b.addEventListener('click', function () { applyLogo(b.getAttribute('data-logo')); });
  });
  applyTheme(savedTheme);
  applyLogo(savedLogo);
})();

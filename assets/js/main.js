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

// Design-Varianten-Umschalter (Vorschau für die Präsentation)
(function () {
  if (document.body.hasAttribute('data-no-switch')) return; // auf V3 ausgeblendet
  var THEMES = {
    original: { h: 'assets/img/logo-5.png', f: 'assets/img/logo-5-light.png', c: '#c05f3c', name: 'Original' },
    v1:       { h: 'assets/img/logo-5.png', f: 'assets/img/logo-5-light.png', c: '#3f6ca3', name: 'Blau &amp; Weiß' },
    v2:       { h: 'assets/img/logo-5.png', f: 'assets/img/logo-5-light.png', c: '#9e7b3a', name: 'Blau &amp; Gold' }
  };
  var order = ['original', 'v1', 'v2'];

  function apply(t) {
    if (!THEMES[t]) t = 'original';
    if (t === 'original') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
    document.querySelectorAll('img.brand__logo').forEach(function (i) { i.src = THEMES[t].h; });
    document.querySelectorAll('.footer-logo img').forEach(function (i) { i.src = THEMES[t].f; });
    try { localStorage.setItem('wb-theme', t); } catch (e) {}
    document.querySelectorAll('.theme-switch button[data-theme]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-theme') === t ? 'true' : 'false');
    });
  }

  var saved = 'original';
  try { saved = localStorage.getItem('wb-theme') || 'original'; } catch (e) {}

  var box = document.createElement('div');
  box.className = 'theme-switch';
  var html = '<p class="theme-switch__label">Designvariante · Vorschau</p><div class="theme-switch__row">';
  order.forEach(function (k) {
    html += '<button type="button" data-theme="' + k + '"><span class="sw" style="background:' + THEMES[k].c + '"></span>' + THEMES[k].name + '</button>';
  });
  html += '<a class="ts-link" href="v3.html">V3: Interaktiv →</a></div>';
  box.innerHTML = html;
  document.body.appendChild(box);

  box.querySelectorAll('button[data-theme]').forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-theme')); });
  });
  apply(saved);
})();

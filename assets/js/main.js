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

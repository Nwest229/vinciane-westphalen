// Westphalen Beratung — V3 (corporate, multipage)
(function () {
  // Mobile-Navigation
  var t = document.getElementById('navToggle'), m = document.getElementById('navMobile');
  if (t && m) {
    t.addEventListener('click', function () { var o = m.classList.toggle('open'); t.setAttribute('aria-expanded', o ? 'true' : 'false'); });
    m.addEventListener('click', function (e) { if (e.target.tagName === 'A') { m.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); } });
  }

  // Reveal on scroll
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Kontaktformular-Hinweis
  var form = document.getElementById('kontaktformular');
  if (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); var n = document.getElementById('form-note'); if (n) n.hidden = false; form.reset(); });
  }

  // Leistungen-Explorer (nur auf der Leistungen-Seite)
  var panel = document.getElementById('epanel');
  if (!panel) return;
  var P = {
    fuehrung:{head:'Für Führungskräfte & Manager:innen',lede:'Sie tragen Verantwortung für sich, Ihr Team und Ihre Entscheidungen. Gemeinsam schaffen wir Klarheit und stärken Ihre Wirkung.',
      sit:['Klarheit in beruflichen Zielen finden','Leadership übernehmen und eine klare Managementhaltung entwickeln','Managementschwierigkeiten und Stress bewältigen','Kommunikationsschwierigkeiten abbauen, Wirkung stärken','Burn-out-Risiken erkennen und vorbeugen','Schwierige Entscheidungen treffen','Konflikte lösen, Klarheit in Dilemma-Situationen schaffen'],
      help:['Einzelcoaching und Einzel-Supervision','Coaching zu Leadership & Managementhaltung','Training zu Kommunikation, Stimme, Präsenz und Auftritt','Workshops und Fortbildungen']},
    teams:{head:'Für Teams',lede:'Aus Spannungen wird Zusammenarbeit: Wir klären Rollen, Dynamiken und Strukturen und stärken die Leistungsfähigkeit.',
      sit:['Strukturelle Defizite erkennen und beheben','Neue Strategien entwickeln (Verantwortlichkeiten, Kommunikation, Teambildung)','Teamdynamik und Zusammenarbeit stärken','Rollen klären und abgrenzen','Strukturwechsel begleiten','Probleme in der Unternehmenskultur angehen'],
      help:['Team-Supervision zur Klärung von Dynamiken und Rollen','Team-Coaching zum Aufbau von Vertrauen und Leistungsfähigkeit','Trainings und Workshops (auch deutsch-französisch)','Ursachenanalyse mit messbaren Ergebnissen']},
    expats:{head:'Für Expats',lede:'Zwischen zwei Kulturen sicher handeln – ich kenne beide Seiten und baue Brücken.',
      sit:['Kulturelle Codes verstehen und nutzen','Entscheidungsprozesse absichern','Neue Handlungsspielräume finden','Berufliche Rolle reflektieren und weiterentwickeln'],
      help:['Interkulturelle Begleitung (Schwerpunkt deutsch-französisch)','Einzelcoaching']},
    familie:{head:'Für Familienunternehmen',lede:'Hier treffen emotionale Bindungen auf wirtschaftliche Interessen. Diese Verbindung schafft einzigartige Stärken – und kann zu großen Spannungen führen.',
      sit:['Klarheit schaffen und Spannungsfelder erkennen','Visionen entwickeln, Rollen analysieren und ausrichten','Neue Strategien entwickeln','Nachfolge- und Entscheidungsprozesse klären','Tradition und Innovation in Einklang bringen'],
      help:['Organisationsbegleitung – von der Diagnose bis zur Nachbereitung','Trainings und Workshops','Neutraler und analytischer Blick von außen']},
    orga:{head:'Für Organisationen',lede:'Veränderungsprozesse, die wirklich tragen – strukturiert von der Diagnose bis zur Nachbereitung.',
      sit:['Veränderungsprozesse anstoßen und steuern','Strukturen und Strategien nachhaltig weiterentwickeln'],
      help:['Organisationsbegleitung für nachhaltige Veränderungsprozesse','Von der Diagnose über den Aktionsplan bis zur Nachbereitung']},
    ehrenamt:{head:'Für Ehrenamt & Vereine',lede:'Ehrenamt und Hauptamt wirkungsvoll verbinden – professionell, ohne die Seele des Vereins zu verlieren.',
      sit:['Rollen und Führungsstrukturen zwischen Ehrenamt und Hauptamt klären','Professionalität stärken, ohne die Seele des Vereins zu verlieren'],
      help:['Begleitung in der Zusammenarbeit mit Hauptamtlichen','Trainings und Workshops']}
  };
  var el = { head: document.getElementById('e-head'), lede: document.getElementById('e-lede'), sit: document.getElementById('e-sit'), help: document.getElementById('e-help') };
  function li(ul, items) { ul.innerHTML = ''; items.forEach(function (x) { var l = document.createElement('li'); l.textContent = x; ul.appendChild(l); }); }
  function show(k) { var p = P[k]; if (!p) return; el.head.textContent = p.head; el.lede.textContent = p.lede; li(el.sit, p.sit); li(el.help, p.help); panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap'); }
  var tabs = document.querySelectorAll('.explore__tab');
  tabs.forEach(function (b) { b.addEventListener('click', function () { tabs.forEach(function (x) { x.setAttribute('aria-selected', 'false'); }); b.setAttribute('aria-selected', 'true'); show(b.getAttribute('data-p')); }); });
  // Deep-link ?bereich= oder #bereich
  var pre = (location.hash || '').replace('#', '') || new URLSearchParams(location.search).get('bereich');
  var startBtn = pre && document.querySelector('.explore__tab[data-p="' + pre + '"]');
  if (startBtn) { tabs.forEach(function (x) { x.setAttribute('aria-selected', 'false'); }); startBtn.setAttribute('aria-selected', 'true'); show(pre); }
  else show('fuehrung');
})();

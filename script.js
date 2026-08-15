document.addEventListener('DOMContentLoaded', function () {

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  var closeBtn = document.getElementById('navClose');

  function openMenu() {
    if (!links) return;
    links.classList.add('open');
    document.documentElement.classList.add('nav-locked');
    document.body.classList.add('nav-locked');
  }
  function closeMenu() {
    if (!links) return;
    links.classList.remove('open');
    document.documentElement.classList.remove('nav-locked');
    document.body.classList.remove('nav-locked');
  }

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      if (links.classList.contains('open')) { closeMenu(); } else { openMenu(); }
    });
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { closeMenu(); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 0.09 + 's';
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    }
  }

  /* ---------- before/after comparison slider ---------- */
  var baRange = document.getElementById('baRange');
  var baBeforeWrap = document.getElementById('baBeforeWrap');
  var baHandle = document.getElementById('baHandle');
  var baBeforeImg = document.getElementById('baBeforeImg');
  var baAfterImg = document.getElementById('baAfterImg');
  var baTabs = document.querySelectorAll('.ba-tab');

  function setBaPosition(val) {
    baBeforeWrap.style.clipPath = 'inset(0 ' + (100 - val) + '% 0 0)';
    baHandle.style.left = val + '%';
  }

  if (baRange && baBeforeWrap && baHandle) {
    setBaPosition(baRange.value);
    baRange.addEventListener('input', function () {
      setBaPosition(this.value);
    });
  }

  if (baTabs.length && baBeforeImg && baAfterImg) {
    baTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        baTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        baBeforeImg.src = tab.getAttribute('data-before');
        baAfterImg.src = tab.getAttribute('data-after');
        baRange.value = 50;
        setBaPosition(50);
      });
    });
  }

  /* ---------- form handling (demo — no backend) ---------- */
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = form.querySelector('.form-success');
      var btn = form.querySelector('button[type="submit"]');
      var originalLabel = btn ? btn.textContent : '';
      if (btn) { btn.textContent = 'Sent \u2713'; btn.disabled = true; }
      if (success) { success.classList.add('show'); }
      setTimeout(function () {
        if (btn) { btn.textContent = originalLabel; btn.disabled = false; }
        if (success) { success.classList.remove('show'); }
        form.reset();
      }, 4000);
    });
  });

});

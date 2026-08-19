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

  /* ---------- project gallery filters ---------- */
  var filters = document.querySelectorAll('.proj-filter');
  var items = Array.prototype.slice.call(document.querySelectorAll('.proj-item'));
  var emptyMsg = document.getElementById('projEmpty');

  if (filters.length && items.length) {
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-filter');
        var shown = 0;
        items.forEach(function (item) {
          var cats = item.getAttribute('data-cat') || '';
          var match = (cat === 'all') || cats.indexOf(cat) !== -1;
          item.classList.toggle('hide', !match);
          if (match) shown++;
        });
        if (emptyMsg) emptyMsg.classList.toggle('show', shown === 0);
      });
    });
  }

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCaption = document.getElementById('lbCaption');
  var lbClose = document.getElementById('lbClose');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var currentIndex = 0;

  function visibleItems() {
    return items.filter(function (it) { return !it.classList.contains('hide'); });
  }
  function showLightbox(index) {
    var vis = visibleItems();
    if (!vis.length) return;
    if (index < 0) index = vis.length - 1;
    if (index >= vis.length) index = 0;
    currentIndex = index;
    var item = vis[index];
    lbImg.src = item.getAttribute('data-full');
    lbImg.alt = item.getAttribute('data-caption') || '';
    lbCaption.textContent = item.getAttribute('data-caption') || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('nav-locked');
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-locked');
  }

  if (lightbox && items.length) {
    items.forEach(function (item) {
      item.addEventListener('click', function () {
        var vis = visibleItems();
        showLightbox(vis.indexOf(item));
      });
    });
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', function () { showLightbox(currentIndex - 1); });
    if (lbNext) lbNext.addEventListener('click', function () { showLightbox(currentIndex + 1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showLightbox(currentIndex - 1);
      if (e.key === 'ArrowRight') showLightbox(currentIndex + 1);
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

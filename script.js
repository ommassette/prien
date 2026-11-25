// Dummy-Cookie-Banner: nur Ausblenden + localStorage-Merker, keine echte Consent-Logik
(function () {
  var banner = document.getElementById('cookie');
  if (!banner) return;

  if (localStorage.getItem('cookie-choice')) {
    banner.classList.add('is-hidden');
    return;
  }

  banner.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cookie]');
    if (!btn) return;
    localStorage.setItem('cookie-choice', btn.dataset.cookie);
    banner.classList.add('is-hidden');
  });
})();

// Stimmen-Karussell
(function () {
  var viewport = document.querySelector('.review__viewport');
  if (!viewport) return;

  var slides = viewport.querySelectorAll('.review__slide');
  var prev = document.querySelector('.review__nav[data-dir="prev"]');
  var next = document.querySelector('.review__nav[data-dir="next"]');
  var i = 0;

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (slide, k) {
      slide.classList.toggle('is-active', k === i);
    });
  }

  prev.addEventListener('click', function () { show(i - 1); });
  next.addEventListener('click', function () { show(i + 1); });
})();
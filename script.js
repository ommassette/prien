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
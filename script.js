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

document.addEventListener("DOMContentLoaded", () => {
  /* 1. Cookie Banner */
  const cookieBanner = document.getElementById("cookie");
  if (cookieBanner) {
    if (localStorage.getItem("ck_cookie_consent")) {
      cookieBanner.classList.add("is-hidden");
    }
    cookieBanner.querySelectorAll("[data-cookie]").forEach((btn) => {
      btn.addEventListener("click", () => {
        localStorage.setItem("ck_cookie_consent", btn.dataset.cookie);
        cookieBanner.classList.add("is-hidden");
      });
    });
  }

  /* 2. Custom Small Pink Circle Cursor (Desktop Pointer) */
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let cursorEl = null;

  if (isFinePointer) {
    cursorEl = document.createElement("div");
    cursorEl.className = "pink-cursor";
    document.body.appendChild(cursorEl);

    document.addEventListener("mousemove", (e) => {
      cursorEl.style.left = `${e.clientX}px`;
      cursorEl.style.top = `${e.clientY}px`;
      if (!cursorEl.classList.contains("is-visible")) {
        cursorEl.classList.add("is-visible");
      }
    });

    document.addEventListener("mouseleave", () => {
      cursorEl.classList.remove("is-visible");
    });

    const interactiveTargets = document.querySelectorAll("a, button, .event__title");
    interactiveTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => cursorEl.classList.add("is-active"));
      el.addEventListener("mouseleave", () => cursorEl.classList.remove("is-active"));
    });
  }

  /* 3. Mobile / Touch Tap Ripple Micro-Interaction */
  document.addEventListener(
    "touchstart",
    (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      const pulse = document.createElement("span");
      pulse.className = "touch-pulse";
      pulse.style.left = `${touch.clientX}px`;
      pulse.style.top = `${touch.clientY}px`;
      document.body.appendChild(pulse);
      pulse.addEventListener("animationend", () => pulse.remove());
    },
    { passive: true }
  );

  /* 4. Event Title Hover Poster Preview */
  const posterPreview = document.createElement("div");
  posterPreview.className = "event-poster-preview";
  const posterImg = document.createElement("img");
  posterImg.alt = "Event Poster";
  posterPreview.appendChild(posterImg);
  document.body.appendChild(posterPreview);

  const eventTitles = document.querySelectorAll(".event__title[data-poster]");
  eventTitles.forEach((title) => {
    const src = title.getAttribute("data-poster");
    if (!src) return;

    // Preload poster smoothly
    const preload = new Image();
    preload.src = src;

    const positionPoster = (clientX, clientY) => {
      const posterWidth = 230;
      const posterHeight = 306;
      const offset = 20;

      let left = clientX + offset;
      let top = clientY + offset;

      if (left + posterWidth > window.innerWidth - 16) {
        left = clientX - posterWidth - offset;
      }
      if (top + posterHeight > window.innerHeight - 16) {
        top = Math.max(16, window.innerHeight - posterHeight - 16);
      }

      posterPreview.style.left = `${left}px`;
      posterPreview.style.top = `${top}px`;
    };

    title.addEventListener("mouseenter", (e) => {
      posterImg.src = src;
      positionPoster(e.clientX, e.clientY);
      posterPreview.classList.add("is-open");
    });

    title.addEventListener("mousemove", (e) => {
      positionPoster(e.clientX, e.clientY);
    });

    title.addEventListener("mouseleave", () => {
      posterPreview.classList.remove("is-open");
    });
  });

  /* 5. Lightweight Scroll Reveal */
  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-revealed"));
  }
});

/* 6. Mobile Hamburger Menu */
  const navEl = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav__toggle");
  const navDrawer = document.getElementById("primary-nav");

  if (navEl && navToggle && navDrawer) {
    const iconEl = navToggle.querySelector("i");

    const setMenuState = (open) => {
      navEl.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      if (iconEl) {
        iconEl.className = open ? "bi bi-x-lg" : "bi bi-list";
      }
    };

    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = !navEl.classList.contains("is-open");
      setMenuState(isOpen);
    });

    navDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("click", (e) => {
      if (navEl.classList.contains("is-open") && !navEl.contains(e.target)) {
        setMenuState(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navEl.classList.contains("is-open")) {
        setMenuState(false);
        navToggle.focus();
      }
    });
  }
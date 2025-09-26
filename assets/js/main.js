(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const langToggle = document.getElementById("langToggle");
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const stored = localStorage.getItem("theme");
  if (stored) {
    root.setAttribute("data-theme", stored);
  } else {
    root.setAttribute("data-theme", prefersDark.matches ? "dark" : "light");
  }
  function setTheme(n) {
    root.setAttribute("data-theme", n);
    localStorage.setItem("theme", n);
  }
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const c = root.getAttribute("data-theme");
      setTheme(c === "dark" ? "light" : "dark");
    });
  }
  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const o = navList.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", o);
    });
    navList.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        if (window.innerWidth < 820) {
          navList.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      })
    );
  }
  const observer = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  document
    .querySelectorAll("[data-animate]")
    .forEach((el) => observer.observe(el));
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    if (!id) return;
    const t = document.getElementById(id);
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#" + id);
    }
  });
  function applyTranslations(dict) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.innerHTML = dict[key];
    });
  }
  // Language detection (map legacy 'kr' to 'ko')
  const rawStoredLang = localStorage.getItem("lang");
  const storedLang =
    (rawStoredLang === "kr" ? "ko" : rawStoredLang) ||
    (navigator.language.startsWith("ko") ? "ko" : "en");
  function loadLang(lang) {
    if (!window.I18N) return;
    const dict = window.I18N[lang] || window.I18N.ko;
    applyTranslations(dict);
    localStorage.setItem("lang", lang);
  }
  if (langToggle) {
    langToggle.removeAttribute("disabled");
    langToggle.style.opacity = "";
    langToggle.style.cursor = "";
    langToggle.title = "언어 전환";
    langToggle.textContent = storedLang === "ko" ? "KO/EN" : "EN/KO";
    langToggle.addEventListener("click", () => {
      const current = localStorage.getItem("lang") || storedLang;
      const next = current === "ko" ? "en" : "ko";
      loadLang(next);
      langToggle.textContent = next === "ko" ? "KO/EN" : "EN/KO";
    });
  }
  // If i18n already loaded (event fired before listener attached), apply immediately
  if (window.I18N) {
    loadLang(storedLang);
  } else {
    window.addEventListener("I18N_READY", () => loadLang(storedLang));
  }

  // Dynamic experience switching using i18n key prefixes
  const expPanel = document.querySelector("[data-company-panel]");
  const logos = document.querySelectorAll(".experience-logos .company-logo");
  function swapCompany(company) {
    if (!window.I18N) return;
    const langStored = localStorage.getItem("lang");
    const lang = (langStored === "kr" ? "ko" : langStored) || "ko";
    const dict = window.I18N[lang] || {};
    const prefix = company === "xitst" ? "exp.current" : `exp.${company}`;
    const mapping = {
      role: prefix,
      period: `${prefix}.period`,
      summary: `${prefix}.summary`,
      b1: `${prefix}.b1`,
      b2: `${prefix}.b2`,
      b3: `${prefix}.b3`,
      b4: `${prefix}.b4`,
    };
    Object.entries(mapping).forEach(([cls, key]) => {
      const sel =
        cls === "role"
          ? ".current-role"
          : cls === "period"
          ? '[data-i18n*="period"]'
          : cls === "summary"
          ? ".current-summary"
          : `[data-i18n$=".${cls}"]`;
      const el = expPanel.querySelector(sel);
      if (el && dict[key]) {
        el.setAttribute("data-i18n", key);
        el.innerHTML = dict[key];
      } else if (el && !dict[key]) {
        // blank if key not present for non-current companies
        if (company !== "xitst") el.innerHTML = "";
      }
    });
  }
  logos.forEach((logo) => {
    logo.setAttribute("tabindex", "0");
    logo.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        logo.click();
      }
    });
    logo.addEventListener("click", () => {
      if (logo.classList.contains("active")) return;
      logos.forEach((l) => l.classList.remove("active"));
      logo.classList.add("active");
      const company = logo.getAttribute("data-company");
      swapCompany(company);
    });
  });
  // ensure initial load populates panel after i18n load (with fallback)
  function initExp() {
    swapCompany("xitst");
  }
  if (window.I18N) {
    initExp();
  } else {
    window.addEventListener("I18N_READY", initExp);
  }
})();

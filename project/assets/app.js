/* Orange True Solution — interactions */
(function () {
  "use strict";
  var LANG_KEY = "ots_lang";

  /* ---------- i18n ---------- */
  function applyLang(lang, persist) {
    var dict = window.I18N[lang] || window.I18N.en;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
    });
    // toggle active states
    document.querySelectorAll("[data-setlang]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-setlang") === lang);
    });
    if (persist) { try { localStorage.setItem(LANG_KEY, lang); } catch (e) {} }
    window.__lang = lang;
  }

  /* ---------- Welcome overlay ---------- */
  function closeWelcome(lang) {
    applyLang(lang, true);
    var w = document.getElementById("welcome");
    w.classList.add("is-hidden");
    document.body.classList.remove("no-scroll");
    setTimeout(function () { w.style.display = "none"; }, 700);
  }

  function startHero() {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    // Reveal after a painted frame so the transition animates (normal browsers)…
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { hero.classList.add("ready"); });
    });
    // …and guarantee the visible state even if rAF is throttled / never commits.
    setTimeout(function () { hero.classList.add("ready"); }, 400);
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var stored = null;
    try { stored = localStorage.getItem(LANG_KEY); } catch (e) {}

    if (stored && window.I18N[stored]) {
      applyLang(stored, false);
      var w = document.getElementById("welcome");
      w.classList.add("is-hidden");
      w.style.display = "none";
      document.body.classList.remove("no-scroll");
    } else {
      applyLang("en", false); // base text under overlay
      document.body.classList.add("no-scroll");
    }
    startHero();

    // welcome buttons
    document.querySelectorAll("[data-welcome-lang]").forEach(function (b) {
      b.addEventListener("click", function () { closeWelcome(b.getAttribute("data-welcome-lang")); });
    });

    // language toggles (nav + sheet)
    document.querySelectorAll("[data-setlang]").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.getAttribute("data-setlang"), true); });
    });

    /* nav scroll state */
    var nav = document.querySelector(".nav");
    function onScroll() {
      if (window.scrollY > 40) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* mobile sheet */
    var sheet = document.getElementById("sheet");
    var backdrop = document.getElementById("sheet-backdrop");
    function openSheet() { sheet.classList.add("open"); backdrop.classList.add("open"); document.body.classList.add("no-scroll"); }
    function closeSheet() { sheet.classList.remove("open"); backdrop.classList.remove("open"); document.body.classList.remove("no-scroll"); }
    var burger = document.getElementById("burger");
    if (burger) burger.addEventListener("click", openSheet);
    var sclose = document.getElementById("sheet-close");
    if (sclose) sclose.addEventListener("click", closeSheet);
    if (backdrop) backdrop.addEventListener("click", closeSheet);
    sheet && sheet.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeSheet); });

    /* tabs */
    var tabs = document.querySelectorAll(".tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-tab");
        tabs.forEach(function (t) { t.classList.toggle("active", t === tab); });
        document.querySelectorAll(".tab-panel").forEach(function (p) {
          p.classList.toggle("active", p.getAttribute("data-panel") === target);
        });
      });
    });

    /* scroll reveal */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

    /* lazy video: load + play only while near/in viewport, pause otherwise */
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (!v.getAttribute("src") && v.dataset.src) v.src = v.dataset.src;
          var p = v.play(); if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25, rootMargin: "200px 0px" });
    document.querySelectorAll("video[data-lazy]").forEach(function (v) { vio.observe(v); });

    /* video-background sections: zoom-settle as they scroll into view */
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("bg-in"); sio.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".section--video, .about-bg").forEach(function (s) { sio.observe(s); });

    /* section dissolve — overlay fades out on enter, fades back in on exit */
    var dio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-dissolve-in");
        } else {
          e.target.classList.remove("is-dissolve-in");
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll("#about, #services, #reviews, #contact").forEach(function (s) { dio.observe(s); });

    /* contact form role toggle */
    var form = document.getElementById("contact-form");
    function setRole(role) {
      if (!form) return;
      form.classList.toggle("role-company", role === "company");
      form.classList.toggle("role-worker", role === "worker");
    }
    document.querySelectorAll("[name='iam']").forEach(function (r) {
      r.addEventListener("change", function () { if (r.checked) setRole(r.value); });
    });
    var checked = document.querySelector("[name='iam']:checked");
    setRole(checked ? checked.value : "company");

    /* form submit -> email via FormSubmit, then redirect to Thank You page */
    if (form) {
      var ENDPOINT = "https://formsubmit.co/ajax/info@orangetruesolution.com";
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        var dict = window.I18N[window.__lang] || window.I18N.en;
        var btn = form.querySelector("button[type='submit']");
        var role = (document.querySelector("[name='iam']:checked") || { value: "company" }).value;
        function get(n) { var f = form.querySelector("[name='" + n + "']"); return f ? String(f.value || "").trim() : ""; }
        var fd = new FormData();
        fd.append("_subject", "New website contact — Orange True Solution");
        fd.append("_template", "table");
        fd.append("_captcha", "false");
        fd.append("Type", role === "company" ? "Company requesting staffing services" : "Person offering services / job seeker");
        fd.append("Name", get("name"));
        if (role === "company") {
          fd.append("Company", get("company"));
          fd.append("Workers needed", get("workers"));
        } else {
          fd.append("Desired role", get("role"));
        }
        fd.append("Email", get("email"));
        fd.append("Phone", get("phone"));
        fd.append("Industry", get("industry"));
        fd.append("Message", get("message"));
        fd.append("Language", window.__lang === "es" ? "Español" : "English");
        // Single-line, pipe-delimited payload so Power Automate (→ Excel, M365)
        // can split all fields in one step. Order matches the Excel table columns.
        function clean1(s) { return String(s || "").replace(/[\r\n|]+/g, " ").trim(); }
        var record = [
          role === "company" ? "Company requesting staffing services" : "Person offering services / job seeker",
          get("name"),
          role === "company" ? get("company") : "",
          role === "company" ? "" : get("role"),
          get("email"),
          get("phone"),
          get("industry"),
          role === "company" ? get("workers") : "",
          get("message"),
          window.__lang === "es" ? "Español" : "English"
        ].map(clean1).join(" ||| ");
        fd.append("Record", record);
        btn.disabled = true;
        btn.textContent = dict["contact.form.sending"] || "Sending…";
        function goThanks() { window.location.href = "/thank-you?lang=" + (window.__lang || "en"); }
        function restoreBtn() { btn.disabled = false; btn.textContent = dict["contact.form.submit"] || "Send Message"; }
        fetch(ENDPOINT, { method: "POST", body: fd, headers: { "Accept": "application/json" } })
          .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
          .then(function (data) {
            if (data.success === "true" || data.success === true) { goThanks(); } else { restoreBtn(); }
          })
          .catch(goThanks);
      });
    }
  });
})();
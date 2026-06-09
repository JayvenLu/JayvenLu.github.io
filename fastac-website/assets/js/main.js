const header = document.querySelector("[data-header]");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const copyCitation = document.querySelector("#copy-citation");
const bibtex = document.querySelector("#bibtex");
const copyStatus = document.querySelector("#copy-status");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav?.classList.toggle("is-open", !open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle?.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  });
});

copyCitation?.addEventListener("click", async () => {
  const text = bibtex?.innerText.trim();

  if (!text) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    if (copyStatus) {
      copyStatus.textContent = "BibTeX copied.";
    }
  } catch {
    if (copyStatus) {
      copyStatus.textContent = "Select the BibTeX text to copy it.";
    }
  }
});

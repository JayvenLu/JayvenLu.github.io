const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
const defaultTab = "about";

function knownTab(tabName) {
  return tabs.some((tab) => tab.dataset.tab === tabName);
}

function tabFromHash() {
  const tabName = window.location.hash.slice(1);
  return knownTab(tabName) ? tabName : defaultTab;
}

function activateTab(tabName, { updateHistory = false, focus = false } = {}) {
  const nextTab = knownTab(tabName) ? tabName : defaultTab;

  tabs.forEach((tab) => {
    const selected = tab.dataset.tab === nextTab;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) {
      tab.focus();
    }
  });

  panels.forEach((panel) => {
    panel.hidden = panel.id !== nextTab;
  });

  if (updateHistory) {
    const nextHash = `#${nextTab}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState({ tab: nextTab }, "", nextHash);
    }
  }

  document.title = `${nextTab[0].toUpperCase()}${nextTab.slice(1)} | Xiaofan Lu`;
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    activateTab(tab.dataset.tab, { updateHistory: true });
  });

  tab.addEventListener("keydown", (event) => {
    let nextIndex = null;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      activateTab(tabs[nextIndex].dataset.tab, { updateHistory: true, focus: true });
    }
  });
});

window.addEventListener("popstate", () => {
  activateTab(tabFromHash());
});

window.addEventListener("hashchange", () => {
  activateTab(tabFromHash());
});

const copyButton = document.querySelector("#copy-email");
const emailAddress = document.querySelector("#email-address");
const copyStatus = document.querySelector("#copy-status");

if (copyButton && emailAddress && copyStatus) {
  copyButton.addEventListener("click", async () => {
    const email = emailAddress.textContent.trim();

    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = "Copied";
      copyStatus.textContent = "Email address copied to clipboard.";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(emailAddress);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      copyButton.textContent = "Selected";
      copyStatus.textContent = "Email address selected. Use your system copy command.";
    }

    window.setTimeout(() => {
      copyButton.textContent = "Copy";
      copyStatus.textContent = "";
    }, 2000);
  });
}

const year = document.querySelector("#current-year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

activateTab(tabFromHash());

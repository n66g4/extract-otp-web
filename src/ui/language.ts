/**
 * Language switcher UI component.
 * Provides a language selection dropdown in the footer.
 */

import { $ } from "./dom";
import { setLanguage, getLanguage, Language } from "../services/i18n";
import { setState } from "../state/store";

/**
 * Initializes the language switcher component.
 */
export function initLanguageSwitcher(): void {
  // Create language switcher button similar to theme switcher
  const footer = document.querySelector("footer .footer-content");
  if (!footer) return;

  // Check if language switcher already exists
  if (document.querySelector("#language-switcher-wrapper")) return;

  const languageSwitcherWrapper = document.createElement("div");
  languageSwitcherWrapper.id = "language-switcher-wrapper";
  languageSwitcherWrapper.className = "language-switcher-wrapper navigable";
  languageSwitcherWrapper.setAttribute("role", "button");
  languageSwitcherWrapper.setAttribute("tabindex", "0");
  languageSwitcherWrapper.setAttribute("aria-haspopup", "true");
  languageSwitcherWrapper.setAttribute("aria-expanded", "false");

  const hiddenLabel = document.createElement("span");
  hiddenLabel.className = "visually-hidden";
  hiddenLabel.textContent = "Open language switcher";
  languageSwitcherWrapper.appendChild(hiddenLabel);

  const languageSwitcher = document.createElement("div");
  languageSwitcher.className = "language-switcher";
  languageSwitcher.setAttribute("role", "menu");

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "zh-CN", label: "中文", flag: "🇨🇳" },
  ];

  languages.forEach((lang) => {
    const button = document.createElement("button");
    button.className = "navigable";
    button.setAttribute("data-lang", lang.code);
    button.setAttribute("role", "menuitemradio");
    button.setAttribute("aria-checked", getLanguage() === lang.code ? "true" : "false");
    if (getLanguage() === lang.code) {
      button.classList.add("active");
    }
    const flagSpan = document.createElement("span");
    flagSpan.textContent = lang.flag;
    const labelSpan = document.createElement("span");
    labelSpan.className = "visually-hidden";
    labelSpan.textContent = lang.label;
    button.appendChild(flagSpan);
    button.appendChild(labelSpan);
    button.addEventListener("click", () => {
      switchLanguage(lang.code);
      closeLanguageSwitcher();
    });
    languageSwitcher.appendChild(button);
  });

  languageSwitcherWrapper.appendChild(languageSwitcher);

  // Insert before theme switcher
  const themeSwitcher = footer.querySelector("#theme-switcher-wrapper");
  if (themeSwitcher) {
    footer.insertBefore(languageSwitcherWrapper, themeSwitcher);
  } else {
    footer.appendChild(languageSwitcherWrapper);
  }

  // Toggle menu on click
  languageSwitcherWrapper.addEventListener("click", (e) => {
    e.stopPropagation();
    const isExpanded = languageSwitcherWrapper.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeLanguageSwitcher();
    } else {
      openLanguageSwitcher();
    }
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!languageSwitcherWrapper.contains(e.target as Node)) {
      closeLanguageSwitcher();
    }
  });

  // Keyboard navigation
  languageSwitcherWrapper.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const isExpanded = languageSwitcherWrapper.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        closeLanguageSwitcher();
      } else {
        openLanguageSwitcher();
      }
    } else if (e.key === "Escape") {
      closeLanguageSwitcher();
    }
  });

  // Update initial state
  updateLanguageSwitcherState();
}

/**
 * Opens the language switcher menu.
 */
function openLanguageSwitcher(): void {
  const wrapper = document.querySelector("#language-switcher-wrapper");
  if (!wrapper) return;
  wrapper.setAttribute("aria-expanded", "true");
  wrapper.classList.add("active");
}

/**
 * Closes the language switcher menu.
 */
function closeLanguageSwitcher(): void {
  const wrapper = document.querySelector("#language-switcher-wrapper");
  if (!wrapper) return;
  wrapper.setAttribute("aria-expanded", "false");
  wrapper.classList.remove("active");
}

/**
 * Switches the application language.
 */
function switchLanguage(lang: Language): void {
  setLanguage(lang);
  setState(() => ({ language: lang }));
  updateLanguageSwitcherState();
  // Update all UI texts - dynamically import to avoid circular dependency
  import("../main").then((module) => {
    if (module.updateUITexts) {
      module.updateUITexts();
    }
  });
  // Trigger re-render of results to update card labels
  const { getState } = require("../state/store");
  const state = getState();
  if (state.otps.length > 0) {
    // Force a re-render by updating state
    setState((s) => ({ ...s }));
  }
}

/**
 * Updates the language switcher button states.
 */
function updateLanguageSwitcherState(): void {
  const currentLang = getLanguage();
  const buttons = document.querySelectorAll("#language-switcher-wrapper [data-lang]");
  buttons.forEach((btn) => {
    const lang = btn.getAttribute("data-lang");
    btn.setAttribute("aria-checked", lang === currentLang ? "true" : "false");
    btn.classList.toggle("active", lang === currentLang);
  });
}


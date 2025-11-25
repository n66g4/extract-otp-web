/**
 * This is the main entry point for the application.
 * It is responsible for initializing all the different UI components and services,
 * setting up global event listeners, and orchestrating the application startup.
 */

import { Buffer } from "buffer"; // Keep for browser environment polyfill
import { initResults } from "./ui/results";
import { initFileInput } from "./ui/fileInput";
import { initCamera } from "./ui/camera";
import { initQrModal } from "./ui/qrModal";
import { initThemeSwitcher } from "./ui/theme";
import { initExportControls } from "./ui/exportControls";
import { initNavigation } from "./ui/navigation";
import { initFooter } from "./ui/footer";
import { initTabs } from "./ui/tabs";
import { initAccordion } from "./ui/accordion";
import { displayError, announceToScreenReader } from "./ui/notifications";
import { logger } from "./services/logger";
import { initLanguage, setLanguage } from "./services/i18n";
import { setState } from "./state/store";
import { initLanguageSwitcher } from "./ui/language";

window.Buffer = Buffer; // Make Buffer globally available for libraries that might need it.

/**
 * Sets up global error handlers to catch unhandled exceptions and promise
 * rejections, providing a user-friendly error message.
 */
function setupGlobalErrorHandling(): void {
  window.addEventListener("error", (event) => {
    logger.error("Uncaught error:", event.error);
    displayError(require("./services/i18n").t("messages.unexpectedError"));
  });

  window.addEventListener("unhandledrejection", (event) => {
    logger.error("Unhandled promise rejection:", event.reason);
    displayError(require("./services/i18n").t("messages.unexpectedError"));
  });
}

/**
 * Initializes the application by setting up all event listeners.
 * This function is called once the DOM is fully loaded.
 */
function initializeApp(): void {
  // Initialize language first, then sync with state
  initLanguage();
  setState(() => ({ language: require("./services/i18n").getLanguage() }));
  
  // Listen for language changes
  window.addEventListener("languagechange", ((event: CustomEvent) => {
    setState(() => ({ language: event.detail }));
    // Re-render UI with new language
    updateUITexts();
  }) as EventListener);
  
  setupGlobalErrorHandling();
  initNavigation();
  initTabs();
  initAccordion();
  initQrModal();
  initResults();
  initFileInput();
  initCamera();
  initThemeSwitcher();
  initExportControls();
  initFooter();
  initLanguageSwitcher();
  updateUITexts();
}

/**
 * Updates all UI texts based on current language.
 * Exported so it can be called from other modules.
 */
export function updateUITexts(): void {
  const { t } = require("./services/i18n");
  
  // Update main title
  const title = document.querySelector("h1");
  if (title) title.textContent = t("main.title");
  
  // Update file input labels
  const selectLabel = document.querySelector(".label-idle");
  if (selectLabel) {
    const icon = selectLabel.querySelector("i");
    selectLabel.innerHTML = icon ? `<i class="${icon.className}"></i> ${t("main.selectImages")}` : t("main.selectImages");
  }
  
  const processingLabel = document.querySelector(".label-processing");
  if (processingLabel) {
    const icon = processingLabel.querySelector("i");
    processingLabel.innerHTML = icon ? `<i class="${icon.className}"></i> ${t("common.processing")}` : t("common.processing");
  }
  
  // Update scan button
  const scanButton = document.querySelector("#take-photo-button");
  if (scanButton) {
    const icon = scanButton.querySelector("i");
    scanButton.innerHTML = icon ? `<i class="${icon.className}"></i> ${t("main.scanQrCode")}` : t("main.scanQrCode");
  }
  
  // Update drag and drop text
  const dropText = document.querySelector(".drop-text");
  if (dropText) dropText.textContent = t("main.dragAndDrop");
  
  // Update results container aria-label
  const resultsContainer = document.querySelector("#results-container");
  if (resultsContainer) resultsContainer.setAttribute("aria-label", t("main.extractedAccounts"));
  
  // Update button texts
  const selectAllBtn = document.querySelector("#select-all-button");
  if (selectAllBtn) selectAllBtn.textContent = t("buttons.selectAll");
  
  const selectNoneBtn = document.querySelector("#deselect-all-button");
  if (selectNoneBtn) selectNoneBtn.textContent = t("buttons.selectNone");
  
  const resetBtn = document.querySelector("#clear-all-button");
  if (resetBtn) {
    const icon = resetBtn.querySelector("i");
    resetBtn.innerHTML = icon ? `<i class="${icon.className}"></i> ${t("buttons.reset")}` : t("buttons.reset");
  }
  
  const csvBtn = document.querySelector("#download-csv-button");
  if (csvBtn) {
    const icon = csvBtn.querySelector("i");
    csvBtn.innerHTML = icon ? `<i class="${icon.className}"></i> ${t("buttons.saveAsCsv")}` : t("buttons.saveAsCsv");
  }
  
  const jsonBtn = document.querySelector("#download-json-button");
  if (jsonBtn) {
    const icon = jsonBtn.querySelector("i");
    jsonBtn.innerHTML = icon ? `<i class="${icon.className}"></i> ${t("buttons.saveAsJson")}` : t("buttons.saveAsJson");
  }
  
  const googleBtn = document.querySelector("#export-google-button");
  if (googleBtn) {
    const icon = googleBtn.querySelector("i");
    googleBtn.innerHTML = icon ? `<i class="${icon.className}"></i> ${t("buttons.exportToGoogle")}` : t("buttons.exportToGoogle");
  }
  
  const lastPassBtn = document.querySelector("#export-lastpass-button");
  if (lastPassBtn) {
    const icon = lastPassBtn.querySelector("i");
    lastPassBtn.innerHTML = icon ? `<i class="${icon.className}"></i> ${t("buttons.exportToLastPass")}` : t("buttons.exportToLastPass");
  }
  
  // Update template card labels in HTML
  updateCardTemplate();
}

/**
 * Updates the card template labels in the HTML.
 */
function updateCardTemplate(): void {
  const { t } = require("./services/i18n");
  const template = document.querySelector("#otp-card-template");
  if (!template) return;
  
  const labels = template.querySelectorAll(".label");
  labels.forEach((label) => {
    const text = label.textContent || "";
    if (text.includes("Name:")) label.textContent = t("common.name");
    else if (text.includes("Issuer:")) label.textContent = t("common.issuer");
    else if (text.includes("Type:")) label.textContent = t("common.type");
    else if (text.includes("Counter:")) label.textContent = t("common.counter");
    else if (text.includes("Secret:")) label.textContent = t("common.secret");
    else if (text.includes("URL:")) label.textContent = t("common.url");
    else if (text.includes("QR:")) label.textContent = t("common.qr");
  });
  
  // Update copy button labels
  const secretCopyBtn = template.querySelector(".secret-container .copy-button .visually-hidden");
  if (secretCopyBtn) secretCopyBtn.textContent = t("buttons.copySecret");
  const urlCopyBtn = template.querySelector(".otp-url-container .copy-button .visually-hidden");
  if (urlCopyBtn) urlCopyBtn.textContent = t("buttons.copyUrl");
  
  // Update help text
  const helpText = template.querySelector(".card-actions-help");
  if (helpText) helpText.textContent = t("cardActions.pressToCopy");
  
  // Update QR hint
  const qrHint = template.querySelector(".qr-enlarge-hint");
  if (qrHint) qrHint.textContent = t("buttons.tapToEnlarge");
  
  // Update QR button label
  const qrLabel = template.querySelector(".qr-code-container .visually-hidden");
  if (qrLabel) qrLabel.textContent = t("buttons.showLargerQr");
}

// Initialize the application once the DOM is ready.
document.addEventListener("DOMContentLoaded", initializeApp);

/**
 * Internationalization (i18n) module for managing translations.
 * Supports English and Chinese (Simplified).
 */

export type Language = "en" | "zh-CN";

export interface Translations {
  // Common
  common: {
    notAvailable: string;
    processing: string;
    close: string;
    select: string;
    selected: string;
    of: string;
    name: string;
    issuer: string;
    type: string;
    counter: string;
    secret: string;
    url: string;
    qr: string;
  };

  // Main page
  main: {
    title: string;
    selectImages: string;
    scanQrCode: string;
    dragAndDrop: string;
    extractedAccounts: string;
  };

  // Tabs
  tabs: {
    what: string;
    howToUse: string;
    faq: string;
  };

  // Tab content
  tabContent: {
    whatDescription: string;
    whatDescriptionBold: string;
    howToUseDescription: string;
    exportFromGoogle: string;
    exportFromLastPass: string;
    extractSecrets: string;
    useSecrets: string;
  };

  // FAQ
  faq: {
    whyNeeded: string;
    howItWorks: string;
    isItSafe: string;
    whyNoOriginalQr: string;
    whyNo1PasswordImport: string;
    lastpassQrWontScan: string;
    whoMadeThis: string;
    acknowledgements: string;
  };

  // Buttons
  buttons: {
    selectAll: string;
    selectNone: string;
    reset: string;
    saveAsCsv: string;
    saveAsJson: string;
    exportToGoogle: string;
    exportToLastPass: string;
    copySecret: string;
    copyUrl: string;
    showLargerQr: string;
    tapToEnlarge: string;
  };

  // Messages
  messages: {
    noQrCodeFound: string;
    noOtpSecretsFound: string;
    unsupportedFileType: string;
    unknownError: string;
    unexpectedError: string;
    noAccountsSelected: string;
    cameraNotSupported: string;
    couldNotAccessCamera: string;
    qrCodeFound: string;
    duplicateAccount: string;
    accountAdded: string;
    lastPassOnlyTotp: string;
    lastPassIncompatibleRemoved: string;
    clickAgainToContinue: string;
  };

  // Card actions
  cardActions: {
    pressToCopy: string;
  };

  // Export titles
  exportTitles: {
    scanWithGoogle: string;
    scanWithLastPass: string;
  };

  // File processing
  fileProcessing: {
    errorProcessingFile: string;
    errorProcessingFiles: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    common: {
      notAvailable: "Not available",
      processing: "Processing...",
      close: "Close",
      select: "Select",
      selected: "selected",
      of: "of",
      name: "Name:",
      issuer: "Issuer:",
      type: "Type:",
      counter: "Counter:",
      secret: "Secret:",
      url: "URL:",
      qr: "QR:",
    },
    main: {
      title: "One-Time Password Secret Extractor",
      selectImages: "Select Image(s)",
      scanQrCode: "Scan QR Code",
      dragAndDrop: "or drag and drop files here",
      extractedAccounts: "Extracted OTP Accounts",
    },
    tabs: {
      what: "What is this?",
      howToUse: "How do I use it?",
      faq: "FAQ",
    },
    tabContent: {
      whatDescription:
        "This tool extracts One-Time Password secrets from the Google Authenticator or LastPass Authenticator apps. There is no software to install, and no data ever leaves your device.",
      whatDescriptionBold:
        "All processing of your QR codes and secrets happens entirely offline, locally, right here in your browser.",
      howToUseDescription:
        "This tool reads QR codes from Google Authenticator or LastPass Authenticator's export feature and gives you back the original secret for each account. You can then use these secrets to import your accounts into any other authenticator app.",
      exportFromGoogle: "Export from Google Authenticator",
      exportFromLastPass: "Export from LastPass",
      extractSecrets: "Extract Secrets",
      useSecrets: "Use Your Secrets",
    },
    faq: {
      whyNeeded: "Why is this needed?",
      howItWorks: "How does it work?",
      isItSafe: 'Is it safe to "upload" my QR codes?',
      whyNoOriginalQr: "Why doesn't Google Authenticator show my original QR codes?",
      whyNo1PasswordImport: "Why can't 1Password import from Google Authenticator?",
      lastpassQrWontScan: "My LastPass QR code won't scan!",
      whoMadeThis: "Who made this?",
      acknowledgements: "Acknowledgements",
    },
    buttons: {
      selectAll: "Select All",
      selectNone: "Select None",
      reset: "Reset",
      saveAsCsv: "Save as CSV",
      saveAsJson: "Save as JSON",
      exportToGoogle: "Export to Google",
      exportToLastPass: "Export to LastPass",
      copySecret: "Copy secret",
      copyUrl: "Copy URL",
      showLargerQr: "Show larger QR code",
      tapToEnlarge: "Tap to enlarge",
    },
    messages: {
      noQrCodeFound: "No QR code found.",
      noOtpSecretsFound: "No OTP secrets found.",
      unsupportedFileType: "Unsupported file type.",
      unknownError: "An unknown error occurred.",
      unexpectedError:
        "An unexpected error occurred. Please try again or refresh the page.",
      noAccountsSelected: "No accounts selected to export.",
      cameraNotSupported:
        "Sorry, your browser doesn't support accessing the camera.",
      couldNotAccessCamera: "Could not access the camera.",
      qrCodeFound: "QR code found and processed.",
      duplicateAccount: "Duplicate account",
      accountAdded: "account added",
      lastPassOnlyTotp: "LastPass only supports time-based (TOTP) accounts.",
      lastPassIncompatibleRemoved:
        "incompatible counter-based account removed from your selection.",
      clickAgainToContinue: 'Click "Export to LastPass" again to continue.',
    },
    cardActions: {
      pressToCopy: "Press Enter or Space to copy.",
    },
    exportTitles: {
      scanWithGoogle: "Scan with Google Authenticator",
      scanWithLastPass: "Scan with LastPass Authenticator",
    },
    fileProcessing: {
      errorProcessingFile: "Error processing file",
      errorProcessingFiles: "An unexpected error occurred while processing files.",
    },
  },
  "zh-CN": {
    common: {
      notAvailable: "不可用",
      processing: "处理中...",
      close: "关闭",
      select: "选择",
      selected: "已选择",
      of: "/",
      name: "名称：",
      issuer: "发行方：",
      type: "类型：",
      counter: "计数器：",
      secret: "密钥：",
      url: "URL：",
      qr: "二维码：",
    },
    main: {
      title: "一次性密码密钥提取器",
      selectImages: "选择图片",
      scanQrCode: "扫描二维码",
      dragAndDrop: "或拖放文件到此处",
      extractedAccounts: "已提取的OTP账户",
    },
    tabs: {
      what: "这是什么？",
      howToUse: "如何使用？",
      faq: "常见问题",
    },
    tabContent: {
      whatDescription:
        "此工具可从 Google Authenticator 或 LastPass Authenticator 应用中提取一次性密码密钥。无需安装软件，数据不会离开您的设备。",
      whatDescriptionBold:
        "所有二维码和密钥的处理完全在您的浏览器中离线本地进行。",
      howToUseDescription:
        "此工具读取 Google Authenticator 或 LastPass Authenticator 导出功能中的二维码，并返回每个账户的原始密钥。然后您可以使用这些密钥将账户导入到任何其他认证器应用中。",
      exportFromGoogle: "从 Google Authenticator 导出",
      exportFromLastPass: "从 LastPass 导出",
      extractSecrets: "提取密钥",
      useSecrets: "使用您的密钥",
    },
    faq: {
      whyNeeded: "为什么需要这个？",
      howItWorks: "它是如何工作的？",
      isItSafe: "上传我的二维码安全吗？",
      whyNoOriginalQr: "为什么 Google Authenticator 不显示我的原始二维码？",
      whyNo1PasswordImport: "为什么 1Password 无法从 Google Authenticator 导入？",
      lastpassQrWontScan: "我的 LastPass 二维码无法扫描！",
      whoMadeThis: "这是谁制作的？",
      acknowledgements: "致谢",
    },
    buttons: {
      selectAll: "全选",
      selectNone: "全不选",
      reset: "重置",
      saveAsCsv: "保存为 CSV",
      saveAsJson: "保存为 JSON",
      exportToGoogle: "导出到 Google",
      exportToLastPass: "导出到 LastPass",
      copySecret: "复制密钥",
      copyUrl: "复制 URL",
      showLargerQr: "显示更大的二维码",
      tapToEnlarge: "点击放大",
    },
    messages: {
      noQrCodeFound: "未找到二维码。",
      noOtpSecretsFound: "未找到 OTP 密钥。",
      unsupportedFileType: "不支持的文件类型。",
      unknownError: "发生未知错误。",
      unexpectedError: "发生意外错误。请重试或刷新页面。",
      noAccountsSelected: "未选择要导出的账户。",
      cameraNotSupported: "抱歉，您的浏览器不支持访问摄像头。",
      couldNotAccessCamera: "无法访问摄像头。",
      qrCodeFound: "已找到并处理二维码。",
      duplicateAccount: "重复账户",
      accountAdded: "个账户已添加",
      lastPassOnlyTotp: "LastPass 仅支持基于时间（TOTP）的账户。",
      lastPassIncompatibleRemoved: "个不兼容的基于计数器的账户已从您的选择中移除。",
      clickAgainToContinue: '再次点击"导出到 LastPass"以继续。',
    },
    cardActions: {
      pressToCopy: "按 Enter 或 Space 键复制。",
    },
    exportTitles: {
      scanWithGoogle: "使用 Google Authenticator 扫描",
      scanWithLastPass: "使用 LastPass Authenticator 扫描",
    },
    fileProcessing: {
      errorProcessingFile: "处理文件时出错",
      errorProcessingFiles: "处理文件时发生意外错误。",
    },
  },
};

let currentLanguage: Language = "en";

/**
 * Gets the current language.
 */
export function getLanguage(): Language {
  return currentLanguage;
}

/**
 * Sets the current language and stores it in localStorage.
 */
export function setLanguage(lang: Language): void {
  currentLanguage = lang;
  localStorage.setItem("language", lang);
  // Trigger a custom event so components can react to language changes
  window.dispatchEvent(new CustomEvent("languagechange", { detail: lang }));
}

/**
 * Initializes the language from localStorage or browser settings.
 */
export function initLanguage(): void {
  const saved = localStorage.getItem("language") as Language | null;
  if (saved && (saved === "en" || saved === "zh-CN")) {
    currentLanguage = saved;
  } else {
    // Try to detect browser language
    const browserLang = navigator.language || navigator.languages?.[0] || "en";
    if (browserLang.startsWith("zh")) {
      currentLanguage = "zh-CN";
    } else {
      currentLanguage = "en";
    }
  }
  setLanguage(currentLanguage);
}

/**
 * Gets a translated string by key path.
 * @param keyPath Dot-separated path to the translation key (e.g., "buttons.selectAll")
 */
export function t(keyPath: string): string {
  const keys = keyPath.split(".");
  let value: any = translations[currentLanguage];

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      console.warn(`Translation key not found: ${keyPath}`);
      return keyPath;
    }
  }

  return typeof value === "string" ? value : keyPath;
}

/**
 * Gets all translations for the current language.
 */
export function getTranslations(): Translations {
  return translations[currentLanguage];
}


type CloseCallback = () => void;

let activeModalCloseCallback: CloseCallback | null = null;
let activeModalElement: HTMLElement | null = null;

function handleEscapeKey(event: KeyboardEvent) {
  if (event.key === 'Escape' && activeModalCloseCallback) {
    event.preventDefault(); // Prevent default browser behavior for Escape key
    activeModalCloseCallback();
  }
}

function handleTabKey(event: KeyboardEvent) {
  if (event.key === 'Tab' && activeModalElement) {
    event.preventDefault(); // ALWAYS prevent default tab behavior if a modal is active

    const focusableElements = Array.from(
      activeModalElement.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hidden && el.offsetParent !== null); // Filter out hidden or non-rendered elements

    if (focusableElements.length === 0) {
      // If no focusable elements, just prevent default and do nothing
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const currentFocusedIndex = focusableElements.indexOf(
      document.activeElement as HTMLElement
    );

    if (event.shiftKey) {
      // Shift + Tab
      if (currentFocusedIndex === 0 || currentFocusedIndex === -1) {
        // If currently on first element or outside modal
        lastElement.focus();
      } else {
        focusableElements[currentFocusedIndex - 1].focus();
      }
    } else {
      // Tab
      if (
        currentFocusedIndex === focusableElements.length - 1 ||
        currentFocusedIndex === -1
      ) {
        // If currently on last element or outside modal
        firstElement.focus();
      } else {
        focusableElements[currentFocusedIndex + 1].focus();
      }
    }
  }
}

// Event listener for clicking outside the modal content
function handleBackdropClick(event: MouseEvent) {
  if (
    activeModalElement &&
    event.target === activeModalElement &&
    activeModalCloseCallback
  ) {
    activeModalCloseCallback();
  }
}

// Event listener for the modal close button
let modalCloseButtonListener: (() => void) | null = null;

export function openModal(
  modalElement: HTMLElement,
  onClose: CloseCallback,
  openedByKeyboard = false
) {
  document.body.classList.add('modal-open');
  modalElement.classList.add('active');
  modalElement.classList.add('navigable-section');
  activeModalCloseCallback = onClose;
  activeModalElement = modalElement;

  document.addEventListener('keydown', handleEscapeKey);
  document.addEventListener('keydown', handleTabKey);
  modalElement.addEventListener('mousedown', handleBackdropClick);

  const modalCloseButton =
    modalElement.querySelector<HTMLButtonElement>('.modal-close');
  if (modalCloseButton) {
    modalCloseButtonListener = () => onClose();
    modalCloseButton.addEventListener('click', modalCloseButtonListener);
  }

  // Focus the first focusable element in the modal for accessibility, only if opened by keyboard
  if (openedByKeyboard) {
    const firstFocusable = modalElement.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }
}

export function closeModal(modalElement: HTMLElement) {
  document.body.classList.remove('modal-open');
  modalElement.classList.remove('active');
  activeModalCloseCallback = null;
  activeModalElement = null;

  document.removeEventListener('keydown', handleEscapeKey);
  document.removeEventListener('keydown', handleTabKey);
  modalElement.removeEventListener('click', handleBackdropClick);

  const modalCloseButton =
    modalElement.querySelector<HTMLButtonElement>('.modal-close');
  if (modalCloseButton && modalCloseButtonListener) {
    modalCloseButton.removeEventListener('click', modalCloseButtonListener);
    modalCloseButtonListener = null;
  }
}

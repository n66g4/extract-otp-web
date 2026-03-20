import QRCode from 'qrcode';
import { $ } from './dom';
import { isNarrowViewport } from './viewport';
import { openModal, closeModal } from './modalHandler';

function hideQrModal(): void {
  const modal = $<HTMLDivElement>('#qr-modal');
  const modalContent = $<HTMLDivElement>('#qr-modal .modal-content');
  modalContent.innerHTML = '';
  closeModal(modal);
}

export function showQrModal(
  otpAuthUrl: string,
  title: string,
  fromKeyboard = false
): void {
  const modal = $<HTMLDivElement>('#qr-modal');
  const modalContent = $<HTMLDivElement>('#qr-modal .modal-content');
  const modalTitleId = 'qr-modal-title';

  modalContent.innerHTML = '';

  const modalCanvas = document.createElement('canvas');

  QRCode.toCanvas(modalCanvas, otpAuthUrl, {
    // The `width` option sets the canvas's drawing buffer size (its intrinsic
    // resolution). We render it at a reasonably high resolution (e.g., 512px)
    // to ensure it looks sharp even when CSS scales it up to fill the modal.
    // This decouples the rendering resolution from the display size.
    width: 512,
    margin: 2,
    // modal QR is always white on black for ease of scanning regardless of theme
    color: { dark: '#000000', light: '#ffffff' },
  });

  // After rendering the QR code to the canvas's drawing buffer (which sets
  // its intrinsic width/height attributes), we explicitly set the CSS style
  // to ensure it scales down to fit its container.
  modalCanvas.style.width = '100%';
  modalCanvas.style.height = 'auto';

  modalContent.appendChild(modalCanvas);

  const titleElement = document.createElement('p');
  titleElement.id = modalTitleId;
  titleElement.className = 'modal-title';
  titleElement.textContent = title;
  modalContent.appendChild(titleElement);

  modal.setAttribute('aria-labelledby', modalTitleId);
  openModal(modal, hideQrModal, fromKeyboard);
}

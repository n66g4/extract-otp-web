import QrScanner from 'qr-scanner';
import { getOtpParametersFromUrl } from '../services/otpUrlParser';
import { setState, getState } from '../state/store';
import { displayError, addUploadLog } from './notifications';
import { logger } from '../services/logger';
import { filterAndLogOtps, getOtpUniqueKey } from '../services/dataHandler';

const cameraModal = document.getElementById('camera-modal') as HTMLElement;
const video = document.getElementById('camera-video') as HTMLVideoElement;
const cameraTitle = document.getElementById('camera-title') as HTMLElement;
const cameraSelect = document.getElementById(
  'camera-select'
) as HTMLSelectElement;
const cameraSwitch = document.getElementById(
  'camera-switch'
) as HTMLButtonElement;
const takePhotoButton = document.getElementById(
  'take-photo-button'
) as HTMLButtonElement;

let qrScanner: QrScanner | null = null;
let currentCameraId: string | null = null;

async function processScanResult(result: QrScanner.ScanResult) {
  logger.debug('decoded qr code:', result.data);
  stopScan();

  try {
    const otpParameters = await getOtpParametersFromUrl(result.data);

    if (otpParameters && otpParameters.length > 0) {
      const currentOtps = getState().otps; // Use getState() to read current state
      const existingAndBatchKeys = new Set(currentOtps.map(getOtpUniqueKey));

      const { newOtps, duplicatesFound } = filterAndLogOtps(
        otpParameters,
        existingAndBatchKeys,
        'Camera Scan'
      );

      if (newOtps.length > 0) {
        setState((currentState) => ({
          otps: [...currentState.otps, ...newOtps],
        }));
      } else if (duplicatesFound > 0) {
        addUploadLog('Camera Scan', 'info', 'QR code already processed.');
      }
    } else {
      addUploadLog(
        'Camera Scan',
        'warning',
        'No OTP secrets found in QR code.'
      );
    }
  } catch (error: any) {
    logger.error('Error processing scanned QR code:', error);
    displayError(
      error.message || 'Failed to process QR code from camera feed.'
    );
    addUploadLog('Camera Scan', 'error', error.message || 'Processing failed.');
  }
}

async function startScan() {
  if (!qrScanner) {
    qrScanner = new QrScanner(video, processScanResult, {
      highlightScanRegion: true,
      highlightCodeOutline: true,
      onDecodeError: (error) => {
        // Log decode errors but don't display them to the user unless persistent
        logger.debug('QR scan decode error:', error);
        cameraTitle.textContent = 'Scanning...'; // Reset text on error
      },
    });
  }

  try {
    await qrScanner.start();
    document.body.classList.add('modal-open'); // Lock the underlying page
    cameraModal.classList.add('active'); // Use class for display
    cameraTitle.textContent = 'Scan QR Code';

    const cameras = await QrScanner.listCameras(true);
    cameraSelect.innerHTML = '';

    if (cameras.length > 2) {
      // For more than 2 cameras (e.g., desktop with multiple webcams, or advanced mobile setups)
      // Show dropdown and switch button
      cameras.forEach((camera) => {
        const option = document.createElement('option');
        option.value = camera.id;
        option.textContent = camera.label;
        cameraSelect.appendChild(option);
      });
      cameraSelect.style.display = 'block';
      cameraSwitch.style.display = 'block';
    } else if (cameras.length === 2) {
      // For exactly two cameras (typical mobile front/back)
      // Hide dropdown, show only switch button
      cameraSelect.style.display = 'none';
      cameraSwitch.style.display = 'block';
    } else {
      // For one or zero cameras
      cameraSelect.style.display = 'none';
      cameraSwitch.style.display = 'none';
    }

    currentCameraId = cameras[0]?.id || null;
    if (currentCameraId) {
      cameraSelect.value = currentCameraId;
    }
  } catch (error) {
    logger.error('Failed to start camera:', error);
    displayError(
      'Failed to start camera. Please ensure you have a camera connected and have granted permission.'
    );
    stopScan(); // Ensure modal is closed if camera fails to start
  }
}

function stopScan() {
  if (qrScanner) {
    qrScanner.stop();
  }
  cameraModal.classList.remove('active'); // Use class for display
  document.body.classList.remove('modal-open'); // Unlock the underlying page
}

async function switchCamera() {
  if (!qrScanner) return;
  const cameras = await QrScanner.listCameras(true);
  if (cameras.length <= 1) return;

  const currentIndex = cameras.findIndex(
    (camera) => camera.id === currentCameraId
  );
  const nextIndex = (currentIndex + 1) % cameras.length;
  const nextCamera = cameras[nextIndex];

  try {
    await qrScanner.setCamera(nextCamera.id);
    currentCameraId = nextCamera.id;
    cameraSelect.value = currentCameraId;
    logger.debug('Switched to camera:', nextCamera.label);
  } catch (error) {
    logger.error('Failed to switch camera:', error);
    displayError('Failed to switch camera.');
  }
}

export function initCamera() {
  document
    .getElementById('take-photo-button')
    ?.addEventListener('click', startScan);
  document.getElementById('camera-cancel')?.addEventListener('click', stopScan);
  cameraSelect.addEventListener('change', () => {
    if (qrScanner) {
      qrScanner.setCamera(cameraSelect.value);
      currentCameraId = cameraSelect.value;
    }
  });
  cameraSwitch.addEventListener('click', switchCamera);
}

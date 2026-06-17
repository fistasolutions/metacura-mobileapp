# Upload Spec (Module D, screens 12-15)

**Priority:** P0. **Screens:** [src/screens/upload/](../src/screens/upload). **Stack:** RecordsStack (the Upload flow pushes within the Records tab).

Camera-first interaction. Everything else is secondary. Average time under 30 seconds from drop to ready.

---

## 12 · Upload entry — `UploadEntryScreen.tsx`
Three primary action tiles:
- **Open Camera** (largest, top of screen).
- **Photo Library**.
- **PDF or document**.

Plus a smaller secondary **"Type manually"** option. The iOS and Android **share-sheet inbound** path also lands here (the app registers as a share target). Camera and library and document picker are **native sheets** (see [designsystem.md](designsystem.md#native-surfaces-use-the-os-do-not-rebuild)).

## 13 · Camera scanner — `CameraScannerScreen.tsx`
Multi-page capture with automatic edge detection (`react-native-vision-camera`). "Add another page" between shots. A final review grid shows all captured pages with a retake option per page. Lab, MRI, ECG, prescription, any format.

## 14 · Upload progress — `UploadProgressScreen.tsx`
File icon, page count, an encryption-on-arrival indicator, and a progress bar with the message "Reading… (under 30 seconds)." This is the trust moment that the data is encrypted as it arrives.

## 15 · Auto-classified confirmation — `ClassifyConfirmScreen.tsx`
"Read as: Lab Report, CMP_Apr18.pdf." The user can correct the classification from a single dropdown: **Lab / CT / MRI / Ultrasound / Medication / Voice note / Doctor note / Prescription**. Confirm and the record lands on the Records timeline (16).

## Native dependencies
`react-native-vision-camera` (scan + edge detection), `react-native-image-picker` (photo library), `@react-native-documents/picker` (PDF/document), and share-target registration in the native projects.

## States
Camera permission denied → fall back to the photo library. Upload failure or unreadable scan → clear re-upload prompt. Network offline → queue the upload and show a sync-on-reconnect badge. See [states.md](states.md).

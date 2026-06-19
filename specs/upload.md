# Upload Spec (Module D, screens 12-15)

**Priority:** P0. **Screens:** [src/screens/upload/](../src/screens/upload). **Stack:** RecordsStack (the Upload flow pushes within the Records tab).

Camera-first interaction. Everything else is secondary. Average time under 30 seconds from drop to ready.

---

## 12 · Upload entry — `UploadEntryScreen.tsx`
A **drag-and-drop dropper** sits at the top: a dashed drop zone (cloud-upload medallion, "Drag a file here to upload") with a row of draggable document chips below it (e.g. Lab_Report.pdf, MRI_Scan.jpg, Prescription.pdf). Dragging a chip into the zone highlights it (teal fill + border, the medallion lifts) and on release starts the upload of that file (→ Upload progress with the dropped file name). The page scroll is suspended while a chip is being dragged. This is the in-app stand-in for desktop drag-and-drop; the chips are sample documents.

Below the dropper, camera-first: a large gradient **Open Camera** hero tile (white camera medallion + watermark + a "START SCAN" pill → Camera scanner), then two secondary crystal tiles in a row: **Photo Library** and **PDF or document**. A smaller secondary **"Type manually"** row sits below, and a centered lock reassurance line ("Arrives encrypted · the share sheet lands here too"). The iOS and Android **share-sheet inbound** path also lands here (the app registers as a share target). Camera, library, and document picker are **native sheets** (see [designsystem.md](designsystem.md#native-surfaces-use-the-os-do-not-rebuild)).

## 13 · Camera scanner — `CameraScannerScreen.tsx`
Multi-page capture with automatic edge detection (`react-native-vision-camera`). The viewfinder shows teal corner brackets, a sweeping detection line, and an "EDGES DETECTED" badge; a captured-count pill appears as pages accrue. "Review N pages" opens a **review grid** on a light surface: each captured page is a numbered thumbnail with its own **Retake**, plus an **Add page** tile, and a "Use N pages" action → Upload progress. Lab, MRI, ECG, prescription, any format.

## 14 · Upload progress — `UploadProgressScreen.tsx`
The trust moment. A glowing gradient file medallion (pulsing halo) over a soft teal field, then a glass card with the file name, an **Encrypted** chip, page count ("3 pages · encrypted on arrival"), and an animated progress bar with the message "Reading… (under 30 seconds)" and a live percentage. Auto-advances to classify when complete.

## 15 · Auto-classified confirmation — `ClassifyConfirmScreen.tsx`
"Read as: {type}, CMP_Apr18.pdf." A result card shows the auto-detected type (gradient lab medallion + an "AUTO-DETECTED" sparkle eyebrow + file name + page count). The user can correct the classification from a single **dropdown** that opens a bottom-sheet picker (scrolls on its own, dismiss by tapping an option or the backdrop): **Lab / CT / MRI / Ultrasound / Medication / Voice note / Doctor note / Prescription**. Confirm and the record lands on the Records timeline (16); Re-upload returns.

## Native dependencies
`react-native-vision-camera` (scan + edge detection), `react-native-image-picker` (photo library), `@react-native-documents/picker` (PDF/document), and share-target registration in the native projects.

## States
Camera permission denied → fall back to the photo library. Upload failure or unreadable scan → clear re-upload prompt. Network offline → queue the upload and show a sync-on-reconnect badge. See [states.md](states.md).

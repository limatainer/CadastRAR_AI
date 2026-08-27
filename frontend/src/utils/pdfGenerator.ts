import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import DocumentPreview, { DocFormat, DocumentData, DOC_SIZES } from '@/components/documents';

export type UserData = DocumentData;
export type { DocFormat };

/**
 * Render a document component offscreen and rasterise it.
 *
 * The host stays attached to document.body (offset offscreen) rather than
 * detached: a detached node inherits no styles and html2canvas would
 * capture unstyled markup.
 */
const capture = async (format: DocFormat, data: DocumentData): Promise<string> => {
  const { width, height } = DOC_SIZES[format];

  const host = document.createElement('div');
  Object.assign(host.style, {
    position: 'fixed',
    left: '-10000px',
    top: '0',
    width: `${width}px`,
    height: `${height}px`,
    pointerEvents: 'none',
  });
  document.body.appendChild(host);

  const root = createRoot(host);
  try {
    // flushSync so the markup exists before html2canvas reads the DOM.
    flushSync(() => {
      root.render(createElement(DocumentPreview, { format, data }));
    });

    // Give remote avatars a chance to decode; a broken one still renders.
    await Promise.all(
      Array.from(host.querySelectorAll('img')).map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.addEventListener('load', () => resolve(), { once: true });
              img.addEventListener('error', () => resolve(), { once: true });
            })
      )
    );

    const canvas = await html2canvas(host, {
      width,
      height,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    return canvas.toDataURL('image/jpeg', 0.95);
  } finally {
    root.unmount();
    document.body.removeChild(host);
  }
};

const FILE_SUFFIX: Record<DocFormat, string> = {
  id: 'ID-Card',
  certificate: 'Certificate',
  profile: 'Profile-Sheet',
};

export const generateDocument = async (
  format: DocFormat,
  data: DocumentData
): Promise<void> => {
  const { mm, orientation } = DOC_SIZES[format];
  const imgData = await capture(format, data);

  const pdf = new jsPDF({
    orientation: orientation as 'landscape' | 'portrait',
    unit: 'mm',
    format: [mm[0], mm[1]],
  });

  pdf.addImage(imgData, 'JPEG', 0, 0, mm[0], mm[1]);
  pdf.save(`${data.title}-${FILE_SUFFIX[format]}.pdf`);
};

export const generateIDCard = (data: DocumentData) => generateDocument('id', data);
export const generateCertificate = (data: DocumentData) => generateDocument('certificate', data);
export const generateProfileSheet = (data: DocumentData) => generateDocument('profile', data);

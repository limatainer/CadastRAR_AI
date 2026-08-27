import IDCard from './IDCard';
import Certificate from './Certificate';
import ProfileSheet from './ProfileSheet';
import { DocFormat, DOC_SIZES, DOC_LABELS } from './print';
import { DocumentData } from './types';

export { IDCard, Certificate, ProfileSheet, DOC_SIZES, DOC_LABELS };
export type { DocFormat, DocumentData };

const RENDERERS = {
  id: IDCard,
  certificate: Certificate,
  profile: ProfileSheet,
} as const;

/**
 * One switchboard, used by both the on-screen preview and the PDF capture,
 * so a document can never look different in the two places.
 */
export default function DocumentPreview({
  format,
  data,
}: {
  format: DocFormat;
  data: DocumentData;
}) {
  const Renderer = RENDERERS[format];
  return <Renderer data={data} />;
}

/**
 * Fixed palette for exported documents.
 *
 * Deliberately literal, not CSS variables: a certificate must look the same
 * whether it was exported from light or dark mode, and html2canvas
 * rasterises these nodes without the app stylesheet in scope.
 */
export const PRINT = {
  paper: '#ffffff',
  paperTint: '#fbf9f5',
  ink: '#1a1714',
  inkMuted: '#5c554c',
  inkSubtle: '#8f877c',
  rule: '#d8d0c3',
  ruleHairline: '#eae4da',
  accent: '#1f4d3f',
  accentInk: '#fbf9f5',
  serif: "'Newsreader', Georgia, 'Times New Roman', serif",
  sans: "'Geist', system-ui, -apple-system, sans-serif",
  mono: "'GeistMono', ui-monospace, monospace",
} as const;

/** Dimensions in px on screen, paired with the mm the PDF is cut to. */
export const DOC_SIZES = {
  id: { width: 680, height: 430, mm: [85.6, 53.98], orientation: 'landscape' },
  certificate: { width: 1400, height: 990, mm: [297, 210], orientation: 'landscape' },
  profile: { width: 1000, height: 1414, mm: [210, 297], orientation: 'portrait' },
} as const;

export type DocFormat = keyof typeof DOC_SIZES;

export const formatDate = (createdAt?: { seconds: number } | Date) => {
  if (!createdAt) return '—';
  const d = createdAt instanceof Date ? createdAt : new Date(createdAt.seconds * 1000);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

/** Deterministic stand-in when an avatar URL is missing or fails to load. */
export const avatarFallback = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1f4d3f&color=fbf9f5&size=256`;

export const DOC_LABELS: Record<DocFormat, string> = {
  id: 'ID card',
  certificate: 'Certificate',
  profile: 'Profile sheet',
};

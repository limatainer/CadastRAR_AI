import { useEffect, useRef, useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { generateUserDescription, isGeminiConfigured } from '@/services/gemini';
import Field from './Field';
import Alert from './Alert';
import Spinner from './Spinner';

export type RecordValues = {
  title: string;
  image: string;
  body: string;
  tags: string[];
};

type RecordFormProps = {
  initial?: Partial<RecordValues>;
  submitLabel: string;
  submitting: boolean;
  /** Error from the write itself (Firestore, network). */
  submitError?: string | null;
  onSubmit: (values: RecordValues) => void;
  onCancel?: () => void;
};

type Draft = { title: string; image: string; body: string; tags: string };
type FieldName = keyof Draft;

const FIELD_LABELS: Record<FieldName, string> = {
  title: 'Name',
  image: 'Avatar URL',
  body: 'Description',
  tags: 'Tags',
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validate = (draft: Draft): Partial<Record<FieldName, string>> => {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!draft.title.trim()) errors.title = 'Enter the name of the person on this record.';
  if (!draft.image.trim()) errors.image = 'Enter a link to an avatar image.';
  else if (!isValidUrl(draft.image.trim())) errors.image = 'That is not a valid URL.';
  if (!draft.body.trim()) errors.body = 'Add a short description.';
  if (!draft.tags.trim()) errors.tags = 'Add at least one tag.';
  return errors;
};

const parseTags = (raw: string) =>
  raw
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);

/**
 * The single record editor. Registration and Edit both render this, so the
 * two pages cannot drift apart in validation, labelling or AI behaviour.
 */
export default function RecordForm({
  initial,
  submitLabel,
  submitting,
  submitError,
  onSubmit,
  onCancel,
}: RecordFormProps) {
  const [draft, setDraft] = useState<Draft>({
    title: initial?.title ?? '',
    image: initial?.image ?? '',
    body: initial?.body ?? '',
    tags: initial?.tags?.join(', ') ?? '',
  });
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [aiError, setAiError] = useState('');
  const [generating, setGenerating] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Edit loads its record asynchronously, so seed the draft when it lands.
  useEffect(() => {
    if (!initial) return;
    setDraft({
      title: initial.title ?? '',
      image: initial.image ?? '',
      body: initial.body ?? '',
      tags: initial.tags?.join(', ') ?? '',
    });
  }, [initial]);

  const errors = validate(draft);
  const invalid = (Object.keys(errors) as FieldName[]).filter(
    (name) => touched[name] || submitted
  );

  const set = (name: FieldName) => (value: string) => {
    setDraft((prev) => ({ ...prev, [name]: value }));
    setAiError('');
  };
  const blur = (name: FieldName) => () => setTouched((prev) => ({ ...prev, [name]: true }));
  const errorFor = (name: FieldName) =>
    touched[name] || submitted ? errors[name] : undefined;

  const handleGenerate = async () => {
    if (!draft.title.trim() || !draft.tags.trim()) {
      setAiError('Enter a name and at least one tag first.');
      return;
    }
    setGenerating(true);
    setAiError('');
    try {
      const text = await generateUserDescription(draft.title.trim(), parseTags(draft.tags));
      setDraft((prev) => ({ ...prev, body: text }));
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'Could not generate a description.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) {
      // Focus the summary so the failure is announced rather than silent.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    onSubmit({
      title: draft.title.trim(),
      image: draft.image.trim(),
      body: draft.body.trim(),
      tags: parseTags(draft.tags),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {submitted && invalid.length > 0 ? (
        <div ref={summaryRef} tabIndex={-1} className="focus:outline-none">
          <Alert tone="danger">
            <p className="font-medium">Check {invalid.length} field(s) before saving:</p>
            <ul className="mt-1 list-inside list-disc">
              {invalid.map((name) => (
                <li key={name}>
                  <a href={`#record-${name}`} className="underline">
                    {FIELD_LABELS[name]}
                  </a>
                </li>
              ))}
            </ul>
          </Alert>
        </div>
      ) : null}

      {submitError ? <Alert tone="danger">{submitError}</Alert> : null}

      <Field id="record-title" label={FIELD_LABELS.title} required error={errorFor('title')}>
        {(props) => (
          <input
            {...props}
            type="text"
            className="input"
            placeholder="Ada Lovelace"
            value={draft.title}
            onChange={(e) => set('title')(e.target.value)}
            onBlur={blur('title')}
          />
        )}
      </Field>

      <Field
        id="record-image"
        label={FIELD_LABELS.image}
        required
        hint="A direct link to a square image works best."
        error={errorFor('image')}
      >
        {(props) => (
          <input
            {...props}
            type="url"
            className="input"
            placeholder="https://example.com/avatar.jpg"
            value={draft.image}
            onChange={(e) => set('image')(e.target.value)}
            onBlur={blur('image')}
          />
        )}
      </Field>

      {draft.image.trim() && isValidUrl(draft.image.trim()) ? (
        <img
          src={draft.image.trim()}
          alt=""
          className="h-24 w-24 rounded-full border border-[var(--border-hairline)] object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : null}

      <Field
        id="record-tags"
        label={FIELD_LABELS.tags}
        required
        hint="Comma separated."
        error={errorFor('tags')}
      >
        {(props) => (
          <input
            {...props}
            type="text"
            className="input"
            placeholder="photography, berlin, mentor"
            value={draft.tags}
            onChange={(e) => set('tags')(e.target.value)}
            onBlur={blur('tags')}
          />
        )}
      </Field>

      <div>
        <Field id="record-body" label={FIELD_LABELS.body} required error={errorFor('body')}>
          {(props) => (
            <textarea
              {...props}
              rows={5}
              className="input"
              placeholder="Two or three sentences about this person."
              value={draft.body}
              onChange={(e) => set('body')(e.target.value)}
              onBlur={blur('body')}
            />
          )}
        </Field>

        {isGeminiConfigured() ? (
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="btn-ghost mt-2 px-3 py-2 text-sm"
          >
            <SparklesIcon className="mr-1.5 h-4 w-4" aria-hidden="true" />
            {generating ? 'Writing…' : 'Draft with AI'}
          </button>
        ) : null}

        {aiError ? (
          <Alert tone="danger" className="mt-2">
            {aiError}
          </Alert>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border-hairline)] pt-6">
        <button type="submit" disabled={submitting} className="btn px-6 py-2.5">
          {submitting ? 'Saving…' : submitLabel}
        </button>
        {onCancel ? (
          <button type="button" onClick={onCancel} className="btn-ghost px-6 py-2.5">
            Cancel
          </button>
        ) : null}
        {submitting ? <Spinner /> : null}
      </div>
    </form>
  );
}

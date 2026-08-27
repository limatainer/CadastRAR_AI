import { PRINT, DOC_SIZES, formatDate, avatarFallback } from './print';
import { DocumentData } from './types';

const S = DOC_SIZES.id;

export default function IDCard({ data }: { data: DocumentData }) {
  return (
    <div
      style={{
        width: S.width,
        height: S.height,
        background: PRINT.paper,
        fontFamily: PRINT.sans,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          background: PRINT.accent,
          color: PRINT.accentInk,
          padding: '22px 34px',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontFamily: PRINT.serif, fontSize: 30, fontWeight: 600 }}>CadastRAR</span>
        <span
          style={{
            fontFamily: PRINT.mono,
            fontSize: 13,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            opacity: 0.85,
          }}
        >
          Identity card
        </span>
      </div>

      <div style={{ display: 'flex', gap: 30, padding: '32px 34px', alignItems: 'center' }}>
        <img
          src={data.image || avatarFallback(data.title)}
          alt=""
          style={{
            width: 128,
            height: 128,
            borderRadius: 4,
            objectFit: 'cover',
            border: `1px solid ${PRINT.rule}`,
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: PRINT.mono,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: PRINT.inkSubtle,
              marginBottom: 6,
            }}
          >
            Name
          </div>
          <div
            style={{
              fontFamily: PRINT.serif,
              fontSize: 38,
              fontWeight: 600,
              color: PRINT.ink,
              lineHeight: 1.05,
              marginBottom: 14,
            }}
          >
            {data.title}
          </div>
          <div style={{ fontSize: 15, color: PRINT.inkMuted, lineHeight: 1.4 }}>
            {data.tags.slice(0, 4).join(' · ')}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 'auto',
          borderTop: `1px solid ${PRINT.ruleHairline}`,
          padding: '14px 34px',
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: PRINT.mono,
          fontSize: 12,
          color: PRINT.inkSubtle,
        }}
      >
        <span>Registered {formatDate(data.createdAt)}</span>
        <span>{data.createdBy}</span>
      </div>
    </div>
  );
}

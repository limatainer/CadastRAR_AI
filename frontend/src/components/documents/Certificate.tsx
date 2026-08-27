import { PRINT, DOC_SIZES, formatDate, avatarFallback } from './print';
import { DocumentData } from './types';

const S = DOC_SIZES.certificate;

export default function Certificate({ data }: { data: DocumentData }) {
  return (
    <div
      style={{
        width: S.width,
        height: S.height,
        background: PRINT.paperTint,
        fontFamily: PRINT.sans,
        padding: 46,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          border: `1px solid ${PRINT.rule}`,
          background: PRINT.paper,
          padding: '58px 88px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: PRINT.mono,
            fontSize: 14,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: PRINT.accent,
          }}
        >
          Certificate of registration
        </div>

        <div style={{ width: 64, height: 1, background: PRINT.rule, margin: '30px 0 38px' }} />

        <div style={{ fontSize: 19, color: PRINT.inkMuted }}>This certifies that</div>

        <div
          style={{
            fontFamily: PRINT.serif,
            fontSize: 78,
            fontWeight: 600,
            color: PRINT.ink,
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            margin: '22px 0 26px',
          }}
        >
          {data.title}
        </div>

        <img
          src={data.image || avatarFallback(data.title)}
          alt=""
          style={{
            width: 118,
            height: 118,
            borderRadius: 59,
            objectFit: 'cover',
            border: `1px solid ${PRINT.rule}`,
            marginBottom: 28,
          }}
        />

        <p
          style={{
            fontSize: 19,
            lineHeight: 1.7,
            color: PRINT.inkMuted,
            maxWidth: 760,
            margin: 0,
          }}
        >
          {data.body}
        </p>

        <div
          style={{
            marginTop: 'auto',
            width: '100%',
            borderTop: `1px solid ${PRINT.ruleHairline}`,
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: PRINT.mono,
            fontSize: 13,
            color: PRINT.inkSubtle,
          }}
        >
          <span>Issued {formatDate(data.createdAt)}</span>
          <span style={{ fontFamily: PRINT.serif, fontSize: 17, color: PRINT.accent }}>
            CadastRAR
          </span>
          <span>Registrar {data.createdBy}</span>
        </div>
      </div>
    </div>
  );
}

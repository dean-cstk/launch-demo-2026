/** Shared OG / Twitter card layout (Satori-compatible JSX) */
import { ROCKET_SVG_PATH } from '@/lib/rocket-path'

export function OgCard() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        background: '#050505',
        position: 'relative',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '55%',
          height: '90%',
          background:
            'radial-gradient(ellipse at center, rgba(73, 164, 102, 0.35) 0%, rgba(30, 100, 60, 0.12) 40%, transparent 70%)',
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '10%',
          width: '50%',
          height: '70%',
          background:
            'radial-gradient(ellipse at center, rgba(111, 131, 242, 0.15) 0%, transparent 60%)',
          display: 'flex',
        }}
      />
      {/* Left: copy */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 72,
          paddingRight: 48,
          paddingTop: 64,
          paddingBottom: 64,
          maxWidth: 720,
          zIndex: 1,
          flex: 1,
        }}
      >
        <div
          style={{
            fontSize: 13,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#49A466',
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          Deployment successful
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.02,
            letterSpacing: -3,
            marginBottom: 0,
          }}
        >
          Hello{' '}
          <span style={{ color: '#49A466' }}>Composable.</span>
        </div>
        <div
          style={{
            fontSize: 26,
            color: 'rgba(255, 255, 255, 0.72)',
            marginTop: 28,
            lineHeight: 1.45,
            fontWeight: 400,
            maxWidth: 560,
          }}
        >
          High-performance frontend hosting for composable teams. Ship on the
          edge with Contentstack Launch.
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 36,
            gap: 12,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: '#49A466',
            }}
          />
          <span
            style={{
              fontSize: 20,
              color: '#ffffff',
              fontWeight: 600,
            }}
          >
            Contentstack Launch
          </span>
        </div>
      </div>
      {/* Right: rocket */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 380,
          flexShrink: 0,
          zIndex: 1,
          paddingRight: 56,
        }}
      >
        <svg width="300" height="300" viewBox="0 -960 960 960">
          <path d={ROCKET_SVG_PATH} fill="#49A466" />
        </svg>
      </div>
      {/* Bottom bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background:
            'linear-gradient(90deg, #49A466 0%, #6F83F2 50%, #8A3DFF 100%)',
          display: 'flex',
        }}
      />
    </div>
  )
}

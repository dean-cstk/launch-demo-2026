const MANDALA_PETALS = [
  0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330,
]

export default function Home() {
  return (
    <div className="page-root p-12 selection:bg-purple-500 selection:text-white">
      <div className="space-container">
        <div className="starfield" />
        <div className="warp-tunnel" />
        <div className="mandala-wrap">
          <svg
            viewBox="0 0 200 200"
            className="mandala-svg"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <g className="layer-rotate">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="var(--cs-purple)"
                className="layer-pulse"
                strokeDasharray="0.5 2"
              />
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="#6F83F2"
                strokeWidth="0.05"
              />
              {MANDALA_PETALS.map((deg) => (
                <path
                  key={deg}
                  d="M100 10 L110 30 L90 30 Z"
                  fill="var(--cs-purple)"
                  opacity="0.1"
                  transform={`rotate(${deg} 100 100)`}
                />
              ))}
            </g>
            <g className="layer-rotate-slow">
              <rect
                x="60"
                y="60"
                width="80"
                height="80"
                fill="none"
                stroke="#49A466"
                strokeWidth="0.1"
                opacity="0.2"
                transform="rotate(45 100 100)"
              />
              <rect
                x="60"
                y="60"
                width="80"
                height="80"
                fill="none"
                stroke="var(--cs-purple)"
                strokeWidth="0.1"
                opacity="0.2"
                transform="rotate(15 100 100)"
              />
              <circle
                cx="100"
                cy="100"
                r="45"
                fill="none"
                stroke="#6F83F2"
                strokeWidth="0.05"
                strokeDasharray="1 1"
              />
            </g>
          </svg>
        </div>
      </div>

      <div className="h-12" />

      <main className="relative flex flex-col items-center text-center justify-center flex-1 max-w-4xl w-full">
        <div className="mb-8 relative group">
          <div className="absolute -inset-16 bg-[#AC75FF]/20 blur-[60px] rounded-full opacity-50" />
          <span
            className="material-symbols-outlined text-[160px] md:text-[200px] text-[#AC75FF] rocket-float select-none cursor-default"
            style={{
              fontVariationSettings: "'FILL' 1, 'wght' 200",
            }}
          >
            rocket_launch
          </span>
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 glass px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.4em] uppercase text-[#AC75FF]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
            </span>
            Deployment Successful
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none">
            Hello <span className="text-gradient">Composable.</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-lg max-w-xl mx-auto leading-relaxed font-light opacity-90">
            You are witnessing the future of high-performance frontend hosting.{' '}
            <br className="hidden md:block" />
            Crafted for speed. Powered by{' '}
            <span className="text-white font-medium">Contentstack Launch.</span>
          </p>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center gap-6">
          <a
            href="https://www.contentstack.com/docs/developers/apis/launch-api"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-4 bg-black/40 text-white border border-[#AC75FF]/40 rounded-xl font-bold text-sm hover:bg-[#AC75FF] hover:text-black hover:scale-105 hover:border-transparent active:scale-95 transition-all duration-300 shadow-2xl backdrop-blur-md no-underline text-center"
          >
            Launch API
          </a>
          <a
            href="https://www.contentstack.com/docs/developers/launch"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-4 bg-black/40 text-white border border-[#AC75FF]/40 rounded-xl font-bold text-sm hover:bg-[#AC75FF] hover:text-black hover:scale-105 hover:border-transparent active:scale-95 transition-all duration-300 shadow-2xl backdrop-blur-md no-underline text-center"
          >
            Launch Docs
          </a>
        </div>
      </main>

      <footer className="w-full flex justify-center pb-12 pt-16">
        <div className="glass rounded-full px-8 py-3.5 flex items-center gap-4 transition-all duration-500 hover:bg-white/10 hover:border-white/20 group">
          <a
            href="https://www.contentstack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 no-underline group/brand"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 26 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover/brand:scale-110 shrink-0"
              aria-hidden
            >
              <path
                d="M25.5 13.342v5.314l-12.526 1.772L.5 18.656v-5.314l12.474-1.773L25.5 13.342z"
                fill="url(#footer_logo_grad)"
              />
              <path
                d="M.5 25.742v-5.314l7.292 3.986L25.5 20.428v5.314L7.792 31.5.5 25.742z"
                fill="url(#footer_logo_grad)"
              />
              <path
                d="M25.5 6.258v5.314l-7.292-3.986L.5 11.572V6.258L18.208.5 25.5 6.258z"
                fill="url(#footer_logo_grad)"
              />
              <defs>
                <linearGradient
                  id="footer_logo_grad"
                  x1="-1.723"
                  y1="-0.742"
                  x2="37.211"
                  y2="20.356"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#49A466" />
                  <stop offset="0.5" stopColor="#6F83F2" />
                  <stop offset="1" stopColor="#8A3DFF" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-bold text-lg tracking-tight text-white group-hover/brand:text-[#AC75FF] transition-colors">
              Contentstack
            </span>
          </a>

          <div className="h-5 w-[1px] bg-white/20 mx-1 shrink-0" />

          <a
            href="https://github.com/systemsconsciousness/launch-demo-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 no-underline hover:opacity-70 transition-opacity"
          >
            <svg
              fill="white"
              width="20"
              height="20"
              viewBox="0 -0.5 25 25"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-80 shrink-0"
              aria-hidden
            >
              <path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z" />
            </svg>
            <span className="text-[10px] font-mono opacity-100 uppercase tracking-[0.2em] text-white">
              v1.0.4
            </span>
          </a>
        </div>
      </footer>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { PANELS, BALL_CENTERS, type DisciplineId } from './App'

// ─── SILHOUETTES ─────────────────────────────────────────────────────────────

function ProductSilhouette() {
  return (
    <svg viewBox="0 0 220 460" fill="currentColor" className="w-full h-full">
      <ellipse cx="110" cy="52" rx="30" ry="36" />
      <rect x="97" y="85" width="26" height="22" />
      <path d="M68 107 Q60 162 64 212 L156 212 Q160 162 152 107 Q132 97 110 96 Q88 97 68 107z" />
      <path d="M150 120 L192 150 L204 130 L200 162 L185 184 L160 173 L175 153 L138 133z" />
      <rect x="196" y="132" width="28" height="46" rx="5" />
      <rect x="200" y="137" width="20" height="32" rx="2" opacity="0.25" fill="#FAFAF8" />
      <path d="M68 120 L36 165 L50 175 L76 133z" />
      <path d="M33 165 L25 192 L42 196 L47 170z" />
      <path d="M64 212 L48 358 L79 360 L100 272 L102 212z" />
      <path d="M156 212 L172 358 L141 360 L120 272 L118 212z" />
      <ellipse cx="61" cy="360" rx="18" ry="7" />
      <ellipse cx="154" cy="360" rx="18" ry="7" />
    </svg>
  )
}

function GraphicSilhouette() {
  return (
    <svg viewBox="0 0 280 460" fill="currentColor" className="w-full h-full">
      <path d="M28 278 L224 243 L238 315 L44 350z" />
      <circle cx="196" cy="78" r="31" />
      <rect x="183" y="106" width="26" height="20" />
      <path d="M163 126 Q156 168 153 202 L220 200 Q218 162 212 126z" />
      <path d="M157 150 L88 240 L112 253 L172 169z" />
      <path d="M218 132 L250 168 L237 178 L208 145z" />
      <path d="M153 202 L143 244 L226 242 L220 200z" />
      <path d="M143 244 L126 378 L155 376 L167 298 L168 244z" />
      <path d="M226 242 L234 378 L205 376 L196 296 L204 242z" />
      <ellipse cx="140" cy="378" rx="22" ry="8" />
      <ellipse cx="220" cy="378" rx="22" ry="8" />
    </svg>
  )
}

function ArtSilhouette() {
  return (
    <svg viewBox="0 0 310 460" fill="currentColor" className="w-full h-full">
      <rect x="14" y="170" width="114" height="134" rx="3" />
      <circle cx="220" cy="72" r="29" />
      <rect x="208" y="99" width="24" height="20" />
      <path d="M185 119 Q177 160 179 202 h80 Q261 160 252 119z" />
      <path d="M181 142 L82 192 L74 216 L100 220 L158 164z" />
      <path d="M62 206 L75 226 L64 233 L50 212z" />
      <path d="M254 128 L275 158 L262 168 L244 140z" />
      <path d="M179 202 L163 272 L195 280 L220 240 L244 280 L276 272 L258 202z" />
      <rect x="159" y="276" width="122" height="11" rx="3" />
      <rect x="167" y="287" width="9" height="92" rx="3" />
      <rect x="264" y="287" width="9" height="92" rx="3" />
    </svg>
  )
}

function WritingSilhouette() {
  return (
    <svg viewBox="0 0 300 460" fill="currentColor" className="w-full h-full">
      <rect x="16" y="230" width="252" height="11" rx="2" />
      <rect x="44" y="196" width="148" height="38" rx="2" />
      <rect x="54" y="206" width="128" height="1.5" opacity="0.35" fill="#FAFAF8" />
      <rect x="54" y="218" width="108" height="1.5" opacity="0.25" fill="#FAFAF8" />
      <circle cx="218" cy="72" r="29" />
      <path d="M230 67 L244 74 L239 85 L225 78z" />
      <rect x="205" y="99" width="28" height="20" />
      <path d="M182 119 Q173 162 171 207 h80 Q253 162 245 119z" />
      <path d="M173 162 L80 208 L87 221 L179 176z" />
      <path d="M245 132 L270 164 L256 174 L234 144z" />
      <path d="M171 207 L158 278 L252 276 L244 207z" />
      <rect x="150" y="278" width="110" height="9" rx="2" />
      <rect x="156" y="287" width="9" height="94" rx="2" />
      <rect x="243" y="287" width="9" height="94" rx="2" />
    </svg>
  )
}

const SILHOUETTE_IMAGES: Record<DisciplineId, string> = {
  product: '/assets/silhouettes/1.png',
  graphic: '/assets/silhouettes/2.png',
  art: '/assets/silhouettes/3.png',
  writing: '/assets/silhouettes/4.png',
}

const SILHOUETTE_POSITION: Record<DisciplineId, string> = {
  product: 'left bottom',
  graphic: 'right bottom',
  art: 'right bottom',
  writing: 'right bottom',
}

// ─── PANEL BLOCK ─────────────────────────────────────────────────────────────

function PanelBlock({
  panel,
  index,
  hovered,
  onHover,
  onLeave,
  onClick,
  disabled,
}: {
  panel: typeof PANELS[number]
  index: number
  hovered: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
  disabled: boolean
}) {
  return (
    <div
      className="relative overflow-hidden flex-none"
      style={{
        width: `${panel.w}%`,
        background: panel.color,
        cursor: disabled ? 'default' : 'crosshair',
        transform: hovered ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
      onMouseEnter={() => { if (!disabled) onHover() }}
      onMouseLeave={onLeave}
      onClick={() => { if (!disabled) onClick() }}
    >
      {/* Silhouette */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '100%',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
          transformOrigin: 'bottom center',
          transition: 'opacity 0.28s ease, transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <img
          src={SILHOUETTE_IMAGES[panel.id]}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain"
          style={{ objectPosition: SILHOUETTE_POSITION[panel.id] }}
          draggable={false}
        />
      </div>

      {/* Panel number — always visible */}
      <div
        className="absolute top-4 left-4 text-[10px] tracking-[0.25em]"
        style={{ fontFamily: "'DM Mono', monospace", color: `${panel.text}70` }}
      >
        {panel.num}
      </div>

      {/* Discipline label — reveals on hover */}
      <div
        className="absolute bottom-6 left-4 right-4"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          color: panel.text,
        }}
      >
        <div
          className="text-[13px] tracking-[0.2em] uppercase font-semibold"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {panel.label}
        </div>
        <div
          className="mt-1.5 text-[10px] tracking-[0.18em] uppercase opacity-80 font-medium"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          SELECT →
        </div>
      </div>

      {/* Subtle overlay on hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'rgba(0,0,0,0.06)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  )
}

// ─── HERO VIEW ────────────────────────────────────────────────────────────────

export default function Hero({
  currentDisciplineIdx,
  onSelect,
  transitioning,
  visible,
}: {
  currentDisciplineIdx: number
  onSelect: (idx: number) => void
  transitioning: boolean
  visible: boolean
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setMounted(true), 80)
      return () => clearTimeout(t)
    } else {
      setMounted(false)
    }
  }, [visible])

  const effectiveIdx = hoveredIdx !== null ? hoveredIdx : currentDisciplineIdx
  const ballLeft = BALL_CENTERS[effectiveIdx]
  const activePanelColor = PANELS[currentDisciplineIdx].color

  return (
    <div
      className="relative flex flex-col"
      style={{
        height: '100dvh',
        background: '#050505',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* ── Top: name + tagline ─────────────────────────────────── */}
      <div
        className="flex-none flex items-end justify-between px-8 md:px-12 pb-6"
        style={{ height: '28vh', paddingTop: '2rem' }}
      >
        <div style={{ animationDelay: '0.1s' }} className={mounted ? 'anim-fadeinup' : ''}>
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'DM Mono', monospace", color: '#FAFAF860' }}
          >
            MOJE IKPEME&nbsp;&nbsp;/&nbsp;&nbsp;SELECTED WORK
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-light leading-[1.15] tracking-tight"
            style={{ color: '#FAFAF8' }}
          >
            Product designer,
            <br />
            artist, writer&nbsp;&amp;&nbsp;builder.
          </h1>
        </div>

        <div
          className={`text-right ${mounted ? 'anim-fadeinup' : ''}`}
          style={{ animationDelay: '0.25s' }}
        >
          <div
            className="text-[10px] tracking-[0.3em] mb-1"
            style={{ fontFamily: "'DM Mono', monospace", color: activePanelColor + 'cc' }}
          >
            {PANELS[currentDisciplineIdx].num} / 04
          </div>
          <div
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "'DM Mono', monospace", color: '#FAFAF838' }}
          >
            {PANELS[currentDisciplineIdx].label}
          </div>
        </div>
      </div>

      {/* ── Ball rail ───────────────────────────────────────────── */}
      <div className="flex-none px-8 md:px-12">
        <div className="relative" style={{ height: '52px' }}>
          {/* Rail line */}
          <div
            className="absolute left-0 right-0"
            style={{ top: '50%', height: '1px', background: '#FAFAF812' }}
          />
          {/* Corner markers */}
          {PANELS.map((_, i) => {
            const cum = PANELS.slice(0, i).reduce((a, p) => a + p.w, 0)
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${cum}%`,
                  top: 'calc(50% - 3px)',
                  width: '6px',
                  height: '6px',
                  borderLeft: '1px solid #FAFAF820',
                  borderTop: '1px solid #FAFAF820',
                }}
              />
            )
          })}

          {/* The ball */}
          <div
            className={`absolute rounded-full bg-white ${transitioning ? '' : 'anim-pulse'}`}
            style={{
              width: '22px',
              height: '22px',
              left: `${ballLeft}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              transition: 'left 0.72s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              animation: 'roll 1.8s linear infinite, pulseGlow 2.5s ease-in-out infinite',
              zIndex: 10,
            }}
          />
        </div>
      </div>

      {/* ── Panels ──────────────────────────────────────────────── */}
      <div className="flex flex-1 px-8 md:px-12 pb-8 md:pb-10 overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          {PANELS.map((panel, i) => (
            <PanelBlock
              key={panel.id}
              panel={panel}
              index={i}
              hovered={hoveredIdx === i}
              onHover={() => setHoveredIdx(i)}
              onLeave={() => setHoveredIdx(null)}
              onClick={() => onSelect(i)}
              disabled={transitioning}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

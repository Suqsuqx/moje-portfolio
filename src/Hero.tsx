import { useState, useEffect } from 'react'
import { PANELS, BALL_CENTERS } from './App'

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
      {/* Panel number — always visible */}
      <div
        className="absolute top-4 left-4 text-[10px] tracking-[0.25em] hero-panel-number"
        style={{ fontFamily: "'DM Mono', monospace", color: `${panel.text}70` }}
      >
        {panel.num}
      </div>

      {/* Discipline label — reveals on hover */}
      <div
        className="absolute bottom-6 left-4 right-4 hero-panel-label"
        style={{
          opacity: hovered ? 1 : undefined,
          transform: hovered ? 'translateY(0)' : undefined,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          color: panel.text,
        }}
      >
        <div
          className="text-[13px] tracking-[0.2em] uppercase font-semibold hero-panel-title"
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
        className="flex-none flex items-end justify-between px-4 sm:px-8 md:px-12 pb-6"
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
      <div className="flex-none px-4 sm:px-8 md:px-12">
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
      <div className="flex flex-1 px-4 sm:px-8 md:px-12 pb-6 md:pb-10 overflow-hidden">
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

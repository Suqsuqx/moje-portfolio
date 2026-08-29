import { useState, useEffect } from 'react'
import { PANELS, BALL_CENTERS } from './App'

const HERO_TITLES = [
  <>Product designer, artist,<br />writer&nbsp;&amp;&nbsp;builder.</>,
  <>d!gitaL design at the inter/section<br />of art, language&nbsp;&amp;&nbsp;strategy.</>,
]

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
      className="relative overflow-hidden flex-none hero-panel"
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
        <div className="uppercase font-black hero-panel-title">
          {panel.label}
        </div>
        <div
          className="mt-2 text-[9px] tracking-[0.18em] uppercase opacity-70 font-medium"
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
  const [mobileScrollIdx, setMobileScrollIdx] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [titleIdx, setTitleIdx] = useState(0)

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setMounted(true), 80)
      return () => clearTimeout(t)
    } else {
      setMounted(false)
    }
  }, [visible])

  useEffect(() => {
    if (!visible) return
    const timer = window.setInterval(() => setTitleIdx((current) => (current + 1) % HERO_TITLES.length), 5200)
    return () => window.clearInterval(timer)
  }, [visible])

  useEffect(() => {
    if (!visible) return
    const updateFromScroll = () => {
      if (!window.matchMedia('(max-width: 700px)').matches) {
        setMobileScrollIdx(null)
        return
      }
      const panels = Array.from(document.querySelectorAll<HTMLElement>('.hero-panel'))
      const viewportTarget = window.innerHeight * 0.62
      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY
      panels.forEach((panel, index) => {
        const bounds = panel.getBoundingClientRect()
        const distance = Math.abs(bounds.top + bounds.height / 2 - viewportTarget)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })
      setMobileScrollIdx(closestIndex)
    }
    updateFromScroll()
    window.addEventListener('scroll', updateFromScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)
    return () => {
      window.removeEventListener('scroll', updateFromScroll)
      window.removeEventListener('resize', updateFromScroll)
    }
  }, [visible])

  const effectiveIdx = hoveredIdx ?? mobileScrollIdx ?? currentDisciplineIdx
  const ballLeft = BALL_CENTERS[effectiveIdx]
  const activePanelColor = PANELS[effectiveIdx].color

  return (
    <div
      className="relative flex flex-col hero-root"
      style={{
        height: '100dvh',
        background: '#050505',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* ── Top: name + rotating practice statement ────────────── */}
      <div className="hero-topline flex-none flex items-center justify-between px-4 sm:px-8 md:px-12">
        <strong className="text-sm tracking-tight">MOJE IKPEME</strong>
        <span
          className="text-[9px] tracking-[0.28em] uppercase"
          style={{ fontFamily: "'DM Mono', monospace", color: '#FAFAF875' }}
        >
          SELECTED WORK · 2026
        </span>
      </div>

      <div className="hero-intro flex-1 flex items-end justify-between gap-8 px-4 sm:px-8 md:px-12">
        <div className={mounted ? 'anim-fadeinup' : ''} style={{ animationDelay: '0.1s' }}>
          <h1
            key={titleIdx}
            className={`hero-statement font-bold ${titleIdx === 1 ? 'hero-statement--alternate' : ''}`}
            aria-live="polite"
          >
            {HERO_TITLES[titleIdx]}
          </h1>
        </div>

        <div
          className={`text-right ${mounted ? 'anim-fadeinup' : ''}`}
          style={{ animationDelay: '0.25s' }}
        >
          <div
            className="text-[9px] tracking-[0.3em] mb-1"
            style={{ fontFamily: "'DM Mono', monospace", color: activePanelColor + 'cc' }}
          >
            {PANELS[effectiveIdx].num} / 04
          </div>
          <div
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "'DM Mono', monospace", color: '#FAFAF838' }}
          >
            {PANELS[effectiveIdx].label}
          </div>
        </div>
      </div>

      {/* ── Ball rail ───────────────────────────────────────────── */}
      <div className="flex-none px-4 sm:px-8 md:px-12 hero-ball-rail">
        <div className="relative hero-ball-track">
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
      <div className="flex px-4 sm:px-8 md:px-12 pb-5 md:pb-7 overflow-hidden hero-panels-shell">
        <div className="flex flex-1 overflow-hidden hero-panels">
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

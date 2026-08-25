import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { PANELS, PROJECTS, type DisciplineId, type AssetType } from './App'

// ─── MEDIA PLACEHOLDER ───────────────────────────────────────────────────────

function MediaPlaceholder({
  type,
  label,
  src,
  alt,
  color,
  idx,
  onRatio,
  galleryAssets = [],
}: {
  type: AssetType
  label: string
  src?: string
  alt?: string
  color: string
  idx: number
  onRatio?: (ratio: number) => void
  galleryAssets?: Array<{ type: AssetType; label: string; src?: string; alt?: string }>
}) {
  const [hovered, setHovered] = useState(false)
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const isVideo = type === 'video' || type === 'motion'
  const viewableAssets = galleryAssets.filter((asset) => asset.src && asset.type !== 'video' && asset.type !== 'motion')
  const viewedAsset = viewerIndex === null ? undefined : viewableAssets[viewerIndex]

  useEffect(() => {
    if (viewerIndex === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setViewerIndex(null)
      if (event.key === 'ArrowLeft') {
        setViewerIndex((current) => current === null ? null : (current - 1 + viewableAssets.length) % viewableAssets.length)
      }
      if (event.key === 'ArrowRight') {
        setViewerIndex((current) => current === null ? null : (current + 1) % viewableAssets.length)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [viewerIndex, viewableAssets.length])

  const patternId = `pat-${label.replace(/\s/g, '')}-${idx}`

  const patterns = [
    // diagonal
    <svg key="d" className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <pattern id={patternId} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <line x1="0" y1="24" x2="24" y2="0" stroke="#050505" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} opacity="0.05" />
    </svg>,
    // grid
    <svg key="g" className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <pattern id={patternId} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <rect width="32" height="32" fill="none" stroke="#050505" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} opacity="0.04" />
    </svg>,
    // dots
    <svg key="t" className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <pattern id={patternId} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="9" cy="9" r="1.2" fill="#050505" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} opacity="0.06" />
    </svg>,
  ]

  return (
    <div
      className="relative overflow-hidden w-full media-frame"
      style={{
        background: color,
        border: '1px solid rgba(5,5,5,0.18)',
        cursor: 'pointer',
        minHeight: src ? undefined : '240px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (!src || isVideo) return
        const selectedIndex = viewableAssets.findIndex((asset) => asset.src === src)
        setViewerIndex(selectedIndex >= 0 ? selectedIndex : 0)
      }}
    >
      {patterns[idx % 3]}

      {src && (type === 'video' || type === 'motion' ? (
        <video
          className="relative block w-full h-auto media-foreground"
          src={src}
          aria-label={alt ?? label}
          controls
          muted
          loop
          playsInline
          onLoadedMetadata={(event) => onRatio?.(event.currentTarget.videoWidth / event.currentTarget.videoHeight)}
        />
      ) : (
        <img
          className="relative block w-full h-auto media-foreground"
          src={src}
          alt={alt ?? label}
          onLoad={(event) => onRatio?.(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight)}
        />
      ))}

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: '2px',
          background: '#050505',
          opacity: hovered ? 0.65 : 0.18,
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* Center icon */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.2s ease' }}
      >
        {isVideo ? (
          <div className="flex flex-col items-center gap-2.5">
            <div
              className="flex items-center justify-center border rounded-full"
              style={{
                width: '44px',
                height: '44px',
                borderColor: '#050505',
                color: '#050505',
                transform: hovered ? 'scale(1.12)' : 'scale(1)',
                transition: 'transform 0.25s ease',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span
              className="text-[9px] tracking-[0.2em]"
              style={{
                fontFamily: "'DM Mono', monospace",
                color: '#050505',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.2s ease',
              }}
            >
              {type === 'motion' ? 'MOTION ↗' : 'PLAY ↗'}
            </span>
          </div>
        ) : (
          <div
            style={{
              width: '22px',
              height: '22px',
              border: '1.5px solid rgba(5,5,5,0.45)',
              transform: hovered ? 'rotate(45deg) scale(1.25)' : 'rotate(45deg)',
              transition: 'transform 0.25s ease, border-color 0.25s ease',
              borderColor: hovered ? '#050505' : 'rgba(5,5,5,0.45)',
            }}
          />
        )}
      </div>

      {/* Hover CTA */}
      <div
        className="absolute bottom-3 right-4"
        style={{
          opacity: hovered && !isVideo ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        <span
          className="text-[9px] tracking-[0.2em]"
          style={{ fontFamily: "'DM Mono', monospace", color: '#050505' }}
        >
          VIEW ↗
        </span>
      </div>

      {/* Scale on hover (image) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: hovered && !isVideo ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.4s ease',
        }}
      />

      {viewedAsset?.src && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
          style={{ background: 'rgba(5,5,5,0.94)', cursor: 'zoom-out' }}
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${viewedAsset.alt ?? viewedAsset.label}`}
          onClick={(event) => { event.stopPropagation(); setViewerIndex(null) }}
        >
          <div className="relative flex items-center justify-center w-full h-full max-w-6xl">
            <img
              src={viewedAsset.src}
              alt={viewedAsset.alt ?? viewedAsset.label}
              className="max-w-full max-h-full object-contain"
              style={{ boxShadow: '0 24px 80px rgba(0,0,0,.5)' }}
              onClick={(event) => event.stopPropagation()}
            />
            {viewableAssets.length > 1 && (
              <>
                <button
                  type="button"
                  className="viewer-arrow left-0 md:left-4"
                  aria-label="Previous image"
                  onClick={(event) => {
                    event.stopPropagation()
                    setViewerIndex((current) => current === null ? null : (current - 1 + viewableAssets.length) % viewableAssets.length)
                  }}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="viewer-arrow right-0 md:right-4"
                  aria-label="Next image"
                  onClick={(event) => {
                    event.stopPropagation()
                    setViewerIndex((current) => current === null ? null : (current + 1) % viewableAssets.length)
                  }}
                >
                  ›
                </button>
              </>
            )}
          </div>
          <button
            type="button"
            className="absolute top-5 right-5 md:top-8 md:right-8 text-[10px] tracking-[0.22em] uppercase"
            style={{ fontFamily: "'DM Mono', monospace", color: '#FAFAF8' }}
            onClick={(event) => { event.stopPropagation(); setViewerIndex(null) }}
          >
            Close ×
          </button>
        </div>,
        document.body,
      )}
    </div>
  )
}

// ─── MEDIA GRID ───────────────────────────────────────────────────────────────

function MediaGrid({
  assets,
  color,
  layout,
  projectId,
}: {
  assets: Array<{ type: AssetType; label: string; src?: string; alt?: string }>
  color: string
  layout: number
  projectId: string
}) {
  const [ratios, setRatios] = useState<Record<number, number>>({})
  if (!assets.length) return null

  if (projectId === 'stipendly') {
    const hero = assets.find((asset) => asset.src?.endsWith('/hero.gif'))
    const app = assets.find((asset) => asset.src?.endsWith('/app.png'))
    const calculator = assets.find((asset) => asset.src?.endsWith('/calculator.gif'))
    const longDemo = assets.find((asset) => asset.src?.endsWith('/2.gif'))

    if (hero && app && calculator && longDemo) {
      return (
        <div className="stipendly-grid">
          <div className="stipendly-hero stipendly-tile">
            <MediaPlaceholder {...hero} color={color} idx={0} galleryAssets={assets} />
          </div>
          <div className="stipendly-app stipendly-tile">
            <MediaPlaceholder {...app} color={color} idx={1} galleryAssets={assets} />
          </div>
          <div className="stipendly-calculator stipendly-tile">
            <MediaPlaceholder {...calculator} color={color} idx={2} galleryAssets={assets} />
          </div>
          <div className="stipendly-demo stipendly-tile">
            <MediaPlaceholder {...longDemo} color={color} idx={3} galleryAssets={assets} />
          </div>
        </div>
      )
    }
  }

  const twoByTwoProjects = ['Fluna', 'Poket by GradientFi', 'suqi-product', 'Bare']
  if (twoByTwoProjects.includes(projectId)) {
    return (
      <div className="media-two-grid">
        {assets.slice(0, 4).map((asset, index) => (
          <MediaPlaceholder
            {...asset}
            color={color}
            idx={index}
            key={`${asset.src ?? asset.label}-${index}`}
            galleryAssets={assets}
          />
        ))}
      </div>
    )
  }

  if (projectId === 'halo') {
    return (
      <div className="halo-grid">
        {assets.map((asset, index) => (
          <div
            className={index === 0 ? 'halo-lead' : undefined}
            key={`${asset.src ?? asset.label}-${index}`}
          >
            <MediaPlaceholder
              {...asset}
              color={color}
              idx={index}
              galleryAssets={assets}
            />
          </div>
        ))}
      </div>
    )
  }

  if (projectId === 'stakeet') {
    return (
      <div className="stakeet-row">
        {assets.map((asset, index) => (
          <MediaPlaceholder
            {...asset}
            color={color}
            idx={index}
            key={`${asset.src ?? asset.label}-${index}`}
            galleryAssets={assets}
          />
        ))}
      </div>
    )
  }

  if (projectId === 'brand-systems') {
    const features = assets.filter((asset) => /\/(ake|big|halo)\.png$/.test(asset.src ?? ''))
    const compact = assets.filter((asset) => !features.includes(asset))
    return (
      <div className="space-y-2">
        <div className="brand-smart-grid">
          {features.map((asset, index) => (
            <div className={index === 0 ? 'brand-feature-lead' : 'brand-feature'} key={asset.src}>
              <MediaPlaceholder
                {...asset}
                color={color}
                idx={index}
                galleryAssets={assets}
              />
            </div>
          ))}
        </div>
        <div className="brand-compact-masonry">
          {compact.map((asset, index) => (
            <div className="brand-compact-item" key={asset.src}>
              <MediaPlaceholder {...asset} color={color} idx={index + features.length} galleryAssets={assets} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const compactColumns: Record<string, number> = {
    'editorial-illustration': 4,
    'figures-faces': 3,
    'worlds-experiments': 3,
    'flat-illustrations': 3,
    'suqi-graphic': 2,
  }
  if (compactColumns[projectId]) {
    return (
      <div
        className="media-compact-grid"
        style={{ '--media-columns': compactColumns[projectId] } as React.CSSProperties}
      >
        {assets.map((asset, index) => (
          <MediaPlaceholder
            {...asset}
            color={color}
            idx={index}
            key={`${asset.src ?? asset.label}-${index}`}
            galleryAssets={assets}
          />
        ))}
      </div>
    )
  }

  const sourcedCount = assets.filter((asset) => asset.src).length
  const measured = Object.values(ratios)
  const uniform = sourcedCount > 1
    && measured.length === sourcedCount
    && Math.max(...measured) - Math.min(...measured) < 0.08
  const averageRatio = measured.reduce((total, ratio) => total + ratio, 0) / (measured.length || 1)
  const uniformColumns = averageRatio < 0.78 ? 3 : averageRatio > 1.55 ? 2 : 3
  const rememberRatio = (index: number) => (ratio: number) => {
    setRatios((current) => current[index] === ratio ? current : { ...current, [index]: ratio })
  }

  if (uniform) {
    return (
      <div className="media-uniform-grid" style={{ '--media-columns': uniformColumns } as React.CSSProperties}>
        {assets.map((asset, index) => (
          <MediaPlaceholder
            {...asset}
            color={color}
            idx={index}
            key={`${asset.src ?? asset.label}-${index}`}
            onRatio={rememberRatio(index)}
            galleryAssets={assets}
          />
        ))}
      </div>
    )
  }

  // The lead image establishes the project, while the remaining assets form an
  // intrinsic-height masonry flow. No image is cropped or forced into a ratio.
  return (
    <div className="space-y-2">
      <MediaPlaceholder {...assets[0]} color={color} idx={layout} onRatio={rememberRatio(0)} galleryAssets={assets} />
      {assets.length > 1 && (
        <div className="media-masonry">
          {assets.slice(1).map((asset, index) => (
            <div className="media-masonry-item" key={`${asset.src ?? asset.label}-${index}`}>
              <MediaPlaceholder {...asset} color={color} idx={index + 1} onRatio={rememberRatio(index + 1)} galleryAssets={assets} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── PROJECT SECTION ──────────────────────────────────────────────────────────

function ProjectSection({
  project,
  index,
  total,
  color,
}: {
  project: (typeof PROJECTS)[DisciplineId][number]
  index: number
  total: number
  color: string
}) {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.08 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!expanded) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false)
    }
    document.addEventListener('keydown', close)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', close)
      document.body.style.overflow = ''
    }
  }, [expanded])

  return (
    <div
      ref={ref}
      className="px-4 sm:px-8 md:px-12 py-14 md:py-20"
      style={{
        borderTop: '1px solid #FAFAF80f',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 0.65s ease, transform 0.65s ease',
      }}
    >
      {/* Project header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            {/* Ball marker */}
            <div
              className="rounded-full bg-white flex-none"
              style={{ width: '10px', height: '10px', opacity: 0.7 }}
            />
            <span
              className="text-[10px] tracking-[0.28em] uppercase"
              style={{ fontFamily: "'DM Mono', monospace", color: `${color}90` }}
            >
              {String(index + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(total).padStart(2, '0')}
            </span>
          </div>
          <h2
            className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-3"
            style={{ color: '#FAFAF8' }}
          >
            {project.title}
          </h2>
          <p
            className="text-lg md:text-xl font-light"
            style={{ color: '#FAFAF870' }}
          >
            {project.subtitle}
          </p>
          {project.longDescription && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex mt-5 text-[12px] tracking-[0.18em] uppercase font-semibold"
              style={{ fontFamily: "'DM Mono', monospace", color }}
            >
              Read more ↗
            </button>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex mt-5 ml-6 text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ fontFamily: "'DM Mono', monospace", color }}
            >
              {project.linkLabel ?? 'Visit product'} ↗
            </a>
          )}
        </div>
        <div
          className="flex-none text-[12px] tracking-[0.13em] leading-[1.75] max-w-sm"
          style={{ fontFamily: "'DM Mono', monospace", color: '#FAFAF875' }}
        >
          {project.description}
        </div>
      </div>

      {expanded && project.longDescription && createPortal(
        <div
          className="fixed inset-0 z-[9999] overflow-y-auto px-6 py-16 md:px-16 md:py-20"
          style={{ background: 'rgba(5,5,5,0.97)' }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} full description`}
          onClick={() => setExpanded(false)}
        >
          <article
            className="mx-auto max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="text-[11px] tracking-[0.22em] uppercase mb-6"
              style={{ fontFamily: "'DM Mono', monospace", color }}
            >
              Product case study
            </div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">{project.title}</h3>
            <p className="text-xl md:text-2xl font-light leading-snug mb-10" style={{ color: '#FAFAF899' }}>
              {project.subtitle}
            </p>
            <div className="text-[17px] md:text-[19px] leading-[1.8] font-light whitespace-pre-line" style={{ color: '#FAFAF8cc' }}>
              {project.longDescription}
            </div>
          </article>
          <button
            type="button"
            className="fixed top-6 right-6 md:top-8 md:right-10 text-[11px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "'DM Mono', monospace", color: '#FAFAF8' }}
            onClick={() => setExpanded(false)}
          >
            Close ×
          </button>
        </div>,
        document.body,
      )}

      {/* Media grid */}
      {project.role === 'Fiction' && project.url && project.assets[0]?.src ? (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="block p-4"
          style={{ background: color }}
          aria-label={`Read ${project.title}`}
        >
          <img
            src={project.assets[0].src}
            alt={project.assets[0].alt ?? project.title}
            className="block w-full h-auto"
          />
        </a>
      ) : (
        <div
          className={[
            'illustrated-tracks', 'stakeet', 'brand-systems', 'onebank', 'suqi-graphic',
          ].includes(project.id) ? `graphic-media-bound ${project.id === 'suqi-graphic' ? 'graphic-media-bound--tight' : ''}` : undefined}
        >
          <MediaGrid assets={project.assets} color={color} layout={index} projectId={project.id} />
        </div>
      )}

      {/* Metadata */}
      <div
        className="mt-8 pt-6 flex flex-wrap gap-x-10 gap-y-4"
        style={{ borderTop: `1px solid #FAFAF80a` }}
      >
        {[
          ['Role', project.role],
          ['Year', project.year],
          ['Areas', project.areas],
        ].map(([label, value]) => (
          <div key={label}>
            <div
              className="text-[9px] tracking-[0.25em] uppercase mb-1"
              style={{ fontFamily: "'DM Mono', monospace", color: `${color}80` }}
            >
              {label}
            </div>
            <div
              className="text-sm font-medium"
              style={{ color: '#FAFAF8cc' }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── SECTION VIEW ────────────────────────────────────────────────────────────

export default function SectionView({
  disciplineIdx,
  onReturn,
  onChangeDiscipline,
  transitioning,
}: {
  disciplineIdx: number
  onReturn: () => void
  onChangeDiscipline: (idx: number) => void
  transitioning: boolean
}) {
  const panel = PANELS[disciplineIdx]
  const color = panel.color
  const projects = PROJECTS[panel.id].filter((project) => project.assets.some((asset) => asset.src))
  const [scrolled, setScrolled] = useState(false)
  const [showGestureHint, setShowGestureHint] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onScroll = () => setScrolled(el.scrollTop > 40)
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll to top when discipline changes
  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0
    setScrolled(false)
  }, [disciplineIdx])

  useEffect(() => {
    if (!window.matchMedia('(max-width: 700px)').matches) return
    setShowGestureHint(true)
    const timer = window.setTimeout(() => setShowGestureHint(false), 4200)
    return () => window.clearTimeout(timer)
  }, [])

  const scrollToContact = () => {
    const contact = containerRef.current?.querySelector<HTMLElement>('#contact')
    contact?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: '100dvh', overflowY: 'auto', background: '#050505' }}
      onTouchStart={(event) => {
        const touch = event.touches[0]
        touchStartRef.current = { x: touch.clientX, y: touch.clientY }
      }}
      onTouchEnd={(event) => {
        const start = touchStartRef.current
        const touch = event.changedTouches[0]
        touchStartRef.current = null
        if (!start || start.x > 42) return
        const deltaX = touch.clientX - start.x
        const deltaY = Math.abs(touch.clientY - start.y)
        if (deltaX > 90 && deltaY < 70 && !transitioning) onReturn()
      }}
    >
      {showGestureHint && (
        <div className="mobile-gesture-hint" role="status">
          <span>→</span>
          Swipe right from the edge to go back
        </div>
      )}
      {/* ── Sticky header ─────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 px-6 md:px-10 flex items-center justify-between"
        style={{
          height: '64px',
          background: scrolled ? '#050505ee' : '#050505',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: `1px solid ${scrolled ? '#FAFAF80c' : 'transparent'}`,
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Back */}
        <button
          onClick={onReturn}
          disabled={transitioning}
          className="flex items-center gap-2 group"
          style={{ opacity: transitioning ? 0.4 : 1, transition: 'opacity 0.2s' }}
        >
          <span
            className="text-[10px] tracking-[0.28em] uppercase group-hover:opacity-100 transition-opacity"
            style={{ fontFamily: "'DM Mono', monospace", color: '#FAFAF850' }}
          >
            SELECTED WORK
          </span>
          <span style={{ color: '#FAFAF850', fontSize: '12px' }}>↑</span>
        </button>

        {/* Discipline nav */}
        <nav className="hidden md:flex items-center gap-6">
          {PANELS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { if (!transitioning && i !== disciplineIdx) onChangeDiscipline(i) }}
              className="text-[9px] tracking-[0.22em] uppercase transition-all duration-200"
              style={{
                fontFamily: "'DM Mono', monospace",
                color: i === disciplineIdx ? p.color : '#FAFAF832',
                borderBottom: i === disciplineIdx ? `1px solid ${p.color}` : '1px solid transparent',
                paddingBottom: '2px',
                cursor: transitioning ? 'default' : 'pointer',
              }}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={scrollToContact}
            className="text-[9px] tracking-[0.22em] uppercase transition-all duration-200"
            style={{
              fontFamily: "'DM Mono', monospace",
              color: '#FAFAF850',
              borderBottom: '1px solid transparent',
              paddingBottom: '2px',
            }}
          >
            CONTACT
          </button>
        </nav>
      </header>

      {/* ── Section title ─────────────────────────────────────── */}
      <div
        className="px-8 md:px-12 pt-12 pb-6"
        style={{ borderTop: `3px solid ${color}` }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h1
            className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-none anim-fadeinup"
            style={{ color, letterSpacing: '-0.03em' }}
          >
            {panel.label}
          </h1>
          <div
            className="anim-fadeinup"
            style={{ animationDelay: '0.15s', fontFamily: "'DM Mono', monospace" }}
          >
            <div className="text-[10px] tracking-[0.28em] uppercase" style={{ color: `${color}70` }}>
              {panel.num} / 04
            </div>
            <div
              className="mt-1 text-[9px] tracking-[0.18em] uppercase"
              style={{ color: '#FAFAF830' }}
            >
              {projects.length} Projects
            </div>
          </div>
        </div>
      </div>

      {/* ── Projects ──────────────────────────────────────────── */}
      {projects.map((project, i) => (
        <ProjectSection
          key={project.id}
          project={project}
          index={i}
          total={projects.length}
          color={color}
        />
      ))}

      {/* ── Contact ───────────────────────────────────────────── */}
      <section
        id="contact"
        className="px-8 md:px-12 py-20 md:py-28 scroll-mt-16"
        style={{ borderTop: `3px solid ${color}` }}
      >
        <div className="grid md:grid-cols-[1.25fr_0.75fr] gap-12 md:gap-20 items-end">
          <div>
            <div
              className="text-[10px] tracking-[0.3em] uppercase mb-5"
              style={{ fontFamily: "'DM Mono', monospace", color: `${color}90` }}
            >
              CONTACT / SAY HELLO
            </div>
            <h2
              className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.95]"
              style={{ color: '#FAFAF8', letterSpacing: '-0.04em' }}
            >
              Have an interesting
              <br />
              thing to make?
            </h2>
          </div>

          <div className="md:pb-2">
            <p className="text-base md:text-lg font-light leading-relaxed mb-8" style={{ color: '#FAFAF870' }}>
              Product systems, visual identities, illustration, writing, or something that sits awkwardly between all four.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                ['EMAIL', 'mailto:mojeikpeme@gmail.com'],
                ['LINKEDIN', 'https://www.linkedin.com/in/mojeikpeme100/'],
                ['BEHANCE', 'https://www.behance.net/mojeikpemeart'],
              ].map(([item, href]) => (
                <a
                  key={item}
                  href={href}
                  target={item === 'EMAIL' ? undefined : '_blank'}
                  rel={item === 'EMAIL' ? undefined : 'noreferrer'}
                  className="text-[10px] tracking-[0.22em] uppercase"
                  style={{ fontFamily: "'DM Mono', monospace", color }}
                >
                  {item} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <div
        className="px-8 md:px-12 py-16 flex items-center justify-between"
        style={{ borderTop: '1px solid #FAFAF80f' }}
      >
        <div>
          <div
            className="text-[9px] tracking-[0.3em] uppercase mb-2"
            style={{ fontFamily: "'DM Mono', monospace", color: '#FAFAF830' }}
          >
            MOJE IKPEME
          </div>
          <div
            className="text-[9px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "'DM Mono', monospace", color: '#FAFAF820' }}
          >
            Product designer, artist, writer & builder
          </div>
        </div>
        <button
          onClick={onReturn}
          disabled={transitioning}
          className="flex items-center gap-2"
          style={{ opacity: transitioning ? 0.4 : 1 }}
        >
          <div className="w-3 h-3 rounded-full bg-white opacity-40" />
          <span
            className="text-[9px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "'DM Mono', monospace", color: '#FAFAF840' }}
          >
            Back to top ↑
          </span>
        </button>
      </div>
    </div>
  )
}

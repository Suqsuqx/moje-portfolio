import { useState, useEffect, useCallback } from 'react'
import Hero from './Hero'
import SectionView from './Section'

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type DisciplineId = 'product' | 'graphic' | 'art' | 'writing'
export type Phase = 'loading' | 'hero' | 'section'
export type AssetType = 'image' | 'video' | 'motion' | 'gif'

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  role: string
  year: string
  areas: string
  url?: string
  linkLabel?: string
  longDescription?: string
  assets: Array<{ type: AssetType; label: string; src?: string; alt?: string }>
}

const imageAssets = (base: string, names: string[]) =>
  names.map((name) => `${base}/${encodeURIComponent(name)}`)

const numberedAssets = (base: string, prefix: string, numbers: number[]) =>
  imageAssets(base, numbers.map((number) => `${prefix} (${number}).png`))

// ─── PANELS ───────────────────────────────────────────────────────────────────

export const PANELS = [
  { id: 'product' as DisciplineId, label: 'PRODUCT DESIGN', num: '01', color: '#2EC9DC', text: '#050505', w: 30 },
  { id: 'graphic' as DisciplineId, label: 'GRAPHIC DESIGN', num: '02', color: '#FF302A', text: '#FAFAF8', w: 22 },
  { id: 'art' as DisciplineId, label: 'ART / ILLUSTRATION', num: '03', color: '#20D510', text: '#050505', w: 28 },
  { id: 'writing' as DisciplineId, label: 'WRITING', num: '04', color: '#FFE413', text: '#050505', w: 20 },
]

// cumulative widths: [0, 30, 52, 80] → centers: [15, 41, 66, 90]
export const BALL_CENTERS = [15, 41, 66, 90]

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export const PROJECTS: Record<DisciplineId, Project[]> = {
  product: [
    {
      id: 'stipendly',
      title: 'STIPENDLY',
      subtitle: 'Programmable liquidity control for your finances.',
      description: 'A fintech product for structuring irregular income into budgets that release spendable amounts as scheduled stipends.',
      role: 'Product / UX / Systems',
      year: '2024–2026',
      areas: 'Fintech / Behaviour / Infrastructure',
      url: 'https://stipendly.offlinebanker.com',
      longDescription: `Stipendly is a fintech product I founded and designed around a simple problem: income often arrives in large, irregular chunks, while expenses happen continuously. Instead of asking users to repeatedly exercise budgeting discipline, Stipendly lets them structure money into budgets that release spendable amounts as scheduled stipends.\n\nI designed the product end-to-end across onboarding, KYC, budgets, stipends, wallets, funding, withdrawals, transactions and account management, as well as the underlying rules that govern recurring funding, rollovers, payout schedules and failure recovery.\n\nThe core interaction is Budget → Stipend → Spendable destination: users decide how much money to commit, over what period, and how frequently they want access to it. Stipendly then turns budgeting from a static plan into an active cash-flow system.`,
      assets: [
        { type: 'image', label: 'IMAGE 01' },
        { type: 'video', label: 'VIDEO 02' },
        { type: 'image', label: 'IMAGE 03' },
        { type: 'motion', label: 'MOTION 04' },
      ],
    },
    {
      id: 'Fluna',
      title: 'FLUNA CAPITAL',
      subtitle: 'Making an investment platform easier to understand, trust and operate.',
      description: 'A redesign of Fluna Capital’s public experience and internal dashboard, grounded in user behaviour and product data.',
      role: 'Product / Strategy',
      year: '2024',
      areas: 'Education / Policy / SaaS',
      longDescription: `Fluna Capital needed a clearer experience across both its public-facing product and the tools used to manage customers internally. I worked as a consulting product designer to rethink the landing page and internal dashboard, using existing user behaviour and product data to identify where communication and hierarchy were breaking down.\n\nThe redesign focused on simplifying how Fluna explained its offering, strengthening the path from interest to signup, and creating a more structured backend experience for managing platform activity.\n\nThe result was a clearer conversion architecture and a more usable internal product, with signups increasing by 20% in the first month after the redesign.`,
      assets: [
        { type: 'image', label: 'IMAGE 01' },
        { type: 'image', label: 'IMAGE 02' },
        { type: 'video', label: 'VIDEO 03' },
      ],
    },
    {
      id: 'Poket by GradientFi',
      title: 'Poket by GradientFi',
      subtitle: 'A borderless wallet for managing payments across currencies.',
      description: 'GradientFI’s borderless wallet for managing payments across traditional currencies, stablecoins and crypto.',
      role: 'UX / Research / Systems',
      year: '2025',
      areas: 'Workforce / Economics / Mobile',
      longDescription: `Poket is GradientFI’s borderless wallet for managing payments across currencies, from traditional cash to stablecoins and crypto. The product explores how complex cross-border financial infrastructure can be reduced into a simple, intuitive everyday wallet experience.`,
      assets: [
        { type: 'image', label: 'IMAGE 01' },
        { type: 'motion', label: 'MOTION 02' },
        { type: 'image', label: 'IMAGE 03' },
        { type: 'video', label: 'VIDEO 04' },
      ],
    },
    {
      id: 'Bare',
      title: 'Bare',
      subtitle: 'A more useful skincare experience for people with brown and Black skin.',
      description: 'A personalised skincare recommendation, consultant and community platform designed for brown and Black skin.',
      role: 'Product / Service Design',
      year: '2025–2026',
      areas: 'Commerce / Hospitality / Growth',
      longDescription: `BARE was a skincare recommendation and regimen platform built around the reality that mainstream skincare tools often underserve darker skin tones. The product combined personalised recommendations with access to products, consultants and community.\n\nI led product design work across research, onboarding and the skincare quiz, then expanded the experience with community features, currency conversion, reporting tools and distinct dashboards for customers, merchants and consultants.\n\nA major focus was reducing friction in the recommendation journey. The redesigned flow brought quiz completion to under five minutes, introduced save-progress and automatic account creation, and helped increase signup and quiz completion by 30% in the first month.`,
      assets: [
        { type: 'image', label: 'IMAGE 01' },
        { type: 'image', label: 'IMAGE 02' },
        { type: 'video', label: 'VIDEO 03' },
        { type: 'motion', label: 'MOTION 04' },
        { type: 'image', label: 'IMAGE 05' },
      ],
    },
    {
      id: 'halo',
      title: 'HALO',
      subtitle: 'Selected product interface explorations.',
      description: 'A collection of interface studies and product flows across mobile and responsive experiences.',
      role: 'Product / UI / Interaction',
      year: 'Selected work',
      areas: 'Mobile / Interface / Systems',
      assets: [],
    },
    {
      id: 'suqi-product',
      title: 'SUQIEATS',
      subtitle: 'Designing the customer experience and operating system behind a restaurant.',
      description: 'The customer experience and internal operating system connecting ordering, restaurant operations and community programmes.',
      role: 'Product / UI',
      year: 'Selected work',
      areas: 'Product / Mobile / Interaction',
      longDescription: `SuqiEats started as a direct ordering experience but grew into a broader product system for running the food business around it. I designed both sides of that system: the experience customers use to discover, order and engage with Suqi’s, and the internal tools needed to actually fulfil and manage those interactions.\n\nThe product expanded across ordering, POS, CRM, kitchen operations, dispatch, reservations, memberships, patron programmes and analytics, with workflows designed across customer, staff and administrator roles.\n\nRather than treating the website, restaurant operations and community programmes as separate products, SuqiEats became the connective layer between them — a lightweight restaurant operating system built around direct customer relationships.`,
      assets: [],
    },
  ],
  graphic: [
    {
      id: 'illustrated-tracks',
      title: 'ILLUSTRATED TRACKS',
      subtitle: 'Album artwork for independent musicians.',
      description: 'Album covers, lyric booklets, and visual identities for artists across afrobeats, jazz, and experimental music — making each release feel like an event.',
      role: 'Art Direction / Illustration',
      year: '2023–2024',
      areas: 'Music / Publishing / Print',
      assets: [
        { type: 'image', label: 'IMAGE 01' },
        { type: 'image', label: 'IMAGE 02' },
        { type: 'image', label: 'IMAGE 03' },
        { type: 'image', label: 'IMAGE 04' },
      ],
    },
    {
      id: 'stakeet',
      title: 'STAKEET',
      subtitle: 'A bold social campaign system.',
      description: 'A coordinated series of social graphics built as a consistent, high-energy campaign.',
      role: 'Brand / Print / Digital',
      year: '2022–2023',
      areas: 'Culture / Events / Publishing',
      assets: [
        { type: 'image', label: 'IMAGE 01' },
        { type: 'video', label: 'VIDEO 02' },
        { type: 'image', label: 'IMAGE 03' },
      ],
    },
    {
      id: 'brand-systems',
      title: 'SELECTED BRAND SYSTEMS',
      subtitle: 'Visual identities across three continents.',
      description: 'A curated selection of brand identities for ventures in Lagos, London, and Vancouver — fintech, food, and professional services.',
      role: 'Brand Strategy / Design',
      year: '2021–2025',
      areas: 'Identity / Strategy / Systems',
      assets: [
        { type: 'image', label: 'IMAGE 01' },
        { type: 'image', label: 'IMAGE 02' },
        { type: 'motion', label: 'MOTION 03' },
        { type: 'image', label: 'IMAGE 04' },
        { type: 'image', label: 'IMAGE 05' },
      ],
    },
    {
      id: 'onebank', title: 'ONEBANK', subtitle: 'Social campaign design.',
      description: 'A selected social-media composition for OneBank.', role: 'Graphic Design', year: 'Selected work', areas: 'Campaign / Social', assets: [],
    },
    {
      id: 'suqi-graphic', title: 'SUQI', subtitle: 'Brand and campaign explorations.',
      description: 'A collection of campaign layouts and brand compositions for Suqi.', role: 'Brand / Graphic Design', year: 'Selected work', areas: 'Brand / Campaign / Social', assets: [],
    },
  ],
  art: [
    {
      id: 'editorial-illustration',
      title: 'EDITORIAL ILLUSTRATION',
      subtitle: 'Commissions on culture, economics and identity.',
      description: 'Long-form editorial illustrations for publications covering African tech ecosystems, global health policy, and questions of digital citizenship.',
      role: 'Illustration / Art Direction',
      year: '2022–2026',
      areas: 'Editorial / Digital / Print',
      assets: [
        { type: 'image', label: 'IMAGE 01' },
        { type: 'image', label: 'IMAGE 02' },
        { type: 'image', label: 'IMAGE 03' },
        { type: 'image', label: 'IMAGE 04' },
      ],
    },
    {
      id: 'figures-faces',
      title: 'FIGURES & FACES',
      subtitle: 'Portrait studies across mixed media.',
      description: 'Figurative and portrait work in graphite, digital, and collage — exploring questions of likeness, memory, and the politics of representation.',
      role: 'Illustration / Mixed Media',
      year: '2020–2026',
      areas: 'Portrait / Figure / Texture',
      assets: [
        { type: 'image', label: 'IMAGE 01' },
        { type: 'image', label: 'IMAGE 02' },
        { type: 'image', label: 'IMAGE 03' },
      ],
    },
    {
      id: 'worlds-experiments',
      title: 'WORLDS / EXPERIMENTS',
      subtitle: 'World-building and speculative environments.',
      description: 'Speculative environments, motion studies, and imagined cities built as visual essays about near-future African urbanism.',
      role: 'Concept / Motion / World-building',
      year: '2023–2026',
      areas: 'Speculative / Motion / Narrative',
      assets: [
        { type: 'video', label: 'VIDEO 01' },
        { type: 'motion', label: 'MOTION 02' },
        { type: 'image', label: 'IMAGE 03' },
        { type: 'video', label: 'VIDEO 04' },
      ],
    },
    {
      id: 'flat-illustrations', title: 'FLAT WEB ILLUSTRATIONS', subtitle: 'Illustration studies for digital products.',
      description: 'A compact collection of web-focused flat illustration work.', role: 'Illustration', year: 'Selected work', areas: 'Web / Editorial / Digital', assets: [],
    },
  ],
  writing: [
    {
      id: 'under-the-skin', title: 'UNDER THE SKIN', subtitle: 'So men do not remember the violence that broke this world in their birthing, or the one that drives them.',
      description: 'Which is what brings the boy to the girl; or at least to the water…', role: 'Fiction', year: 'Selected writing', areas: 'Story / Myth / Memory',
      url: 'https://medium.com/@mojeikpeme/when-the-two-blind-gods-of-the-beginning-create-this-world-out-of-their-squabbles-other-things-348fa90caab6', linkLabel: 'Read more', assets: [],
    },
    {
      id: 'really-tired', title: 'YOU MUST BE REALLY TIRED', subtitle: '“Yes o, sorry my dear.” She pulls out cash from her bag and gives him before pulling herself out of the car.',
      description: 'That is what she is, tired. She wants to go home and scrub herself till her skin turns to the burnt brown it originally is, until she is herself again…', role: 'Fiction', year: 'Selected writing', areas: 'Story / Interior life',
      url: 'https://medium.com/@mojeikpeme/you-must-be-really-tired-f59320ab01f6', linkLabel: 'Read more', assets: [],
    },
    {
      id: 'stranger', title: 'STRANGER', subtitle: 'In the whirlwind, the truth overtakes you and brings strength.',
      description: 'You are just born into this world, not new to it. Before you opened your eyes in this body, dropped head first from a bridge, heading to death, you were awake…', role: 'Fiction', year: 'Selected writing', areas: 'Story / Speculative fiction',
      url: 'https://medium.com/@ArtsandAfrica/stranger-8dc6a3e3302f', linkLabel: 'Read more', assets: [],
    },
    {
      id: 'tell-me-something-happy', title: 'TELL ME SOMETHING HAPPY', subtitle: 'But you do. On Monday, you’re up before 5am. By 6am you’re at the bus stop at Ebute Meta.',
      description: 'There are no buses, only a stretch of people snaking down into the street you have just come from. It is almost fifteen minutes past 7 when the first bus arrives, a man hanging from the door, his voice like a cut in the morning air: Ikeja Iyana paja!…', role: 'Fiction', year: 'Selected writing', areas: 'Story / City / Work',
      url: 'https://lolwe.org/tell-me-something-happy/', linkLabel: 'Read more', assets: [],
    },
  ],
}

const REAL_ASSETS: Record<string, string[]> = {
  stipendly: [
    '/assets/product/stipendly/hero.gif',
    '/assets/product/stipendly/app.png',
    '/assets/product/stipendly/calculator.gif',
    '/assets/product/stipendly/2.gif',
  ],
  'Fluna': [
    ...numberedAssets('/assets/product/fluna', 'fluna', [1, 2, 3, 4]),
  ],
  'Poket by GradientFi': [
    '/assets/product/poket/Image.png',
    '/assets/product/poket/Image-1.png',
    '/assets/product/poket/Image-2.png',
    '/assets/product/poket/Image-3.png',
  ],
  Bare: [
    '/assets/product/Bare/1.png',
    '/assets/product/Bare/2.png',
    '/assets/product/Bare/3.png',
    '/assets/product/Bare/4.png',
  ],
  halo: [
    '/assets/product/halo/Image.png',
    '/assets/product/halo/Image-1.png',
    '/assets/product/halo/Image-6.png',
    '/assets/product/halo/Image-7.png',
    '/assets/product/halo/Image-9.png',
    '/assets/product/halo/Image-10.png',
    '/assets/product/halo/20220208_072827.png',
  ],
  'suqi-product': imageAssets('/assets/product/suqi', ['1.png', '2.png', '3.png', '4.png']),
  'illustrated-tracks': [
    '/assets/graphic/ilustratedtracks/Yamaha%20YZR-M1.jpg',
    '/assets/graphic/ilustratedtracks/1.png',
    '/assets/graphic/ilustratedtracks/download%20(1).png',
    '/assets/graphic/ilustratedtracks/2.gif',
    '/assets/graphic/ilustratedtracks/3.png',
    '/assets/graphic/ilustratedtracks/5.png',
    '/assets/graphic/ilustratedtracks/Lewis%20Hamilton%20(1).jpg',
    '/assets/graphic/ilustratedtracks/McLarenMP4-23_LewisHamilton-Mockup0.jpg',
  ],
  stakeet: [
    '/assets/graphic/stakeet/1.png',
    '/assets/graphic/stakeet/2.png',
    '/assets/graphic/stakeet/3.png',
    '/assets/graphic/stakeet/4.png',
    '/assets/graphic/stakeet/5.png',
  ],
  'brand-systems': [
    '/assets/graphic/general/ake.png',
    '/assets/graphic/general/big.png',
    '/assets/graphic/general/halo.png',
    ...numberedAssets('/assets/graphic/general', 'graphic', [1, 5, 6, 7, 9, 10, 11, 13, 15, 16, 17, 18]),
  ],
  onebank: ['/assets/graphic/onebank/onebanksocial%20media.png'],
  'suqi-graphic': [
    '/assets/graphic/suqi/4.png',
    '/assets/graphic/suqi/5.png',
    '/assets/graphic/suqi/Artboard%2011-2.png',
    '/assets/graphic/suqi/Artboard%209.png',
  ],
  'editorial-illustration': [
    '/assets/art/editorial/editorial-illustration-.png',
    ...numberedAssets('/assets/art/editorial', 'editorial-illustration-', [4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]),
  ],
  'figures-faces': numberedAssets('/assets/art/faces', 'figures-faces-', [1, 2, 3, 4, 5]),
  'worlds-experiments': numberedAssets('/assets/art/worlds', 'worlds-experiments-', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  'flat-illustrations': imageAssets('/assets/art/illustrations', ['flat web illustrations-01.png', 'pages__3.png', 'pages__70.png']),
  'under-the-skin': ['/assets/writing/skin.webp'],
  'really-tired': ['/assets/writing/tired.webp'],
  stranger: ['/assets/writing/stranger.webp'],
  'tell-me-something-happy': ['/assets/writing/happy.png'],
}

const getAssetType = (src: string): AssetType => {
  if (src.endsWith('.mp4')) return 'video'
  if (src.endsWith('.gif')) return 'gif'
  return 'image'
}

Object.values(PROJECTS).flat().forEach((project) => {
  const paths = REAL_ASSETS[project.id]
  if (!paths) return
  project.assets = paths.map((src, index) => ({
    type: getAssetType(src),
    label: `${getAssetType(src) === 'video' ? 'VIDEO' : getAssetType(src) === 'gif' ? 'MOTION' : 'IMAGE'} ${String(index + 1).padStart(2, '0')}`,
    src,
    alt: `${project.title} asset ${index + 1}`,
  }))
})

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [ballX, setBallX] = useState(-50)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Start ball rolling
    const t1 = setTimeout(() => setBallX(window.innerWidth + 50), 80)
    // Fade out
    const t2 = setTimeout(() => setFadeOut(true), 2400)
    // Complete
    const t3 = setTimeout(() => onComplete(), 2900)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: '#050505',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Name */}
      <div className="text-center mb-16 anim-fadein">
        <div
          className="text-xs tracking-[0.35em] uppercase mb-3"
          style={{ fontFamily: "'DM Mono', monospace", color: '#FAFAF860' }}
        >
          MOJE IKPEME
        </div>
        <div
          className="text-[10px] tracking-[0.25em] uppercase"
          style={{ fontFamily: "'DM Mono', monospace", color: '#FAFAF830' }}
        >
          Selected Work
        </div>
      </div>

      {/* Ball track */}
      <div className="relative w-full" style={{ height: '48px' }}>
        {/* Rail */}
        <div
          className="absolute left-0 right-0"
          style={{ top: '50%', height: '1px', background: '#FAFAF812' }}
        />
        {/* Ball */}
        <div
          className="absolute rounded-full bg-white"
          style={{
            width: '28px',
            height: '28px',
            left: `${ballX}px`,
            top: '50%',
            transform: 'translateY(-50%)',
            transition: `left 2.35s cubic-bezier(0.4, 0, 0.35, 1)`,
            animation: 'roll 0.32s linear infinite',
            boxShadow: '0 0 16px 4px rgba(255,255,255,0.12)',
          }}
        />
      </div>

      {/* Loading label */}
      <div
        className="mt-10 text-[9px] tracking-[0.45em] uppercase anim-fadein"
        style={{
          fontFamily: "'DM Mono', monospace",
          color: '#FAFAF825',
          animationDelay: '0.3s',
        }}
      >
        Loading
      </div>
    </div>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function App() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [disciplineIdx, setDisciplineIdx] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [overlayExpanded, setOverlayExpanded] = useState(false)
  const [overlayColor, setOverlayColor] = useState('#2EC9DC')

  const runTransition = useCallback(
    async (color: string, switchFn: () => void, durationIn = 550, durationOut = 480) => {
      setOverlayColor(color)
      setOverlayVisible(true)
      await sleep(30)
      setOverlayExpanded(true)
      await sleep(durationIn)
      switchFn()
      await sleep(80)
      setOverlayExpanded(false)
      await sleep(durationOut)
      setOverlayVisible(false)
      setTransitioning(false)
    },
    [],
  )

  const handleDisciplineSelect = useCallback(
    async (idx: number) => {
      if (transitioning) return
      setTransitioning(true)
      setDisciplineIdx(idx)
      await runTransition(PANELS[idx].color, () => setPhase('section'))
    },
    [transitioning, runTransition],
  )

  const handleReturn = useCallback(async () => {
    if (transitioning) return
    setTransitioning(true)
    await runTransition(PANELS[disciplineIdx].color, () => setPhase('hero'))
  }, [transitioning, disciplineIdx, runTransition])

  const handleChangeDiscipline = useCallback(
    async (idx: number) => {
      if (transitioning || idx === disciplineIdx) return
      setTransitioning(true)
      setDisciplineIdx(idx)
      await runTransition(PANELS[idx].color, () => {})
    },
    [transitioning, disciplineIdx, runTransition],
  )

  return (
    <div
      className="relative"
      style={{ background: '#050505', minHeight: '100dvh', overflow: phase === 'hero' ? 'visible' : 'hidden' }}
    >
      {/* Loading screen */}
      {phase === 'loading' && (
        <LoadingScreen onComplete={() => setPhase('hero')} />
      )}

      {/* Hero */}
      {phase === 'hero' && (
        <Hero
          currentDisciplineIdx={disciplineIdx}
          onSelect={handleDisciplineSelect}
          transitioning={transitioning}
          visible={phase === 'hero'}
        />
      )}

      {/* Section */}
      {phase === 'section' && (
        <SectionView
          disciplineIdx={disciplineIdx}
          onReturn={handleReturn}
          onChangeDiscipline={handleChangeDiscipline}
          transitioning={transitioning}
        />
      )}

      {/* Transition overlay */}
      {overlayVisible && (
        <div
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            background: overlayColor,
            transform: `scaleY(${overlayExpanded ? 1 : 0})`,
            transformOrigin: 'top',
            transition: overlayExpanded
              ? 'transform 0.55s cubic-bezier(0.76, 0, 0.24, 1)'
              : 'transform 0.48s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        />
      )}
    </div>
  )
}

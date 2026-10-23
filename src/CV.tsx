const experience = [
  { company: 'Sterling Bank', role: 'Designer → Growth & Product Marketing', date: '2022–2026', copy: 'Connected visual design, product communication and growth across financial services. Created campaign and social assets that made banking products easier to understand.' },
  { company: 'Stipendly', role: 'Founder / Product Designer & Builder', date: '2024–Present', copy: 'Designed and built a product that turns budgets into scheduled spending money. Own the experience across onboarding, identity checks, funding, payouts and wallets, including the rules and recovery states behind each journey.' },
  { company: 'Halo Capital', role: 'Lead Product Designer / Art Director', date: '2021', copy: 'Led the mobile savings and investment experience from research and information architecture to prototypes, a shared design system and engineering handoff.' },
  { company: 'Ake Arts & Book Festival', role: 'Art Director', date: '2019', copy: 'Developed the visual expression of a literary and cultural festival across its design materials.' },
]

const engagements = [
  ['BARE Skincare', 'Led product design across onboarding, personalised recommendations and customer, merchant and consultant journeys.'],
  ['Fluna Capital', 'Redesigned the public website and internal dashboard to clarify the offer and simplify platform operations.'],
  ['Illustrated Tracks', 'Create motorsport artwork and campaign visuals, with hands-on responsibility across design, marketing and store operations.'],
  ['Paystack', 'Collaborated on card design in 2022.'],
]

export default function CV() {
  return (
    <main className="cv-page">
      <header className="hero-topline cv-topline">
        <a href="#" className="portfolio-cv-link">← SELECTED WORK</a>
        <nav className="portfolio-links" aria-label="CV actions">
          <button type="button" onClick={() => window.print()}>PRINT CV</button>
          <a href="mailto:mojeikpeme@gmail.com">CONTACT ↗</a>
        </nav>
      </header>
      <div className="cv-content">
        <section className="cv-intro">
          <div><div className="cv-label">CV / PRODUCT DESIGN</div><h1>MOJE<br />IKPEME<span>.</span></h1></div>
          <div className="cv-summary"><h2>Complex products.<br />Clear experiences.</h2><p>Product designer and builder with six years across fintech, payments and commerce. I work from research and product definition through interaction design, design systems and implementation.</p><p>My background in art direction, writing and growth connects product decisions with how people understand, trust and use what we build.</p><a href="mailto:mojeikpeme@gmail.com">mojeikpeme@gmail.com ↗</a><p className="cv-location">Nigeria · Open to remote roles</p></div>
        </section>
        <section className="cv-section" aria-labelledby="experience-title">
          <h2 id="experience-title">EXPERIENCE</h2>
          <div>{experience.map(item => <article className="cv-row" key={item.company}><div className="cv-date">{item.date}</div><div><h3>{item.company}</h3><div className="cv-role">{item.role}</div><p>{item.copy}</p></div></article>)}</div>
        </section>
        <section className="cv-section" aria-labelledby="engagements-title">
          <h2 id="engagements-title">SELECTED<br />ENGAGEMENTS</h2>
          <div>{engagements.map(([name, copy]) => <article className="cv-row cv-row--compact" key={name}><h3>{name}</h3><p>{copy}</p></article>)}</div>
        </section>
        <section className="cv-section" aria-labelledby="practice-title">
          <h2 id="practice-title">PRACTICE</h2>
          <div className="cv-practice"><article><h3>Product & design</h3><p>Product strategy, user research, information architecture, interaction design, prototyping, design systems, visual design and art direction.</p></article><article><h3>Tools & implementation</h3><p>Figma, React, Next.js, TypeScript, Node.js, Webflow and FlutterFlow.</p></article><article><h3>Education</h3><p>English & Literature<br />University of Calabar</p></article></div>
        </section>
        <footer className="cv-footer"><h2>Let’s build<br />what’s next.</h2><div className="portfolio-links"><a href="mailto:mojeikpeme@gmail.com?subject=Design%20opportunity">EMAIL ME ↗</a><a href="https://www.linkedin.com/in/mojeikpeme100/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="#">VIEW WORK ↗</a></div></footer>
      </div>
    </main>
  )
}

Create a polished, responsive personal portfolio website prototype inspired by the visual language of the Archer title sequence: stark black background, saturated rectangular colour panels, black human silhouettes, graphic composition, restrained typography, and a single white ball used as the main navigation/transition device.

Use the attached reference image as the basis for the opening composition.

## Core concept

The homepage hero is not a traditional navigation menu. It is an interactive title-sequence-style selector built from four large coloured panels:

* Cyan / blue = Product Design
* Red = Graphic Design
* Green = Art / Illustration
* Yellow = Writing

The four panels should sit horizontally across the hero on desktop, with irregular but balanced widths so the composition feels editorial rather than like four equal UI cards.

Keep the background pure or near-black.

Add elegant black silhouette figures inside or partially overlapping the coloured panels, inspired by Archer's opening titles. These should communicate each discipline without becoming literal stock illustrations.

Examples:

* Product Design: standing figure holding a phone/tablet, interacting with interface diagrams
* Graphic Design: figure holding a poster, camera, print sheet or working at an easel
* Art / Illustration: expressive drawing/painting pose
* Writing: seated or standing figure reading, typing or holding pages

The silhouettes should feel like one coherent visual system.

Do not make this look like a conventional SaaS website.

---

# HERO

The opening screen should occupy approximately 100vh.

At the top or lower-left, keep typography sparse:

MOJE IKPEME / SELECTED WORK

Supporting text can be minimal:

Product designer, artist, writer & builder.

The four colour panels are the main visual focus.

Do not add large hero paragraphs, buttons or generic portfolio CTAs.

## White ball navigation

A single white ball sits along an invisible horizontal rail immediately above the four coloured sections.

The ball is an important character in the website.

Initial state:

* Ball rests slightly above the first / Product Design panel.
* It should cast almost no shadow.
* Approximately 18–28px desktop size.
* Crisp white against the black background.
* Slight physical weight/bounce should be implied through motion.

The user can hover over any coloured discipline.

On hover:

1. The relevant panel subtly expands or shifts.
2. Its silhouette reacts slightly through parallax or movement.
3. The discipline name becomes visible:
   PRODUCT DESIGN
   GRAPHIC DESIGN
   ART / ILLUSTRATION
   WRITING
4. The white ball rolls horizontally along its rail until it sits above the hovered discipline.

Movement should feel physical rather than like a normal tab indicator.

Use easing that suggests momentum:
accelerate → coast → softly settle.

Do not instantly teleport the ball.

---

# SELECTING A DISCIPLINE

When the user clicks a discipline, use the ball to create the transition.

Example:

The user clicks Product Design.

The white ball is above the cyan Product Design panel.

Animation sequence:

1. Ball gives a tiny anticipatory movement/bounce.
2. Ball drops downward into the cyan panel.
3. It falls vertically through the panel.
4. As it falls, the panel stretches or opens downward.
5. The cyan colour expands to temporarily fill the viewport.
6. The hero transitions into the Product Design section.
7. The white ball continues falling through the transition and appears at the beginning of the next section.

The effect should feel like the ball has physically opened the category.

Do not fade to a new page.

It should be one continuous spatial transition.

---

# SELECTING ANOTHER PANEL

The ball must first travel to the selected discipline.

Example: Art / Illustration.

If the ball is currently over Product Design and the user clicks the green Art / Illustration panel:

1. Ball rolls right.
2. Passes over Graphic Design.
3. Arrives above Art / Illustration.
4. Slightly overshoots and settles.
5. Drops vertically into the green panel.
6. Green expands downward.
7. Art / Illustration projects are revealed.

This interaction is the signature navigation behavior of the portfolio.

The timing should feel playful, deliberate and cinematic.

Target transition duration:
around 800ms–1400ms total.

---

# PROJECT SECTION STRUCTURE

Each discipline opens into its own project section.

Each discipline contains exactly three projects.

Structure:

## Product Design

1. Stipendly
2. Fluna
3. Poket by GradientFi

## Graphic Design

1. Illustrated Tracks
2. Ake Festival
3. Selected Brand Systems

## Art / Illustration

1. Editorial Illustration
2. Figures & Faces
3. Worlds / Experiments

## Writing

1. Now
2. Under the Skin
3. Product / Design Notes

Each project needs space for 3–5 media assets.

Media may later be:

* image
* video
* GIF
* animated prototype
* illustration
* screen recording

For now create polished media placeholders that preserve the layout.

Do not use generic grey placeholder rectangles.

Instead create stylised placeholders using:

* discipline colour
* black
* off-white
* subtle labels such as IMAGE 01 / VIDEO 02 / MOTION 03

---

# PROJECT PRESENTATION

When a discipline opens, preserve the graphic language of the hero.

Example Product Design:

Large cyan field transitions into a mostly black project page.

Header:

PRODUCT DESIGN
01 / 04

Then show projects using large editorial compositions.

Avoid conventional three-column portfolio cards.

Each project can occupy most of the viewport.

Example layout:

STIPENDLY
Programmable cash-flow systems.

Large media composition.

Small metadata:

Role
Product / UX / Systems

Year
2024–2026

Areas
Fintech / Behaviour / Infrastructure

Then additional media can alternate:

* full-width
* two-column
* overlapping
* narrow vertical
* cinematic 16:9

Make the portfolio feel art-directed rather than templated.

---

# WHITE BALL INSIDE THE WEBSITE

Continue using the white ball after the hero.

Possible roles:

* section progress marker
* follows a vertical line at the edge of the viewport
* drops between project sections
* appears beside project numbers
* rolls horizontally when switching disciplines
* falls at the bottom of one section to reveal the next

Keep usage restrained.

It should feel like a recurring visual motif, not a cursor replacement.

---

# RETURNING TO DISCIPLINE NAVIGATION

Include a persistent but minimal control:

SELECTED WORK ↑

or clicking the current discipline label can return to the hero.

When returning:

1. viewport moves upward
2. colour briefly occupies the screen
3. white ball rises back into its horizontal rail
4. four panels reconstruct
5. ball rests above the previously selected category

Maintain spatial continuity.

---

# VISUAL DIRECTION

Use:

* black: #050505
* cyan: approximately #2EC9DC
* red: approximately #FF302A
* green: approximately #20D510
* yellow: approximately #FFE413
* white/off-white for typography

Typography should be clean and modern rather than copying the Archer logo font.

Use something similar to:

* Neue Montreal
* Helvetica Neue
* Inter
* Arial
* Space Grotesk

Mix:

* tiny uppercase labels with wide tracking
* very large headlines
* sparse supporting copy

The animation and compositions carry the personality.

---

# MICRO-INTERACTIONS

Add:

### Panel hover

Panel moves vertically by roughly 6–12px.

Silhouette shifts by a few pixels.

Category title reveals.

### Ball hover movement

Ball tracks category selection.

It should move smoothly between anchor positions.

### Cursor

Default arrow cursor is fine.

On project media:
VIEW PROJECT

On hero panel:
SELECT

Do not create an oversized novelty cursor.

### Project assets

Images scale by approximately 1.02 on hover.

Video placeholders reveal:
PLAY ↗

### Scroll

Use smooth but restrained motion.

Sections may reveal via:

* clipping
* sliding
* vertical mask
* colour wipes

Avoid generic fade-up animations everywhere.

---

# SILHOUETTES

Silhouettes are essential.

They should be black cutout human forms occupying each coloured field.

Aim for expressive poses rather than static corporate figures.

Let some bodies break the boundaries of their coloured rectangles.

Use asymmetric framing.

Some panels may only show:

* profile
* torso
* hand
* leg
* head

This fragmentation should directly reference the visual energy of Archer's title sequence without reproducing specific characters.

Do not use copyrighted Archer character likenesses.

Create original silhouettes.

---

# RESPONSIVE BEHAVIOUR

Desktop:
Four panels horizontally.

Tablet:
Still attempt horizontal composition where possible.

Mobile:
Turn panels into a vertically stacked cinematic sequence.

The white ball moves vertically instead of horizontally.

Example mobile flow:

○
PRODUCT DESIGN panel
↓
GRAPHIC DESIGN
↓
ART / ILLUSTRATION
↓
WRITING

When tapped, the ball drops through the selected block into its project section.

Preserve the physical interaction concept rather than simply turning it into ordinary mobile navigation.

---

# IMPORTANT

This should be a working interactive prototype, not merely a visual mockup.

Implement:

* clickable discipline panels
* hover behavior
* animated white-ball navigation
* category selection
* ball-drop transition
* project-section reveal
* return-to-hero interaction
* responsive behaviour
* project-detail interactions

Use realistic transition timing and state management.

Prioritise polish of the hero and white-ball transition before adding unnecessary secondary UI.

The desired feeling is:

an Archer title sequence became the navigation system for a serious multidisciplinary designer's portfolio.

Fun and cinematic, but still neat enough that a recruiter or client can immediately understand the work.

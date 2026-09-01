Yes. Since you want **frontend only**, I would make it as a polished **React Native educational/play app for a 1-year-old**, with no backend, authentication, API, or database server.

Below is a **complete master prompt**, divided into phases so you can give it to another AI and build the project step-by-step.

# 🧸 Project: Little Explorer

**Goal:** Build a beautiful, safe, offline-first interactive learning app for a 1-year-old child.

**Platform:** React Native
**Backend:** None
**API:** None
**Authentication:** None
**Database:** None
**Internet:** Not required
**Storage:** Local device storage only
**Target:** Both Android and iOS (Full cross-platform native mobile app).

---

# PHASE 0 — Give AI the Master Instruction

Give this first:

# MASTER PROJECT INSTRUCTION — LITTLE EXPLORER

You are a senior React Native engineer, UI/UX designer, animation designer, and children's educational app developer.

Build a production-quality React Native mobile application called **Little Explorer**.

## IMPORTANT

This is a frontend-only application.

Do NOT create:

* Backend
* REST API
* GraphQL
* Authentication
* User registration
* Login
* Server database
* Cloud database
* Firebase
* Supabase
* Express.js
* Node.js backend
* Admin panel
* Payment system
* Analytics backend

Everything must work locally on the device.

Use local assets and local storage where necessary.

---

# TARGET USER

The primary user is a 1-year-old child.

Therefore the application must NOT behave like a normal productivity or business application.

The experience should be:

* Simple
* Colorful
* Friendly
* Playful
* Interactive
* Safe
* Calm
* Easy to understand
* Extremely large touch targets
* Minimal text
* Lots of visual feedback
* Lots of sound feedback
* Gentle animations

The child should be able to use most features without reading.

---

# CORE EXPERIENCE

The main interaction loop should be:

SEE → TOUCH → ANIMATION → SOUND → WORD → REACTION

Example:

Child sees a dog.

Child touches dog.

Dog animates.

App says:

"Dog!"

Dog sound plays:

"Woof Woof!"

Then the child can touch it again and repeat the interaction.

---

# DESIGN PRINCIPLES

Use:

* Large cards
* Large illustrations
* Rounded corners
* Soft shadows
* Friendly typography
* High contrast
* Large touch targets
* Simple navigation
* Gentle animations
* Child-friendly illustrations
* Clear visual hierarchy
* Consistent design system

Avoid:

* Tiny buttons
* Dense screens
* Long paragraphs
* Complex menus
* Dark/serious interfaces
* Excessive UI controls
* Ads
* External links
* Social media
* Purchases
* Notifications
* Gamification based on pressure or competition

---

# APP SECTIONS

The application should eventually contain:

1. Home
2. Animals
3. Fruits
4. Colors
5. Numbers
6. ABC
7. Vehicles
8. My Body
9. My Family
10. Sounds
11. Songs
12. Discovery World
13. Simple Games
14. Parent Area
15. Settings

Build these progressively according to the phases below.

---

# TECHNICAL REQUIREMENTS

Use React Native with TypeScript.

Use reusable components.

Use a clean folder structure.

Prefer simple, maintainable architecture over unnecessary complexity.

Create:

* Screens
* Components
* Data files
* Asset management
* Audio management
* Animation utilities
* Theme system
* Local storage utilities
* Navigation
* Constants
* Types

All educational content should be data-driven.

For example:

Animal data should NOT be hardcoded separately inside every screen.

Create structured data such as:

Animal {
id,
name,
displayName,
image,
sound,
pronunciation,
description,
color,
animationType
}

The same principle should be used for:

* Fruits
* Colors
* Numbers
* Letters
* Vehicles
* Body parts
* Family members
* Sounds

---

# IMPORTANT DEVELOPMENT RULE

Do NOT attempt to build the entire application in one step.

Build it phase-by-phase.

After completing each phase:

1. Check the project for TypeScript errors.
2. Check navigation.
3. Check imports.
4. Check asset paths.
5. Check animations.
6. Check audio handling.
7. Check responsive layout.
8. Check Android compatibility.
9. Fix errors before moving to the next phase.

Do not remove working functionality from previous phases.

Every new phase must preserve previous functionality.

---

# QUALITY STANDARD

The final result should feel like a professionally designed children's application rather than a developer demo.

Focus heavily on:

* UX
* Animation
* Touch interaction
* Sound
* Visual feedback
* Performance
* Consistency
* Accessibility
* Offline functionality
* Clean code
* Reusable components

Do not use placeholder screens in the final implementation.

When real assets are unavailable, create a clean asset abstraction so they can easily be replaced later.

Never use copyrighted assets without permission.

Continue with the phases in order.

---

# PHASE 1 — Project Setup

Give AI:

# PHASE 1 — PROJECT FOUNDATION

Set up the Little Explorer React Native TypeScript project.

## Requirements

Create a clean production-ready project structure.

Recommended structure:

src/
├── assets/
│   ├── images/
│   ├── sounds/
│   ├── animations/
│   └── fonts/
│
├── components/
│   ├── Button/
│   ├── CategoryCard/
│   ├── LearningCard/
│   ├── AnimatedCharacter/
│   ├── SoundButton/
│   ├── BackButton/
│   └── ProgressIndicator/
│
├── screens/
│   ├── Home/
│   ├── Animals/
│   ├── Fruits/
│   ├── Colors/
│   ├── Numbers/
│   ├── ABC/
│   ├── Vehicles/
│   ├── Body/
│   ├── Family/
│   ├── Sounds/
│   ├── Songs/
│   ├── Discovery/
│   ├── Games/
│   ├── Parents/
│   └── Settings/
│
├── navigation/
├── data/
├── hooks/
├── services/
├── storage/
├── theme/
├── types/
├── utils/
└── constants/

## Navigation

Create the initial navigation structure.

Home should navigate to:

* Animals
* Fruits
* Colors
* Numbers
* ABC
* Vehicles
* My Body
* My Family
* Sounds
* Songs
* Discovery
* Games
* Parent Area
* Settings

## Theme

Create a centralized theme containing:

* Typography
* Spacing
* Border radius
* Shadows
* Font sizes
* Icon sizes
* Animation durations

Do not scatter arbitrary styling values throughout the application.

## Important

Run TypeScript checks.

Fix all errors.

Make sure the application launches successfully before finishing this phase.

---

# PHASE 2 — Home Screen

# PHASE 2 — HOME SCREEN

Build the main Little Explorer home screen.

## Design

The home screen should immediately feel like a children's playroom.

Create:

* Friendly header
* Child-friendly mascot
* Large category cards
* Soft animated background
* Large touch targets

Categories:

🐶 Animals
🍎 Fruits
🎨 Colors
🔢 Numbers
🔤 ABC
🚗 Vehicles
👀 My Body
👨‍👩‍👦 My Family
🔊 Sounds
🎵 Songs
🌎 Discovery
🎮 Games

Do not rely only on emoji for the final visual design.

Use proper illustrations/icons through the project's asset system.

## Interaction

When the child touches a category:

* Card slightly scales
* Small bounce animation
* Optional click sound
* Navigate to the category

## Accessibility

Every interactive element should have a large touch area.

Minimum touch target should be approximately 48dp or larger, preferably significantly larger for the child-facing controls.

## Animation

Use subtle:

* Floating mascot
* Card entrance animation
* Press scale animation
* Gentle background movement

Avoid excessive animation that can become distracting.

## Home screen should work without internet.

---

# PHASE 3 — Animals

# PHASE 3 — ANIMAL LEARNING

Build the complete Animals learning experience.

Start with:

1. Dog
2. Cat
3. Cow
4. Lion
5. Elephant
6. Monkey
7. Tiger
8. Chicken
9. Bird
10. Fish

## Animal List

Create a beautiful grid/list with large cards.

Each card contains:

* Large illustration
* Animal name
* Friendly background
* Small interaction animation

## Animal Detail

When the child opens an animal:

Display a large animal illustration in the center.

Below it:

Animal name.

For example:

DOG

When the child touches the animal:

1. Animal performs an animation.
2. Name is spoken.
3. Animal sound plays.
4. Small celebration animation occurs.

Example:

Tap Dog:

Dog jumps.

Voice:

"Dog!"

Sound:

"Woof! Woof!"

## Repeat Interaction

Allow the child to tap repeatedly.

Do not force the child to wait.

## Navigation

Large:

← Back

and:

Next →

buttons.

Swipe left/right should also optionally navigate between animals.

## Audio

Create a centralized AudioService.

It should handle:

* Play word pronunciation
* Play animal sound
* Stop previous audio
* Avoid overlapping sounds

## Animation

Each animal can have a simple animation:

Dog → bounce

Cat → stretch

Bird → fly

Fish → swim

Elephant → trunk movement

Lion → small roar animation

If advanced animation assets are unavailable, implement simple React Native animations.

## Important

The experience should feel like PLAY, not a test.

---

# PHASE 4 — Fruits + Colors

# PHASE 4 — FRUITS AND COLORS

Implement Fruits and Colors.

## FRUITS

Include:

* Apple
* Banana
* Mango
* Orange
* Watermelon
* Grapes
* Strawberry

Each fruit must have:

* Illustration
* Name
* Color
* Pronunciation
* Tap animation

Example:

Tap Mango.

Mango grows slightly.

Voice:

"Mango."

Optional:

"Yellow mango."

## COLORS

Include:

* Red
* Blue
* Green
* Yellow
* Orange
* Purple
* Pink

Design the Colors screen differently from normal category lists.

Each color should occupy a large visual area.

Example:

Large red circle/card.

Voice:

"Red."

Tap:

Circle expands slightly.

Small particle/bubble animation.

Voice repeats.

## Color discovery

Create a mode where several colored objects appear.

Example:

🔴 red ball
🔵 blue ball
🟢 green ball

The child can touch any object.

The app says its color.

Do not make it a difficult quiz yet.

---

# PHASE 5 — Numbers

# PHASE 5 — NUMBERS

Build the Numbers learning section.

Start with:

1
2
3
4
5

Do not make this a traditional mathematics application.

The purpose is visual counting.

## Example

Number 3:

Display:

3

and:

🍎 🍎 🍎

Voice:

"Three apples."

## Interaction

Tap an apple:

* Apple bounces
* Small sound
* Voice optionally repeats

Tap number:

Number becomes slightly larger.

Voice:

"Three."

## Counting Animation

Create an optional automatic sequence:

One apple appears.

"One."

Second appears.

"Two."

Third appears.

"Three."

Keep the animation slow and understandable.

## Navigation

Previous / Next.

Swipe support.

Large controls.

---

# PHASE 6 — ABC

# PHASE 6 — ABC LEARNING

Build an ABC learning section.

A-Z.

Each letter should contain:

* Large letter
* Example object
* Object illustration
* Letter pronunciation
* Word pronunciation

Examples:

A → Apple

B → Ball

C → Cat

D → Dog

E → Elephant

etc.

## Screen

Large letter in the center.

Object below.

Example:

A

🍎

Apple

## Interaction

Tap letter:

Letter animates.

Voice:

"A."

Tap object:

Object animates.

Voice:

"Apple."

## Letter Navigation

Previous.

Next.

Swipe.

## Design

Do NOT show all 26 letters as tiny cards on the main learning screen.

Prioritize one-letter-at-a-time learning.

---

# PHASE 7 — Vehicles

# PHASE 7 — VEHICLE WORLD

Create an interactive vehicle learning section.

Include:

* Car
* Bus
* Train
* Airplane
* Helicopter
* Ambulance
* Fire Truck
* Police Car
* Boat
* Bicycle

## Interaction

Tap vehicle.

Vehicle moves.

Voice says:

"Car."

Sound plays:

"Beep beep!"

Examples:

Train → train horn

Airplane → airplane sound

Fire truck → siren

Boat → horn

## Special Feature

Create a horizontal road/sky/water environment.

Depending on the vehicle:

Car → road

Boat → water

Airplane → sky

Train → railway

The vehicle can move across the scene.

Keep the animation simple and performant.

---

# PHASE 8 — My Body

# PHASE 8 — MY BODY

Create a child-friendly body learning section.

Include:

* Eyes
* Ears
* Nose
* Mouth
* Head
* Hand
* Fingers
* Foot
* Leg
* Arm
* Hair

## Main Screen

Show a friendly child illustration.

Large touch areas should correspond to body parts.

When the child taps:

Eye:

Voice:

"Eyes."

The selected body part gently highlights.

## Important

Keep the illustration friendly and non-medical.

No medical information.

No anatomy detail.

This is simply vocabulary learning.

---

# PHASE 9 — My Family

This is the part that makes your nephew's app **personal**.

# PHASE 9 — MY FAMILY

Build a personalized "My Family" section.

This section must work entirely locally.

Create family profiles such as:

* Mama
* Baba
* Grandma
* Grandpa
* Uncle
* Aunt
* Other family members

Do not hardcode specific real people.

Create a reusable family member data structure.

Each member can contain:

* id
* name
* relationship
* image
* voice recording

## UI

Show large family cards.

Example:

[ PHOTO ]

Mama

When touched:

Photo gets a gentle animation.

Voice says:

"Mama."

## Local customization

Create a Parent Area where the parent can:

* Add family member
* Change name
* Select relationship
* Select image
* Add/replace voice recording
* Delete member

Store this information locally.

## Privacy

Do not upload anything.

Family photos and recordings must remain on the device.

This is a local-only feature.

## Important

Use a simple parent lock before allowing editing.

Do not require an online account.

---

# PHASE 10 — Sounds

# PHASE 10 — SOUND DISCOVERY

Build a Sound Discovery section.

Categories:

Animals

Vehicles

Nature

Home

Objects

Examples:

Dog → Woof

Cat → Meow

Cow → Moo

Car → Beep

Train → Choo Choo

Rain → Rain sound

Bell → Ding

Doorbell → Ding Dong

Clock → Tick Tock

## Design

Do not create a boring list.

Create a large interactive sound board.

Each item has:

* Large illustration
* Name
* Sound icon

Tap:

Object animates.

Sound plays.

Name is spoken.

## Sound visualization

While audio is playing, show a subtle animated waveform or bouncing circles.

Stop animation when audio ends.

---

# PHASE 11 — Songs

# PHASE 11 — SONGS

Create a simple children's songs section.

The application should support local audio files.

Do not use streaming.

Create song cards with:

* Illustration
* Song title
* Play button

Song screen:

Large illustration.

Play/Pause.

Progress indicator.

Previous/Next.

## Important

Use only audio/content that is owned, licensed, public domain, or otherwise legally usable.

The architecture should allow replacing the audio assets later.

## Visual experience

While the song plays:

* Character gently moves
* Stars/bubbles float
* Illustrations animate
* Progress indicator moves

Keep animations calm and lightweight.

---

# PHASE 12 — Discovery World

This is where the app becomes more than a vocabulary app.

# PHASE 12 — DISCOVERY WORLD

Build an interactive discovery scene.

Create a colorful world containing:

* House
* Tree
* Sun
* Clouds
* Flowers
* Bird
* Dog
* Car
* Ball
* Butterfly

The child can touch almost everything.

## Examples

Touch Sun:

Sun pulses.

Voice:

"Sun."

Touch Cloud:

Cloud moves.

Voice:

"Cloud."

Touch Bird:

Bird flies across the screen.

Voice:

"Bird."

Touch Dog:

Dog moves.

Voice:

"Dog."

Touch Car:

Car drives across the road.

Voice:

"Car."

## Goal

There should be no wrong answer.

The child simply explores.

The scene should encourage:

Touch → Discover → Sound → Word → Animation.

## Performance

Do not render excessive animated objects simultaneously.

Use lightweight animations.

---

# PHASE 13 — Simple Games

# PHASE 13 — TODDLER MINI GAMES

Create extremely simple games.

These are NOT traditional games.

They should require only simple tapping.

## GAME 1 — Find the Animal

Show 3 large animals.

Voice:

"Where is the cat?"

If correct:

Animal celebrates.

Voice:

"Cat!"

If incorrect:

Do not show failure.

Instead:

"Let's try!"

Gently highlight the correct answer after a few seconds if necessary.

## GAME 2 — Pop the Bubbles

Large colorful bubbles appear.

Child taps bubbles.

Each bubble:

* Pops
* Makes a gentle sound
* Creates particles

## GAME 3 — Find the Color

Voice:

"Touch blue."

Show:

Red

Blue

Green

Correct:

Celebration.

Incorrect:

No punishment.

## GAME 4 — Animal Sound

Play:

"Woof!"

Show three animals.

Child chooses dog.

## GAME 5 — Big and Small

Show:

Large elephant.

Small mouse.

Voice:

"Find BIG."

Child taps elephant.

## IMPORTANT

Never use:

* Game over
* Lives
* Negative sounds
* Punishment
* Countdown timers
* Stress
* Competitive leaderboards

The child should always feel successful and safe.

---

# PHASE 14 — Mascot / Character

# PHASE 14 — LITTLE EXPLORER MASCOT

Create a central friendly mascot named:

"Bubu"

Bubu is the application's friendly learning companion.

Bubu should appear throughout the application.

## Bubu behaviors

Bubu can:

* Wave
* Smile
* Jump
* Clap
* Blink
* Celebrate
* Point
* Sleep
* Dance

## Examples

When entering a screen:

Bubu:

"Hello!"

When learning an animal:

Bubu reacts to the animal.

When the child answers correctly:

Bubu claps.

When the child opens a new category:

Bubu introduces it.

## Important

Do not make Bubu talk constantly.

The mascot should support the learning experience rather than become distracting.

---

# PHASE 15 — Parent Area

# PHASE 15 — PARENT AREA

Create a parent-only area.

This area is not intended for the child.

Protect it using a simple local parent gate.

Possible interaction:

"Press and hold for 3 seconds."

Do not use a complicated password initially.

## Parent Dashboard

Show:

* Categories explored
* Words introduced
* Favorite categories
* Sessions
* Recently explored items

This information should be stored locally.

## Parent controls

Allow parent to:

* Enable/disable sounds
* Enable/disable background music
* Adjust narration volume
* Adjust effects volume
* Enable/disable animations
* Reset progress
* Manage family members
* Manage local content
* Configure child's name

## Important

No data should leave the device.

---

# PHASE 16 — Local Progress

# PHASE 16 — LOCAL PROGRESS SYSTEM

Implement local progress tracking.

Use local storage.

Track:

* Items viewed
* Items interacted with
* Categories visited
* Favorite items
* Last opened item
* Session count
* Total learning interactions

Create a small local storage service.

Example conceptual methods:

saveProgress()

getProgress()

markItemExplored()

toggleFavorite()

resetProgress()

## IMPORTANT

Do not create a backend.

Do not send analytics anywhere.

Do not collect personal information.

## Home

Optionally show:

"Welcome back!"

and recently explored content.

Do not turn progress into a competitive scoring system.

---

# PHASE 17 — Audio System

# PHASE 17 — PROFESSIONAL AUDIO SYSTEM

Create a centralized audio architecture.

Audio categories:

1. Narration
2. Animal sounds
3. Vehicle sounds
4. UI sounds
5. Songs
6. Ambient sounds

Create an AudioService.

Requirements:

* Play audio
* Stop audio
* Pause audio
* Resume audio
* Change volume
* Prevent unwanted overlapping
* Handle audio completion
* Handle errors
* Clean up resources

## Audio rules

When a new learning item is selected:

Stop unnecessary previous audio before playing the new sound.

Example:

Dog narration → Dog sound.

Do not allow 10 sounds to play simultaneously if the child rapidly taps.

## Settings

Support:

Narration volume

Effects volume

Music volume

Mute all

---

# PHASE 18 — Animation System

# PHASE 18 — ANIMATION SYSTEM

Create reusable animation utilities/components.

Implement:

* Scale on press
* Bounce
* Fade
* Slide
* Pulse
* Shake
* Floating
* Celebration
* Wiggle
* Rotate

Use performant React Native animation APIs.

Prefer native-driven animations where appropriate.

## Animation philosophy

Animations should communicate:

Touch happened.

Something changed.

The child succeeded.

An object is alive/active.

Do not animate everything continuously.

Avoid performance-heavy animation.

## Reduced animation

If animations are disabled in Parent Settings:

Reduce or disable non-essential animations.

---

# PHASE 19 — Design System

# PHASE 19 — FINAL DESIGN SYSTEM

Create a consistent visual design system.

## Typography

Use a child-friendly rounded font if legally available.

Use large font sizes.

Avoid tiny text.

## Components

Create reusable:

PrimaryButton

IconButton

CategoryCard

LearningCard

AnimalCard

FamilyCard

SoundCard

GameCard

Header

BackButton

NextButton

ProgressIndicator

Mascot

CelebrationOverlay

AudioButton

## Spacing

Use centralized spacing tokens.

## Radius

Use large rounded corners.

## Shadows

Use soft shadows.

## Touch feedback

Every tappable element should visibly react.

## Consistency

All screens must feel like the same application.

Do not independently design each screen.

---

# PHASE 20 — Responsive Design

# PHASE 20 — RESPONSIVE MOBILE DESIGN

Make the application responsive across common phone sizes.

Test conceptually for:

* Small Android phone
* Large Android phone
* Small iPhone
* Large iPhone
* Portrait orientation

Primary orientation:

PORTRAIT.

Avoid relying on fixed pixel positions.

Use:

* Flexbox
* Dimensions
* Safe areas
* Responsive spacing

Prevent:

* Text clipping
* Button clipping
* Image distortion
* Content overflow
* Navigation overlap
* Notch/status bar issues

---

# PHASE 21 — Performance

# PHASE 21 — PERFORMANCE OPTIMIZATION

Optimize the complete application.

Check:

* FlatList performance
* Image loading
* Audio memory
* Animation performance
* Re-rendering
* Navigation performance
* Local storage operations

Avoid unnecessary:

* State updates
* Re-renders
* Large images
* Simultaneous animations
* Audio instances

Use memoization only where it actually helps.

Make category lists performant.

Ensure screens are released/cleaned up when appropriate.

---

# PHASE 22 — Child Safety & Privacy

# PHASE 22 — CHILD SAFETY AND PRIVACY

Review the entire application as a children's application.

The application must contain:

* No advertisements
* No tracking
* No analytics SDK
* No external links in child-facing screens
* No social media
* No chat
* No purchases
* No login
* No online account
* No unnecessary permissions
* No location access
* No camera access unless explicitly needed
* No microphone access except when implementing local voice recording in the parent area

Family photos and recordings must remain local.

Parent-only features must be separated from child-facing features.

Do not accidentally expose settings or editing functionality to the child.

Review the entire codebase for privacy problems.

---

# PHASE 23 — Final Polish

# PHASE 23 — PROFESSIONAL FINAL POLISH

Now review the entire Little Explorer application as a senior mobile application team.

Do NOT immediately add new features.

First inspect everything already built.

Review:

## UI

* Consistency
* Spacing
* Typography
* Icons
* Illustrations
* Colors
* Touch targets
* Navigation

## UX

Check whether a 1-year-old can understand the application without reading.

## Animation

Remove:

* Unnecessary animation
* Distracting animation
* Excessive motion

Improve:

* Touch feedback
* Celebration
* Transitions

## Audio

Check:

* Audio overlap
* Volume
* Audio cleanup
* Playback errors

## Code

Check:

* TypeScript errors
* Unused imports
* Duplicate code
* Bad architecture
* Hardcoded content
* Missing types
* Poor component boundaries

## Performance

Check:

* FlatList
* Images
* Audio
* Animations
* Re-renders

## Offline

Verify the application works without internet.

## Final requirement

The application should feel like a polished children's product, not a tutorial project.

---

# PHASE 24 — Final Testing

Finally give the AI this:

# PHASE 24 — FINAL QA

Perform a complete QA pass.

Test every screen.

## Navigation

Verify:

Home → Animals

Home → Fruits

Home → Colors

Home → Numbers

Home → ABC

Home → Vehicles

Home → My Body

Home → My Family

Home → Sounds

Home → Songs

Home → Discovery

Home → Games

Home → Parent Area

Home → Settings

## Interaction

Verify every:

* Button
* Card
* Image
* Animal
* Fruit
* Color
* Letter
* Number
* Vehicle
* Body part
* Family member
* Sound
* Game

## Audio

Verify:

* Audio starts correctly
* Audio stops correctly
* Audio does not overlap incorrectly
* Audio respects volume settings

## Animation

Verify:

* Animations don't freeze
* Animations don't cause crashes
* Screens remain responsive

## Storage

Verify:

* Progress persists
* Family data persists
* Settings persist
* Reset works

## Offline

Turn off internet and verify the complete application still works.

## Final build

Fix every error and warning that can reasonably be fixed.

Do not finish with known broken functionality.

Return a final report containing:

1. What was implemented
2. Project structure
3. Main dependencies
4. Remaining optional improvements
5. Known limitations
6. How to run the project
7. How to build Android APK

---

## 🎯 One important recommendation

Since this is **for your nephew**, I wouldn't try to make all 24 phases at once with AI.

Use this workflow:

**Phase 1 → run → fix → Phase 2 → run → fix → Phase 3 → run → fix...**

That prevents AI from generating a giant codebase that looks impressive but has dozens of broken imports, missing assets, navigation bugs, and audio problems.

Also, for a 1-year-old, the **most important parts aren't ABC or numbers**. The strongest version of this app is:

> **Touch something → it moves → it makes a sound → the app says its name → child touches it again.**

That simple interaction loop should be the heart of the entire app.

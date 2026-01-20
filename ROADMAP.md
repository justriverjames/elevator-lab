# Elevator Lab Roadmap

## Current Status
**Version 0.2.0 - Complete ✅**

The project follows a phased approach with 3-4 incremental releases. Each version builds on the previous, maintaining momentum through quick, visible wins.

---

## Version 0.1.0 - Basic Simulator (Foundation)
**Status:** ✅ Complete
**Goal:** Get something working and visible

### Core Features
- Single elevator in a simple building (10 floors)
- Basic 2D visualisation using HTML Canvas
- Manual call placement (click floor to create up/down call)
- Simple FCFS (First-Come-First-Served) algorithm
- Basic metrics display (average wait time, average travel time)

### Technical Tasks
- [x] Set up TypeScript build pipeline
- [x] Implement basic simulation loop
- [x] Create elevator physics model (acceleration, max speed, door timing)
- [x] Render building and elevator state
- [x] Add click handlers for manual call placement
- [x] Implement FCFS scheduling algorithm
- [x] Calculate and display basic metrics
- [x] Test in browser

### Why This First
Validates rendering, simulation loop, and basic physics before adding complexity. Ensures the foundation is solid.

---

## Version 0.2.0 - Multi-Elevator & Optimization
**Status:** ✅ Complete
**Goal:** Show optimisation trade-offs

### Core Features
- 3 elevators running in parallel
- Weighted cost function implementation
- **Five core sliders:**
  1. Wait time priority
  2. Travel time priority
  3. Energy efficiency
  4. Wear and tear minimization
  5. Fairness
- Enhanced building: B1 basement parking + G ground + floors 1-9 (11 floors total)
- Professional visual design: building facade, animated sliding doors, visible cables
- Call button UI with proper up/down buttons on each floor
- Enhanced metrics dashboard with active calls counter

### Technical Tasks
- [x] Refactor simulation to support multiple elevators
- [x] Implement weighted cost function system
- [x] Build slider UI components
- [x] Enhanced building rendering (shafts, windows, basement level)
- [x] Animated doors with smooth transitions
- [x] Visual feedback (direction arrows, target floor indicators)
- [x] Larger canvas (800x800) for better visibility
- [ ] Create traffic pattern generators (deferred to v0.3.0)
- [ ] Add metrics comparison view (deferred to v0.3.0)

### Why Second
This delivers the core educational value - users can finally see and interact with optimisation trade-offs.

---

## Version 0.3.0 - Passengers & Energy Physics
**Status:** 🏗️ In Progress
**Goal:** Get people using elevators + realistic energy consumption

### Core Features
- **Passenger simulation (basic):**
  - Visual passengers (simple colored rectangles/stick figures) waiting at floors
  - Spawn passengers with configurable rate slider
  - Random destination floor selection
  - Passengers board elevators, ride to destination, exit visually
  - Simple animations for boarding/exiting
- **Energy tracking system:**
  - Calculate instantaneous power draw per elevator (based on load, acceleration, velocity)
  - Track cumulative energy usage per elevator
  - Display total building energy consumption
  - Real-time power meter (current draw in kW)
  - Cumulative energy display (kWh)
- **Realistic elevator physics:**
  - Elevator weight/mass (adjustable parameter)
  - Passenger weight impacts acceleration/energy
  - Capacity limits (max passengers per elevator)
  - Energy model based on motor physics
- **Advanced settings panel:**
  - Collapsible menu (accordion/dropdown style)
  - Adjustable physics parameters: elevator mass, max capacity, motor efficiency, friction
  - Toggle advanced mode on/off
- **Traffic pattern generators** (deferred from v0.2.0):
  - Random (uniform distribution)
  - Morning up-peak (lobby → upper floors)
  - Evening down-peak (upper floors → lobby)
  - Pattern selector dropdown
- **Configuration presets:**
  - Residential building
  - Office building
  - Hospital (fairness-focused)
  - Apply preset button (sets sliders + traffic pattern)

### Technical Tasks
- [ ] Add Passenger type to types.ts
- [ ] Implement passenger spawning logic
- [ ] Add passenger lifecycle state machine (waiting → boarding → riding → exited)
- [ ] Render passengers in rendering.ts
- [ ] Add boarding/exiting animations
- [ ] Implement energy calculation in physics.ts
- [ ] Add energy metrics to SimulationState and UI
- [ ] Create collapsible advanced settings panel (HTML + CSS)
- [ ] Add weight/capacity physics parameters
- [ ] Implement traffic pattern generators
- [ ] Create preset configurations
- [ ] Wire up preset selector UI

### Why This Version
Passengers make the simulation feel alive (biggest engagement win). Energy metrics add educational depth. Physics realism makes trade-offs tangible.

---

## Version 0.4.0 - Educational Features & Polish
**Status:** 📋 Planned
**Goal:** Explain WHY decisions are made + visual polish

### Core Features
- **Explanation layer:**
  - Click elevator or call to see decision rationale tooltip
  - Show cost calculation breakdown for why elevator X picked up call Y
  - Display current elevator state (idle/moving/target)
- **Cost breakdown visualisations:**
  - Live chart showing cost components (wait/travel/energy/wear/fairness)
  - Per-elevator cost history graph (line chart over time)
  - Configurable time window (last 30s, 1min, 5min)
- **Metrics comparison view:**
  - Side-by-side stats for different priority configurations
  - "Compare mode" toggle to freeze one config and run another
  - Diff display (red/green for worse/better)
- **Additional traffic patterns:**
  - Bursty (sudden surges every N seconds)
  - Lunch rush (12pm peak to specific floors)

### Technical Tasks
- [ ] Build tooltip system (HTML overlay + click detection)
- [ ] Add cost calculation logging to scheduler
- [ ] Implement canvas-based line charts for cost history
- [ ] Create comparison mode state management
- [ ] Add burst and event-driven traffic patterns

### Why This Version
Builds educational value on top of working passenger system. Users can now see and understand the "why" behind optimisation. Comparison mode lets users experiment with trade-offs.

---

## Version 0.5.0 - Advanced Passenger AI
**Status:** 📋 Planned
**Goal:** Realistic traffic modeling with peak times

### Core Features
- **Peak time modeling:**
  - Configurable rush hours (morning 8-9am, lunch 12-1pm, evening 5-6pm)
  - Intensity sliders (1x-10x normal traffic)
  - Duration control (15min, 30min, 1hr windows)
- **Destination probability system:**
  - Building type determines floor preferences
  - Residential: even distribution, slight ground floor bias
  - Office: morning → upper floors, evening → lobby
  - Hospital: emergency floor high priority, random otherwise
- **Passenger frustration indicators:**
  - Visual change after waiting >30s (color shift red)
  - Angry animation (shaking) after 60s
  - Leaves building after 2min (counted as failure)
- **RNG with realistic variability:**
  - Poisson distribution for arrival times
  - Normal distribution for passenger weights (65-95kg)
  - Occasional VIP passengers (double weight, priority flag)

### Technical Tasks
- [ ] Implement time-of-day system in simulation
- [ ] Add peak hour spawn rate multipliers
- [ ] Create destination probability tables per building type
- [ ] Add frustration state to Passenger type
- [ ] Implement passenger timeout/abandonment logic
- [ ] Add statistical distributions for spawn timing

### Why This Version
Makes simulation feel even more realistic. Introduces challenge (handling rush hours efficiently). Educational: see how peak times stress different strategies.

---

## Version 0.6.0 - Production Polish
**Status:** 💭 Optional
**Goal:** Shareable, mobile-friendly, production-ready tool

### Core Features
- **Replay system:**
  - Record simulation state history
  - Playback with speed control (0.5x, 1x, 2x, 4x)
  - Scrub timeline to any point
- **Shareable configurations:**
  - Serialize state to URL parameters
  - "Share" button copies link to clipboard
  - Load config from URL on page load
- **Mobile responsive layout:**
  - Responsive CSS breakpoints
  - Touch-friendly controls
  - Portrait/landscape layouts
  - Smaller canvas on mobile
- **Custom building editor:**
  - Configure floor count (5-20)
  - Configure elevator count (1-6)
  - Set floor height (visual only)
- **Performance optimisation:**
  - Profile rendering pipeline
  - Object pooling for passengers
  - Spatial partitioning if needed
  - Target 60fps with 100+ passengers

### Technical Tasks
- [ ] Implement state recording/playback system
- [ ] Add URL serialization (JSON → base64 → query params)
- [ ] Create responsive CSS with media queries
- [ ] Build building configuration UI
- [ ] Profile with Chrome DevTools
- [ ] Optimize rendering (batch draw calls if needed)

### Why This Version
Makes tool shareable (huge for education). Mobile support expands audience. Custom buildings let users explore different scales. Performance ensures smooth experience.

---

## Future Ideas (Beyond v0.6 / v1.0)

These are speculative and may never be implemented:

- **Destination dispatch:** Passengers specify destination floor upfront
- **Machine learning:** Train RL agent to optimize in real-time
- **Historical data replay:** Use real building data
- **Multi-building comparison:** Compare different building configurations
- **API access:** Allow programmatic control for experiments
- **Collaborative mode:** Multiple users controlling different elevators
- **Accessibility features:** Screen reader support, keyboard navigation
- **Comprehensive user guide:** In-app tutorial system

---

## Version History

- **v0.1.0** - 2026-01-20 - Initial release with basic simulator
- **v0.2.0** - 2026-01-20 - Multi-elevator optimisation with priority sliders
- **v0.3.0** - TBD - Passengers & energy physics
- **v0.4.0** - TBD - Educational features & polish
- **v0.5.0** - TBD - Advanced passenger AI
- **v0.6.0** - TBD - Production polish (optional)
- **v1.0.0** - TBD - Official release (optional)

---

## Contributing

This is currently a solo educational project by River. If you're interested in contributing ideas or code, feel free to open an issue or PR!

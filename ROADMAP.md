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
- Basic 2D visualization using HTML Canvas
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
**Goal:** Show optimization trade-offs

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
This delivers the core educational value - users can finally see and interact with optimization trade-offs.

---

## Version 0.3.0 - Educational Features
**Status:** 📋 Planned
**Goal:** Make it actually educational

### Core Features
- **Explanation layer:** Click any elevator or call to see decision rationale
- **View modes:**
  - Whole building (default)
  - Floor-centric (zoom to specific floor)
  - Elevator-centric (follow elevator perspective)
  - X-ray mode (see through floors, show all states)
- Cost breakdown visualization (pie charts, bar graphs)
- **4-5 presets:**
  - Residential building
  - Office building
  - Hospital (fairness-focused)
  - Balanced
  - Intentionally bad (for comparison)
- **Passenger simulation (basic):**
  - Visual passengers (simple/lego-style figures) waiting at floors
  - Basic spawning with configurable rate slider
  - Random floor selection for destinations
  - Passengers board/exit elevators visually
- Traffic pattern generators (from v0.2.0):
  - Random (uniform distribution)
  - Morning up-peak (lobby → upper floors)
  - Evening down-peak (upper floors → lobby)

### Technical Tasks
- [ ] Build interactive explanation tooltips
- [ ] Implement view mode switching
- [ ] Create preset system with JSON configs
- [ ] Add cost breakdown visualizations
- [ ] Design basic passenger rendering system
- [ ] Implement passenger spawning with rate control
- [ ] Add traffic pattern generators (deferred from v0.2.0)
- [ ] Passenger boarding/exiting animations

### Why Third
Builds pedagogy on top of a working optimization engine. Users can now deeply understand *why* decisions are made.

---

## Version 0.4.0 - Polish & Extensions
**Status:** 💭 Optional
**Goal:** Production-ready educational tool

### Core Features
- Replay/scenario comparison system
- Custom building editor (configurable floor count, elevator count)
- **Advanced passenger AI:**
  - Peak time modeling (morning/lunch/evening rushes)
  - Configurable variables: rush hour timing, intensity, duration
  - Some RNG for realistic variability
  - Destination probability based on building type (residential vs office)
  - Passenger patience (visual frustration indicators if waiting too long)
- Additional traffic patterns:
  - Bursty (sudden surges)
  - Event-driven (lunchtime, shift change, fire drill)
  - Weekday vs weekend patterns
- Performance optimization for smooth 60fps with many passengers
- Shareable configurations via URL parameters
- Mobile-responsive layout

### Technical Tasks
- [ ] Implement replay recording/playback
- [ ] Build scenario comparison interface
- [ ] Create building configuration UI
- [ ] Build advanced passenger AI with peak time logic
- [ ] Add configurable variables for traffic patterns
- [ ] Implement destination probability system
- [ ] Add visual passenger frustration indicators
- [ ] Profile and optimize rendering pipeline for many entities
- [ ] Implement URL state serialization
- [ ] Responsive CSS for mobile

### Why Last
Nice-to-haves after core educational value is proven. These features enhance the experience but aren't essential for learning.

---

## Future Ideas (Beyond v0.4)

These are speculative and may never be implemented:

- **Destination dispatch:** Passengers specify destination floor upfront
- **Machine learning:** Train RL agent to optimize in real-time
- **Historical data replay:** Use real building data
- **Multi-building comparison:** Compare different building configurations
- **API access:** Allow programmatic control for experiments
- **Collaborative mode:** Multiple users controlling different elevators
- **Accessibility features:** Screen reader support, keyboard navigation

---

## Version History

- **v0.1.0** - TBD - Initial release with basic simulator
- **v0.2.0** - TBD - Multi-elevator optimization
- **v0.3.0** - TBD - Educational features
- **v0.4.0** - TBD - Polish and extensions (if needed)

---

## Contributing

This is currently a solo educational project by River. If you're interested in contributing ideas or code, feel free to open an issue or PR!

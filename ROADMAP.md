# Elevator Lab Roadmap

## Current Status
**Version 0.1.0 - In Development**

The project follows a phased approach with 3-4 incremental releases. Each version builds on the previous, maintaining momentum through quick, visible wins.

---

## Version 0.1.0 - Basic Simulator (Foundation)
**Status:** 🏗️ In Development
**Goal:** Get something working and visible

### Core Features
- Single elevator in a simple building (8-10 floors)
- Basic 2D visualization using HTML Canvas or SVG
- Manual call placement (click floor to create up/down call)
- Simple FCFS (First-Come-First-Served) algorithm
- Basic metrics display (average wait time, average travel time)
- No sliders yet - just observe behavior

### Technical Tasks
- [ ] Set up TypeScript build pipeline
- [ ] Implement basic simulation loop
- [ ] Create elevator physics model (acceleration, max speed, door timing)
- [ ] Render building and elevator state
- [ ] Add click handlers for manual call placement
- [ ] Implement FCFS scheduling algorithm
- [ ] Calculate and display basic metrics
- [ ] Test in browser

### Why This First
Validates rendering, simulation loop, and basic physics before adding complexity. Ensures the foundation is solid.

---

## Version 0.2.0 - Multi-Elevator & Optimization
**Status:** 📋 Planned
**Goal:** Show optimization trade-offs

### Core Features
- Support for 2-4 elevators
- Weighted cost function implementation
- **Five core sliders:**
  1. Wait time priority
  2. Travel time priority
  3. Energy efficiency
  4. Wear and tear minimization
  5. Fairness
- **Three traffic patterns:**
  - Random (uniform distribution)
  - Morning up-peak (lobby → upper floors)
  - Evening down-peak (upper floors → lobby)
- Enhanced metrics dashboard
- Side-by-side comparison of slider configurations

### Technical Tasks
- [ ] Refactor simulation to support multiple elevators
- [ ] Implement weighted cost function system
- [ ] Build slider UI components
- [ ] Create traffic pattern generators
- [ ] Add metrics comparison view
- [ ] Implement real-time cost visualization

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
- Advanced sliders (predictiveness, load sensitivity)
- Progressive disclosure UI (hide complexity initially)

### Technical Tasks
- [ ] Build interactive explanation tooltips
- [ ] Implement view mode switching
- [ ] Create preset system with JSON configs
- [ ] Add cost breakdown visualizations
- [ ] Design progressive disclosure UI flow
- [ ] Add advanced slider options

### Why Third
Builds pedagogy on top of a working optimization engine. Users can now deeply understand *why* decisions are made.

---

## Version 0.4.0 - Polish & Extensions
**Status:** 💭 Optional
**Goal:** Production-ready educational tool

### Core Features
- Replay/scenario comparison system
- Custom building editor (configurable floor count, elevator count)
- Additional traffic patterns:
  - Bursty (sudden surges)
  - Event-driven (lunchtime, shift change)
- Performance optimization for smooth 60fps
- Shareable configurations via URL parameters
- Mobile-responsive layout

### Technical Tasks
- [ ] Implement replay recording/playback
- [ ] Build scenario comparison interface
- [ ] Create building configuration UI
- [ ] Add more traffic pattern algorithms
- [ ] Profile and optimize rendering pipeline
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

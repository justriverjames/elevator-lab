# Elevator Lab Roadmap

## Current Status
**Version 0.3.0 - Complete ✅**

The project follows a phased approach with incremental releases. Each version builds on the previous, maintaining momentum through quick, visible wins.

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
**Status:** ✅ Complete
**Goal:** Get people using elevators + realistic energy consumption

### Core Features
- **Passenger simulation:**
  - Visual passengers (stick figures) waiting at floors
  - Spawn passengers with configurable rate slider
  - Random destination floor selection
  - Passengers board elevators, ride to destination, exit visually
  - Sequential one-by-one boarding/exiting animations
  - Fade-in when spawning, fade-out when boarding/exiting
  - Queue compression (passengers move closer as others board)
  - Colour-coded states: blue (waiting), orange (boarding), green (exiting)
  - Direction indicators at each floor
  - Count badges for groups
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
  - Dynamic dwell times (doors stay open longer for more passengers)
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
- [x] Add Passenger type to types.ts
- [x] Implement passenger spawning logic
- [x] Add passenger lifecycle state machine (waiting → boarding → riding → exited)
- [x] Render passengers in rendering.ts
- [x] Add boarding/exiting animations (sequential, queue-based)
- [x] Add fade-in/fade-out opacity animations
- [x] Implement dynamic dwell time system
- [x] Implement energy calculation in physics.ts
- [x] Add energy metrics to SimulationState and UI
- [x] Create collapsible advanced settings panel (HTML + CSS)
- [x] Add weight/capacity physics parameters
- [x] Implement traffic pattern generators
- [x] Create preset configurations
- [x] Wire up preset selector UI

### Why This Version
Passengers make the simulation feel alive (biggest engagement win). Energy metrics add educational depth. Physics realism makes trade-offs tangible.

---

## Version 0.4.0 - Building Scaling & Improved Traffic
**Status:** 📋 Planned
**Goal:** Better control over passenger spawning + larger buildings + realistic traffic

### Core Features
- **Spawn people UI:**
  - Replace manual call buttons with "Spawn Passengers" control panel
  - Dropdown to select spawn floor (any floor + "Random")
  - Input for number of passengers to spawn (1-20)
  - Destination logic based on building type/mode:
    - **Residential**: Even distribution across all floors, slight ground floor bias
    - **Office**: Morning = upper floors, Evening = lobby/ground, Lunch = random
    - **Hospital**: High emergency floor traffic, otherwise random
  - One-click spawn button
  - Optional: Keep call buttons for manual testing mode
- **Larger building:**
  - Increase from 11 to 12 total floors (B1 basement + G ground + floors 1-10)
  - Scalable rendering to accommodate taller building
  - Adjust floor height if needed for visual balance
- **Improved "Random" traffic pattern:**
  - Currently too uniform - make it more realistic
  - Add slight clustering (passengers spawn in small groups)
  - Vary spawn rate randomly within configured range (±20%)
  - More realistic destination distribution (ground floor bias, avoid adjacent floors)
- **Time-of-day awareness (basic):**
  - Simple time-of-day selector: Morning / Midday / Evening / Night
  - Adjusts spawn rates and destination logic automatically
  - Morning: 2x spawn rate, 70% going up from ground
  - Midday: 1x spawn rate, random destinations
  - Evening: 2x spawn rate, 70% going down to ground
  - Night: 0.2x spawn rate, mostly ground floor traffic
  - Feeds into existing traffic patterns (residential/office/hospital)

### Technical Tasks
- [ ] Remove or hide manual call button UI
- [ ] Build "Spawn Passengers" control panel (HTML + CSS)
- [ ] Add floor selector dropdown (B1, G, 1-10, Random)
- [ ] Add passenger count input (1-20)
- [ ] Implement destination logic per building type
- [ ] Update FLOOR_COUNT constant from 11 to 12
- [ ] Test rendering with 12 floors (adjust FLOOR_RENDER_HEIGHT if needed)
- [ ] Improve random traffic pattern with clustering and variance
- [ ] Add time-of-day selector UI
- [ ] Implement time-of-day spawn rate multipliers
- [ ] Update destination logic to respect time-of-day + building type

### Why This Version
Better spawn controls let users test specific scenarios (rush hours, emergency situations). Larger building increases simulation complexity. Realistic traffic patterns make the tool more educational and engaging.

---

## Version 0.5.0 - Advanced Traffic Simulation
**Status:** 📋 Planned
**Goal:** Peak time modeling + passenger behaviour + statistical realism

### Core Features
- **Advanced peak time system:**
  - Configurable rush hour windows (8-9am, 12-1pm, 5-6pm)
  - Intensity sliders (1x-10x normal traffic)
  - Duration control (15min, 30min, 1hr windows)
  - Multiple overlapping peaks (morning + lunch combined)
- **Passenger frustration system:**
  - Visual change after waiting >30s (colour shift to red)
  - Angry animation (shaking) after 60s
  - Abandons elevator after 2min wait (counted as failure metric)
  - Frustration impacts fairness score
- **Statistical realism:**
  - Poisson distribution for passenger arrival times (realistic clustering)
  - Normal distribution for passenger weights (65-95kg, mean 75kg)
  - Occasional VIP passengers (2x weight, priority flag, visual indicator)
  - Group arrivals (2-4 passengers spawning together, same destination)
- **Additional traffic patterns:**
  - Bursty: sudden surges every N seconds
  - Lunch rush: spike at 12pm-1pm to cafeteria floor
  - Conference room: everyone to floor 7 at 9am
  - Fire drill: everyone to ground floor simultaneously

### Technical Tasks
- [ ] Implement advanced time-of-day system with configurable windows
- [ ] Add peak hour intensity sliders and duration controls
- [ ] Add frustration timer to Passenger type
- [ ] Implement visual frustration indicators (colour, animation)
- [ ] Add passenger abandonment logic and failure metrics
- [ ] Implement Poisson distribution for spawn timing
- [ ] Add normal distribution for passenger weights
- [ ] Create VIP passenger type with priority logic
- [ ] Implement group arrival spawning
- [ ] Add bursty/lunch rush/conference/fire drill patterns

### Why This Version
Introduces challenge and realism. Users see how peak times and passenger behaviour stress different optimisation strategies. Statistical distributions make traffic patterns feel authentic.

---

## Version 0.6.0 - Educational Features & Analytics
**Status:** 📋 Planned
**Goal:** Explain WHY decisions are made + data visualisation

### Core Features
- **Explanation layer:**
  - Click elevator or call to see decision rationale tooltip
  - Show cost calculation breakdown (why elevator X picked up call Y)
  - Display current elevator state (idle/moving/target/cost)
  - Highlight decision factors (wait time contribution, energy cost, fairness score)
- **Cost breakdown visualisations:**
  - Live chart showing cost components (wait/travel/energy/wear/fairness)
  - Per-elevator cost history graph (line chart over time)
  - Configurable time window (last 30s, 1min, 5min)
  - Stacked area chart showing component weights
- **Metrics comparison view:**
  - Side-by-side stats for different priority configurations
  - "Compare mode" toggle to freeze one config and run another
  - Diff display (red/green for worse/better metrics)
  - Export comparison data as CSV
- **Historical analytics:**
  - Passenger wait time histogram
  - Elevator utilisation percentage per elevator
  - Floor popularity heat map
  - Energy consumption trends over time

### Technical Tasks
- [ ] Build tooltip system (HTML overlay + click detection)
- [ ] Add cost calculation logging to scheduler
- [ ] Implement canvas-based or HTML line charts
- [ ] Create comparison mode state management
- [ ] Add histogram rendering for wait times
- [ ] Build heat map visualisation for floor popularity
- [ ] Add CSV export functionality

### Why This Version
Educational depth - users understand the "why" behind decisions. Analytics help identify patterns. Comparison mode enables A/B testing of strategies.

---

## Version 0.7.0 - Production Polish
**Status:** 💭 Optional
**Goal:** Shareable, mobile-friendly, production-ready tool

### Core Features
- **Replay system:**
  - Record simulation state history
  - Playback with speed control (0.5x, 1x, 2x, 4x)
  - Scrub timeline to any point
  - Export/import replay files
- **Shareable configurations:**
  - Serialize state to URL parameters
  - "Share" button copies link to clipboard
  - Load config from URL on page load
  - QR code generation for mobile sharing
- **Mobile responsive layout:**
  - Responsive CSS breakpoints
  - Touch-friendly controls
  - Portrait/landscape layouts
  - Smaller canvas on mobile (adaptive resolution)
- **Custom building editor:**
  - Configure floor count (5-20)
  - Configure elevator count (1-6)
  - Set floor height (visual only)
  - Name floors (e.g., "Lobby", "Cafeteria", "Executive")
- **Performance optimisation:**
  - Profile rendering pipeline
  - Object pooling for passengers
  - Spatial partitioning if needed
  - Target 60fps with 100+ passengers
  - Web Workers for simulation logic

### Technical Tasks
- [ ] Implement state recording/playback system
- [ ] Add URL serialization (JSON → base64 → query params)
- [ ] Create responsive CSS with media queries
- [ ] Build building configuration UI
- [ ] Add floor naming system
- [ ] Profile with Chrome DevTools
- [ ] Optimise rendering (batch draw calls, offscreen canvas)
- [ ] Explore Web Workers for simulation parallelisation

### Why This Version
Makes tool shareable (huge for education). Mobile support expands audience. Custom buildings let users explore different scales. Performance ensures smooth experience with complex scenarios.

---

## Future Ideas (Beyond v0.7 / v1.0)

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
- **v0.3.0** - 2026-01-20 - Passengers, energy physics, and animation system
- **v0.4.0** - TBD - Building scaling & improved traffic
- **v0.5.0** - TBD - Advanced traffic simulation
- **v0.6.0** - TBD - Educational features & analytics
- **v0.7.0** - TBD - Production polish (optional)
- **v1.0.0** - TBD - Official release (optional)

---

## Contributing

This is currently a solo educational project by River. If you're interested in contributing ideas or code, feel free to open an issue or PR!

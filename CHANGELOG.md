# Changelog

All notable changes to Elevator Lab will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Passenger simulation**: Visual passengers spawn, board elevators, ride to destinations, and exit
  - Passengers rendered as stick figures (head + body) for better visibility
  - Up to 5 passengers shown individually, then grouped with count badge
  - Colour-coded state indicators: blue (waiting), orange (boarding), green (exiting)
  - Direction arrows (▲▼⇵) show passenger travel intent at each floor
  - Lifecycle state machine: waiting → boarding → riding → exiting → arrived
  - Passengers automatically create calls when spawned
  - Passenger count badges on elevators show occupancy
- **Enhanced passenger animations**: Realistic boarding/exiting behaviour
  - Smooth fade-in when passengers spawn (0.5s transition from transparent to visible)
  - Sequential one-by-one boarding (0.3s per passenger, not all at once)
  - Passengers fade out as they board the elevator
  - Queue compression: remaining passengers move closer to doors as others board
  - Exiting passengers fade out while walking away from elevator (green colour)
  - Passengers positioned near call buttons/elevator doors instead of far left
- **Dynamic elevator dwell time**: Doors remain open longer based on passenger count
  - Base dwell time: 2.0 seconds
  - Additional time per boarding passenger: 0.3 seconds
  - Additional time per exiting passenger: 0.2 seconds
  - Maximum dwell time capped at 10 seconds
  - Example: 10 passengers boarding = 2.0 + (10×0.3) = 5.0 seconds total
- **Energy tracking system**: Real-time energy consumption monitoring
  - Instantaneous power draw (kW) per elevator and total
  - Cumulative energy usage (kWh) per elevator and total
  - Physics-based calculation: mass, gravity, velocity, motor efficiency, friction
- **Realistic elevator physics**: Weight affects performance
  - Elevator mass (1200kg default)
  - Passenger weight (75kg average per person)
  - Heavier elevators accelerate slower and consume more energy
  - Capacity limits (12 passengers max per elevator)
- **Traffic pattern generators**: Simulate different building usage scenarios
  - Random: uniform distribution across all floors
  - Morning up-peak: 80% spawn at ground floor, travel to upper floors
  - Evening down-peak: 80% spawn at upper floors, travel to ground/basement
  - Configurable spawn rate (passengers per second)
- **Advanced settings panel**: Collapsible UI for physics parameter tweaking
  - Elevator mass adjustment (800-2000kg)
  - Max capacity adjustment (6-20 passengers)
  - Motor efficiency adjustment (50-95%)
  - Spawn rate control (0-5 passengers/second)
- **Configuration presets**: Quick setup for different building types
  - Residential building: balanced priorities, random traffic
  - Office building: wait time focused, morning up-peak traffic
  - Hospital: fairness focused, random traffic
  - Preset selector automatically updates all parameters

### Changed
- Acceleration now affected by total elevator weight (car + passengers)
- Energy consumption calculated every frame based on physics
- Spawn rate default set to 0.5 passengers/second
- Call buttons now stay active while passengers are waiting (not just while calls are queued)
- Improved passenger visualisation with count badges and direction indicators
- Metrics panel now includes dedicated Passengers section

### Technical
- Added `Passenger` interface with lifecycle states
  - Extended with `opacity`, `animationProgress`, `queuePosition` fields for animation system
- Added `EnergyMetrics` interface for power/energy tracking
- Extended `Elevator` type with mass, passengerCount, energy fields
  - Extended with `boardingQueue`, `exitingQueue`, `dynamicDwellTime` for queue-based boarding
- Extended `SimulationState` with passengers array, traffic pattern, spawn settings
- Added `calculatePower()` function for physics-based energy calculation
- Added `spawnPassenger()` function with traffic pattern logic
- Added `updatePassengerAnimations()` function for fade-in/fade-out effects
- Replaced `updatePassengers()` with queue-based sequential boarding system
  - Builds boarding/exiting queues when doors start opening (doorProgress === 0)
  - Processes passengers one-by-one at TIME_PER_BOARDING/TIME_PER_EXITING intervals
  - Calculates dynamic dwell time based on passenger counts
- Modified `updateElevator()` in physics.ts to use dynamicDwellTime instead of fixed DOOR_CLOSE_TIME
- Added exiting passenger rendering with lerp animation (moving away from elevator while fading)
- Added passenger rendering to canvas (before elevators layer)
- Added animation timing constants: PASSENGER_FADE_IN_TIME, PASSENGER_FADE_OUT_TIME, TIME_PER_BOARDING, TIME_PER_EXITING, MAX_DWELL_TIME
- Improved physics system with weight-based acceleration

## [0.2.0] - 2026-01-20

### Added
- **Multi-elevator system**: 3 elevators running in parallel
- **Optimization priority sliders**: 5 adjustable sliders for tuning elevator behavior
  - Wait Time: Prioritize reducing passenger wait time
  - Travel Time: Minimize elevator travel distance
  - Energy: Optimize for energy efficiency
  - Wear & Tear: Reduce mechanical wear
  - Fairness: Prevent passengers from waiting too long
- **Weighted cost function scheduler**: Dynamically assigns calls to elevators based on priority weights
- **Basement level**: Building now has B1 (basement parking) + G (ground) + floors 1-9
- **Enhanced visual design**:
  - Building facade with elevator shafts and windows
  - Animated sliding doors with smooth open/close transitions
  - Visible cables connecting elevators to overhead mechanism
  - Professional call button UI (up/down buttons on each floor)
  - Visual feedback: gold direction arrows on moving elevators, dashed target floor indicators
- **Improved layout**: Larger canvas (800x800) and UI panels for better visibility
- **Active calls metric**: Shows number of pending elevator calls in real-time

### Changed
- Floor numbering changed from F0-F9 to B1, G, 1-9 (standard elevator convention)
- Elevators now start at ground floor (G) instead of basement
- Canvas and UI components scaled up for better screen utilization
- Font sizes increased for improved readability

### Technical
- Refactored simulation to support multiple elevators
- Added `Priorities` type for weighted optimisation
- Improved door animation system with progress tracking
- Enhanced rendering system with shaft visualisation

## [0.1.0] - 2026-01-20

### Added
- **Basic simulator foundation**
  - Single elevator in 10-floor building
  - Simple 2D canvas visualisation
  - Manual call placement (click to create calls)
  - FCFS (First-Come-First-Served) scheduling algorithm
  - Basic metrics: average wait time, average travel time, calls served
- **Elevator physics**
  - Realistic acceleration and deceleration
  - Max velocity constraints
  - Door timing (open/close delays)
- **TypeScript build pipeline** using Vite
- Initial project structure and documentation

[Unreleased]: https://github.com/justriverjames/elevator-lab/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/justriverjames/elevator-lab/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/justriverjames/elevator-lab/releases/tag/v0.1.0

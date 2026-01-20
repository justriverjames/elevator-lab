# Changelog

All notable changes to Elevator Lab will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
- Added `Priorities` type for weighted optimization
- Improved door animation system with progress tracking
- Enhanced rendering system with shaft visualization

## [0.1.0] - 2026-01-20

### Added
- **Basic simulator foundation**
  - Single elevator in 10-floor building
  - Simple 2D canvas visualization
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

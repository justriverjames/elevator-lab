# Elevator Lab

**An interactive elevator simulator for learning about optimization trade-offs**

## What is this?

Elevator Lab is an educational web app that lets you explore the complex optimization problems behind elevator systems. By adjusting priorities (wait time, energy, fairness, etc.) and observing the results, you'll build intuition for real-world systems design.

Think of it as a playground for understanding how competing objectives create trade-offs - faster service vs. energy efficiency, fairness vs. throughput, predictive routing vs. reactive control.

## Live Demo

**[elevator-lab.justriverjames.com](https://elevator-lab.justriverjames.com)** *(coming soon)*

Or just open `index.html` locally in your browser.

## Features (Planned)

This project follows a phased roadmap. See [ROADMAP.md](ROADMAP.md) for full details.

**Version 0.1.0 - Basic Simulator** (In Development)
- Single elevator, 8-10 floors
- Simple 2D visualization
- Manual call placement
- FCFS algorithm
- Basic metrics

**Version 0.2.0 - Multi-Elevator & Optimization**
- 2-4 elevators
- Five adjustable priority sliders
- Multiple traffic patterns
- Real-time trade-off visualization

**Version 0.3.0 - Educational Features**
- Click to see decision rationale
- Multiple view modes (building, floor, elevator, x-ray)
- Configuration presets (residential, office, hospital)
- Cost breakdown visualizations

**Version 0.4.0 - Polish & Extensions** (Optional)
- Replay/scenario comparison
- Custom building editor
- Shareable configurations
- Mobile-responsive

## Quick Start

```bash
# Clone the repository
git clone https://github.com/justriverjames/elevator-lab.git
cd elevator-lab

# Install dependencies (if using TypeScript build)
npm install

# Build (if needed)
npm run build

# Open in browser
open index.html
```

## Tech Stack

- **TypeScript** - Type-safe code with build step
- **HTML Canvas** - 2D rendering for visualization
- **Vanilla JS** - No framework dependencies
- **Static hosting** - Just HTML/CSS/JS, deployable anywhere

## Why Build This?

Elevator optimization is a perfect microcosm of real-world systems design:
- **Multiple competing objectives** that can't all be maximized simultaneously
- **Unpredictable inputs** (passenger arrivals)
- **Physical constraints** (acceleration, door timing)
- **Fairness concerns** (don't strand anyone indefinitely)
- **Measurable outcomes** (wait time, energy, wear)

By making these trade-offs tangible and interactive, Elevator Lab helps you build intuition for optimization problems across domains - from resource allocation to scheduling to infrastructure design.

## Development Status

Currently working on **v0.1.0** - building the foundational simulator and visualization.

See [ROADMAP.md](ROADMAP.md) for detailed version breakdown and task lists.

## License

MIT License - see LICENSE file for details

---

Built by [River](https://github.com/justriverjames) as an educational project for exploring optimization trade-offs.

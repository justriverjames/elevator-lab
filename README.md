# Elevator Lab

**An interactive elevator simulator for learning about optimization trade-offs**

## What is this?

Elevator Lab is an educational web app that lets you explore the complex optimization problems behind elevator systems. By adjusting priorities (wait time, energy, fairness, etc.) and observing the results, you'll build intuition for real-world systems design.

Think of it as a playground for understanding how competing objectives create trade-offs - faster service vs. energy efficiency, fairness vs. throughput, predictive routing vs. reactive control.

## Live Demo

**[elevator-lab.justriverjames.com](https://elevator-lab.justriverjames.com)** *(coming soon)*

Or just open `index.html` locally in your browser.

## Features

This project follows a phased roadmap. See [ROADMAP.md](ROADMAP.md) for full details.

**Version 0.2.0 - Multi-Elevator & Optimization** ✅ Complete
- 3 elevators running in parallel
- Five adjustable priority sliders (Wait Time, Travel Time, Energy, Wear & Tear, Fairness)
- Weighted cost function scheduler
- 11-floor building (B1 basement parking + G ground + floors 1-9)
- Enhanced visuals: building facade, animated doors, visible cables, call buttons
- Real-time metrics tracking

**Version 0.3.0 - Educational Features** (Planned)
- Click to see decision rationale
- Multiple view modes (building, floor, elevator, x-ray)
- Configuration presets (residential, office, hospital)
- Cost breakdown visualizations
- Passenger simulation with realistic traffic patterns

**Version 0.4.0 - Polish & Extensions** (Planned)
- Replay/scenario comparison
- Custom building editor
- Shareable configurations
- Mobile-responsive
- Advanced passenger AI with peak time modeling

## Quick Start

```bash
# Clone the repository
git clone https://github.com/justriverjames/elevator-lab.git
cd elevator-lab

# Install dependencies
npm install

# Run dev server
npm run dev

# Open browser to http://localhost:5173
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

**v0.2.0** complete - Multi-elevator optimization with priority sliders is working!

See [ROADMAP.md](ROADMAP.md) for detailed version breakdown and [CHANGELOG.md](CHANGELOG.md) for version history.

## License

MIT License - see LICENSE file for details

---

Built by [River](https://github.com/justriverjames) as an educational project for exploring optimization trade-offs.

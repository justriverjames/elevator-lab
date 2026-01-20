# Elevator Lab

**An interactive elevator simulator for learning about optimisation trade-offs**

## What is this?

Elevator Lab is an educational web app that lets you explore the complex optimisation problems behind elevator systems. By adjusting priorities (wait time, energy, fairness, etc.) and observing the results, you'll build intuition for real-world systems design.

Think of it as a playground for understanding how competing objectives create trade-offs - faster service vs. energy efficiency, fairness vs. throughput, predictive routing vs. reactive control.

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

Or download the repo and open `index.html` directly in your browser (after building).

## Current Features

**v0.2.0** - Multi-elevator optimisation system:
- 3 elevators running in parallel
- Five adjustable priority sliders (Wait Time, Travel Time, Energy, Wear & Tear, Fairness)
- Weighted cost function scheduler
- 11-floor building (B1 basement parking + G ground + floors 1-9)
- Enhanced visuals: building facade, animated doors, visible cables, call buttons
- Real-time metrics tracking

## What's Next

**v0.3.0** - Passengers & Energy Physics (in progress):
- Passenger simulation: visual passengers spawn, board elevators, ride to destinations
- Energy tracking: real-time power draw (kW) and cumulative usage (kWh) per elevator + total
- Realistic physics: elevator weight/mass, passenger weight impacts, capacity limits
- Advanced settings: collapsible panel for tweaking physics parameters
- Traffic patterns: random, morning up-peak, evening down-peak
- Configuration presets: residential, office, hospital buildings

**v0.4.0** - Educational Features (planned):
- Click elevators to see decision rationale
- Cost breakdown visualisations
- Metrics comparison view
- Additional traffic patterns

See [ROADMAP.md](ROADMAP.md) for the full development plan.

## Tech Stack

- **TypeScript** - Type-safe code with build step
- **HTML Canvas** - 2D rendering for visualisation
- **Vanilla JS** - No framework dependencies
- **Static hosting** - Just HTML/CSS/JS, deployable anywhere

## Why Build This?

Elevator optimisation is a perfect microcosm of real-world systems design:
- **Multiple competing objectives** that can't all be maximised simultaneously
- **Unpredictable inputs** (passenger arrivals)
- **Physical constraints** (acceleration, door timing)
- **Fairness concerns** (don't strand anyone indefinitely)
- **Measurable outcomes** (wait time, energy, wear)

By making these trade-offs tangible and interactive, Elevator Lab helps you build intuition for optimisation problems across domains - from resource allocation to scheduling to infrastructure design.

## Development Status

**v0.2.0** complete - Multi-elevator optimisation with priority sliders is working!

See [ROADMAP.md](ROADMAP.md) for detailed version breakdown and [CHANGELOG.md](CHANGELOG.md) for version history.

## Support

If you find this project useful, consider [sponsoring on GitHub](https://github.com/sponsors/justriverjames) to support continued development.

## License

MIT License - see [LICENSE](LICENSE) for details

import { createInitialState, addCall } from './simulation';
import { updateElevator } from './physics';
import { scheduleWeighted } from './scheduler';
import { Renderer } from './rendering';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';

// Initialize
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const state = createInitialState();
const renderer = new Renderer(canvas);

// Metrics elements
const avgWaitEl = document.getElementById('avg-wait')!;
const avgTravelEl = document.getElementById('avg-travel')!;
const callsServedEl = document.getElementById('calls-served')!;
const activeCallsEl = document.getElementById('active-calls')!;

// Slider elements
const sliders = {
  wait: document.getElementById('priority-wait') as HTMLInputElement,
  travel: document.getElementById('priority-travel') as HTMLInputElement,
  energy: document.getElementById('priority-energy') as HTMLInputElement,
  wear: document.getElementById('priority-wear') as HTMLInputElement,
  fairness: document.getElementById('priority-fairness') as HTMLInputElement
};

const valueDisplays = {
  wait: document.getElementById('value-wait')!,
  travel: document.getElementById('value-travel')!,
  energy: document.getElementById('value-energy')!,
  wear: document.getElementById('value-wear')!,
  fairness: document.getElementById('value-fairness')!
};

// Setup slider handlers
function setupSliders() {
  const updatePriority = (key: keyof typeof sliders) => {
    const value = parseInt(sliders[key].value) / 100;
    state.priorities[key === 'wait' ? 'waitTime' :
                     key === 'travel' ? 'travelTime' :
                     key] = value;
    valueDisplays[key].textContent = value.toFixed(2);
  };

  sliders.wait.addEventListener('input', () => updatePriority('wait'));
  sliders.travel.addEventListener('input', () => updatePriority('travel'));
  sliders.energy.addEventListener('input', () => updatePriority('energy'));
  sliders.wear.addEventListener('input', () => updatePriority('wear'));
  sliders.fairness.addEventListener('input', () => updatePriority('fairness'));
}

setupSliders();

// Click handler for placing calls
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const y = e.clientY - rect.top;
  const x = e.clientX - rect.left;

  const buttonClick = renderer.isCallButtonClick(x, y, state.building.floorCount);

  if (buttonClick) {
    addCall(state, buttonClick.floor, buttonClick.direction);
  }
});

// Simulation loop
let lastTime = performance.now();
const FIXED_DT = 1 / 60; // 60 FPS fixed timestep

function updateMetrics(): void {
  const { metrics } = state;

  const avgWait = metrics.callsServed > 0 ? metrics.totalWaitTime / metrics.callsServed : 0;
  avgWaitEl.textContent = `${avgWait.toFixed(2)}s`;

  const avgTravel = metrics.callsServed > 0 ? state.time / metrics.callsServed : 0;
  avgTravelEl.textContent = `${avgTravel.toFixed(2)}s`;

  callsServedEl.textContent = `${metrics.callsServed}`;
  activeCallsEl.textContent = `${state.calls.length}`;
}

function gameLoop(currentTime: number): void {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Fixed timestep update
  state.time += FIXED_DT;

  // Update all elevators
  for (const elevator of state.elevators) {
    updateElevator(elevator, FIXED_DT);
  }

  // Schedule calls
  scheduleWeighted(state);

  // Render
  renderer.render(state);
  updateMetrics();

  requestAnimationFrame(gameLoop);
}

// Start
requestAnimationFrame(gameLoop);

console.log('Elevator Lab v0.2.0 - Multi-elevator optimization with priorities');

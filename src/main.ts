import { createInitialState, addCall, spawnPassenger, updatePassengers, updatePassengerAnimations, applyPreset } from './simulation';
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
const waitingPassengersEl = document.getElementById('waiting-passengers')!;
const totalPassengersEl = document.getElementById('total-passengers')!;
const powerDrawEl = document.getElementById('power-draw')!;
const totalEnergyEl = document.getElementById('total-energy')!;

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

// Traffic pattern selector
const trafficSelect = document.getElementById('traffic-pattern') as HTMLSelectElement;
trafficSelect.addEventListener('change', () => {
  state.trafficPattern = trafficSelect.value as 'random' | 'morning-up' | 'evening-down';
});

// Preset selector
const presetSelect = document.getElementById('preset-selector') as HTMLSelectElement;
presetSelect.addEventListener('change', () => {
  if (presetSelect.value) {
    applyPreset(state, presetSelect.value);
    updateSlidersFromState();
  }
});

// Advanced settings toggle
const advancedToggle = document.getElementById('advanced-toggle')!;
const advancedPanel = document.getElementById('advanced-panel')!;

advancedToggle.addEventListener('click', () => {
  advancedPanel.classList.toggle('collapsed');
  advancedToggle.textContent = advancedPanel.classList.contains('collapsed')
    ? 'Advanced Settings ▼'
    : 'Advanced Settings ▲';
});

// Spawn rate slider
const spawnRateInput = document.getElementById('spawn-rate') as HTMLInputElement;
spawnRateInput.addEventListener('input', () => {
  state.passengerSpawnRate = parseFloat(spawnRateInput.value);
  document.getElementById('spawn-rate-value')!.textContent = spawnRateInput.value;
});

// Helper to sync UI with state
function updateSlidersFromState(): void {
  // Update priority sliders to match state
  sliders.wait.value = String(state.priorities.waitTime * 100);
  sliders.travel.value = String(state.priorities.travelTime * 100);
  sliders.energy.value = String(state.priorities.energy * 100);
  sliders.wear.value = String(state.priorities.wear * 100);
  sliders.fairness.value = String(state.priorities.fairness * 100);

  // Update displays
  valueDisplays.wait.textContent = (state.priorities.waitTime).toFixed(2);
  valueDisplays.travel.textContent = (state.priorities.travelTime).toFixed(2);
  valueDisplays.energy.textContent = (state.priorities.energy).toFixed(2);
  valueDisplays.wear.textContent = (state.priorities.wear).toFixed(2);
  valueDisplays.fairness.textContent = (state.priorities.fairness).toFixed(2);

  // Update traffic pattern
  trafficSelect.value = state.trafficPattern;
}

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

  // Passenger metrics
  const waitingPassengers = state.passengers.filter(p => p.state === 'waiting').length;
  const totalPassengers = state.passengers.length;
  waitingPassengersEl.textContent = `${waitingPassengers}`;
  totalPassengersEl.textContent = `${totalPassengers}`;

  // Energy metrics
  const totalPower = state.elevators.reduce((sum, e) => sum + e.energy.instantaneousPower, 0);
  const totalEnergy = state.elevators.reduce((sum, e) => sum + e.energy.cumulativeEnergy, 0);

  powerDrawEl.textContent = `${totalPower.toFixed(1)} kW`;
  totalEnergyEl.textContent = `${totalEnergy.toFixed(3)} kWh`;
}

function gameLoop(currentTime: number): void {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Fixed timestep update
  state.time += FIXED_DT;

  // Spawn passengers using accumulator pattern
  state.spawnAccumulator += FIXED_DT;
  const spawnInterval = 1 / state.passengerSpawnRate;

  if (state.spawnAccumulator >= spawnInterval && state.passengerSpawnRate > 0) {
    spawnPassenger(state, state.trafficPattern);
    state.spawnAccumulator -= spawnInterval;
  }

  // Update all elevators
  for (const elevator of state.elevators) {
    updateElevator(elevator, FIXED_DT);
  }

  // Update passenger animations (fade in/out, queue positioning)
  updatePassengerAnimations(state, FIXED_DT);

  // Update passenger lifecycle
  updatePassengers(state);

  // Schedule calls
  scheduleWeighted(state);

  // Render
  renderer.render(state);
  updateMetrics();

  requestAnimationFrame(gameLoop);
}

// Start
requestAnimationFrame(gameLoop);

console.log('Elevator Lab v0.3.0 - Passengers & Energy Physics');

import type { SimulationState, Elevator, Building, Metrics, Call, Priorities } from './types';
import { FLOOR_COUNT, FLOOR_HEIGHT, NUM_ELEVATORS } from './constants';

export function createInitialState(): SimulationState {
  const elevators: Elevator[] = [];

  for (let i = 0; i < NUM_ELEVATORS; i++) {
    elevators.push({
      id: `elevator-${i}`,
      position: 1, // Start at ground floor (G)
      velocity: 0,
      targetFloor: null,
      doorsOpen: false,
      doorTimer: 0,
      doorProgress: 0,
      state: 'idle'
    });
  }

  const building: Building = {
    floorCount: FLOOR_COUNT,
    floorHeight: FLOOR_HEIGHT
  };

  const metrics: Metrics = {
    totalWaitTime: 0,
    totalTravelTime: 0,
    callsServed: 0
  };

  const priorities: Priorities = {
    waitTime: 0.5,
    travelTime: 0.3,
    energy: 0.1,
    wear: 0.05,
    fairness: 0.05
  };

  return {
    elevators,
    building,
    calls: [],
    metrics,
    time: 0,
    priorities
  };
}

export function addCall(state: SimulationState, floor: number, direction: 'up' | 'down'): void {
  // Don't add duplicate calls for same floor/direction
  const exists = state.calls.some(c => c.floor === floor && c.direction === direction);
  if (exists) return;

  const call: Call = {
    id: `call-${Date.now()}-${Math.random()}`,
    floor,
    direction,
    timestamp: state.time
  };

  state.calls.push(call);
}

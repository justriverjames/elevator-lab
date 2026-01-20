import type { SimulationState, Call, Elevator, Priorities } from './types';

export function scheduleWeighted(state: SimulationState): void {
  const { elevators, calls, priorities } = state;

  if (calls.length === 0) return;

  // Assign calls to elevators based on weighted cost function
  for (const call of calls) {
    let bestElevator: Elevator | null = null;
    let lowestCost = Infinity;

    for (const elevator of elevators) {
      // Skip if elevator already has a target
      if (elevator.targetFloor !== null) continue;
      if (elevator.state !== 'idle') continue;

      const cost = calculateCost(elevator, call, state, priorities);

      if (cost < lowestCost) {
        lowestCost = cost;
        bestElevator = elevator;
      }
    }

    // Assign call to best elevator
    if (bestElevator) {
      bestElevator.targetFloor = call.floor;

      // Record metrics
      call.pickedUpAt = state.time;
      const waitTime = call.pickedUpAt - call.timestamp;
      state.metrics.totalWaitTime += waitTime;
      state.metrics.callsServed++;

      // Remove call from queue
      const callIndex = calls.indexOf(call);
      calls.splice(callIndex, 1);
      break; // Assign one call per tick
    }
  }
}

function calculateCost(
  elevator: Elevator,
  call: Call,
  state: SimulationState,
  priorities: Priorities
): number {
  let cost = 0;

  // Wait time: How long the passenger has been waiting + travel time
  const currentWait = state.time - call.timestamp;
  const distance = Math.abs(elevator.position - call.floor);
  const estimatedTravelTime = estimateTime(distance);
  const totalWaitTime = currentWait + estimatedTravelTime;
  cost += priorities.waitTime * totalWaitTime * 10;

  // Travel time: How long it takes elevator to reach the call
  cost += priorities.travelTime * estimatedTravelTime * 10;

  // Energy: Distance elevator must travel
  cost += priorities.energy * distance * 5;

  // Wear: Favor elevators with less total movement
  const elevatorMoves = Math.abs(elevator.position);
  cost += priorities.wear * elevatorMoves * 2;

  // Fairness: Penalize if call has been waiting a long time
  if (currentWait > 30) {
    cost -= priorities.fairness * (currentWait - 30) * 20;
  }

  return cost;
}

function estimateTime(distance: number): number {
  // Simplified: assumes constant velocity
  // In reality we'd account for acceleration/deceleration
  const MAX_VELOCITY = 2.0;
  return distance / MAX_VELOCITY;
}

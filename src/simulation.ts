import type { SimulationState, Elevator, Building, Metrics, Call, Priorities, Passenger } from './types';
import { FLOOR_COUNT, FLOOR_HEIGHT, NUM_ELEVATORS, ELEVATOR_MASS, MAX_CAPACITY, BASE_DWELL_TIME, PASSENGER_FADE_IN_TIME, PASSENGER_FADE_OUT_TIME, TIME_PER_BOARDING, TIME_PER_EXITING, MAX_DWELL_TIME, DOOR_OPEN_TIME } from './constants';

export function createInitialState(): SimulationState {
  const elevators: Elevator[] = [];

  for (let i = 0; i < NUM_ELEVATORS; i++) {
    elevators.push({
      id: `elevator-${i}`,
      position: 1,
      velocity: 0,
      targetFloor: null,
      doorsOpen: false,
      doorTimer: 0,
      doorProgress: 0,
      state: 'idle',
      mass: ELEVATOR_MASS,
      passengerCount: 0,
      energy: {
        instantaneousPower: 0,
        cumulativeEnergy: 0
      },
      boardingQueue: [],
      exitingQueue: [],
      dynamicDwellTime: BASE_DWELL_TIME
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
    priorities,
    passengers: [],
    trafficPattern: 'random',
    passengerSpawnRate: 0.5,
    spawnAccumulator: 0
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

export function spawnPassenger(state: SimulationState, pattern: 'random' | 'morning-up' | 'evening-down'): void {
  let floor: number;
  let destination: number;

  // Traffic pattern logic
  if (pattern === 'morning-up') {
    floor = Math.random() < 0.8 ? 1 : Math.floor(Math.random() * FLOOR_COUNT);
    destination = floor === 1
      ? Math.floor(Math.random() * (FLOOR_COUNT - 2)) + 2
      : 1;
  } else if (pattern === 'evening-down') {
    floor = Math.random() < 0.8
      ? Math.floor(Math.random() * (FLOOR_COUNT - 2)) + 2
      : Math.floor(Math.random() * FLOOR_COUNT);
    destination = floor > 1
      ? (Math.random() < 0.5 ? 1 : 0)
      : Math.floor(Math.random() * FLOOR_COUNT);
  } else {
    // Random
    floor = Math.floor(Math.random() * FLOOR_COUNT);
    destination = Math.floor(Math.random() * FLOOR_COUNT);
    while (destination === floor) {
      destination = Math.floor(Math.random() * FLOOR_COUNT);
    }
  }

  const passenger: Passenger = {
    id: `passenger-${Date.now()}-${Math.random()}`,
    currentFloor: floor,
    destinationFloor: destination,
    state: 'waiting',
    spawnedAt: state.time,
    opacity: 0.0,
    animationProgress: 0.0,
    queuePosition: undefined
  };

  state.passengers.push(passenger);

  // Create call for passenger
  const direction: 'up' | 'down' = destination > floor ? 'up' : 'down';
  addCall(state, floor, direction);
}

export function updatePassengerAnimations(state: SimulationState, dt: number): void {
  for (const passenger of state.passengers) {
    // Waiting passengers: fade in
    if (passenger.state === 'waiting') {
      passenger.animationProgress += dt / PASSENGER_FADE_IN_TIME;
      passenger.animationProgress = Math.min(1.0, passenger.animationProgress);
      passenger.opacity = passenger.animationProgress;
    }

    // Boarding passengers: fade out
    if (passenger.state === 'boarding') {
      passenger.animationProgress += dt / PASSENGER_FADE_OUT_TIME;
      passenger.animationProgress = Math.min(1.0, passenger.animationProgress);
      passenger.opacity = 1.0 - passenger.animationProgress;
    }
  }
}

export function updatePassengers(state: SimulationState): void {
  for (const elevator of state.elevators) {
    const currentFloor = Math.round(elevator.position);

    // PHASE 1: Build queues when doors START opening (doorProgress === 0)
    if (elevator.state === 'doors-opening' && elevator.doorProgress === 0) {
      // Queue passengers who need to exit at this floor
      const exitingPassengers = state.passengers.filter(
        p => p.state === 'riding' &&
            p.elevatorId === elevator.id &&
            p.destinationFloor === currentFloor
      );
      elevator.exitingQueue = exitingPassengers.map(p => p.id);

      // Queue passengers waiting to board (respect capacity)
      const waitingPassengers = state.passengers.filter(
        p => p.state === 'waiting' && p.currentFloor === currentFloor
      );
      const availableCapacity = MAX_CAPACITY - elevator.passengerCount;
      elevator.boardingQueue = waitingPassengers
        .slice(0, availableCapacity)
        .map(p => p.id);

      // Calculate dynamic dwell time based on passenger counts
      const exitCount = elevator.exitingQueue.length;
      const boardCount = elevator.boardingQueue.length;
      elevator.dynamicDwellTime = BASE_DWELL_TIME +
                                  (exitCount * TIME_PER_EXITING) +
                                  (boardCount * TIME_PER_BOARDING);
      elevator.dynamicDwellTime = Math.min(MAX_DWELL_TIME, elevator.dynamicDwellTime);
    }

    // PHASE 2: Process queues one-by-one during door-opening state
    if (elevator.state === 'doors-opening') {
      const timeIntoOpen = DOOR_OPEN_TIME - elevator.doorTimer;

      // Exit passengers first (one every TIME_PER_EXITING seconds)
      if (elevator.exitingQueue.length > 0) {
        const passengersToExit = Math.floor(timeIntoOpen / TIME_PER_EXITING);

        for (let i = 0; i < passengersToExit && i < elevator.exitingQueue.length; i++) {
          const passengerId = elevator.exitingQueue[i];
          const passenger = state.passengers.find(p => p.id === passengerId);

          if (passenger && passenger.state !== 'exiting') {
            passenger.state = 'exiting';
            passenger.arrivedAt = state.time;
            passenger.animationProgress = 0.0;
            elevator.passengerCount--;
          }
        }
      }

      // Board passengers after all exits complete (one every TIME_PER_BOARDING seconds)
      const exitDuration = elevator.exitingQueue.length * TIME_PER_EXITING;
      if (timeIntoOpen > exitDuration && elevator.boardingQueue.length > 0) {
        const timeIntoBoardingPhase = timeIntoOpen - exitDuration;
        const passengersToBoard = Math.floor(timeIntoBoardingPhase / TIME_PER_BOARDING);

        for (let i = 0; i < passengersToBoard && i < elevator.boardingQueue.length; i++) {
          const passengerId = elevator.boardingQueue[i];
          const passenger = state.passengers.find(p => p.id === passengerId);

          if (passenger && passenger.state === 'waiting') {
            passenger.state = 'boarding';
            passenger.elevatorId = elevator.id;
            passenger.boardedAt = state.time;
            passenger.animationProgress = 0.0;
            passenger.queuePosition = i;
            elevator.passengerCount++;
          }
        }
      }
    }

    // PHASE 3: Clear queues and transition boarding → riding when doors close
    if (elevator.state === 'doors-closing') {
      elevator.boardingQueue = [];
      elevator.exitingQueue = [];

      const boardingPassengers = state.passengers.filter(
        p => p.state === 'boarding' && p.elevatorId === elevator.id
      );

      for (const p of boardingPassengers) {
        p.state = 'riding';
        p.animationProgress = 0.0;
        p.opacity = 1.0;
      }
    }
  }

  // PHASE 4: Remove passengers who have fully faded out
  state.passengers = state.passengers.filter(p => {
    if (p.state === 'exiting') {
      return p.opacity > 0.0;  // Keep until fully faded
    }
    return true;
  });
}

export interface Preset {
  name: string;
  priorities: Priorities;
  trafficPattern: 'random' | 'morning-up' | 'evening-down';
  spawnRate: number;
}

export const PRESETS: Record<string, Preset> = {
  residential: {
    name: 'Residential Building',
    priorities: { waitTime: 0.4, travelTime: 0.2, energy: 0.2, wear: 0.1, fairness: 0.1 },
    trafficPattern: 'random',
    spawnRate: 0.3
  },
  office: {
    name: 'Office Building',
    priorities: { waitTime: 0.5, travelTime: 0.3, energy: 0.1, wear: 0.05, fairness: 0.05 },
    trafficPattern: 'morning-up',
    spawnRate: 1.0
  },
  hospital: {
    name: 'Hospital',
    priorities: { waitTime: 0.3, travelTime: 0.2, energy: 0.1, wear: 0.05, fairness: 0.35 },
    trafficPattern: 'random',
    spawnRate: 0.5
  }
};

export function applyPreset(state: SimulationState, presetKey: string): void {
  const preset = PRESETS[presetKey];
  state.priorities = { ...preset.priorities };
  state.trafficPattern = preset.trafficPattern;
  state.passengerSpawnRate = preset.spawnRate;
}

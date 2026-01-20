export interface EnergyMetrics {
  instantaneousPower: number;  // kW
  cumulativeEnergy: number;    // kWh
}

export interface Elevator {
  id: string;
  position: number;
  velocity: number;
  targetFloor: number | null;
  doorsOpen: boolean;
  doorTimer: number;
  doorProgress: number;
  state: 'idle' | 'moving' | 'doors-opening' | 'doors-closing';
  mass: number;
  passengerCount: number;
  energy: EnergyMetrics;
  boardingQueue: string[];
  exitingQueue: string[];
  dynamicDwellTime: number;
}

export interface Passenger {
  id: string;
  currentFloor: number;
  destinationFloor: number;
  state: 'waiting' | 'boarding' | 'riding' | 'exiting' | 'arrived';
  spawnedAt: number;
  boardedAt?: number;
  arrivedAt?: number;
  elevatorId?: string;
  opacity: number;
  animationProgress: number;
  queuePosition?: number;
}

export interface Call {
  id: string;
  floor: number;
  direction: 'up' | 'down';
  timestamp: number; // when the call was placed
  pickedUpAt?: number; // when elevator arrived
}

export interface Building {
  floorCount: number;
  floorHeight: number; // meters
}

export interface Metrics {
  totalWaitTime: number;
  totalTravelTime: number;
  callsServed: number;
}

export interface SimulationState {
  elevators: Elevator[];
  building: Building;
  calls: Call[];
  metrics: Metrics;
  time: number; // simulation time in seconds
  priorities: Priorities;
  passengers: Passenger[];
  trafficPattern: 'random' | 'morning-up' | 'evening-down';
  passengerSpawnRate: number;
  spawnAccumulator: number;
}

export interface Priorities {
  waitTime: number;      // 0-1
  travelTime: number;    // 0-1
  energy: number;        // 0-1
  wear: number;          // 0-1
  fairness: number;      // 0-1
}

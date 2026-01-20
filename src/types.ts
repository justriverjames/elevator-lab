export interface Elevator {
  id: string;
  position: number; // 0 = ground floor, floors are integers
  velocity: number; // floors per second
  targetFloor: number | null;
  doorsOpen: boolean;
  doorTimer: number; // seconds remaining for door operation
  doorProgress: number; // 0 = closed, 1 = fully open
  state: 'idle' | 'moving' | 'doors-opening' | 'doors-closing';
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
}

export interface Priorities {
  waitTime: number;      // 0-1
  travelTime: number;    // 0-1
  energy: number;        // 0-1
  wear: number;          // 0-1
  fairness: number;      // 0-1
}

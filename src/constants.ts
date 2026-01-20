// Physics constants
export const MAX_VELOCITY = 2.0; // floors per second
export const ACCELERATION = 1.0; // floors per second^2
export const DOOR_OPEN_TIME = 2.0; // seconds
export const DOOR_CLOSE_TIME = 1.5; // seconds

// Energy and mass constants
export const ELEVATOR_MASS = 1200; // kg (empty car)
export const MAX_CAPACITY = 12; // passengers
export const PASSENGER_WEIGHT = 75; // kg average
export const MOTOR_EFFICIENCY = 0.85; // 85% efficient
export const FRICTION_COEFFICIENT = 50; // watts per m/s

// Animation timing constants
export const PASSENGER_FADE_IN_TIME = 0.5;
export const PASSENGER_FADE_OUT_TIME = 0.5;
export const TIME_PER_BOARDING = 0.3;
export const TIME_PER_EXITING = 0.2;
export const BASE_DWELL_TIME = 2.0;
export const MAX_DWELL_TIME = 10.0;

// Building constants
export const FLOOR_COUNT = 11; // B1, G, 1-9 (11 total floors)
export const BASEMENT_OFFSET = 1; // Index 0 = B1, Index 1 = G, Index 2+ = numbered floors
export const FLOOR_HEIGHT = 3.0; // meters

// Rendering constants
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 800;
export const FLOOR_RENDER_HEIGHT = CANVAS_HEIGHT / FLOOR_COUNT;
export const ELEVATOR_WIDTH = 60;
export const ELEVATOR_HEIGHT = FLOOR_RENDER_HEIGHT - 6;
export const SHAFT_WIDTH = 90;
export const NUM_ELEVATORS = 3;

// Floor naming helper
export function getFloorLabel(floorIndex: number): string {
  if (floorIndex === 0) return 'B1';
  if (floorIndex === 1) return 'G';
  return `${floorIndex - 1}`;
}

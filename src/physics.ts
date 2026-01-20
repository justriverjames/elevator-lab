import type { Elevator } from './types';
import { MAX_VELOCITY, ACCELERATION, DOOR_OPEN_TIME, DOOR_CLOSE_TIME } from './constants';

export function updateElevator(elevator: Elevator, dt: number): void {
  // Handle door operations
  if (elevator.state === 'doors-opening' || elevator.state === 'doors-closing') {
    elevator.doorTimer -= dt;

    // Update door progress for smooth animation
    if (elevator.state === 'doors-opening') {
      const totalTime = DOOR_OPEN_TIME;
      const elapsed = totalTime - elevator.doorTimer;
      elevator.doorProgress = Math.min(1, elapsed / totalTime);
    } else {
      const totalTime = DOOR_CLOSE_TIME;
      const elapsed = totalTime - elevator.doorTimer;
      elevator.doorProgress = Math.max(0, 1 - (elapsed / totalTime));
    }

    if (elevator.doorTimer <= 0) {
      if (elevator.state === 'doors-opening') {
        elevator.doorsOpen = true;
        elevator.doorProgress = 1;
        elevator.state = 'doors-closing';
        elevator.doorTimer = DOOR_CLOSE_TIME;
      } else {
        elevator.doorsOpen = false;
        elevator.doorProgress = 0;
        elevator.state = 'idle';
      }
    }
    return;
  }

  // If idle or no target, stop
  if (elevator.targetFloor === null) {
    elevator.velocity = 0;
    elevator.state = 'idle';
    return;
  }

  const distanceToTarget = elevator.targetFloor - elevator.position;
  const direction = Math.sign(distanceToTarget);

  // Check if arrived at target floor
  if (Math.abs(distanceToTarget) < 0.01) {
    elevator.position = elevator.targetFloor;
    elevator.velocity = 0;
    elevator.state = 'doors-opening';
    elevator.doorTimer = DOOR_OPEN_TIME;
    elevator.targetFloor = null;
    return;
  }

  // Calculate stopping distance at current velocity
  const stoppingDistance = (elevator.velocity * elevator.velocity) / (2 * ACCELERATION);

  // Decide whether to accelerate or decelerate
  if (Math.abs(distanceToTarget) > stoppingDistance && Math.abs(elevator.velocity) < MAX_VELOCITY) {
    // Accelerate
    elevator.velocity += direction * ACCELERATION * dt;
    elevator.velocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, elevator.velocity));
  } else {
    // Decelerate
    const deceleration = direction * ACCELERATION * dt;
    if (Math.abs(elevator.velocity - deceleration) < Math.abs(elevator.velocity)) {
      elevator.velocity -= deceleration;
    } else {
      elevator.velocity = 0;
    }
  }

  // Update position
  elevator.position += elevator.velocity * dt;
  elevator.state = elevator.velocity !== 0 ? 'moving' : 'idle';

  // Clamp to prevent overshooting
  if ((direction > 0 && elevator.position > elevator.targetFloor) ||
      (direction < 0 && elevator.position < elevator.targetFloor)) {
    elevator.position = elevator.targetFloor;
  }
}

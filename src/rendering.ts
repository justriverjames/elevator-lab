import type { SimulationState, Elevator } from './types';
import { CANVAS_HEIGHT, FLOOR_RENDER_HEIGHT, ELEVATOR_WIDTH, ELEVATOR_HEIGHT, SHAFT_WIDTH, NUM_ELEVATORS, getFloorLabel } from './constants';

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context');
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  render(state: SimulationState): void {
    this.clear();
    this.drawBuilding(state);
    this.drawShafts(state);
    this.drawCallButtons(state);
    this.drawElevators(state);
  }

  private clear(): void {
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  private drawBuilding(state: SimulationState): void {
    const { floorCount } = state.building;
    const buildingColor = '#2a2a2a';
    const floorLineColor = '#3a3a3a';
    const windowColor = '#4a4a4a';

    for (let i = 0; i < floorCount; i++) {
      const y = this.floorToY(i);

      // Floor background
      this.ctx.fillStyle = buildingColor;
      this.ctx.fillRect(0, y - FLOOR_RENDER_HEIGHT, this.width, FLOOR_RENDER_HEIGHT);

      // Floor line
      this.ctx.strokeStyle = floorLineColor;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();

      // Floor number (left side)
      this.ctx.fillStyle = '#888';
      this.ctx.font = '13px monospace';
      const label = getFloorLabel(i);
      this.ctx.fillText(label, 10, y - FLOOR_RENDER_HEIGHT / 2 + 5);

      // Windows on left side (skip basement)
      if (i > 0) {
        const windowY = y - FLOOR_RENDER_HEIGHT + 15;
        for (let wx = 40; wx < 100; wx += 25) {
          this.ctx.fillStyle = windowColor;
          this.ctx.fillRect(wx, windowY, 15, FLOOR_RENDER_HEIGHT - 30);
        }
      }

      // Windows on right side (after shafts, skip basement)
      if (i > 0) {
        const windowY = y - FLOOR_RENDER_HEIGHT + 15;
        const rightStart = this.getShaftX(NUM_ELEVATORS - 1) + SHAFT_WIDTH + 25;
        for (let wx = rightStart; wx < this.width - 25; wx += 25) {
          this.ctx.fillStyle = windowColor;
          this.ctx.fillRect(wx, windowY, 15, FLOOR_RENDER_HEIGHT - 30);
        }
      }
    }
  }

  private drawShafts(state: SimulationState): void {
    const { floorCount } = state.building;

    for (let i = 0; i < NUM_ELEVATORS; i++) {
      const x = this.getShaftX(i);

      // Shaft background
      this.ctx.fillStyle = '#222';
      this.ctx.fillRect(x, 0, SHAFT_WIDTH, this.height);

      // Shaft walls
      this.ctx.strokeStyle = '#444';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(x + SHAFT_WIDTH, 0);
      this.ctx.lineTo(x + SHAFT_WIDTH, this.height);
      this.ctx.stroke();

      // Cable guide rails
      this.ctx.strokeStyle = '#333';
      this.ctx.lineWidth = 1;
      this.ctx.setLineDash([4, 4]);
      this.ctx.beginPath();
      this.ctx.moveTo(x + 10, 0);
      this.ctx.lineTo(x + 10, this.height);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(x + SHAFT_WIDTH - 10, 0);
      this.ctx.lineTo(x + SHAFT_WIDTH - 10, this.height);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }
  }

  private drawCallButtons(state: SimulationState): void {
    const { floorCount } = state.building;
    const buttonX = this.getShaftX(0) - 30;

    for (let floor = 0; floor < floorCount; floor++) {
      const y = this.floorToY(floor);
      const centerY = y - FLOOR_RENDER_HEIGHT / 2;

      // Up button (if not top floor)
      if (floor < floorCount - 1) {
        const upActive = state.calls.some(c => c.floor === floor && c.direction === 'up');
        this.drawCallButton(buttonX, centerY - 12, 'up', upActive);
      }

      // Down button (if not ground floor)
      if (floor > 0) {
        const downActive = state.calls.some(c => c.floor === floor && c.direction === 'down');
        this.drawCallButton(buttonX, centerY + 4, 'down', downActive);
      }
    }
  }

  private drawCallButton(x: number, y: number, direction: 'up' | 'down', active: boolean): void {
    // Button background
    this.ctx.fillStyle = active ? '#ff6b6b' : '#3a3a3a';
    this.ctx.fillRect(x - 8, y - 8, 16, 16);

    // Button border
    this.ctx.strokeStyle = active ? '#ff8888' : '#555';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(x - 8, y - 8, 16, 16);

    // Arrow
    this.ctx.fillStyle = active ? '#fff' : '#888';
    this.ctx.font = '10px monospace';
    const arrow = direction === 'up' ? '▲' : '▼';
    this.ctx.fillText(arrow, x - 5, y + 5);
  }

  private drawElevators(state: SimulationState): void {
    state.elevators.forEach((elevator, index) => {
      this.drawElevator(elevator, index, state);
    });
  }

  private drawElevator(elevator: Elevator, index: number, state: SimulationState): void {
    const shaftX = this.getShaftX(index);
    const x = shaftX + (SHAFT_WIDTH - ELEVATOR_WIDTH) / 2;
    const y = this.floorToY(elevator.position);

    // Cables
    this.ctx.strokeStyle = '#555';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(x + 10, 0);
    this.ctx.lineTo(x + 10, y - ELEVATOR_HEIGHT - 2);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x + ELEVATOR_WIDTH - 10, 0);
    this.ctx.lineTo(x + ELEVATOR_WIDTH - 10, y - ELEVATOR_HEIGHT - 2);
    this.ctx.stroke();

    // Elevator car body
    const carColor = elevator.state === 'moving' ? '#3a7ed8' : '#4a9eff';
    this.ctx.fillStyle = carColor;
    this.ctx.fillRect(x, y - ELEVATOR_HEIGHT - 2, ELEVATOR_WIDTH, ELEVATOR_HEIGHT);

    // Car outline
    this.ctx.strokeStyle = '#2a5ea8';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y - ELEVATOR_HEIGHT - 2, ELEVATOR_WIDTH, ELEVATOR_HEIGHT);

    // Animated doors
    this.drawDoors(elevator, x, y);

    // Direction indicator
    if (elevator.state === 'moving') {
      const arrow = elevator.velocity > 0 ? '▲' : '▼';
      this.ctx.fillStyle = '#ffd700';
      this.ctx.font = 'bold 14px monospace';
      this.ctx.fillText(arrow, x + ELEVATOR_WIDTH / 2 - 6, y - ELEVATOR_HEIGHT - 8);
    }

    // Target floor indicator
    if (elevator.targetFloor !== null) {
      const targetY = this.floorToY(elevator.targetFloor);
      this.ctx.strokeStyle = '#4a9eff';
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([4, 4]);
      this.ctx.strokeRect(shaftX + 2, targetY - FLOOR_RENDER_HEIGHT + 2, SHAFT_WIDTH - 4, FLOOR_RENDER_HEIGHT - 4);
      this.ctx.setLineDash([]);
    }
  }

  private drawDoors(elevator: Elevator, x: number, y: number): void {
    const doorHeight = ELEVATOR_HEIGHT - 8;
    const doorY = y - ELEVATOR_HEIGHT + 2;
    const maxDoorWidth = (ELEVATOR_WIDTH - 4) / 2;
    const doorWidth = maxDoorWidth * (1 - elevator.doorProgress);

    // Left door
    this.ctx.fillStyle = '#666';
    this.ctx.fillRect(x + 2, doorY, doorWidth, doorHeight);

    // Right door
    this.ctx.fillRect(x + ELEVATOR_WIDTH - 2 - doorWidth, doorY, doorWidth, doorHeight);

    // Door handles
    if (elevator.doorProgress < 0.9) {
      this.ctx.fillStyle = '#888';
      const handleY = doorY + doorHeight / 2;
      this.ctx.fillRect(x + 2 + doorWidth - 2, handleY - 6, 4, 12);
      this.ctx.fillRect(x + ELEVATOR_WIDTH - 2 - doorWidth - 2, handleY - 6, 4, 12);
    }
  }

  private getShaftX(elevatorIndex: number): number {
    const totalShaftWidth = NUM_ELEVATORS * SHAFT_WIDTH;
    const startX = (this.width - totalShaftWidth) / 2;
    return startX + (elevatorIndex * SHAFT_WIDTH);
  }

  private floorToY(floor: number): number {
    return CANVAS_HEIGHT - (floor * FLOOR_RENDER_HEIGHT);
  }

  yToFloor(y: number, floorCount: number): number {
    const floor = Math.floor((CANVAS_HEIGHT - y) / FLOOR_RENDER_HEIGHT);
    return Math.max(0, Math.min(floorCount - 1, floor));
  }

  xToDirection(x: number): 'up' | 'down' | null {
    const buttonX = this.getShaftX(0) - 30;
    const dist = Math.abs(x - buttonX);
    return dist < 15 ? 'up' : null; // We'll handle up/down based on Y position
  }

  isCallButtonClick(x: number, y: number, floorCount: number): { floor: number; direction: 'up' | 'down' } | null {
    const buttonX = this.getShaftX(0) - 30;
    const dist = Math.abs(x - buttonX);

    if (dist > 15) return null;

    const floor = this.yToFloor(y, floorCount);
    const floorY = this.floorToY(floor);
    const centerY = floorY - FLOOR_RENDER_HEIGHT / 2;

    // Check up button
    if (floor < floorCount - 1 && Math.abs(y - (centerY - 12)) < 10) {
      return { floor, direction: 'up' };
    }

    // Check down button
    if (floor > 0 && Math.abs(y - (centerY + 4)) < 10) {
      return { floor, direction: 'down' };
    }

    return null;
  }
}

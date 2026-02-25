export type InputType = 'key' | 'mouse' | 'touch';
export interface TrackedEvent {
  t: number; // timestamp via performance.now()
  type: InputType;
  code?: string;
  x?: number;
  y?: number;
}

export class InputTracker {
  private handler: (e: TrackedEvent) => void;
  private attached = false;
  constructor(handler: (e: TrackedEvent) => void) {
    this.handler = handler;
  }
  attach() {
    if (this.attached) return;
    this.attached = true;
    window.addEventListener('keydown', this.onKey, { passive: true });
    window.addEventListener('mousedown', this.onMouse, { passive: true });
    window.addEventListener('touchstart', this.onTouch, { passive: true });
  }
  detach() {
    if (!this.attached) return;
    this.attached = false;
    window.removeEventListener('keydown', this.onKey);
    window.removeEventListener('mousedown', this.onMouse);
    window.removeEventListener('touchstart', this.onTouch);
  }
  private onKey = (ev: KeyboardEvent) => {
    this.handler({ t: performance.now(), type: 'key', code: ev.code });
  };
  private onMouse = (ev: MouseEvent) => {
    this.handler({ t: performance.now(), type: 'mouse', x: ev.clientX, y: ev.clientY });
  };
  private onTouch = (ev: TouchEvent) => {
    const t0 = ev.touches[0];
    this.handler({ t: performance.now(), type: 'touch', x: t0?.clientX, y: t0?.clientY });
  };
}

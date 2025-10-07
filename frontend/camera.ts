import { Position } from "./geometry";
import { GRID_SIZE_P } from "./settings";

export class Camera {
    is_dirty: boolean = true; // Is dirty when the camera has moved or zoomed
    position: Position = new Position(); // In world pixels, 0, 0 = center of the grid
    zoom_level: number = 0; // 0 = real size (1 world pixel = 1 screen pixel), +1 = 2x, -1 = 0.5x, etc.

    constructor() {
        window.addEventListener("wheel", this.on_wheel.bind(this));
    }

    on_wheel(e: WheelEvent) {
        e.preventDefault();
        if (e.deltaY < 0) {
            this.zoom_level = Math.min(this.zoom_level + 1, 10);
        } else {
            this.zoom_level = Math.max(this.zoom_level - 1, -4);
        }
        this.is_dirty = true;
    }

    get zoom_scale(): number {
        return Math.pow(2, this.zoom_level);
    }

    set zoom_scale(z: number) {
        this.zoom_level = Math.log2(z);
        this.is_dirty = true;
    }

    clean() {
        this.is_dirty = false;
    }

    apply(ctx: CanvasRenderingContext2D) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2); // Move to center of canvas
        ctx.scale(this.zoom_scale, this.zoom_scale); // Apply zoom
        ctx.translate(-this.position.x, -this.position.y); // Move to camera position
    }
}
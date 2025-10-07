import { GRID_SIZE_P, PALETTE_COLORS } from "./settings";

export class World {
    is_dirty: boolean = true;
    ctx: CanvasRenderingContext2D;

    constructor() {
        const canvas = document.createElement("canvas");
        canvas.width = GRID_SIZE_P;
        canvas.height = GRID_SIZE_P;
        this.ctx = canvas.getContext("2d")!;

        // Fill the canvas with the background color
        this.ctx.fillStyle = PALETTE_COLORS[0];
        this.ctx.fillRect(0, 0, GRID_SIZE_P, GRID_SIZE_P);
    }

    set_pixel(x: number, y: number, color_index: number) {
        if (x < 0 || x >= GRID_SIZE_P || y < 0 || y >= GRID_SIZE_P) {
            throw new Error(`set_pixel: invalid coordinates: (${x}, ${y})`);
        }

        if (color_index < 0 || color_index >= PALETTE_COLORS.length) {
            throw new Error(`set_pixel: invalid color index: ${color_index}`);
        }

        this.ctx.fillStyle = PALETTE_COLORS[color_index];
        this.ctx.fillRect(x, y, 1, 1);
        this.is_dirty = true;
    }

    clean() {
        this.is_dirty = false;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(-GRID_SIZE_P / 2, -GRID_SIZE_P / 2); // Center the grid
        ctx.drawImage(this.ctx.canvas, 0, 0);
        ctx.restore();
    }
}
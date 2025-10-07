import { Camera } from "./camera";
import { GRID_SIZE_P, PALETTE_COLORS } from "./settings";
import { create_palette_ui } from "./ui";
import { World } from "./world";

export class Engine {
    selected_color: number = 1;
    camera: Camera;
    world: World;
    ctx: CanvasRenderingContext2D;

    constructor() {
        this.camera = new Camera();
        this.world = new World();

        // Set up some test pixels
        for (let y = 0; y < GRID_SIZE_P; y++) {
            for (let x = 0; x < GRID_SIZE_P; x++) {
                this.world.set_pixel(x, y, (x + y) % PALETTE_COLORS.length);
            }
        }

        // Create the display canvas
        const display_canvas = document.querySelector("canvas") as HTMLCanvasElement;
        this.ctx = display_canvas.getContext("2d")!;
        this.ctx.imageSmoothingEnabled = false;

        // Create the palette UI
        create_palette_ui(this.on_color_selected.bind(this), this.selected_color);
    }

    on_color_selected(color_index: number) {
        this.selected_color = color_index;
    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.save();
        this.camera.apply(this.ctx);
        this.world.render(this.ctx);
        this.ctx.restore();
    }

    update() {
        if (this.is_dirty) {
            this.render();
            this.clean();
        }
    }

    loop() {
        this.update();
        requestAnimationFrame(() => this.loop());
    }

    get is_dirty() {
        return this.world.is_dirty || this.camera.is_dirty;
    }

    clean() {
        this.world.clean();
        this.camera.clean();
    }
}
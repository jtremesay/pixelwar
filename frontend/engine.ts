import { Camera } from "./camera";
import { GRID_SIZE_P } from "./settings";
import { create_palette_ui } from "./ui";
import { World } from "./world";

export class Engine {
    _is_dirty: boolean = true;
    selected_color: number = 1;
    camera: Camera;
    world: World;
    ctx: CanvasRenderingContext2D;

    constructor() {
        this.camera = new Camera();
        this.world = new World();

        // Create the display canvas
        const canvas = document.querySelector("canvas") as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.ctx = canvas.getContext("2d")!;
        window.addEventListener("resize", this.on_resize.bind(this), { passive: true });
        canvas.addEventListener("mousedown", (e) => {
            this.on_mouse_down(e.clientX, e.clientY);
        });

        // Create the palette UI
        create_palette_ui(this.on_color_selected.bind(this), this.selected_color);
    }

    on_resize() {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this._is_dirty = true;
    }

    on_color_selected(color_index: number) {
        this.selected_color = color_index;
    }

    on_mouse_down(x: number, y: number) {
        const world_pos = this.camera.screen_to_world(x, y);
        const pixel_x = Math.floor(world_pos.x + GRID_SIZE_P / 2);
        const pixel_y = Math.floor(world_pos.y + GRID_SIZE_P / 2);

        if (pixel_x < 0 || pixel_x >= GRID_SIZE_P || pixel_y < 0 || pixel_y >= GRID_SIZE_P) {
            return; // Out of bounds
        }
        this.world.set_pixel(pixel_x, pixel_y, this.selected_color);

    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.imageSmoothingEnabled = false;
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
        return this._is_dirty || this.world.is_dirty || this.camera.is_dirty;
    }

    clean() {
        this._is_dirty = false;
        this.world.clean();
        this.camera.clean();
    }
}
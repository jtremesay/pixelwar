import { GRID_SIZE_P, PALETTE_COLORS } from "./settings";

export class Engine {
    is_dirty: boolean = true; // Is dirty when the inner canvas has changed or the camera as moved
    selected_color: number = 1;
    inner_ctx: CanvasRenderingContext2D;
    display_ctx: CanvasRenderingContext2D;
    camera_pos: [number, number] = [0, 0]; // In world pixels, 0, 0 = center of the grid
    zoom_level: number = 0; // 0 = real size (1 world pixel = 8 screen pixel), +1 = 2x, -1 = 0.5x, etc.
    selected_pixel: [number, number] | null = null; // The currently selected pixel in world coordinates

    constructor() {
        // Initialize the palette   
        this.create_palette_ui();

        // Create the inner display canvas
        const inner_canvas = document.createElement("canvas");
        inner_canvas.width = GRID_SIZE_P;
        inner_canvas.height = GRID_SIZE_P;
        this.inner_ctx = inner_canvas.getContext("2d")!;

        // Fill the inner canvas with the background color
        this.inner_ctx.fillStyle = PALETTE_COLORS[0];
        this.inner_ctx.fillRect(0, 0, GRID_SIZE_P, GRID_SIZE_P);

        // Set up some test pixels
        for (let y = 0; y < GRID_SIZE_P; y++) {
            for (let x = 0; x < GRID_SIZE_P; x++) {
                this.set_pixel(x, y, (x + y) % PALETTE_COLORS.length);
            }
        }

        // Create the display canvas
        const display_canvas = document.querySelector("canvas") as HTMLCanvasElement;
        this.display_ctx = display_canvas.getContext("2d")!;

        // Zoom level, bind on scroll
        window.addEventListener("wheel", (e) => {
            if (e.deltaY < 0) {
                this.zoom_level = Math.min(this.zoom_level + 1, 10);
            } else {
                this.zoom_level = Math.max(this.zoom_level - 1, -4);
            }
            this.is_dirty = true;
        });
    }

    set_pixel(x: number, y: number, color_index: number) {
        if (x < 0 || x >= GRID_SIZE_P || y < 0 || y >= GRID_SIZE_P) {
            throw new Error(`set_pixel: invalid coordinates: (${x}, ${y})`);
        }

        if (color_index < 0 || color_index >= PALETTE_COLORS.length) {
            throw new Error(`set_pixel: invalid color index: ${color_index}`);
        }

        this.inner_ctx.fillStyle = PALETTE_COLORS[color_index];
        this.inner_ctx.fillRect(x, y, 1, 1);

        this.is_dirty = true;
    }

    draw_world() {
        // Fill the background
        this.display_ctx.fillRect(0, 0, this.display_ctx.canvas.width, this.display_ctx.canvas.height);

        this.display_ctx.save();
        {
            // inner is draw with anchor in the center, with camera offset and zoom applied
            const zoomed_pixel_size = Math.pow(2, this.zoom_level);
            this.display_ctx.translate(this.display_ctx.canvas.width / 2, this.display_ctx.canvas.height / 2);
            this.display_ctx.scale(zoomed_pixel_size, zoomed_pixel_size);
            this.display_ctx.translate(-GRID_SIZE_P / 2 - this.camera_pos[0], -GRID_SIZE_P / 2 - this.camera_pos[1]);

            // Draw the pixels
            this.display_ctx.imageSmoothingEnabled = false;
            this.display_ctx.drawImage(this.inner_ctx.canvas, 0, 0);
        }
        this.display_ctx.restore();
    }

    update() {
        if (this.is_dirty) {
            this.draw_world();
            this.is_dirty = false;
        }
    }

    loop() {
        this.update();
        requestAnimationFrame(() => this.loop());
    }

    create_palette_ui() {
        // Get the palette element
        const palette_e = document.querySelector("#palette")!;

        // Create a color button for each color in the palette
        PALETTE_COLORS.forEach((color, index) => {
            // Create a container for the color
            const color_e = palette_e.appendChild(document.createElement("div"));
            color_e.className = "color";

            // Create the radio input
            const input_e = color_e.appendChild(document.createElement("input"));
            input_e.type = "radio";
            input_e.id = `color-${index}`;
            input_e.name = "color";

            if (index === this.selected_color) {
                input_e.checked = true;
            }

            // Create the label
            const label_e = color_e.appendChild(document.createElement("label"));
            label_e.style.backgroundColor = color;
            label_e.htmlFor = input_e.id;

            // When the input is changed, update the selected color in the engine
            input_e.addEventListener("change", () => {
                this.selected_color = index;
            })
        })
    }
}
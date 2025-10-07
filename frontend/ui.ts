import { PALETTE_COLORS } from "./settings";

export function create_palette_ui(callback: (color_index: number) => void, selected_color: number = 1) {
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
        input_e.addEventListener("change", () => {
            callback(index);
        })
        input_e.checked = index == selected_color;

        // Create the label
        const label_e = color_e.appendChild(document.createElement("label"));
        label_e.style.backgroundColor = color;
        label_e.htmlFor = input_e.id;
    });
}
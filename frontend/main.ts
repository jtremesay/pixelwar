const palette_colors = [
    "#FFFFFF",
    "#000000",
    "#ff4242",
    "#ffaa00",
    "#ffff42",
    "#42ff42",
    "#4242ff",
    "#aa42ff",
];

class State {
    selected_color: number;

    constructor(selected_color: number = 1) {
        this.selected_color = selected_color;
    }
}

let state = new State();

let palette_e = document.querySelector("#palette")!;

palette_colors.forEach((color, index) => {
    let color_e = palette_e.appendChild(document.createElement("div"));
    color_e.className = "color";

    let input_e = color_e.appendChild(document.createElement("input"));
    input_e.type = "radio";
    input_e.id = `color-${index}`;
    input_e.name = "color";

    if (index === state.selected_color) {
        input_e.checked = true;
    }

    let label_e = color_e.appendChild(document.createElement("label"));
    label_e.style.backgroundColor = color;
    label_e.htmlFor = input_e.id;

    input_e.addEventListener("change", () => {
        state.selected_color = index;
    })
})
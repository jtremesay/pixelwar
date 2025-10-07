const palette_colors = [
    "#FFFFFF",
    "#000000",
    "#ff4242",
    "#ffaa00",
    "#ffff42",
    "#42ff42",
    "#4242ff",
    "#aa42ff",
]



class State {
    selected_color: number

    constructor(selected_color: number = 1) {
        this.selected_color = selected_color
    }
}

let state = new State()

let palette_e = document.querySelector(".palette")!
if (!palette_e) {
    throw new Error("No palette element")
}

palette_colors.forEach((color, index) => {
    let input_e = document.createElement("input")
    input_e.type = "radio"
    input_e.id = `color-${index}`
    input_e.name = "color"
    input_e.value = index.toString()
    palette_e.appendChild(input_e)

    if (index === state.selected_color) {
        input_e.checked = true
    }

    let label_e = document.createElement("label")
    label_e.style.backgroundColor = color
    label_e.htmlFor = input_e.id
    palette_e.appendChild(label_e)

    input_e.addEventListener("change", (_) => {
        state.selected_color = index
    })
})
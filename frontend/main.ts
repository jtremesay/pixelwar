class State {
    selected_color: number // Color index

    constructor(selected_color: number = 0) {
        this.selected_color = selected_color
    }
}

let state = new State()

let palette_e = document.querySelector(".palette")!
if (!palette_e) {
    throw new Error("No palette element")
}

palette_e.querySelectorAll("input").forEach((e, i) => {
    if (e.checked) {
        console.log("Default color:", i)
        state.selected_color = i
    }

    e.addEventListener("click", () => {
        console.log("Selected color:", i)
        state.selected_color = i
    })
})

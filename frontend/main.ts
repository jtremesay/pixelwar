// Assumptions:
// - Any pixel not explicitly set is the background color (palette index 0)

import { Engine } from "./engine";

function main() {
    const engine = new Engine();
    engine.loop();
}

main();
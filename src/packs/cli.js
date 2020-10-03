#!/usr/bin/env node

(() => {
    if (process.argv.includes("convert") || process.argv.includes("converter")) {
        require("./converter")(process.argv);
        return;
    }

    require("./generate")();
})();

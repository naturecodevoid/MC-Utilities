const path = require("path");

const getPath = () => {
    if (process.env.APPDATA || process.platform === "win32") {
        // Windows
        return path.join(process.env.APPDATA, ".minecraft");
    }

    if (process.platform === "darwin") {
        // Mac OS X
        return path.join(process.env.HOME, "Library", "Application Support", "minecraft");
    }

    // Linux, hopefully
    return path.join(process.env.HOME, ".minecraft");
};

module.exports = getPath();

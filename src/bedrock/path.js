const getPath = () => {
    // This attempts to support mcpe-launcher but is not tested
    if (process.env.LOCALAPPDATA || process.platform === "win32") {
        // Windows
        return path.join(
            process.env.LOCALAPPDATA,
            "Packages",
            "Microsoft.MinecraftUWP_8wekyb3d8bbwe",
            "LocalState",
            "games",
            "com.mojang",
        );
    }

    if (process.platform === "darwin") {
        // Mac OS X
        return path.join(process.env.HOME, "Library", "Application Support", "mcpelauncher", "games", "com.mojang");
    }

    // Linux, hopefully
    return path.join(process.env.HOME, ".local", "share", "mcpelauncher", "games", "com.mojang");
};

module.exports = getPath();

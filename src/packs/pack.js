const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const { log, error, warn, debug } = require("../util");
const util = require("./util");
const archiver = require("archiver");

module.exports = () => {
    const cfg = util.getConfig();
    const config = cfg.data;

    const outPath = path.join(process.cwd(), config.basePack.outPath);

    // Java
    if (config.packJava)
        for (const folder of fs.readdirSync(outPath)) {
            const folderPath = path.join(outPath, folder);
            if (!fs.statSync(folderPath).isDirectory()) {
                continue;
            }

            const output = fs.createWriteStream(`${folderPath} Java.zip`);
            const archive = archiver("zip");

            debug(`${folderPath} Java.zip`);

            output.on("close", () => {
                debug(`${archive.pointer()} total bytes`);
                debug("archiver has been finalized and the output file descriptor has closed.");
            });

            archive.on("error", (err) => {
                throw err;
            });

            archive.pipe(output);

            archive.directory(folderPath, false);

            archive.finalize();
        }

    // Bedrock
    if (config.packBedrock)
        for (const folder of fs.readdirSync(outPath)) {
            const folderPath = path.join(outPath, folder);
            const folderPathTextures = path.join(outPath, folder, "assets");

            if (!fs.statSync(folderPath).isDirectory()) {
                continue;
            }

            const output = fs.createWriteStream(`${folderPath} Bedrock.zip`);
            const archive = archiver("zip");

            debug(`${folderPath} Bedrock.zip`);

            output.on("close", () => {
                debug(`${archive.pointer()} total bytes`);
                debug("archiver has been finalized and the output file descriptor has closed.");
            });

            archive.on("error", (err) => {
                throw err;
            });

            archive.pipe(output);

            archive.directory(folderPathTextures, false);

            archive.finalize();
        }
};

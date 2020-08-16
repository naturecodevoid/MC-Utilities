const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const { log, error, warn, tryvoid } = require("../util");
const util = require("./util");

module.exports = () => {
    const cfg = util.getConfig();
    const config = cfg.data;

    const outPath = path.join(process.cwd(), config.basePack.outPath);
    const packPath = path.join(process.cwd(), config.basePack.path);

    tryvoid(() => fs.mkdirSync(outPath));
    tryvoid(() => fs.emptyDirSync(outPath));

    fs.copySync(packPath, path.join(outPath, config.basePack.name.length <= 0 ? "pack" : config.basePack.name));

    let i = 1;
    const names = [];
    for (const variation of config.variations) {
        if (variation.name === config.basePack.name || names.includes(variation.name) || variation.name.length <= 0) {
            variation.name = config.basePack.name + i.toString();
            i++;
            const a = () => {
                if (names.includes(variation.name)) {
                    variation.name = config.basePack.name + i.toString();
                    i++;
                    a();
                }
            };

            a();
        }

        names.push(variation.name);
        fs.copySync(packPath, path.join(outPath, variation.name));
        const variationPath = path.join(process.cwd(), variation.path);
        fs.copySync(variationPath, path.join(outPath, variation.name));
    }

    cfg.save();
};

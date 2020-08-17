const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const { log, error, warn } = require("../util");
const merge = require("deepmerge");

module.exports = {
    Config: class {
        constructor(configData = fs.readFileSync(module.exports.getConfigPath(), "utf-8")) {
            this.path = module.exports.getConfigPath();
            this.data = merge(require("./mcutils.config.json"), JSON.parse(configData));
            this.save();
        }

        save() {
            fs.writeFileSync(this.path, JSON.stringify(this.data, null, "    "));
        }
    },
    getConfigPath() {
        return path.join(process.cwd(), "mcutils.config.json");
    },
    configExists() {
        return fs.existsSync(this.getConfigPath());
    },
    getConfig() {
        if (this.configExists()) {
            return new this.Config();
        }

        warn("Config doesn't exist, creating one");
        fs.writeFileSync(this.getConfigPath(), fs.readFileSync(path.join(__dirname, "mcutils.config.json"), "utf-8"));
        return new this.Config();
    },
};
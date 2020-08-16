const chalk = require("chalk");

module.exports = {
    log(message) {
        this.info(message);
    },
    debug(message) {
        console.log(chalk.blueBright("[DEBUG] ") + message);
    },
    info(message) {
        console.log(chalk.greenBright("[INFO] ") + message);
    },
    warn(message) {
        console.log(chalk.yellowBright("[WARN] ") + message);
    },
    error(message) {
        console.log(chalk.redBright("[ERROR] ") + message);
    },
    tryvoid(func) {
        try {
            func();
        } catch (error) {
            const a = null;
        }
    },
};

const chalk = require("chalk");

module.exports = {
    log(msg) {
        this.info(msg);
    },
    info(msg) {
        console.log(chalk.greenBright("[INFO] ") + msg);
    },
    warn(msg) {
        console.log(chalk.yellowBright("[WARN] ") + msg);
    },
    error(msg) {
        console.log(chalk.redBright("[ERROR] ") + msg);
    },
};

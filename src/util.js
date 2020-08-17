const chalk = require("chalk");

module.exports = {
    log(...messages) {
        module.exports.info(...messages);
    },
    debug(...messages) {
        console.log(chalk.blueBright("[DEBUG]"), ...messages);
    },
    info(...messages) {
        console.log(chalk.greenBright("[INFO]"), ...messages);
    },
    warn(...messages) {
        console.log(chalk.yellowBright("[WARN]"), ...messages);
    },
    error(...messages) {
        console.log(chalk.redBright("[ERROR]"), ...messages);
    },
    tryvoid(func) {
        try {
            func();
        } catch (error) {
            const a = null;
        }
    },
};

const util = require("../util");

module.exports = (args = process.argv) => {
    args = args.slice(1);
    util.debug(`args: ${args}`);
};

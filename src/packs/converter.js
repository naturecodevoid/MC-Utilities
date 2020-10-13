const util = require("../util");
const path = require("path");

module.exports = (args = process.argv) => {
    args = args.slice(1).slice(1);
    util.debug(`args: ${args}`);

    if (args.length <= 0) return util.error("Please provide a edition for the first argument!");

    if (args.length === 1) return util.error("Please provide the path to the pack!");

    const editions = {
        java: 1,
        bedrock: 2,
    };

    let edition;
    if (args[0].includes("java")) edition = editions.java;
    else if (args[0].includes("bedrock")) edition = editions.bedrock;
    else edition = editions.java;

    const path_ = path.resolve(args[1]);

    util.debug(`edition: ${edition}`);

    util.debug(`path: ${path_}`);
};

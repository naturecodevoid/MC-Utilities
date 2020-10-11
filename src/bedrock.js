module.exports = {};
const dirs = ["path"];

for (const dir of dirs) {
    const module_ = require(`./${dir}`);
    module.exports[dir] = module_.bedrock;
}

const dotenv = require("dotenv");
const nextJest = require("next/jest");

dotenv.config({
    path: ".env.development",
});
const createConfig = nextJest({
    dir: ".",
});
const config = {
    moduleDirectories: ["node_modules", "<rootDir>"],
};

module.exports = createConfig(config);

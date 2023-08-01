const fse = require("fs-extra");

const baseFile = process.argv[2];
const appName = process.argv[3];

const config = fse.readFileSync(baseFile, { encoding: "ascii" });

const correctConfig = config.replace(/\$APP_NAME/g, appName);

fse.writeFileSync(".elasticbeanstalk/config.yml", correctConfig);

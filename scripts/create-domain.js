const fse = require("fs-extra");
const domainName = process.argv[2];

if (!domainName) {
  throw Error("Domain name should be provided");
}
const srcDir = "templates/domain";
const destDir = `src/domains/${domainName}`;

fse.pathExists(destDir, (err, exists) => {
  if (exists) {
    throw new Error("Domain already exists");
  }

  fse.copySync(srcDir, destDir, { overwrite: false }, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("success!");
    }
  });
});

#!/usr/bin/env node
const shelljs = require("shelljs");
const finder = require("find-package-json")();

const topPath = finder.next().filename.replace("package.json", "");

try {
  shelljs.mkdir("-p", `${topPath}/patches`);

  shelljs.cp(`${__dirname}/patches/*`, `${topPath}/patches/`);

  console.info(`Patches successfully generated, please add postinstall script to your package.json:
"scripts": {
  "postinstall": "patch-package"
}

install it:

npm i patch-package

if you use yarn:

yarn add patch-package postinstall-postinstall
(check https://www.npmjs.com/package/patch-package documentation)

run it once manually:

npx patch-package


Enjoy much quieter jest!
 `);
} catch (e) {
  console.error(`Something went wrong ${e.message()}`);
}

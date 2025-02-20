/** @type Egg.EggPlugin */
const path = require("path")
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  // ua: {
  //   enable: true,
  //   package: 'egg-ua',
  //   // path: path.join(__dirname, '../lib/plugin/egg-ua'),
  // }
};

/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1740037604103_5017';

  // add your middleware config here
  config.middleware = ["timer", "robot", "gzip"];
  config.robot = {
    ua: [
      /Baiduspider/i
    ]
  }
  config.gzip = {
    threshold: 0 // 小于 1k 的响应体不压缩
  }

  // 添加 view 配置项
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

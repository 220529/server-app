// server.js
const Koa = require("koa");
const path = require("path");
const serve = require("koa-static");
const Router = require("@koa/router");
const cors = require("koa2-cors");
const { Univer } = require("@univerjs/core");
const { UniverSheetsPlugin } = require("@univerjs/sheets");

const crypto = require("node:crypto");
globalThis.crypto = crypto;

/* eslint-disable ts/no-require-imports */
/* eslint-disable no-console */
const { createUniver, LocaleType, merge } = require("@univerjs/presets");
const {
  UniverSheetsNodeCorePreset,
} = require("@univerjs/presets/preset-sheets-node-core");
const sheetsNodeCoreZhCN = require("@univerjs/presets/preset-sheets-node-core/locales/zh-CN");

// 创建 Koa 实例和路由
const app = new Koa();
const router = new Router();

// 提供静态文件服务（前端页面）
app.use(serve(path.join(__dirname, "univer")));

// 创建 Univer 实例并注册插件
const univer = new Univer();
univer.registerPlugin(UniverSheetsPlugin);

// 配置 CORS
app.use(
  cors({
    origin: () => {
      return "*";
    },
  })
);

function run() {
  // 初始化 Univer 实例
  const { univerAPI } = createUniver({
    locale: LocaleType.ZH_CN,
    locales: {
      [LocaleType.ZH_CN]: merge({}, sheetsNodeCoreZhCN),
    },
    presets: [UniverSheetsNodeCorePreset({})],
  });

  // 创建一个工作簿
  const workbook = univerAPI.createWorkbook({});

  // 获取活动工作表
  const sheet = workbook.getActiveSheet();

  // 设置 A1 单元格的值
  const rangeA1 = sheet.getRange(0, 0, 1, 1);
  rangeA1.setValue(109);

  // 保存工作簿快照
  const snapshot = workbook.save();

  return snapshot;
}

// 创建 API 端点返回表格数据
router.get("/api/create-sheet", async (ctx) => {
  const res = run();
  ctx.body = res; // 返回表格数据
});

// 启动 Koa 服务
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

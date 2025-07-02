const JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require("fs");

// 1. 读取原始代码
const code = fs.readFileSync("./server.js", "utf8");

// 2. 混淆配置
const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
  compact: true,
  controlFlowFlattening: true,
  identifierNamesGenerator: "hexadecimal",
  stringArray: true,
}).getObfuscatedCode();

// 3. 写入新文件
fs.writeFileSync("./output.js", obfuscatedCode, "utf8");

console.log("✅ 混淆完成！输出文件：output.js");

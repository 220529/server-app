function _0x56a7(_0x2adc46, _0x9e20d9) {
  const _0x4316c6 = _0x4316();
  return (
    (_0x56a7 = function (_0x56a768, _0x1a74d0) {
      _0x56a768 = _0x56a768 - 0x66;
      let _0x508b3d = _0x4316c6[_0x56a768];
      return _0x508b3d;
    }),
    _0x56a7(_0x2adc46, _0x9e20d9)
  );
}
const _0x57f3d4 = _0x56a7;
(function (_0x4ff596, _0x331bae) {
  const _0xbc9b3e = _0x56a7,
    _0x3edff6 = _0x4ff596();
  while (!![]) {
    try {
      const _0xbd3475 =
        (parseInt(_0xbc9b3e(0x81)) / 0x1) * (parseInt(_0xbc9b3e(0x76)) / 0x2) +
        -parseInt(_0xbc9b3e(0x69)) / 0x3 +
        (-parseInt(_0xbc9b3e(0x6e)) / 0x4) *
          (-parseInt(_0xbc9b3e(0x80)) / 0x5) +
        -parseInt(_0xbc9b3e(0x70)) / 0x6 +
        (-parseInt(_0xbc9b3e(0x7f)) / 0x7) * (parseInt(_0xbc9b3e(0x75)) / 0x8) +
        (parseInt(_0xbc9b3e(0x67)) / 0x9) * (-parseInt(_0xbc9b3e(0x6b)) / 0xa) +
        (parseInt(_0xbc9b3e(0x73)) / 0xb) * (parseInt(_0xbc9b3e(0x82)) / 0xc);
      if (_0xbd3475 === _0x331bae) break;
      else _0x3edff6["push"](_0x3edff6["shift"]());
    } catch (_0x58015e) {
      _0x3edff6["push"](_0x3edff6["shift"]());
    }
  }
})(_0x4316, 0xe5419);
const express = require("express"),
  mysql = require(_0x57f3d4(0x6a)),
  app = express(),
  port = 0xbb8,
  pool = mysql[_0x57f3d4(0x78)]({
    host: _0x57f3d4(0x6c),
    port: 0xceb,
    user: _0x57f3d4(0x72),
    password: _0x57f3d4(0x72),
    database: "v1_base",
    waitForConnections: !![],
    connectionLimit: 0xa,
    queueLimit: 0x0,
  });
function _0x4316() {
  const _0x328b76 = [
    "error",
    "4053984nNLFAj",
    "mysql2/promise",
    "10160ZOiOXw",
    "localhost",
    "Server\x20running\x20at\x20http://localhost:",
    "353276yGZOqb",
    "log",
    "6004500yXBOyl",
    "rUOzH",
    "root",
    "1668931PqKKGr",
    "/users",
    "311912KJAbhQ",
    "472jOGzlm",
    "query",
    "createPool",
    "Database\x20query\x20failed",
    "status",
    "lIBcl",
    "Memory\x20Usage:\x20",
    "listen",
    "json",
    "7TKMTit",
    "45CcubIJ",
    "33Bahnwm",
    "204qDkcKF",
    "release",
    "get",
    "memoryUsage",
    "Database\x20error:",
    "459gPtxAf",
  ];
  _0x4316 = function () {
    return _0x328b76;
  };
  return _0x4316();
}
app[_0x57f3d4(0x84)](_0x57f3d4(0x74), async (_0x2de2a5, _0x49f19d) => {
  const _0x300e83 = _0x57f3d4,
    _0x4c2bfe = {
      lIBcl: "SELECT\x20*\x20FROM\x20user\x20LIMIT\x2010",
      rUOzH: _0x300e83(0x66),
      MUGSg: _0x300e83(0x79),
    };
  try {
    const _0x4b6a9e = process[_0x300e83(0x85)]();
    console[_0x300e83(0x6f)](
      _0x300e83(0x7c) +
        (_0x4b6a9e["rss"] / 0x400 / 0x400)["toFixed"](0x2) +
        "\x20MB"
    );
    const _0x1dbba9 = await pool["getConnection"](),
      [_0x1bbbd2] = await _0x1dbba9[_0x300e83(0x77)](
        _0x4c2bfe[_0x300e83(0x7b)]
      );
    _0x1dbba9[_0x300e83(0x83)](),
      _0x49f19d[_0x300e83(0x7e)]({ success: !![], data: _0x1bbbd2 });
  } catch (_0x563529) {
    console[_0x300e83(0x68)](_0x4c2bfe[_0x300e83(0x71)], _0x563529),
      _0x49f19d[_0x300e83(0x7a)](0x1f4)[_0x300e83(0x7e)]({
        success: ![],
        message: _0x4c2bfe["MUGSg"],
      });
  }
}),
  app[_0x57f3d4(0x7d)](port, () => {
    const _0x561073 = _0x57f3d4;
    console[_0x561073(0x6f)](_0x561073(0x6d) + port);
  });

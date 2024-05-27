import { parse } from "./index.ts";
var fs = require("fs");
// テスト用のJSONファイルのパス
var jsonFilePaths = ["test.txt", "test2.txt", "test3.txt", "test4.txt"];
// // JSON.parse()関数のパフォーマンスを測定する関数
function measureJSONParsePerformance(filePath) {
  // JSONファイルを読み込む
  var jsonData = fs.readFileSync(filePath, "utf8");
  // メモリ使用量の計測開始前の使用量を取得
  var startMemoryUsage = process.memoryUsage().heapUsed;
  // 処理時間の計測開始
  var startTime = process.hrtime();

  // TODO
  // parse()を実行
  // ここに作成したパーサーを入れてください
  var result = parse(jsonData);

  // 処理時間の計測終了
  var endTime = process.hrtime(startTime);
  // メモリ使用量の計測終了後の使用量を取得
  var endMemoryUsage = process.memoryUsage().heapUsed;
  console.dir(JSON.stringify(result, null, 2));
  // 処理時間をミリ秒に変換して返す
  return {
    time: (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2),
    memory: endMemoryUsage - startMemoryUsage,
  };
}
// メイン関数
function main() {
  // 各JSONファイルに対して処理時間を測定
  for (
    var _i = 0, jsonFilePaths_1 = jsonFilePaths;
    _i < jsonFilePaths_1.length;
    _i++
  ) {
    var filePath = jsonFilePaths_1[_i];
    var _a = measureJSONParsePerformance(filePath),
      time = _a.time,
      memory = _a.memory;
    console.log("".concat(filePath));
    console.log("Processing ".concat(time, " ms"));
    console.log("Memory usage: ".concat(memory.toString(), " bytes"));
    console.log();
  }
}
// メイン関数を実行
main();

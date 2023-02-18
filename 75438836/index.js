const fs = require("fs");
const loader = require("@assemblyscript/loader");
const wasmModule = loader.instantiateSync(
  fs.readFileSync("./build/release.wasm"),
  {
    myConsole: {
      log(messagePtr) { // Called as `console.log` in assembly/index.ts
        console.log(wasmModule.exports.__getString(messagePtr));
      },
      time(labelPtr) { // Called as `console.time` in assembly/index.ts
        console.time(wasmModule.exports.__getString(labelPtr));
      },
      timeEnd(labelPtr) { // Called as `console.timeEnd` in assembly/index.ts
        console.timeEnd(wasmModule.exports.__getString(labelPtr));
      }
    }
  });
module.exports = wasmModule.exports;

const wasmModule = require("../index.js");
const fs = require("fs");

function main(wasmModule) {
  wasmModule.main();

}

main(wasmModule);

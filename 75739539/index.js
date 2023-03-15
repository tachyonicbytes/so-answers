import { readFileSync } from 'fs';
import loader from "@assemblyscript/loader";

export default function compile(raw) {
  let wasmModule = loader.instantiateSync(readFileSync('./build/release.wasm'), {});
  const { __newString, __getString } = wasmModule.exports;
  return __getString(wasmModule.exports.parse(__newString(raw)));
}

console.log(compile('test'));

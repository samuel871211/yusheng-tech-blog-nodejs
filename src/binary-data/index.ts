

// 創建一個 8 bytes 的 memory 空間
const arrayBuffer = new ArrayBuffer(8);
// false
console.log(arrayBuffer.resizable);
// TypeError: Method ArrayBuffer.prototype.resize called on incompatible receiver #<ArrayBuffer>
// arrayBuffer.resize(0);
// ArrayBuffer 無法直接操作，需創建一個 view，才可以操作這個 memory 空間
// 創建 Int8Array 的時候，預設值皆為 0
const int8View = new Int8Array(arrayBuffer);
// 0
int8View.forEach((value) => console.log(value));
// 8
console.log(int8View.byteLength);
// true
console.log(arrayBuffer === int8View.buffer);
// 127
int8View[0] = 127; console.log(int8View.at(0));
// -128
int8View[0] = -128; console.log(int8View.at(0));

const resizableArrayBuffer = new ArrayBuffer(8, { maxByteLength: 12 });
// true
console.log(resizableArrayBuffer.resizable);
// 12
resizableArrayBuffer.resize(12); console.log(resizableArrayBuffer.byteLength);
const transferredResizableArrayBuffer = resizableArrayBuffer.transfer();
// true
console.log(transferredResizableArrayBuffer.resizable);
transferredResizableArrayBuffer.resize(0);
// 0
console.log(transferredResizableArrayBuffer.byteLength);
// true
console.log(resizableArrayBuffer.detached);
// TypeError: Cannot perform ArrayBuffer.prototype.resize on a detached ArrayBuffer
// resizableArrayBuffer.resize(8);
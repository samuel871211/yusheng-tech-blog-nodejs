process.stdin.on("data", function dataListener(buffer) {
  console.log(buffer);
  console.log(buffer.toString());
});

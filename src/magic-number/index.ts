import { readFileSync } from "fs";
import { join } from "path";

const image = readFileSync(join(__dirname, "image.jpg"));
console.log(image.buffer.slice(0, 4));

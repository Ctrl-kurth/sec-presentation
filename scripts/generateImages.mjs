import fs from "fs";
import path from "path";

const imgExts = /\.(jpe?g|png|webp|gif)$/i;

const carlosDir = path.join(process.cwd(), "public", "Carlos AR", "Pictures for AR");
const kurthDir = path.join(process.cwd(), "public", "Kurth AR", "PIctures for AR");

const data = { carlos: [], kurth: [] };

if (fs.existsSync(carlosDir)) {
  data.carlos = fs.readdirSync(carlosDir).filter(f => imgExts.test(f));
}
if (fs.existsSync(kurthDir)) {
  data.kurth = fs.readdirSync(kurthDir).filter(f => imgExts.test(f));
}

fs.writeFileSync(path.join(process.cwd(), "src", "lib", "imageData.json"), JSON.stringify(data, null, 2));

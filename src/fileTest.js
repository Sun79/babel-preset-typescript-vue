import * as compiler from "vue-template-compiler";
import fs from "fs";

export default (filePath) => {
  if (/\.vue$/.test(filePath)) {
    const result = compiler.parseComponent(
      fs.readFileSync(filePath, { encoding: "utf8" })
    );
    const script = result.script ?? result.scriptSetup;
    if (!script?.lang) {
      return false;
    }
    return ["ts", "tsx"].includes(script.lang.toLowerCase());
  }

  return false;
};

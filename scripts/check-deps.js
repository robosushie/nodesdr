import fs from "fs";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const platform = os.platform();

const requiredLibs = {
  win32: {
    libiio: ["libiio.dll", "libiio-1.dll", "libiio1.dll"],
    libusb: ["libusb-1.0.dll"],
    libxml2: ["libxml2.dll"],
  },
  linux: {
    libiio: ["libiio.so", "libiio.so.1"],
    libusb: ["libusb-1.0.so"],
    libxml2: ["libxml2.so"],
  },
  darwin: {
    libiio: ["libiio.dylib"],
    libusb: ["libusb-1.0.dylib"],
    libxml2: ["libxml2.dylib"],
  },
};

function getSearchPaths() {
  let paths = [process.cwd(), __dirname];
  if (platform === "win32") {
    paths = paths.concat(process.env.PATH.split(";"));
  } else if (platform === "linux") {
    paths = paths.concat(["/usr/lib", "/usr/local/lib"]);
    if (process.env.LD_LIBRARY_PATH) {
      paths = paths.concat(process.env.LD_LIBRARY_PATH.split(":"));
    }
  } else if (platform === "darwin") {
    paths = paths.concat(["/usr/lib", "/usr/local/lib"]);
    if (process.env.DYLD_LIBRARY_PATH) {
      paths = paths.concat(process.env.DYLD_LIBRARY_PATH.split(":"));
    }
  }
  return paths;
}

function findAnyLib(libNames, searchPaths) {
  for (const lib of libNames) {
    for (const dir of searchPaths) {
      const fullPath = path.join(dir, lib);
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
  }
  return null;
}

function printInstallHelp(depType) {
  if (platform === "win32") {
    if (depType === "libiio") {
      console.error(
        "Install libiio: https://github.com/analogdevicesinc/libiio/releases"
      );
    } else if (depType === "libusb") {
      console.error("Install libusb: https://libusb.info/");
    } else if (depType === "libxml2") {
      console.error("Install libxml2: http://xmlsoft.org/sources/win32/");
    }
  } else if (platform === "linux") {
    if (depType === "libiio") {
      console.error("Try: sudo apt install libiio-utils libiio-dev");
    } else if (depType === "libusb") {
      console.error("Try: sudo apt install libusb-1.0-0");
    } else if (depType === "libxml2") {
      console.error("Try: sudo apt install libxml2");
    }
  } else if (platform === "darwin") {
    if (depType === "libiio") {
      console.error("Try: brew install libiio");
    } else if (depType === "libusb") {
      console.error("Try: brew install libusb");
    } else if (depType === "libxml2") {
      console.error("Try: brew install libxml2");
    }
  }
}

function main() {
  const deps = requiredLibs[platform] || {};
  const searchPaths = getSearchPaths();
  const found = {};
  const missing = [];

  for (const [depType, libNames] of Object.entries(deps)) {
    const foundPath = findAnyLib(libNames, searchPaths);
    if (foundPath) {
      found[depType] = foundPath;
    } else {
      missing.push(depType);
    }
  }

  if (missing.length > 0) {
    console.error(
      "\nERROR: The following required dependencies were NOT found:"
    );
    for (const depType of missing) {
      console.error("  -", depType);
      printInstallHelp(depType);
    }
    // Remove the bindings.json file if it exists and any dependency is missing
    const bindingsPath = "build/bindings.json";
    if (fs.existsSync(bindingsPath)) {
      fs.unlinkSync(bindingsPath);
    }
    process.exit(1);
  } else {
    fs.mkdirSync("build", { recursive: true });
    fs.writeFileSync("build/bindings.json", JSON.stringify(found, null, 2));
    console.log(
      "All required dynamic libraries found and bindings.json created."
    );
  }
}

main();

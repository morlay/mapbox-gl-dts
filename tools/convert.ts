import {transform} from "@babel/core"
import spawn from "cross-spawn"
import {bundle} from 'dts-bundle';
import {ensureDirSync, readFileSync, writeFileSync} from "fs-extra"
import globby from "globby"
import path from "path"

import flow2ts from "./flow-to-typescript"

convertFiles()
genDts()
bundleDts()

function bundleDts() {
  console.log(`bundling mapbox-gl.d.ts`)

  bundle({
    name: 'mapbox-gl',
    main: '.tmp/mapbox-gl/src/index.d.ts',
    out: '../../../mapbox-gl.d.ts',
  });
}

function convertFiles() {
  const files = globby.sync([
    "./node_modules/mapbox-gl/src/*.js",
    "./node_modules/mapbox-gl/src/**/*.js",
    "./node_modules/mapbox-gl/src/**/*.json",
    "!./node_modules/mapbox-gl/src/**/window.js",
    "!./node_modules/mapbox-gl/src/**/node_modules",
    "!./node_modules/mapbox-gl/src/**/dist",
  ]);

  files.forEach((file) => {
    console.log(`converting ${file}`)

    let code = ""

    const dist = file
      .replace(/\.js$/, ".ts")
      .replace(/\.json$/, ".json.ts")
      .replace("./node_modules/mapbox-gl/", "")

    if (path.extname(file) == ".json") {
      code = `export default ${String(readFileSync(file))}`
    } else {
      code = transform(String(readFileSync(file)), {
        plugins: [
          flow2ts(),
        ],
      }).code;

      code = code
        .replace(/parameters: PropertyValueSpecification<T>/g, "parameters: PropertyValueSpecification<any>")
        .replace(/serialize\(input: StylePropertyFunction<T>\)/g, "serialize(input: StylePropertyFunction<any>)")
        .replace(/import window from '[^']+';?/g, "")
    }

    ensureDirSync(path.dirname(dist));
    writeFileSync(dist, code)
  });

}

function genDts() {
  try {
    spawn.sync(
      "node",
      ["--max-old-space-size=4096", "./node_modules/.bin/tsc", "--diagnostics", "--project", "./tsconfig.mapbox-gl.json"],
      {
        stdio: "inherit",
        shell: true,
      },
    );
  } catch (e) {

  }
}

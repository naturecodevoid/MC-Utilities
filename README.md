# MC-Utilities

[![npm](https://img.shields.io/npm/v/mc-utilities?style=flat-square)](https://www.npmjs.com/package/mc-utilities)

A collection of utilities to use for minecraft.

Features:

-   **Pack making utilities (see [this](#packs))**
-   `.minecraft`/`com.mojang` folder location for java edition and bedrock edition (includes all platforms)

More features probably coming soon

## Documentation

Getting the package:

```js
const mcutils = require("mc-utilities");
```

I recommend using [this](#api) api instead of the edition api.

If you want to use only one edition, some of the package is split into two different parts, one for bedrock edition, and
one for java edition.

Getting bedrock edition:

```js
const bedrock = mcutils.bedrock;
```

Getting java edition:

```js
const java = mcutils.java;
```

The two editions should mostly be the same in terms of api.

### API

#### `path`: The `.minecraft`/`com.mojang` folder path

Getting it:

```js
const path = mcutils.path.<edition>;
```

Examples:

-   `/Users/user/Library/Application Support/minecraft`: Mac OS java edition
-   `/Users/user/Library/Application Support/mcpelauncher/games/com.mojang`: Mac OS mcpelauncher

### Edition API

**Note: mirrors [this](#api)**

#### `path`: The `.minecraft`/`com.mojang` folder path

Getting it:

```js
const path = <edition>.path;
```

Examples:

-   `/Users/user/Library/Application Support/minecraft`: Mac OS java edition
-   `/Users/user/Library/Application Support/mcpelauncher/games/com.mojang`: Mac OS mcpelauncher

## Packs

### Requirements

If you're on windows 10, you should be able to use `powershell` instead of `pwsh` to run `build.ps1`. If not (or
`powershell` isn't working), please download
[PowerShell Core](https://github.com/PowerShell/PowerShell/#get-powershell).

### Usage

MC Utilities features easy to use pack making utilities. It will generate scripts to build your pack, and install it.
You just specify a config and run `mcutilspack` in your console, and the scripts will be built.

When running `mcutilspack`, you need to have MC Utilities installed globally (`npm install -g mc-utilities`). It will
generate `build.ps1`, which you run (`pwsh ./build.ps1` or `powershell ./build.ps1`) to build the pack. It will also
generate `install-java.cmd`, `install-java.sh`, and `install-bedrock.cmd` accordingly to the config.

If you need a bigger example, **make sure to look at [vanillafault](https://github.com/naturecodevoid/vanillafault)**.
It's a small default edit/utility pack and might explain problems you experience.

**NOTE**: Variations are packs that extend the base pack. This means that the variation will be a pack that gets copied
onto the base pack, overriding files. Example: `variation/a.txt` has text `hi`. `basePack/a.txt` has text `test`.
`basePack/b.txt` has text `test2`. If you build the base pack `a.txt` will have `test` in it, and `b.txt` will have
`test2`. If you build the variation, `a.txt` will have `hi` in it, and `b.txt` will have `test2` in it.

**NOTE 2**: If you are going to make a pack for bedrock edition, **place your files in `pack/assets/minecraft`. If you
don't mc-utilities won't build the pack correctly.** Example:
https://github.com/naturecodevoid/vanillafault/tree/master/pack/assets/minecraft

Here's an example config:

```json
{
    "variations": [
        {
            "name": "name (cool edition)", // The name
            "path": "variations/cool_edition" // The path to the variation
        }
    ],
    "basePack": {
        "name": "name", // The name
        "path": "pack" // The path to the pack
    },
    "outPath": "out", // The out pack
    "buildJava": true, // If the pack should be built for java
    "buildBedrock": true, // If the pack should be built for bedrock
    "buildBasePack": false // If the base pack should be built
}
```

The default configuration will always be merged onto your config so you'll never miss out on new features.

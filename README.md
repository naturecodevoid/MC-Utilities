# MC-Utilities

[![npm](https://img.shields.io/npm/v/mc-utilities?style=flat-square)](https://www.npmjs.com/package/mc-utilities)

A collection of utilities to use for minecraft.

Features:

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

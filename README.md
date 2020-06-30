# MC-Utilities

A collection of utilities to use for minecraft.

Features:

-   `.minecraft`/`com.mojang` folder location for java edition and bedrock edition (includes all platforms)

More features probably coming soon

## API

Getting the package:

```js
const mcutils = require("mc-utilities");
```

The package is split into two different parts, one for bedrock edition, and one for java edition.

Getting bedrock edition:

```js
const bedrock = mcutils.bedrock;
```

Getting java edition:

```js
const java = mcutils.java;
```

The two editions should mostly be the same in terms of api.

### Edition API

#### `path`: The `.minecraft`/`com.mojang` folder path

Getting it:

```js
const path = edition.path;
```

Examples:

-   `/Users/user/Library/Application Support/minecraft`: Mac OS java edition
-   `/Users/user/Library/Application Support/mcpelauncher/games/com.mojang`: Mac OS mcpelauncher

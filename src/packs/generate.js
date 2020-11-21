const fs = require("fs-extra");
const path = require("path");
const { log, debug } = require("../util");
const util = require("./util");
const { spawn } = require("child_process");

module.exports = () => {
    const cfg = util.getConfig();
    const config = cfg.data;

    let files = "";

    // =============== build.ps1 =============== //
    {
        const fileName = "build.ps1";
        files += `${fileName} `;
        let fileData = `# Generated by mc-utilities

try { sh -c "find . -name .DS_Store -print -delete" }
catch {
    try { bash -c "find . -name .DS_Store -print -delete" }
    catch { echo "Deleting .DS_Store files failed, probably not on a linux based OS" }
}

New-Item -ItemType Directory -Force -Path "./${config.outPath}"
Remove-Item -Recurse -Force "./${config.outPath}/*"\n`;

        if (config.buildBasePack) {
            fileData += `\n### Base pack`;
            fileData += `\nCopy-Item -Path "./${config.basePack.path}/" -Force -Recurse -Destination "./${config.outPath}/${config.basePack.name}"`;

            // Bedrock
            if (config.buildBedrock) {
                fileData += `\n\n# Bedrock edition`;
                fileData += `\nGet-ChildItem -Path "./${config.outPath}/${config.basePack.name}/assets/minecraft/" | Compress-Archive -Force -DestinationPath "./${config.outPath}/${config.basePack.name} Bedrock.zip"`;
                fileData += `\nMove-Item "./${config.outPath}/${config.basePack.name} Bedrock.zip" "./${config.outPath}/${config.basePack.name} Bedrock.mcpack"`;
                fileData += `\nGet-ChildItem -Path "./${config.outPath}/${config.basePack.name}/assets/minecraft/" | Compress-Archive -Force -DestinationPath "./${config.outPath}/${config.basePack.name} Bedrock.zip"`;
            }

            // Java
            if (config.buildJava) {
                fileData += `\n\n# Java edition`;
                fileData += `\nGet-ChildItem -Path "./${config.outPath}/${config.basePack.name}/" | Compress-Archive -Force -DestinationPath "./${config.outPath}/${config.basePack.name} Java.zip"`;
            }

            fileData += `\n`;
        }

        for (const variation of config.variations) {
            fileData += `\n### Variation ${variation.name}`;
            fileData += `\nCopy-Item -Path "./${config.basePack.path}/" -Force -Recurse -Destination "./${config.outPath}/${variation.name}"`;
            fileData += `\nCopy-Item -Path "./${variation.path}/*" -Force -Recurse -Destination "./${config.outPath}/${variation.name}/"`;

            // Bedrock
            if (config.buildBedrock) {
                fileData += `\n\n# Bedrock edition`;
                fileData += `\nGet-ChildItem -Path "./${config.outPath}/${variation.name}/assets/minecraft/" | Compress-Archive -Force -DestinationPath "./${config.outPath}/${variation.name} Bedrock.zip"`;
                fileData += `\nMove-Item "./${config.outPath}/${variation.name} Bedrock.zip" "./${config.outPath}/${variation.name} Bedrock.mcpack"`;
                fileData += `\nGet-ChildItem -Path "./${config.outPath}/${variation.name}/assets/minecraft/" | Compress-Archive -Force -DestinationPath "./${config.outPath}/${variation.name} Bedrock.zip"`;
            }

            // Java
            if (config.buildJava) {
                fileData += `\n\n# Java edition`;
                fileData += `\nGet-ChildItem -Path "./${config.outPath}/${variation.name}/" | Compress-Archive -Force -DestinationPath "./${config.outPath}/${variation.name} Java.zip"`;
            }

            fileData += `\n`;
        }

        debug(`file data for ${fileName}:`, `\n${fileData}\n`);
        fs.writeFileSync(path.join(process.cwd(), fileName), fileData);
    }

    // =============== install-java.sh =============== //
    if (config.buildJava) {
        const fileName = "install-java.sh";
        files += `${fileName} `;
        let fileData = `#!/usr/bin/env bash

# Generated by mc-utilities

find . -name .DS_Store -print -delete

PACK_NAME="${config.basePack.name}"

# Set window title. This is complicated on linux
echo -ne "\\033]0;$PACK_NAME Java Edition Installation\\007"

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

MINECRAFT_FOLDER="$HOME/.minecraft"

if [[ "$OSTYPE" == "darwin"* ]]; then
    MINECRAFT_FOLDER="$HOME/Library/Application Support/minecraft"
fi

RESOURCE_FOLDER="$MINECRAFT_FOLDER/resourcepacks"

echo
echo ==============================
echo Making resource pack folders...
echo ==============================
echo

mkdir "$RESOURCE_FOLDER"
`;

        if (config.buildBasePack) {
            fileData += `\n### Base pack`;
            fileData += `\nrm -R "$RESOURCE_FOLDER/$PACK_NAME"

mkdir "$RESOURCE_FOLDER/$PACK_NAME"`;
            fileData += `\n`;
        }

        for (const variation of config.variations) {
            fileData += `\n### Variation ${variation.name}`;
            fileData += `\nrm -R "$RESOURCE_FOLDER/${variation.name}"

mkdir "$RESOURCE_FOLDER/${variation.name}"`;
            fileData += `\n`;
        }

        fileData += `
echo
echo ==============================
echo Copying the files...
echo ==============================
echo
`;

        if (config.buildBasePack) {
            fileData += `\n### Base pack`;
            fileData += `\ncp -v -f -R "$PWD/${config.outPath}/${config.basePack.name}/." "$RESOURCE_FOLDER/$PACK_NAME"`;
            fileData += `\n`;
        }

        for (const variation of config.variations) {
            fileData += `\n### Variation ${variation.name}`;
            fileData += `\ncp -v -f -R "$PWD/${config.outPath}/${variation.name}/." "$RESOURCE_FOLDER/${variation.name}"`;
            fileData += `\n`;
        }

        fileData += `
echo
echo Done!
echo

# Set window title. This is complicated on linux
echo -ne "\\033]0;Finished installing!\\007"

read -p "Press enter/return to exit . . ."`;

        debug(`file data for ${fileName}:`, `\n${fileData}\n`);
        fs.writeFileSync(path.join(process.cwd(), fileName), fileData);
        spawn(`chmod`, ["+x", `./${fileName}`]);
        spawn(`git`, ["update-index", "--chmod=+x", `./${fileName}`]);
    }

    // =============== install-java.cmd =============== //
    if (config.buildJava) {
        const fileName = "install-java.cmd";
        files += `${fileName} `;
        let fileData = `:: Generated by mc-utilities

@echo off

set PACK_NAME=${config.basePack.name}

title %PACK_NAME% Java Edition Installation

cd /D "%~dp0"

set RESOURCE_FOLDER=%APPDATA%\\.minecraft\\resourcepacks

echo 				.
echo ==============================
echo Making resource pack folders...
echo ==============================
echo 				.

md "%RESOURCE_FOLDER%"
`;

        if (config.buildBasePack) {
            fileData += `\n:: :: Base pack`;
            fileData += `\nrd /S /Q "%RESOURCE_FOLDER%/%PACK_NAME%"
rd /S /Q "%RESOURCE_FOLDER%/%PACK_NAME%"

md "%RESOURCE_FOLDER%/%PACK_NAME%"`;
            fileData += `\n`;
        }

        for (const variation of config.variations) {
            fileData += `\n:: :: Variation ${variation.name}`;
            fileData += `\nrd /S /Q "%RESOURCE_FOLDER%/${variation.name}"
rd /S /Q "%RESOURCE_FOLDER%/${variation.name}"

md "%RESOURCE_FOLDER%/${variation.name}"`;
            fileData += `\n`;
        }

        fileData += `
echo
echo ==============================
echo Copying the files...
echo ==============================
echo
`;

        if (config.buildBasePack) {
            fileData += `\n:: :: Base pack`;
            fileData += `\nrobocopy /S /V /MIR "%~dp0/${config.outPath}/${config.basePack.name}/." "%RESOURCE_FOLDER%/%PACK_NAME%"`;
            fileData += `\n`;
        }

        for (const variation of config.variations) {
            fileData += `\n:: :: Variation ${variation.name}`;
            fileData += `\nrobocopy /S /V /MIR "%~dp0/${config.outPath}/${variation.name}/." "%RESOURCE_FOLDER%/${variation.name}"`;
            fileData += `\n`;
        }

        fileData += `
echo Done!

echo 				.

title Finished installing!

pause`;

        debug(`file data for ${fileName}:`, `\n${fileData}\n`);
        fs.writeFileSync(path.join(process.cwd(), fileName), fileData);
    }

    // =============== install-bedrock.cmd =============== //
    if (config.buildBedrock) {
        const fileName = "install-bedrock.cmd";
        files += `${fileName} `;
        let fileData = `:: Generated by mc-utilities

@echo off

set PACK_NAME=${config.basePack.name}

title %PACK_NAME% Bedrock Edition Installation

cd /D "%~dp0"

set RESOURCE_FOLDER=%LOCALAPPDATA%\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\resource_packs

echo 				.
echo ==============================
echo Making resource pack folders...
echo ==============================
echo 				.

md "%RESOURCE_FOLDER%"
`;

        if (config.buildBasePack) {
            fileData += `\n:: :: Base pack`;
            fileData += `\nrd /S /Q "%RESOURCE_FOLDER%/%PACK_NAME%"
rd /S /Q "%RESOURCE_FOLDER%/%PACK_NAME%"

md "%RESOURCE_FOLDER%/%PACK_NAME%"`;
            fileData += `\n`;
        }

        for (const variation of config.variations) {
            fileData += `\n:: :: Variation ${variation.name}`;
            fileData += `\nrd /S /Q "%RESOURCE_FOLDER%/${variation.name}"
rd /S /Q "%RESOURCE_FOLDER%/${variation.name}"

md "%RESOURCE_FOLDER%/${variation.name}"`;
            fileData += `\n`;
        }

        fileData += `
echo
echo ==============================
echo Copying the files...
echo ==============================
echo
`;

        if (config.buildBasePack) {
            fileData += `\n:: :: Base pack`;
            fileData += `\nrobocopy /S /V /MIR "%~dp0/${config.outPath}/${config.basePack.name}/assets/minecraft/." "%RESOURCE_FOLDER%/%PACK_NAME%"`;
            fileData += `\n`;
        }

        for (const variation of config.variations) {
            fileData += `\n:: :: Variation ${variation.name}`;
            fileData += `\nrobocopy /S /V /MIR "%~dp0/${config.outPath}/${variation.name}/assets/minecraft/." "%RESOURCE_FOLDER%/${variation.name}"`;
            fileData += `\n`;
        }

        fileData += `
echo Done!

echo 				.

title Finished installing!

pause`;

        debug(`file data for ${fileName}:`, `\n${fileData}\n`);
        fs.writeFileSync(path.join(process.cwd(), fileName), fileData);
    }

    // NOTE: run npx -p mc-utilities mcutilspack to run the pack maker in dev scripts

    log("Done! Generated files:", files);
    log("Please don't delete any of these files!");
};

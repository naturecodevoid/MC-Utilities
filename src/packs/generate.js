const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const { log, error, warn, debug, tryvoid } = require("../util");
const util = require("./util");

module.exports = () => {
    const cfg = util.getConfig();
    const config = cfg.data;

    let files = "";
    let createdDeltree = false;

    const deltree = `:: !!! DO NOT DELETE OR INSTALL SCRIPTS WILL NOT WORK !!!

:: From https://ss64.com/nt/deltree.html

:: DelTree.cmd
:: Delete a folder plus all files and subfolders
@Echo Off
Set _folder=%1
if [%_folder%]==[] goto:eof

PUSHD %_folder%
::  If this fails, exit, we dont want to delete from the wrong folder.
If %errorlevel% NEQ 0 goto:eof

Del /f /q /s *.* >NUL
CD \
RD /s /q %_folder%
:: repeat because RD is sometimes buggy 
if exist %_folder% RD /s /q %_folder%
Popd`;

    // =============== build.ps1 =============== //
    {
        const fileName = "build.ps1";
        files += `${fileName} `;
        let fileData = `New-Item -ItemType Directory -Force -Path "./out"
Remove-Item -Recurse -Force "./out/*"\n`;

        if (config.buildBasePack) {
            fileData += `\n### Base pack`;
            fileData += `\nCopy-Item -Path "./${config.basePack.path}/" -Force -Recurse -Destination "./${config.outPath}/${config.basePack.name}"`;

            // Bedrock
            if (config.buildBedrock) {
                fileData += `\n\n# Bedrock edition`;
                fileData += `\nGet-ChildItem -Path "./${config.outPath}/${config.basePack.name}/assets/minecraft/" | Compress-Archive -Force -DestinationPath "./out/${config.basePack.name} Bedrock.zip"`;
                fileData += `\nMove-Item "./out/${config.basePack.name} Bedrock.zip" "./out/${config.basePack.name} Bedrock.mcpack"`;
                fileData += `\nGet-ChildItem -Path "./${config.outPath}/${config.basePack.name}/assets/minecraft/" | Compress-Archive -Force -DestinationPath "./out/${config.basePack.name} Bedrock.zip"`;
            }

            // Java
            if (config.buildJava) {
                fileData += `\n\n# Java edition`;
                fileData += `\nGet-ChildItem -Path "./${config.outPath}/${config.basePack.name}/" | Compress-Archive -Force -DestinationPath "./out/${config.basePack.name} Java.zip"`;
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
                fileData += `\nGet-ChildItem -Path "./${config.outPath}/${variation.name}/assets/minecraft/" | Compress-Archive -Force -DestinationPath "./out/${variation.name} Bedrock.zip"`;
                fileData += `\nMove-Item "./out/${variation.name} Bedrock.zip" "./out/${variation.name} Bedrock.mcpack"`;
                fileData += `\nGet-ChildItem -Path "./${config.outPath}/${variation.name}/assets/minecraft/" | Compress-Archive -Force -DestinationPath "./out/${variation.name} Bedrock.zip"`;
            }

            // Java
            if (config.buildJava) {
                fileData += `\n\n# Java edition`;
                fileData += `\nGet-ChildItem -Path "./${config.outPath}/${variation.name}/" | Compress-Archive -Force -DestinationPath "./out/${variation.name} Java.zip"`;
            }
        }

        debug(`file data for ${fileName}:`, `\n${fileData}\n`);
        fs.writeFileSync(path.join(process.cwd(), fileName), fileData);
    }

    // =============== install-java.sh =============== //
    if (config.buildJava) {
        const fileName = "install-java.sh";
        files += `${fileName} `;
        let fileData = `#!/usr/bin/env bash

PACK_NAME="${config.basePack.name}"

# Set window title. This is complicated on linux
echo -ne "\\033]0;$PACK_NAME Java Edtion Installation\\007"

cd "$PWD"

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
            fileData += `\ncp -v -f -R "$PWD/out/${variation.name}/." "$RESOURCE_FOLDER/${variation.name}"`;
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
    }

    // =============== install-java.cmd =============== //
    if (config.buildJava) {
        fs.writeFileSync(path.join(process.cwd(), "deltree.cmd"), deltree);

        const fileName = "install-java.cmd";
        files += `${fileName} `;
        createdDeltree = true;
        let fileData = `@echo off

set PACK_NAME=${config.basePack.name}

title %PACK_NAME% Java Edtion Installation

cd /D "%~dp0"

set RESOURCE_FOLDER=%APPDATA%\\.minecraft\\resourcepacks

echo 				.
echo ==============================
echo Making resource pack folder...
echo ==============================
echo 				.

md "%RESOURCE_FOLDER%"
`;

        if (config.buildBasePack) {
            fileData += `\n:: :: Base pack`;
            fileData += `\n./deltree.cmd "%RESOURCE_FOLDER%/%PACK_NAME%"

md "%RESOURCE_FOLDER%/%PACK_NAME%"`;
            fileData += `\n`;
        }

        for (const variation of config.variations) {
            fileData += `\n:: :: Variation ${variation.name}`;
            fileData += `\nrm -R "%RESOURCE_FOLDER%/${variation.name}"

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
            fileData += `\nrobocopy /S /V /MIR "%~dp0/out/${variation.name}/." "%RESOURCE_FOLDER%/${variation.name}"`;
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
        fs.writeFileSync(path.join(process.cwd(), "deltree.cmd"), deltree);

        const fileName = "install-bedrock.cmd";
        files += `${fileName} `;
        createdDeltree = true;
        let fileData = `@echo off

set PACK_NAME=${config.basePack.name}

title %PACK_NAME% Bedrock Edtion Installation

cd /D "%~dp0"

set RESOURCE_FOLDER=%LOCALAPPDATA%\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\resource_packs

echo 				.
echo ==============================
echo Making resource pack folder...
echo ==============================
echo 				.

md "%RESOURCE_FOLDER%"
`;

        if (config.buildBasePack) {
            fileData += `\n:: :: Base pack`;
            fileData += `\n./deltree.cmd "%RESOURCE_FOLDER%/%PACK_NAME%"

md "%RESOURCE_FOLDER%/%PACK_NAME%"`;
            fileData += `\n`;
        }

        for (const variation of config.variations) {
            fileData += `\n:: :: Variation ${variation.name}`;
            fileData += `\nrm -R "%RESOURCE_FOLDER%/${variation.name}"

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
            fileData += `\nrobocopy /S /V /MIR "%~dp0/out/${variation.name}/." "%RESOURCE_FOLDER%/${variation.name}"`;
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

    if (createdDeltree) files += "deltree.cmd";

    log("Done! Generated files:", files, "\nPlease don't delete any of these files!");
};

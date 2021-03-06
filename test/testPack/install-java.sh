#!/usr/bin/env bash

# Generated by mc-utilities

find . -name .DS_Store -print -delete

PACK_NAME="test Pack"

# Set window title. This is complicated on linux
echo -ne "\033]0;$PACK_NAME Java Edition Installation\007"

# https://stackoverflow.com/a/246128
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

### Base pack
rm -R "$RESOURCE_FOLDER/$PACK_NAME"

mkdir "$RESOURCE_FOLDER/$PACK_NAME"

### Variation test Pack1
rm -R "$RESOURCE_FOLDER/test Pack1"

mkdir "$RESOURCE_FOLDER/test Pack1"

### Variation test Pack2
rm -R "$RESOURCE_FOLDER/test Pack2"

mkdir "$RESOURCE_FOLDER/test Pack2"

echo
echo ==============================
echo Copying the files...
echo ==============================
echo

### Base pack
cp -v -f -R "$PWD/out/test Pack/." "$RESOURCE_FOLDER/$PACK_NAME"

### Variation test Pack1
cp -v -f -R "$PWD/out/test Pack1/." "$RESOURCE_FOLDER/test Pack1"

### Variation test Pack2
cp -v -f -R "$PWD/out/test Pack2/." "$RESOURCE_FOLDER/test Pack2"

echo
echo Done!
echo

# Set window title. This is complicated on linux
echo -ne "\033]0;Finished installing!\007"

read -p "Press enter/return to exit . . ."
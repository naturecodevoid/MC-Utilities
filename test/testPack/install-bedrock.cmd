@echo off

set PACK_NAME=test Pack

title %PACK_NAME% Bedrock Edtion Installation

cd /D "%~dp0"

set RESOURCE_FOLDER=%LOCALAPPDATA%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\resource_packs

echo 				.
echo ==============================
echo Making resource pack folder...
echo ==============================
echo 				.

md "%RESOURCE_FOLDER%"

:: :: Base pack
./deltree.cmd "%RESOURCE_FOLDER%/%PACK_NAME%"

md "%RESOURCE_FOLDER%/%PACK_NAME%"

:: :: Variation test Pack1
rm -R "%RESOURCE_FOLDER%/test Pack1"

md "%RESOURCE_FOLDER%/test Pack1"

echo
echo ==============================
echo Copying the files...
echo ==============================
echo

:: :: Base pack
robocopy /S /V /MIR "%~dp0/out/test Pack/." "%RESOURCE_FOLDER%/%PACK_NAME%"

:: :: Variation test Pack1
robocopy /S /V /MIR "%~dp0/out/test Pack1/." "%RESOURCE_FOLDER%/test Pack1"

echo Done!

echo 				.

title Finished installing!

pause
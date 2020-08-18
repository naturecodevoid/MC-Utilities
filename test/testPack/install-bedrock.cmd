@echo off

set PACK_NAME=test Pack

title %PACK_NAME% Bedrock Edition Installation

cd /D "%~dp0"

set RESOURCE_FOLDER=%LOCALAPPDATA%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\resource_packs

echo 				.
echo ==============================
echo Making resource pack folders...
echo ==============================
echo 				.

md "%RESOURCE_FOLDER%"

:: :: Base pack
rd /S /Q "%RESOURCE_FOLDER%/%PACK_NAME%"
rd /S /Q "%RESOURCE_FOLDER%/%PACK_NAME%"

md "%RESOURCE_FOLDER%/%PACK_NAME%"

:: :: Variation test Pack1
rm -R "%RESOURCE_FOLDER%/test Pack1"

md "%RESOURCE_FOLDER%/test Pack1"

:: :: Variation test Pack2
rm -R "%RESOURCE_FOLDER%/test Pack2"

md "%RESOURCE_FOLDER%/test Pack2"

echo
echo ==============================
echo Copying the files...
echo ==============================
echo

:: :: Base pack
robocopy /S /V /MIR "%~dp0/out/test Pack/assets/minecraft/." "%RESOURCE_FOLDER%/%PACK_NAME%"

:: :: Variation test Pack1
robocopy /S /V /MIR "%~dp0/out/test Pack1/assets/minecraft/." "%RESOURCE_FOLDER%/test Pack1"

:: :: Variation test Pack2
robocopy /S /V /MIR "%~dp0/out/test Pack2/assets/minecraft/." "%RESOURCE_FOLDER%/test Pack2"

echo Done!

echo 				.

title Finished installing!

pause
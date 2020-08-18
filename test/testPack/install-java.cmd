@echo off

set PACK_NAME=test Pack

title %PACK_NAME% Java Edition Installation

cd /D "%~dp0"

set RESOURCE_FOLDER=%APPDATA%\.minecraft\resourcepacks

echo 				.
echo ==============================
echo Making resource pack folders...
echo ==============================
echo 				.

md "%RESOURCE_FOLDER%"

:: :: Base pack
rd /S "%RESOURCE_FOLDER%/%PACK_NAME%"

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
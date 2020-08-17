:: !!! DO NOT DELETE OR INSTALL SCRIPTS WILL NOT WORK !!!

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
CD RD /s /q %_folder%
:: repeat because RD is sometimes buggy 
if exist %_folder% RD /s /q %_folder%
Popd
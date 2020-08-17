New-Item -ItemType Directory -Force -Path "./out"
Remove-Item -Recurse -Force "./out/*"

### Base pack
Copy-Item -Path "./pack/" -Force -Recurse -Destination "./out/test Pack"

# Bedrock edition
Get-ChildItem -Path "./out/test Pack/assets/minecraft/" | Compress-Archive -Force -DestinationPath "./out/test Pack Bedrock.zip"
Move-Item "./out/test Pack Bedrock.zip" "./out/test Pack Bedrock.mcpack"
Get-ChildItem -Path "./out/test Pack/assets/minecraft/" | Compress-Archive -Force -DestinationPath "./out/test Pack Bedrock.zip"

# Java edition
Get-ChildItem -Path "./out/test Pack/" | Compress-Archive -Force -DestinationPath "./out/test Pack Java.zip"

### Variation test Pack1
Copy-Item -Path "./pack/" -Force -Recurse -Destination "./out/test Pack1"
Copy-Item -Path "./variations/testPack1/*" -Force -Recurse -Destination "./out/test Pack1/"

# Bedrock edition
Get-ChildItem -Path "./out/test Pack1/assets/minecraft/" | Compress-Archive -Force -DestinationPath "./out/test Pack1 Bedrock.zip"
Move-Item "./out/test Pack1 Bedrock.zip" "./out/test Pack1 Bedrock.mcpack"
Get-ChildItem -Path "./out/test Pack1/assets/minecraft/" | Compress-Archive -Force -DestinationPath "./out/test Pack1 Bedrock.zip"

# Java edition
Get-ChildItem -Path "./out/test Pack1/" | Compress-Archive -Force -DestinationPath "./out/test Pack1 Java.zip"
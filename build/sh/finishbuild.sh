rm -rf ./save-anywhere/icons*/manifest.* 
cp -rf ./src/chrome ./save-anywhere 
cp -rf ./src/manifest.json ./save-anywhere/manifest.json

mkdir -p ./save-anywhere/assets

cp -rf ./src/assets/img ./save-anywhere/assets

cp -f ./src/manifest.json ./save-anywhere/

cp -rf ./save-anywhere/index.html ./save-anywhere/sync.html
cp -rf ./save-anywhere/index.html ./save-anywhere/importExport.html
cp -rf ./save-anywhere/index.html ./save-anywhere/dataManage.html
cp -rf ./save-anywhere/index.html ./save-anywhere/setting.html

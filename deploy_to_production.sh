#echo "> Creating env file"
#echo "$PRODUCTION_ENV_FILE" > .env

echo "> Building the project"
npm run build
#yarn build:production

echo "> Creating build tar file to upload"
tar czvf build.tar.gz build

echo "> Uploading file to the server"
ssh -o StrictHostKeyChecking=no deploy@$PRODUCTION_SERVER_HOST uptime
scp build.tar.gz deploy@$PRODUCTION_SERVER_HOST:/srv/web

echo "> Replacing old project folder"
ssh -tt -l deploy $PRODUCTION_SERVER_HOST <<-REMOTESSH
cd /srv/web
tar xzvf build.tar.gz
rm -rf vientoenelrio-web
mv build vientoenelrio-web
rm build.tar.gz
exit
REMOTESSH

echo "> DONE"

echo "> Building the project"
yarn build

echo "> Creating build tar file to upload"
tar czvf build.tar.gz build

echo "> Uploading file to the server"
scp build.tar.gz deploy@$DEVELOPMENT_SERVER_HOST:/srv/web

echo "> Replacing old project folder"
ssh -tt -l deploy $DEVELOPMENT_SERVER_HOST <<-REMOTESSH
	cd /srv/web
	tar xzvf build.tar.gz
	rm -rf qr-payment
	mv build qr-payment
	exit
REMOTESSH

echo "> DONE"
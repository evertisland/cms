docker build -t evertisland/cms-server . \
&& docker run -p 49160:8080 --link cms-database --name cms-server -d evertisland/cms-server

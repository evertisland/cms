docker build -t evertisland/cms-server . \
&& docker run -p 49160:8080 --name cms-server -d evertisland/cms-server

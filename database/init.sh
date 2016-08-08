docker build -t evertisland/cms-database . \
&& docker run -p 27017:27017 -p 28017:28017 --name cms-database -d evertisland/cms-database --rest --httpinterface

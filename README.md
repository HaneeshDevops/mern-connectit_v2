# mern-connectit_v2
let URL = "http://backend:5000/";
docker network create connectit
docker volume create connectit
docker build -t server .
docker build -t client .

docker run -d --name server -p 5000:5000 --network connectit -v connectit:/app server

docker run -d --name client -p 3000:3000 --network connectit -v connectit:/app client

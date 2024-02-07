version: '3'

services:
  client:
    image: haneeshdevops/client:latest
    ports:
      - "3000:3000"
    networks:
      - mynetwork
    depends_on:
      - server

  server:
    image: haneeshdevops/server:latest
    ports:
      - "5000:5000"
    networks:
      - mynetwork

networks:
  mynetwork:
    driver: bridge

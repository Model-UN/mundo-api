#!/usr/bin/env bash

# Inspired by : "PostgreSQL restore-ready Docker image" by Diego Hordi
# Link : https://levelup.gitconnected.com/postgresql-restore-ready-docker-image-7001a54400e9

directory="$(dirname $(dirname $(realpath $0)))"

if [ -f $directory/.env ]
then
  export $(cat $directory/.env | grep -v '#' | awk '/=/ {print $1}')
  export PGPASSWORD=$PG_PASSWORD
  echo "Dumping Remote"
  pg_dump -h $PROD_PG_HOST -p $PROD_PG_PORT -U $PG_USERNAME -f $directory/data/"$PG_DATABASE"_dump.dump $PG_DATABASE
  echo "Building Docker"
  docker build -t nexus-postgres:local $directory/data \
    --build-arg PROD_PG_HOST=$PROD_PG_HOST \
    --build-arg PROD_PG_PORT=$PROD_PG_PORT \
    --build-arg PG_HOST=$PG_HOST \
    --build-arg PG_PORT=$PG_PORT \
    --build-arg PG_USERNAME=$PG_USERNAME \
    --build-arg PG_PASSWORD=$PG_PASSWORD \
    --build-arg PG_DATABASE=$PG_DATABASE
  docker run -d --name nexus-postgres-local nexus-postgres:local
  echo
  echo "nexus-postgres-local RUNNING ON $(docker container inspect nexus-postgres-local -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}')"
fi

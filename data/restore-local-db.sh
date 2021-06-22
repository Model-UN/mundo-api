#!/usr/bin/env bash

# Inspired by : "PostgreSQL restore-ready Docker image" by Diego Hordi
# Link : https://levelup.gitconnected.com/postgresql-restore-ready-docker-image-7001a54400e9

echo "Restoring DB"
psql -U postgres -c "CREATE DATABASE ${PG_DATABASE}"
pg_restore -v -d "${PG_DATABASE}" -f /tmp/"${PG_DATABASE}_dump.dump"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE ${DBNAME} TO postgres"
echo "Database restored successfully."

# Inspired by : "PostgreSQL restore-ready Docker image" by Diego Hordi
# Link : https://levelup.gitconnected.com/postgresql-restore-ready-docker-image-7001a54400e9

# Get Postgres image
FROM postgres:12.5
# Create build-args
ARG PROD_PG_HOST
ARG PROD_PG_PORT
ARG PG_HOST
ARG PG_PORT
ARG PG_USERNAME
ARG PG_PASSWORD
ARG PG_DATABASE

ENV PROD_PG_HOST       ${PROD_PG_HOST}
ENV PROD_PG_PORT       ${PROD_PG_PORT}
ENV PG_HOST            ${PG_HOST}
ENV PG_PORT            ${PG_PORT}
ENV PG_USERNAME        ${PG_USERNAME}
ENV PG_PASSWORD        ${PG_PASSWORD}
ENV PG_DATABASE        ${PG_DATABASE}

ENV PGPASSWORD         ${PG_PASSWORD}
ENV POSTGRES_PASSWORD  ${PG_PASSWORD}
ENV POSTGRES_DB        ${PG_DATABASE}

# Create volume
VOLUME /tmp

# Copy bash script
COPY ${PG_DATABASE}_dump.sql /tmp/${PG_DATABASE}_dump.sql
COPY restore-local-db.sh /docker-entrypoint-initdb.d/restore-local-db.sh
# CRLF -> LF (DOS to Unix b/c Windows users)
RUN sed -i 's/\r$//g' /docker-entrypoint-initdb.d/restore-local-db.sh
# Grant privileges
RUN chmod 777 /docker-entrypoint-initdb.d/restore-local-db.sh
# Expose port to host
EXPOSE 5432
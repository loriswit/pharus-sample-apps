FROM postgres:16-alpine

ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=blog

COPY setup.sql /docker-entrypoint-initdb.d/

HEALTHCHECK --interval=5s CMD pg_isready -U postgres

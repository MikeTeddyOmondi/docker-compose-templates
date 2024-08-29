# Libsql Server (sqld)

Start the service

```shell

docker container run \
  -d \
  --name sqld \
  -v sqld-data:/var/lib/sqld \
  -p 127.0.0.1:8080:8080 \
  libsql/sqld:latest

```

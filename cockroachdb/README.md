# CockroachDB 

```shell
docker run -d -e COCKROACH_DATABASE={DATABASE_NAME} -e COCKROACH_USER={USER_NAME} -e COCKROACH_PASSWORD={PASSWORD} --name=cockroachdb --hostname=cockroachdb -p 26257:26257 -p 8383:8080 -v cockroachdb-data:/cockroach/cockroach-data cockroachdb/cockroach:v23.2.2 start-single-node --insecure --http-addr=cockroachdb:8080
```

Note:
The COCKROACH_DATABASE, COCKROACH_USER, and COCKROACH_PASSWORD environment variables and the contents 
of the /docker-entrypoint-initdb.d directory are ignored if you use cockroach start rather than cockroach start-single-node. 
They are also ignored if data exists in the /cockroach/cockroach-data directory within the container.

Env vars:

```shell
COCKROACH_DATABASE=local-db
COCKROACH_USER=user
COCKROACH_PASSWORD=password 
```

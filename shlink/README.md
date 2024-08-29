# Shlink - URL Shortener

Start the service (Server)

```shell
docker run \
    --name shlink \
    -p 8181:8080 \
    -e DEFAULT_DOMAIN=s.test \
    -e IS_HTTPS_ENABLED=true \
    -e GEOLITE_LICENSE_KEY=kjh23ljkbndskj345 \
    -e DB_DRIVER=postgres \
    -e DB_USER=postgres \
    -e DB_PASSWORD=password \
    -e DB_HOST=localhost \
    shlinkio/shlink:stable

```

Start the client service

```shell
docker run --name shlink-web-client -p 8000:80 -v ${PWD}/servers.json:/usr/share/nginx/html/servers.json shlinkio/shlink-web-client
```


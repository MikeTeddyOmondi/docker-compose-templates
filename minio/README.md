# MinIo Server

Start the service

```shell
docker run -d -p 9003:9000 -p 9001:9001 --name minio-server --network hotel-elmiriam -e MINIO_ROOT_USER=minio -e MINIO_ROOT_PASSWORD=minio_password -v "./data:/data" minio/minio server /data --console-address ":9001"
```



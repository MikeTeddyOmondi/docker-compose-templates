# Rustfs

Run with Docker (`latest` - Stable builds & `main-latest` - Dev builds)

```
docker run -d \
  --name rustfs \
  -p 9000:9000 \
  -p 9001:9001 \
  -v /data:/data \
  rustfs/rustfs:latest
```


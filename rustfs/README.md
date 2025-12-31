# Rustfs

Run with Docker (`latest` - Stable builds & `main-latest` - Dev builds)

```

# Make directories writable by everyone
chmod -R 777 data logs

# Start docker container
docker run -d \
  --name rustfs \
  -p 9000:9000 \
  -p 9001:9001 \
  -v $(pwd)/data:/data \
  -v $(pwd)/logs:/logs \
  rustfs/rustfs:latest
```


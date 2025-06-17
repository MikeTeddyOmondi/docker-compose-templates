# Nats - Docker Setup

First, create the `docker network` 'nats:'

```bash
docker network create nats
```

Then start the server:

```bash
docker run --name nats --network nats --restart unless-stopped -d -p 4222:4222 -p 8222:8222 nats:2.11.4 --http_port 8222
```

## Compose Cluster

nats-cluster.yaml

```yaml
name: nats
services:
  nats:
    image: nats:2.11.4
    ports:
      - "8222:8222"
    command: "--cluster_name NATS --cluster nats://0.0.0.0:6222 --http_port 8222 "
    networks: ["nats"]
  nats-1:
    image: nats:2.11.4
    command: "--cluster_name NATS --cluster nats://0.0.0.0:6222 --routes=nats://ruser:T0pS3cr3t@nats:6222"
    networks: ["nats"]
    depends_on: ["nats"]
  nats-2:
    image: nats:2.11.4
    command: "--cluster_name NATS --cluster nats://0.0.0.0:6222 --routes=nats://ruser:T0pS3cr3t@nats:6222"
    networks: ["nats"]
    depends_on: ["nats"]

networks:
  nats:
    name: nats
```



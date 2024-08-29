# Windows in Docker

```
docker run -it --rm --name windows -p 8006:8006 --device=/dev/kvm --cap-add NET_ADMIN --stop-timeout 120 dockurr/windows
```

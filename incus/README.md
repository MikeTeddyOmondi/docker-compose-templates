# Incus - LXD Alternative

Launch server using `Docker run` 

```shell
docker run -d \
--name incus \
--privileged \
--env SETIPTABLES=true \
--restart unless-stopped \
--network host \
--pid=host \
--cgroupns=host \
--volume /dev:/dev \
--volume /var/lib/incus:/var/lib/incus \
--volume /lib/modules:/lib/modules:ro \
ghcr.io/cmspam/incus-docker:latest
```

Extra config

Download the client: [GitHub packages](https://github.com/lxc/incus/releases)



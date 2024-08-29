# Portainer Dashboard

Start the dervice: 

```shell
docker run -d -p 9999:9000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:2.19.4
```

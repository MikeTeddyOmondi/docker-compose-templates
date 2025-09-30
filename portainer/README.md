# Portainer Dashboard

Start the appliance: 

Community edition

```shell
docker run -d -p 9999:9000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:2.19.4
```

Enterprise edition 

```shell
docker run -d -p 9999:9000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ee:2.34.0
```

# MongoDB Compass Web

Run it: 

```
 docker run --rm --name compass -p 8765:8080 \
  -e CW_MONGO_URI="mongodb://mongo:password@172.17.0.1:27017/?authSource=admin" \
  haohanyang/compass-web:0.4.1

```

# Build V86 using Docker

If you have Docker installed, you can run the whole system inside a container.
See tools/docker/exec to find the Dockerfile required for this.
You can run docker build -f tools/docker/exec/Dockerfile -t v86:alpine-3.19 . from the root directory to generate docker image.
Then you can simply run docker run -it -p 8000:8000 v86:alpine-3.19 to start the server.
Check localhost:8000 for hosted server.

docker run -d \
  -v /var/lib/dagger \
  --name dagger-engine-v0.21.8 \
  --privileged \
  registry.dagger.io/engine:v0.21.8 # -v $HOME/.config/dagger/engine.json:/etc/dagger/engine.json \

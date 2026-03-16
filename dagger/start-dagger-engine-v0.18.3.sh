docker run -d \
  -v /var/lib/dagger \
  --name dagger-engine-v0.18.3-tcp \
  --privileged \
  registry.dagger.io/engine:v0.18.3 --addr tcp://0.0.0.0:1234 # -v $HOME/.config/dagger/engine.json:/etc/dagger/engine.json \

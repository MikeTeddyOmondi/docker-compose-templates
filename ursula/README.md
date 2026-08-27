# Ursula — durable event streams

Replaces the ephemeral stack in
`/Users/mt0/src/mt0/rust/axum-ursula-event-streaming`, which publishes port 4437
with **no volume and no config**, so the node runs on an in-memory WAL and every
restart drops every bucket.

That is not theoretical. On 2026-08-24 the `builds` bucket vanished, a bundler
build ran to completion, and the console reported *"No log stream for build
&lt;id&gt;"* — which reads as a log-streaming fault rather than as storage that had
been reset.

## Running it

```sh
cp .env.example .env
docker compose up -d                    # one durable node
docker compose --profile raft up -d     # three voters
```

The default profile starts exactly one service. Everything cluster-related sits
behind the `raft` profile, so a plain `up` cannot start voters that have nowhere
to reach quorum.

`URSULA_VERSION` is pinned to `0.3.0` — the image already on this machine — so
`up` pulls nothing new.

## Migrating from the current stack

The two cannot both hold port 4437.

```sh
docker compose -p ursula down            # in axum-ursula-event-streaming
cd /Users/mt0/src/mt0/docker-compose-templates/ursula
docker compose up -d
```

Existing streams do **not** carry over; there is nothing on disk to carry. The
bundler recreates buckets and streams as builds run, so the cost is losing the
history of past builds, once.

Confirm durability actually works, since that is the entire point:

```sh
curl -X PUT  http://localhost:4437/builds/persist-check
curl -X POST --data-binary 'survives a restart' http://localhost:4437/builds/persist-check
docker compose restart ursula && sleep 5
curl "http://localhost:4437/builds/persist-check?offset=0"   # must echo the line
curl -X DELETE http://localhost:4437/builds/persist-check
```

## Going to three voters

Not a drop-in upgrade. Before starting more than one node:

1. Set `URSULA_CONFIG=./ursula/cluster.toml`.
2. **Fill in the cold tier** in `ursula/cluster.toml`. It is optional for one
   node and mandatory for a cluster — a replica has to read chunks flushed by
   whichever node was leader, and without shared storage it cannot.
3. Start with `init_membership_per_group = true`, then set it to `false` and
   restart. Leaving it true risks a later restart re-initialising membership.

Single-node data does not migrate into the cluster.

Three voters rather than two: three tolerate one failure, two tolerate none and
still need both alive for quorum — strictly worse than one node.

## This port has no authentication

Ursula ships no auth. Anything that can reach 4437 can read and write every
stream, including build logs from every tenant. It is bound to localhost here,
and that is the only thing protecting it.

Putting it behind Traefik basic auth or the JWKS gateway is designed in
[`../../locci-suite/URSULA_AUTH_PLAN-20260824-0930.md`](../../locci-suite/URSULA_AUTH_PLAN-20260824-0930.md).
Note that the gateway subcommand needs 0.4.x; 0.3.0 does not have it.

## Layout

```
compose.yaml            default = one node, --profile raft = three
.env.example            version, port, which config to mount
ursula/single.toml      one durable node, disk WAL
ursula/cluster.toml     three voters, peers, cold tier
```

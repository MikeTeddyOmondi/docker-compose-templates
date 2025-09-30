# Kafka

## Validate that the topic was created in kafka container

```
docker exec -it kafka kafka-topics --list --bootstrap-server localhost:9092
```

## Describe that topic and see its partitions

```
docker exec -it kafka kafka-topics --bootstrap-server localhost:9092 --describe --topic new_orders
```

## View all events in a topic

```
docker exec -it kafka kafka-console-consumer --bootstrap-server localhost:9092 --topic orders --from-beginning
```

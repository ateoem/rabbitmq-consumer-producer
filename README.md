![Image description](https://i.imgur.com/N5dhLAA.gif)

# rabbitmq-consumer-producer

Simple rabbitmq queue.

## Requirements

tested on:
- Docker version 18.09.0-ce-beta1, build 78a6bdb
- docker-compose version 1.25.4, build 8d51620a

## Installation

```bash
git clone https://github.com/mfejczaruk/rabbitmq-consumer-producer.git
```

## Usage

1. Run producers
```bash
NODE_ENV=prod SEEDER=md5 docker-compose run -d produce
NODE_ENV=prod SEEDER=sha3 docker-compose run -d produce
NODE_ENV=prod SEEDER=keccak docker-compose run -d produce
```

2. Wait for logs
```bash
NODE_ENV=prod SEEDER=md5 docker-compose run consume
NODE_ENV=prod SEEDER=sha3 docker-compose run consume
NODE_ENV=prod SEEDER=keccak docker-compose run consume
```

## Tests

```bash
NODE_ENV=test docker-compose -f test-docker-compose.yml run node
```

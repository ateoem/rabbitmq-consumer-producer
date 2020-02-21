![Image description](https://i.imgur.com/N5dhLAA.gif)

# rabbitmq-consumer-producer

Simple rabbitmq queue.

## Requirements

test on:
- Docker version 18.09.0-ce-beta1, build 78a6bdb
- docker-compose version 1.25.4, build 8d51620a

## Installation

```bash
git clone https://github.com/ateoem/rabbitmq-consumer-producer.git
```

## Usage

```bash
NODE_ENV=prod docker-compose up
```

## Tests

```bash
NODE_ENV=test docker-compose -f test-docker-compose.yml run node
```

# Development Guide

## Setup

### Docker

You need to have [Docker][docker] and _[docker-compose][doco]_ installed on your computer.
The free _Docker Community Edition (CE)_ works perfectly fine. Make sure your user is part of the docker group:
```bash
usermod -a -G docker $USER
```

[docker]: https://docs.docker.com/install/
[doco]: https://docs.docker.com/compose/install/

Additionally you need **git** to be installed and configured.

🐧 This manual focuses on Linux/Ubuntu. Tplanr development also runs on other plattforms with some adjustments.

### Get the source code

First you need to clone this repository:

```bash
mkdir -p ~/git/ && cd ~/git/
git clone https://github.com/mtnstar/tplanr.git && cd ~/git/tplanr
```

### Init

Install dependencies

```bash
docker-compose run rails bundle install
docker-compose run -u root frontend chown 1000 /myapp/node_modules
docker-compose run frontend npm install
```

Create and seed development db:

```bash
docker-compose run rails rails db:setup
```

## Run development environment

```bash
docker-compose up -d
```

access running app with your favourite browser: http://localhost:4200

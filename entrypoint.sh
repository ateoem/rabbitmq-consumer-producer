#!/bin/sh
set -e
npm install --only=prod

if [ "$NODE_ENV" = "test" ]; then
  npm install --only=dev
  cp .env.test .env
else
  npm run build
fi

exec "$@"
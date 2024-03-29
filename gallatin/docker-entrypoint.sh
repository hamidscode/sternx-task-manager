#!/bin/bash

set -e

# wait-for-migration
mySequelize=$'npx sequelize-cli db:migrate:status'

until ! ($mySequelize | grep -q down); do
  >&2 echo "migration in progress - sleeping"
  sleep 1
done
>&2 echo "migration is up - run Api service"

exec "$@"
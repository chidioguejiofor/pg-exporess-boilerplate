#!/bin/bash

set -e

echo 'Running migrations in migrate.sh file'

./node_modules/.bin/sequelize db:migrate

echo 'Successfully ran migration in migrate.sh file'


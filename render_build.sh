#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pip install pipenv

pipenv install

pipenv run upgrade


flask insert-test-users 3
flask insert-test-chefs 3
flask insert-test-ingredients 3
flask insert-test-utensils 3



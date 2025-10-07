#!/bin/sh

set -e

# Run database migrations
# Useless most of the time, but ensures the DB is up to date
uv run ./manage.py migrate

# Run the command passed to the entrypoint
exec uv run "$@"
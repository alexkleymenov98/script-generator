#!/usr/bin/env sh
set -eu

envsubst '$VITE_API_URL' < /tmp/server.template > /etc/nginx/conf.d/default.conf

exec "$@"
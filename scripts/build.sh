#!/usr/bin/env bash
GIT_ROOT=$(git rev-parse --show-toplevel)

set -e

pushd "${GIT_ROOT}" > /dev/null

printf "Building container with docker:\n" && \
docker build -t coffee_frontend:v1 -f ./Containerfile .


SUCCESS=$?

popd > /dev/null

exit $SUCCESS
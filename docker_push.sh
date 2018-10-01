#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push brushblaster/chdesign-dashboard:v0.0.1 #$TRAVIS_BUILD_NUMBER

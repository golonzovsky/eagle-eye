#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ]; then
    docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
    docker build -f target/dockerfile/Dockerfile -t $DOCKER_USERNAME/eagle-eye:latest target
    docker push $DOCKER_USERNAME/eagle-eye:latest
fi

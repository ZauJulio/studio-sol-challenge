#!/bin/bash

PROJECT_NAME="StudioSolChallengeBackend"

sonar-scanner \
  -Dsonar.projectName=$PROJECT_NAME \
  -Dsonar.projectKey=StudioSolChallengeBackend \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://0.0.0.0:9090 \
  -Dsonar.login=$STUDIOSOL_CHALLENGE_BACKEND

#!/bin/bash
cd /home/kavia/workspace/code-generation/storymotion-60793-28d86178/storymotion_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


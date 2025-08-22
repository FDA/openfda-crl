#!/bin/bash

TODAY=$(date +"%Y-%m-%d")
BUCKET="openfda-clr-explorer"

echo "Pushing to: ${BUCKET}"

set -x

cd public

echo "Dry run..."

aws --profile openfda s3 sync . s3://${BUCKET}/crltable  --cache-control max-age=300 --dryrun

read -p "Do you want to continue (y/n)? "
[ "$(echo $REPLY | tr [:upper:] [:lower:])" == "y" ] || exit

echo "Pushing..."

aws --profile openfda s3 sync . s3://${BUCKET}/crltable --cache-control max-age=300

echo "Loading..."
open "http://${BUCKET}.s3-website-us-east-1.amazonaws.com/crltable"
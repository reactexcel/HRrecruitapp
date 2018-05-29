#!/usr/bin/env bash
# Upload directly to itunes connect

echo "The source dir is $APPCENTER_SOURCE_DIRECTORY"

HOCKEYAPP_API_TOKEN="540f17d410d947be9fae9e23c4383de5"

HOCKEYAPP_APP_ID="52d3af28ada74ac3a16e80ad00461d0d"


 
echo app_versions
    curl \
    -F "status=2" \
    -F "ipa=@$APPCENTER_OUTPUT_DIRECTORY/app-release.apk" \
    -H "X-HockeyAppToken: $HOCKEYAPP_API_TOKEN" \
    https://rink.hockeyapp.net/api/2/apps/$HOCKEYAPP_APP_ID/app_versions/upload

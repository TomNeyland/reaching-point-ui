#!/bin/sh

REV_NAME=$CIRCLE_PROJECT_REPONAME-$CIRCLE_BRANCH-$CIRCLE_BUILD_NUM
echo "REV_NAME:" $REV_NAME

# Create tarball
tar -C dist -cvf artifacts/$REV_NAME.tar .

# Transfer tarball
scp artifacts/$REV_NAME.tar root@dev.reachingpoint.com:/var/www

# Transfer tarball
# Backup current package
# Position new package to be served
# Remove the backup
ssh root@dev.reachingpoint.com "
  tar -xf /var/www/$REV_NAME.tar -C /var/www/$REV_NAME;
  mv /var/www/$CIRCLE_PROJECT_REPONAME /var/www/$CIRCLE_PROJECT_REPONAME_backup
  mv /var/www/$REV_NAME /var/www/$CIRCLE_PROJECT_REPONAME
  rm -rf /var/www/$CIRCLE_PROJECT_REPONAME_backup
"

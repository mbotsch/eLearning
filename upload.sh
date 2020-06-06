#/bin/bash

# re-build HTML decks
echo "Build HTML decks"
#decker clean
decker decks
#decker pdf-decks

# sync to /vol/cg/www
echo "Sync ./public/ to /vol/cg/www/"
rsync --recursive --no-group --no-owner --no-perms --chmod=u=rwX,go=rX --copy-links ./public/ wario.techfak.uni-bielefeld.de:/vol/cg/www/downloads/elearning/

# trigger upload to cg.www
echo "Upload /vol/cg/www to webserver"
ssh wario.techfak.uni-bielefeld.de /vol/cg/www/upload.sh


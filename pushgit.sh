jsdoc scripts_src -r -d docs
git checkout master
git add .
git commit -m "'$*'"
git push origin master

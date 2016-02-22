git checkout master
git add .
git commit -m "'$*'"
git push origin master
git checkout gh-pages
git merge master
git push origin gh-pages
git checkout master

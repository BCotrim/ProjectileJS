#!/bin/bash
#Automated minification

echo PERFORMING MINIFICATION...
java -jar yuicompressor-2.4.8.jar ../styles/styles.css --type css -o ../styles/styles.min.css
java -jar yuicompressor-2.4.8.jar ../javascripts/projectile.js --type js -o ../javascripts/projectile.min.js
echo BUILD SUCCESSFUL

# Design Project Overview

This project houses the creative design shell for the entire project.  A build process is utilized to then compile, minify and otherwise prepare the contents of the design for usage within the .NET project.

## What Should Go here
Given the method that is used for this build of this project, anything that would be contained in the following folders of the web-project should be added HERE an the compilation process used to transfer.

*  /wwwroot/css
*  /wwwroot/fonts
*  /wwwroot/images
*  /wwwroot/js
*  /wwwroot/webfonts
*  /favicon.ico

Inclusion of additioanl ad-hoc images are at no risk, and will simply be minfied at build time.  Additional CSS, Fonts, or similar should be considered for proper inclusion & build to ensure consistency in application environment/

# Environment Setup
The following items must be setup on your local machine prior to working with this project, this is a one-time requirement.  DO NOT try to interact with any of the command prior to completing ALL of these steps.

## Node.js
Node is utilized for build & demo serving purposes of the project and must be installed before you can properly build the solution.

Node can be downloaded here: https://nodejs.org/en/download/ 

Default installation options are fine, you do NOT need to install the additional tools requested during the installation process.

## Yarn
Yarn is utilized for package management for all dependent libraries and must be installed to be able to complete the restore process.

Yarn can be downloaded here: https://classic.yarnpkg.com/en/docs/install/#windows-stable

## Gulp
Gulp is the actual build runner for building the project.  You will want to install this using NPM from the command line using

`npm install --global gulp-cli`

## NPM Windows Build Tools
Additional tooling is needed to support building on Windows machines, you can install this globally using a "Run as Administrator" command prompt window using the following command.

`npm install --global windows-build-tools`

# Building
To build the Project and update the .NET project with the latest you will need to do the following

## Prerequisite Restoring of Packages
Before executing any commands you should restore all packages using the single-command 

`yarn`

This will require all packages and prepare the project for proper building & configuration.  This process initially may take up to 20-30 seconds and will take less than 1 second once completed.

## Build

This will update the .NET Project with all of the needed elements.  You can verify with the modified file listing within your .NET Project.

`gulp`
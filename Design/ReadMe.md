# Admin Template System

This project has been created to serve as a basis for all backend "admin system" style applications for use within .NET Core and related projects. 

This project is the "master project" and serves as the repository of all functionality including demonstrations.  It should in no case be distributed to a client AS-IS or otherwise used in an actual project without publishing or otherwise creating a project for the client.  

# Environment Setup
The following items must be setup on your local machine prior to working with this project, this is a one-time requirement.

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

This MUST be done before trying to do anything else

## NPM Windows Build Tools
Additional tooling is needed to support building on Windows machines, you can install this globally using a "Run as Administrator" command prompt window using the following command.

`npm install --global windows-build-tools`

# Building & Running Samples
You have the following options to interact with the project

## Prerequisite Restoring of Packages
Before executing any commands you should restore all packages using the single-command 

`yarn`

This will require all packages and prepare the project for proper building & configuration.  This process initially may take up to 20-30 seconds and will take less than 1 second once completed.

## Basic Build
This task will take the source and build the final solution, consisting of optimized images and minified CSS

`gulp`

## Viewing the interactive sample
To serve the built solution in a manner that allows you to interact with the sample 

`gulp serve`

Once executed a new browser window should be open with the path http:\\localhost:3000 which will contain the main page examples.  You may also navigate to /login.html to view the sample login page with the current configuration.

## Creating a new Project

To create a new project for a client you will use the `newProject` task.

`gulp newProject --ProjectName 'MuleHide.Backend'`

**NOTE:** project name should NOT include the .web bits of the project name, as that will be added automatically via convention.


## Updating an Existing Client Project
Currently there is no supported additional build commands for updating an existing project.  You will want to use the "newProject" commands from above, however, using caution when replacing files to ensure that you do not overwrite critical client components.  

*Items of special consideration*

* Color overrides
* Favicon Overrides
* Logo Overrides
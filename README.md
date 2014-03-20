DataCollector v 0.1.1 2014-03-19
=============

##### GENERAL USAGE NOTES
--------------------------------------

-DataCollector use node and its following packages
  -express
  -jade
  -cors
  -grunt
  -schema inspector
  
Obviously, they should be supported in order to run and develop DataCollector.

##### INSTALLATION
--------------------------------------

Firstly, you need node and node package manager to be installed on you machine, then you should open command line and type fallowing commands:
```bash
npm install
```
```bash
node app.js
```
That should start your server.
When developing dont forget to use:
```bash
grunt jshint
```
which will help you to lint your code.

##### FILE SYSTEM STRUCTURE
--------------------------------------

Root directory includes following files 
  -app.js (main app file, that stars server)
  -changelog.txt (bug fixes, new and removed features)
  -Gruntfile.js (it is used for developing purposes only, to lint and test code)
  -package.jsoin (defines needed packages for node package manager)
  -.gitignore (makes node modules folder invisible)
  -README.md (this file)
  
In public folder (and its subfolder) is stored ClientRecorder app files and logs.txt file, which provides logs made by Client recorder

routes folder contains index.js which generates index site view
spec folder contains testing files
src folder contains source files, which are used by app.js
views folder contains testing enviroment instance

##### DATACOLLECTOR FEATURES AND KNOW BUGS
--------------------------------------

Features
  -Receive post 
  -Send response to post request
  -Validate received data
  -Record received data to logs.txt file
  
##### UPDATING CURRENT HEROKU APP INSTANCE
--------------------------------------

We are using heroku app. In order to uploap new version to heroku you have to be installed heroku toolbelt and then you should login to heroku via
(request permission at povilozauras@gmail.com)

```bash
heroku login
```


then you should iniatilize your directory which you would like to upload to heroku upload it via

```bash
git push heroku master
```

And iniatilize with

```bash
heroku ps:scale web=1
```
```bash
heroku ps
```

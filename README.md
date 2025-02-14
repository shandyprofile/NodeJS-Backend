# NodeJS-Backend
 NodeJS-Backend

## 1. Installing
Assuming you’ve already installed Node.js, create a directory to hold your application, and make that your working directory.
- Express 4.x requires Node.js 0.10 or higher.
- Express 5.x requires Node.js 18 or higher.
```
$ mkdir myapp
$ cd myapp
```
Use the npm init command to create a package.json file for your application. For more information on how package.json works, see Specifics of npm’s package.json handling.
```
$ npm init
```
This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:

entry point: (index.js)
Enter app.js, or whatever you want the name of the main file to be. If you want it to be index.js, hit RETURN to accept the suggested default file name.

Now, install Express in the myapp directory and save it in the dependencies list. For example:

```
$ npm install express
```

To install Express temporarily and not add it to the dependencies list:

```
$ npm install express --no-save
```
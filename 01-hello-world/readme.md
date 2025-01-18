# Hello world example

Embedded below is essentially the simplest Express app you can create. It is a single file app — not what you’d get if you use the Express generator, which creates the scaffolding for a full app with numerous JavaScript files, Jade templates, and sub-directories for various purposes.

> Note: Install NodeJS: [Downloads](https://nodejs.org/en/download "Download here!")

## Initialize projects:

```
mkdir <project_name>
cd <project_name>
npm init
```

Enter all steps to create a new project

## Update package.json:

```
...
  "scripts": {
    "start": "node index",
    ...
  },
...
```

## Create a index.js:

```
const express = require('express');
const app = express();
const port = 3000;
const server = 'localhost';

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, localhost, () => {
  console.log(`Example app listening on port ${port}`)
})
```

This app starts a server and listens on port 3000 for connections. The app responds with “Hello World!” for requests to the root URL (/) or route. For every other path, it will respond with a 404 Not Found.

Running Locally
First create a directory named myapp, change to it and run npm init. Then, install express as a dependency, as per the installation guide.

In the myapp directory, create a file named app.js and copy the code from the example above.

The req (request) and res (response) are the exact same objects that Node provides, so you can invoke req.pipe(), req.on('data', callback), and anything else you would do without Express involved.

Run the app with the following command:

```
$ npm install express
$ npm start
```

Then, load http://localhost:3000/ in a browser to see the output.

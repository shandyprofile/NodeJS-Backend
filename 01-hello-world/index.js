const express = require('express')
const app = express()
const port = 3000
const server = 'localhost'

app.get('/', (req, res) => {
  res.send('Hello World! My name is Hieu Nguyen')
})

app.listen(port, server, () => {
  console.log(`Example app listening on port ${port}`)
})
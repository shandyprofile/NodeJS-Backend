const express = require('express')
const app = express()
const port = 3000
const server = 'localhost'

app.get('/', (req, res) => {
  res.send('Hello World! My name is Hieu Nguyen')
})

app.get('/1', (req, res) => {
  res.send(
    `<ul>
      <li>Alice (Admin)</li>
      <li>Bob (User)</li>
    </ul>`
  );
})

app.get('/2', (req, res) => {
  res.send('res')
})

app.listen(port, server, () => {
  console.log(`Example app listening on port ${port}`)
})
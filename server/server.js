const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const app = express()
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')

const isDev = process.env.NODE_ENV === 'development'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode'
}))

app.use(favicon(path.join(__dirname, '../test.ico')))
app.use('/api/user', require('./util/handle_login'))
app.use('/api', require('./util/proxy'))

if (!isDev) {
  const serverEntry = require('../dist/server_entry').default

  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  app.use('./public', express.static(path.join(__dirname, '../dist')))
  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry)

    res.send(template.replace('<!-- app -->', appString))
  })
} else {
  const devStatic = require('./util/dev_static')
  devStatic(app)
}

app.listen(3333, function () {
  console.log('server is running on 3333')
})

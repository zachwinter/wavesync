require('dotenv').config()

const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const fallback = require('express-history-api-fallback')
const compression = require('compression')

const app = express()
const root = path.resolve(__dirname, '../dist')
const port = process.env.PORT || 8001

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.get('/', (req, res) => {
    res.redirect('http://localhost:8080')
  })
}

app.use(cookieParser())
app.use(compression())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(root))
} 

app.use('/auth', require('./routes/auth'))
app.use('/callback', require('./routes/callback'))
app.use('/login', require('./routes/login'))
app.use('/refresh', require('./routes/refresh'))

app.use(fallback('index.html', { root }))

app.listen(port, () => console.log('Listening on port ' + port))
const express = require('express')
const router = express.Router()
const request = require('request')
const querystring = require('querystring')

router.get('/', (req, res) => {
  const code = req.query.code || null
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
    },
    json: true
  }
  
  request.post(authOptions, (error, response, body) => {
    if (!error && res.statusCode === 200) {
      res.cookie('SPOTIFY_ACCESS_TOKEN', body.access_token)
      res.cookie('SPOTIFY_REFRESH_TOKEN', body.refresh_token)
      res.cookie('SPOTIFY_REFRESH_CODE', code)
      if (process.env.NODE_ENV === 'development') {
        res.redirect('http://localhost:8080/visualizer')
      } else {
        res.redirect(process.env.PROJECT_ROOT + '/visualizer')
      }
    } else {
      res.redirect('/#' + querystring.stringify({ error: 'invalid_token' }))
    }
  })
})

module.exports = router
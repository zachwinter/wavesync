const express = require('express')
const router = express.Router()
const querystring = require('querystring')

router.get('/', (req, res, next) => {
  const auth_id = req.query.auth_id
  const query = querystring.stringify({
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    scope: 'user-read-playback-state',
    redirect_uri: process.env.REDIRECT_URI,
    state: auth_id
  })

  res.cookie('SPOTIFY_AUTH_ID', auth_id)
  res.redirect('https://accounts.spotify.com/authorize?' + query)
})

module.exports = router
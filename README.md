# wavesync
### A Spotify visualizer built with [spotify-viz](https://github.com/zachwinter/spotify-viz) and Vue. 

> Run Locally
1. Create a new Spotify app in your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
2. Add `http://localhost:8001/callback` to your app's Redirect URIs. Note your app's `Client ID` and `Client Secret`. 
3. Create a file named `.env` in the project's root directory with the following values:

```
CLIENT_ID=YOUR_CLIENT_ID_HERE
CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
REDIRECT_URI=http://localhost:8001/callback
PROJECT_ROOT=http://localhost:8001
NODE_ENV=development
```
4. Install using NPM.
```bash
npm i
```
5. Serve project.
```bash
npm run serve
```
6. Visit `http://localhost:8080` and log in with your Spotify account. 
7. Play a song in your Spotify client of choice. The visualizer will take a moment to sync before initializing.

> Build & Serve (Production)
1. Follow steps `1` through `4` above.
2. In your `.env` file, set `NODE_ENV` to `production`. 
3. Start project using NPM.
```bash
npm run start
```
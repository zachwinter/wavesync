<template lang="pug">
.visualizer
  Status(:loaded="loaded" :noPlayback="noPlayback")
  NowPlaying(:nowPlaying="nowPlaying")
</template>

<script>
import Status from '@/components/Status'
import NowPlaying from '@/components/NowPlaying'
import WaveSync from '@/wavesync'

export default {
  components: { Status, NowPlaying },

  data () {
    return {
      loaded: false,
      noPlayback: false,
      nowPlaying: {
        image: '',
        name: '',
        artist: ''
      }
    }
  },

  mounted () {
    this.waveSync = new WaveSync
    this.waveSync.sync.watch('active', () => this.loaded = true)
    this.waveSync.sync.watch('noPlayback', val => this.noPlayback = val)
    this.waveSync.sync.watch('currentlyPlaying', val => {
      this.nowPlaying = val
    })
  }
}
</script>
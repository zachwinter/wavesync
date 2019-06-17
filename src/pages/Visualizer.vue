<template lang="pug">
.visualizer
  Status(:loaded="loaded" :noPlayback="noPlayback")
</template>

<script>
import Status from '@/components/Status'
import WaveSync from '@/wavesync'

export default {
  components: { Status },

  data () {
    return {
      loaded: false,
      noPlayback: false
    }
  },

  mounted () {
    this.waveSync = new WaveSync

    this.waveSync.sync.state.watch('active', () => {
      this.loaded = true
    })

    this.waveSync.sync.state.watch('noPlayback', val => {
      this.noPlayback = val
    })
  }
}
</script>
<template lang="pug">
.visualizer
</template>

<script>
import WaveSync from '@/wavesync'

export default {
  mounted () {
    this.waveSync = new WaveSync
  }
}
</script>
<template lang="pug">
.visualizer
  .loading(:class="{ loaded }")
    h2 loading, one moment please
</template>

<script>
import WaveSync from '@/wavesync'

export default {
  data () {
    return {
      loaded: false
    }
  },
  mounted () {
    this.waveSync = new WaveSync
    this.waveSync.sync.state.watch('active', () => {
      this.loaded = true
    })
  }
}
</script>

<style lang="scss" scoped>
@keyframes fade-in {
  from { opacity: 0; } 
  to { opacity: 1 }
}

.loading {
  @include flex;
  @include position(fixed, 0 0 0 0);
  background: white;
  opacity: 1;
  transition: opacity 500ms linear;

  &.loaded { opacity: 0; }
}

h2 {
  animation: fade-in 500ms linear;
}
</style>

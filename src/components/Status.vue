<template lang="pug">
.status
  .loading.msg(:class="{ visible: !loaded }")
    h2 loading, one moment please
  .no-playback.msg(:class="{ visible: noPlayback }")
    h2 no playback detected
</template>

<script>
export default {
  props: ['loaded', 'noPlayback']
}
</script>

<style lang="scss">
@keyframes fade-in {
  from { opacity: 0; } 
  to { opacity: 1 }
}

.msg {
  @include flex;
  @include position(fixed, 0 0 0 0);
  background: white;
  opacity: 0;
  transition: opacity 500ms linear;
  pointer-events: none;

  &.visible { opacity: 1; }

  &.no-playback {
    z-index: 100;
  }
}

h2 {
  animation: fade-in 500ms linear;
}
</style>

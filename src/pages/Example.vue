<template lang="pug">
.example
  .loading(:class="{ loaded }")
    h2 ( loading, one moment please )
  .code
    h3 Hover here to see code.
    code(ref="code" v-html="code").javascript
</template>

<script>
import Example from '@/wavesync/example'
import hljs from 'highlightjs'
import 'highlightjs/styles/kimbie.dark.css'

export default {
  data () {
    return {
      loaded: false,
      code: `
        import Visualizer from './visualizer'<br>
        import { interpolateRgb, interpolateBasis } from 'd3-interpolate'<br>
        import { getRandomElement } from '@/util/array'<br>
        import { sin } from '@/util/canvas'<br><br>
        export default class Example extends Visualizer {<br>
        &nbsp;&nbsp;constructor () {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;super({ volumeSmoothing: 20 })<br>
        &nbsp;&nbsp;&nbsp;&nbsp;this.theme = ['#18FF2A', '#7718FF', '#06C5FE', '#FF4242', '#18FF2A']<br>
        &nbsp;&nbsp;}<br>
        <br>
        &nbsp;&nbsp;hooks () {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;this.sync.on('bar', i => {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.lastColor = this.nextColor || getRandomElement(this.theme)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.nextColor = getRandomElement(this.theme.filter(c => c !== this.nextColor))<br>
        &nbsp;&nbsp;&nbsp;&nbsp;})<br>
        &nbsp;&nbsp;}<br>
        <br>
        &nbsp;&nbsp;paint ({ ctx, height, width, now }) {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;const volume = this.sync.volume<br>
        &nbsp;&nbsp;&nbsp;&nbsp;const beat = this.sync.getInterval('beat')<br>
        &nbsp;&nbsp;&nbsp;&nbsp;const bar = this.sync.getInterval('bar')<br>
        &nbsp;&nbsp;&nbsp;&nbsp;const lineBeat = interpolateBasis([2, 300, 2])(beat.progress)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;const sizeBeat = interpolateBasis([0, 150, 0])(beat.progress)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;ctx.fillStyle = 'rgba(0, 0, 0, .1)'<br>
        &nbsp;&nbsp;&nbsp;&nbsp;ctx.fillRect(0, 0, width, height)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;ctx.lineWidth = lineBeat<br>
        &nbsp;&nbsp;&nbsp;&nbsp;ctx.strokeStyle = interpolateRgb(this.lastColor, this.nextColor)(bar.progress)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;sin(ctx, now / 50, height / 2, volume * 50, 100)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;ctx.stroke()<br>
        &nbsp;&nbsp;&nbsp;&nbsp;ctx.fillStyle = 'rgba(0, 0, 0, 1)'<br>
        &nbsp;&nbsp;&nbsp;&nbsp;ctx.beginPath()<br>
        &nbsp;&nbsp;&nbsp;&nbsp;ctx.arc(width / 2, height / 2, (volume * height / 5) + sizeBeat, 0, Math.PI * 2)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;ctx.stroke()<br>
        &nbsp;&nbsp;&nbsp;&nbsp;ctx.fill()<br>
        &nbsp;&nbsp;}<br>
      }
      `
    }
  },

  mounted () {
    this.example = new Example
    this.example.sync.state.watch('active', () => {
      this.loaded = true
    })

    hljs.highlightBlock(this.$refs.code)
  }
}
</script>

<style lang="scss" scoped>
.code {
  @include position(fixed, 0 null null 0);
  z-index: 10;
  @include size(auto);
  font-family: monospace;
  opacity: 1;
  color: white;

  code {
    padding: 20px;
    opacity: 0;
    transition: opacity 100ms linear;
    font-size: 12px;
  }

  h3 {
    display: inline-block;
    padding: 20px;
    cursor: normal;
  }

  h3:hover + code {
    opacity: 1;
  }
  
  &[data-show]{
    transform: translateX(0);
  }
}

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

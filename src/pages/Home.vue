<template lang="pug">
.home(ref="container" :class="{ loading }")
  .text
    h1 
      i w
      i a
      i v
      i e
      i s
      i y
      i n
      i c
    h2 a spotify visualizer 
    button(@click="auth") Login
</template>

<script>
import WaveSync from '@/wavesync'
import { auth } from '@/wavesync/sync'
import { get } from '@/util/network'

export default {
  data () {
    return {
      loading: false
    }
  },

  methods: {
    async auth () {
      const { data } = await get('http://localhost:8001/auth')
      this.loading = true
      this.$refs.container.addEventListener('animationend', () => {
        window.location.href = `http://localhost:8001/login?auth_id=${data.auth_id}`
      })
    }
  },

  mounted () {
    this.wavesync = new WaveSync({
      fixed: true
    })
  }
}
</script>

<style lang="scss" scoped>
@keyframes fade-out {
  from { background: white; }
  to  { background: transparent; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.home {
  @include position(fixed, 0 0 0 0);
  @include flex;

  &:before {
    content: '';
    background: white;
    pointer-events: none;
    @include position(absolute, 0 0 0 0);
    z-index: 10;
    animation: fade-out 1000ms ease-in forwards;
    animation-delay: 500ms;
  }

  &.loading:before {
    content: '';
    background: white;
    pointer-events: none;
    @include position(absolute, 0 0 0 0);
    z-index: 10;
    opacity: 0;
    animation: fade-in 400ms linear forwards;
    animation-delay: 500ms;
  }
}

.text {
  position: relative;
  text-align: center;
}

@keyframes beat {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1)
  }
}

h1 {
  @include scale(font-size 200px 72px, line-height 200px 72px);
  font-family: 'Gochi Hand', cursive;
  // animation: beat 600ms linear infinite;
  position: relative;
  z-index: 2;
  color: white;
  display: flex;
}

@keyframes slide-up {
  0% {
    transform: translateY(0px);
  }

  25% {
    transform: translateY(50px);
  }

  50% {
    transform: translateY(0px);
  }

  75% {
    transform: translateY(-50px);
  }

  100% {
    transform: translateY(0px);
  }
}

h1 i {
  animation: slide-up 20000ms linear forwards infinite;
  @include cascade(8, 2000ms);
  display: block;
}

h2 {
  @include scale(font-size 26px 18px, line-height 26px 18px, margin-top -50px 0px);
  font-family: 'Covered By Your Grace';
  position: relative;
  z-index: 2;
  color: white;
}

img {
  @include position(fixed, 50% null null null);
  transform: translateY(-50%) scale(.5);
  z-index: -1;
  animation: rotate 10s linear infinite;
}

button {
  @include button(white); 
  @include position(absolute, 100px null null null);
  transform: translateX(-50%) translateY(150px);
  margin: 0 auto;
  font-family: 'Covered By Your Grace';

  &:hover { color: black; }

  &:active {
    transform: translateX(-50%) translateY(150px) scale(.5);
  }
}
</style>

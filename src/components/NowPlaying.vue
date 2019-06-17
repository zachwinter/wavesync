<template lang="pug">
.now-playing(:class="{ visible }")
  img(:src="image")
  .text(:style="{ color: color || 'black' }")
    .name {{ name }}
    .artist {{ artist }}
</template>

<script>
export default {
  props: ['nowPlaying', 'color'],

  data () {
    return {
      delay: 4000, 
      visible: false,
      image: '',
      name: '',
      artist: ''
    }
  },

  watch: {
    nowPlaying (val) {
      const values = this.getCurrentlyPlaying(val)
      if (!values) {
        this.visible = false
      } else {
        this.image = values.image
        this.artist = values.artist
        this.name = values.name
        this.visible = true
        setTimeout(() => this.visible = false, this.delay)
      }
    }
  },

  methods: {
    getCurrentlyPlaying (val) {
      const name = val.name || false
      const album = val.album 
      const image = album ? album.images[1].url : false
      const artist = album ? album.artists[0].name : ''
      if (image === false) return false
      return { name, image, artist }
    }
  }
}
</script>

<style lang="scss" scoped>
.now-playing {
  @include position(fixed, null 0 0 0);
  @include flex(center, flex-start);
  @include scale(min-height 210px 140px);
  padding: 30px;
  z-index: 200;
  text-align: left;
  opacity: 0;
  transition: opacity 500ms ease-in-out;

  &.visible { opacity: 1; }
}

img {
  @include scale(width 150px 80px, height 150px 80px);
  margin-right: 15px;
}

.text {
  @include flex;
  flex-wrap: wrap;

  div { min-width: 100%; }
}

.name {
  @include scale(font-size 32px 18px);
}

.artist {
  @include scale(font-size 18px 14px);
}
</style>
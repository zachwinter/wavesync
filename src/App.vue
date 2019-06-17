<template lang="pug">
#app
  router-view
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Gochi+Hand&display=swap');
@import url('https://fonts.googleapis.com/css?family=Covered+By+Your+Grace&display=swap');

*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  @include size(100%);
  overflow: hidden;
}

body {
  font-family: 'Covered By Your Grace';
  font-weight: normal;

  * {
    font-family: inherit;
    font-weight: inherit;
  }
}

#app {
  position: relative;
  z-index: 20;
}

canvas {
  @include position(fixed, 0 null null 0);
}
</style>
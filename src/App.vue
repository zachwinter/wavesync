<template lang="pug">
#app
  router-view
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Rambla:700i|Gochi+Hand|Megrim&display=swap');
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300&display=swap');
@import url('https://fonts.googleapis.com/css?family=Covered+By+Your+Grace&display=swap');

*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
  z-index: 10;
}
</style>
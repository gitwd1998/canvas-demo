<template>
  <div id="app">
    <nav>
      <button v-for="item in $components" :key="item" @click="componentName = item">{{ decodeURI(item) }}</button>
    </nav>
    <component :is="componentName"></component>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      componentName: ''
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  margin: 4px;
  cursor: pointer;
}
canvas {
  background-color: #efefef;
}
</style>

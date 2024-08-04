<template>
  <main>
    <video v-show="false" ref="video" src="@/assets/Salt.mp4" :controls="false" :muted="false" loop="loop" :autoplay="false" @canplay="onCanplay"></video>
    <canvas ref="canvas" width="1000" height="500">当前浏览器版本过低，不支持canvas，请更换高版本浏览器后重试！</canvas>
    <br>
    <button v-if="toggle" @click="onStop">暂停</button>
    <button v-else @click="onStart">开始</button>
    <button @click="onGrayscale">灰度</button>
    <button @click="onAntiphase">反相</button>
    <button @click="onMosaic">马赛克</button>
    <button @click="onDraw">高清</button>
  </main>
</template>

<script>
export default {
  name: encodeURI('16.视频'),
  data() {
    return {
      context: null,
      video: null,
      toggle: false,
      num: null
    }
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')
  },
  beforeDestroy() {
    window.cancelAnimationFrame(this.num)
  },
  methods: {
    onCanplay() {
      this.context.drawImage(this.$refs.video, 0, 0)
    },
    onStart() {
      this.toggle = true
      this.$refs.video.play()
      this.onDraw()
    },
    onStop() {
      this.toggle = false
      this.$refs.video.pause()
      window.cancelAnimationFrame(this.num)
    },
    onDraw() {
      this.context.drawImage(this.$refs.video, 0, 0)
      cancelAnimationFrame(this.num)
      this.num = window.requestAnimationFrame(this.onDraw)
    },
    onGrayscale() {
      this.context.drawImage(this.$refs.video, 0, 0)
      const imageData = this.context.getImageData(0, 0, 426, 240)
      const data = imageData.data
      for (let index = 0; index < data.length; index+=4) {
        const avg = (data[index] + data[index + 1] + data[index + 2]) / 3
        data[index] = avg
        data[index + 1] = avg
        data[index + 2] = avg
      }
      this.context.putImageData(imageData, 0, 0)
      window.cancelAnimationFrame(this.num)
      this.num = window.requestAnimationFrame(this.onGrayscale)
    },
    onAntiphase() {
      this.context.drawImage(this.$refs.video, 0, 0)
      const imageData = this.context.getImageData(0, 0, 426, 240)
      const data = imageData.data
      for (let index = 0; index < data.length; index+=4) {
        data[index] = 255 - data[index]
        data[index + 1] = 255 - data[index + 1]
        data[index + 2] = 255 - data[index + 2]
      }
      this.context.putImageData(imageData, 0, 0)
      window.cancelAnimationFrame(this.num)
      this.num = window.requestAnimationFrame(this.onAntiphase)
    },
    onMosaic() {
      this.context.drawImage(this.$refs.video, 0, 0)
      for (var height = 0; height < this.$refs.canvas.height; height += 9) {
        for (var width = 0; width < this.$refs.canvas.width; width += 9) {
          var imgData = this.context.getImageData(width + 4, height + 4, 1, 1).data
          var rgb = 'rgba(' + imgData[0] + ',' + imgData[1] + ',' + imgData[2] + ', 1)'
          this.context.fillStyle = rgb
          this.context.fillRect(width, height, 9, 9)
        }
      }
      window.cancelAnimationFrame(this.num)
      this.num = window.requestAnimationFrame(this.onMosaic)
    }
  }
}
</script>
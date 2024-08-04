<template>
  <main>
    <canvas ref="canvas" width="1000" height="500">当前浏览器版本过低，不支持canvas，请更换高版本浏览器后重试！</canvas>
  </main>
</template>

<script>
export default {
  name: encodeURI('14.动画-全景循环'),
  data() {
    return {
      context: null,
      img: null
    }
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')
    this.img = new Image()
    this.img.src = require('@/assets/image.png')
    this.img.onload = () => {
      let index = 0
      let step = 1 // ms/px
      let canvasW = this.$refs.canvas.width
      let imgW = this.img.width
      let imgH = this.img.height
      let timer = setInterval(() => {
        if(index === 1000) clearInterval(timer)
        this.context.drawImage(this.img, imgW - index, 0, index, imgH, 0, 0, index, imgH)
        this.context.drawImage(this.img, 0, 0, imgW + index > canvasW ? canvasW - index : imgW, imgH, index, 0, imgW + index > canvasW ? canvasW - index : imgW, imgH)
        if (canvasW > imgW + index) this.context.drawImage(this.img, 0, 0, canvasW - imgW - index, imgH, imgW + index, 0, canvasW - imgW - index, imgH)
        index++
        index %= imgW
      }, step)
    }
  }
}
</script>
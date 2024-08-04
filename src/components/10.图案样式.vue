<template>
  <main>
    <canvas ref="canvas" width="1000" height="500">当前浏览器版本过低，不支持canvas，请更换高版本浏览器后重试！</canvas>
    <svg ref="svg"></svg>
  </main>
</template>

<!-- 
  context.createPattern(image, repetition): 图案样式，返回CanvasPattern对象
    image: 图像源
      HTMLImageElement (<img>)
      HTMLVideoElement (<video>)
      HTMLCanvasElement (<canvas>)
      CanvasRenderingContext2D
      ImageBitmap
      ImageData
      Blob
    repetition: 指定如何重复图像
      "repeat" (both directions)
      "repeat-x" (horizontal only)
      "repeat-y" (vertical only)
      "no-repeat" (neither)

  CanvasPattern.setTransform(matrix)：创建一个来自DOMMatrix具有指定图案变化的CanvasPattern
 -->
<script>
export default {
  name: encodeURI('10.图案样式'),
  data() {
    return {
      context: null,
      matrix: null,
      img: null
    }
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')
    this.matrix = this.$refs.svg.createSVGMatrix()
    
    this.img = new Image()
    this.img.src = require('@/assets/logo.png')
    this.img.onload = () => {
      const pattern = this.context.createPattern(this.img, 'repeat-y')
      pattern.setTransform(this.matrix.rotate(-45).scale(0.5))

      this.context.fillStyle = pattern
      this.context.fillRect(10, 10, 400, 400)
      
      this.context.strokeStyle = pattern
      this.context.lineWidth = 10
      this.context.strokeRect(500, 10, 400, 400)
    }
  }
}
</script>
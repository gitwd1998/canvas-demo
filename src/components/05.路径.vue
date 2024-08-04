<template>
  <main>
    <canvas ref="canvas" width="1000" height="500">当前浏览器版本过低，不支持canvas，请更换高版本浏览器后重试！</canvas>
  </main>
</template>

<script>
export default {
  name: encodeURI('05.路径'),
  data() {
    return {
      context: null
    }
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')

    this.context.beginPath()
    this.context.moveTo(100, 100)
    this.context.lineTo(100, 200)
    this.context.lineTo(200, 200)
    this.context.stroke()

    this.context.beginPath()
    this.context.rect(200, 100, 100, 50)
    this.context.stroke()

    this.context.beginPath()
    this.context.roundRect(330, 100, 100, 100, [10, 20, 30, 40])
    this.context.stroke()

    this.context.beginPath()
    this.context.arc(500, 100, 50, 0, Math.PI, true)
    this.context.stroke()

    this.context.beginPath()
    this.context.moveTo(500, 200)
    this.context.arcTo(700, 200, 600, 100, 50)
    this.context.stroke()

    this.context.beginPath()
    this.context.ellipse(800, 200, 100, 50, Math.PI / 2, 0, Math.PI * 2, true)
    this.context.stroke()

    this.context.beginPath()
    this.context.moveTo(100, 300)
    this.context.quadraticCurveTo(100, 500, 300, 300)
    this.context.stroke()

    this.context.beginPath()
    this.context.moveTo(400, 400)
    this.context.bezierCurveTo(600, 100, 700, 600, 800, 200)
    this.context.stroke()

    const path1 = new Path2D()
    path1.rect(800, 400, 50, 30)
    const path2 = new Path2D()
    path2.arc(900, 400, 20, 0, Math.PI)
    path2.addPath(path1)
    this.context.stroke(path2)
  }
}
</script>

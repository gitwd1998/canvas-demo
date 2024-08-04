<template>
  <main>
    <canvas ref="canvas" width="1000" height="500" @mousemove="onMousemove">
      <button ref="btnPath"></button>
      <button ref="linePath"></button>
    </canvas>
  </main>
</template>

<script>
export default {
  name: encodeURI('06.聚焦'),
  data() {
    return {
      context: null,
      btnPath: null,
      linePath: null
    }
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')
    this.btnPath = new Path2D()
    this.btnPath.rect(100, 100, 200, 100)
    this.linePath = new Path2D()
    this.linePath.moveTo(400, 100)
    this.linePath.bezierCurveTo(600, 100, 700, 600, 800, 200)
    this.drawBtn()
    this.drawLine()
    document.addEventListener('focus', () => {
      this.drawBtn()
    this.drawLine()
    })
    
    document.addEventListener('blur', () => {
      this.drawBtn()
    this.drawLine()
    })
  },
  methods: {
    onMousemove(e) {
      this.drawBtn()
      if (this.context.isPointInPath(this.btnPath, e.offsetX, e.offsetY)) {
        this.$refs.btnPath.focus()
      } else {
        this.$refs.btnPath.blur()
      }

      this.drawLine()
      if (this.context.isPointInStroke(this.linePath, e.offsetX, e.offsetY)) {
        this.$refs.linePath.focus()
      } else {
        this.$refs.linePath.blur()
      }
    },
    drawBtn() {
      this.context.clearRect(0, 0, 350, this.$refs.canvas.height)
      this.context.stroke(this.btnPath)
      this.context.drawFocusIfNeeded(this.btnPath, this.$refs.btnPath)
    },
    drawLine() {
      this.context.clearRect(400, 0, 600, this.$refs.canvas.height)
      this.context.stroke(this.linePath)
      this.context.drawFocusIfNeeded(this.linePath, this.$refs.linePath)
    }
  }
}
</script>

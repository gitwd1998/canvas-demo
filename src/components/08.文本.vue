<template>
  <main>
    <canvas ref="canvas" width="1000" height="500">当前浏览器版本过低，不支持canvas，请更换高版本浏览器后重试！</canvas>
    <svg ref="svg"></svg>
  </main>
</template>

<!-- 
    context.fillText(text, x, y, [maxWidth]) 绘制填充文本
    context.strokeText(text, x, y, [maxWidth]) 绘制描边文本
        text 要绘制的文本内容
        x, y 绘制文字起点左下角的坐标(基线)
        maxWidth 文字的最大宽度，超出这个最大尺寸会被压缩

 -->
<script>
export default {
  name: encodeURI('08.文本'),
  data() {
    return {
      context: null,
      text: '文字的内容，内容过长会超出画布，不会自动折行'
    }
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')
    this.context.font = 'italic bold 48px/60px "楷体"'

    this.context.fillText(this.text, 0, 60)

    this.context.strokeText(this.text, 0, 120)

    this.context.textBaseline = 'top'
    this.context.strokeText(this.text, 0, 180, this.$refs.canvas.width / 2)

    this.context.direction = 'rtl'
    this.context.fillText('this.text', 400, 240)

    console.log(this.context.measureText(this.text))
  }
}
</script>

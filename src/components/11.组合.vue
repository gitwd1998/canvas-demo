<template>
  <main>
    <canvas ref="canvas" width="1000" height="500">当前浏览器版本过低，不支持canvas，请更换高版本浏览器后重试！</canvas>
  </main>
</template>

<!-- 
  context.clip()：将当前正在构建的路径转换为当前的裁剪路径
  context.clip(fillRule)：将当前正在构建的路径转换为当前的裁剪路径
  context.clip(path, fillRule)：将当前正在构建的路径转换为当前的裁剪路径
    fillRule: 裁剪规则，默认 nonzero，可选 nonzero、evenodd
    path: 需要剪切的Path2D路径

  context.globalCompositeOperation = type
    源（source）: 要绘制的新图形
    目标（destination）: 已经在页面上绘制好的图像

    source-over: 在目标图像上显示源图像（默认值）
    destination-over: 在源图像上方显示目标图像

    source-atop: 在目标图像顶部显示源图像, 源图像位于目标图像之外的部分是不可见的
    destination-atop: 在源图像顶部显示目标图像, 目标图像位于源图像之外的部分是不可见的

    source-in: 绘制重合部分的源
    destination-in: 绘制重合部分的目标

    source-out: 绘制未重合部分的源
    destination-out: 绘制未重合部分的目标

    lighter: 显示源图像 + 目标图像(融合)

    copy: 显示源图像, 忽略目标图像

    xor: 绘制未重合部分的 源 和 目标

 -->
<script>
export default {
  name: encodeURI('11.组合'),
  data() {
    return {
      context: null,
    }
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')

    this.context.beginPath()
    this.context.arc(250, 250, 150, 0, Math.PI, true)
    // this.context.moveTo(0, 0)
    // this.context.lineTo(500, 500)
    // this.context.lineTo(0, 500)
    this.context.clip('evenodd')
    
    // 绘制圆形1
    this.context.beginPath()
    this.context.arc(200, 200, 100, 0, 2 * Math.PI)
    this.context.fillStyle = '#f00'
    this.context.fill()

    this.context.globalCompositeOperation = 'lighter'

    // 绘制圆形2
    this.context.beginPath()
    this.context.arc(300, 200, 100, 0, 2 * Math.PI)
    this.context.fillStyle = '#0f0'
    this.context.fill()

    this.context.globalCompositeOperation = 'lighter'

    // 绘制圆形3
    this.context.beginPath()
    this.context.arc(250, 300, 100, 0, 2 * Math.PI)
    this.context.fillStyle = '#00f'
    this.context.fill()
  }
}
</script>
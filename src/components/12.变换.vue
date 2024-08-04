<template>
  <main>
    <canvas ref="canvas" width="1000" height="500">当前浏览器版本过低，不支持canvas，请更换高版本浏览器后重试！</canvas>
  </main>
</template>

<!-- 
    canvas的变换操作，并不是操作的canvas画布，而是操作的canvas上的坐标系，一旦改变后会影响后面的所有图形的绘制
    
    当画布设置变换后，整个画布就变化了，如果还想回到之前没有缩放的效果，可以在变化回来，或者用 save 和 restore

    context.translate(x, y) 平移 可以是正值，也可以是负值
      x: 水平方向的移动
      y: 垂直方向的移动
    context.scale(x, y) 缩放(缩放的是单位长度)
      x: 水平方向的缩放比例，>1 为放大  <1 为缩小，如果为负值，坐标轴就会反转
      y: 垂直方向的缩放比例，>1 为放大  <1 为缩小，如果为负值，坐标轴就会反转
    context.rotate(angle) 旋转
      angle: 旋转的角度，它是顺时针方向的，以弧度为单位的值
    context.transform(a, b, c, d, e, f): 矩阵
      a: 水平方向的缩放
      b: 垂直方向的倾斜
      c: 水平方向的倾斜
      d: 垂直方向的缩放
      e: 水平方向的移动
      f: 垂直方向的移动
    context.setTransform(a, b, c, d, e, f): 矩阵
    context.resetTransform(): 重置为单位矩阵，它和调用context.setTransform(1, 0, 0, 1, 0, 0)效果一样
    context.getTransform(): 获取当前被应用到上下文的变换矩阵
 -->
<script>
export default {
  name: encodeURI('12.变换'),
  data() {
    return {
      context: null
    }
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')

    this.context.save()
    this.context.strokeStyle = 'tomato'
    for (let index = 0; index < 10; index++) {
      this.context.strokeRect(0, 0, 200, 100)
      this.context.translate(10, 10)
    }
    this.context.restore()

    this.context.save()
    this.context.translate(500, 0)
    this.context.strokeStyle = 'teal'
    for (let index = 0; index < 10; index++) {
      this.context.strokeRect(0, 0, 200, 200)
      this.context.scale(0.5, 0.5)
    }
    this.context.restore()

    this.context.save()
    this.context.translate(120, 350)
    for (let index = 0; index < 10; index++) {
      this.context.strokeRect(0, 0, 100, 50)
      this.context.rotate(Math.PI / 5)
    }
    this.context.restore()

    this.context.save()
    this.context.transform(1, 0.2, 0.8, 1, 500, 350)
    this.context.fillRect(0, 0, 100, 100)
    console.log(this.context.getTransform())
    console.log(this.context.getContextAttributes())
    
  }
}
</script>
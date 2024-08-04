<template>
  <main>
    <canvas ref="canvas" width="1000" height="500">当前浏览器版本过低，不支持canvas，请更换高版本浏览器后重试！</canvas>
  </main>
</template>

<!-- 
  context.createLinearGradient(x0, y0, x1, y1): 线性渐变，返回CanvasGradient对象
    x0: 起点的 x 轴坐标
    y0: 起点的 y 轴坐标
    x1: 终点的 x 轴坐标
    y1: 终点的 y 轴坐标

  context.createRadialGradient(x0, y0, r0, x1, y1, r1): 径向渐变，返回CanvasGradient对象
    x0: 开始圆形的 x 轴坐标
    y0: 开始圆形的 y 轴坐标
    r0: 开始圆形的半径
    x1: 结束圆形的 x 轴坐标
    y1: 结束圆形的 y 轴坐标
    r1: 结束圆形的半径
  
  context.createConicGradient(startAngle, x, y): 锥形渐变，返回CanvasGradient对象
    startAngle: 梯度开始的角度，以弧度为单位。角度从中心向右水平方向的一条线开始，然后顺时针方向进行
    x: 渐变中心的 x 轴坐标
    y: 渐变中心的 y 轴坐标
    
  CanvasGradient.addColorStop(offset, color)：添加断点到渐变中


  渐变色是设置在canvas上的，渐变有渐变的范围，在渐变范围之外，可能会显示纯色或canvas的底色
    
    如果配置好渐变色后，绘制出来的图形并没有渐变效果，原因可能是
      ① 图形显示颜色但非渐变色，是由于所绘制图形跨度不够
      ② 图形不显示，在设置径向渐变色时，渐变的范围是在两个渐变圆的公切线范围内，而在公切线范围之外现实的则是canvas的底色

 -->
<script>
export default {
  name: encodeURI('09.渐变'),
  data() {
    return {
      context: null
    }
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')

    // this.context.beginPath()
    // this.context.moveTo(0, 0)
    // this.context.lineTo(this.$refs.canvas.width, 0)
    // this.context.stroke()
    // const linearGradient = this.context.createLinearGradient(0, 0, this.$refs.canvas.width, 0);
    // linearGradient.addColorStop(0, 'teal')
    // linearGradient.addColorStop(0.2, 'red');
    // linearGradient.addColorStop(0.4, 'yellow');
    // linearGradient.addColorStop(0.6, 'blue');
    // linearGradient.addColorStop(0.8, 'green');
    // linearGradient.addColorStop(1, 'orange');


    // this.context.beginPath()
    // this.context.moveTo(0, 0)
    // this.context.lineTo(this.$refs.canvas.width, this.$refs.canvas.height)
    // this.context.stroke()
    // const linearGradient2 = this.context.createLinearGradient(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
    // linearGradient2.addColorStop(0, 'teal')
    // linearGradient2.addColorStop(0.2, 'red');
    // linearGradient2.addColorStop(0.4, 'yellow');
    // linearGradient2.addColorStop(0.6, 'blue');
    // linearGradient2.addColorStop(0.8, 'green');
    // linearGradient2.addColorStop(1, 'orange');


    this.context.beginPath()
    this.context.arc(this.$refs.canvas.width / 2, this.$refs.canvas.height / 2, 50, 0, Math.PI * 2)
    this.context.arc(this.$refs.canvas.width / 2, this.$refs.canvas.height / 2, 200, 0, Math.PI * 2)
    this.context.stroke()
    const radialGradient = this.context.createRadialGradient(this.$refs.canvas.width / 2, this.$refs.canvas.height / 2, 50, this.$refs.canvas.width / 2, this.$refs.canvas.height / 2, 200);
    radialGradient.addColorStop(0, 'teal')
    radialGradient.addColorStop(0.2, 'red');
    radialGradient.addColorStop(0.4, 'yellow');
    radialGradient.addColorStop(0.6, 'blue');
    radialGradient.addColorStop(0.8, 'green');
    radialGradient.addColorStop(1, 'orange');

    // this.context.beginPath()
    // this.context.arc(0, this.$refs.canvas.height / 2, 50, 0, Math.PI * 2)
    // this.context.arc(this.$refs.canvas.width, this.$refs.canvas.height / 2, 200, 0, Math.PI * 2)
    // this.context.stroke()
    // const radialGradient2 = this.context.createRadialGradient(0, this.$refs.canvas.height / 2, 200, this.$refs.canvas.width, this.$refs.canvas.height / 2, 200);
    // radialGradient2.addColorStop(0, 'teal')
    // radialGradient2.addColorStop(0.2, 'red');
    // radialGradient2.addColorStop(0.4, 'yellow');
    // radialGradient2.addColorStop(0.6, 'blue');
    // radialGradient2.addColorStop(0.8, 'green');
    // radialGradient2.addColorStop(1, 'orange');

    // const conicGradient = this.context.createConicGradient(0, this.$refs.canvas.width / 2, this.$refs.canvas.height / 2);
    // conicGradient.addColorStop(0, 'red');
    // conicGradient.addColorStop(0.25, 'orange');
    // conicGradient.addColorStop(0.5, 'yellow');
    // conicGradient.addColorStop(0.75, 'green');
    // conicGradient.addColorStop(1, 'blue');


    // this.context.fillStyle = linearGradient;
    // this.context.fillStyle = linearGradient2;
    this.context.fillStyle = radialGradient;
    // this.context.fillStyle = radialGradient2;
    // this.context.fillStyle = conicGradient;
    for (let i = 0; i < 20; i++) {
        this.context.fillRect(0, 5 + i * 30, this.$refs.canvas.width, 20);
    }
  }
}
</script>
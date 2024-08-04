<template>
  <main>
    <canvas ref="canvas" width="1000" height="500">当前浏览器版本过低，不支持canvas，请更换高版本浏览器后重试！</canvas>
  </main>
</template>

<!-- 
	window.requestAnimateFrame(fun)
	
	window.cancelAnimateFrame(编号)
	
	根据浏览器的帧率调用函数，有点类似于递归，和计时器也有点类似，
	
	和递归相似的是都是在执行自己的时调用自己，不同的是该方法是可控的，而递归是不可控的，需要设置出口，否则就会就会死循环
	
	和计时器相似的是有着和计时器类似的编号，不同的是该方法的执行频率是根据浏览器的刷新频率执行的
	
 -->
<script>
export default {
  name: encodeURI('15.动画-时钟'),
  data() {
    return {
      context: null,
      num: null
    }
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')
    this.context.translate(500, 250)
    this.context.rotate(-Math.PI / 2)
    window.requestAnimationFrame(this.clock)
  },
  methods: {
    clock() {
      const now = new Date()
      this.context.clearRect(-this.$refs.canvas?.width / 2, -this.$refs.canvas?.height / 2, this.$refs.canvas?.width, this.$refs.canvas?.height)
      for (let index = 1; index <= 60; index++) {
        this.context.save()
        this.context.beginPath()
        this.context.rotate(Math.PI / 30 * index)
        this.context.lineCap = 'round'
        this.context.lineWidth = 3
        if (!(index % 5)) this.context.fillText(index / 5, 110, 0)
        this.context.strokeStyle = index % 5 ? '#ccc' : '#000'
        this.context.moveTo(90, 0)
        this.context.lineTo(100, 0)
        this.context.stroke()
        this.context.restore()
      }

      const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
      // const seconds = now.getSeconds()
      const minutes = now.getMinutes()
      const hours = now.getHours() % 12
      const secondsAngle = seconds * Math.PI / 30
      const minutesAngle = (minutes + seconds / 60) *  Math.PI / 30
      const hoursAngle = (hours + minutes / 60 + seconds / 3600) * Math.PI / 6

      // 时针
      this.context.save()
      this.context.beginPath()
      this.context.rotate(hoursAngle)
      this.context.lineWidth = 4
      this.context.lineCap = 'round'
      this.context.strokeStyle = 'teal'
      this.context.moveTo(-6, 0)
      this.context.lineTo(60, 0)
      this.context.stroke()
      this.context.restore()

      // 分针
      this.context.save()
      this.context.beginPath()
      this.context.rotate(minutesAngle)
      this.context.lineWidth = 2
      this.context.lineCap = 'round'
      this.context.moveTo(-14, 0)
      this.context.lineTo(90, 0)
      this.context.stroke()
      this.context.restore()

      // 秒针
      this.context.save()
      this.context.beginPath()
      this.context.rotate(secondsAngle)
      this.context.strokeStyle = 'tomato'
      this.context.lineWidth = 1
      this.context.lineCap = 'round'
      this.context.moveTo(-20, 0)
      this.context.lineTo(100, 0)
      this.context.stroke()
      this.context.restore()

      this.num = window.requestAnimationFrame(this.clock)
    }
  }
}
</script>
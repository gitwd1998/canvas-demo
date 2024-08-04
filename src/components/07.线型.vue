<template>
  <main>
    <canvas ref="canvas" width="1000" height="500">当前浏览器版本过低，不支持canvas，请更换高版本浏览器后重试！</canvas>
  </main>
</template>

<script>
export default {
  name: encodeURI('07.线型'),
  data() {
    return {
      context: null
    }
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')
    // 线宽对比
    this.lineWidthContrast()

    // 线帽对比
    this.lineCapContrast()
    
    // 连结方式对比
    this.lineJoinContrast()

    // miterLimit效果
    this.miterLimitContrast()

    // 蚂蚁线
    this.antLine()
    console.log(this.context.getLineDash())

  },
  methods: {
    // 线宽对比
    lineWidthContrast() {
      for (let index = 0; index < 10; index++) {
        this.context.beginPath()
        this.context.lineWidth = index
        this.context.moveTo(50 + index * 30, 50)
        this.context.lineTo(50 + index * 30, 200)
        this.context.stroke()
        this.context.closePath()
      }
    },
    // 线帽对比
    lineCapContrast() {
      var lineCapArr = ['butt', 'round', 'square']
      this.context.strokeStyle = 'teal'
      for (let index in lineCapArr) {
        this.context.lineCap = lineCapArr[index]
        this.context.beginPath()
        this.context.lineWidth = 10
        this.context.moveTo(50 + index * 30, 300)
        this.context.lineTo(50 + index * 30, 450)
        this.context.stroke()
        this.context.closePath()
      }
      this.context.beginPath()
      this.context.strokeStyle = 'rgba(0, 0, 0, 0.8)'
      this.context.lineWidth = 1
      this.context.moveTo(0, 300)
      this.context.lineTo(200, 300)
      this.context.stroke()
    },
    // 连结方式对比
    lineJoinContrast() {
      var lineJoinArr = ['round', 'bevel', 'miter']
      this.context.lineWidth = 10
      this.context.strokeStyle = 'tomato'
      for (var index in lineJoinArr) {
        this.context.lineJoin = lineJoinArr[index]
        this.context.beginPath()
        this.context.moveTo(500, 50 + index * 50)
        this.context.lineTo(550, 100 + index * 50)
        this.context.lineTo(600, 50 + index * 50)
        this.context.lineTo(650, 100 + index * 50)
        this.context.lineTo(700, 50  + index * 50)
        this.context.stroke()
        this.context.closePath()
      }
    },
    // miterLimit效果
    miterLimitContrast() {
      this.context.strokeStyle = '#f0f'
      this.context.lineWidth = 10
      this.context.beginPath()
      this.context.miterLimit = 100
      this.context.moveTo(400, 300)
      for (let index = 0; index < 20; index++) {
        this.context.lineTo(410 + index * 10, index % 2 ? 250 : 350)
      }
      this.context.stroke()
      this.context.closePath()
    },
    // 蚂蚁线
    antLine() {
      this.context.setLineDash([5, 10, 15])
      let offset = 0
      setInterval(() => {
        offset++
        offset %= 60
        this.context.clearRect(650, 300, 300, 100)
        this.context.beginPath()
        this.context.strokeStyle = '#000'
        this.context.lineWidth = 1
        this.context.lineDashOffset = offset
        this.context.moveTo(700, 330)
        this.context.lineTo(900, 330)
        this.context.stroke()
      }, 10)
    }
  }
}
</script>

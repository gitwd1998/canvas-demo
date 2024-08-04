<template>
  <main :style="{ backgroundColor }">
    <canvas ref="canvas" width="1000" height="500" @mousemove="onMousemove">当前浏览器版本过低，不支持canvas，请更换高版本浏览器后重试！</canvas>
    <p>background-color: {{ backgroundColor }}</p>

    <label for="imageSmoothingEnabled">imageSmoothingEnabled: </label>
    <input id="imageSmoothingEnabled" type="checkbox" v-model="imageSmoothingEnabled" @change="context.imageSmoothingEnabled = imageSmoothingEnabled">
    <br>
    <label for="imageSmoothingQuality">imageSmoothingQuality: </label>
    <select id="imageSmoothingQuality" v-model="imageSmoothingQuality" @change="context.imageSmoothingQuality = imageSmoothingQuality">
      <option value="low">low</option>
      <option value="medium">medium</option>
      <option value="high">high</option>
    </select>
    <br>

    <button @click="onDrawImage">绘制</button>
    <button @click="onGrayscale">灰度</button>
    <button @click="onAntiphase">反相</button>
    <button @click="onMosaic">马赛克</button>
    <button @click="onDownload">下载</button>
  </main>
</template>

<!-- 
  contetx.drawImage(image, dx, dy) 将图片绘制到canvas上
		image 要加载的图片
		sx, sy 图片开始绘制的位置点
		图片可能显示不完全，或者画布可能填充不满
	context.drawImage(image, dx, dy, dw, dh) 将图片绘制到canvas上
		image 要加载的图片
		dx, dy 图片开始绘制的位置点
		dw, dh 绘制图片的宽高
		图片的宽高比例可能会变化
	context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)将图片绘制到canvas上
		image 要加载的图片
		sx, sy 在图片上截取矩形区域的起始位置点坐标
		sw, sh 在图片上截取矩形区域的宽高
		dx, dy 在画布上开始绘制的位置点
		dw, dh 绘制图片的宽高

  像素的操作会涉及跨域问题（本地文件系统和web服务器）

  context.getImageData(sx, sy, sw, sh)
		获取canvas指定区域的像素点，返回ImageData对象，对象中的data、width、height 属性
		width: 获取像素值矩形区域的宽的
		height: 获取像素值矩形区域的高度
		sata: 是一个数组，该数组中存储的是 矩形区域中 每个点的像素值，数组中 每四个数 构成一个点 的 r，g，b，a 颜色值。

  context.putImageData(imageData, dx, dy)
  context.putImageData(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
    在canvas指定位置绘制像素
		imageData 要绘制的像素
		dx, dy 会知道canvas上的位置
		dirtyX, dirtyY 在获取的像素上截取矩形区域的起点坐标
		dirtyWidth, dirtyHeight 在获取的像素上截取矩形区域的宽高

  context.createImageData(sw, sh, [setting])
    创建一个新的具体特定尺寸的 ImageData 对象。所有像素被预设为透明黑（rgba(0, 0, 0, 0)）
  context.createImageData(imageData)
    创建一个被 anotherImageData 对象指定的相同像素的 ImageData 对象。这个新的对象像素全部被预设为透明黑（rgba(0, 0, 0, 0)）。这个并非复制了图片数据

  context.imageSmoothingEnabled: 设置图片缩放时是否平滑
 -->
<script>
export default {
  name: encodeURI('13.图片'),
  data() {
    return {
      context: null,
      img: null,
      backgroundColor: '',
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'low'
    }
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')
    this.img = new Image()
    this.img.src = require('@/assets/image.png')
    this.img.onload = () => {
      this.context.drawImage(this.img, 0, 0)
    }
  },
  methods: {
    onDrawImage() {
      this.context.drawImage(this.img, 0, 0)
    },
    onMousemove(e) {
      const imageData = this.context.getImageData(e.offsetX, e.offsetY, 1, 1)
      const data = imageData.data
      this.backgroundColor = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`
      const imageDataArea = this.context.getImageData(e.offsetX - 50, e.offsetY - 50, 100, 100)
      this.context.putImageData(imageDataArea, this.img.width + 10, 10)
      this.context.putImageData(imageDataArea, this.img.width + 10, 100, 40, 40, 20, 20)
      this.context.drawImage(this.img, e.offsetX - 10, e.offsetY - 10, 20, 20, this.img.width + 10, 200, 160, 160)
    },
    onGrayscale() {
      this.onDrawImage()
      const imageData = this.context.getImageData(0, 0, this.img.width, this.img.height)
      const data = imageData.data
      for (let index = 0; index < data.length; index+=4) {
        const avg = (data[index] + data[index + 1] + data[index + 2]) / 3
        data[index] = avg
        data[index + 1] = avg
        data[index + 2] = avg
      }
      this.context.putImageData(imageData, 0, 0)
    },
    onAntiphase() {
      this.onDrawImage()
      const imageData = this.context.getImageData(0, 0, this.img.width, this.img.height)
      const data = imageData.data
      for (let index = 0; index < data.length; index+=4) {
        data[index] = 255 - data[index]
        data[index + 1] = 255 - data[index + 1]
        data[index + 2] = 255 - data[index + 2]
      }
      this.context.putImageData(imageData, 0, 0)
    },
    onMosaic() {
      this.onDrawImage()
      for (var height = 0; height < this.img.height; height += 9) {
        for (var width = 0; width < this.img.width; width += 9) {
          var imgData = this.context.getImageData(width + 4, height + 4, 1, 1)
          var rgb = 'rgba(' + imgData.data[0] + ',' + imgData.data[1] + ',' + imgData.data[2] + ',255)'
          this.context.fillStyle = rgb
          this.context.fillRect(width, height, 9, 9)
        }
      }
    },
    onDownload() {
      console.log(window.navigator.msSaveOrOpenBlob)
      if (window.navigator.msSaveOrOpenBlob) {
        const imgData = this.$refs.canvas.msToBlob()
        const blobObj = new Blob([imgData])
        window.navigator.msSaveOrOpenBlob(blobObj)
      } else {
        const dataURI = this.$refs.canvas.toDataURL('image/png', 0.1)
        const a = document.createElement('a')
        document.body.appendChild(a)
        a.href = dataURI
        a.download = 'download-canvas-img.png'
        a.click()
        document.body.removeChild(a)
      }
    }
  }
}
</script>
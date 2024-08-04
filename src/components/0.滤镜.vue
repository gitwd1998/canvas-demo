<template>
  <main>
    <img :style="{ filter }" src="@/assets/image.png" alt="">
    <br>
    <button @click="btnClick0">模糊</button>
		<button @click="btnClick1">复古</button>
		<button @click="btnClick2">灰度</button>
		<button @click="btnClick3">色相旋转</button>
		<button @click="btnClick4">反相</button>
		<button @click="btnClick5">透明度</button>
		<button @click="btnClick6">亮度</button>
		<button @click="btnClick7">对比度</button>
		<button @click="btnClick8">阴影</button>
		<button @click="btnClick9">饱和度</button>
  </main>
</template>

<!-- 
  CSS3样式，IE11-不支持
 -->
<script>
export default {
  name: encodeURI('0.滤镜'),
  data() {
    return {
      filter: ''
    }
  },
  methods: {
    btnClick0() {
      // 模糊，默认值0，数值越大越模糊
      this.filter = 'blur(10px)';
    },
    btnClick1() {
      // 褐色，默认值1，取值范围0-1，表示0%的原色到100%的褐色
      this.filter = "sepia(50%)"
    },
    btnClick2() {
      // 灰度，默认值1，取值范围0-1，表示0%的原色到100%的灰色
      this.filter = "grayscale(50%)"
    },
    btnClick3() {
      // 色相旋转，默认值0deg，取值范围0deg-360deg
      this.filter = "hue-rotate(180deg)"
    },
    btnClick4() {
      // 反相，默认值1，取值范围0-1，表示0%的原色到100%的反色
      this.filter = "invert(70%)"
    },
    btnClick5() {
      // 透明度，默认值1，取值分为0-1，表示全透明到不透明
      this.filter = "opacity(10%)"
    },
    btnClick6() {
      // 亮度, 默认值1，数值越大图片越亮
      this.filter = "brightness(2)"
    },
    btnClick7() {
      // 对比度，默认值1，数值越大对比度越高
      this.filter = "contrast(100)"
    },
    btnClick8() {
      // 阴影
      this.filter = "drop-shadow(10px 10px 10px #000)"
    },
    btnClick9() {
      // 饱和度，默认值1，数值越大饱和度越高
      this.filter = "saturate(10)"
    }
  }
}
</script>
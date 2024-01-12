<script setup>
import { computed, onUnmounted, ref } from 'vue'

const el = ref(null)

function onMove() {
  window.addEventListener('mousemove', move)
}

window.addEventListener('mouseup', () => {
  window.removeEventListener('mousemove', move)
})

function move(e) {
  // 当前的旋转角度
  const rotateX = el.value.style.transform.match(/rotateX\((\d+)deg\)/)
  const rotateY = el.value.style.transform.match(/rotateY\((\d+)deg\)/)
  // console.log(el.value.style.transform)

  const currentRotateX = rotateX ? +rotateX[1] : 0
  const currentRotateY = rotateY ? +rotateY[1] : 0
  // 鼠标移动的距离
  const moveX = e.movementX
  const moveY = e.movementY
  // 旋转的角度
  const rotateXDeg = currentRotateX + moveY
  const rotateYDeg = currentRotateY - moveX
  el.value.style.transform = `rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg)`
}

onUnmounted(() => {
  window.removeEventListener('mousemove', move)
})
</script>

<template>
  <div h-full w-full flex cursor-pointer items-center justify-center @mousedown="onMove" @touchstart="onMove">
    <div ref="el" class="box" style="transform: rotateX(-40deg) rotateY(40deg);">
      <div class="item top">
        1
      </div>
      <div class="item bottom">
        2
      </div>
      <div class="item front">
        3
      </div>
      <div class="item back">
        4
      </div>
      <div class="item left">
        5
      </div>
      <div class="item right">
        6
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
  /* background-color: blanchedalmond; */

  user-select: none;
}

.item {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.6;
  text-align: center;
  line-height: 200px;
  color: white;
  font-size: 60px;
  font-weight: 700;
}

.top {
  background-color: chartreuse;
  transform: rotateX(90deg) translateZ(100px);
}

.bottom {
  background-color: blue;
  transform: rotateX(-90deg) translateZ(100px);
}

.front {
  background-color: blueviolet;
  transform: translateZ(100px);
}

.back {
  background-color: brown;
  transform: translateZ(-100px);
}

.left {
  background-color: cyan;
  transform: rotateY(-90deg) translateZ(100px);
}

.right {
  background-color: darkred;
  transform: rotateY(90deg) translateZ(100px);
}
</style>

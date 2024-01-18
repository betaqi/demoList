<script setup>
import { ref } from 'vue'
import { Rectangle } from './utli'

const fillColor = ref()
const el = ref()

const ctx = $computed(() => el.value.getContext('2d'))

const windowWidth = ref(0)
const windowHeight = ref(0)
const CanvasWidth = $computed(() => windowWidth.value * 0.8)
const CanvasHeight = $computed(() => windowWidth.value * 0.9)
const shapes = []

function mouseDown(e) {
  const { offsetX, offsetY } = e
  const ctxRect = el.value.getBoundingClientRect()
  const shapeSibling = isMouseDownOnShape(offsetX, offsetY)

  if (shapeSibling.length > 0) {
    const dropShape = shapeSibling[shapeSibling.length - 1]
    mouseDownDrop(e, ctxRect, dropShape)
  }
  else {
    const startPoint = { x: offsetX, y: offsetY }
    const rect = new Rectangle(startPoint, fillColor.value, ctx)
    shapes.push(rect)
    window.onmousemove = event => mouseMove(event, ctxRect, rect)
  }

  OnMouseUp()
}

function mouseDownDrop(e, ctxRect, dropShape) {
  const { startPoint, endPoint } = dropShape
  const { offsetX, offsetY } = e
  window.onmousemove = (moveEvent) => {
    // 鼠标偏移量
    const disX = moveEvent.clientX - ctxRect.left - offsetX
    const disY = moveEvent.clientY - ctxRect.top - offsetY
    dropShape.startPoint = {
      x: startPoint.x + disX,
      y: startPoint.y + disY,
    }
    dropShape.endPoint = {
      x: endPoint.x + disX,
      y: endPoint.y + disY,
    }
  }
}

function mouseMove(e, ctxRect, rect) {
  const { clientX, clientY } = e
  const endPoint = {
    x: clientX - ctxRect.left,
    y: clientY - ctxRect.top,

  }
  rect.endPoint = endPoint
}

function isMouseDownOnShape(x, y) {
  return shapes.filter((shape) => {
    const { minX, minY, maxX, maxY } = shape
    return x >= minX && x <= maxX && y >= minY && y <= maxY
  })
}

function draw() {
  ctx.fillStyle = '#000'
  requestAnimationFrame(draw)
  ctx.clearRect(0, 0, CanvasWidth, CanvasHeight)
  for (const rect of shapes)
    rect.draw()
}

function OnMouseUp() {
  window.onmouseup = () => {
    window.onmousemove = null
    window.onmouseup = null
  }
}

onMounted(() => {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
  draw()
})
</script>

<template>
  <div h-full w-full flex flex-col items-center justify-center>
    <div flex items-center pb3>
      绘制颜色选择<input v-model="fillColor" type="color">
    </div>
    <canvas ref="el" cursor-pointer style="background-color: #fff5;" :width="CanvasWidth" :height="CanvasHeight" @mousedown="mouseDown" />
  </div>
</template>

<style>

</style>

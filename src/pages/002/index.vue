<script setup lang="ts">
import { reactive, ref } from 'vue'

interface Point {
  x: number
  y: number
}
interface Branch {
  start: Point
  length: number
  theat: number
}

const rect = reactive({
  width: 500,
  height: 500,
})

const el = ref<HTMLCanvasElement>()
const ctx = computed(() => el.value!.getContext('2d')!)
const pendingTasks: Function[] = []

function init() {
  ctx.value.strokeStyle = '#fff5'
  const branch: Branch = {
    start: { x: rect.width / 2, y: rect.height },
    length: 30,
    theat: -Math.PI / 2,
  }
  // const branch: Branch = {
  //   start: { x: 0, y: 0 },
  //   length: 30,
  //   theat: Math.PI / 3,
  // }
  step(branch)
  startFrame()
}

function step(b: Branch, depth = 0) {
  const endPrint = getEndPrint(b)
  drawBranch(b.start, endPrint)
  if (depth < 4 || Math.random() < 0.3) {
    pendingTasks.push(() => {
      step({
        start: endPrint,
        length: b.length + (Math.random() * 10 - 4),
        theat: b.theat - 0.2 * Math.random(),
      }, depth += 1)
    })
  }
  if (depth < 4 || Math.random() < 0.3) {
    pendingTasks.push(() => {
      step({
        start: endPrint,
        length: b.length + (Math.random() * 10 - 4),
        theat: b.theat + 0.2 * Math.random(),
      }, depth += 1)
    })
  }
}

function getEndPrint(b: Branch) {
  const { start, length, theat } = b
  return ({
    x: start.x + length * Math.cos(theat),
    y: start.y + length * Math.sin(theat),
  })
}

function drawBranch(p1: Point, p2: Point) {
  ctx.value.beginPath()
  ctx.value.moveTo(p1.x, p1.y)
  ctx.value.lineTo(p2.x, p2.y)
  ctx.value.stroke()
}

function runTasks() {
  const tasks = [...pendingTasks]
  pendingTasks.length = 0
  tasks.forEach(task => task())
}
let framesCount = 0
function startFrame() {
  requestAnimationFrame(() => {
    framesCount += 1
    if (framesCount % 3 === 0)
      runTasks()

    startFrame()
  })
}

// 从新绘制
function redraw() {
  ctx.value.clearRect(0, 0, rect.width, rect.height)
  init()
}

onMounted(() => {
  init()
})
</script>

<template>
  <div h-full w-full flex flex-col items-center justify-center>
    <button btn @click="redraw">
      重新绘制
    </button>
    <canvas ref="el" border :width="rect.width" :height="rect.height" />
  </div>
</template>

<style>

</style>

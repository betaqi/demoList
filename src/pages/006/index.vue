<script setup>
import * as $ from 'three'
import { onMounted } from 'vue'

const scene = new $.Scene()
const renderer = new $.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器的大小
const camera = new $.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
) // 设置摄像机的参数

camera.position.z = 3 // 设置摄像机的位置

const geometry = new $.BoxGeometry(1, 1, 1) // 创建一个立方体
const material = new $.MeshBasicMaterial({ color: 0x00FF00 }) // 创建一个材质
const cube = new $.Mesh(geometry, material) // 创建一个网格
scene.add(cube) // 将网格添加到场景中

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}
animate()

onMounted(() => {
  document.querySelector('#canvas').appendChild(renderer.domElement)
})
</script>

<template>
  <div id="canvas" />
</template>

<style scoped></style>

<script setup>
import * as THREE from 'three'
import { onMounted } from 'vue'

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const camera = new THREE.PerspectiveCamera(
  25,
  window.innerWidth / window.innerHeight,
  1,
  500,
)
camera.position.set(0, 0, 100)
camera.lookAt(0, 0, 0)

const material = new THREE.LineBasicMaterial({ color: 0x00F0FF })
const points = []
points.push(new THREE.Vector3(-10, 0, 0))
points.push(new THREE.Vector3(0, 10, 0))
points.push(new THREE.Vector3(10, 0, 0))

const geometry = new THREE.BufferGeometry().setFromPoints(points)
const line = new THREE.Line(geometry, material)
scene.add(line)
renderer.render(scene, camera)

onMounted(() => {
  document.querySelector('#canvas').appendChild(renderer.domElement)
})
</script>

<template>
  <div id="canvas" />
</template>

<style scoped></style>

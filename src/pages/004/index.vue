<script setup>
import { computed, onMounted } from 'vue'

const orderCol = ref(10)
const orderRow = ref(10)

const orderTbale = computed(() => Array.from({ length: orderRow.value }, (v, i) => {
  return Array.from({ length: orderCol.value }, (v, j) => {
    return orderCol.value * i + j + 1
  })
}),
)

function onInput() {
  // orderCol.value 且只能输入数字 在 1-10 之间
  orderCol.value = orderCol.value.replace(/\D/g, '')
}

const vortexRow = $ref(10)
const vortexCol = $ref(8)

const vortexTbale = computed(() => {
  const table = Array.from({ length: vortexRow }, (v, i) => {
    return Array.from({ length: vortexCol }, (v, j) => {
      return ''
    })
  })
  let rowIndex = 0
  let colIndex = 0
  let count = 1
  let direction = 'right'
  while (count <= vortexRow * vortexCol) {
    table[rowIndex][colIndex] = count
    count++
    switch (direction) {
      case 'right':
        if (colIndex + 1 < vortexCol && !table[rowIndex][colIndex + 1]) {
          colIndex++
        }
        else {
          rowIndex++
          direction = 'down'
        }
        break
      case 'down':
        if (rowIndex + 1 < vortexRow && !table[rowIndex + 1][colIndex]) {
          rowIndex++
        }
        else {
          colIndex--
          direction = 'left'
        }
        break
      case 'left':
        if (colIndex - 1 >= 0 && !table[rowIndex][colIndex - 1]) {
          colIndex--
        }
        else {
          rowIndex--
          direction = 'up'
        }
        break
      case 'up':
        if (rowIndex - 1 >= 0 && !table[rowIndex - 1][colIndex]) {
          rowIndex--
        }
        else {
          colIndex++
          direction = 'right'
        }
        break
    }
  }
  return table
})
</script>

<template>
  <div h-full w-full flex flex-col justify-center gap4>
    <div flex flex-col items-center justify-center>
      <h1>顺序二维数组</h1>
      <div flex gap4>
        <div>row:<input v-model="orderRow" w20 type="text" placeholder="期待行数" p1 pl2 @input="onInput"></div>
        <div>col:<input v-model="orderCol" w20 type="text" placeholder="期待列数" p1 pl2 @input="onInput"></div>
      </div>
      <table maxh-100 max-w100 overflow-auto>
        <tr v-for="(row, index) in orderTbale" :key="index">
          <td v-for="(item, index) in row" :key="index" he15 w15>
            {{ item }}
          </td>
        </tr>
      </table>
    </div>
    <div flex flex-col items-center justify-center>
      <span>漩涡二维数组</span>
      <div flex gap4>
        <div>row:<input v-model="vortexRow" w20 type="text" placeholder="期待行数" p1 pl2 @input="onInput"></div>
        <div>col:<input v-model="vortexCol" w20 type="text" placeholder="期待列数" p1 pl2 @input="onInput"></div>
      </div>
      <table>
        <tr v-for="(row, index) in vortexTbale" :key="index">
          <td v-for="(item, index) in row" :key="index" he15 w15>
            {{ item }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style></style>

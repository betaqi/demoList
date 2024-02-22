export const info = [
  {
    name: '正方体',
  },
  {
    name: 'tree生长',
  },
  {
    name: 'edit canvas',
  },
  {
    name: '漩涡二维数组',
  },
  {
    name: 'webpack动画',
  },
  {
    name: 'three.js起步',
  },
  {
    name: 'three line',
  },
  {
    name: 'vueUSe hook',
  },
]

export const works = info.map((info, idx) => {
  return {
    ...info,
    no: `${idx + 1}`.padStart(3, '0'),
  }
})

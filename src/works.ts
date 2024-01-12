export const info = [
  {
    name: '正方体',
  },
  {
    name: 'tree生长',
  },
  {
    name: 'canvas draw',
  },
]

export const works = info.map((info, idx) => {
  return {
    ...info,
    no: `${idx + 1}`.padStart(3, '0'),
  }
})

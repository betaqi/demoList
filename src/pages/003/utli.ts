import type { Point } from './type'

export class Rectangle {
  startPoint: Point
  endPoint: Point
  fillColor: string
  ctx: CanvasRenderingContext2D
  constructor(statrPoint, fillColor, ctx) {
    this.startPoint = statrPoint
    this.endPoint = statrPoint
    this.fillColor = fillColor
    this.ctx = ctx
  }

  get minX() {
    return Math.min(this.startPoint.x, this.endPoint.x)
  }

  get minY() {
    return Math.min(this.startPoint.y, this.endPoint.y)
  }

  get maxX() {
    return Math.max(this.startPoint.x, this.endPoint.x)
  }

  get maxY() {
    return Math.max(this.startPoint.y, this.endPoint.y)
  }

  draw() {
    this.ctx.beginPath()

    this.ctx.lineTo(this.maxX, this.minY) // |
    this.ctx.lineTo(this.maxX, this.maxY) //
    this.ctx.lineTo(this.minX, this.maxY)
    this.ctx.lineTo(this.minX, this.minY)

    this.ctx.fillStyle = this.fillColor
    this.ctx.fill()
  }
}

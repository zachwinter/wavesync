import Visualizer from './visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { getRandomElement } from '@/util/array'
import { sin } from '@/util/canvas'

export default class Example extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 20 })
    this.theme = ['#18FF2A', '#7718FF', '#06C5FE', '#FF4242', '#18FF2A']
  }

  hooks () {
    this.sync.on('bar', i => {
      this.lastColor = this.nextColor || getRandomElement(this.theme)
      this.nextColor = getRandomElement(this.theme.filter(c => c !== this.nextColor))
    })
  }

  paint ({ ctx, height, width, now }) {
    const volume = this.sync.volume
    const beat = this.sync.getInterval('beat')
    const bar = this.sync.getInterval('bar')
    const lineBeat = interpolateBasis([2, 300, 2])(beat.progress)
    const sizeBeat = interpolateBasis([0, 150, 0])(beat.progress)
    ctx.fillStyle = 'rgba(0, 0, 0, .1)'
    ctx.fillRect(0, 0, width, height)
    ctx.lineWidth = lineBeat
    ctx.strokeStyle = interpolateRgb(this.lastColor, this.nextColor)(bar.progress)
    sin(ctx, now/50, height/2, volume*50, 100)
    ctx.stroke()
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.beginPath()
    ctx.arc(width * 0.5, height/2, (volume * height/5) + sizeBeat, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fill()
  }
}
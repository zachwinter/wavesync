import Visualizer from './visualizer'

export default class Template extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 50 })
  }

  hooks () {
    this.sync.on('tatum', tatum => {

    })

    this.sync.on('segment', segment => {

    })

    this.sync.on('beat', beat => {

    })

    this.sync.on('bar', bar => {

    })

    this.sync.on('section', section => {

    })
  }

  paint ({ ctx, height, width, now }) {
    const volume = this.sync.volume
    const beat = this.sync.getInterval('beat')
  }
}
/**
 * @class Sketch - a simple 2d <canvas> animation interface. 
 */
export default class Sketch {
  constructor ({
    main = null,
    container = document.body,
    hidpi = true
  } = {}) {
    this.container = container
    this.hidpi = hidpi
    this.active = false
    this.queue = []
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.container.appendChild(this.canvas)
    this.setSize()

    window.addEventListener('resize', () => {
      this.setSize()
    })

    if (main !== null) {
      this.add('main', main)
    }
  }

  setSize () {
    const dpi = this.hidpi ? window.devicePixelRatio : 1
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas.width = this.width * dpi
    this.canvas.height = this.height * dpi
    this.canvas.style.transformOrigin = 'top left'
    this.canvas.style.transform = `scale(${1/dpi})`
    this.ctx.scale(dpi, dpi) 
  }
  
  /**
   * @method add – Add an item to the animation queue.
   * 
   * NOTE: If duration is specified, the item will remove itself from the queue upon completion.
   * 
   * @param {string} name 
   * @param {function} method 
   * @param {number} duration 
   */
  add (name, method, duration = null) {
    this.queue.push({
      name,
      method,
      duration,
      start: window.performance.now()
    })
  }

  /**
   * @method remove - Remove an item from the animation queue by name.
   * @param {string} name 
   */
  remove (name) {
    this.queue = this.queue.filter(item => item.name !== name)
  }

  /**
   * @method start - Begin animation loop.
   */
  start () {
    if (this.active === true) return
    this.active = true
    requestAnimationFrame(this.loop.bind(this))
  }

  /**
   * @method stop - Stop animation loop.
   */
  stop () {
    if (this.active === false) return
    this.active = false
    cancelAnimationFrame(this.loop.bind(this))
  }

  /**
   * @method paint - Paint a single item in the animation queue.
   * @param {DOMHighResTimeStamp} now  
   * @param {object} - Item in the animation queue. 
   */
  paint (now, { name, start, duration, method }) {
    const elapsed = now - start
    const progress = typeof duration === 'number'
      ? Math.min(elapsed / duration, 1)
      : null
    const state = {
      ctx: this.ctx,
      width: this.width,
      height: this.height,
      now,
      progress,
      duration,
      elapsed,
      start
    }

    method(state)

    if (progress === 1) {
      this.remove(name)
    }
  }

  loop (now) { 
    if (this.active === true) {
      requestAnimationFrame(this.loop.bind(this))
    }

    this.queue.forEach(item => this.paint(now, item))
  }
}
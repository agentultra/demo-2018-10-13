const canvas = document.getElementById("stage")
, stage = canvas.getContext('2d')
, stageW = 800
, stageH = 420
, spriteSheet = new Image()

let currentTime = 0
, lastTime = (new Date()).getTime()
, dt = 0
, fps = 60
, interval = fps / 1000
, state = {}

canvas.width = stageW
canvas.height = stageH
spriteSheet.src = 'assets/M_06.png'

// Utilities

const range = (min, max) => {
    const mn = Math.floor(min)
    , mx = Math.ceil(max)
    return Math.floor(Math.random() * (mx - mn)) + mn
}

// Components

const ImageComponent = (img, sx, sy, sw, sh) => ({img, sx, sy, sw, sh})
const PositionComponent = (x, y) => ({x, y})
const VelocityComponent = (dx, dy) => ({dx, dy})

// Systems

const renderImageSystem = (imgComponent, posComponent) => {
    const {img, sx, sy, sw, sh} = imgComponent
    const {x: dx, y: dy} = posComponent
    stage.drawImage(img, sx, sy, sw, sh, dx, dy, sw, sh)
}

const velocitySystem = (posComponent, velocityComponent) => {
    const {x, y} = posComponent
    , {dx, dy} = velocityComponent

    posComponent.x += dx
    posComponent.y += dy
}

const toroidSpaceSystem = posComponent => {
    const {x, y} = posComponent

    // cheating here, 20 is the width of the image I'm drawing
    if (x > stageW) {
        posComponent.x = -20
    }
    if (x <= -20) {
        posComponent.x = stageW
    }
    if (y > stageH) {
        posComponent.y = -20
    }
    if (y <= -20) {
        posComponent.y = stageH
    }
}

const clr = () => {
    stage.fillStyle = 'black'
    stage.fillRect(0, 0, stageW, stageH)
}

const init = () => Object.assign(state, {
    imageComponents: Array.from({length: 200},
                                () => ImageComponent(
                                    spriteSheet, 0, 0, 20, 20
                                )),
    positionComponents: Array.from({length: 200},
                                   () => PositionComponent(range(10, 790),
                                                           range(10, 790))),
    velocityComponents: Array.from({length: 200},
                                   () => VelocityComponent(range(2, 5),
                                                           range(2, 5)))
})

const update = dt => {
    const {positionComponents, velocityComponents} = state
    for (let i = 0; i < 200; i++) {
        velocitySystem(positionComponents[i], velocityComponents[i])
        toroidSpaceSystem(positionComponents[i])
    }
}

const render = () => {
    const {imageComponents, positionComponents} = state
    for (let i = 0; i < 200; i++) {
        renderImageSystem(imageComponents[i], positionComponents[i])
    }
}

const loop = dt => {
    window.requestAnimationFrame(loop)
    currentTime = (new Date()).getTime()
    dt = currentTime - lastTime
    update(dt)

    if (dt > interval) {
        clr()
        render()
        lastTime = currentTime - (dt % interval)
    }
}

init()
window.requestAnimationFrame(loop)

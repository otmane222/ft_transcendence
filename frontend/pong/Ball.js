


export default class Ball {
    constructor(ballElm) {
        this.ballElm = ballElm;
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElm).getPropertyValue('--x'))
    }

    set x(value) {
        this.ballElm.style.setProprety('--x', value)
    }

    update(delta) {
        this.x = 10;
    }
}
class Card extends lng.Component {
    static _template() {
        return {
            w: 400, h: 200,
            rect: true,
            color: 0xFF1C27bC
        }
    }
}

export default class MyApp extends lng.Application {
    static _template() {
        return {
            Card1: {
                type: Card,
                x: 100, y: 100,
            },
            Card2: {
                type: Card,
                x: 520, y: 100,
            },
            Card3: {
                type: Card,
                x: 100, y: 320,
            },
            Card4: {
                type: Card,
                x: 520, y: 320,
            }
        }
    }

    _init() {
        this.activeItems = [];
    }

    _handleClick(target) {
        if (this.activeItems.includes(target.ref)) {
            target.setSmooth("color", 0xFF1C27bC);
            this.activeItems = this.activeItems.filter(i => i !== target.ref); 
        } else {
            target.setSmooth("color", 0xFFFF5050);
            this.activeItems.push(target.ref);
        }
    }
}

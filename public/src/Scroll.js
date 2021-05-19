class Card extends lng.Component {
    static _template() {
        return {
            w: 400, h: 200,
            rect: true,
        }
    }
}

class Cards extends lng.Component {
    static _template() {
        return {
            Card1: {
                type: Card,
                x: 50, y: 40,
                color: 0xFF1C27bC
            },
            Card2: {
                type: Card,
                x: 50, y: 280,
                color: 0xFFFFCC66
            },
            Card3: {
                type: Card,
                x: 50, y: 520,
                color: 0xFFFC57bC
            },
            Card4: {
                type: Card,
                x: 50, y: 760,
                color: 0xFF00CC00
            }
        }
    }
}

class CardsContainer extends lng.Component {
    static _template() {
        return {
            x: 50, y: 50,
            h: 600, w: 500,
            rect: true,
            color: 0xFFFFFFFF,
            clipping: true,

            Cards: {
                type: Cards,
            }
        }
    }

    _handleScrollUp() {
        this.scroll(true);
    }

    _handleScrollDown() {
        this.scroll(false);
    }

    scroll(isScrollUp) {
        var newY;

        if (isScrollUp) {
            newY = this.tag("Cards").y + 80;
        } else {
            newY = this.tag("Cards").y - 80;
        }

        this.tag("Cards").patch({smooth: {y: [newY, {duration: 0.1}]}});
    }
}


export default class MyApp extends lng.Application {
    static _template() {
        return {
            Container: {
                type: CardsContainer
            }
        }
    }
}

class Card extends lng.Component {
    static _template() {
        return {
            w: 600, h: 300,
            rect: true,
            alpha: 0.9,

            Label: {
                mount: 0.5,
                x: 300, y: 150,
                text: {
                    fontSize: 30,
                    textAlign: 'center',
                    textColor: 0xFFFFFFFF,
                }
            }
        }
    }

    _firstEnable() {
        this.tag("Label").patch({text: this.data});
    }

    _focus() {
        this.patch({smooth: {scale: 1.1}});
    }

    _unfocus() {
        this.patch({smooth: {scale: 1}});
    }
}

export default class MyApp extends lng.Application {
    static _template() {
        return {
            Card1: {
                type: Card,
                x: 340, y: 340,
                zIndex: 4,
                color: 0xFF1FF7bC,
            },
            Card2: {
                type: Card,
                x: 180, y: 180,
                zIndex: 2,
                color: 0xFF1007bC,
            },
            Card3: {
                type: Card,
                x: 260, y: 260,
                zIndex: 3,
                color: 0xFF8807bC,
            },
            Card4: {
                type: Card,
                zIndex: 1,
                x: 100, y: 100,
                color: 0xFFCC0033,
            }
        }
    }

    _init() {
        this.patch({Card1: {data: "D"},
                    Card2: {data: "B"},
                    Card3: {data: "C"},
                    Card4: {data: "A"}})
    }

    _handleClick(target) {
        for (const child of this.children) {
            if ((child.ref !== target.ref) && (child.zIndex > target.zIndex)) {
                this.tag(child.ref).patch({zIndex: child.zIndex - 1,
                                           CancelBtn: {zIndex: child.zIndex - 1},
                                           OkayBtn: {zIndex: child.zIndex - 1}});
            }
        }

        target.patch({zIndex: 4,
                      CancelBtn: {zIndex: 4},
                      OkayBtn: {zIndex: 4}});
    }

    _getFocused() {
        if (this.activeItem) {
            return this.tag(this.activeItem);
        }
    }

    _handleHover(target) {
        this.activeItem = target.ref;
        this._refocus();
    }
}

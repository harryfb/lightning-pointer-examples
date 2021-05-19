var state = {activeShelf: null,
             activeShelfItem: null,
             scrollPosition: 0,
             menu: {active: false, item: null},
             modal: {active: false, src: null}};


class Card extends lng.Component {
    static _template() {
        return {
            w: 300, h: 400,
            rect: true,
            color: 0xFFFFFFFF,

            Title: {
                x: 15, y: 10,

                text: {
                    text: "",
                    fontSize: 26,
                    textAlign: 'center',
                    textColor: 0xFF000000,
                }
            },

            Body: {
                x: 15, y: 60,
                text: {
                    fontSize: 20,
                    textAlign: 'center',
                    textColor: 0xFF000000,
                }
            },

            Image: {
                x: 0, y: 100,
                h: 300, w: 300,
                src: ""
            }
        }
    }

    _firstEnable() {
            this.tag("Title").patch({index: this.index,
                                     text: {text: this.title}});
            this.tag("Body").patch({index: this.index,
                                    text: {text: this.body}});
            this.tag("Image").patch({index: this.index,
                                     src: this.imgSrc});

    }

    _handleClick(target) {
        if (target.ref === "Image") {
            state.modal.active = true;
            state.modal.src = this.imgSrc;
            this._refocus();
        }
    }

    _focus() {
        this.patch({smooth: {scale: 1.1}});
    }

    _unfocus() {
        this.patch({smooth: {scale: 1}});
    }
}


class Shelf extends lng.Component {
    static _template() {
        return {
            ShelfHeader: {
                text: {
                    text: "",
                    fontSize: 26,
                    textAlign: 'center',
                    textColor: 0xFF808080,
                }     
            },

            Items: {
                y: 60,

                Card1: {
                    type: Card,
                    x: 0,
                    index: 0,
                    title: "Card 1",
                    body: "Description of card 1",
                    imgSrc: "https://picsum.photos/id/100/600"
                },

                Card2: {
                    type: Card,
                    x: 350,
                    index: 1,
                    title: "Card 2",
                    body: "Description of card 2",
                    imgSrc: "https://picsum.photos/id/101/600"
                },

                Card3: {
                    type: Card,
                    x: 700,
                    index: 2,
                    title: "Card 3",
                    body: "Description of card 3",
                    imgSrc: "https://picsum.photos/id/1015/600"
                },

                Card4: {
                    type: Card,
                    x: 1050,
                    index: 3,
                    title: "Card 4",
                    body: "Description of card 4",
                    imgSrc: "https://picsum.photos/id/1023/600"
                }
            }
        }
    }

    _firstEnable() {
        if (this.title) {
            this.tag("ShelfHeader").patch({text: {text: this.title}});
        }
    }

    _handleHover(target) {
        if (target.ref !== "ShelfHeader") {
            state.activeShelf = this.shelfIndex;
            state.activeShelfItem = target.index;
            state.menu.active = false;

            this._refocus();
        }
    }

    _getFocused() {
        if (state.activeShelfItem !== null) {
            return this.tag("Items").children[state.activeShelfItem];
        }
    }
}


class Shelves extends lng.Component {
    static _template() {
        return {
            w: 1350, h: 1400,
            Items: {
            w: 1350, h: 1400,

                Shelf1: {
                    type: Shelf,
                    y: 0,
                    shelfIndex: 0,
                    title: "Shelf 1"
                },

                Shelf2: {
                    type: Shelf,
                    y: 500,
                    shelfIndex: 1,
                    title: "Shelf 2"
                },

                Shelf3: {
                    type: Shelf,
                    y: 1000,
                    shelfIndex: 2,
                    title: "Shelf 3"
                }
            }
        }
    }

    _getFocused() {
        return this.tag("Items").children[state.activeShelf];
    }

    _handleScrollUp() {
        this.scroll(true);
    }

    _handleScrollDown() {
        this.scroll(false);
    }

    scroll(isScrollUp) {
        var offsetY = isScrollUp ? 500 : -500;
        var currentY = state.scrollPosition;

        if (((offsetY < 0) && (currentY > -1000)) || ((offsetY > 0) && (currentY < 0))) {
            this.tag("Items").patch({smooth: {y: [currentY + offsetY, {duration: 0.3}]}});
            state.scrollPosition = currentY + offsetY;
        }
    }
}


class Modal extends lng.Component {
    static _template() {
        return {
            mount: 0.5,
            alpha: 0,

            Image: {
                mount: 0.5,
                h: 800, w: 800,
                src: ""
            }
        }
    }

    _focus() {
        this.tag("Image").patch({src: state.modal.src});
        this.patch({smooth: {alpha: 1}});
    }

    _unfocus() {
        this.patch({smooth: {alpha: 0}});
    }

    _handleClick(_) {
        state.modal.active = false;
        this._refocus();
    }
}


class Menu extends lng.Component {
    static _template() {
        return {
            h: 50, w: 200,
            rect: true,
            color: 0xFFFFFFFF,
            zIndex: 9,
            alpha: 0.8,
            clipping: true,
        
            Label: {
                x: 120, y: 10,

                text: {
                    text: "Menu",
                    fontSize: 24,
                    textAlign: 'center',
                    textColor: 0xFF000000,
                }
            },

            Items: {
                Item1: {type: MenuItem,
                    y: 80,
                    index: 0,
                    label: "Item 1"},

                Item2: {type: MenuItem,
                    y: 130,
                    index: 1,
                    label: "Item 2"},

                Item3: {type: MenuItem,
                    y: 180,
                    index: 2,
                    label: "Item 3"}
            }
        }
    }

    _handleHover(_) {
        state.menu.active = true;
        state.menu.item = null;
        this._refocus();
    }

    _handleScrollUp() {
        this.scroll(true);
    }

    _handleScrollDown() {
        this.scroll(false);
    }

    scroll(isScrollUp) {
        if (isScrollUp && (state.menu.item > 0)) {
            state.menu.item--;
        } else if (!isScrollUp && (state.menu.item < 2)) {
            state.menu.item++;
        }
        this._refocus();
    }

    _focus() {
        this.tag("Label").patch({smooth: {x: 20}});
        this.patch({smooth: {h: 880, w: 320}});
    }

    _unfocus() {
        this.tag("Label").patch({smooth: {x: 120}});
        this.patch({smooth: {h: 50, w: 200}});
    }

    _getFocused() {
        if (state.menu.item !== null) {
            return this.tag("Items").children[state.menu.item];
        }
    }
}


class MenuItem extends lng.Component {
    static _template() {
        return {

            Background: {
                w: 320, h: 50,
                rect: true,
                zIndex: 10,
                color: 0x00000000
            },

            Label: {
                x: 25,
                zIndex: 10,
            
                text: {
                    fontSize: 20,
                    textAlign: 'center',
                    textColor: 0xFF000000,
                }
            }
        }
    }

    _init() {
        this.tag("Background").patch({index: this.index});
        this.tag("Label").patch({index: this.index,
                                 text: {text: this.label}});
    }

    _focus() {
        this.tag("Label").patch({smooth: {x: 35}});
    }

    _unfocus() {
        this.tag("Label").patch({smooth: {x: 25}});
    }

    _handleHover(target) {
        state.menu.item = target.index;
        this._refocus();
    }
}


export default class MyApp extends lng.Application {
    static _template() {
        return {
            Menu: {type: Menu,
                   x: 0, y: 100},

            Grid: {type: Shelves,
                   x: 250, y: 40},

            Modal: {type: Modal,
                    zIndex: 10,
                    mount: 0.5,
                    x: 960, y: 540}
        }
    }

    _getFocused() {
        if (state.modal.active) {
            return this.tag("Modal");
        } else if (state.menu.active) {
            return this.tag("Menu");
        } else {
            return this.tag("Grid");
        }
    }
}

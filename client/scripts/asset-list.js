import { Fzf } from '../../node_modules/fzf/dist/fzf.es'

import CustomElement from './custom-element'

export default class AssetList extends CustomElement(HTMLOListElement) {
    static tagName = 'asset-list'
    static tagType = 'ol'

    index = 0
    highlightedItems = []
    highlightedGraphemes = ''
    keystroke = this.keystroke.bind(this)

    constructor() {
        super()
        this.highlight('')
    }

    highlight(key) {
        if (key === '') {
            this.highlightedGraphemes = ''
        } else {
            this.highlightedGraphemes += key.toLocaleLowerCase()
        }

        const fzf = new Fzf(Array.from(this.children), { selector: (item) => item.link.name, sort: false })
        this.highlightedItems = fzf.find(this.highlightedGraphemes)

        for (const item of this.children) {
            item.clearHighlight()
        }
        for (const item of this.highlightedItems) {
            item.item.highlight(item.positions)
        }

        this.focusItem(0)
    }

    focusItem(index) {
        this.index = index
        try {
            const highlightedAssetItem = this.children[this.highlightedItems[index].item.name]

            highlightedAssetItem.focus()
            highlightedAssetItem.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }
        catch {
            if (this.highlightedGraphemes !== '') {
                this.highlight('')
            }
        }
    }

    mount() {
        document.body.addEventListener('keydown', this.keystroke)
    }

    keystroke(ev) {
        let key = ev.key

        if (key === 'Escape') {
            this.highlight('')

            return
        }

        if (key === 'ArrowDown') {
            ev.preventDefault()
            this.focusItem((this.index + 1) % this.highlightedItems.length)

            return
        }

        if (key === 'ArrowUp') {
            ev.preventDefault()
            this.focusItem((this.index - 1 + this.highlightedItems.length) % this.highlightedItems.length)

            return
        }

        if (key === 'Backspace') {
            let s = this.highlightedGraphemes.slice(0, -1)
            this.highlightedGraphemes = ''
            this.highlight(s)

            return
        }

        const notGrapheme = key.length !== 1;

        if (notGrapheme) {
            return
        }

        this.highlight(key)
    }
}

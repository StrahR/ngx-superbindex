import AssetLink from './asset-link'
import CustomElement from './custom-element'

export default class AssetItem extends CustomElement(HTMLLIElement) {
    static tagName = 'asset-item'
    static tagType = 'li'

    link = this.getCustomElement(AssetLink)

    constructor() {
        super()
        this.setAttribute("name", this.name)
    }

    highlight(pos) {
        this.link.highlight(pos)
        this.classList.toggle('asset-item--filtered', false)
    }

    clearHighlight() {
        this.link.clearHighlight()
        this.classList.toggle('asset-item--filtered', true)
    }

    get highlighted() {
        return this.link.highlighted
    }

    get name() {
        return this.link.name
    }

    focus() {
        this.link.focus()
    }
}

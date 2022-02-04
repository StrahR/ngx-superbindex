import CustomElement from './custom-element'

export default class AssetLink extends CustomElement(HTMLAnchorElement) {
    static tagName = 'asset-link'
    static tagType = 'a'

    highlighted = false

    highlight(pos) {
        this.highlighted = true

        this.innerHTML = ''
        for (let i = 0; i < this.name.length; i += 1) {
            if (pos.has(i)) {
                this.innerHTML += '<mark class="asset-mark">' + (this.name[i] === ' ' ? '&ensp;' : this.name[i]) + '</mark>'
            } else {
                this.innerHTML += this.name[i]
            }
        }

        this.classList.toggle('asset-link--highlighted', true)
    }

    clearHighlight() {
        this.highlighted = false
        this.textContent = this.name
        this.classList.toggle('asset-link--highlighted', false)
    }

    get name() {
        return this.dataset.name
    }

    get type() {
        if (this.classList.contains('asset-link--directory')) {
            return 'directory'
        }

        if (this.classList.contains('asset-link--file')) {
            return 'file'
        }

        return ''
    }
}

class TextArea {
    template(params) {
        return `
            <textarea placeholder="${params.placeholder}" class="recommends" name="${params.header}"></textarea>
        `
    }
}

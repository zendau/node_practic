function render_page(content = []) {
    return `
        <h1 class="main-section__title">Shop page</h1>
        <ul>
            ${render_list(content)}
        </ul>
    `
}

function render_list(content) {
    
    const html = []
    content.forEach(item => {
        html.push(`
        <li>
            <h2>${item['title']}</h2>
            <h2>${item['img']}</h2>
            <p>${item['price']}</p>
        </li>
        `)
    })
    return html
}

module.exports = {
    render_page
}
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
        html.push(/*html*/`
        <div class="card" style="width: 18rem;">
            <img src="${item['img']}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${item['title']}</h5>
                <p class="card-text">
                    ${new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(item['price'])}
                </p>
                <a href="/item/${item['_id']}" class="btn btn-primary">Read</a>
            </div>
        </div>
        `)
    })
    return html.join("")
}

module.exports = {
    render_page
}
function render_page(content = []) {
    const data = render_list(content)
    return /*html*/ `
        <div class="container">
            <div class="card">
                <ul class="list-group">
                    ${data[1]}
                </ul>
            </div>
        </div>
        <h2>Price: ${new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(data[0])}</h2>
    `
}

function render_list(data) {
    let price = 0
    const list = []

    if (data.length !== 0) {

        data.forEach(item => {
            list.push(`<li class="list-group-item">${item['title']}</li>`)
            price += item['price']
        })

        return [price, list.join("")]

    } else {
        return [price, `<li class="list-group-item">empty</li>`]
    }
}

module.exports = {
    render_page
}
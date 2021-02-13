function render_page(content = []) {
    console.log(content)
    return /*html*/ `
        <div class="container">
        <div class="card">
            <img src="${content['img']}" class="img-fluid" alt="${content['title']}">
            <div class="card-body">
                <h5 class="card-title">${content['title']}</h5>
                <p class="card-text">${content['desk']}</p>
                <a href="/card/${content['_id']}" class="btn btn-primary">Buy</a>
            </div>
            </div>
        </div>
    `
}

module.exports = {
    render_page
}
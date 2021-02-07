function render_page(content = []) {
    return `
        <h1 class="main-section__title">User page</h1>
        <form class="user__form" action="/user" method="post">
            <input type="text" name="title" required placeholder="title">
            <input type="text" name="img" required placeholder="img">
            <input type="number" min="10" max="100" value="10" name="price" required placeholder="price">
            <button type="submit">Send</button>
        </form>
    `
}

module.exports = {
    render_page
}
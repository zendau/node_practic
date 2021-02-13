function render_page(content = []) {
    return /*html*/ `
        <form action="/user" method="post" class="user__form">
            <div class="mb-3">
                <label for="f_title" class="form-label">Title</label>
                <input type="text" name="title"  class="form-control" id="f_title" required>
            </div>
            <div class="mb-3">
                <label for="f_img" class="form-label">Img URL</label>
                <input type="text" name="img" class="form-control" id="f_img" required>
            </div>
            <div class="mb-3">
                <label for="f_price" class="form-label">Price</label>
                <input type="number" name="price" min="100" max="20000" value="10000" class="form-control" id="f_price" required>
            </div>
            <div class="mb-3">
                <div class="form-floating">
                    <textarea name="desk" class="form-control" placeholder="Leave a comment here" id="f_desk"></textarea>
                    <label for="f_desk">Deskription</label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `
}

module.exports = {
    render_page
}
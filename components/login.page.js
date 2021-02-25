function render_page(content = []) {
    return /*html*/ `
        <h1>Login page</h1>
        <form class="user__form" method="post" action="/login">
            <div class="mb-3">
                <label for="f_login" class="form-label">Login</label>
                <input type="text" name="login" class="form-control" id="f_login">
            </div>
            <div class="mb-3">
                <label for="f_pass" class="form-label">Password</label>
                <input type="password" name="pass" class="form-control" id="f_pass">
            </div>
            <input type="hidden" name="_csrf" value=${content}>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    `
}

module.exports = {
    render_page
}
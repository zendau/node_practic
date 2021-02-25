function render_page(content = []) {
    return /*html*/ `
        <h1>Register page</h1>
        <form class="user__form" method="post" action="/register">
            <div class="mb-3">
                <label for="f_email" class="form-label">Email address</label>
                <input type="email" name="email" class="form-control" id="f_email">
            </div>
            <div class="mb-3">
                <label for="f_login" class="form-label">Login</label>
                <input type="text" name="login" class="form-control" id="f_login">
            </div>
            <div class="mb-3">
                <label for="f_pass" class="form-label">Password</label>
                <input type="password" name="pass" class="form-control" id="f_pass">
            </div>
            <input type="hidden" name="_csrf" value=${content}>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    `
}

module.exports = {
    render_page
}
const main_page = require("./main.page")
const shop_page = require("./shop.page")
const about_page = require("./about.page")
const user_page = require("./user.page")

function main_body(args) {
    let body = ""
    switch (args['template']) {
        case "main":
            body = main_page.render_page()
            break

        case "about":
            body = about_page.render_page()
            break

        case "user":
            body = user_page.render_page()
            break

        case "shop":
            body = shop_page.render_page()
            break
                
    }

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${args['title']}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>
        <header>
            <nav class="nav">
                <ul class="nav__menu">
                    <li class="nav__item"><a href="/" class="nav__link">Main</a></li>
                    <li class="nav__item"><a href="/about" class="nav__link">About</a></li>
                    <li class="nav__item"><a href="/shop" class="nav__link">Shop</a></li>
                    <li class="nav__item"><a href="/user" class="nav__link">User</a></li>
                </ul>
            </nav>
        </header>
        <section class="main-section" id="#app">
            ${body}
        </section>
    </body>
    </html>
    `
}


module.exports = {
    main_body
}
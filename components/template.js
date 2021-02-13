const main_page = require("./main.page")
const shop_page = require("./shop.page")
const card_page = require("./card.page")
const user_page = require("./user.page")
const item_page = require("./item.page")
const reg_page = require("./register.page")
const login_page = require("./login.page")

function main_body(args) {
    let body = ""
    switch (args['template']) {
        case "main":
            body = main_page.render_page(args['content'])
            break

        case "card":
            body = card_page.render_page(args['content'])
            break

        case "user":
            body = user_page.render_page(args['content'])
            break

        case "shop":
            body = shop_page.render_page(args['content'])
            break
        
        case "item":
            body = item_page.render_page(args['content'])
            break
        
        case "login":
            body = login_page.render_page(args['content'])
            break

        case "reg":
            body = reg_page.render_page(args['content'])
            break
                
    }
    
    return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${args['title']}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <link rel="stylesheet" href="/css/main.css">
        </head>
    <body>
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link ${args['template'] === "main" ? "active": ""}" href="/" tabindex="-1" aria-disabled="true">Main</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${args['template'] === "shop" ? "active": ""}" aria-current="page" href="/shop">Shop</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${args['template'] === "card" ? "active": ""}" href="/card">Card</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${args['template'] === "user" ? "active": ""}" href="/user">User</a>
                </li>
                </ul>
            </div>
            </div>
        </nav>
        </header>
        <section class="main-section" id="#app">
            ${body}
        </section>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
    </body>
    </html>
    `
}


module.exports = {
    main_body
}
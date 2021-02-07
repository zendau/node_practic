const express = require('express')
const router = express.Router()

const html = require("../components/template")

const db = require("../libs/mysql")
const database = new db()

router.get("/", (req, res) => {
    res.write(html.main_body({
        title: "Main page",
        template: "main"
    }))
    res.end()
})

router.get("/about", (req, res) => {
    res.write(html.main_body({
        title: "About page",
        template: "about"
    }))
    res.end()
})

router.get("/user", (req, res) => {
    res.write(html.main_body({
        title: "User page",
        template: "user"
    }))
    res.end()
})

router.get("/shop", (req, res) => {

    database.query("SELECT * FROM shop ORDER BY id DESC").then(data => {
        res.write(html.main_body({
            title: "Shop page",
            template: "shop",
            content: data
        }))
    }).catch(err => {
        console.log("err", err)
        res.redirect("/404")
    }).finally(() => res.end())
})

router.post("/user", (req, res) => {
    console.log(req.body)
    
    const req_data = req.body

    database.query(`INSERT INTO shop (title, img, price) VALUES('${req_data.title}', '${req_data.img}', ${req_data.price})`).then(data => {
        console.log("query's data", data)
    }).catch(err => console.err(err))
    res.redirect("/shop")
})

module.exports = router
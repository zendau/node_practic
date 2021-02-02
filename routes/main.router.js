const express = require('express')
const router = express.Router()

const html = require("../components/template")

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
    res.write(html.main_body({
        title: "Shop page",
        template: "shop"
    }))
    res.end()
})

module.exports = router
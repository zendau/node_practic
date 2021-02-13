const express = require('express')
const router = express.Router()

const html = require("../components/template")

const db = require("../libs/mysql")
const database = new db()

const Shop = require("../models/shop")
const Users = require("../models/users")

router.get("/", (req, res) => {
    res.write(html.main_body({
        title: "Main page",
        template: "main"
    }))
    res.end()
})

router.get("/card", (req, res) => {
    res.write(html.main_body({
        title: "Card page",
        template: "card"
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
    // Users.findOne().populate("basket").exec().then(data => {})
    
    const data = new Promise((res, rej) => {
        try {
            res(Shop.find())
            
        } catch (e) {
            rej(e)
        }
    })

    data.then(data => {
        res.write(html.main_body({
            title: "Shop page",
            template: "shop",
            content: data.reverse()
        }))
    }).catch(err => {
        console.log("err", err)
        res.redirect("/404")
    }).finally(() => res.end())

    // database.query("SELECT * FROM shop ORDER BY id DESC").then(data => {
    //     res.write(html.main_body({
    //         title: "Shop page",
    //         template: "shop",
    //         content: data
    //     }))
    // }).catch(err => {
    //     console.log("err", err)
    //     res.redirect("/404")
    // }).finally(() => res.end())
})

router.post("/user", async (req, res) => {
    console.log(req.body)
    
    const req_data = req.body

    // database.query(`INSERT INTO shop (title, img, price) VALUES('${req_data.title}', '${req_data.img}', ${req_data.price})`).then(data => {
    //     console.log("query's data", data)
    // }).catch(err => console.err(err))
    await new Shop({
        title: req_data.title,
        img: req_data.img,
        price: req_data.price,
        desk: req_data.desk
    }).save()
    res.redirect("/shop")
})

router.get("/item/:id", async (req, res) => {
    console.log(req.params.id)
    res.write(html.main_body({
        title: "Item page",
        template: "item",
        content:  await Shop.findById(req.params.id)
    }))
    res.end()
})

module.exports = router
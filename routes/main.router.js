const express = require('express')
const router = express.Router()

const html = require("../components/template")

// const db = require("../libs/mysql")
// const database = new db()

const Shop = require("../models/shop")
const Users = require("../models/users")

const protectRoute = require("../middleware/protectRoute")
const {body} = require('express-validator');

const bcrypt = require('bcryptjs')
const fs = require('fs');

router.get("/", (req, res) => {
    res.write(html.main_body({
        title: "Main page",
        template: "main",
        session: req.session
    }))
    res.end()
})

router.get("/card/", protectRoute, (req, res) => {
    res.write(html.main_body({
        title: "Card page",
        template: "card",
        session: req.session,
        content: req.session.user.basket
    }))
    res.end()
})

router.get("/card/:id", protectRoute, async (req, res) => {
    const res_query = await Users.findById(req.session.user._id)
    res_query.addItem(req.params.id)
    req.session.user = await res_query.populate("basket").execPopulate()
    res.write(html.main_body({
        title: "Card page",
        template: "card",
        session: req.session,
        content: req.session.user.basket
    }))
    res.end()
})

router.get("/user", protectRoute, (req, res) => {

    console.log(req.cookies)
    res.cookie("time", new Date())

    res.write(html.main_body({
        title: "User page",
        template: "user",
        session: req.session,
        content: req.csrfToken()
    }))
    res.end()
})

router.get("/shop", protectRoute, (req, res) => {
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
            content: data.reverse(),
            session: req.session
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

router.post("/user", protectRoute, async (req, res) => {
   
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

router.get("/item/:id", protectRoute, async (req, res) => {
    console.log(req.params.id)
    res.write(html.main_body({
        title: "Item page",
        template: "item",
        content:  await Shop.findById(req.params.id),
        session: req.session
    }))
    res.end()
})

router.get("/login", async (req, res) => {
    res.write(html.main_body({
        title: "Login page",
        template: "login",
        content:  req.csrfToken(),
        session: req.session,
    }))
    res.end()
})

router.get("/register", async (req, res) => {
    res.write(html.main_body({
        title: "Register page",
        template: "reg",
        content:  req.csrfToken(),
        session: req.session
    }))
    res.end()
})


router.post("/register", async (req, res) => {


    const check_login =  await Users.find({login: req.body.login})
    
    if (check_login.length === 0) {
        
        const check_email = await Users.find({email: req.body.email})

        if (check_email.length === 0) {

            await new Users({
                login: req.body.login,
                password: bcrypt.hashSync(req.body.pass, 10),
                email: req.body.email
            }).save()
            res.redirect("/")

        } else {
            res.json("Email is already used")
        }

    } else {
        res.json("Login is already used")
    }

})

router.post("/login", async (req, res) => {


    body("login").isLength({min: 6, max: 30}).withMessage("Wrong length")

    const user_data = await Users.findOne({login: req.body.login}).populate("basket")

    if (user_data !== null && user_data.length !== 0) {
        if (bcrypt.compareSync(req.body.pass, user_data['password'])) {
            req.session.user = user_data
            res.redirect("/")
        } else {
            res.json("Wrong password")
        }
    } else {
        res.json("Wrong login")
    }

})

router.get("/exit", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

router.get("/upload", (req, res) => {
    
    const filesArr = []

    fs.readdirSync("./files").forEach(file => {
        filesArr.push(file)
      })
    res.write(html.main_body({
        title: "Upload file",
        template: "upload",
        session: req.session,
        content:  [req.csrfToken(), filesArr],
    }))
    res.end()
})

router.post("/upload", (req, res) => {
    let filedata = req.file;
 
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен")
})

router.get("*", (req, res) => {
    res.write(html.main_body({
        title: "404 page",
        template: "404"
    }))
    res.end()
})

module.exports = router
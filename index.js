const express = require("express")
const app = express()
const path = require("path")
const rout = require("./routes/main.router")


const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
//app.use(express.json())

app.use(express.static('src'));
app.use(rout)

app.listen(PORT, () => {
    console.log("server is started")
})
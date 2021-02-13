const express = require("express")
const app = express()
const path = require("path")
const consola = require('consola')
const rout = require("./routes/main.router")
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
//app.use(express.json())

app.use(express.static('src'));
app.use(rout);

(new Promise((res, rej) => {
    try {
        mongoose.connect(
            'mongodb://localhost/nodeFirst', 
            {   
                useNewUrlParser: true, 
                useUnifiedTopology: true
            })
        res()
    } catch (e) {
        rej(e)
    }
    
})).then(() => {
    const ifaces = require('os').networkInterfaces();
    const localhost = Object.keys(ifaces).reduce((host,ifname) => {
        let iface = ifaces[ifname].find(iface => !('IPv4' !== iface.family || iface.internal !== false));
        return iface? iface.address : host;
    }, '127.0.0.1');
    app.listen(PORT, () => {
        consola.success(`server is started on ${localhost}:${PORT}`)
    })
}).catch(err => {
    consola.error(err)
})


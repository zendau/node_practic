const express = require("express")
const app = express()
const path = require("path")
const consola = require('consola')
const rout = require("./routes/main.router")
const mongoose = require('mongoose')
const session = require("express-session")

const cookieParser = require('cookie-parser')

const csrf = require('csurf')
const uploadFiles = require("./libs/multer")

// const nodemailer = require("nodemailer")

// let transporter = nodemailer.createTransport({
//     service : 'gmail',
//     auth: {
//         user: 'alex.cowalyow2012@gmail.com', // like : abc@gmail.com
//         pass: '@y5g9CPG'           // like : pass@123
//     }
//     });
    
//     let mailOptions = {
//      from: 'alex.cowalyow2012@gmail.com',
//      to: 'cowalyow2012@gmail.com',
//      subject: 'Check Mail',
//      text: 'Its working node mailer'
//     };
     
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//          return console.log(error.message);
//       }
//     console.log('success');
//     }); 
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
//app.use(express.json())

app.use(express.static('src'))
app.use(express.static('files'))

app.use(uploadFiles())

app.use(cookieParser())
app.use(session({
    secret: 'shop session',
    resave: false,
    saveUninitialized: true
}))

app.use(csrf())

app.use(rout);

(new Promise((res, rej) => {
    try {
        mongoose.connect(
            'mongodb://localhost/nodeFirst', 
            {   
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useFindAndModify: false
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
        consola.success(`server is started on http://${localhost}:${PORT}`)
    })
}).catch(err => {
    consola.error(err)
})


const mysql = require('mysql')

class MySql {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'node_js'
    })
    this.connection.connect()
    
    }

    query(query) {
       return new Promise((resolve, reject) => {
           console.log("query", query)
        this.connection.query(query,(err, rows, fields) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(rows)))
          })
       })
    }

    destroy() {
        this.connection.end()
    }
}

module.exports = MySql
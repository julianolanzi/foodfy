const { Pool } = require("pg")

module.exports = new Pool ({
    user: 'julianolanzi',
    password: "726452",
    host: "localhost",
    port: 5432,
    database: "foodfy"
})
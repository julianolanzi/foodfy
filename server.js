const express = require('express')
const routes = require('./routes')

const server = express()


server.use(routes)


nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(3000, function () {
    console.log("Server is running.")
})



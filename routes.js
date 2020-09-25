const express = require('express')
const routes = express.Router()
const recipes = require("./data")

// rotas Publicas
routes.get("/", function (req, res) {
    return res.render("home", { items: recipes})
})
routes.get("/about", function (req, res) {
    return res.render("about")
})
routes.get("/recipes", function (req, res) {
    return res.render("recipes", { items: recipes})
}) 
routes.get("/show", function (req, res) {
    
    const id = req.query.id

    const recipe = recipes.find(function(recipe){
        if (recipe.id == id) {
            return true
        }

    })
        if (!recipe){
            return res.send("Recita não encontrada")
        }
    return res.render("show", {recipe})

}) 

//Rotas admin







module.exports = routes
const express = require('express')
const { keys } = require('./data')
const routes = express.Router()
const recipes = require('./controllers/recipes')



// rotas Publicas
routes.get("/", function (req, res) {
    return res.render("home", { items: recipes })
})
routes.get("/about", function (req, res) {
    return res.render("about")
})
routes.get("/recipes", function (req, res) {
    return res.render("recipes", { items: recipes })
})
routes.get("/show", function (req, res) {

    const id = req.query.id

    const recipe = recipes.find(function (recipe) {
        if (recipe.id == id) {
            return true
        }

    })
    if (!recipe) {
        return res.send("Recita não encontrada")
    }
    return res.render("show", { recipe })

})

//Rotas admin


routes.get("/admin", function (req, res) {
    return res.render("admin/layout")
})



//Rotas Recipes

routes.get("/admin/recipes", function (req, res) {
    return res.render("admin/recipes/index")
})

routes.get("/admin/recipes/create", recipes.get)
routes.post("/admin/recipes", recipes.post )





module.exports = routes
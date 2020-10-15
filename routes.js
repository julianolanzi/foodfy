const express = require('express')
const routes = express.Router()
const recipes = require('./controllers/recipes')



// rotas Publicas
routes.get("/", recipes.home)
routes.get("/about", recipes.about)
routes.get("/recipes", recipes.recipes)

//Rotas admin


routes.get("/admin", function (req, res) {
    return res.render("admin/layout")
})



//Rotas Recipes
routes.get("/admin/recipes/create", recipes.create)
routes.post("/admin/recipes", recipes.post )

routes.get('/admin/recipes', recipes.index)
routes.get("/admin/recipes/:id", recipes.show )

routes.get("/admin/recipes/:id/edit", recipes.edit)
routes.put("/admin/recipes/", recipes.put)

routes.delete("/admin/recipes", recipes.delete)





module.exports = routes
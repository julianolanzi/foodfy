const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')

// Home Site
exports.home = function (req, res) {
    return res.render("home", { recipes: data.recipes })
}
exports.about = function (req, res) {
    return res.render("about")
}
exports.recipes = function (req, res) {
    return res.render("recipes", { recipes: data.recipes })
}











// Admin site
exports.index = function (req, res) {

    return res.render("admin/recipes/index", { recipes: data.recipes })
}
//Exibe receitas
exports.show = function (req, res) {

    const { id } = req.params

    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id
    })

    if (!foundRecipe) return res.send("Receita nao encontradaaaaa")

    const recipe = {
        ...foundRecipe,
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundRecipe.created_at),
    }

    return res.render("admin/recipes/show", { recipe })
}
//Acessar pag criar receita
exports.create = function (req, res) {
    return res.render("admin/recipes/create")
}
//Criar Receitas
exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Por favor, Preencha todos os campos")
        }
    }

    let { imagem_url, ingredients, title, autor, preparation, description } = req.body

    const created_at = Date.now()
    const id = Number(data.recipes.length + 1)

    data.recipes.push({
        id,
        created_at,
        imagem_url,
        ingredients,
        title,
        autor,
        preparation,
        description
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Erro na gravação")

        return res.redirect("/admin/recipes")
    })

    // return res.send(req.body)
}
// editar 
exports.edit = function (req, res) {
    const { id } = req.params

    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id
    })

    if (!foundRecipe) return res.send("Receita nao encontrada")


    const recipe = {
        ...foundRecipe,
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundRecipe.created_at),
    }

    return res.render("admin/recipes/edit", { recipe })


}
//atualizar
exports.put = function (req, res ) {
    const { id } = req.body
    let index = 0

    const foundRecipe = data.recipes.find(function (recipe, foundIndex){
        if (id == recipe.id){
            index = foundIndex
            return true
        }
    })

    if (!foundRecipe) return res.send("Receita Erros")

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id)
    }

        data.recipes[index] = recipe

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
            if (err) return res.send("Erro ao atualizar!")
    
            return res.redirect(`/admin/recipes/${id}`)
        })

    
}
// deletar
exports.delete = function (req, res) {
    const {id} = req.body

    const filteredRecipes = data.recipes.filter(function(recipe){
        return recipe.id != id
    })

    data.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Erro ao Deletar!")

        return res.redirect("/admin/recipes")

    })

    
}
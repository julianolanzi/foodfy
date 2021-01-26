const { age, date } = require('../../lib/utils')
const Recipe = require('../models/Recipe')


module.exports = {
    home(req, res) {
        Recipe.all(function(recipes){
            return res.render("web/home", {recipes})
        })
    },
    about(req, res) {
        return res.render("web/about")
    },
    recipes(req, res) {

        Recipe.all(function(recipes){
            return res.render("web/recipes", {recipes})
        })
    },
    // Admin site
    index(req, res) {
        Recipe.all(function(recipes){
            return res.render("admin/recipes/index", {recipes})

        })
    },
        show(req, res) {
            Recipe.find(req.params.id, function(recipe){
                if(!recipe) return res.send("Nenhuma receita encontrada")


                recipe.created_at = date(recipe.created_at).format


                return res.render("admin/recipes/show", {recipe})


            })
        },
    create(req, res) {
        Recipe.chefsSelectOptions(function(options){
            return res.render("admin/recipes/create", {chefOptions: options})
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, Preencha todos os campos")
            }
        }
        Recipe.create(req.body, function(recipe){
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
    },
    edit(req, res) {
        Recipe.find(req.params.id, function(recipe){
            if(!recipe) return res.send("Receita não encontrada")

            Recipe.chefsSelectOptions(function(options){
                return res.render("admin/recipes/edit", {recipe, chefOptions: options})
            })
        })
    },
    put(req, res) { 
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, Preencha todos os campos")
            }
        }
        Recipe.update(req.body, function(){
            return res.redirect(`recipes/${req.body.id}`)
        })
    },
    delete(req, res) {
        Recipe.delete(req.body.id, function(){
            return res.redirect(`recipes`)
        })
    },

}

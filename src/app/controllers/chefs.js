const { age, date } = require('../../lib/utils')
const Chef = require('../models/Chef')


module.exports = {
    index(req,res){
        Chef.all(function(chefs){

            return res.render("admin/chefs/index", {chefs})

        })
        
    },

    show(req, res) {
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send("Nenhuma chef encontrado")


            chef.created_at = date(chef.created_at).format
            chef.age = age(chef.birth)


            return res.render("admin/chefs/show", {chef})


        })
    },
    create(req,res){
        return res.render("admin/chefs/create")
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, Preencha todos os campos")
            }
        }
        Chef.create(req.body, function(chef){
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
    },

    edit(req,res){
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send("Chef não encontrado")

            chef.birth = date(chef.birth).iso

            return res.render("admin/chefs/edit", { chef })
        })
    },

    put(req,res){
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, Preencha todos os campos")
            }
        }

        Chef.update(req.body, function(){
            return res.redirect(`chefs/${req.body.id}`)
        })
    },


    delete(req, res){
        Chef.delete(req.body.id, function(){
            return res.redirect(`chefs`)
        })
    },

}
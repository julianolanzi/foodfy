const fs = require('fs')
const data = require('../data.json')




exports.get = function (req, res) {
    return res.render("admin/recipes/create")
}
//Create post
exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == ""){
            return res.send("Por favor, Preencha todos os campos")
        }
    }

    let {imagem_url, ingredients, preparation, description} = req.body

    const created_at = Date.now()
    const id = Number(data.recipes.length + 1)

    data.recipes.push({
        id,
        created_at,
        imagem_url,
        ingredients,
        preparation,
        description
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Erro na gravação")

        return res.redirect("/admin/recipes")
    })

   // return res.send(req.body)
}
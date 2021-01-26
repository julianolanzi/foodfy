const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM chefs ORDER BY name ASC`, function(err, results){
            if (err) throw `Database Error ! ${err}`

            callback(results.rows)
        })
    },

    findPo(callback) {
        db.query(`SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        GROUP BY chefs.id
        ORDER BY total_recipes ASC`, function (err, results) {
            if (err) throw `Database Error ! ${err}`

            callback(results.rows)
        })
    },

    create(data, callback) {

        const query = `
        INSERT INTO chefs (
            name,
            avatar_url,
            birth,
            especial_recipe,
            gender, 
            cep,
            address,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
    `
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.especial_recipe,
            data.gender,
            data.cep,
            data.address,
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error ! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`SELECT chefs.*,
        count(*) AS total_recipes FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`, [id], function(err, results){
            if (err) throw `Database Error ! ${err}`

            callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `
        UPDATE chefs SET
        name=($1),
        avatar_url=($2),
        birth=($3),
        especial_recipe=($4),
        gender=($5),
        cep=($6),
        address=($7)
        WHERE id = $8
        `

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.especial_recipe,
            data.gender,
            data.cep,
            data.address,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Error ! ${err}`
            callback()
        })
    },


    delete(id, callback){
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database Error ! ${err}`

            return callback()
        })
    },
    


}
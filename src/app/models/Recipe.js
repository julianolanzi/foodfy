const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM recipes ORDER BY title ASC`, function(err, results){
            if (err) throw `Database Error ! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {

        const query = `
        INSERT INTO recipes (
            imagem_url,
            title,
            ingredients,
            time_preparation,
            eat_people,
            created_at,
            chef_id,
            preparation,
            information
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
    `
        const values = [
            data.imagem_url,
            data.title,
            data.ingredients,
            data.time_preparation,
            data.eat_people,
            date(Date.now()).iso,
            data.chef,
            data.preparation,
            data.information
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error ! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id], function(err, results){
                if (err) throw `Database Error ! ${err}`
                callback(results.rows[0])
            })
    },
    update(data, callback){
        const query = `
        UPDATE recipes SET
            imagem_url=($1),
            title=($2),
            ingredients=($3),
            time_preparation=($4),
            eat_people=($5),
            chef_id=($6),
            preparation=($7),
            information=($8)
            WHERE id = $9
        `
        const values = [
            data.imagem_url,
            data.title,
            data.ingredients,
            data.time_preparation,
            data.eat_people,
            data.chef_id,
            data.preparation,
            data.information,   
            data.id
        ]
        db.query(query, values, function(err, results){
            if (err) throw ` Database Error ! ${err}`
            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database Error ! ${err}`

            return callback()
        })
    },
    chefsSelectOptions(callback) {
        db.query(`SELECT name, id FROM chefs`, function (err, results) {
            if (err) throw `Database Error ! ${err}`

            callback(results.rows)
        })
    }


}
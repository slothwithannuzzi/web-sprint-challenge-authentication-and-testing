const db = require('../../data/dbConfig')

function findBy(filter) {
    return db('users')
            .where(filter)
}

function findById(id) {
    return db('users')
            .where("id", id)
}

async function add(user){
    const [id] = await db('users').insert(user, "id")
    return findById(id)
}

module.exports = {
    findBy,
    findById,
    add
}
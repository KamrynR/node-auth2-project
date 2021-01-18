const db = require("../database/config")

async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
}

function find() {
	return db("users as u")
		.innerJoin("department as d", "d.id", "u.department_id")
		.select("u.id", "u.username", "d.name as department")
}

function findById(id) {
	return db("users as u")
		.innerJoin("department as d", "d.id", "u.department_id")
		.where("u.id", id)
		.first("u.id", "u.username", "d.name as department")
}

function findByUsername(username) {
	return db("users as u")
		.innerJoin("department as d", "d.id", "u.department_id")
		.where("u.username", username)
		.first("u.id", "u.username", "u.password", "d.name as department")
}

module.exports = {
	add,
	find,
	findById,
	findByUsername,
}
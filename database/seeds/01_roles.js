exports.seed = async function(knex) {
	await knex("department").insert([
		{ id: 1, name: "basic" },
		{ id: 2, name: "admin" },
	])
}
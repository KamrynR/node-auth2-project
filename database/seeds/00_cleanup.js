exports.seed = async function(knex) {
	await knex("users").truncate()
	await knex("department").truncate()
}
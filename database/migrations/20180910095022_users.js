exports.up = async function(knex) {
	await knex.schema.createTable("department", (table) => {
		table.increments("id")
		table.text("name").notNull().unique()
	})

	await knex.schema.createTable("users", (table) => {
		table.increments("id")
		table.text("username").notNull().unique()
		table.text("password").notNull()
		table.integer("department_id")
			.notNull()
			.defaultTo(1)
			.references("id")
			.inTable("department")
			.onDelete("RESTRICT")
			.onUpdate("CASCADE")
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("department")
	await knex.schema.dropTableIfExists("users")
}
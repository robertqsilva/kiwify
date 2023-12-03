const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    ssl: { rejectUnauthorized: false },
  },
});


module.exports = {
  async buscarClienteEmail (email){
    const emailExistente = knex('clientes').where({email}).first()
    return emailExistente
  },

  async cadastroCliente(email, senha){
    const cadastro = await knex('clientes').insert({email, senha}).returning("*")

    return cadastro[0]
  }
}
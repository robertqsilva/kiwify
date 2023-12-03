const { criptografarSenha } = require("../services/bcrypt");
const { buscarClienteEmail, cadastroCliente } = require("../services/database");

const cadastro = async (req, res) => {
  const { email, senha } = req.body;
  

  if (!email || !senha) {
    return res.status(400).json("email e senha são obrigatorios");
  }

  try {
    const emailExistente = await buscarClienteEmail(email);

    if (emailExistente) {
      return res.status(400).json("email já cadastrado");
    }
    const senhaCriptografada = await criptografarSenha(senha);

    const resultadoCadastro = await cadastroCliente(email, senhaCriptografada);

    if (!resultadoCadastro) {
      return res.status(500).json("ocorreu um erro ao realizar cadastro");
    }

    const { senha: _, ...dados } = resultadoCadastro; ;
    return res.status(201).json(dados);
  } catch (error) {
    return res.status(500).json("erro interno no servidor");
  }
};

module.exports = {cadastro}

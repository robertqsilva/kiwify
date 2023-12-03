const { verificarSenha } = require("../services/bcrypt");
const { buscarClienteEmail } = require("../services/database");

const login = async (req, res) => {
  const { email, senha } = req.body;
  if(!email || !senha){
    return res.status(400).json('informe email e senha')
  }

  try {
    const emailExistente = await buscarClienteEmail(email);


    if (!emailExistente) {
      return res.status(404).json("Email ou senha incorretos");
    }

    const senhaValida = await verificarSenha(senha, emailExistente.senha);

    if (!senhaValida) {
      return res.status(404).json("Email ou senha incorretos");
    }

    const { senha: _, ...dados } = emailExistente;
 
    return res.status(200).json(dados);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json("erro interno do servidor")
  }
  
};

module.exports = { login };

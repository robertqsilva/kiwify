const router = require("express").Router();

const { login } = require("../controllers/login");
const {cadastro} = require("../controllers/clientes");

router.post("/login", login);
router.post("/cadastro", cadastro);

module.exports = router;

const router = require("express").Router();

const { login } = require("../controllers/login");
const {cadastro} = require("../controllers/clientes");

router.post("/login", login);
router.post("/cadastro", cadastro);

router.get('/on', (req, res) => {
    return res.json('servidor on')
})

module.exports = router;

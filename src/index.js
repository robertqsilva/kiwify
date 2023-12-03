require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes/router')
const cors = require('cors')
const cron = require("node-cron");
const axios = require("axios");

app.use(cors())
app.use(express.json())
app.use(router)




cron.schedule("*/1 * * * *", () => {
  axios
    .get("https://kiwify.onrender.com/on")
    .then((response) => {
      console.log("Solicitação de manutenção enviada com sucesso");
    })
    .catch((error) => {
      console.error(
        "Erro ao enviar a solicitação de manutenção:",
        error.message
      );
    });
});

app.listen(process.env.PORT);
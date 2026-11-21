import { Router } from "express";
import * as Service from '../../service/usuarios/usuarioService.js'

const endpoints = Router();

endpoints.post('/usuario/cadastrar', async (req, resp) => {
    try {
        const user = req.body;
        const resposta = await Service.cadastrarUsuarioService(user);

        resp.send({
            resposta: "Usuário cadastrado com sucesso!"
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/usuario/entrar', async (req, resp) => {
    try {
        const user = req.body;
        const conta = await Service.logarUsuarioService(user)

        resp.send({
            resposta: conta
        })
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoints;
import { Router } from "express";
import { upload } from "../../middleware/multer.js";
import { enviarFotoPerfil } from '../../service/cloudinaryService.js';
import * as Service from '../../service/usuarios/usuarioService.js';
import * as Middleware from '../../middleware/autenticacao.js'

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

        resp.send(conta)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put(
    '/usuario/atualizar',
    Middleware.autenticar,
    upload.single('foto'),
    async (req, resp) => {
        try {
            const user = req.body;

            if (req.file) {
                const resultado = await enviarFotoPerfil(req.file.path);

                user.imagem_perfil = resultado;
            }

            const resposta = await Service.AtualizarInformacoesService(
                req,
                user
            );

            resp.send({
                mensagem: "Informações atualizadas com sucesso!",
                imagem_url: user.imagem_perfil
            });
        }
        catch (err) {
            resp.status(400).send({
                erro: err.message
            });
        }
    }
);

endpoints.get(
    '/usuarios/listar',
    Middleware.autenticar,
    Middleware.appenasAdmins,
    async (req, resp) => {
        try {
            const user = req.query.email
            const resposta = await Service.listarUsuariosService(user);

            resp.send(resposta)
        }
        catch (err) {
            resp.status(400).send({
                erro: err.message
            });
        }
    }
)

endpoints.put(
    '/usuario/trocar-cargo/:email',
    Middleware.autenticar,
    Middleware.appenasAdmins,
    async (req, resp) => {
        try {
            const email = req.params.email;

            await Service.trocarCargoService(email);

            resp.send({
                resposta: `Cargo de ${email} alterado com sucesso!`
            })
        }
        catch (err) {
            resp.status(400).send({
                erro: err.message
            })
        }
})

endpoints.delete(
    '/usuario/deletar/:email',
    Middleware.autenticar,
    Middleware.appenasAdmins,
    async (req, resp) => {
        try {
            const email = req.params.email;

            await Service.deletarUsuarioService(email);

            resp.send({
                resposta: `O usuário com email: ${email} foi deletado com sucesso!`
            })
        }
        catch (err) {
            resp.status(400).send({
                erro: err.message
            })
        }
})

export default endpoints;
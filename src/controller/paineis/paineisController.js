import { Router } from "express";
import { upload } from "../../middleware/multer.js";
import { enviarFotoPerfil } from '../../service/cloudinaryService.js';

import * as Middleware from '../../middleware/autenticacao.js';
import * as Service from '../../service/paineis/paineisService.js';

const endpoints = Router();

endpoints.post(
    '/painel/postar',
    Middleware.autenticar,
    Middleware.appenasAdmins,
    upload.single('imagem_painel'),
    async (req, resp) => {
        try {
            if (!req.file) {
                return resp.status(400).send({
                    erro: "Selecione uma imagem para o painel."
                });
            }

            const imagem = await enviarFotoPerfil(req.file.path);

            const painel = {
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                imagem_painel: imagem
            };

            const resposta = await Service.postarPainelService(painel);

            resp.send({ resposta });
        }
        catch (err) {
            resp.status(400).send({
                erro: err.message
            });
        }
    }
);

endpoints.get(
    '/paineis/listar',
    Middleware.autenticar,
    async (req, resp) => {
        try {
            const nome = req.query.nome;
            const resposta = await Service.getPaineisService(nome);

            resp.send(resposta);
        }
        catch (err) {
            resp.status(400).send({
                erro: err.message
            })
        }
    }
);

endpoints.delete(
    '/painel/deletar/:id',
    Middleware.autenticar,
    Middleware.appenasAdmins,
    async (req, resp) => {
        try {
            const id = req.params.id;
            const resposta = await Service.deletarPainelService(id);

            resp.send({
                Paineis_Deletados: resposta
            })
        }
        catch (err) {
            resp.status(400).send({
                erro: err.message
            })
        }
    }
);

export default endpoints;
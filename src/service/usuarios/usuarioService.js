import * as UsuarioDB from '../../repository/usuarios/usuarioRepository.js';
import * as Validacao from '../../validation/usuarios/usuarioValidation.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function cadastrarUsuarioService(user) {
    await Validacao.ValidarCadastro(user);

    const senha = await bcrypt.hash(user.senha, 10);
    user.senha = senha


    const response = await UsuarioDB.cadastrarUsuario(user);

    return response;
}

export async function logarUsuarioService(user) {
    const usuario = await UsuarioDB.validarUsuarioExistente(user.email);

    const senhaCorreta = await bcrypt.compare(
        user.senha,
        usuario.senha
    )

    await Validacao.ValidarCredenciais(usuario, senhaCorreta);

    const token = jwt.sign(
        {
            id: usuario.id_usuario,
            cargo: usuario.cargo,
            email: usuario.email
        },
        process.env.JWT_SECRET
    )

    const usuario_informacoes = {
        id: usuario.id_usuario,
        nome: usuario.nome,
        cargo: usuario.cargo,
        email: usuario.email,
        imagem_perfil: usuario.imagem_perfil
    }

    return {
        usuario_informacoes,
        token
    }
}

export async function AtualizarInformacoesService(req, user) {
    user.id_usuario = req.usuario.id;

    const response = await UsuarioDB.AtualizarInformacoes(user);

    return response;
}
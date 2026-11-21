import {con} from '../connection.js';

export async function cadastrarUsuario(user){
    const command = `
        INSERT INTO usuarios(nome, email, cargo, senha, imagem_perfil)
        values (?, ?, ?, ?, ?)
    `

    const [resposta] = await con.query(command, [
        user.nome,
        user.email,
        user.cargo,
        user.senha,
        user.imagem_perfil
    ]);

    return resposta
}

export async function validarUsuarioExistente(email){
    const command = `
        select * from usuarios
        where email = ?
    `

    const [response] = await con.query(command, [email]);

    return response[0];
}
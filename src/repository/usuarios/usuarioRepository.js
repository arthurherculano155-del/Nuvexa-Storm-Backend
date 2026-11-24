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


export async function AtualizarInformacoes(user) {
    const command = `
        UPDATE usuarios
        SET nome = ?,
            imagem_perfil = ?
        WHERE id_usuario = ?
    `;

    const [resposta] = await con.query(command, [
        user.nome,
        user.imagem_perfil,
        user.id_usuario
    ]);

    return resposta.affectedRows;
}

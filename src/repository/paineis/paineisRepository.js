import { con } from "../connection.js";

export async function postarPainel(painel){
    const command = `
        INSERT INTO paineis(nome, descricao, imagem_painel, preco)
        values(?, ?, ?, ?)
    `

    const [resposta] = await con.query(command, [
        painel.nome,
        painel.descricao,
        painel.imagem_painel,
        painel.preco
    ]);

    return resposta.insertId;
}

export async function getPaineis(nome){
    const command = `
        select * from paineis
        where nome like ?
    `

    const [resposta] = await con.query(command, [
        `%${nome}%`
    ])

    return resposta;
}

export async function deletarPainel(id){
    const command = `
        delete from paineis
        where id_painel = ?
    `

    const [resposta] = await con.query(command, [id]);

    return resposta.affectedRows;
}
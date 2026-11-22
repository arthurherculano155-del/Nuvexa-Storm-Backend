import * as DBUsuarios from '../../repository/usuarios/usuarioRepository.js'

export async function ValidarCadastro(user){
    if(!user.email.includes("@") || !user.email.includes("."))
        throw new Error("Email inválido.")

    const validarEmailExistente = await DBUsuarios.validarUsuarioExistente(user.email);

    if(validarEmailExistente)
        throw new Error("Esse usuário já existe.")

    if(user.senha.length < 8)
        throw new Error("A senha precisa conter ao menos 8 carácteres.")
}

export async function ValidarCredenciais(conta, senha){
    if(!conta || !senha)
        throw new Error("Email ou senha incorretos.")
}

export async function verificarEmail(email){
    const validarEmailExistente = await DBUsuarios.validarUsuarioExistente(email);

    if(validarEmailExistente === null)
        throw new Error("Email não cadastrado.")
}
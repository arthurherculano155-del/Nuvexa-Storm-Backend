import * as PainelDB from '../../repository/paineis/paineisRepository.js';
import * as Validation from '../../validation/paineis/paineisValidation.js'

export async function postarPainelService(painel){
    Validation.validarPreco(painel.preco)
    const response = await PainelDB.postarPainel(painel);

    return response;
}

export async function getPaineisService(nome){
    const response = await PainelDB.getPaineis(nome);

    return response;
}

export async function deletarPainelService(id){
    const response = await PainelDB.deletarPainel(id);

    return response;
}
export function validarPreco(preco){
    if(isNaN(preco))
        throw new Error("O preço precisa ser um número.")
}
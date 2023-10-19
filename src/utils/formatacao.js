const retirarCaracteresEspeciais = (entrada)=>{
    
    const digitos = [];

    for(digito of entrada){
        if(digito>=0&&digito<=9){
            digitos.push(digito);
        }
    }

    return digitos.join("");
}

module.exports = {
    retirarCaracteresEspeciais
}
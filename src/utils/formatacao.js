const retirarCaracteresEspeciais = (entrada) => {
    
    const digitos = [];

    for (const digito of entrada) {
        if (!isNaN(digito)) {
            digitos.push(digito);
        }
    }

    return digitos.join("");
}

module.exports = {
    retirarCaracteresEspeciais
}


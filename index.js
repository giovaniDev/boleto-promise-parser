const guia = require('./module/guia');
const boleto = require('./module/boleto');
const { verifyDigitoVerificadorGeralModule10Guia, verifyDigitoVerificadorGeralModule11Boleto } = require('./module/verifyers');

const parser = (barcode) => {
    return new Promise((resolve, reject) => {
        if (barcode === undefined) reject({error: 'É necessario colocar uma linha digitavel: 44 caracteres (string)'})
        if (barcode.length !== 44) reject({error: 'São necessárias 44 caracteres'});
        
        if (barcode[0] === '8') {
            const verifyinDigitoVerificador = verifyDigitoVerificadorGeralModule10Guia(barcode.split(''));
            if (!verifyinDigitoVerificador) reject({error: 'Digito verificador geral inválido! Passe o scanner novamente'});
            resolve(guia(barcode));
        } else {
            const verifyinDigitoVerificador = verifyDigitoVerificadorGeralModule11Boleto(barcode.split(''));
            if (!verifyinDigitoVerificador) reject({error: 'Digito verificador geral inválido! Passe o scanner novamente'});
            resolve(boleto(barcode));
        }
       
    })
}

module.exports = parser;


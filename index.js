const guia = require('./module/guia');
const boleto = require('./module/boleto')

const parser = (barcode) => {
    if (barcode[0] === '8') {
        return guia(barcode);
    }
    return boleto(barcode);
}

module.exports = parser;


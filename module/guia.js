const segments = require('./segments');

function separatingPositionsModule10(inputMultiplyedPositions) {
    const separetedDigitos = inputMultiplyedPositions.map(fields => {
        const joinFields = fields.join('');
        const separateDigitos = joinFields.split('').map(Number);
        return separateDigitos;
    } );
    return separetedDigitos;
}

function multiplyPositionsModule10Guia(inputArrayFields) {
    let factor = 1;
    const multiplyedArray = inputArrayFields.map((fields) => fields.map((value, index) => {
        if (factor === 1) {
            factor = 2;
            return value * factor;
        } else {
            factor = 1;
            if (index === 0) {
                factor = 2
            }
            return value * factor;
        }
    }));
    return multiplyedArray;
}

function getDigitoVerificadorModule10(inputSeparetedDigitos) {
    return inputSeparetedDigitos.map(fields => fields.reduce((acum, value) => {
        const res = acum + (10 - value);
        return res % 10;
    }, 0))
}

function verifyDigitoVerificadorGeralModule10Guia(inputBarcode) {
    let factor = 2;
    const multiplyFactor = inputBarcode.map((values, index) => {
        if (index === 3) return 0;
        if (factor === 2) {
            const res = values * factor;
            factor = 1;
            return res
        } else {
            const res = values * factor;
            factor = 2;
            return res
        }
    })
    const splitValues = multiplyFactor.join('').split('');
    const res = splitValues.reduce((acum, value) => {
        const res = acum + (10 - Number(value));
        return res % 10 ;
    }, 0);

    if (Number(inputBarcode[3]) !== res) {
        return false
    }
    return true;
}

const guiaParser = (barCodeLine) => {
    return new Promise((resolve, reject) => {
        
        if (barCodeLine.length !== 44) reject({ error: 'São necessárias 44 caracteres' });

        const verifyinDigitoVerificador = verifyDigitoVerificadorGeralModule10Guia(barCodeLine.split(''));
        
        if (!verifyinDigitoVerificador) reject({ error: 'Digito verificador geral inválido! Passe o scanner novamente' }) ;

        const field1 = barCodeLine.slice(0,11).split("");
        const field2 = barCodeLine.slice(11,22).split("");
        const field3 = barCodeLine.slice(22,33).split("");
        const field4 = barCodeLine.slice(33, 44).split("");
        
        const arrayFields = [ field1, field2, field3, field4 ];
        
        const multiplyedPosition = multiplyPositionsModule10Guia(arrayFields);
        const separatedDigitos = separatingPositionsModule10(multiplyedPosition);
        const digDAC = getDigitoVerificadorModule10(separatedDigitos);

        const result = `${field1.join('')}${digDAC[0]}${field2.join('')}${digDAC[1]}${field3.join('')}${digDAC[2]}${field4.join('')}`;
        
        resolve({
            data: {
                segments,
                codebar: result,
                digits: digDAC,
                value: String(parseFloat(barCodeLine.slice(04, 15) / 100)).replace('.', ','),
            }});
    })

}
    
module.exports = guiaParser;
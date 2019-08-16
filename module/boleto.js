function separatingPositionsModule10(inputMultiplyedPositions) {
    const separetedDigitos = inputMultiplyedPositions.map(fields => {
        const joinFields = fields.join('');
        const separateDigitos = joinFields.split('').map(Number);
        return separateDigitos;
    } );
    return separetedDigitos;
}

function multiplyPositionsModule10Boleto(inputArrayFields) {
    let factor = 1;
    const multiplyedArray = inputArrayFields.map((fields) => fields.map((value, index) => {
        if (factor === 1) {
            factor = 2;
            return value * factor;
        } else {
            factor = 1;
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

function verifyDigitoVerificadorGeralModule11Boleto(inputBarcode) {
    let module11 = 4;
    const multiplyValuesModule11 =  inputBarcode.map((values, index) => {
        if (index === 4) return 0;
        const res = values * module11;
        module11 -= 1;
        if (module11 === 1) module11 = 9;
        return res;
    });
    const sumValues = multiplyValuesModule11.reduce((acum, values) => {
        return acum + values;
    }, 0)
    let restResult = sumValues % 11;
    const finalResult = restResult === 0 || restResult === 1 ? 0 : 11 - restResult;
    if (Number(inputBarcode[4]) !== finalResult) return false;
    return true;
}

function getVencimento(codeBarData) {
        const dateBoleto = new Date;
        dateBoleto.setFullYear(1997);
        dateBoleto.setMonth(10);
        dateBoleto.setDate(7);
        dateBoleto.setDate(dateBoleto.getDate() + Number(codeBarData));
        return `${dateBoleto.getDate()}/${dateBoleto.getMonth()}/${dateBoleto.getFullYear()}`;
    }


const boletoParser = (barCodeLine) => {
    return new Promise((resolve, reject) => {
        
        if (barCodeLine.length !== 44) reject({error: 'São necessárias 44 caracteres'});

        const verifyinDigitoVerificador = verifyDigitoVerificadorGeralModule11Boleto(barCodeLine.split(''));

        if (!verifyinDigitoVerificador) reject({error: 'Digito verificador geral inválido! Passe o scanner novamente'});

        const field1 = (barCodeLine.slice(0,4).split("").concat(barCodeLine.slice(19,24).split(""))); 
        const field2 = barCodeLine.slice(24,34).split("");
        const field3 = barCodeLine.slice(34,44).split("");
        const field4 = barCodeLine.slice(4, 5).split("");
        const field5 = barCodeLine.slice(5, 19).split("");
        
        const arrayFields = [ field1, field2, field3 ]; //Fields of barcode separeted in array
        
        const multiplyedPosition = multiplyPositionsModule10Boleto(arrayFields); // Multiplying the array barcode fields
        const separatedDigitos = separatingPositionsModule10(multiplyedPosition);
        const digDAC = getDigitoVerificadorModule10(separatedDigitos);

        const result = `${field1.join('')}${digDAC[0]}${field2.join('')}${digDAC[1]}${field3.join('')}${digDAC[2]}${field4.join('')}${field5.join('')}`;
        const vencimento = getVencimento(result.slice(33,37));
        
        resolve({data: {
            codebar: result,
            digits: digDAC,
            value: String(parseFloat(result.slice(37, 47) / 100)).replace('.', ','),
            vencimento
        }});
    });
}
    
module.exports = boletoParser;
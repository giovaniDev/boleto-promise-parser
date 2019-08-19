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

function getVencimento(codeBarData) {
        const dateBoleto = new Date;
        dateBoleto.setFullYear(1997);
        dateBoleto.setMonth(10);
        dateBoleto.setDate(7);
        dateBoleto.setDate(dateBoleto.getDate() + Number(codeBarData));
        return `${dateBoleto.getDate()}/${dateBoleto.getMonth()}/${dateBoleto.getFullYear()}`;
    }


const boletoParser = (barCodeLine) => {

        const field1 = (barCodeLine.slice(0,4).split("").concat(barCodeLine.slice(19,24).split(""))); 
        const field2 = barCodeLine.slice(24,34).split("");
        const field3 = barCodeLine.slice(34,44).split("");
        const field4 = barCodeLine.slice(4, 5).split("");
        const field5 = barCodeLine.slice(5, 19).split("");
        
        const arrayFields = [ field1, field2, field3 ]; //Fields of barcode separeted in array
        
        const multiplyedPosition = multiplyPositionsModule10Boleto(arrayFields); // Multiplying the array barcode fields
        const separatedDigitos = separatingPositionsModule10(multiplyedPosition);
        const digits = getDigitoVerificadorModule10(separatedDigitos);

        const codebar = `${field1.join('')}${digits[0]}${field2.join('')}${digits[1]}${field3.join('')}${digits[2]}${field4.join('')}${field5.join('')}`;
        const vencimento = getVencimento(codebar.slice(33,37));
        
        return {data: {
            codebar,
            digits,
            value: String(parseFloat(codebar.slice(37, 47) / 100)).replace('.', ','),
            vencimento
        }};
}
    
module.exports = boletoParser;
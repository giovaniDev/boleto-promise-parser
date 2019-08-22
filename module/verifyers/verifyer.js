function calculateDigitoVerificadorGeralModule11(inputBarcode, position) {
    let factor = 4;
    const multiplyValuesfactor =  inputBarcode.map((values, index) => {
        if (index === position) return 0;
        const res = values * factor;
        factor -= 1;
        if (factor === 1) factor = 9;
        return res;
    });
    const sumValues = multiplyValuesfactor.reduce((acum, values) => {
        return acum + values;
    }, 0)
    let restResult = sumValues % 11;
    const finalResult = restResult === 0 || restResult === 1 ? 0 : 11 - restResult;
    if (Number(inputBarcode[position]) !== finalResult) return false;
    return true;
};

function calculateDigitoVerificadorGeralModule10(inputBarcode, position) {
    let factor = 2;
    const multiplyFactor = inputBarcode.map((values, index) => {
        if (index === position) return 0;
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

    if (Number(inputBarcode[position]) !== res) {
        return false
    }
    return true;
}

function verifyDigitoVerificador(inputBarcode, position) {
    const calculatedModule11 = calculateDigitoVerificadorGeralModule11(inputBarcode, position);
    if (calculatedModule11) {
        return true;
    };
    const calculatedModule10 = calculateDigitoVerificadorGeralModule10(inputBarcode, position);
    if (calculatedModule10) {
        return true;
    };
    return false;
}

module.exports = verifyDigitoVerificador;


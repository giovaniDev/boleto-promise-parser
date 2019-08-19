module.exports = {
    verifyDigitoVerificadorGeralModule11Boleto(inputBarcode) {
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
    },

    verifyDigitoVerificadorGeralModule10Guia(inputBarcode) {
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

}


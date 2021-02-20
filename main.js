const r = require('ramda')

const calculateMonthlyPayment = (interestRate,loanValue) => {
	const monthlyInterestRate = ((interestRate/100) / 12)
	const monthlyPayment = loanValue * monthlyInterestRate

	return monthlyPayment
}

const productSafetyCheck = (currentMonthlyPayment, expectedLoanValue, productArray) => {
    const returnedProducts = []
    r.forEach( product => {
        if(product.repaymentType === 'interest-only') {
            const expectedMonthlyPayment = calculateMonthlyPayment(product.interestRate, expectedLoanValue)
            const tenPercentLimit = currentMonthlyPayment/10
            if((expectedMonthlyPayment - currentMonthlyPayment) < tenPercentLimit) {
                returnedProducts.push(product)
            }
        } else {
            returnedProducts.push(product)
        } 
    }, productArray)
    console.log(returnedProducts);
    return returnedProducts;
}

module.exports = {
    productSafetyCheck
}


const r = require('ramda')

const calculateMonthlyPayememt = (interestRate,loanValue) => {
	const monthlyInterestRate = ((interestRate/100) / 12)
	const monthlyPayment = loanValue * monthlyInterestRate

	return monthlyPayment
}

const productSafetyCheck = (currentMonthlyPayment, expectedLoanValue, productArray) => {
    const returnedProducts = []
    r.forEach( product => {
        if(product.repaymentType === 'interest-only') {
            const expectedMonthlyPayment = calculateMonthlyPayememt(product.interestRate, expectedLoanValue)
            const tenPercentLimit = currentMonthlyPayment/10
            if((expectedMonthlyPayment - currentMonthlyPayment) < tenPercentLimit) {
                returnedProducts.push(product)
            }
        } else {
            returnedProducts.push(product)
        } 
    }, productArray)
    return returnedProducts;
}

/*Given: That products are rounded at two decimal places, since monetary GBP values are always rounded to two decimal places 
**Custom test function** */
const calcRoundingIssues = (currentMonthlyPayment, expectedLoanValue, interest) => {
    var plus10 = currentMonthlyPayment + (currentMonthlyPayment / 10);

    while(1){
        var mi = interest / 100 / 12;
        var new_monthly = expectedLoanValue * mi;

        if (new_monthly > plus10){
            break;
        }
        interest += 0.01;
    }

    console.log ("Current: " +  currentMonthlyPayment);
    console.log ("Current+10%: " + plus10);
    console.log ("mortgage: " + expectedLoanValue);
    console.log ("Interest: " + interest);

    console.log ("new monthly: " + new_monthly);
    return new_monthly;
}



module.exports = {
    productSafetyCheck,
    calcRoundingIssues
}
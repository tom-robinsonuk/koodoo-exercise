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


// Helper Functions 
// Created: Thomas Robinson
/*
/*Given: That products are rounded at two decimal places, since monetary GBP values are always rounded to two decimal places 
**Custom helper function** */
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
/* Find the input values for the 1p difference condition, adjust values up and down seeing how it affects the difference.
current test: Current: 500, Mortgage: 1000020
**Custom helper function** */
const findInputvalues1pDifference = (currentMonthlyPayment, expectedLoanValue, interest) => {
    current10pc = currentMonthlyPayment + (currentMonthlyPayment/10);

    while(1){
        var newMonthly = calculateMonthlyPayememt(expectedLoanValue, interest);
        console.log (newMonthly)
        
        if (newMonthly > current10pc){
           // console.log(newMonthly + " " +current10pc) // debug 
           // console.log("interest: " + interest) // debug 
            break;
        }
        interest += 0.01;
    }
    // returns the monthly payment and interest to use for testing with 1p difference
    var returnString = "" + current10pc + " Interest: " + interest;
    return returnString;
}

module.exports = {
    productSafetyCheck,
    calcRoundingIssues,
    findInputvalues1pDifference
}
const {productSafetyCheck} = require('./main')
const {calcRoundingIssues} = require('./main')
const {findInputvalues1pDifference} = require('./main')
const productList = require('./productList.json')

test('Ensure Repayment Mortgages are not filtered',() => {
    const productList = [{
        productId:1,
        repaymentType:"repayment",
        interestRate:0.1
    },{
        productId:2,
        repaymentType:"repayment",
        interestRate:20
    }]

    const expectedReturnedProducts = productList
    const currentMonthlyPayment = 200
    const loanValue = 100000

    expect(productSafetyCheck(currentMonthlyPayment,loanValue,productList)).toEqual(expectedReturnedProducts)
});

/*Given:
Repayment mortgage with current monthly payment of 0 (customer has no current mortgage)
product should be returned
using the index.js product list*/
test('Ensure Repayment mortgage with current monthly payment of 0, all products should be returned',() =>{

    const expectedReturnedProducts = productList
    const currentMonthlyPayment = 0
    const loanValue = 100000

    expect(productSafetyCheck(currentMonthlyPayment,loanValue,productList)).toEqual(expectedReturnedProducts)
});

/*Given: That the interest-only mortgage that is 10%  is also returned
Test script fails: Criteria <10 which is 0 to 9 rather than 0 to 10
*/
test('Interest-only products should be returned where the monthly payment works out at 10% difference to their current payment',() =>{
    const productList = [{
        productId:1,
        repaymentType:"interest-only",
        interestRate:1.2 
    }];

    const expectedReturnedProducts = productList
    const currentMonthlyPayment = 200
    const loanValue = 220000

    expect(productSafetyCheck(currentMonthlyPayment,loanValue,productList)).toEqual(expectedReturnedProducts)
});

/*Given: That the interest-only mortgage that is 9%  is also returned
Test script pass: Criteria < 9 which is 0 to 9 rather than 0 to 10
*/
test('Interest-only products should be returned where the monthly payment works out at 9% difference to their current payment',() =>{
    const productList = [{
        productId:1,
        repaymentType:"interest-only",
        interestRate:1.2 
    }];

    const expectedReturnedProducts = productList
    const currentMonthlyPayment = 200
    const loanValue = 218000

    expect(productSafetyCheck(currentMonthlyPayment,loanValue,productList)).toEqual(expectedReturnedProducts)
});

/*Given: That the interest-only mortgage that is 5%  is also returned
*/
test('Interest-only product should be returned where monthly payment works out at 5% difference to their current payment',() =>{
    const productList = [{
        productId:1,
        repaymentType:"interest-only",
        interestRate:1.22
    }];

    const expectedReturnedProducts = productList
    const currentMonthlyPayment = 210
    const loanValue = 209000

    expect(productSafetyCheck(currentMonthlyPayment,loanValue,productList)).toEqual(expectedReturnedProducts)
});

/*Given: That interest-mortgages that are greater than current +10%: interest rate 0.66 works out at  0.01 more than the current +10%
*/
test('Interest-only products should not be returned where the monthly payment is more than 10% more than their current payment',() =>{
    //first product works out to exactly £0.01 more than current + 10%
    const productList = [{
        productId:1,
        repaymentType:"interest-only",
        interestRate:0.66
    },{
        productId:2,
        repaymentType:"interest-only",
        interestRate:1.66
    },{
        productId:3,
        repaymentType:"interest-only",
        interestRate:2.66
    },{
        productId:4,
        repaymentType:"interest-only",
        interestRate:23.66
    }];

    const expectedReturnedProducts = [];
    const currentMonthlyPayment = 500
    const loanValue = 1000020

    expect(productSafetyCheck(currentMonthlyPayment,loanValue,productList)).toEqual(expectedReturnedProducts)
});

/*Given: That products are rounded at two decimal places, since monetary GBP values are always rounded to two decimal places 
**Custom function** */
test('should return correct product monthly payment at two decimal places',() =>{
    const productList = [{
        productId:1,
        repaymentType:"interest-only",
        interestRate:0.01
    }]

    const expectedReturnedProducts = 550.33
    const currentMonthlyPayment = 500.30;
    const loanValue = 40000;
    const interestRate = 0.01
    expect(calcRoundingIssues(currentMonthlyPayment,loanValue,interestRate)).toEqual(expectedReturnedProducts);
    // new monthly payment calculated as 550.333333333326
});

/* Find the input values for the 1p difference condition, 
function created for generating input values for use in testing
**Custom function** */
test('Should return the 1p difference input values',() =>{

    const currentMonthlyPayment = 500;
    const loanValue = 1000020;
    const interestRate = 0.01
    const expectedReturnedProducts = "550 Interest: 0.6600000000000004"

    expect(findInputvalues1pDifference(currentMonthlyPayment,loanValue,interestRate)).toEqual(expectedReturnedProducts);
});


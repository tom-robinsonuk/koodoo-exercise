const {productSafetyCheck} = require('./main')
const {calculateMonthlyPayment} = require('./main')

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


/*Given: That the interest-only mortgage that is 10%  is also returned
Test script fails: Criteria <10 which is 0 to 9 rather than 0 to 10
*/
test('Interest-only product where monthly payment works out 10% difference',() =>{
    const productList = [{
        productId:1,
        repaymentType:"interest-only",
        interestRate:"1.2" 
    }];

    const expectedReturnedProducts = productList
    const currentMonthlyPayment = 200
    const loanValue = 220000

    expect(productSafetyCheck(currentMonthlyPayment,loanValue,productList)).toEqual(expectedReturnedProducts)
});

/*Given: That the interest-only mortgage that is 9%  is also returned
Test script pass: Criteria < 9 which is 0 to 9 rather than 0 to 10
*/
test('Interest-only product where monthly payment works out 9% difference',() =>{
    const productList = [{
        productId:1,
        repaymentType:"interest-only",
        interestRate:"1.2" 
    }];

    const expectedReturnedProducts = productList
    const currentMonthlyPayment = 200
    const loanValue = 218000

    expect(productSafetyCheck(currentMonthlyPayment,loanValue,productList)).toEqual(expectedReturnedProducts)
});

/*Given: That interest-mortgage that is greater than 10% is not returned
*/
test('Interest-only product where monthly payment works out 15% difference',() =>{
    const productList = [{
        productId:1,
        repaymentType:"interest-only",
        interestRate:"1.2" 
    }];

    const expectedReturnedProducts = productList
    const currentMonthlyPayment = 200
    const loanValue = 230000

    expect(productSafetyCheck(currentMonthlyPayment,loanValue,productList)).toEqual(expectedReturnedProducts)
});
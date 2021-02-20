const {productSafetyCheck} = require('./main')

test('Ensure Repayment Mortgages are not filtered',() =>{
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
})
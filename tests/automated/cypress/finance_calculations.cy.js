describe('Financial Calculations Validation', () => {
  it('Validates compound interest', () => {
    const principal = 1000;
    const rate = 0.05;
    const time = 12;

    const calculatedAmount = principal * Math.pow(1 + rate, time);
    const expectedAmount = 1795.86; // Expected value based on manual calculation

    expect(calculatedAmount.toFixed(2)).to.equal(expectedAmount.toFixed(2));
  });

  it('Validates balance after multiple transactions and maintenance fee', () => {
    const initialBalance = 5000;

    // Transactions performed
    const transactions = [+200, -150, +300, -50, -100];

    // Monthly maintenance fee
    const maintenanceFee = 0.02;

    // Calculate balance after transactions
    let finalBalance = initialBalance;
    transactions.forEach((amount) => {
      finalBalance += amount;
    });

    // Apply the maintenance fee
    finalBalance -= finalBalance * maintenanceFee;

    const expectedBalance = 5096; // Expected value based on manual calculation
    expect(finalBalance.toFixed(2)).to.equal(expectedBalance.toFixed(2));
  });
});

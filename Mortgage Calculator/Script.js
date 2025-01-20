function getInputValues() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
    const loanTerm = parseFloat(document.getElementById('loan-term').value) * 12;
  
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) || loanAmount <= 0 || loanTerm <= 0) {
      alert('Please enter valid positive numbers for all fields.');
      return null;
    }
  
    return { loanAmount, interestRate, loanTerm };
  }
  
  function calculateMonthlyPayment(loanAmount, interestRate, loanTerm) {
    return (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) /
      (Math.pow(1 + interestRate, loanTerm) - 1);
  }
  
  function calculateTotalPaymentAndInterest(monthlyPayment, loanTerm, loanAmount) {
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;
    return { totalPayment, totalInterest };
  }
  
  function updateResults(monthlyPayment, totalPayment, totalInterest) {
    document.getElementById('monthly-payment').textContent = `Monthly Payment: £${monthlyPayment.toFixed(2)}`;
    document.getElementById('total-payment').textContent = `Total Payment (Loan + Interest): £${totalPayment.toFixed(2)}`;
    document.getElementById('total-interest').textContent = `Total Interest: £${totalInterest.toFixed(2)}`;
    document.getElementById('interest-only').textContent = `Interest-Only Amount: £${totalInterest.toFixed(2)}`;
    document.getElementById('results').style.display = 'block';
  }
  
  function clearForm() {
    document.getElementById('loan-amount').value = '';
    document.getElementById('interest-rate').value = '';
    document.getElementById('loan-term').value = '';
    document.getElementById('loan-type').value = 'fixed';
    document.getElementById('results').style.display = 'none';
  }
  
  function calculateMortgage() {
    const inputValues = getInputValues();
    if (!inputValues) return;
  
    const { loanAmount, interestRate, loanTerm } = inputValues;
    const loanType = document.getElementById('loan-type').value;
  
    let monthlyPayment, totalPayment, totalInterest;
  
    if (loanType === 'fixed') {
      monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
      ({ totalPayment, totalInterest } = calculateTotalPaymentAndInterest(monthlyPayment, loanTerm, loanAmount));
    } else if (loanType === 'interest-only') {
      monthlyPayment = loanAmount * interestRate * 12; // Interest-only monthly payment
      totalPayment = loanAmount + (monthlyPayment * loanTerm / 12); // Principal + Interest
      totalInterest = totalPayment - loanAmount;
    }
  
    updateResults(monthlyPayment, totalPayment, totalInterest);
  }
  
// Function to set the default theme
function setDefaultTheme() {
    document.body.className = 'default-theme';  // Set the body class to 'default-theme'
}

// Function to set the dark mode theme
function setDarkMode() {
    document.body.className = 'dark-mode';  // Set the body class to 'dark-mode'
}

// Function to set the high contrast theme
function setHighContrast() {
    document.body.className = 'high-contrast';  // Set the body class to 'high-contrast'
}

// Function to set the cool tones theme
function setCoolTones() {
    document.body.className = 'cool-tones';  // Set the body class to 'cool-tones'
}

function changeFont() {
    const selectedFont = document.getElementById("font-select").value;
    document.body.style.fontFamily = selectedFont;
}

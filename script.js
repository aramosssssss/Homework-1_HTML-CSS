document.addEventListener('DOMContentLoaded', function () {
  const inputAmount = document.getElementById('first_name');
  const accAmount = document.getElementById('acc-p');
  const goalAmount = document.getElementById('goal-p');
  const addButtons = document.querySelectorAll('.button');

  let accumulatedAmount = 0;
  let goalAmountValue = 10000;

  inputAmount.addEventListener('input', function () {
    if (parseFloat(inputAmount.value) >= goalAmountValue) {
      inputAmount.value = goalAmountValue;
    }

    updateAmounts();
  });

  inputAmount.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const enteredAmount = parseFloat(inputAmount.value);
      if (
        !isNaN(enteredAmount) &&
        accumulatedAmount + enteredAmount <= goalAmountValue
      ) {
        accumulatedAmount += enteredAmount;
        updateAmounts();
        inputAmount.value = ''; // Очистка поля
      }
    }
  });

  addButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const amountToAdd = parseFloat(
        button.querySelector('.button__p-top').innerText.replace(/[^\d.]/g, '')
      );

      if (accumulatedAmount + amountToAdd <= goalAmountValue) {
        accumulatedAmount += amountToAdd;
        updateAmounts();
      }
    });
  });

  function updateAmounts() {
    accAmount.innerText = formatCurrency(accumulatedAmount);
    goalAmount.innerText = formatCurrency(goalAmountValue);
  }

  function formatCurrency(amount) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' ₴';
  }
});

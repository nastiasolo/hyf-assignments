const amountInput = document.querySelector("#amount");
const fromSelect = document.querySelector("#currency-from");
const toSelect = document.querySelector("#currency-to");
const resultOutput = document.querySelector(".result-output");
const form = document.querySelector(".calc-form");

let exchangeInfo = {};

async function getCurrencies() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();

    exchangeInfo = data.rates;
    const currencies = Object.keys(exchangeInfo);

    currencies.forEach((currency) => {
      const optionFrom = document.createElement("option");
      optionFrom.value = currency;
      optionFrom.textContent = currency;
      fromSelect.appendChild(optionFrom);

      const optionTo = document.createElement("option");
      optionTo.value = currency;
      optionTo.textContent = currency;
      toSelect.appendChild(optionTo);
    });

    fromSelect.value = "EUR";
    toSelect.value = "DKK";
  } catch (error) {
    console.error("Error getting data: ", error);
  }
}

function calculateResult() {
  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;

  if (isNaN(amount) || amount <= 0) {
    resultOutput.textContent = "0.00";
    return;
  }

  const rateFrom = exchangeInfo[fromCurrency];
  const rateTo = exchangeInfo[toCurrency];

  const result = (amount / rateFrom) * rateTo;

  resultOutput.textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
}

amountInput.addEventListener("input", function (e) {
  let value = e.target.value;

  if (value.includes(".")) {
    const parts = value.split(".");
    if (parts[1].length > 2) {
      e.target.value = parts[0] + "." + parts[1].slice(0, 2);
    }
  }
});

form.addEventListener("input", () => {
  calculateResult();
});

getCurrencies();

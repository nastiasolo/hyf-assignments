const fromSelect = document.querySelector("#currency-from");
const toSelect = document.querySelector("#currency-to");

async function getCurrencies() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();

    const currencies = Object.keys(data.rates);

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

getCurrencies();

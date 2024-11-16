const baseCurrency = 'RUB';
// заменила api потому что api из задания требует зарубежную карту
const API_URL = `https://v6.exchangerate-api.com/v6/3039bc93e4ce2d24ac86f496/latest/${baseCurrency}`;
const REFRESH_INTERVAL = 15 * 60 * 1000; 

async function fetchExchangeRates(currencies = ['USD', 'EUR', 'CNY', 'JPY', 'GBP', 'TRY']) {
  try {
    const response = await axios.get(`${API_URL}`);
    const rates = response.data.conversion_rates;

    return currencies.map((currency) => ({
      code: currency,
      rate: rates[currency] || 'N/A',
    }));
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return [];
  }
}

function updateCurrencyUI(rates) {
  const container = document.getElementById('currency-container');
  container.innerHTML = ''; 

  rates.forEach(({ code, rate }) => {
    const currencyRow = document.createElement('div');
    currencyRow.className = 'currency__row';

    currencyRow.innerHTML = `
      <h2>${code}:</h2>
      <p>${(1 / rate).toFixed(2)}</p>
    `;

    container.appendChild(currencyRow);
  });
}

async function initCurrencyWidget() {
  const rates = await fetchExchangeRates();
  updateCurrencyUI(rates);
}

initCurrencyWidget();
setInterval(initCurrencyWidget, REFRESH_INTERVAL);

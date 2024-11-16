const baseCurrency = 'RUB';
// заменила api потому что api из задания требует зарубежную карту
const API_URL = `https://v6.exchangerate-api.com/v6/3039bc93e4ce2d24ac86f496/latest/${baseCurrency}`;
const REFRESH_INTERVAL = 15 * 60 * 1000;

const fetchExchangeRates = async (currencies = ['USD', 'EUR', 'CNY', 'JPY', 'GBP', 'TRY']) => {
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

const updateCurrencyUI = (rates) => {
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

const initCurrencyWidget = async () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';

    try {
        const rates = await fetchExchangeRates();
        updateCurrencyUI(rates);
    } catch (err) {
        console.error("Ошибка при инициализации виджета:", err);
    } finally {
        const loader = document.getElementById('loader');
        loader.style.display = 'none';
    }
}

initCurrencyWidget();
setInterval(initCurrencyWidget, REFRESH_INTERVAL);

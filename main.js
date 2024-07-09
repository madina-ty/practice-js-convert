// object with rates of three currencies
const rates = {};

// elements for displaying exchange rates
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

// form elements, amount input, currency selection, result field
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

getCurrencies ();


// function of obtaining exchange rates and displaying then on the page
async function getCurrencies () {
  const response = await fetch(`https://www.cbr-xml-daily.ru/daily_json.js`);
  const data = await response.json();
  const result = await data;
  console.log(result);

  console.log(result.Valute.USD.Value);

  rates.USD = result.Valute.USD;
  rates.EUR = result.Valute.EUR;
  rates.GBP = result.Valute.GBP;

  console.log(rates);

  elementUSD.textContent = rates.USD.Value.toFixed(2);
  elementEUR.textContent = rates.EUR.Value.toFixed(2);
  elementGBP.textContent = rates.GBP.Value.toFixed(2);

// color for informer 
  if (rates.USD.Value > rates.USD.Previous) {
    elementUSD.classList.add('top');
  } else {
    elementUSD.classList.add('bottom');
  }

  if (rates.EUR.Value > rates.EUR.Previous) {
    elementEUR.classList.add('top');
  } else {
    elementEUR.classList.add('bottom');
  }

  if (rates.GBP.Value > rates.GBP.Previous) {
    elementGBP.classList.add('top');
  } else {
    elementGBP.classList.add('bottom');
  }
}

// listen to changes in the text field and select
input.oninput = convertValue;
select.oninput = convertValue;

// conversion function
function convertValue () {
     result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}


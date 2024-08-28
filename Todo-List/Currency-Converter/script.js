const BASE_URL = "https://v6.exchangerate-api.com/v6/f28ab25b566a69fc25e1183f/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input").value;
  if (amount === "" || amount < 1) {
    amount = 1;
    document.querySelector(".amount input").value = "1";
  }

  try {
    const response = await fetch(`${BASE_URL}${fromCurr.value}`);
    if (!response.ok) throw new Error("Network response was not ok");
    
    const data = await response.json();
    if (data.result !== "success") throw new Error("API response was not successful");

    let rate = data.conversion_rates[toCurr.value];
    let finalAmount = amount * rate;
    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    console.error("Error fetching the exchange rate:", error);
    msg.innerText = "Error fetching the exchange rate. Please try again later.";
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});



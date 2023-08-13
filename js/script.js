const dropList = document.querySelectorAll(".drop-list select");

// dynamically add all currencies to both drop-boxes
for(let i=0; i<dropList.length; i++)
{
    for(index in tmp_array)
    {
        let currency = tmp_array[index];
        
        // selecting USD by default as FROM currency and INR as TO currency
        let defaultCurrency;
        if(i == 0){
            defaultCurrency = (currency == "USD") ? "selected" : "";
        } 
        else if(i == 1){
            defaultCurrency = (currency == "INR") ? "selected" : "";
        }
        // build the command string for adding an item to drop-box
        let optionTag = `<option value="${currency}" ${defaultCurrency}>${currency}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
}

const exchangeButton = document.querySelector(".exchange-icon");

// action when we "click" exchange icon
exchangeButton.addEventListener("click", () =>{
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
});

const submitButton = document.querySelector("form button");

// action when we first "load" the webpage
window.addEventListener("load", () =>{
    getExchangeRates();
});

// action when we "click" submit button
submitButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRates();
});

const apiKey = "f5e716b67197b73b0a994b5b";
const fromCurrency = document.querySelector(".from-drop-list select");
const toCurrency = document.querySelector(".to-drop-list select");
const displayTextUp = document.querySelector(".exchange-rate-up");
const displayTextDown = document.querySelector(".exchange-rate-down");

function getExchangeRates()
{
    displayTextUp.innerText = "Getting exchange rates...";
    displayTextDown.innerText = "---";
    
    // typeof amount is object, hence get the number by using .value
    const amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if (amountVal === ""){
        alert("Please type an amount !");
        return false;
    }
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency.value}/${toCurrency.value}`;

    fetch(url).then(response => response.json().then(result =>{
        let exchangeRate = result.conversion_rate;
        let totalAmount = (amountVal * exchangeRate).toFixed(2);
         
        displayTextUp.innerText = `${amountVal} ${fromCurrency.value} =`;
        displayTextDown.innerText = `${totalAmount} ${toCurrency.value}`;
    }));    
};
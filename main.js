const Form = document.querySelector("#form");
const currencyinput = document.querySelector("#input");
const currencyFrom = document.querySelector("#from-currency");
const currencyTo = document.querySelector("#to-currency");
const currencyBtn = document.querySelector("#convert");
const result = document.querySelector("#resultContainer");

let pul = { UZS: 1 }; 

async function renderCurrency() {
    try {
        const res = await fetch("https://cbu.uz/uz/arkhiv-kursov-valyut/json/");
        const data = await res.json();

        data.forEach(item => {
            pul[item.Ccy] = Number(item.Rate);
        });

       
        if (!pul["USD"]) {
            pul["USD"] = 12900; 
        }

        console.log("Yangilangan kurslar:", pul); 
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

async function dollorBormi() {
    if (Object.keys(pul).length === 1) { 
        await renderCurrency();
    }

    const inputValue = Number(currencyinput.value.trim());
    const from = currencyFrom.value;
    const to = currencyTo.value;

    if (isNaN(inputValue) || inputValue <= 0) {
        result.innerHTML = `<p class="text-red-700 text-[30px]">Iltimos, miqdor kiriting</p>`;
        return;
    }

    if (!pul[from] || !pul[to]) {
        result.innerHTML = `<p class="text-red-700 text-[30px]">Valyuta noto‘g‘ri</p>`;
        return;
    }

    const uzsValue = inputValue * pul[from]; 
    const finalValue = uzsValue / pul[to]; 

    result.innerHTML = 
    `<p class="text-green-700 text-[30px]">${inputValue.toFixed(2)} ${from} = ${finalValue.toFixed(2)} ${to}</p>`;

    console.log(`${inputValue} ${from} => ${finalValue.toFixed(2)} ${to}`); 
}

renderCurrency();

currencyBtn.addEventListener("click", dollorBormi);

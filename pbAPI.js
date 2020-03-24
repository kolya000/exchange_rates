'use strict'

const exchangeRate = (function () {

    const URL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

    let Button = document.getElementById('button');

    let buyUSD;
    let buyEUR;
    let buyRUR;

    let saleUSD;
    let saleEUR;
    let saleRUR;

    const getRate = function () {
        return fetch(URL)
            .then(response => {
                if (response.ok) {
                    return response.json().then(currencyMas => {
                        buyСurrency(currencyMas);
                        saleСurrency(currencyMas);
                        buttonClick(currencyMas);
                    });
                }

                return response.json().then(err => console.log(err));
            })
    };


    const buyСurrency = function (currencyMas) {

        currencyMas.forEach(element => {
            if (element.ccy === 'USD') {
                buyUSD = element.buy;
            } else if (element.ccy === 'EUR') {
                buyEUR = element.buy;
            } else if (element.ccy === 'RUR') {
                buyRUR = element.buy;
            }
        })

        function exchangeRate() {
            let buy_usd = document.getElementById('buy_usd');
            let buy_eur = document.getElementById('buy_eur');
            let buy_rur = document.getElementById('buy_rur');

            buy_usd.innerHTML = `USD: ${buyUSD}`;
            buy_eur.innerHTML = `EUR: ${buyEUR}`;
            buy_rur.innerHTML = `RUR: ${buyRUR}`;
        }

        return [
            exchangeRate()
        ]
    };


    const saleСurrency = function (currencyMas) {

        currencyMas.forEach(element => {
            if (element.ccy === 'USD') {
                saleUSD = element.sale;
            } else if (element.ccy === 'EUR') {
                saleEUR = element.sale;
            } else if (element.ccy === 'RUR') {
                saleRUR = element.sale;
            }
        })

        function exchangeRate() {
            let sale_usd = document.getElementById('sale_usd');
            let sale_eur = document.getElementById('sale_eur');
            let sale_rur = document.getElementById('sale_rur');

            sale_usd.innerHTML = `USD: ${saleUSD}`;
            sale_eur.innerHTML = `EUR: ${saleEUR}`;
            sale_rur.innerHTML = `RUR: ${saleRUR}`;
        }

        return [
            exchangeRate()
        ]
    };


    function buttonClick(currencyMas) {
        Button.onclick = () => {

            let sale = document.getElementById('sale_input_select').value;
            let buy = document.getElementById('buy_input_select').value;

            let saleCount = document.getElementById('sale_input').value;
            let buyCount = document.getElementById('buy_readonly');


            currencyMas.forEach(element => {
                if (element.ccy === 'USD') {
                    buyUSD = element.buy;
                } else if (element.ccy === 'EUR') {
                    buyEUR = element.buy;
                } else if (element.ccy === 'RUR') {
                    buyRUR = element.buy;
                }
            })
            currencyMas.forEach(element => {
                if (element.ccy === 'USD') {
                    saleUSD = element.sale;
                } else if (element.ccy === 'EUR') {
                    saleEUR = element.sale;
                } else if (element.ccy === 'RUR') {
                    saleRUR = element.sale;
                }
            })
            

            if(sale === 'UAH'){
                UAHsale();
            } else if(sale === 'USD'){
                USDsale();
            } else if(sale === 'EUR'){
                EURsale();
            } else if(sale === 'RUR'){
                RURsale();
            }

            function UAHsale(){
                if(buy === 'UAH'){
                    uahBuyUAH();
                } else if(buy === 'USD'){
                    uahBuyUSD();
                } else if(buy === 'EUR'){
                    uahBuyEUR();
                } else if(buy === 'RUR'){
                    uahBuyRUR();
                }

                function uahBuyUAH(){
                    buyCount.value = saleCount;
                }

                function uahBuyUSD(){
                    buyCount.value = saleCount/buyUSD;
                }

                function uahBuyEUR(){
                    buyCount.value = saleCount/buyEUR;
                }

                function uahBuyRUR(){
                    buyCount.value = saleCount/buyRUR;
                }
            }

            function USDsale(){
                if(buy === 'UAH'){
                    usdBuyUAH();
                } else if(buy === 'USD'){
                    usdBuyUSD();
                } else if(buy === 'EUR'){
                    usdBuyEUR();
                } else if(buy === 'RUR'){
                    usdBuyRUR();
                }

                function usdBuyUAH(){
                    buyCount.value = saleCount * saleUSD;
                }

                function usdBuyUSD(){
                    buyCount.value = saleCount;
                }

                function usdBuyEUR(){
                   buyCount.value = (saleCount * saleUSD)/buyEUR;
                }

                function usdBuyRUR(){
                    buyCount.value = (saleCount * saleUSD)/buyRUR;
                }
            }

            function EURsale(){
                if(buy === 'UAH'){
                    eurBuyUAH();
                } else if(buy === 'USD'){
                    eurBuyUSD();
                } else if(buy === 'EUR'){
                    eurBuyEUR();
                } else if(buy === 'RUR'){
                    eurBuyRUR();
                }

                function eurBuyUAH(){
                    buyCount.value = saleCount * saleEUR;
                }

                function eurBuyUSD(){
                    buyCount.value = (saleCount * saleEUR)/buyUSD;
                }

                function eurBuyEUR(){
                    buyCount.value = saleCount;
                }

                function eurBuyRUR(){
                    buyCount.value = (saleCount * saleEUR)/buyRUR;
                }
            }

            function RURsale(){
                if(buy === 'UAH'){
                    rurBuyUAH();
                } else if(buy === 'USD'){
                    rurBuyUSD();
                } else if(buy === 'EUR'){
                    rurBuyEUR();
                } else if(buy === 'RUR'){
                    rurBuyRUR();
                }

                function rurBuyUAH(){
                    buyCount.value = saleCount * saleRUR;
                }

                function rurBuyUSD(){
                    buyCount.value = (saleCount * saleRUR)/buyUSD;
                }

                function rurBuyEUR(){
                    buyCount.value = (saleCount * saleRUR)/buyEUR;
                }

                function rurBuyRUR(){
                    buyCount.value = saleCount;
                }
            }
            
            // якщо буду переводити євро в доллари (переводжу євро в гривні а тоді гривні переводжу в доллари)
        }
    }


    return {
        getRate: getRate
    }

})();

exchangeRate.getRate();
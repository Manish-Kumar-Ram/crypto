


console.log("jai shree ganesh");
const coinswraper=document.querySelector('.top-coins-content');


window.addEventListener('load',async()=>{
    const exchangeRateInr=await getDataFromApi('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr');
    const response= await getDataFromApi('https://api.coingecko.com/api/v3/search/trending')
    showTrendingCoins(response.coins, exchangeRateInr.bitcoin.inr);
    

});

function showTrendingCoins(data, exchangeRateInr){
    data.forEach((coin) =>{
        const coins=document.createElement('div');
        coins.classList.add('coin');
        const img=document.createElement('img')
        img.classList.add('coin_img');
        img.src=coin.item.thumb;
        const rightdivtext=document.createElement('div');
        rightdivtext.classList.add('coin-right-text');
        const name=document.createElement('h3');
        name.classList.add('coin-name');
        name.innerHTML=coin.item.name + "( " + coin.item.symbol+ " )";
        name.style.color='white';

        const price=document.createElement('p')
        price.classList.add('coin-price');
        price.innerText="₹ " + getCoinpriceINR(coin.item.price_btc,exchangeRateInr);
        rightdivtext.append(name,price);
        coins.append(img,rightdivtext)
        // coins.append(img)
        coinswraper.appendChild(coins);
        // console.log(coin);
    })
}
function getCoinpriceINR(price_btc,exchangeRateInr){
    return Math.round(price_btc *exchangeRateInr *10000)/10000;

}
async function getDataFromApi(url){
    const response=await fetch(url);
    const resut=await response.json();
return resut;

}

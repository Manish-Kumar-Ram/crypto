const cryptochart=document.querySelector('#crypto-chart')
const currentURL=new URL(window.location.href);
// console.log(currentURL);
const coinimage=document.querySelector('.signle-crypto-details .left');
const coindetails=document.querySelector('.signle-crypto-details .right')
const params = new URLSearchParams(currentURL.search)
console.log(params);
 if(!params.has('id')){
window.location.href='search.html';
 }else{
 getDataFromApi(`https://api.coingecko.com/api/v3/coins/${params.get('id')}?localization=false&tickers=false&market_data=true&community_data=false&devloper_data=false&sparkline=false`
).then((response)=> {
    console.log(response);
    showDetails(response);
})

getDataFromApi(`https://api.coingecko.com/api/v3/coins/${params.get('id')}/market_chart?vs_currency=inr&days=2`).then((response)=>{
    console.log(response);
    showChart(response.prices);
})
  
 }

 
 function showDetails(obj){
const img=document.createElement('img');
img.src=obj.image.large;
coinimage.append(img)

const name=document.createElement('h3');
name.innerText=obj.name + "(" + obj.symbol + ")";
const desc=document.createElement('p');
desc.innerHTML=obj.description.en
coindetails.append(name,desc);
 }
 
 function showChart(data){
    const stamps=[];
    const priceINR=[];
    
    
  
    data.forEach((e)=>{
     const date_obj=new Date(e[0]);
    //  console.log(date_obj);
     let hrs=date_obj.getHours();
     if(hrs<10){
      hrs = '0'+ hrs;
     }
     let mint=date_obj.getMinutes();
     if(mint<10){
      mint= '0'+ mint;
     }
     stamps.push(`${hrs}:${mint}`);
     priceINR.push(e[1]);
   
    });
    const ctx=document.getElementById('crypto-chart').getContext('2d');
    const myChart=new Chart(ctx,{
        type:'line',
        data:{
            labels:stamps,
            datasets:[{
                label:'Price in INR',
                data:priceINR,
                backgroundColor:'rgba(255, 99, 132, 0.2)',
                borderColor:'rgba(255, 99, 132, 1)',
                borderWidth:1
            }]
        },
        options:{
            plugins:{
                legeng:{
                    display:false,
                },
            },
        },
    });

   }
async function getDataFromApi(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
} 
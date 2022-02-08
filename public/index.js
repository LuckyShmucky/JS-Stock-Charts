// async function main() {

//     const timeChartCanvas = document.querySelector('#time-chart');
//     const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
//     const averagePriceChartCanvas = document.querySelector('#average-price-chart');

//     let response = await fetch('https://api.twelvedata.com/time_series?symbol=ETH/BTC:Huobi,TRP:TSX,INFY:BSE&interval=30min&outputsize=12&apikey=demo&source=docs')
//     let data = await response.json()
//     console.log(data)

// }

const { GME, MSFT, DIS, BNTX } = mockData;

const stocks = [GME, MSFT, DIS, BNTX];

stocks.forEach(stock => stock.values.reverse())

async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    //console.log(stocks[0])
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock =>({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }
    });

    //console.log(stocks[0].values)

    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }




    function getHighestValue(values){
        let highest = values[0].high
        for(let i =1; i < values.length; i++){
            if(values[i].high > highest){
                highest = values[i].high
            }
        }
        console.log('highest' + highest)
        return highest;

    }

    new Chart (highestPriceChartCanvas.getContext('2d'),{
        type: 'bar', 
        data: {
        labels: stocks.map(stock => stock.meta.symbol),
        datasets: [{
           label: 'I could not figure out how to get the titles to display horizontally',
            data: stocks.map(stock=>(
                getHighestValue(stock.values)
            )),
             backgroundColor: stocks.map(stock =>(getColor(stock.meta.symbol))),
            backgroundColor: stocks.map(stock =>(getColor(stock.meta.symbol)))
                }] 
               
        }})

}
main()


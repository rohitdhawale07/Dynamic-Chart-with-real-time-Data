# Dynamic-Chart-with-real-time-Data
## Hosted Link:- https://rohitdhawale07.github.io/Dynamic-Chart-with-real-time-Data/

This is the project of creating a dynamic chart using real time data.
We used coingecko api becuase it updates its data every 45 sec which is the requirement of our project.
We used `https://api.coingecko.com/api/v3/coins/bitcoin` this API which updtes its data on every 45 seconds 
and bacuase of that we SetInterval of time 45000 ms to our data update function.
## HTML Code:-
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dynamic Chart</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <img src="data:image/png" width="100" height="100" alt="">
    <h1>Bitcoin Stock Price</h1>
    <p>Below chart shows us Bitcoin Price updating every <b>45 sec</b></p>
    <div class="container">
      <canvas id="myChart"></canvas>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <script src="./index.js"></script>
  </body>
</html>
```
We applied required styling to our page also
## CSS Code:-

```
.container {
  height: 400px;
  /* border: 2px solid black; */
  width: 70%;
  margin: auto;
  height: 100vh;
}
h1,
p {
  text-align: center;
}
p {
  width: 40%;
  margin: auto;
  background-color: rgb(231, 231, 231);
  /* margin-bottom: 2rem; */
}

img {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: auto;
}

```
 for updating a line chart with Bitcoin price data and maintaining the last 10 data points. 
 It fetches new data at regular intervals and refreshes the chart with the updated data.

Just a couple of things to note
Ensure that you have included the Chart.js library in your HTML file. You can include it like this:
It initializes variables and arrays to store the chart, timestamps, and Bitcoin price data.

The fetchData function is responsible for fetching data from the specified API endpoint, formatting it, and updating the chart.

It extracts Bitcoin price data from the API response and generates a timestamp representing the current time.

The new timestamp and price data are added to arrays, and these arrays are limited to retain only the last 10 data points to keep the chart concise.

If an existing chart instance exists (myChart), it is destroyed to ensure a fresh chart is drawn.

A new Chart.js line chart is created on the canvas (ctx) with the updated data, labels, and options.

The chart is initially rendered on page load, and then it's updated every 45 seconds using setInterval.

This code creates a real-time updating line chart that displays Bitcoin prices over time.

## JAVASCRIPT Code:-
```
const ctx = document.getElementById("myChart");
let myChart = null; 
const timestamps = []; 
const priceData = []; 

const fetchData = async () => {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/bitcoin`;
    const response = await fetch(url);
    const data = await response.json();
    const price = data.tickers.map((data) => data.last);

    const now = new Date();
    const hours = now.getHours()-12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const timestamp = `${hours}:${minutes}:${seconds}`;

    timestamps.push(timestamp);
    priceData.push(price);

    const maxDataPoints = 10;
    if (timestamps.length > maxDataPoints) {
      timestamps.shift();
      priceData.shift();
    }

    if (myChart) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: timestamps,
        datasets: [
          {
            label: "#Bitcoin Price in INR",
            data: priceData,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();

setInterval(fetchData, 45000);
```

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

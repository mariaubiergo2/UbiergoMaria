
const barCounter = [0,0,0,0];
let myTimer;

function askApi() {    
    //Proxy used: https://cors-anywhere.herokuapp.com/corsdemo
    fetch('https://cors-anywhere.herokuapp.com/https://demos.geprom.com/datos.php')
    .then(response => {
      return (response.json());
    })
    .then(data => {
      const jsonData = data;

      i = 0;
      allGreaterThan100 = 0;
      Object.keys(jsonData).forEach((key) => {
        barCounter[i] += jsonData[key];
        console.log(`${key}: ${jsonData[key]}`);
        if (barCounter[i]>=100){
          barCounter[i]=100;
          allGreaterThan100 +=1;
        }
        i+=1;
      });

      updateProgressBar('perrosProgressBar', barCounter[0], 'perrosCounter');
      updateProgressBar('gatosProgressBar', barCounter[1], 'gatosCounter');
      updateProgressBar('hamsterProgressBar', barCounter[2], 'hamsterCounter');
      updateProgressBar('conejoProgressBar', barCounter[3], 'conejoCounter');

      
      if (allGreaterThan100==4){
        setTimeout(() => {
          clearInterval(intervalId);
        });
      }
    })
    .catch(error => "(Try to request access to the proxy)"+console.error(error));
  }

  function updateProgressBar(progressBarName, newValue, counterName) {
    const progressBar = document.getElementById(progressBarName);
    progressBar.value = newValue;

    const counterText = document.getElementById(counterName);
    counterText.textContent = newValue;

    console.log("Progress bar value: "+progressBar.value);
  }
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 2 },
];
//Size of each piece
const data = [16, 16, 16, 16, 16, 16];
//background color for each piece
var pieColors = [
  "#ba55d3",
  "#ff00ff",
  "#9400d3",
  "#800080",
  "#c71585",
  "#da70d6",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [1, 2, 3, 4, 5, 6],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});

// // Elements
// const wheel = document.getElementById("wheel");
// const spinBtn = document.getElementById("spin-btn");
// const finalValue = document.getElementById("final-value");

// // Retrieve selected choices from localStorage
// let selectedChoices = JSON.parse(localStorage.getItem('selectedChoices')) || 6;

// // Variables for dynamic data
// let data = [];
// let pieColors = [];
// let rotationValues = [];

// // Function to generate dynamic wheel data
// function generateWheelData(choices) {
//   data = [];
//   pieColors = [];
//   rotationValues = [];
  
//   let degreePerChoice = 360 / choices;
//   let colorPalette = ["#8b35bc", "#b163da", "#ff6666", "#66b3ff", "#99ff99", "#ffcc66", "#ffb366", "#66ff66", "#ff9999", "#66ffcc"];
  
//   for (let i = 0; i < choices; i++) {
//     data.push(16); // Equal size for all segments
//     pieColors.push(colorPalette[i % colorPalette.length]); // Rotate through colors
    
//     let minDegree = i * degreePerChoice;
//     let maxDegree = (i + 1) * degreePerChoice - 1;
//     rotationValues.push({ minDegree, maxDegree, value: i + 1 });
//   }
// }

// // Initial wheel setup based on selected choices
// generateWheelData(selectedChoices);

// // Create chart
// let myChart = new Chart(wheel, {
//   plugins: [ChartDataLabels],
//   type: "pie",
//   data: {
//     labels: Array.from({length: selectedChoices}, (_, i) => `Option ${i + 1}`), // Dynamic labels
//     datasets: [{
//       backgroundColor: pieColors,
//       data: data,
//     }],
//   },
//   options: {
//     responsive: true,
//     animation: { duration: 0 },
//     plugins: {
//       tooltip: false,
//       legend: { display: false },
//       datalabels: {
//         color: "#ffffff",
//         formatter: (_, context) => context.chart.data.labels[context.dataIndex],
//         font: { size: 24 },
//       },
//     },
//   },
// });

// // Value generator
// const valueGenerator = (angleValue) => {
//   for (let i of rotationValues) {
//     if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
//       finalValue.innerHTML = `<p>Option: ${i.value}</p>`;
//       spinBtn.disabled = false;
//       confettiExplosion(); // Trigger confetti when a value is found
//       break;
//     }
//   }
// };

// // Confetti explosion when result is displayed
// function confettiExplosion() {
//   confetti({
//     particleCount: 100,
//     spread: 70,
//     origin: { y: 0.6 }
//   });
// }

// // Spinner count
// let count = 0;
// let resultValue = 101;

// // Spin wheel logic
// spinBtn.addEventListener("click", () => {
//   spinBtn.disabled = true;
//   finalValue.innerHTML = `<p>Good Luck!</p>`;
//   let randomDegree = Math.floor(Math.random() * 360);
//   let rotationInterval = setInterval(() => {
//     myChart.options.rotation += resultValue;
//     myChart.update();
    
//     if (myChart.options.rotation >= 360) {
//       count++;
//       resultValue -= 5;
//       myChart.options.rotation = 0;
//     } else if (count > 15 && myChart.options.rotation === randomDegree) {
//       valueGenerator(randomDegree);
//       clearInterval(rotationInterval);
//       resultValue = 101;
//       count = 0;
//     }
//   }, 10);
// });

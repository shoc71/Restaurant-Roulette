// Elements
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

// Retrieve selected choices from localStorage
let selectedChoices = JSON.parse(localStorage.getItem('selectedChoices')) || 6;

// Variables for dynamic data
let data = [];
let pieColors = [];
let rotationValues = [];

// Function to generate dynamic wheel data
function generateWheelData(choices) {
  data = [];
  pieColors = [];
  rotationValues = [];
  
  let degreePerChoice = 360 / choices;
  let colorPalette = ["#8b35bc", "#b163da", "#ff6666", "#66b3ff", "#99ff99", "#ffcc66", "#ffb366", "#66ff66", "#ff9999", "#66ffcc"];
  
  for (let i = 0; i < choices; i++) {
    data.push(16); // Equal size for all segments
    pieColors.push(colorPalette[i % colorPalette.length]); // Rotate through colors
    
    let minDegree = i * degreePerChoice;
    let maxDegree = (i + 1) * degreePerChoice - 1;
    rotationValues.push({ minDegree, maxDegree, value: i + 1 });
  }
}

// Initial wheel setup based on selected choices
generateWheelData(selectedChoices);

// Create chart
let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: Array.from({length: selectedChoices}, (_, i) => `Option ${i + 1}`), // Dynamic labels
    datasets: [{
      backgroundColor: pieColors,
      data: data,
    }],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

// Value generator
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Option: ${i.value}</p>`;
      spinBtn.disabled = false;
      confettiExplosion(); // Trigger confetti when a value is found
      break;
    }
  }
};

// Confetti explosion when result is displayed
function confettiExplosion() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Spinner count
let count = 0;
let resultValue = 101;

// Spin wheel logic
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * 360);
  let rotationInterval = setInterval(() => {
    myChart.options.rotation += resultValue;
    myChart.update();
    
    if (myChart.options.rotation >= 360) {
      count++;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation === randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      resultValue = 101;
      count = 0;
    }
  }, 10);
});

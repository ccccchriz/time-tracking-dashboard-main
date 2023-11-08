const timeframes = ["daily", "weekly", "monthly"];

const categories = ["work", "play", "study", "exercise", "social", "self-care"];

let data;

fetch("./data.json")
  .then((res) => res.json())
  .then((json) => (data = json))
  .then(() => showData());

const showData = (timeframeIndex = 0) => {
  if (data == undefined) {
    return;
  }
  const timeframe = timeframes[timeframeIndex];

  // Add dashboard__selected class to the button which timeframe is currently selected
  timeframes.forEach((name, index) => {
    if (index == timeframeIndex)
      document.getElementById(name).classList.add("dashboard__selected");
    else document.getElementById(name).classList.remove("dashboard__selected");
  });

  // Update the Last [Day, Week, Month] text to display the correct thing
  [...document.getElementsByClassName("card__timeframe")].forEach((element) => {
    const timeframeSingle = ["Day", "Week", "Month"][timeframeIndex];
    element.textContent = `Last ${timeframeSingle} - `;
  });

  // Update the numbers to display the selected timeframe
  categories.forEach((category, index) => {
    const values = data[index].timeframes[timeframe];
    document.getElementById(`num_${category}`).textContent = values.current;
    document.getElementById(`num_prev_${category}`).textContent =
      values.previous;
  });
};

// Add function to buttons
timeframes.forEach((name, index) => {
  document
    .getElementById(name)
    .addEventListener("click", () => showData(index));
});

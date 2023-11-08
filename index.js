let data;

fetch("./data.json")
  .then((res) => res.json())
  .then((json) => (data = json))
  .then((d) => console.log(d))
  .then(() => showData(0));

const showData = (timeframeIndex) => {
  if (data == undefined) {
    return;
  }
  const timeframe = ["daily", "weekly", "monthly"][timeframeIndex];

  const categories = [
    "work",
    "play",
    "study",
    "exercise",
    "social",
    "self-care",
  ];

  categories.forEach((category, index) => {
    const values = data[index].timeframes[timeframe];
    document.getElementById(`num_${category}`).textContent = values.current;
    document.getElementById(`num_prev_${category}`).textContent =
      values.previous;
  });
};

document.getElementById("daily").addEventListener("click", () => showData(0));
document.getElementById("weekly").addEventListener("click", () => showData(1));
document.getElementById("monthly").addEventListener("click", () => showData(2));

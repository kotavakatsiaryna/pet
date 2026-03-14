const budget = 2500;

if (budget >= 3000) {
  console.log("Luxury trip - 5 star hotel");
} else if (budget >= 1800) {
  console.log("Standard trip - 4 star hotel");
} else if (budget >= 1000) {
  console.log("Budget trip - hostel");
} else {
  console.log("Go work and earn more!");
}

// nested
let snowForecast = "heavy";
let temperature = -5;

if (snowForecast === "heavy") {
  if (temperature <= 0) {
    console.log("Perfect winter conditions!");
  } else {
    console.log("Slippery");
  }
} else {
  console.log("No snow :(");
}

// SWITCH

let season = "winter"; // winter, summer, spring, fall

switch (season) {
  case "winter":
    console.log("Winter: Skiing season!");
    break;
  case "summer":
    console.log("Summer: Sea season!");
    break;
  case "spring":
  case "fall":
    console.log("Short city breaks season!");
    break;
  default:
    console.log("Invalid season");
}

let cookingSkill = "intermediate";

switch (cookingSkill) {
  case "beginner":
    console.log("Eggs, pasta, sandwiches");
    break;
  case "intermediate":
  case "advanced":
    console.log("Steak, risotto, chicken curry, desserts");
    break;
  case "expert":
    console.log("Molecular gastronomy");
    break;
  default:
    console.log("Please select cooking skill level");
}

// ternary operator
const groupSize = 4;
const isGroupTrip = groupSize > 1 ? true : false;
console.log("Group trip?", isGroupTrip);

const hotelRating = budget > 2000 ? "4-5 stars" : "3 stars or hostel";
console.log("Hotel level:", hotelRating);

// template operator
const dish = "pasta"
console.log(`Cook ${dish} for ${2 + 5} minutes`);

// LOOPS

console.log("Ski Checklist:");
const packingList = ["helmet", "goggles", "gloves", "jacket", "boots", "pass"];
for (let i = 0; i < packingList.length; i++) {
  console.log(`${i + 1}. ${packingList[i]}`);
}

// 5.2. While Loop - Counting down to departure
console.log("Countdown to departure:");
let daysUntilTrip = 30;
while (daysUntilTrip > 0) {
  if (daysUntilTrip <= 7) {
    console.log(`${daysUntilTrip} days - Final preparations!`);
  } else if (daysUntilTrip <= 14) {
    console.log(`${daysUntilTrip} days - Book aparts`);
  }
  daysUntilTrip -= 7; // updated weekly
}

// executes at least once
console.log("Weather check:");
let forecastDay = 0;
do {
  console.log(`Day ${forecastDay + 1} forecast: ${snowForecast}`);
  forecastDay++;
} while (forecastDay < 3);

// for ... of
console.log("Daily Schedule:");
const dailyActivities = ["ski lessons", "lunch", "free skiing", "apres-ski"];
for (const activity of dailyActivities) {
  console.log(`• ${activity}`);
}

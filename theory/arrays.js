// Create an array
const favouriteMovies = ["Inception", "Interstellar", "The Matrix"];
console.log("Favourite movies:", favouriteMovies);

const watchlist = [];
watchlist.push("Oppenheimer");
watchlist.push("Tenet");
console.log("Watchlist:", watchlist);

// Adding and removing elements
watchlist.push("Blade Runner 2049");
console.log("After push:", watchlist);

const removedMovie = watchlist.pop(); // returns removed element
console.log("Removed (pop):", removedMovie);
console.log("After pop:", watchlist);

watchlist.unshift("Arrival");
console.log("After unshift:", watchlist);

const firstRemoved = watchlist.shift();
console.log("Removed (shift):", firstRemoved);
console.log("After shift:", watchlist);

// search within array
const searchTitle = "Inception";

const inceptionIndex = favouriteMovies.indexOf(searchTitle);
console.log(inceptionIndex);

const hasMatrix = favouriteMovies.includes("The Matrix");
console.log("Has Matrix?", hasMatrix);

// split and join
const movieString = favouriteMovies.join(" | ");
console.log("As string:", movieString);

const backToArray = movieString.split(" | ");
console.log("Back to array:", backToArray);

// Iterating
for (let i = 0; i < favouriteMovies.length; i++) {
  console.log(`Movie #${i + 1}: ${favouriteMovies[i]}`);
}

for (const movie of favouriteMovies) {
  console.log("for...of movie:", movie);
}

favouriteMovies.forEach((movie, index) => {
  console.log(`forEach [${index}]: ${movie}`);
});

// Copy array
const allMovies = ["Inception", "Dune", "Avatar", "Titanic", "Gladiator"];

// slice: does NOT modify the original
const top3 = allMovies.slice(0, 3);
console.log("All movies:", allMovies);
console.log("Top 3 (slice):", top3);

// splice: DOES modify the original
const removed = allMovies.splice(1, 2); // from index 1, remove 2 items
console.log("After splice, allMovies:", allMovies);
console.log("Removed by splice:", removed);

// map, filter, reduce
const movieDurations = [148, 169, 136, 152];

// map: iterate -> transform -> new array
const durationsInHours = movieDurations.map((minutes) => (minutes / 60).toFixed(1));
console.log("Durations (min):", movieDurations);
console.log("Durations (hours, map):", durationsInHours);

// filter: iterate -> filter -> new array
const longMovies = movieDurations.filter((minutes) => minutes > 150);
console.log("Movies > 150min (filter):", longMovies);

// reduce: iterate -> boilerplate -> ONE VALUE
const totalMinutes = movieDurations.reduce((sum, minutes) => sum + minutes, 0);
console.log("Total watch time (min, reduce):", totalMinutes);

// destructuring
const moviePair = ["Inception", "Interstellar"];
const [firstMovie, secondMovie] = moviePair;

console.log("First from pair:", firstMovie);
console.log("Second from pair:", secondMovie);

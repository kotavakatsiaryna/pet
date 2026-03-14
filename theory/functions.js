// function declaration

// hoisted - can call before defining
console.log(cookBreakfast());

function cookBreakfast() {
  return "Scrambled eggs with toast";
}

// function expression - NOT HOISTED
// console.log(makeSalad(["tomato", "cucumber"])); // WILL NOT WORK

const makeSalad = function(ingredients) {
  return `Salad with ${ingredients.join(', ')}`;
};

console.log(makeSalad(["tomato", "cucumber", "onion"]));

// arrow functions

// 1 parameter
const greet = name => `Hello Chef ${name}!`;

// several params
const bakeCake = (flour, sugar) => `${flour}g + ${sugar}g cake`;

// No parameters
const startCooking = () => "Oven preheated";

// several lines
const complexRecipe = (main, side) => {
  let prepTime = 30;
  return `${main} + ${side} (${prepTime}min)`;
};

console.log(greet('Kate'));
console.log(bakeCake(100, 50));
console.log(startCooking());
console.log(complexRecipe('beef', 'potatoes'));

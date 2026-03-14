// Variables & Naming

// let - can change
let userName = "Kate";
let userAge = 30;

// reassign
userAge = 31;

// can't reassign
const jobTitle = "QA";
// companyName = "CEO" // - error

// old style don't use!!
var randomNumber = 5;
randomNumber = 9;

console.log("User:", userName, "Age:", userAge, "Job:", jobTitle);
console.log("Random number:", randomNumber);


// Data Types

let testsCount = 5;
let passRate = 92.5;

let projectName = "JS Fundamentals";
let description = `Learning JavaScript for test automation`;

let isAutomationEngineer = true;
let ifKnowsJS = false;

// undefined - declared but not assigned
let nextTopic;
console.log("nextTopic is:", nextTopic, "type:", typeof nextTopic);

// null - intentional 'no value'
let deprecatedFeature = null;
console.log("deprecatedFeature is:", deprecatedFeature, "type:", typeof deprecatedFeature);

// BigInt
const bigNumber = 9007199254740991n;

console.log("Number:", testsCount, "type:", typeof testsCount);
console.log("String:", projectName, "type:", typeof projectName);
console.log("Boolean:", isAutomationEngineer, "type:", typeof isAutomationEngineer);
console.log("BigInt type:", typeof bigNumber);

// Reference Types

// Object
const user = {
  name: "Kate",
  role: "QA Automation Engineer",
  yearsOfExperience: 6,
  isRemote: true,
};

// object properties - can be mutated
user.yearsOfExperience += 1;

console.log("User object:", user);

// Array
const features = [
  "Product list page",
  "Product details page",
  "Cart",
  "Sign In",
  "Sign Up",
];

features.push("Search");
console.log("App features:", features);


// == vs ===

const numberFive = 5;
const stringFive = "5";

// type coercion
console.log(numberFive == stringFive); // true

// checks value AND type
console.log(numberFive === stringFive); // false


console.log("0 == false:", 0 == false);   // true - converts types
console.log("0 === false:", 0 === false); // false - different types
console.log("null == undefined:", null == undefined);   // true - special case
console.log("null === undefined:", null === undefined); // false

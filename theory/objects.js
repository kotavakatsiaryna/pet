// create objects
const user = {
  name: "Kate",
  age: 18,
  city: "Minsk",
  isPremium: true,
};

console.log("User object:", user);

const emptyUser = {};
emptyUser.name = "Alex";
emptyUser.age = 28;
console.log("Empty user filled later:", emptyUser);

// access and update properties
console.log("Name (dot):", user.name);
console.log("City (bracket):", user["city"]);

// update existing
user.age = 31;
user.country = "Belarus"; // add new
console.log("Updated user:", user);

// delete
delete user.isPremium;
console.log("After delete isPremium:", user);

// looping over
const stats = {
  posts: 12,
  followers: 340,
  following: 180,
};

for (const key in stats) {
  console.log(`${key}: ${stats[key]}`);
}

// Object.keys / values / entries
const keys = Object.keys(stats);
const values = Object.values(stats);
const entries = Object.entries(stats);

console.log("Keys:", keys);
console.log("Values:", values);
console.log("Entries:", entries);

Object.entries(stats).forEach(([key, value]) => {
  console.log(`entry: ${key} => ${value}`);
});

// destructuring
const movie = {
  title: "Inception",
  year: 2010,
  rating: 9.0,
  director: "Christopher Nolan",
};

const { title, year } = movie;
console.log("Title:", title);
console.log("Year:", year);

// copy
const baseUser = { name: "Kate", role: "QA" };

// shallow copy with spread
const adminUser = { ...baseUser, role: "Admin", isAdmin: true };

console.log("Base user:", baseUser);
console.log("Admin user:", adminUser);

// deep copy with stringify
const originalUser = {
  name: "Kate",
  role: "QA",
  settings: {
    theme: "dark",
    notifications: true,
  },
};

// copy
const copiedUser = JSON.parse(JSON.stringify(originalUser));

copiedUser.name = "Alex";
copiedUser.settings.theme = "light";

console.log("Original user:", originalUser);
console.log("Copied user:", copiedUser);

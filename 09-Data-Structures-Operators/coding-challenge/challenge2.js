// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    ["Burki", "Schulz", "Hummels", "Akanji", "Hakimi", "Weigl", "Witsel", "Hazard", "Brandt", "Sancho", "Gotze"],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// Step 1
console.log(`------STEP 1 ------`);
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

// Step 2
console.log(`------STEP 2 ------`);

let sum = 0;
const oddsValueArray = Object.values(game.odds);
for (const odd of oddsValueArray) {
  sum += odd;
}

const average = sum / oddsValueArray.length;
console.log(average);

//option 2 - method for getting array
// const oddsArray = Object.values(game.odds);

// const calcAverage = () => {
//   let sum = 0;
//   for (let i = 0; i < oddsArray.length; i++) {
//     sum += oddsArray[i];
//   }
//   const oddsAvg = sum / oddsArray.length;
//   console.log(oddsAvg);
//   return oddsAvg;
// };

// calcAverage();

// Step 3
console.log(`------STEP 3 ------`);
for (const [team, odd] of Object.entries(game.odds)) {
  const teamName = team === "x" ? "draw" : `victory ${game[team]}`;
  console.log(`Odds of ${teamName}: ${odd}`);
}

// Bonus
const scorers = {
  Garby: 1,
  Hummels: 1,
  Lewandoski: 2,
};

const arrayObj = Object.entries(game);
console.log(arrayObj);
const objMap = new Map(arrayObj);
console.log(...objMap);

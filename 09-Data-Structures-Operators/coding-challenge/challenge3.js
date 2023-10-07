///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);

//step 1 ----
console.log("---Step 1: create a set of unique events");
const events = [...gameEvents.values()];
const gameSet = new Set(events);
console.log(events);
console.log(gameSet);

//step 2 ----
console.log("---Step 2: remove yellow card....done");
gameSet.delete(64);
console.log(gameSet);

//step 3 ----
console.log("---Step 3: print the following:");
//option 1 to calcuate game time and average
// const times = [...gameEvents.keys()];
// console.log(`An event happened, on average, every ${times[times.length - 1] / gameEvents.size} minutes`);

//option 2 to calculate game time and average
const time = [...gameEvents.keys()].pop();
console.log(`An event happened, on average, every ${time / gameEvents.size} minutes`);

//step 4 ----
console.log("---Step 4: print the half of game each event occurred");
for (const [time, event] of gameEvents) {
  time <= 45 ? console.log(`[FIRST HALF] ${time} ${event}`) : console.log(`[SECOND HALF] ${time} ${event}`);
}

const myName = "Brian Miner ";
console.log(myName.indexOf("r"));
console.log(myName.slice(6, 8));
console.log(myName.substring(6));
console.log(myName.trim());

const message = "I have two cats and they are bad cats.";
console.log(message);
console.log(message.replaceAll("cats", "dogs"));

const bio = "Brian Miner is a petroleum engineer transitioning to a software engineer";
console.log(bio);
const bioArray = bio.split(" ");
console.log(bioArray);
//spread the array to create variables
const [firstName, lastName, ...leftoverArray] = [...bioArray];
console.log(firstName);
console.log(lastName);
console.log(leftoverArray);

const greeting = ["Hello", "Mr", leftoverArray].join(" ");
console.log(greeting);
console.log(typeof greeting);

const newName = "sam smith";
console.log(newName.capitalize);

const number = 45;
const str1 = String(number);
const str2 = number.toString();
const str3 = number + "";
console.log(str1, str2, str3);
console.log(typeof str1, typeof str2, typeof str3);

// create secretNumber
var secretNumber = 4;

// ask user for guess
var guess = prompt("Guess a number");
alert(guess);

//check if guess is right
if (Number(guess) === secretNumber) {
	console.log("YOU GOT IT RIGHT!");
} else if (Number(guess) > secretNumber) {
	console.log("Too high. Guess again.");
} else {
	console.log("Too low. Guess again.");
}

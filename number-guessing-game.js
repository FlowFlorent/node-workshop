var prompt = require("prompt");

function numberGuessing(number, guessArray){

    //Base case
    var number = number || Math.floor(Math.random()*100 + 1);
    var guessArray = guessArray || [];

    //Exit condition
    if (guessArray.length === 4){
        console.log("Your guesses were: ", guessArray, "You suck.");
        console.log("The number was: ", number);
        return;
    }
    prompt.get('guess', function(err, result){
        if(err){
            console.log(err);
        } else {
            //Checks for past similar guesses
            if (guessArray.indexOf(result.guess) !== -1){
                console.log("You already guessed that number idiot! Try again.")
                numberGuessing(number, guessArray);
            }
            //If no similar guesses
            else {
                guessArray.push(result.guess);
                if(number === parseInt(result.guess)){
                    console.log("Congrats you guessed the right number!");
                    console.log("Your guesses were: ", guessArray);
                    return;
                }
                else if (number < result.guess){
                    console.log("Guess a lower number.");
                    numberGuessing(number, guessArray);
                }
                else {
                    console.log("Guess a higher number.");
                    numberGuessing(number, guessArray);
                }
            }
        }
    });
}

numberGuessing();

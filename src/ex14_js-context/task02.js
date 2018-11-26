function Hangman(word){
    let luckyLatters = [];
    let secretWord = word;
    let errorLatters = [];
    let maxErrorCount = 6;
    
    this.guess = function (letter){
        if (secretWord.includes(letter)){
            luckyLatters.push(letter);
            if(luckyLatters.length>=maxErrorCount.length){
                return this.getGuessedString() +" \| + YOU WON!!!!!";
            }
            return this.getGuessedString();
        }else{
            errorLatters.push(letter);
            if(errorLatters.length>=maxErrorCount.length){
                return "GAME OVER!!!!!"
            }
            return "wrong letter, errors left " + this.getErrorsLeft() + " \| " + this.getWrongSymbols();
        }
    }
    this.getGuessedString = function(){
        var re = new RegExp('[^' + luckyLatters + ']', 'gi');
        return secretWord.replace(re, "_");
    }
    this.getErrorsLeft = function(){
        return maxErrorCount - errorLatters.length;
    }
    this.getWrongSymbols = function(){
        return errorLatters;
    }
    this.startAgain = function(newWord){
        luckyLatters = [];
        secretWord = newWord;
        errorLatters = [];
    }
}
var hangman = new Hangman('webpurple');

hangman.guess('w'); // "w________"
hangman.guess('e'); // "we______e"
hangman.guess('a'); // "wrong letter, errors left 5 | a"
hangman.guess('p'); // "we_p__p_e"
hangman.guess('k'); // "wrong letter, errors left 4 | a,k"
hangman.getGuessedString(); // we_p__p_e
hangman.getErrorsLeft(); // 4
hangman.getWrongSymbols(); // [a,k]

// hangman.startAgain('craftycat')
// hangman.guess('w'); // "w________"
// hangman.guess('e'); // "we______e"
// hangman.guess('a'); // "wrong letter, errors left 5 | a"
// hangman.guess('p'); // "we_p__p_e"
// hangman.guess('k'); // "wrong letter, errors left 4 | a,k"

//   .guess(w) // "w________"
//   .getStatus(); // "w_______ | errors left 6"

// hangman.guess('b') // "webp___p_e"
//   .guess('l') // "webp__ple"
//   .getErrorsLeft() // 4
//   .getWrongSymbols() // [a,k]
//   .guess('u') // "webpu_ple"
//   .guess('r'); // "webpurple | You won!"
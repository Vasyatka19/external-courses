function Hangman(word){
    let luckyLatters = [];
    let secretWord = word;
    let errorLatters = [];
    let maxErrorCount = 6;
    
    this.guess = function (letter){
        if(typeof letter !== 'string' || letter.length !== 1 || errorLatters.length>=maxErrorCount){
            console.log("Некорректно введены данные или игра окончена!");
        }else{
            if (secretWord.includes(letter)){
                luckyLatters.push(letter);
                let result = secretWord.replace(new RegExp('[^' + luckyLatters + ']', 'gi'), "_");
                if(!result.includes("_")){
                    result += " \| YOU WON!!!!!";
                    console.log(result);
                    return this;
                }
                console.log(result);
            }else{
                if(errorLatters.length>=maxErrorCount){
                    console.log("GAME OVER!!!!!");
                }else{
                    errorLatters.push(letter);
                    console.log("wrong letter, errors left " + (maxErrorCount - errorLatters.length) + " \| " + errorLatters);
                }
            }
        }
         return this;
    }
    this.getGuessedString = function(){
        console.log(secretWord.replace(new RegExp('[^' + luckyLatters + ']', 'gi'), "_"));
        return this;
    }
    this.getErrorsLeft = function(){
        console.log(maxErrorCount - errorLatters.length + "");
        return this;
    }
    this.getWrongSymbols = function(){
        console.log(errorLatters + "");
        return this;
    }
    this.startAgain = function(newWord){
        luckyLatters = [];
        secretWord = newWord;
        errorLatters = [];
        return this;
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

hangman.guess('b') // "webp___p_e"
  .guess('l') // "webp__ple"
  .getErrorsLeft() // 4
  .getWrongSymbols() // [a,k]
  .guess('u') // "webpu_ple"
  .guess('r'); // "webpurple | You won!"

  hangman.startAgain('craftyCat')
  .guess('c') // "w________"
const game = new BaseballGame();

class Assignment8 {
    constructor() {
        this.game = game;
        this.newButton = document.getElementById('new');
        this.keyDisplay = document.getElementById('key');
        this.guessDisplay = document.getElementById('guess');
        this.statDisplay = document.getElementById('tbody-stat');
        this.currentGuess = ''; 

        this.newButton.addEventListener('click', () => this.handleNewButtonClick());
        
        const guessButtons = document.querySelectorAll('.digit');
        guessButtons.forEach(button => {
            button.addEventListener('click', event => this.handleGuessButtonClick(event.target));
        });

        this.updateSecretKeyDisplay(this.game.secretKey);
    }

    updateSecretKeyDisplay(key) {
        this.keyDisplay.textContent = key;
    }

    updateGuessDisplay(guess) {
        const formattedGuess = guess.split('').join(', ');
        this.guessDisplay.textContent = formattedGuess;
    }

    updateStatDisplay(guess, strikes, balls) {
        const guessArray = guess.split('');
        const guessString = guessArray.join(',');
    
        const row = `<tr><td>${guessString}</td><td>${balls}</td><td>${strikes}</td></tr>`;
    
        this.statDisplay.insertAdjacentHTML('beforeend', row);
    }
    

    handleNewButtonClick() {
        this.game.secretKey = this.game.generateSecretKey();
        this.updateSecretKeyDisplay(this.game.secretKey);
        this.updateGuessDisplay(''); // Clear guess display
        this.statDisplay.innerHTML = ''; // Clear statistics display
        this.currentGuess = ''; // Reset current guess

        // Enable guess buttons
        const guessButtons = document.querySelectorAll('.digit');
        guessButtons.forEach(button => {
            button.disabled = false;
        });
    }

    // Method to handle guess button click
    handleGuessButtonClick(button) {
        const digit = button.textContent;
        this.currentGuess += digit; 

        this.updateGuessDisplay(this.currentGuess);

        button.disabled = true;

        // Check if three numbers are guessed
        if (this.currentGuess.length === 3) {
            let strikes = 0;
            let balls = 0;

            // Iterate through each digit of the guess
            for (let i = 0; i < this.currentGuess.length; i++) {
                const guessedDigit = this.currentGuess[i];  
                const sanitizedSecretKey = this.game.secretKey.replace(/,/g, ''); 
            
                // Check for strikes
                if (guessedDigit === sanitizedSecretKey[i]) {
                    strikes++;
                }
                // Check for balls
                else if (sanitizedSecretKey.includes(guessedDigit)) {
                    balls++;
                }
            }
            

            // Update the statistics display with the current guess
            this.updateStatDisplay(this.currentGuess, strikes, balls);

            // Check if the guess is correct
            if (strikes === 3) {
                alert(`Strike Out - The key was "${this.game.secretKey}". Press "New" to play again.`);
                this.handleNewButtonClick(); 
            }

            // Clear current guess after displaying in the table
            this.currentGuess = '';

            // Re-enable the number buttons
            const guessButtons = document.querySelectorAll('.digit');
            guessButtons.forEach(button => {
                button.disabled = false;
            });
        }
    }


}

// Instantiate the Assignment8 class when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Assignment8();
});

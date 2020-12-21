'use strict';


// Selecting Element

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting elements
let scores, currentScore, activePlayer, playing;

const init = function() {
        scores = [0, 0];
        currentScore = 0;
        activePlayer = 0;
        playing = true;
    // change the score
        score0El.textContent = 0;
        score1El.textContent = 0; 
        current0El.textContent = 0; 
        current1El.textContent = 0;
        diceEl.classList.add('hidden');
        player0El.classList.remove('player--winner');
        player1El.classList.remove('player--winner');
        player0El.classList.add('player--active');
        player1El.classList.remove('player--active');
}
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active'); // it will remove if its there because the player has been changed
    player1El.classList.toggle('player--active'); // and just have only one in each player elements which means activePlayer || player--0 or player--1
}

// Rolling the dice
btnRoll.addEventListener('click', function() {
    /**
     *  1. Generate random dice number 
     *  2. display the dice 
     *  3. check the number of dice:
     * * if the number is 1 = switch player : 
     * if not add dice to the current score
     * * QUICK NOTES
     * We can actually manipulate the src attrributes inside the html 
     * We ned to make the outside variables to the current score 
     * the variables must outside because if it inside the handler function
     * * it will not update the score number 
     */
    // 1
    if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2 
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
    // 3
        if (dice !== 1) {
        // add to the current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
        // switch the player
        switchPlayer();
        }
    }
});

// holding the score 
btnHold.addEventListener('click', function() {
    if (playing) {
        // 1 add a current score to active player'score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2 check if the score >= 100
        if (scores[activePlayer] >= 100) {
            // finish the game  
            playing = false;   
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);



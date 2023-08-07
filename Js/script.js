class Memorama{

    constructor() {

        this.canPlay = false;

        this.card1 = null;
        this.card2 = null;

        this.availableImages = [1, 6, 7, 5, 3, 8, 4];
        this.orderForThisRound = [];
        this.cards = Array.from( document.querySelectorAll(".board-game figure") );
        this.maxPairNumber = this.availableImages.length;

        this.scorePlayer1 = 0;
        this.scorePlayer2 = 0;
        this.scoreElementPlayer1 = document.getElementById("score-player1");
        this.scoreElementPlayer2 = document.getElementById("score-player2");
        this.player1Button = document.getElementById("player1-button");
        this.player2Button = document.getElementById("player2-button");
        this.currentPlayer = 1;
    
        this.startGame();
    }

    startGame() {
        this.foundPairs = 0;
        this.setNewOrder();
        this.setImagesInCards();
        this.openCards();
        this.player1Button.addEventListener("click", () => { this.currentPlayer = 1;});
        this.player2Button.addEventListener("click", () => { this.currentPlayer = 2;});
    }

    setNewOrder() {
        this.orderForThisRound = this.availableImages.concat(this.availableImages);
        this.orderForThisRound.sort( () => Math.random() -0.5 );
    }

    setImagesInCards() {

        for (const key in this.cards) {

            const card = this.cards[key];
            const image = this.orderForThisRound[key];
            const imgLabel = card.children[1].children[0];

            card.dataset.image = image;
            imgLabel.src = `./imagess/${image}.jpeg`;
        }
    }

    openCards() {
        this.cards.forEach( card => card.classList.add("opened") );

        setTimeout(() => {
            this.closeCards();            
        }, 800);
    }

    closeCards() {

        this.cards.forEach( card => card.classList.remove("opened") );
        this.addClickEvents();
        this.canPlay = true;
    }

    addClickEvents() {

        this.cards.forEach(card => card.addEventListener("click", this.flipCard.bind(this)) );
    }

    removeClickEvents() {
        this.cards.forEach( card => card.removeEventListener("click", this.flipCard) );
    }

    flipCard(e) {

        const clickedCard = e.target;

        if (this.canPlay && !clickedCard.classList.contains("opened")) {

            clickedCard.classList.add("opened");
            this.checkPair( clickedCard.dataset.image );
        }
    }

    checkPair(image) {
        if (!this.card1) {
            this.card1 = image;
        } else {
            this.card2 = image;
        }
        let isMatch = false;
        if (this.card1 && this.card2) {
            if (this.card1 == this.card2) {
                this.canPlay = false;
                isMatch = true;
                setTimeout(this.checkIfWon.bind(this), 300);
            } else {
                this.canPlay = false;
                setTimeout(this.resetOpenedCards.bind(this), 800);
                if (this.currentPlayer === 1) {
                    this.currentPlayer = 2;
                } else {
                    this.currentPlayer = 1;
                }
            }
        }
        if (isMatch) {
            this.updateScore();
        }
    }
       
    resetOpenedCards() {

        const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
        const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`);

        firstOpened.classList.remove("opened");
        secondOpened.classList.remove("opened");

        this.card1 = null;
        this.card2 = null;

        this.canPlay = true;
    }

    checkIfWon() {

        this.foundPairs++;

        this.card1 = null;
        this.card2 = null;
        this.canPlay = true;

        if (this.maxPairNumber == this.foundPairs) {

            alert("¡Hey los a logrado, felicidades sigue asi!");
            this.setNewGame();
        }
    }

    setNewGame() {

        this.removeClickEvents();
        this.cards.forEach( card => card.classList.remove("opened") );
        this.scorePlayer1 = 0;
        this.scorePlayer2 = 0;
        this.scoreElementPlayer1.textContent = `Player 1: ${this.scorePlayer1}`;
        this.scoreElementPlayer2.textContent = `Player 2: ${this.scorePlayer2}`;
        this.score = 0;
        this.scoreElement.textContent = "Aciertos: " + this.score;
        setTimeout(this.startGame.bind(this), 1000);
    }

    updateScore() {
        if (this.currentPlayer === 1) {
            this.scorePlayer1 += 1;
            this.scoreElementPlayer1.textContent = `Aciertos: ${this.scorePlayer1}`;
        } else {
            this.scorePlayer2 += 1;
            this.scoreElementPlayer2.textContent = `Aciertos: ${this.scorePlayer2}`;
        }
        if (this.scorePlayer1 + this.scorePlayer2 === 8) {
            if (this.scorePlayer1 > this.scorePlayer2) {
                alert("Player 1 Ganador!");
            } else if (this.scorePlayer2 > this.scorePlayer1) {
                alert("Player 2 Ganador!");
            } else {
                alert("Empate!");
            }
            this.setNewGame();
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    new Memorama();
});

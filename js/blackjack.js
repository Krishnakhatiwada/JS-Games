let blackjackGame = {
  you: {
    scorespan: "#your-score",
    div: "#your-box",
    score: 0,
  },
  dealer: {
    scorespan: "#dealer-score",
    div: "#dealer-box",
    score: 0,
  },
  card: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"],
  cardValue: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
  wins: 0,
  Losses: 0,
  draws: 0,
  isStand: false,
  isTurnOver: false,
};

let you = blackjackGame["you"];
let dealer = blackjackGame["dealer"];
let hitSound = new Audio("sounds/swish.m4a");
let winSound = new Audio("sounds/cash.mp3");
let lostSound = new Audio("sounds/aww.mp3");
let cards = blackjackGame["card"];
document.querySelector("#hit").addEventListener("click", hitCard);
document.querySelector("#deal").addEventListener("click", dealCard);
document.querySelector("#stand").addEventListener("click", standCard);

function hitCard() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    cardScore(card, you);
    showCard(you, card);
    showScore(you);
  }
}

function dealCard() {
  if (blackjackGame["isTurnOver"] === true) {
    blackjackGame["isStand"] === false;

    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    // showResult(computeWinner());
    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }

    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");
    for (let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    you["score"] = 0;
    dealer["score"] = 0;

    document.querySelector("#your-score").textContent = 0;
    document.querySelector("#your-score").style.color = "white";

    document.querySelector("#dealer-score").textContent = 0;
    document.querySelector("#dealer-score").style.color = "white";

    document.querySelector("#result").textContent = "Let's Play";
    document.querySelector("#result").style.color = "black";
    blackjackGame["isTurnOver"] = false;
    blackjackGame["isStand"] = false;
  }
}

async function standCard() {
  blackjackGame["isStand"] = true;
  while (dealer["score"] < 16 && blackjackGame["isStand"] === true) {
    let card;
    card = randomCard();
    showCard(dealer, card);
    cardScore(card, dealer);
    showScore(dealer);
    await sleep(1000);
  }

  blackjackGame["isTurnOver"] = true;
  let winner = computeWinner();
  showResult(winner);
  // showResult(computeWinner());
}

function showCard(activePlayer, cardNum) {
  if (activePlayer["score"] <= 21) {
    let cardImg = document.createElement("img");
    cardImg.src = `images/cards/${cardNum}.png`;
    // cardImg.src = "images/cards/" + cardNum + ".png";
    document.querySelector(activePlayer["div"]).appendChild(cardImg);

    hitSound.play();
  }
}

function randomCard() {
  let randomCardNum = Math.floor(Math.random() * 13);
  return cards[randomCardNum];
}

function cardScore(cardNum, activePlayer) {
  if (cardNum == "A") {
    if (activePlayer["score"] + blackjackGame["cardValue"][cardNum][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardValue"][cardNum][1];
    } else {
      activePlayer["score"] += blackjackGame["cardValue"][cardNum][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardValue"][cardNum];
  }
}
function showScore(activePlayer) {
  if (activePlayer["score"] < 21) {
    document.querySelector(activePlayer["scorespan"]).textContent =
      activePlayer["score"];
  } else {
    document.querySelector(activePlayer["scorespan"]).textContent = " BUST !";
    document.querySelector(activePlayer["scorespan"]).style.color = "red";
  }
}

// compute winner and return who won
// update wins, draws, losses
function computeWinner() {
  let winner;
  if (you["score"] <= 21) {
    //condition: higher scroe than dealer or when dealer busts
    if (you["score"] > dealer["score"] || dealer["score"] > 21) {
      blackjackGame["wins"]++;
      winner = you;
      document.querySelector("#wins").textContent = blackjackGame["wins"];
    } else if (you["score"] < dealer["score"]) {
      winner = dealer;
      document.querySelector("#losses").textContent = blackjackGame["Losses"];
      blackjackGame["Losses"]++;
    } else if (you["score"] === dealer["score"]) {
      winner = "draw";
      blackjackGame["draws"]++;
      document.querySelector("#draws").textContent = blackjackGame["draws"];
    }
  } else if (you["score"] > 21 && dealer["score"] <= 21) {
    winner = dealer;
    blackjackGame["Losses"]++;
    document.querySelector("#losses").textContent = blackjackGame["Losses"];
  } else if (you["score"] > 21 && dealer["score"] > 21) {
    winner = "draw";
    blackjackGame["draws"]++;
    document.querySelector("#draws").textContent = blackjackGame["draws"];
  }

  return winner;
}

function showResult(winner) {
  let message, messageColor;
  if (blackjackGame["isTurnOver"] === true) {
    if (winner === you) {
      message = "You Won!";
      messageColor = "green";
      winSound.play();
    } else if (winner === dealer) {
      message = "You Lost !";
      messageColor = "red";
      lostSound.play();
    } else {
      message = "You drew !";
      messageColor = "black";
    }
    document.querySelector("#result").textContent = message;
    document.querySelector("#result").style.color = messageColor;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

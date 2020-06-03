// challenge 1 your age in days?

function ageInDays() {
  let birthyear = prompt("What is your birth year ??");
  let currentYear = new Date();
  let age = currentYear.getFullYear() - birthyear;
  let ageInday = age * 365;

  var h1 = document.createElement("h1");
  let result = document.createTextNode("Your are " + ageInday + " " + "Days");
  h1.setAttribute("id", "ageInday");
  h1.appendChild(result);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInday").remove();
}

function generateCat() {
  let image = document.createElement("img");
  let div = document.getElementById("flex-cat-gen");
  image.src =
    "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.append(image);
}

function rpsGame(yourChoice) {
  //   console.log(yourChoice.id);
  let humanchoice, botchoice, result, message, resultDisplay;

  humanchoice = yourChoice.id;

  botchoice = randomChoice();
  actualbotchoice = numberToChoice(botchoice);

  result = decideWinner(humanchoice, actualbotchoice); //[0,1] [1,0] [0.5,0.5]
  message = finalMessage(result); //return object like "{'message':'You Won', 'color':'green'}"

  resultDisplay = rpsFrontend(humanchoice, actualbotchoice, message);
}

function randomChoice() {
  let choice = Math.floor(Math.random(0, 2) * 3);
  return choice;
}
function numberToChoice(number) {
  return ["rock", "paper", "scissor"][number];
}
function decideWinner(humanchoice, botchoice) {
  let rspdatabase = {
    rock: {
      scissor: 1,
      rock: 0.5,
      paper: 0,
    },
    paper: {
      scissor: 0,
      rock: 1,
      paper: 0.5,
    },
    scissor: {
      scissor: 0.5,
      rock: 0,
      paper: 1,
    },
  };

  let yourScore = rspdatabase[humanchoice][botchoice];
  let botScore = rspdatabase[botchoice][humanchoice];
  return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]) {
  if (yourScore === 0) {
    return { color: "red", message: "You Lost !" };
  } else if (yourScore === 0.5) {
    return { color: "yellow", message: "You Tied !" };
  } else {
    return { color: "green", message: "You Won !" };
  }
}
function rpsFrontend(yourChoice, botchoice, message) {
  let imageDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissor: document.getElementById("scissor").src,
  };
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissor").remove();
  let humandiv = document.createElement("div");
  let botdiv = document.createElement("div");
  let messagediv = document.createElement("div");

  humandiv.innerHTML =
    "<img src='" +
    imageDatabase[yourChoice] +
    "' height= 250  style= ' box-shadow: 0px 10px 50px navy;'/>";

  humandiv.innerHTML =
    humandiv.innerHTML +
    "<h4 style='text-align:center; margin-top: 45px;'>You</h4>";
  document.getElementById("rps").append(humandiv);

  messagediv.innerHTML =
    "<h1 style ='color:" +
    message["color"] +
    "; font-size: 60px; padding:30px; '>" +
    message["message"] +
    "</h1>";
  document.getElementById("rps").append(messagediv);

  botdiv.innerHTML =
    "<img src='" +
    imageDatabase[botchoice] +
    "' height= 250 style=' box-shadow: 0px 10px 50px red;'/>";
  botdiv.innerHTML =
    botdiv.innerHTML +
    "<h4 style='text-align:center; margin-top: 45px;'>Computer</h4>";
  document.getElementById("rps").append(botdiv);
}

// CHange color of all Buttons
let allbutton = document.getElementsByTagName("button");

let copyAllButtons = [];
for (let i = 0; i < allbutton.length; i++) {
  copyAllButtons.push(allbutton[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === "red") {
    buttonRed();
  } else if (buttonThingy.value === "green") {
    buttonGreen();
  } else if (buttonThingy.value === "blue") {
    buttonBlue();
  } else if (buttonThingy.value === "reset") {
    buttonReset();
  } else {
    buttonRandom();
  }
}

function buttonRed() {
  for (let i = 0; i < allbutton.length; i++) {
    allbutton[i].classList.remove(allbutton[i].classList[1]);
    allbutton[i].classList.add("btn-danger");
  }
}

function buttonGreen() {
  for (let i = 0; i < allbutton.length; i++) {
    allbutton[i].classList.remove(allbutton[i].classList[1]);
    allbutton[i].classList.add("btn-success");
  }
}

function buttonBlue() {
  for (let i = 0; i < allbutton.length; i++) {
    allbutton[i].classList.remove(allbutton[i].classList[1]);
    allbutton[i].classList.add("btn-primary");
  }
}

function buttonReset() {
  for (let i = 0; i < allbutton.length; i++) {
    allbutton[i].classList.remove(allbutton[i].classList[1]);
    allbutton[i].classList.add(copyAllButtons[i]);
  }
}

function buttonRandom() {
  let choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];

  for (let i = 0; i < allbutton.length; i++) {
    let randomnum = Math.floor(Math.random() * 4);

    allbutton[i].classList.remove(allbutton[i].classList[1]);

    allbutton[i].classList.add(choices[randomnum]);
  }
}

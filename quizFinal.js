const questions = [
  {
    que: "How many legs does a spider have?",
    a: "Five",
    b: "Six",
    c: "Two",
    d: "Eight",
    correct: "d",
  },
  {
    que: "How many seconds make one hour?",
    a: "3400",
    b: "3500",
    c: "3600",
    d: "3700",
    correct: "c",
  },
  {
    que: "There are how many letters in the English alphabet?",
    a: "23",
    b: "25",
    c: "27",
    d: "26",
    correct: "d",
  },
  {
    que: "There are how many colors in a rainbow?",
    a: "Seven",
    b: "Nine",
    c: "Five",
    d: "Eight",
    correct: "a",
  },
  {
    que: "Which animal is known as the ship of the desert?",
    a: "Horse",
    b: "Goat",
    c: "Camel",
    d: "Elephant",
    correct: "c",
  },
];
  
//function for creating and selecting elements
const createAndSelect = (method, value) => document[method](value);
  
// function for events
const eventListeners = (btn, type, functionName) =>
  btn.addEventListener(type, functionName);
  
let index = (right = wrong = 0);
// let right = 0,
//   wrong = 0;
let total = questions.length;
let timerInterval;
let timeLeft = 30;
let userAnswers = [];
  
// Select elements
const nextButton = createAndSelect("querySelector", "#next");
const prevButton = createAndSelect("querySelector", "#prev");
const submitButton = createAndSelect("querySelector", "#sub");
const question_h2 = createAndSelect("querySelector", "h2");
const optionInput = createAndSelect("querySelectorAll", ".options");
const timerDisplay = createAndSelect("querySelector", "#time");
const timerDiv = createAndSelect("querySelector", "#timer");
const divOfBox = createAndSelect("querySelector", "#box");
const divOfScore = createAndSelect("querySelector","#score")
  
// Add event listeners
eventListeners(nextButton, "click", nextQuestion);
eventListeners(prevButton, "click", previousQuestion);
eventListeners(submitButton, "click", submit);
  
// Shuffle questions array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(questions);
  
// Display the first question
nextQuestion();
  
// Function to display the next question
function nextQuestion() {
  if (index < total) {
    // Store the user's answer for the current question
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
      userAnswers[index - 1] = selectedOption.value;
      // Store the answer in local storage
      localStorage.setItem(`answer_${index - 1}`, selectedOption.value);
    }

    reset();
    const data = questions[index];
    question_h2.innerText = `${index + 1}. ${data.que}`;
    index++;
    optionInput[0].nextElementSibling.textContent = data.a;
    optionInput[1].nextElementSibling.textContent = data.b;
    optionInput[2].nextElementSibling.textContent = data.c;
    optionInput[3].nextElementSibling.textContent = data.d;

    // Pre-select the user's answer for the current question if it exists in local storage
    const savedAnswer = localStorage.getItem(`answer_${index - 1}`);
    if (savedAnswer) {
      document.querySelector(`input[value="${savedAnswer}"]`).checked = true;
    } else {
      resetTimer();
      startTimer();
    }
  }
}


// Function to display the previous question
function previousQuestion() {
  if (index > 0) {

    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
      userAnswers[index - 1] = selectedOption.value;
      // Store the answer in local storage
      localStorage.setItem(`answer_${index - 1}`, selectedOption.value);
    }

    index -= 2;
    nextQuestion();
  }
}
  
// Function to reset option choices for each question
function reset() {
  optionInput.forEach((option) => {
    option.checked = false;
  });
}
  
  
// Function to start the timer for the current question
function startTimer() {
  timeLeft = 10;
  timerDisplay.textContent = timeLeft;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
    } else {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}
      
// Function to submit the answer
function submit() {
  if (index === total) {
    const correctAnswers = calculateScore();
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    timerDiv.style.display = "none";
    timerDisplay.style.display = "none";
    divOfBox.innerHTML = `<h3>Thanks For Playing Quiz</h3> <h2>${correctAnswers} / ${total} is your score</h2>`;
    // Clear all saved answers from local storage
    for (let i = 0; i < total; i++) {
      localStorage.removeItem(`answer_${i}`);
    }
  } else {
    alert("You can only submit the quiz on the last question.");
  }
}
      
//function to calculate score for every question
function calculateScore() {
  let correctAnswers = 0;
  questions.forEach((data, i) => {
  
    if (userAnswers[i] === data.correct) {
      correctAnswers++;
    }
    
  })
  return correctAnswers;
}

// Function to stop and reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  timerDisplay.textContent = "";
}
  
          
          
  
  
  








class Quiz {
  constructor(question) {
    this.allQuestions = question;
    this.activeIndex = 0;
    this.score = 0;
    this.createUI();
  }
  next() {
    const currentAnswerSelected = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const currentQuestion = this.getCurrentQuestion();

    if (currentQuestion.isCorrectAnswer(currentAnswerSelected)) {
      this.updateScore(this.score + 1);
    } else {
    }
    this.activeIndex = this.activeIndex + 1;
    this.createUI();
  }
  getCurrentQuestion() {
    return this.allQuestions[this.activeIndex];
  }
  prev() {
    this.activeIndex = this.activeIndex - 1;
  }
  updateScore(score) {
    this.score = score;
  }
  createUI() {
    let main = document.querySelector(".main");
    let box = document.createElement("div");
    main.innerHTML = "";
    main.append(box);
    let quizHeading = document.createElement("h1");
    quizHeading.textContent = "Quiz";
    let currentStatus = document.createElement("p");
    currentStatus.textContent = `Question: ${this.activeIndex + 1} / ${
      this.allQuestions.length
    }`;
    let score = document.createElement("p");
    score.textContent = `Your Score: ${this.score}`;
    if (this.activeIndex === this.allQuestions.length) {
      let congratulations = document.createElement("p");
      congratulations.innerText = "YAYY!!!🎉";
      box.append(quizHeading, score, congratulations);
      return;
    }
    let currentQuestion = this.getCurrentQuestion();
    let currentQuestionUI = currentQuestion.createUI();
    let nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", () => {
      this.next();
    });
    box.append(
      quizHeading,
      currentStatus,
      score,
      currentQuestionUI,
      nextButton
    );
  }
}
class Question {
  constructor(title, options, correctAnswerIndex) {
    this.title = title;
    this.options = options;
    this.correctAnswerIndex = correctAnswerIndex;
  }
  isCorrectAnswer(answer) {
    return this.getCorrectAnswer() === answer;
  }
  getCorrectAnswer() {
    return this.options[this.correctAnswerIndex];
  }
  createUI() {
    let p = document.createElement("p");
    p.innerText = this.title;
    let radioContainer = document.createElement("div");
    radioContainer.className = "radio-container";
    this.options.forEach((option) => {
      let input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = option;
      let label = document.createElement("label");
      label.textContent = option;
      radioContainer.append(input, label);
    });

    let div = document.createElement("div");
    div.append(p, radioContainer);
    return div;
  }
}

let question1 = new Question(
  "What is the tip of a shoelace called?",
  ["Chiclet", "Aglet", "Froglet", "Magnet"],
  1
);
let question2 = new Question(
  "What is the abbreviation of SIMP?",
  [
    "Sockman Is My Pal",
    "Stirring In Mama's Pot ",
    "Slept In My Porche",
    "Squirrel In My Pants",
  ],
  3
);
let question3 = new Question(
  "Arent you a little young to build a roller coaster?",
  ["Yes, yes I am", "Pardon Moi?", "boi!!!", "🤷‍♀️"],
  0
);
let question4 = new Question(
  "How many days of summer vacation are there?",
  ["31", "104", "14", "I'm preparing for entrance exams"],
  1
);

let quiz = new Quiz([question1, question2, question3, question4]);

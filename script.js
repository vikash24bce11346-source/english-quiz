const wordBank = [

  {
    word:"Eloquent",
    answer:"Fluent speaker",
    options:["Fluent speaker","Lazy person","Fearful","Weak"]
  },
  {
    word:"Benevolent",
    answer:"Kind",
    options:["Cruel","Kind","Silent","Rude"]
  },
  {
    word:"Candid",
    answer:"Honest",
    options:["Dangerous","Honest","Funny","Slow"]
  },
  {
    word:"Fragile",
    answer:"Breakable",
    options:["Strong","Breakable","Heavy","Huge"]
  },
  {
    word:"Rapid",
    answer:"Fast",
    options:["Fast","Tiny","Cold","Dark"]
  },
  {
    word:"Optimistic",
    answer:"Hopeful",
    options:["Sad","Hopeful","Angry","Careless"]
  },
  {
    word:"Reluctant",
    answer:"Unwilling",
    options:["Excited","Happy","Unwilling","Brave"]
  },
  {
    word:"Obsolete",
    answer:"Outdated",
    options:["Modern","Useful","Outdated","Rich"]
  },
  {
    word:"Scarce",
    answer:"Rare",
    options:["Rare","Common","Beautiful","Large"]
  },
  {
    word:"Vivid",
    answer:"Bright and clear",
    options:["Dull","Bright and clear","Dirty","Weak"]
  },
  {
    word:"Serene",
    answer:"Calm",
    options:["Noisy","Calm","Fearful","Rough"]
  },
  {
    word:"Tedious",
    answer:"Boring",
    options:["Exciting","Funny","Boring","Easy"]
  },
  {
    word:"Furious",
    answer:"Very angry",
    options:["Happy","Calm","Very angry","Weak"]
  },
  {
    word:"Ancient",
    answer:"Very old",
    options:["Modern","Tiny","Very old","New"]
  },
  {
    word:"Abundant",
    answer:"Plentiful",
    options:["Rare","Plentiful","Weak","Dark"]
  },
  {
    word:"Hostile",
    answer:"Unfriendly",
    options:["Friendly","Unfriendly","Helpful","Honest"]
  },
  {
    word:"Diligent",
    answer:"Hardworking",
    options:["Lazy","Hardworking","Angry","Silent"]
  },
  {
    word:"Humble",
    answer:"Modest",
    options:["Proud","Modest","Rude","Weak"]
  },
  {
    word:"Marvel",
    answer:"Wonder",
    options:["Fear","Wonder","Pain","Anger"]
  },
  {
    word:"Wisdom",
    answer:"Knowledge",
    options:["Knowledge","Money","Power","Beauty"]
  }

];

function shuffle(array){

  for(let i = array.length - 1; i > 0; i--){

    let j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function getTodayKey(){

  const today = new Date();

  return today.getFullYear() + "-" +
         (today.getMonth() + 1) + "-" +
         today.getDate();
}

function getDailyWords(){

  const todayKey = getTodayKey();

  let storedDate = localStorage.getItem("quizDate");
  let storedWords = localStorage.getItem("dailyWords");

  if(storedDate === todayKey && storedWords){

    return JSON.parse(storedWords);
  }

  let shuffled = shuffle([...wordBank]);

  let selected = shuffled.slice(0,10);

  localStorage.setItem("quizDate", todayKey);

  localStorage.setItem(
    "dailyWords",
    JSON.stringify(selected)
  );

  return selected;
}

const vocabulary = getDailyWords();

document.getElementById("todayDate").innerText =
"Today's Quiz : " + new Date().toDateString();

let currentQuestion = 0;

let score = 0;

const questionEl = document.getElementById("question");

const optionsEl = document.getElementById("options");

const nextBtn = document.getElementById("nextBtn");

const scoreBox = document.getElementById("scoreBox");

function loadQuestion(){

  const current = vocabulary[currentQuestion];

  questionEl.innerHTML =
  `What is the meaning of
  "<span style="color:#007bff">${current.word}</span>" ?`;

  optionsEl.innerHTML = "";

  current.options.forEach(option => {

    const btn = document.createElement("button");

    btn.innerText = option;

    btn.classList.add("option");

    btn.addEventListener("click", () =>
      checkAnswer(btn, current.answer)
    );

    optionsEl.appendChild(btn);

  });
}

function checkAnswer(button, correctAnswer){

  const allOptions = document.querySelectorAll(".option");

  allOptions.forEach(btn => {

    btn.disabled = true;

    if(btn.innerText === correctAnswer){

      btn.classList.add("correct");
    }
  });

  if(button.innerText === correctAnswer){

    score++;
  }
  else{

    button.classList.add("wrong");
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {

  currentQuestion++;

  if(currentQuestion < vocabulary.length){

    loadQuestion();

    nextBtn.style.display = "none";
  }
  else{

    showScore();
  }

});

function showScore(){

  document.getElementById("quizBox").style.display = "none";

  scoreBox.style.display = "block";

  scoreBox.innerHTML = `
    Quiz Completed 🎉 <br><br>
    Your Score: ${score} / ${vocabulary.length}
  `;
}

loadQuestion();

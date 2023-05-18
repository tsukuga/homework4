const wordElement = document.getElementById('word');
const wordImage = document.getElementById('word-image');
const inputElement = document.getElementById('input');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

const wordsWithImages = [
    {
      word: '三田：パラダイス',
      imageUrls: [
        'img/PARADISE1.jpeg',
        'img/PARADISE2.jpeg',
        'img/PARADISE3.jpeg',
      ]
    },
    {
        word: '赤坂：サウナ東京',
        imageUrls: [
          'img/saunaTokyo1.jpeg',
          'img/saunaTokyo2.jpeg',
          'img/saunaTokyo3.jpeg',
        ]
    },
    {
        word: '新橋：レンブラント',
        imageUrls: [
          'img/renburanto1.jpeg',
          'img/renburanto2.jpeg',
          'img/renburanto3.jpeg',
        ]
    }
    // 他の単語と画像URLの配列を追加...
  ];
  
let currentWordWithImage;
let currentWord;
  
let score = 0;
let timeRemaining = 120; // ゲームの制限時間 (秒)
let timerInterval;

function setNewWord() {
    const randomIndex = Math.floor(Math.random() * wordsWithImages.length);
    currentWord = wordsWithImages[randomIndex].word;
    const currentWordObj = wordsWithImages.find((obj) => obj.word === currentWord);
    word.textContent = currentWord;
    input.value = '';
    displayImages(currentWordObj)
}

function displayImages(currentWordObj) {
    const imageSlider = document.querySelector(".image-slider");
    let imageCount = 0;

    clearImages();

    currentWordObj.imageUrls.forEach((imageUrl) => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = currentWordObj.word;
        imgElement.classList.add("word-image-placeholder");
        imgElement.style.maxWidth = "300px";
        imgElement.style.maxHeight = "300px";

        if (imageCount === 3) {
            return;
        }
        
        imageSlider.appendChild(imgElement);
        imageCount++;
    });
  }

function startTimer() {
  timerElement.textContent = timeRemaining;
  timerInterval = setInterval(() => {
    timeRemaining--;
    timerElement.textContent = timeRemaining;
    if (timeRemaining < 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  alert('ゲーム終了! あなたのスコア: ' + score);
  inputElement.disabled = false;
  startButton.disabled = false;
  resetButton.disabled = false;
  resetGame()
}

function resetGame() {
  score = 0;
  timeRemaining = 120;
  wordElement.textContent = '';
  inputElement.value = '';
  clearImages();
  scoreElement.textContent = '';
  timerElement.textContent = '';
  scoreElement.textContent = 'スコア: 0';
  inputElement.disabled = false;
  startButton.disabled = false;
  resetButton.disabled = true;
}

function clearImages() {
  const imageSlider = document.querySelector(".image-slider");
  while(imageSlider.firstChild){
    imageSlider.removeChild(imageSlider.firstChild);
  }

  imageSlider.className = "";
  window.requestAnimationFrame(function(time) {
    window.requestAnimationFrame(function(time) {
      imageSlider.className = "image-slider";
    });
  });
}

inputElement.addEventListener('input', () => {
  if (inputElement.value === currentWord) {
    inputElement.value = '';
    setNewWord();
    score++;
    scoreElement.textContent = 'スコア: ' + score;
    timeRemaining += 1; // 1単語の入力期間 (秒)
  }
});

startButton.addEventListener('click', () => {
  setNewWord();
  startTimer();
  inputElement.disabled = false;
  inputElement.focus();
  startButton.disabled = true;
  resetButton.disabled = false;
  scoreElement.textContent = 'スコア: 0';

  const imageSlider = document.querySelector(".image-slider");
  imageSlider.className = "";
  window.requestAnimationFrame(function(time) {
    window.requestAnimationFrame(function(time) {
      imageSlider.className = "image-slider";
    });
  });
});

resetButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  resetGame();
});


document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
  
    if (keyElement) {
      keyElement.classList.add("pressed");
    }
  });
  
document.addEventListener("keyup", (event) => {
    const key = event.key.toUpperCase();
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
  
    if (keyElement) {
      keyElement.classList.remove("pressed");
    }
  });

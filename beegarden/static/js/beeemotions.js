var beeImage = document.getElementById('beeImage');

// Pet function
function pet(path) {
    beeImage.addEventListener('click', function() {
      // Change the image source to the pet image
      beeImage.src = petImagePath;
  
      setTimeout(function() {
        beeImage.src = path;
      }, 1000);
    });
  }
  
  function emotion(score) {
    var scoreValue = document.getElementById('scoreValue');
    var beeImage = document.getElementById('beeImage');
    var thresholdHappy = 80; // Define the threshold for happiness
    var thresholdSad = 60;
  
    // Update the score value displayed
    scoreValue.textContent = score;
  
    // Update the image based on the score
    if (score > thresholdHappy) {
      beeImage.src = happyImagePath;
    } else if (score < thresholdSad) {
      beeImage.src = sadImagePath;
    } else {
      beeImage.src = mehImagePath;
    }
  
    // Call the pet function with the appropriate image path
    if (score > thresholdHappy) {
      pet(happyImagePath);
    } else if (score < thresholdSad) {
      pet(sadImagePath);
    } else {
      pet(mehImagePath);
    }
  }  

  // Mock happiness score
// let happinessScore = 70; // Assume initial happiness score

// Update the health bar based on happiness score
function updateHealthBar(userScore) {
  const healthBar = document.getElementById('health');
  // Adjust the health bar width based on the user score
  healthBar.style.width = userScore + '%';
}

// Initial update based on the happiness score (assuming this is the user's score)
updateHealthBar(happinessScore);


// //chabges background based on season
// var currentdate = new Date();
// var season = currentdate.getMonth()
// switch (season){
//     case 0:
//     document.body.style.backgroundColor = 'rgb(0,0,0)';
//     break;
//     case 1:
//     document.body.style.backgroundColor = 'rgb(103, 226, 218)';
//     break;
//     case 2:
//     document.body.style.backgroundColor = 'rgb(0,255,0)';
//     break;
//     case 3:
//     document.body.style.backgroundColor = 'rgb(0,0,255)';
//     break;
//     case 4:
//     document.body.style.backgroundColor = 'rgb(0,0,0)';
//     break;
//     case 5:
//     document.body.style.backgroundColor = 'rgb(103, 226, 218)';
//     break;
//     case 6:
//     document.body.style.backgroundColor = 'rgb(0,255,0)';
//     break;
//     case 7:
//     document.body.style.backgroundColor = 'rgb(0,0,255)';
//     break;
//     case 8:
//     document.body.style.backgroundColor = 'rgb(0,0,0)';
//     break;
//     case 9:
//     document.body.style.backgroundColor = 'rgb(103, 226, 218)';
//     break;
//     case 10:
//     document.body.style.backgroundColor = 'rgb(0,255,0)';
//     break;
//     case 11:
//     document.body.style.backgroundColor = 'rgb(0,0,255)';
//     break;
// }
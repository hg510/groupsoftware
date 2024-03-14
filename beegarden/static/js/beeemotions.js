// Author: Iona Cessford and Nur Deeni

var beeImage = document.getElementById('beeImage');

// Function to update the pet bar
function updatePetBar() {
  const petBar = document.getElementById('pet');
  const maxPetLevel = 100;
  let petLevel = parseInt(petBar.style.width) || 0; // Get the current pet level

  // Increment the pet level
  petLevel += 10; // Increase the pet level by 10 (adjust as needed)
  if (petLevel > maxPetLevel) {
      petLevel = maxPetLevel; // Ensure pet level doesn't exceed the maximum
  }

  // Set the width of the pet bar
  petBar.style.width = petLevel + '%';

  // Reset the pet bar to 0 after 5 minutes
  setTimeout(function() {
      petBar.style.width = '0%';
  }, 5 * 60 * 1000); // 5 minutes in milliseconds
}

// Pet function
function pet(path) {
  beeImage.addEventListener('click', function() {
      // Change the image source to the pet image
      beeImage.src = petImagePath;

      // Create an audio element for the pet sound
      var petSound = new Audio('/static/sound/steve_giggle.wav');
      petSound.play();
  
      setTimeout(function() {
          beeImage.src = path;
          // Update the pet bar when the user clicks on the image
          updatePetBar();
      }, 1000);
  });
}

// Function to update the health bar based on user's score
function updateHealthBar(todayScore) {
    const healthBar = document.getElementById('health');
    const maxScore = 100; 

    // Calculate the width percentage based on today's score
    const widthPercentage = (todayScore / maxScore) * 100;

    // Set the width of the health bar
    healthBar.style.width = widthPercentage + '%';
}

var beeImage = document.getElementById('beeImage');

// Pet function
// function pet(path) {
//     beeImage.addEventListener('click', function() {
//       // Change the image source to the pet image
//       beeImage.src = petImagePath;
  
//       setTimeout(function() {
//         beeImage.src = path;
//       }, 1000);
//     });
//   }
  
  function emotion(score) {
    var scoreValue = 0;
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
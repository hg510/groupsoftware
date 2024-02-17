// Attach event listeners to DOM elements
var addEvent = (function () {
  if (document.addEventListener) {
      return function (el, type, fn) {
          if (el && el.nodeName || el === window) {
              el.addEventListener(type, fn, false);
          } else if (el && el.length) {
              for (var i = 0; i < el.length; i++) {
                  addEvent(el[i], type, fn);
              }
          }
      };
  } else {
      return function (el, type, fn) {
          if (el && el.nodeName || el === window) {
              el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
          } else if (el && el.length) {
              for (var i = 0; i < el.length; i++) {
                  addEvent(el[i], type, fn);
              }
          }
      };
  }
})();

var eat = ['yum!', 'gulp', 'burp!', 'nom'];
var yum = document.createElement('p');
var msie = /*@cc_on!@*/0;
yum.style.opacity = 1;

var images = document.querySelectorAll('ul li img');

for (var i = 0; i < images.length; i++) {
    var img = images[i];
    
    img.setAttribute('draggable', 'true');
    
    img.addEventListener('dragstart', function (e) {
        e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be droppable
        e.dataTransfer.setData('Text', this.src); // Set image source as drag data
    });
}

var smallSquares = document.querySelectorAll('.small-square');

for (var i = 0; i < smallSquares.length; i++) {
    var square = smallSquares[i];
    
    square.addEventListener('dragover', function (e) {
        if (e.preventDefault) e.preventDefault(); // allows us to drop
        this.classList.add('over');
        e.dataTransfer.dropEffect = 'copy';
        return false;
    });

    // to get IE to work
    square.addEventListener('dragenter', function (e) {
        this.classList.add('over');
        return false;
    });

    square.addEventListener('dragleave', function () {
        this.classList.remove('over');
    });

    square.addEventListener('drop', function (e) {
        if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting
        
        var imageUrl = e.dataTransfer.getData('Text'); // Get the image source from drag data
        
        // Create a new image element and set its source to the dropped image
        var droppedImage = new Image();
        droppedImage.src = imageUrl;
        
        // Append the dropped image to the square
        this.appendChild(droppedImage);
        
        // Replace the dropped image with a new image
        var newImage = new Image();
        // Get the id of the square to determine which image to use
        
        var squareId = this.id;
        switch(squareId) {
            case 'square1':
                newImage.src = '/static/img/1.png';
                break;
            case 'square2':
                newImage.src = '/static/img/2.png';
                break;
            case 'square3':
                newImage.src = '/static/img/3.png';
                break;
            case 'square4':
                newImage.src = '/static/img/4.png';
                break;
            case 'square5':
                newImage.src = '/static/img/5.png';
                break;
            case 'square6':
                newImage.src = '/static/img/6.png';
                break;
        }
     
        // Replace the dropped image with the new image
        this.replaceChild(newImage, droppedImage);
        
        // Update the content of the yum element with a random string from the eat array
        yum.innerHTML = eat[Math.floor(Math.random() * eat.length)];
        
        // Create a clone of the yum element
        var yumClone = yum.cloneNode(true);
        
        // Append the yum clone to the square
        this.appendChild(yumClone);
        
        // Set up the fade effect for the yum element clone
        setTimeout(function () {
            var opacity = 1;
            var fadeInterval = setInterval(function () {
                if (opacity <= 0) {
                    clearInterval(fadeInterval);
                } else {
                    yumClone.style.opacity = opacity;
                    opacity -= 0.1;
                }
            }, 50);
        }, 250);

        // Prevent default behavior
        return false;
    });
}

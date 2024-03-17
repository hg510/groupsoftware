// Author: Nur Deeni

// This function ensures cross-browser compatibility for attaching event listeners to DOM elements.
var addEvent = (function () {
    // Checks if the browser supports the standard event listener interface
    if (document.addEventListener) {
        // Returns a function for adding event listeners using the standard interface
        return function (el, type, fn) {
            // Checks if the target element is a single DOM node or the window object
            if (el && el.nodeName || el === window) {
                // Attaches the event listener to the target element
                el.addEventListener(type, fn, false);
            } else if (el && el.length) {
                // If the target is a collection of elements, iterates over each element and attaches the event listener
                for (var i = 0; i < el.length; i++) {
                    addEvent(el[i], type, fn);
                }
            }
        };
    } else {
        // If the browser does not support the standard interface, returns a function for attaching event listeners using the old IE interface
        return function (el, type, fn) {
            // Checks if the target element is a single DOM node or the window object
            if (el && el.nodeName || el === window) {
                // Attaches the event listener to the target element
                el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
            } else if (el && el.length) {
                // If the target is a collection of elements, iterates over each element and attaches the event listener
                for (var i = 0; i < el.length; i++) {
                    addEvent(el[i], type, fn);
                }
            }
        };
    }
})();

// Creates a paragraph element
var yum = document.createElement('p');
// Detects whether the browser is Internet Explorer
var msie = /*@cc_on!@*/0;
// Sets the opacity of the paragraph element to 1
yum.style.opacity = 1;

// Selects all image elements within list items of unordered lists
var images = document.querySelectorAll('ul li img');

// Iterates over each image element
for (var i = 0; i < images.length; i++) {
    var img = images[i];
    
    // Makes each image draggable
    img.setAttribute('draggable', 'true');
    
    // Adds a dragstart event listener to each image element
    img.addEventListener('dragstart', function (e) {
        // Sets the effect allowed for the drag operation to 'copy'
        e.dataTransfer.effectAllowed = 'copy';
        // Sets the source of the dragged data to the source URL of the image
        e.dataTransfer.setData('Text', this.src);
    });
}

// Selects all elements with the class 'small-square'
var smallSquares = document.querySelectorAll('.small-square');

// Iterates over each element with the class 'small-square'
for (var i = 0; i < smallSquares.length; i++) {
    var square = smallSquares[i];
    
    // Adds a dragover event listener to each 'small-square' element
    square.addEventListener('dragover', function (e) {
        // Prevents the default dragover behavior
        if (e.preventDefault) e.preventDefault();
        // Adds the 'over' class to the element to indicate it's being dragged over
        this.classList.add('over');
        // Sets the drop effect to 'copy'
        e.dataTransfer.dropEffect = 'copy';
        // Returns false to indicate the drop target is valid
        return false;
    });

    // Adds a dragenter event listener to each 'small-square' element
    square.addEventListener('dragenter', function (e) {
        // Adds the 'over' class to the element to indicate it's being dragged over
        this.classList.add('over');
        // Returns false to indicate the drop target is valid
        return false;
    });

    // Adds a dragleave event listener to each 'small-square' element
    square.addEventListener('dragleave', function () {
        // Removes the 'over' class from the element when the dragged item leaves
        this.classList.remove('over');
    });

    // Adds a drop event listener to each 'small-square' element
    square.addEventListener('drop', function (e) {
        // Prevents the default drop behavior
        if (e.stopPropagation) e.stopPropagation();
        
        // Retrieves the image URL from the dragged data
        var imageUrl = e.dataTransfer.getData('Text');
        
        // Creates a new image element and sets its source to the dropped image URL
        var droppedImage = new Image();
        droppedImage.src = imageUrl;
        
        // Appends the dropped image to the square element
        this.appendChild(droppedImage);
        
        // Creates a new image element based on the square ID
        var newImage = new Image();
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
                newImage.src = '/static/img/1.png';
                break;
        }
     
        // Replaces the dropped image with the new image
        this.replaceChild(newImage, droppedImage);
        
        // Clones the 'yum' element
        var yumClone = yum.cloneNode(true);
        // Appends the cloned 'yum' element to the square
        this.appendChild(yumClone);
        
        // Triggering reflow to restart the animation
        void newImage.offsetWidth;
        // Add a class to apply animation
        newImage.classList.add('fade-in');
        newImage.classList.add('shake');

        // Returns false to indicate the drop operation is complete
        return false;
    });
}

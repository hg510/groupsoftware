    // // Author: Saida Amirova

    // var popupOpened = {};

    // /* This function makes the hidden popup visible and shows it over the plant boxes. */
    // function showPopupAtPosition(squareX, squareY, flowerName) {
    //     var popup = document.querySelector('.popup');
    //     popup.style.display = 'block';
    //     popup.style.width = '600px'; 

    //     var popupContent = '';

    //     switch(flowerName) {
    //         case 'betony':
    //             popupContent = 'Betony is a beautiful perennial herb with clusters of tiny, purple flowers. It is known for its medicinal properties and has been used traditionally to treat various ailments.';
    //             break;
    //         case 'chamomile':
    //             popupContent = 'Chamomile is a delicate, daisy-like flower with a sweet aroma. It is often used in herbal teas and aromatherapy for its calming effects on the body and mind.';
    //             break;
    //         case 'hops':
    //             popupContent = 'Hops are the flowers of the hop plant, commonly used in brewing beer to add flavor and aroma. They also have mild sedative properties and are sometimes used in herbal medicine to promote relaxation and sleep.';
    //             break;
    //         case 'lavender':
    //             popupContent = 'Lavender is a fragrant flowering plant known for its calming scent and soothing properties. It is often used in aromatherapy, skincare products, and herbal remedies.';
    //             break;
    //         case 'passion':
    //             popupContent = 'Passion flower is a striking vine with intricate, exotic flowers. It is used in traditional medicine to promote relaxation, reduce anxiety, and improve sleep quality.';
    //             break;
    //         case 'skullcap':
    //             popupContent = 'Skullcap is a perennial herb with delicate blue flowers. It is commonly used in herbal medicine to relieve stress, anxiety, and nervous tension.';
    //             break;
    //         case 'stjohn':
    //             popupContent = 'St. John\'s wort is a flowering plant with bright yellow flowers. It has been used for centuries in herbal medicine to treat depression, anxiety, and nerve-related pain.';
    //             break;
    //         case 'valerian':
    //             popupContent = 'Valerian is a tall perennial herb with clusters of sweetly scented pink or white flowers. It is known for its sedative properties and is often used as a natural remedy for insomnia and anxiety.';
    //             break;
    //         case 'vervain':
    //             popupContent = 'Vervain is a slender perennial herb with tiny, fragrant flowers. It has a long history of use in herbal medicine for its calming, relaxing, and mood-enhancing effects.';
    //             break;
    //         case 'viper':
    //             popupContent = 'Viper\'s bugloss is a striking wildflower with vibrant blue or purple blooms. It is sometimes used in herbal medicine to promote relaxation and relieve anxiety.';
    //             break;
    //         default:
    //             popupContent = 'Information about the plant...';
    //     }    

    //     popup.innerHTML = `
    //     <div id="closeButton" onclick="closePopup()">&times;</div>
    //     <p>${popupContent}</p>  
    //     <img class="real-plant" src="/static/img/popup/${flowerName}.jpg" alt="${flowerName}">`;

    //     var popupX = 100;
    //     var popupY = 100; 

    //     popup.style.left = popupX + 'px';
    //     popup.style.top = popupY + 'px';
    // }


    // /* This function helps to click on the plants */
    // function handleImageClick(event) {
    //     var squareId = event.target.parentElement.id;
        
    //     if (!popupOpened[squareId]) {
    //         var squareRect = event.target.parentElement.getBoundingClientRect();
    //         var squareX = squareRect.left + window.pageXOffset;
    //         var squareY = squareRect.top + window.pageYOffset;

    //         var flowerName = event.target.dataset.flowerName;

    //         console.log('Flower name: ', flowerName);

    //         if (flowerName) {
    //             showPopupAtPosition(squareX, squareY, flowerName);
    //             popupOpened[squareId] = true;
    //         } else {
    //             console.error('Flower name is undefined');
    //         }
    //     }
    // }

    // /* This function helps to close the opened popup */
    // function closePopup() {
    //     var popup = document.querySelector('.popup');
    //     popup.style.display = 'none';
        
    //     popupOpened = {};
    // }

    // // adding an event listener to the squares/plant placeholder
    // document.getElementById('bin').addEventListener('click', function(event) {
    //     if (event.target.tagName === 'IMG' && event.target.parentElement.classList.contains('small-square')) {
    //         handleImageClick(event);
    //     }
    // });

    // var closeButton = document.getElementById('closeButton');
    // closeButton.addEventListener('click', closePopup);

    // document.addEventListener('DOMContentLoaded', function() {
        
    //     console.log("DOM popup content loaded");

    //     document.addEventListener('flowerPlanted', function(event) {
    //         // Extract the flower name from the event detail
    //         const flowerName = event.detail.flowerName;
    //         console.log('Received flower name:', flowerName);

    //         // Call the showPopupAtPosition function with the flower name
    //         showPopupAtPosition(flowerName);
    //     });
    // });

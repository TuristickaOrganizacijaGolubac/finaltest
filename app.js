$(document).ready(function () {
    const flipbook = $('#flipbook');

    // Function to resize the flipbook
    const resizeFlipbook = () => {
        const viewportWidth = $(window).width();
        const viewportHeight = $(window).height();
        const size = Math.min(viewportWidth, viewportHeight);
        flipbook.turn('size', size, size);
    };

    // Initialize the flipbook
    flipbook.turn({
        width: $(window).width(),
        height: $(window).height(),
        autoCenter: true,
        gradients: true,
        acceleration: true,
        pages: 19,
        display: 'single' // Single-page view
    });

    // Variables to track touch start and end
    let touchStartX = 0;
    let touchEndX = 0;

    // Detect touch events
    flipbook.on('touchstart', function (e) {
        touchStartX = e.originalEvent.touches[0].pageX; // Record the start position of the touch
    });

    flipbook.on('touchend', function (e) {
        touchEndX = e.originalEvent.changedTouches[0].pageX; // Record the end position of the touch

        // Calculate swipe direction
        const swipeDistance = touchStartX - touchEndX;
        if (swipeDistance > 50) {
            // Swipe left -> next page
            flipbook.turn('next');
        } else if (swipeDistance < -50) {
            // Swipe right -> previous page
            flipbook.turn('previous');
        }
    });

    // Resize the flipbook dynamically
    $(window).resize(resizeFlipbook);

    // Perform initial resizing
    resizeFlipbook();
});

let currentSlide = 1;
const totalSlides = 10;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateSlideCounter();
    setupKeyboardNavigation();
    setupFullscreenToggle();
});

// Navigation functions
function nextSlide() {
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    }
}

function previousSlide() {
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    }
}

function currentSlide(slideNumber) {
    showSlide(slideNumber);
}

function showSlide(slideNumber) {
    // Remove active class from current slide and dot
    document.querySelector(`.slide[data-slide="${currentSlide}"]`).classList.remove('active');
    document.querySelector(`.dot:nth-child(${currentSlide})`).classList.remove('active');
    
    // Update current slide number
    currentSlide = slideNumber;
    
    // Add active class to new slide and dot
    document.querySelector(`.slide[data-slide="${currentSlide}"]`).classList.add('active');
    document.querySelector(`.dot:nth-child(${currentSlide})`).classList.add('active');
    
    // Update slide counter
    updateSlideCounter();
}

function updateSlideCounter() {
    const counter = document.querySelector('.slide-counter');
    if (counter) {
        counter.textContent = `${currentSlide} / ${totalSlides}`;
    }
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowRight':
            case ' ': // Spacebar
                event.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                previousSlide();
                break;
            case 'Home':
                event.preventDefault();
                showSlide(1);
                break;
            case 'End':
                event.preventDefault();
                showSlide(totalSlides);
                break;
            case 'Escape':
                event.preventDefault();
                exitFullscreen();
                break;
        }
    });
}

// Fullscreen functionality
function setupFullscreenToggle() {
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    
    // Listen for fullscreen change events
    document.addEventListener('fullscreenchange', updateFullscreenButton);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
    document.addEventListener('mozfullscreenchange', updateFullscreenButton);
    document.addEventListener('MSFullscreenChange', updateFullscreenButton);
}

function toggleFullscreen() {
    if (!document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.mozFullScreenElement && 
        !document.msFullscreenElement) {
        enterFullscreen();
    } else {
        exitFullscreen();
    }
}

function enterFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function updateFullscreenButton() {
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    if (fullscreenBtn) {
        if (document.fullscreenElement || 
            document.webkitFullscreenElement || 
            document.mozFullScreenElement || 
            document.msFullscreenElement) {
            fullscreenBtn.innerHTML = '⛶'; // Exit fullscreen icon
            fullscreenBtn.title = 'Exit Fullscreen';
        } else {
            fullscreenBtn.innerHTML = '⛶'; // Enter fullscreen icon
            fullscreenBtn.title = 'Enter Fullscreen';
        }
    }
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swiped right - go to previous slide
            previousSlide();
        } else {
            // Swiped left - go to next slide
            nextSlide();
        }
    }
}

// Auto-advance functionality (optional - commented out by default)
/*
let autoAdvanceTimer;
const autoAdvanceDelay = 30000; // 30 seconds

function startAutoAdvance() {
    autoAdvanceTimer = setInterval(function() {
        if (currentSlide < totalSlides) {
            nextSlide();
        } else {
            showSlide(1); // Loop back to first slide
        }
    }, autoAdvanceDelay);
}

function stopAutoAdvance() {
    if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }
}

// Stop auto-advance on user interaction
document.addEventListener('click', stopAutoAdvance);
document.addEventListener('keydown', stopAutoAdvance);
document.addEventListener('touchstart', stopAutoAdvance);

// Uncomment the line below to enable auto-advance
// startAutoAdvance();
*/

// Presentation mode detection
function isPresentationMode() {
    return document.fullscreenElement || 
           document.webkitFullscreenElement || 
           document.mozFullScreenElement || 
           document.msFullscreenElement;
}

// Slide transition animations
function addSlideTransitionEffects() {
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide, index) => {
        slide.addEventListener('transitionend', function(event) {
            if (event.target === slide && slide.classList.contains('active')) {
                // Slide has finished transitioning in
                animateSlideContent(slide);
            }
        });
    });
}

function animateSlideContent(slide) {
    const animatableElements = slide.querySelectorAll('h1, h2, h3, p, .solution-point, .competitor-card, .team-member-slide, .status-item');
    
    animatableElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = 'fadeInUp 0.6s ease forwards';
        }, index * 100);
    });
}

// Initialize slide transition effects
document.addEventListener('DOMContentLoaded', addSlideTransitionEffects);

// Add fade in animation keyframes via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style); 
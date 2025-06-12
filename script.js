// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active states to navigation on scroll
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to current link
                    link.classList.add('active');
                }
            }
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll-fade class
    const scrollElements = document.querySelectorAll('.scroll-fade');
    scrollElements.forEach(el => observer.observe(el));
    
    // Add staggered animation delays
    const storyPosts = document.querySelectorAll('.story-post');
    storyPosts.forEach((post, index) => {
        post.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const focusListItems = document.querySelectorAll('.focus-areas li');
    focusListItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.05}s`;
    });
    
    // Add hover effects for better interactivity
    const cards = document.querySelectorAll('.story-post, .project, .focus-areas');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Media upload functionality for Metriq section
    setupMediaUpload();
    
    // Demo video button functionality
    setupDemoVideoButton();
});

function setupMediaUpload() {
    // Note: Video is now directly embedded, no upload needed
    
    // Screenshot placeholder click handlers
    const screenshotPlaceholders = document.querySelectorAll('.screenshot-placeholder');
    screenshotPlaceholders.forEach((placeholder, index) => {
        placeholder.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/jpeg,image/jpg,image/png,image/webp';
            input.style.display = 'none';
            
            input.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    displayScreenshot(file, placeholder, index);
                }
            });
            
            document.body.appendChild(input);
            input.click();
            document.body.removeChild(input);
        });
    });
}

function displayVideo(file, placeholder) {
    // This function is no longer needed since we're using direct video files
    // Keeping it commented for potential future use
    /*
    const reader = new FileReader();
    reader.onload = function(e) {
        const video = document.createElement('video');
        video.src = e.target.result;
        video.controls = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.borderRadius = '16px';
        video.style.objectFit = 'cover';
        
        placeholder.innerHTML = '';
        placeholder.appendChild(video);
        placeholder.style.background = 'none';
    };
    reader.readAsDataURL(file);
    */
}

function displayScreenshot(file, placeholder, index) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.borderRadius = '12px';
        img.style.objectFit = 'cover';
        img.alt = `Metriq app screenshot ${index + 1}`;
        
        placeholder.innerHTML = '';
        placeholder.appendChild(img);
        placeholder.style.background = 'none';
        placeholder.style.border = 'none';
    };
    reader.readAsDataURL(file);
}

function setupDemoVideoButton() {
    const exploreBtn = document.querySelector('.explore-btn');
    const pitchDeckBtn = document.querySelector('.pitch-deck-btn');

    if (exploreBtn) {
        // Navigate to pitch deck page when explore button is clicked
        exploreBtn.addEventListener('click', function() {
            window.location.href = 'pitch-deck.html';
        });
    }

    if (pitchDeckBtn) {
        // Navigate to presentation page
        pitchDeckBtn.addEventListener('click', function() {
            window.location.href = 'presentation.html';
        });
    }
}



 
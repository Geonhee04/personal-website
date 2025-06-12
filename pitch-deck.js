// Pitch Deck JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
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
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    const sections = document.querySelectorAll('.pitch-section, .demo-section');
    sections.forEach(section => observer.observe(section));
    
    // Observe individual elements for staggered animations
    const animateElements = document.querySelectorAll('.stat, .solution-item, .screenshot-item, .competitor, .model-item, .traction-item');
    animateElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.stat, .solution-item, .screenshot, .competitor, .model-item, .team-member, .traction-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (!this.classList.contains('hover-disabled')) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (!this.classList.contains('hover-disabled')) {
                this.style.transform = '';
            }
        });
    });
    
    // Smooth scroll to top functionality
    window.addEventListener('scroll', function() {
        const scrollButton = document.querySelector('.scroll-to-top');
        if (scrollButton) {
            if (window.scrollY > 500) {
                scrollButton.style.display = 'block';
            } else {
                scrollButton.style.display = 'none';
            }
        }
    });
    
    // Counter animation for stats
    const counters = document.querySelectorAll('.stat h3, .proj-stat h4, .funding-item span');
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const speed = 50; // Adjust speed as needed
            
            if (target > 0) {
                let current = 0;
                const increment = target / speed;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    // Preserve the original format (%, K, M, B, etc.)
                    const originalText = counter.textContent;
                    const numericPart = Math.floor(current);
                    const suffix = originalText.replace(/[\d,]/g, '');
                    
                    counter.textContent = numericPart + suffix;
                }, 20);
            }
        });
    };
    
    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.problem-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Images load normally without opacity changes
    
    // Add smooth transitions for all elements
    const addSmoothTransitions = () => {
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            if (!element.style.transition) {
                element.style.transition = 'all 0.3s ease';
            }
        });
    };
    
    // Initialize smooth transitions
    setTimeout(addSmoothTransitions, 100);
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const hero = document.querySelector('.pitch-hero');
        if (hero) {
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });
    
    // Mobile-friendly touch interactions
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.stat, .solution-item, .competitor, .model-item');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Preload critical images
    const preloadImages = [
        'metriq.png',
        'geonhee.jpg'
    ];
    
    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4299e1;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
    }
    
    .scroll-to-top:hover {
        background: #3182ce;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(66, 153, 225, 0.4);
    }
    
    /* Smooth scrolling for all browsers */
    html {
        scroll-behavior: smooth;
    }
    

    
    /* Prevent flash of unstyled content */
    .pitch-section {
        opacity: 0;
        animation: fadeIn 0.6s ease forwards;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
`;

document.head.appendChild(style); 
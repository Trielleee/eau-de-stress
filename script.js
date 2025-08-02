// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Scroll to buy section function
function scrollToBuy() {
    const buySection = document.querySelector('#buy');
    if (buySection) {
        const offsetTop = buySection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Modal functionality
const modal = document.getElementById('notificationModal');
const closeBtn = document.querySelector('.close');

// Show notification modal
function showNotification() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();
    
    if (email === '') {
        alert('Please enter your email address.');
        return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    modal.style.display = 'block';
    emailInput.value = ''; // Clear the input
}

// Close modal when clicking the X
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add hover effects to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button, .notify-button, .buy-now');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.ingredient-item, .testimonial-card, .product-details');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Enhanced 3D Flip Card Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all flip cards
    const flipCards = document.querySelectorAll('.ingredient-card, .testimonial-card, .product-card');
    
    flipCards.forEach(card => {
        const cardInner = card.querySelector('.ingredient-card-inner, .testimonial-card-inner, .product-card-inner');
        let isFlipped = false;
        
        // Mouse events
        card.addEventListener('mouseenter', function() {
            if (!isFlipped) {
                cardInner.style.transform = 'rotateY(180deg)';
                isFlipped = true;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (isFlipped) {
                cardInner.style.transform = 'rotateY(0deg)';
                isFlipped = false;
            }
        });
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        card.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        card.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && !isFlipped) {
                    // Swipe left - flip to back
                    cardInner.style.transform = 'rotateY(180deg)';
                    isFlipped = true;
                } else if (diff < 0 && isFlipped) {
                    // Swipe right - flip to front
                    cardInner.style.transform = 'rotateY(0deg)';
                    isFlipped = false;
                }
            } else {
                // Tap to toggle
                if (isFlipped) {
                    cardInner.style.transform = 'rotateY(0deg)';
                    isFlipped = false;
                } else {
                    cardInner.style.transform = 'rotateY(180deg)';
                    isFlipped = true;
                }
            }
        }
        
        // Click events for accessibility
        card.addEventListener('click', function(e) {
            // Prevent click if it's a button inside the card
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }
            
            if (isFlipped) {
                cardInner.style.transform = 'rotateY(0deg)';
                isFlipped = false;
            } else {
                cardInner.style.transform = 'rotateY(180deg)';
                isFlipped = true;
            }
        });
        
        // Keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (isFlipped) {
                    cardInner.style.transform = 'rotateY(0deg)';
                    isFlipped = false;
                } else {
                    cardInner.style.transform = 'rotateY(180deg)';
                    isFlipped = true;
                }
            }
        });
        
        // Make cards focusable for accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Flip card to see more information');
    });
    
    // Add smooth reveal animation for cards
    const flipCardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    flipCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        flipCardObserver.observe(card);
    });
});

// Add some satirical console messages
console.log('%cANXIETY — Eau de Stress', 'color: #1a1a1a; font-size: 20px; font-weight: bold;');
console.log('%cBecause stress should smell expensive.', 'color: #666; font-size: 14px; font-style: italic;');
console.log('%cConsole.log: The only place where your anxiety is actually productive.', 'color: #999; font-size: 12px;');
console.log('%c3D Flip Cards: Making anxiety interactive since 2024.', 'color: #1a1a1a; font-size: 12px; font-weight: bold;'); 
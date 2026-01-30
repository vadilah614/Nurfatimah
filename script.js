// ========================================
// CONFETTI ANIMATION
// ========================================
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#FFD4B2', '#FFABAB', '#C4F1BE', '#E5D4FF', '#FFF9C4', '#B4E4FF', '#FF8562', '#FF6B9D'];
    const shapes = ['circle', 'square', 'triangle'];
    
    // Create 50 confetti pieces
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        // Apply styles
        confetti.style.backgroundColor = color;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.left = left + '%';
        confetti.style.animationDelay = delay + 's';
        confetti.style.animationDuration = duration + 's';
        
        // Shape variations
        if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
        } else if (shape === 'triangle') {
            confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        }
        
        confettiContainer.appendChild(confetti);
    }
}

// ========================================
// SMOOTH SCROLL & SECTION NAVIGATION
// ======================================== 
function initSmoothScroll() {
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.dot');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Navigation dots click handler
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Update active dot on scroll (debounced for performance)
    let scrollTimeout;
    function updateActiveDot() {
        let currentSection = 0;
        const scrollPos = window.scrollY + window.innerHeight / 2;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                currentSection = index;
            }
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSection);
        });
        
        // Hide scroll indicator after scrolling down
        if (window.scrollY > 100) {
            scrollIndicator.classList.add('hide');
        } else {
            scrollIndicator.classList.remove('hide');
        }
    }
    
    // Listen to scroll events with debouncing
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveDot, 50);
    }, { passive: true });
    
    // Initial check
    updateActiveDot();
}

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe memory stories
    const memoryStories = document.querySelectorAll('.memory-story');
    memoryStories.forEach(story => {
        observer.observe(story);
    });
    
    // Observe photo frames
    const photoFrames = document.querySelectorAll('.photo-frame');
    photoFrames.forEach(frame => {
        observer.observe(frame);
    });
    
    // Observe letters
    const letters = document.querySelectorAll('.letter-envelope');
    letters.forEach(letter => {
        observer.observe(letter);
    });
}

// ========================================
// KEYBOARD NAVIGATION (Desktop only)
// ========================================
function initKeyboardNav() {
    // Only enable on desktop
    if (window.innerWidth <= 768) return;
    
    const sections = document.querySelectorAll('.section');
    let currentIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        // Arrow Down or Page Down
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            if (currentIndex < sections.length - 1) {
                currentIndex++;
                sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
            }
        }
        // Arrow Up or Page Up
        else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            if (currentIndex > 0) {
                currentIndex--;
                sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
            }
        }
        // Home key
        else if (e.key === 'Home') {
            e.preventDefault();
            currentIndex = 0;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // End key
        else if (e.key === 'End') {
            e.preventDefault();
            currentIndex = sections.length - 1;
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
    
    // Update current index on scroll
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                currentIndex = index;
            }
        });
    }, { passive: true });
}

// ========================================
// INTERACTIVE PHOTO FRAMES
// ========================================
function initPhotoInteraction() {
    const photoFrames = document.querySelectorAll('.photo-frame');
    
    photoFrames.forEach(frame => {
        const frameBorder = frame.querySelector('.frame-border');
        
        frame.addEventListener('mouseenter', () => {
            // Add slight rotation on hover
            const randomRotation = (Math.random() - 0.5) * 6; // -3 to +3 degrees
            frameBorder.style.transform = `translateY(-10px) rotate(${randomRotation}deg)`;
        });
        
        frame.addEventListener('mouseleave', () => {
            frameBorder.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

// ========================================
// LETTER ENVELOPE ANIMATION
// ========================================
function initLetterAnimation() {
    const envelopes = document.querySelectorAll('.letter-envelope');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const paper = entry.target.querySelector('.letter-paper');
                paper.style.animation = 'unfold 0.8s ease-out';
            }
        });
    }, { threshold: 0.3 });
    
    envelopes.forEach(envelope => {
        observer.observe(envelope);
    });
}

// ========================================
// PARALLAX EFFECT FOR SHAPES (Desktop only)
// ========================================
function initParallax() {
    // Disable on mobile for better performance
    if (window.innerWidth <= 768) return;
    
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.05;
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    }, { passive: true });
}

// ========================================
// FACT CARDS INTERACTION
// ========================================
function initFactCards() {
    const factCards = document.querySelectorAll('.fact-card');
    
    factCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Add click animation
        card.addEventListener('click', () => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'pulse 0.5s ease';
            }, 10);
        });
    });
}

// ========================================
// EASTER EGG: KONAMI CODE
// ========================================
function initEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    // Create massive confetti explosion
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#FFD4B2', '#FFABAB', '#C4F1BE', '#E5D4FF', '#FFF9C4', '#B4E4FF', '#FF8562', '#FF6B9D'];
    
    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 15 + 5;
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        
        confetti.style.backgroundColor = color;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.left = left + '%';
        confetti.style.borderRadius = '50%';
        confetti.style.animationDuration = duration + 's';
        
        confettiContainer.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => confetti.remove(), duration * 1000);
    }
    
    // Show alert
    setTimeout(() => {
        alert('🎉 SURPRISE! Extra confetti for the birthday celebration! 🎂');
    }, 100);
}

// ========================================
// MOBILE TOUCH NAVIGATION (Gentle)
// ========================================
function initTouchNav() {
    // Only on mobile
    if (window.innerWidth > 768) return;
    
    let touchStartY = 0;
    let touchStartTime = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        const touchDistance = touchStartY - touchEndY;
        
        // Only trigger if it's a quick swipe (< 300ms) and significant distance (> 100px)
        if (touchDuration < 300 && Math.abs(touchDistance) > 100) {
            // This is a quick swipe, let natural scroll handle it
            // We're not forcing section jumps anymore
        }
    }, { passive: true });
}

// ========================================
// LAZY LOAD IMAGES
// ========================================
function initLazyLoad() {
    const images = document.querySelectorAll('.museum-photo');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px' // Start loading a bit before visible
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// MUSIC PLAYER WITH AUTOPLAY MODAL
// ========================================
function initMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicPlayer = document.getElementById('musicPlayer');
    const welcomeModal = document.getElementById('welcomeModal');
    const startButton = document.getElementById('startButton');
    
    if (!musicToggle || !bgMusic || !welcomeModal) return;
    
    let isPlaying = false;
    
    // Function to start music
    function startMusic() {
        bgMusic.play().then(() => {
            musicPlayer.classList.remove('paused');
            isPlaying = true;
            console.log('🎵 Music started!');
        }).catch(e => {
            console.log('Music autoplay blocked:', e);
            // Fallback: Show music button notification
        });
    }
    
    // Function to hide modal
    function hideModal() {
        welcomeModal.classList.add('hidden');
        setTimeout(() => {
            welcomeModal.style.display = 'none';
        }, 500);
    }
    
    // Start button click handler
    startButton.addEventListener('click', () => {
        startMusic();
        hideModal();
    });
    
    // Click anywhere on modal to start
    welcomeModal.addEventListener('click', (e) => {
        if (e.target === welcomeModal || e.target === startButton) {
            startMusic();
            hideModal();
        }
    });
    
    // Manual toggle music button
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicPlayer.classList.add('paused');
            isPlaying = false;
        } else {
            bgMusic.play().catch(e => {
                console.log('Music play prevented:', e);
            });
            musicPlayer.classList.remove('paused');
            isPlaying = true;
        }
    });
    
    // Auto-pause when leaving page
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying) {
            bgMusic.pause();
            musicPlayer.classList.add('paused');
            isPlaying = false;
        }
    });
    
    // Set volume (optional, adjust as needed)
    bgMusic.volume = 0.5; // 50% volume
}

// ========================================
// PHOTO ORIENTATION DETECTION
// ========================================
function detectPhotoOrientation() {
    const photos = document.querySelectorAll('.museum-photo');
    
    photos.forEach(photo => {
        // Wait for image to load
        if (photo.complete) {
            setOrientation(photo);
        } else {
            photo.addEventListener('load', () => setOrientation(photo));
        }
    });
    
    function setOrientation(img) {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const frame = img.closest('.photo-frame');
        
        if (!frame) return;
        
        // Determine orientation
        if (height > width) {
            // Portrait
            frame.classList.add('portrait');
            frame.classList.remove('landscape');
        } else {
            // Landscape or Square
            frame.classList.add('landscape');
            frame.classList.remove('portrait');
        }
    }
}

// ========================================
// INITIALIZE EVERYTHING ON PAGE LOAD
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Create confetti
    createConfetti();
    
    // Initialize core features
    initSmoothScroll();
    initScrollAnimations();
    initKeyboardNav(); // Desktop only
    initPhotoInteraction();
    initLetterAnimation();
    initParallax(); // Desktop only
    initFactCards();
    initEasterEgg();
    initTouchNav(); // Mobile only - gentle, no forced jumps
    initLazyLoad();
    initMusicPlayer(); // Background music player
    detectPhotoOrientation(); // Detect portrait vs landscape photos
    
    // Log success
    console.log('🎂 Birthday website loaded successfully! 🎉');
    console.log('💡 Mobile-optimized with smooth natural scrolling!');
    console.log('🎮 Desktop tip: Try the Konami Code! ↑↑↓↓←→←→BA');
});

// ========================================
// HANDLE WINDOW RESIZE
// ========================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Re-initialize on resize to adapt to new screen size
        console.log('Window resized - adapting layout...');
    }, 250);
}, { passive: true });
// Updated on: [current date]
// Add this at the beginning of your script.js
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add logo click handler
document.addEventListener('DOMContentLoaded', function() {
    // Get the logo element
    const logo = document.querySelector('.logo');
    
    // Add click handler to logo
    logo.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToTop();
    });
    
    // Make logo clickable with pointer cursor
    logo.style.cursor = 'pointer';
});

// Handle page reload scroll position
window.onbeforeunload = function() {
    scrollToTop();
};

// Remove any stored scroll position on page load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Disable cursor effect on mobile
if ('ontouchstart' in window) {
    const cursorEffect = document.querySelector('.cursor-effect');
    if (cursorEffect) {
        cursorEffect.style.display = 'none';
    }
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // If it's the home link, scroll to hero landing
        if (this.classList.contains('home-link')) {
            document.querySelector('#home').scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            // For other links, scroll to the element
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add initial scroll on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add loading="lazy" to all images for better performance
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
    
    // Update copyright year
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Theme toggling
    const themeToggle = document.querySelector('.theme-toggle');
    const mapIframe = document.getElementById('googleMap');
    
    // Function to update map theme
    function updateMapTheme(isDark) {
        if (!mapIframe) return;
        let currentSrc = mapIframe.src;
        currentSrc = currentSrc.replace('&darkmode=1', '').replace('&darkmode=0', '');
        mapIframe.src = currentSrc + (isDark ? '&darkmode=1' : '&darkmode=0');
    }
    
    // Always set dark mode as default, regardless of device or saved preference
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    updateMapTheme(true);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateMapTheme(newTheme === 'dark');
    });
    
    // Add keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            document.querySelector('.prev-arrow').click();
        } else if (e.key === 'ArrowRight') {
            document.querySelector('.next-arrow').click();
        }
    });

    // Handle placeholder text for form inputs
    const formInputs = document.querySelectorAll('#bookingForm input, #bookingForm textarea');
    
    formInputs.forEach(input => {
        const originalPlaceholder = input.placeholder;
        
        input.addEventListener('focus', function() {
            if (this.placeholder.startsWith('e.g.')) {
                this.placeholder = '';
            }
        });

        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.placeholder = originalPlaceholder;
            }
        });
    });
});

// Testimonial Carousel
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    const prevButton = document.querySelector('.prev-review');
    const nextButton = document.querySelector('.next-review');
    let currentIndex = 0;
    let autoPlayTimer;
    let isHovered = false;
    let isTransitioning = false;
    
    // Clone first and last slides for infinite loop
    const firstClone = cards[0].cloneNode(true);
    const secondClone = cards[1].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);
    const secondLastClone = cards[cards.length - 2].cloneNode(true);
    
    // Add clones to both ends
    track.appendChild(firstClone);
    track.appendChild(secondClone);
    track.insertBefore(lastClone, cards[0]);
    track.insertBefore(secondLastClone, cards[0]);
    
    // Adjust initial position
    track.style.transform = `translateX(-200%)`;
    
    function updateCarousel(transition = true) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        track.style.transition = transition ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
        track.style.transform = `translateX(-${(currentIndex + 2) * 100}%)`;
        
        if (!transition) {
            isTransitioning = false;
        }
    }

    function goToNext() {
        if (isTransitioning) return;
        currentIndex++;
        updateCarousel();
    }

    function goToPrev() {
        if (isTransitioning) return;
        currentIndex--;
        updateCarousel();
    }
    
    // Handle infinite scroll
    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        
        if (currentIndex >= cards.length) {
            currentIndex = 0;
            track.style.transition = 'none';
            track.style.transform = `translateX(-200%)`;
        } else if (currentIndex < 0) {
            currentIndex = cards.length - 1;
            track.style.transition = 'none';
            track.style.transform = `translateX(-${(cards.length + 1) * 100}%)`;
        }
    });

    // Autoplay functionality
    function startAutoPlay() {
        stopAutoPlay();
        if (!isHovered) {
            autoPlayTimer = setInterval(goToNext, 5000);
        }
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
        }
    }

    // Touch/Swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoPlay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > 50) { // minimum swipe distance
            if (swipeDistance > 0) {
                goToPrev();
            } else {
                goToNext();
            }
        }
        startAutoPlay();
    });

    // Mouse drag functionality
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startPos = e.clientX;
        stopAutoPlay();
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentPosition = e.clientX;
        const diff = currentPosition - startPos;
        
        if (Math.abs(diff) > 50) {
            isDragging = false;
            if (diff > 0) {
                goToPrev();
            } else {
                goToNext();
            }
            startAutoPlay();
        }
    });

    track.addEventListener('mouseup', () => {
        isDragging = false;
        startAutoPlay();
    });

    track.addEventListener('mouseleave', () => {
        isDragging = false;
        startAutoPlay();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToPrev();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            goToNext();
            startAutoPlay();
        }
    });

    // Start autoplay
    startAutoPlay();

    // Add button click handlers
    prevButton.addEventListener('click', () => {
        goToPrev();
        startAutoPlay();
    });

    nextButton.addEventListener('click', () => {
        goToNext();
        startAutoPlay();
    });
});

// Cursor effect
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor-effect');
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        document.documentElement.style.setProperty('--cursor-x', x + '%');
        document.documentElement.style.setProperty('--cursor-y', y + '%');
        
        // Show the effect when mouse moves
        cursor.style.opacity = '1';
    });
    
    // Hide the effect when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
});

// Business Hours Status
function updateBusinessHours() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Update current day highlight
    const hoursList = document.querySelector('.hours-list');
    const allDays = hoursList.querySelectorAll('li');
    allDays.forEach(day => {
        if (parseInt(day.dataset.day) === currentDay) {
            day.classList.add('current-day');
        } else {
            day.classList.remove('current-day');
        }
    });
    
    // Check if we're currently open
    const statusElement = document.querySelector('.current-status');
    const isWeekday = currentDay >= 1 && currentDay <= 6;
    const currentTime = currentHour + (currentMinute / 60);
    
    if (!statusElement) return;
    
    if (currentDay === 0) {
        // Sunday
        statusElement.textContent = "Currently Closed - Opens Monday at 8:00 AM";
        statusElement.classList.add('closed');
        statusElement.classList.remove('open');
    } else if (isWeekday && currentTime >= 8 && currentTime < 18) {
        // Open on weekday between 8 AM and 6 PM
        statusElement.textContent = "Currently Open";
        statusElement.classList.add('open');
        statusElement.classList.remove('closed');
    } else {
        // Outside business hours
        const nextOpenDay = currentDay === 0 ? "Monday" : 
                          currentDay === 6 ? "Monday" : 
                          getDayName(currentDay + 1);
        
        statusElement.textContent = `Currently Closed - Opens ${currentTime >= 18 ? nextOpenDay : 'today'} at 8:00 AM`;
        statusElement.classList.add('closed');
        statusElement.classList.remove('open');
    }
}

function getDayName(dayIndex) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
}

// Update business hours status immediately and every minute
updateBusinessHours();
setInterval(updateBusinessHours, 60000);

// Image gallery expansion
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        const images = Array.from(document.querySelectorAll('.gallery-item img'));
        const currentIndex = images.findIndex(img => img.src === item.querySelector('img').src);
        
        const overlay = document.createElement('div');
        const backdrop = document.createElement('div');
        const expandedImg = document.createElement('img');
        const closeBtn = document.createElement('button');
        const prevBtn = document.createElement('button');
        const nextBtn = document.createElement('button');
        
        overlay.className = 'image-overlay';
        backdrop.className = 'overlay-backdrop';
        closeBtn.className = 'overlay-close';
        prevBtn.className = 'overlay-nav prev';
        nextBtn.className = 'overlay-nav next';
        
        closeBtn.innerHTML = '×';
        prevBtn.innerHTML = '❮';
        nextBtn.innerHTML = '❯';
        
        expandedImg.src = images[currentIndex].src;
        
        overlay.appendChild(expandedImg);
        overlay.appendChild(closeBtn);
        overlay.appendChild(prevBtn);
        overlay.appendChild(nextBtn);
        
        document.body.appendChild(backdrop);
        document.body.appendChild(overlay);
        
        // Add active class after a small delay to trigger animation
        requestAnimationFrame(() => {
            overlay.classList.add('active');
            backdrop.classList.add('active');
        });

        // Navigation functions
        function showImage(index) {
            if (index >= 0 && index < images.length) {
                expandedImg.src = images[index].src;
                return index;
            }
            return currentIndex;
        }

        let currentImageIndex = currentIndex;

        // Event listeners for navigation
        prevBtn.addEventListener('click', () => {
            currentImageIndex = showImage(currentImageIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            currentImageIndex = showImage(currentImageIndex + 1);
        });

        // Keyboard navigation
        function handleKeyPress(e) {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = showImage(currentImageIndex - 1);
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = showImage(currentImageIndex + 1);
            } else if (e.key === 'Escape') {
                closeOverlay();
            }
        }

        document.addEventListener('keydown', handleKeyPress);
        
        // Close handlers
        const closeOverlay = () => {
            overlay.classList.remove('active');
            backdrop.classList.remove('active');
            document.removeEventListener('keydown', handleKeyPress);
            setTimeout(() => {
                overlay.remove();
                backdrop.remove();
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeOverlay);
        backdrop.addEventListener('click', closeOverlay);
    });
});

// Add scroll detection for hero visibility
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const currentScroll = window.pageYOffset;

    if (currentScroll < lastScroll) {
        // Scrolling up
        header?.classList.add('visible');
        hero?.classList.add('visible');
    } else {
        // Scrolling down
        header?.classList.remove('visible');
        hero?.classList.remove('visible');
    }

    lastScroll = currentScroll;
});

// Add sound effects for buttons
document.addEventListener('DOMContentLoaded', function() {
    const hoverSound = document.getElementById('hoverSound');
    const clickSound = document.getElementById('clickSound');
    
    // Set base volumes
    hoverSound.volume = 0.1;
    clickSound.volume = 0.15;
    
    // Function to play sound with random pitch
    function playWithRandomPitch(audio) {
        if (!soundEnabled) return;
        
        // Create a new audio context each time
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaElementSource(audio.cloneNode());
        const pitchShift = audioCtx.createOscillator();
        
        // Randomize pitch slightly (between 0.95 and 1.05 of original)
        const pitch = 0.95 + Math.random() * 0.1;
        source.playbackRate.value = pitch;
        
        source.connect(audioCtx.destination);
        audio.currentTime = 0;
        audio.play();
        
        // Clean up
        setTimeout(() => audioCtx.close(), 1000);
    }
    
    // Add sound to all interactive elements
    const interactiveElements = document.querySelectorAll('.cta-button-landing, .contact-item, .phone-button, .theme-toggle, .nav-links a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            playWithRandomPitch(hoverSound);
        });
        
        element.addEventListener('click', () => {
            playWithRandomPitch(clickSound);
        });
    });
});

// Add sound toggle
let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';

function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', soundEnabled);
}

// Only play sounds if enabled
function playSound(audio) {
    if (soundEnabled) {
        audio.currentTime = 0;
        audio.play();
    }
}

// Add intersection observer to handle active nav states
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section, .hero-landing');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '-20% 0px -20% 0px' // Adds margin to when the observation triggers
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const id = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => observer.observe(section));
});

// Better mobile detection
function isMobileDevice() {
    return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0 ||
        window.matchMedia('(max-width: 768px)').matches
    );
}

if (isMobileDevice()) {
    // Existing mobile optimizations...
    
    // Disable hover-only features
    document.body.classList.add('touch-device');
    
    // Adjust scroll behavior for better performance
    document.documentElement.style.scrollBehavior = 'auto';
}

// Enhanced touch handling for testimonials
document.addEventListener('DOMContentLoaded', function() {
    if (!isMobileDevice()) return; // Only run on mobile devices

    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialContainer = document.querySelector('.testimonial-container');
    
    if (!testimonialTrack || !testimonialContainer) return;

    const testimonials = document.querySelectorAll('.testimonial-card');
    const totalTestimonials = testimonials.length;
    
    let startX = 0;
    let currentTranslateX = 0;
    let prevTranslateX = 0;
    let isDragging = false;
    let currentIndex = 0;
    let animationId = null;

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function setSliderPosition() {
        const slideWidth = testimonialContainer.offsetWidth;
        currentTranslateX = -currentIndex * slideWidth;
        testimonialTrack.style.transform = `translateX(${currentTranslateX}px)`;
    }

    function animateSlide() {
        testimonialTrack.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        setSliderPosition();
        
        // Update active testimonial
        testimonials.forEach((testimonial, index) => {
            if (index === currentIndex) {
                testimonial.style.opacity = '1';
            } else {
                testimonial.style.opacity = '0.5';
            }
        });
    }

    function touchStart(event) {
        startX = getPositionX(event);
        isDragging = true;
        testimonialTrack.style.transition = 'none';
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }

    function touchMove(event) {
        if (!isDragging) return;
        
        const currentX = getPositionX(event);
        const diff = currentX - startX;
        const slideWidth = testimonialContainer.offsetWidth;
        
        // Add resistance at the edges
        if (
            (currentIndex === 0 && diff > 0) || 
            (currentIndex === totalTestimonials - 1 && diff < 0)
        ) {
            currentTranslateX = prevTranslateX + (diff * 0.3);
        } else {
            currentTranslateX = prevTranslateX + diff;
        }
        
        testimonialTrack.style.transform = `translateX(${currentTranslateX}px)`;
    }

    function touchEnd() {
        isDragging = false;
        const slideWidth = testimonialContainer.offsetWidth;
        const movedBy = currentTranslateX - prevTranslateX;
        
        if (Math.abs(movedBy) > slideWidth / 3) {
            if (movedBy > 0 && currentIndex > 0) {
                currentIndex--;
            } else if (movedBy < 0 && currentIndex < totalTestimonials - 1) {
                currentIndex++;
            }
        }
        
        prevTranslateX = -currentIndex * slideWidth;
        animateSlide();
    }

    testimonialTrack.addEventListener('touchstart', touchStart, { passive: true });
    testimonialTrack.addEventListener('touchmove', touchMove, { passive: false });
    testimonialTrack.addEventListener('touchend', touchEnd);

    // Initialize first slide
    setSliderPosition();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        setSliderPosition();
    });
});

// Testimonial swipe functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;

    let startX;
    let isDragging = false;
    let currentIndex = 0;
    const slides = track.children;
    let slideWidth = track.parentElement.offsetWidth;

    // Function to trigger the automated slide behavior
    function triggerAutoSlide(direction) {
        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');
        
        if (direction === 'left') {
            nextArrow.click(); // Move to next slide
        } else if (direction === 'right') {
            prevArrow.click(); // Move to previous slide
        }
    }

    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    }

    function handleTouchEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;
        const swipeThreshold = slideWidth * 0.2;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe right (previous)
                triggerAutoSlide('right');
            } else {
                // Swipe left (next)
                triggerAutoSlide('left');
            }
        }
    }

    // Event listeners
    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchend', handleTouchEnd);

    // Handle window resize
    window.addEventListener('resize', () => {
        slideWidth = track.parentElement.offsetWidth;
    });
});

// Add this call to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    handleTestimonialScroll();
});

// Add lazy loading for images and iframes
document.addEventListener('DOMContentLoaded', function() {
    // Scroll Progress Indicator
    const progressBar = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY) / (document.documentElement.scrollHeight - window.innerHeight);
        progressBar.style.transform = `scaleX(${scrollPercent})`;
    });

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });

    // Loading States
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('click', function(e) {
            if (this.classList.contains('loading')) return;
            
            const isAsync = this.hasAttribute('data-async');
            if (isAsync) {
                e.preventDefault();
                this.classList.add('loading');
                // Remove loading state after action completes
                setTimeout(() => this.classList.remove('loading'), 2000);
            }
        });
    });

    // Offline Support
    function updateOnlineStatus() {
        const status = navigator.onLine ? 'online' : 'offline';
        document.body.classList.toggle('offline', !navigator.onLine);
        
        if (!navigator.onLine) {
            const toast = document.createElement('div');
            toast.className = 'toast offline-toast';
            toast.textContent = 'You are offline. Some features may be unavailable.';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

// Add error boundary
window.addEventListener('error', function(e) {
    console.error('Global error:', e);
    // Optionally show user-friendly error message
});

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    // Initialize EmailJS with your public key
    emailjs.init("p7N91eLXRfrehkYPR");
    
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = bookingForm.querySelector('button');
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';

        try {
            // Basic data
            const emailData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                postcode: document.getElementById('postcode').value,
                vehicle_reg: document.getElementById('vehicle_reg').value,
                damage_type: document.getElementById('damage_type').value,
                timestamp: new Date().toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }),
                photo: '',  // Default empty
                has_photo: 'No'
            };

            // Handle photo if exists
            const photoInput = document.getElementById('damage_photo');
            if (photoInput.files.length > 0) {
                try {
                    const uploadPromises = Array.from(photoInput.files).map(async file => {
                        const photoData = await new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onloadend = () => resolve(reader.result);
                            reader.onerror = () => reject(reader.error);
                            reader.readAsDataURL(file);
                        });

                        const compressedPhoto = await compressImage(photoData, 800);
                        const imgurUrl = await uploadToImgur(compressedPhoto);
                        return imgurUrl;
                    });

                    const photoUrls = await Promise.all(uploadPromises);
                    emailData.photos = photoUrls;
                    emailData.photo = photoUrls.join('\n'); // For backward compatibility
                    console.log('Images uploaded to Imgur:', photoUrls);
                } catch (error) {
                    console.error('Error processing/uploading images:', error);
                    emailData.photo = 'https://placehold.co/400x300?text=Error+Processing+Images';
                }
            } else {
                emailData.photo = 'https://placehold.co/400x300?text=No+Photos';
            }

            // Log the final email data (without showing the full image data)
            console.log('Sending email with data:', {
                ...emailData,
                photo: emailData.photo.substring(0, 50) + '...'
            });

            // Remove has_photo from emailData
            delete emailData.has_photo;

            // Add priority flag and subject line
            emailData.priority = 'high';
            emailData.subject = `Urgent: New Windscreen Service Request - ${emailData.timestamp}`;

            // Send with specific configuration
            const response = await emailjs.send(
                "service_yt0rvfz",
                "template_q52pbxo",
                emailData,
                "p7N91eLXRfrehkYPR",
                {
                    timeZone: 'Europe/London',
                    priority: 'high',
                    retryCount: 3  // Will retry sending 3 times if failed
                }
            );

            // Verify the send was successful
            if (response.status !== 200) {
                throw new Error(`Email send failed with status: ${response.status}`);
            }

            console.log("Email sent successfully", response);
            
            // Add backup notification (optional)
            try {
                await emailjs.send(
                    "service_yt0rvfz",
                    "template_backup",  // Create a simpler backup template
                    {
                        name: emailData.name,
                        phone: emailData.phone,
                        timestamp: emailData.timestamp
                    }
                );
            } catch (backupError) {
                console.error("Backup notification failed:", backupError);
            }

            alert('Request submitted successfully! We will contact you shortly to arrange the service.');
            bookingForm.reset();
            
            // Clear image preview
            const preview = document.querySelector('.file-preview');
            if (preview) {
                preview.innerHTML = '';
            }

        } catch (error) {
            console.error("Final email send failure:", error);
            console.error("Error details:", {
                message: error.message,
                text: error.text,
                name: error.name,
                stack: error.stack
            });
            alert('Sorry, there was an error submitting your request. Please try calling us directly at 07832 100800.');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Submit Request';
        }
    });
});

// Add these functions to your script.js
function openServiceModal() {
    const modal = document.getElementById('serviceModal');
    document.body.classList.add('modal-open');
    // Just add active class, no need to set display
    modal.classList.add('active');
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    document.body.classList.remove('modal-open');
    modal.classList.remove('active');
    // No need for setTimeout or display changes
}

// Add these event listeners to your DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking the close button
    document.querySelector('.close-modal').addEventListener('click', closeServiceModal);

    // Close modal when clicking outside
    document.getElementById('serviceModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeServiceModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeServiceModal();
        }
    });
});

// Update image preview functionality
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('damage_photo');
    const preview = document.querySelector('.file-preview');

    if (fileInput && preview) {
        fileInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            
            files.forEach(file => {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // Create container for this preview
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    
                    // Create image
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    
                    // Create remove button
                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'remove-image';
                    removeBtn.innerHTML = '×';
                    
                    // Add remove functionality
                    removeBtn.onclick = function(e) {
                        e.preventDefault();
                        previewItem.remove();
                        // Update the file input
                        const remainingPreviews = preview.querySelectorAll('.preview-item').length;
                        if (remainingPreviews === 0) {
                            fileInput.value = '';
                        }
                    };
                    
                    // Add elements to preview
                    previewItem.appendChild(img);
                    previewItem.appendChild(removeBtn);
                    preview.appendChild(previewItem);
                }
                
                reader.readAsDataURL(file);
            });
        });
    }
});

// Update the compression function to be less aggressive
function compressImage(base64String, maxWidth = 800) { // Increased from 400 to 800
    return new Promise((resolve, reject) => {
        try {
            const img = new Image();
            img.onerror = () => reject(new Error('Failed to load image'));
            img.onload = function() {
                try {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    
                    // Calculate new dimensions - less aggressive scaling
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                    
                    // Only reduce height if it's extremely tall
                    if (height > maxWidth * 1.5) {
                        width = Math.round((width * maxWidth * 1.5) / height);
                        height = maxWidth * 1.5;
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, width, height);
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Start with high quality
                    let quality = 0.9;
                    let result = canvas.toDataURL('image/jpeg', quality);
                    let sizeInKb = Math.round((result.length * 3) / 4 / 1024);
                    
                    // Only reduce quality if the image is very large
                    if (sizeInKb > 2048) { // 2MB limit
                        quality = 0.7;
                        result = canvas.toDataURL('image/jpeg', quality);
                    }
                    
                    // Verify final result is a valid data URL
                    if (!result.startsWith('data:image/jpeg;base64,')) {
                        reject(new Error('Failed to generate valid image data URL'));
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            };
            img.src = base64String;
        } catch (error) {
            reject(error);
        }
    });
}

// Add this function to handle Imgur uploads
async function uploadToImgur(base64Image) {
    // Remove the data:image/jpeg;base64, prefix
    const base64Data = base64Image.split(',')[1];
    
    try {
        const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                'Authorization': 'c4c4d4c3de5f6a9', // You'll need to get this
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: base64Data,
                type: 'base64'
            })
        });

        const data = await response.json();
        if (!data.success) {
            throw new Error('Imgur upload failed');
        }

        return data.data.link;
    } catch (error) {
        console.error('Imgur upload error:', error);
        throw error;
    }
}

// Keyboard: ↑↑↓↓←→←→BA
// Touch: top-top-bottom-bottom-left-right-left-right
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let touchCode = ['top', 'top', 'bottom', 'bottom', 'left', 'right', 'left', 'right'];
let inputSequence = [];
let touchSequence = [];
let lastTapTime = 0;

document.addEventListener("keydown", (e) => {
    inputSequence.push(e.keyCode);
    
    if (inputSequence.toString().indexOf(konamiCode) >= 0) {
        showEasterEgg();
        inputSequence = [];
    }
});

document.addEventListener('touchstart', (e) => {
    const currentTime = Date.now();
    const tapGap = currentTime - lastTapTime;
    
    if (tapGap > 1500) {
        touchSequence = [];
    }
    
    const touch = e.touches[0];
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    let position;
    if (touch.clientY < windowHeight / 3) {
        position = 'top';
    } else if (touch.clientY > (windowHeight * 2/3)) {
        position = 'bottom';
    } else if (touch.clientX < windowWidth / 3) {
        position = 'left';
    } else if (touch.clientX > (windowWidth * 2/3)) {
        position = 'right';
    } else {
        position = 'center';
        touchSequence = [];
    }
    
    touchSequence.push(position);
    lastTapTime = currentTime;
    
    if (touchSequence.length >= touchCode.length) {
        const lastEightTaps = touchSequence.slice(-touchCode.length);
        if (lastEightTaps.toString() === touchCode.toString()) {
            showEasterEgg();
            touchSequence = [];
        }
        if (touchSequence.length > touchCode.length * 2) {
            touchSequence.shift();
        }
    }
});

function showEasterEgg() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail konami-trail';
    trail.style.left = '50%';
    trail.style.top = '50%';
    trail.textContent = '✦ Made By: Matin Motaghi ✦';
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 2000);
}
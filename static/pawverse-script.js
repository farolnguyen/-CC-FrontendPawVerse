// DOM Elements
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-btn');
const favoriteBtns = document.querySelectorAll('.favorite-btn');
const cartCount = document.querySelector('.cart-count');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const categoryTrack = document.querySelector('.category-track');
const carouselBtns = document.querySelectorAll('.carousel-btn');
const dots = document.querySelectorAll('.dot');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const newsletterForm = document.querySelector('.newsletter-form');
const testimonialNav = document.querySelector('.testimonial-nav');
const navBtns = document.querySelectorAll('.nav-btn');
const header = document.querySelector('.header');

// State
let cartItems = 0;
let currentCategoryIndex = 0;
let currentTestimonialIndex = 0;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeAnimations();
    updateCartCount();
});

// Event Listeners
function initializeEventListeners() {
    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Favorite buttons
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', toggleFavorite);
    });

    // Add to cart buttons
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', addToCart);
    });

    // Category carousel
    if (carouselBtns.length > 0) {
        carouselBtns[0].addEventListener('click', () => scrollCategories('prev'));
        carouselBtns[1].addEventListener('click', () => scrollCategories('next'));
    }

    // Category dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToCategory(index));
    });

    // Category track drag
    if (categoryTrack) {
        initializeDragScroll(categoryTrack);
    }

    // Product tabs
    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => switchTab(index));
    });

    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Testimonial navigation
    if (navBtns.length > 0) {
        navBtns[0].addEventListener('click', () => navigateTestimonial('prev'));
        navBtns[1].addEventListener('click', () => navigateTestimonial('next'));
    }

    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);

    // Category cards hover effect
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px) scale(1)';
        });
    });

    // Product cards hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px) scale(1)';
        });
    });

    // News cards hover effect
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px) scale(1)';
        });
    });

    // Lazy loading for images
    initializeLazyLoading();

    // User icon interaction
    const userIcon = document.querySelector('.user-icon');
    if (userIcon) {
        userIcon.addEventListener('click', function() {
            showNotification('User profile clicked', 'info');
        });
    }

    // Cart icon interaction
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            showNotification(`Cart has ${cartItems} items`, 'info');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Arrow keys for category carousel
        if (e.key === 'ArrowLeft' && categoryTrack) {
            scrollCategories('prev');
        } else if (e.key === 'ArrowRight' && categoryTrack) {
            scrollCategories('next');
        }
        
        // Escape key to close notifications
        if (e.key === 'Escape') {
            const notification = document.querySelector('.notification');
            if (notification) {
                notification.remove();
            }
        }
    });

    // Touch gestures for mobile
    initializeTouchGestures();

    console.log('PawVerse website loaded successfully!');
    showNotification('Welcome to PawVerse! 🐾', 'success');
}

// Functions
function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        showNotification(`Searching for: ${searchTerm}`, 'info');
        searchInput.value = '';
    }
}

function toggleFavorite(e) {
    const btn = e.currentTarget;
    btn.classList.toggle('active');
    
    if (btn.classList.contains('active')) {
        btn.innerHTML = '❤️';
        btn.style.color = '#dc2626';
        showNotification('Added to favorites!', 'success');
    } else {
        btn.innerHTML = '🤍';
        btn.style.color = '';
        showNotification('Removed from favorites', 'info');
    }
}

function addToCart(e) {
    const btn = e.currentTarget;
    const productCard = btn.closest('.product-card');
    const productName = productCard.querySelector('h4').textContent;
    
    cartItems++;
    updateCartCount();
    
    // Animation effect
    btn.textContent = 'Added!';
    btn.style.background = '#10b981';
    
    setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
    }, 1500);
    
    showNotification(`${productName} added to cart!`, 'success');
}

function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cartItems;
        cartCount.style.display = cartItems > 0 ? 'flex' : 'none';
    }
}

function scrollCategories(direction) {
    if (!categoryTrack) return;
    
    const scrollAmount = 300;
    
    if (direction === 'prev') {
        categoryTrack.scrollLeft -= scrollAmount;
    } else {
        categoryTrack.scrollLeft += scrollAmount;
    }
    
    updateCategoryDots();
}

function goToCategory(index) {
    if (!categoryTrack) return;
    
    const cardWidth = 232; // card width + gap
    categoryTrack.scrollLeft = cardWidth * index;
    currentCategoryIndex = index;
    updateCategoryDots();
}

function updateCategoryDots() {
    if (!categoryTrack || dots.length === 0) return;
    
    const scrollLeft = categoryTrack.scrollLeft;
    const cardWidth = 232;
    const newIndex = Math.round(scrollLeft / cardWidth);
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === newIndex);
    });
    
    currentCategoryIndex = newIndex;
}

function initializeDragScroll(element) {
    let isDown = false;
    let startX;
    let scrollLeft;

    element.addEventListener('mousedown', (e) => {
        isDown = true;
        element.style.cursor = 'grabbing';
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
    });

    element.addEventListener('mouseleave', () => {
        isDown = false;
        element.style.cursor = 'grab';
    });

    element.addEventListener('mouseup', () => {
        isDown = false;
        element.style.cursor = 'grab';
        updateCategoryDots();
    });

    element.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - element.offsetLeft;
        const walk = (x - startX) * 2;
        element.scrollLeft = scrollLeft - walk;
    });
}

function switchTab(index) {
    // Update buttons
    tabBtns.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
    
    // Update content
    tabPanes.forEach((pane, i) => {
        pane.classList.toggle('active', i === index);
    });
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification('Thank you for subscribing!', 'success');
        e.target.reset();
    }
}

function navigateTestimonial(direction) {
    const testimonials = document.querySelectorAll('.testimonial-content');
    if (testimonials.length === 0) return;
    
    if (direction === 'prev') {
        currentTestimonialIndex = Math.max(0, currentTestimonialIndex - 1);
    } else {
        currentTestimonialIndex = Math.min(testimonials.length - 1, currentTestimonialIndex + 1);
    }
    
    showNotification(`Testimonial ${currentTestimonialIndex + 1}`, 'info');
}

function handleHeaderScroll() {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}

function initializeAnimations() {
    // Intersection Observer for fade-in animations
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.category-card, .product-card, .news-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

function initializeTouchGestures() {
    if (!categoryTrack) return;
    
    let touchStartX = 0;
    let touchEndX = 0;

    categoryTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    categoryTrack.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                scrollCategories('next');
            } else {
                scrollCategories('prev');
            }
        }
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#dc2626';
            break;
        case 'warning':
            notification.style.background = '#f59e0b';
            break;
        default:
            notification.style.background = '#3b82f6';
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Performance optimization: Debounce scroll events
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

// Debounced header scroll
const debouncedHeaderScroll = debounce(handleHeaderScroll, 10);
window.removeEventListener('scroll', handleHeaderScroll);
window.addEventListener('scroll', debouncedHeaderScroll);

// Auto-scroll categories on hover
const categoryCarousel = document.querySelector('.category-carousel');
if (categoryCarousel && categoryTrack) {
    let autoScrollInterval;
    
    categoryCarousel.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    categoryCarousel.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            if (categoryTrack.scrollLeft >= categoryTrack.scrollWidth - categoryTrack.clientWidth) {
                categoryTrack.scrollLeft = 0;
            } else {
                categoryTrack.scrollLeft += 1;
            }
            updateCategoryDots();
        }, 30);
    });
}

// Export functions for potential external use
window.PawVerse = {
    showNotification,
    addToCart,
    toggleFavorite,
    updateCartCount
};

// KaziKE Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .step-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Process steps animation
    const processSteps = document.querySelectorAll('.process-step');
    let currentStep = 0;

    function animateProcessSteps() {
        processSteps.forEach((step, index) => {
            if (index <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        currentStep = (currentStep + 1) % processSteps.length;
    }

    // Start process animation after a delay
    setTimeout(() => {
        setInterval(animateProcessSteps, 2000);
    }, 1000);

    // Form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.firstName || !data.lastName || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span class="loading"></span> Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                this.reset();
            }, 2000);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
        
        const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
        notification.classList.add(bgColor, 'text-white');
        
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Counter animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Animate counters when they come into view
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'));
                animateCounter(target, finalValue);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    // Observe counter elements
    const counters = document.querySelectorAll('[data-target]');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect
    const heroTitle = document.querySelector('#home h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-white');
    buttons.forEach(button => {
        button.classList.add('btn-animate');
    });

    // Add card hover effects
    const cards = document.querySelectorAll('.feature-card, .testimonial-card');
    cards.forEach(card => {
        card.classList.add('card-hover');
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 opacity-0 pointer-events-none z-40';
    backToTopButton.id = 'back-to-top';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
            backToTopButton.classList.add('opacity-100');
        } else {
            backToTopButton.classList.add('opacity-0', 'pointer-events-none');
            backToTopButton.classList.remove('opacity-100');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add loading animation to download buttons
    const downloadButtons = document.querySelectorAll('.btn-primary, .btn-white');
    downloadButtons.forEach(button => {
        if (button.textContent.includes('Download') || button.textContent.includes('Get it')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const originalText = this.innerHTML;
                this.innerHTML = '<span class="loading"></span> Downloading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    showNotification('Download started! Check your downloads folder.', 'success');
                }, 2000);
            });
        }
    });

    // Add demo video functionality
    const demoButton = document.querySelector('.btn-secondary');
    if (demoButton && demoButton.textContent.includes('Watch Demo')) {
        demoButton.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Demo video will open in a new window.', 'info');
            
            // Simulate opening demo video
            setTimeout(() => {
                window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
            }, 1000);
        });
    }

    // Add search functionality to the mockup
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const jobCards = document.querySelectorAll('.job-card');
            
            jobCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const company = card.querySelector('.company').textContent.toLowerCase();
                const location = card.querySelector('.location').textContent.toLowerCase();
                
                if (title.includes(query) || company.includes(query) || location.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Add tab switching functionality to mockup
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Simulate content change
            const appContent = document.querySelector('.app-content');
            if (appContent) {
                appContent.style.opacity = '0.5';
                setTimeout(() => {
                    appContent.style.opacity = '1';
                }, 300);
            }
        });
    });

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

    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Any scroll-based functionality can go here
    }, 16);

    window.addEventListener('scroll', debouncedScrollHandler);

    // Initialize tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute bg-gray-900 text-white text-sm px-2 py-1 rounded z-50';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.top = this.offsetTop - 30 + 'px';
            tooltip.style.left = this.offsetLeft + 'px';
            
            document.body.appendChild(tooltip);
            this.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });
    });

    console.log('KaziKE Website loaded successfully! 🚀');
});

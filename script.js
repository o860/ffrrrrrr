// Modern Bookstore JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Shopping Cart Functionality
    // ============================================
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    const toast = document.getElementById('toast');
    
    // Add to Cart functionality with Toast notification
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            cartCount++;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
                cartCountElement.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartCountElement.style.transform = 'scale(1)';
                }, 200);
            }
            
            // Visual feedback on button
            this.classList.add('added');
            this.innerHTML = '<i class="fas fa-check"></i> Added!';
            
            // Show toast notification
            showToast('Item added to cart!');
            
            setTimeout(() => {
                this.classList.remove('added');
                this.innerHTML = '<i class="fas fa-shopping-bag"></i> Add to Cart';
            }, 2000);
        });
    });
    
    // Toast notification function
    function showToast(message) {
        if (!toast) return;
        toast.querySelector('span').textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // ============================================
    // Wishlist Functionality
    // ============================================
    const wishlistButtons = document.querySelectorAll('.wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showToast('Added to wishlist!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showToast('Removed from wishlist');
            }
        });
    });
    
    // ============================================
    // Filter Functionality
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bookCards = document.querySelectorAll('.book-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter books
            bookCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // ============================================
    // Smooth Scrolling for Navigation Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // ============================================
    // Header Scroll Effect
    // ============================================
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================
    // Contact Form Validation & Submission
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formGroups = this.querySelectorAll('.form-group');
            
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                const errorSpan = group.querySelector('.error-message');
                
                if (!input.value.trim()) {
                    isValid = false;
                    group.classList.add('error');
                    if (errorSpan) {
                        errorSpan.textContent = 'This field is required';
                    }
                } else if (input.type === 'email' && !isValidEmail(input.value)) {
                    isValid = false;
                    group.classList.add('error');
                    if (errorSpan) {
                        errorSpan.textContent = 'Please enter a valid email';
                    }
                } else {
                    group.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showToast('Message sent successfully!');
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                const group = this.closest('.form-group');
                const errorSpan = group.querySelector('.error-message');
                
                if (!this.value.trim()) {
                    group.classList.add('error');
                    if (errorSpan) errorSpan.textContent = 'This field is required';
                } else if (this.type === 'email' && !isValidEmail(this.value)) {
                    group.classList.add('error');
                    if (errorSpan) errorSpan.textContent = 'Please enter a valid email';
                } else {
                    group.classList.remove('error');
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.closest('.form-group').classList.remove('error');
                }
            });
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ============================================
    // Newsletter Form
    // ============================================
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email && isValidEmail(email)) {
                showToast('Thanks for subscribing!');
                emailInput.value = '';
            } else {
                emailInput.style.borderColor = 'var(--danger-color)';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 2000);
            }
        });
    }
    
    // ============================================
    // Search Functionality
    // ============================================
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            bookCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const author = card.querySelector('.author').textContent.toLowerCase();
                
                if (title.includes(query) || author.includes(query)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
    
    // ============================================
    // Category Card Click Handler
    // ============================================
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            showToast(`Browsing ${categoryName} section`);
            
            // Scroll to books section
            const booksSection = document.getElementById('books');
            if (booksSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = booksSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // Book Cards Animation on Scroll
    // ============================================
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
    
    bookCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // ============================================
    // Active Navigation Link on Scroll
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
    
    // ============================================
    // Quick View Modal (Placeholder)
    // ============================================
    const quickViewButtons = document.querySelectorAll('.quick-view');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bookCard = this.closest('.book-card');
            const title = bookCard.querySelector('h3').textContent;
            showToast(`Quick view for "${title}" - Coming soon!`);
        });
    });
    
    // Log welcome message
    console.log('Welcome to Chapter & Verse Bookstore! 📚');
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

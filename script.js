// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-title, .section-subtitle, .product-card, .about-content p');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });

        // Hero content animation
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            setTimeout(() => {
                heroContent.classList.add('visible');
            }, 300);
        }
    };

    // Initialize animations
    animateOnScroll();

    // Lazy load images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    lazyLoadObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'red';
                    isValid = false;
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Load products dynamically (simulating API call)
    setTimeout(() => {
        const products = [
            {
                name: "Haldi",
                description: "Turmeric enriched soap for glowing skin",
                price: "50",
                image: "img/haldi.jpg"
            },
            {
                name: "Mint",
                description: "Cooling and refreshing mint soap",
                price: "50",
                image: "img/mint.jpg"
            },
            {
                name: "Multani Mitti",
                description: "Clay soap for deep cleansing",
                price: "50",
                image: "img/multani.jpg"
            },
            {
                name: "Neem",
                description: "Antibacterial neem soap for healthy skin",
                price: "50",
                image: "img/neem.jpg"
            },
            {
                name: "Rose",
                description: "Floral rose soap for gentle care",
                price: "50",
                image: "img/rose.jpg"
            }
        ];

        const productGrid = document.querySelector('.product-grid');
        
        if (productGrid) {
            productGrid.innerHTML = products.map(product => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name} Soap" loading="lazy">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="price">₹${product.price}</div>
                    </div>
                </div>
            `).join('');

            // Re-initialize observer for new product cards
            const newProductCards = document.querySelectorAll('.product-card');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            newProductCards.forEach(card => {
                observer.observe(card);
            });
        }
    }, 500);
});

// Handle View Collection Button
const viewCollectionBtn = document.querySelector('.view-collection-btn');
if (viewCollectionBtn) {
    let isAnimating = false;
    
    viewCollectionBtn.addEventListener('click', function(e) {
        // Prevent multiple clicks during animation
        if (isAnimating) return;
        isAnimating = true;
        
        e.preventDefault();
        
        // Add temporary visual feedback
        this.style.transform = 'translateY(2px)';
        this.style.boxShadow = 'none';
        
        // Scroll to products section
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            setTimeout(() => {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Reset button after scroll completes
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                    isAnimating = false;
                }, 1000);
            }, 100);
        } else {
            isAnimating = false;
        }
    });
}
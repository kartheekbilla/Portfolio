// Main Script
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate menu icon
            if (navMenu.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && !e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add scroll animation
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Project Filtering with Animation
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter projects with animation
                projectItems.forEach(item => {
                    const categories = item.getAttribute('data-category').split(' ');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1) translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8) translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Form submission with animation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                // Create error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-error';
                errorMessage.textContent = 'Please fill in all fields';
                errorMessage.style.color = '#ff6b6b';
                errorMessage.style.marginTop = '10px';
                errorMessage.style.padding = '10px';
                errorMessage.style.borderRadius = '5px';
                errorMessage.style.background = 'rgba(255, 107, 107, 0.1)';
                errorMessage.style.animation = 'fadeIn 0.3s ease';
                
                // Add error message to form
                const submitButton = contactForm.querySelector('button[type="submit"]');
                if (!contactForm.querySelector('.form-error')) {
                    submitButton.parentNode.insertBefore(errorMessage, submitButton.nextSibling);
                    
                    // Remove error message after 3 seconds
                    setTimeout(() => {
                        errorMessage.style.opacity = '0';
                        setTimeout(() => {
                            errorMessage.remove();
                        }, 300);
                    }, 3000);
                }
                
                return;
            }
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            successMessage.style.color = '#6c5ce7';
            successMessage.style.marginTop = '20px';
            successMessage.style.padding = '15px';
            successMessage.style.borderRadius = '5px';
            successMessage.style.background = 'rgba(108, 92, 231, 0.1)';
            successMessage.style.animation = 'fadeIn 0.3s ease';
            
            // Add success message to form
            contactForm.appendChild(successMessage);
            
            // Reset form with animation
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.remove();
                }, 300);
            }, 5000);
        });
        
        // Add floating label effect
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            // Create label
            const label = document.createElement('label');
            label.setAttribute('for', input.id);
            label.textContent = input.placeholder;
            
            // Insert label before input
            input.parentNode.insertBefore(label, input);
            
            // Add focus event
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });
            
            // Add blur event
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    label.classList.remove('active');
                }
            });
            
            // Check if input has value on load
            if (input.value !== '') {
                label.classList.add('active');
            }
        });
    }
    
    // Add scroll down indicator to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollDown = document.createElement('div');
        scrollDown.className = 'scroll-down';
        scrollDown.innerHTML = `
            <div class="mouse"></div>
            <span>Scroll Down</span>
        `;
        
        hero.appendChild(scrollDown);
        
        scrollDown.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Add section dividers
    const sections = document.querySelectorAll('section:not(:last-child)');
    sections.forEach(section => {
        if (!section.nextElementSibling.classList.contains('section-divider')) {
            const divider = document.createElement('div');
            divider.className = 'section-divider';
            section.after(divider);
        }
    });
    
    // Add reveal animation to section headings
    const sectionHeadings = document.querySelectorAll('section h2');
    sectionHeadings.forEach(heading => {
        heading.classList.add('scroll-trigger');
    });
    
    // Add typing animation to hero heading
    const heroHeading = document.querySelector('.hero-content h1');
    if (heroHeading) {
        heroHeading.classList.add('animate-text');
    }
});
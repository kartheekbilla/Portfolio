// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.glass-card:not(.animate-fade-in), .animate-slide-up:not(.animated), .animate-slide-right:not(.animated), .animate-slide-left:not(.animated)');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            if (element.classList.contains('animate-slide-up')) {
                element.classList.add('animated');
                element.style.animationPlayState = 'running';
            } else if (element.classList.contains('animate-slide-right')) {
                element.classList.add('animated');
                element.style.animationPlayState = 'running';
            } else if (element.classList.contains('animate-slide-left')) {
                element.classList.add('animated');
                element.style.animationPlayState = 'running';
            } else {
                element.classList.add('animate-fade-in');
            }
        }
    });
};

// Initial check for elements in view
window.addEventListener('load', () => {
    setTimeout(animateOnScroll, 100);
});

window.addEventListener('scroll', animateOnScroll);

// Animate skill items with staggered delay
const animateSkillItems = () => {
  const skillItems = document.querySelectorAll('.skill-item');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const item = entry.target;
        item.classList.add('scroll-trigger');
        item.style.transitionDelay = `${0.1 * index}s`;
        obs.unobserve(item); // animate only once
      }
    });
  }, { threshold: 0.1 });

  skillItems.forEach((item) => observer.observe(item));
};

// Call this after DOM content is loaded
document.addEventListener('DOMContentLoaded', animateSkillItems);


// Animate timeline events with staggered delay
const animateTimelineEvents = () => {
  const timelineEvents = document.querySelectorAll('.timeline-event');

  timelineEvents.forEach((event, index) => {
    event.style.transitionDelay = `${0.2 * index}s`;
    setTimeout(() => {
      event.classList.add('scroll-trigger');
    }, 100 * index);  // stagger adding class by 100ms * index
  });
};

window.addEventListener('DOMContentLoaded', animateTimelineEvents);

// Run animations when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        animateSkillItems();
        animateTimelineEvents();
    }, 500);
});

// Add floating animation to profile image
const profileImg = document.querySelector('.img-placeholder');
if (profileImg) {
    profileImg.classList.add('floating');
}

// Add shimmer effect to buttons on hover
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.classList.add('shimmer');
    });
    
    button.addEventListener('mouseleave', () => {
        button.classList.remove('shimmer');
    });
});

// Add pulse animation to quote box
const quoteBox = document.querySelector('.quote-box');
if (quoteBox) {
    quoteBox.addEventListener('mouseenter', () => {
        quoteBox.classList.add('pulse');
    });
    
    quoteBox.addEventListener('mouseleave', () => {
        quoteBox.classList.remove('pulse');
    });
}

// Advanced Animations
document.addEventListener('DOMContentLoaded', () => {
    // Scroll Progress Indicator
    const createScrollProgress = () => {
        const scrollProgress = document.createElement('div');
        scrollProgress.className = 'scroll-progress';
        document.body.appendChild(scrollProgress);
        
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            scrollProgress.style.width = `${scrollPercentage}%`;
        });
    };
    
    createScrollProgress();
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Parallax Effect
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.documentElement.style.setProperty('--scrollY', scrollY);
        
        parallaxElements.forEach(element => {
            if (element.classList.contains('parallax-slow')) {
                element.style.transform = `translateY(${scrollY * 0.1}px)`;
            } else if (element.classList.contains('parallax-medium')) {
                element.style.transform = `translateY(${scrollY * 0.05}px)`;
            } else if (element.classList.contains('parallax-fast')) {
                element.style.transform = `translateY(${scrollY * 0.02}px)`;
            }
        });
    });
    
    // Scroll Triggered Animations
    const scrollTriggerElements = document.querySelectorAll('.scroll-trigger');
    
    const checkScrollTriggers = () => {
        scrollTriggerElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', checkScrollTriggers);
    window.addEventListener('resize', checkScrollTriggers);
    
    // Initial check
    setTimeout(checkScrollTriggers, 100);
    
    // 3D Tilt Effect
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const rotateX = (0.5 - yPercent) * 20;
            const rotateY = (xPercent - 0.5) * 20;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            const inner = element.querySelector('.tilt-inner');
            if (inner) {
                inner.style.transform = `translateZ(30px)`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            
            const inner = element.querySelector('.tilt-inner');
            if (inner) {
                inner.style.transform = 'translateZ(0)';
            }
        });
    });
    
    // Add floating elements to hero section
    const addFloatingElements = () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            for (let i = 1; i <= 3; i++) {
                const floatingElement = document.createElement('div');
                floatingElement.className = `floating-element elem${i}`;
                hero.appendChild(floatingElement);
            }
        }
    };
    
    addFloatingElements();
    
    // Add morphing background
    const addMorphingBg = () => {
        const sections = document.querySelectorAll('.about, .morphing-bg .contact');
        sections.forEach(section => {
            const morphingBg = document.createElement('div');
            morphingBg.className = 'morphing-bg';
            section.appendChild(morphingBg);
        });
    };
    
    addMorphingBg();
    
    // Add perspective effect to cards
    const addPerspectiveEffect = () => {
        const cards = document.querySelectorAll('.achievement-item, .skill-item');
        cards.forEach(card => {
            card.classList.add('perspective-container');
            
            const inner = document.createElement('div');
            inner.className = 'perspective-item';
            
            // Move the card's children to the inner div
            while (card.firstChild) {
                inner.appendChild(card.firstChild);
            }
            
            card.appendChild(inner);
        });
    };
    
    // Add gradient text effect
    const addGradientTextEffect = () => {
        const headings = document.querySelectorAll('h1');
        headings.forEach(heading => {
            heading.classList.add('gradient-text');
        });
    };
    
    addGradientTextEffect();
    
    // Mouse move parallax for background shapes
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 30;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
});

// Motion responsive animations
const applyMotionResponsiveness = () => {
    // Make shapes move with mouse
    const shapes = document.querySelectorAll('.shape');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const factor = (index + 1) * 20;
            const offsetX = (mouseX - 0.5) * factor;
            const offsetY = (mouseY - 0.5) * factor;
            
            shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
    
    // Add parallax effect to sections
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        sections.forEach((section, index) => {
            const speed = index % 2 === 0 ? 0.1 : -0.1;
            const offset = scrollY * speed;
            section.style.transform = `translateY(${offset}px)`;
        });
    });
};

// Call the function
applyMotionResponsiveness();
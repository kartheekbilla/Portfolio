// Creative Effects for Typography and Motion
document.addEventListener('DOMContentLoaded', () => {
    // Create animated background
    const createAnimatedBackground = () => {
        const animatedBg = document.createElement('div');
        animatedBg.className = 'animated-bg';
        document.body.appendChild(animatedBg);
        
        const canvas = document.createElement('canvas');
        animatedBg.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let width, height;
        
        // Set canvas dimensions
        const setCanvasDimensions = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        
        setCanvasDimensions();
        window.addEventListener('resize', setCanvasDimensions);
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                
                if (this.y > height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Create particles
        const particles = [];
        const particleCount = Math.min(100, Math.floor(width * height / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Connect particles with lines
        const connectParticles = () => {
            const maxDistance = 150;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < maxDistance) {
                        const opacity = 1 - (distance / maxDistance);
                        ctx.strokeStyle = `rgba(0, 210, 255, ${opacity * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };
        
        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            connectParticles();
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Mouse interaction
        let mouse = {
            x: null,
            y: null,
            radius: 150
        };
        
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
            
            // Add extra particles around mouse
            if (Math.random() > 0.9) {
                const particle = new Particle();
                particle.x = mouse.x;
                particle.y = mouse.y;
                particles.push(particle);
                
                // Remove extra particles if too many
                if (particles.length > particleCount + 20) {
                    particles.splice(0, 1);
                }
            }
        });
    };
    
    // Create text scramble effect
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="text-scramble-char">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Apply text scramble effect to elements
    const applyTextScramble = () => {
        const elements = document.querySelectorAll('.text-scramble');
        
        elements.forEach(el => {
            const fx = new TextScramble(el);
            const text = el.getAttribute('data-text') || el.textContent;
            
            // Initial scramble
            fx.setText(text);
            
            // Scramble on hover
            el.addEventListener('mouseenter', () => {
                fx.setText(text);
            });
        });
    };
    
    // Apply text wave animation
    const applyTextWave = () => {
        const elements = document.querySelectorAll('.text-wave');
        
        elements.forEach(el => {
            const text = el.textContent;
            let newText = '';
            
            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ') {
                    newText += ' ';
                } else {
                    newText += `<span style="--i:${i}">${text[i]}</span>`;
                }
            }
            
            el.innerHTML = newText;
        });
    };
    
    // Apply split text animation
    const applySplitText = () => {
        const elements = document.querySelectorAll('.split-text');
        
        elements.forEach(el => {
            const text = el.textContent;
            let newText = '';
            
            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ') {
                    newText += ' ';
                } else {
                    newText += `<span style="transition-delay: ${i * 0.03}s">${text[i]}</span>`;
                }
            }
            
            el.innerHTML = newText;
            
            // Add visible class on scroll
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        el.classList.add('visible');
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(el);
        });
    };
    
    // Apply kinetic typography
    const applyKineticTypography = () => {
        const elements = document.querySelectorAll('.kinetic-text');
        
        elements.forEach(el => {
            const text = el.textContent;
            let newText = '';
            
            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ') {
                    newText += ' ';
                } else {
                    newText += `<span>${text[i]}</span>`;
                }
            }
            
            el.innerHTML = newText;
            
            const letters = el.querySelectorAll('span');
            
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                
                letters.forEach((letter, index) => {
                    const letterRect = letter.getBoundingClientRect();
                    const letterX = letterRect.left + letterRect.width / 2 - rect.left;
                    const distanceFromMouse = Math.abs(x - letterX);
                    const maxDistance = 100;
                    
                    if (distanceFromMouse < maxDistance) {
                        const factor = 1 - distanceFromMouse / maxDistance;
                        const moveY = -15 * factor;
                        const scale = 1 + 0.3 * factor;
                        const rotate = 10 * factor * (x > letterX ? -1 : 1);
                        
                        letter.style.transform = `translateY(${moveY}px) scale(${scale}) rotate(${rotate}deg)`;
                        letter.style.color = 'var(--primary-color)';
                        letter.style.filter = `brightness(${1 + factor})`;
                    } else {
                        letter.style.transform = '';
                        letter.style.color = '';
                        letter.style.filter = '';
                    }
                });
            });
            
            el.addEventListener('mouseleave', () => {
                letters.forEach(letter => {
                    letter.style.transform = '';
                    letter.style.color = '';
                    letter.style.filter = '';
                });
            });
        });
    };
    
    // Apply hover letters animation
    const applyHoverLetters = () => {
        const elements = document.querySelectorAll('.hover-letters');
        
        elements.forEach(el => {
            const text = el.textContent;
            let newText = '';
            
            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ') {
                    newText += ' ';
                } else {
                    newText += `<span>${text[i]}</span>`;
                }
            }
            
            el.innerHTML = newText;
            
            const letters = el.querySelectorAll('span');
            
            el.addEventListener('mouseenter', () => {
                letters.forEach((letter, index) => {
                    letter.style.transitionDelay = `${index * 0.03}s`;
                    letter.style.transform = 'translateY(-10px)';
                });
            });
            
            el.addEventListener('mouseleave', () => {
                letters.forEach((letter, index) => {
                    letter.style.transitionDelay = `${(letters.length - index - 1) * 0.03}s`;
                    letter.style.transform = '';
                });
            });
        });
    };
    
    // Apply glitch text effect
    const applyGlitchText = () => {
        const elements = document.querySelectorAll('.glitch-text');
        
        elements.forEach(el => {
            const text = el.textContent;
            el.setAttribute('data-text', text);
        });
    };
    
    // Apply motion responsive effects
    const applyMotionResponsive = () => {
        // Parallax effect on scroll
        let scrollY = 0;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
            document.documentElement.style.setProperty('--scrollY', scrollY);
            
            // Update shapes position based on scroll
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.05;
                shape.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
        
        // Tilt effect on mouse move
        const tiltElements = document.querySelectorAll('.tilt-effect');
        
        tiltElements.forEach(el => {
            const inner = el.querySelector('.tilt-inner') || el;
            
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                inner.style.transform = `translateZ(30px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
                inner.style.transform = '';
            });
        });
        
        // Magnetic button effect
        const magneticButtons = document.querySelectorAll('.magnetic-btn');
        
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / 3;
                const moveY = (y - centerY) / 3;
                
                btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    };
    
    // Create scroll progress indicator
    const createScrollProgress = () => {
        const scrollProgress = document.createElement('div');
        scrollProgress.className = 'scroll-progress';
        document.body.appendChild(scrollProgress);
        
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            
            scrollProgress.style.width = `${progress}%`;
        });
    };
    
    // Apply scroll triggered animations
    const applyScrollTrigger = () => {
        const elements = document.querySelectorAll('.scroll-trigger');
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            observer.observe(el);
        });
    };
    
    // Create morphing background
    const createMorphingBg = () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const morphingBg = document.createElement('div');
            morphingBg.className = 'morphing-bg';
            section.appendChild(morphingBg);
        });
    };
    
    // Apply initial animations
    const init = () => {
        createAnimatedBackground();
        applyTextScramble();
        applyTextWave();
        applySplitText();
        applyKineticTypography();
        applyHoverLetters();
        applyGlitchText();
        applyMotionResponsive();
        createScrollProgress();
        applyScrollTrigger();
        createMorphingBg();
        
        // Add noise effect to body
        document.body.classList.add('noise');
        
        // Add header scroll effect
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Add perspective container to glass cards
        const glassCards = document.querySelectorAll('.glass-card');
        glassCards.forEach(card => {
            card.classList.add('perspective-container');
            const inner = document.createElement('div');
            inner.className = 'perspective-item';
            
            // Move all children to inner div
            while (card.firstChild) {
                inner.appendChild(card.firstChild);
            }
            
            card.appendChild(inner);
        });
    };
    
    // Run initialization
    init();
});
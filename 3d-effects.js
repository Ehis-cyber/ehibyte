// 3D Effects and Advanced Animations

// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        initializeEffects();
    }, 3000);
});

// Initialize all 3D effects
function initializeEffects() {
    initParticles();
    init3DBackground();
    initCustomCursor();
    initScrollProgress();
    initMagneticElements();
    init3DSkillCards();
    initAdvancedAnimations();
}

// Particle Background
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#8B5CF6', '#F472B6', '#FB923C', '#10B981']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#8B5CF6',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// 3D Background with Three.js
function init3DBackground() {
    if (typeof THREE !== 'undefined') {
        const canvas = document.getElementById('three-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        // Create floating geometric shapes
        const geometries = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.5, 16, 16),
            new THREE.ConeGeometry(0.5, 1, 8),
            new THREE.TorusGeometry(0.5, 0.2, 8, 16)
        ];
        
        const materials = [
            new THREE.MeshBasicMaterial({ color: 0x8B5CF6, transparent: true, opacity: 0.7 }),
            new THREE.MeshBasicMaterial({ color: 0xF472B6, transparent: true, opacity: 0.7 }),
            new THREE.MeshBasicMaterial({ color: 0xFB923C, transparent: true, opacity: 0.7 }),
            new THREE.MeshBasicMaterial({ color: 0x10B981, transparent: true, opacity: 0.7 })
        ];
        
        const meshes = [];
        
        // Create multiple floating objects
        for (let i = 0; i < 20; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.x = (Math.random() - 0.5) * 20;
            mesh.position.y = (Math.random() - 0.5) * 20;
            mesh.position.z = (Math.random() - 0.5) * 20;
            
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            
            scene.add(mesh);
            meshes.push(mesh);
        }
        
        camera.position.z = 10;
        
        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate objects
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.005;
                mesh.rotation.y += 0.005;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
            });
            
            // Camera follows mouse
            camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// Custom Cursor
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor movement
    function updateCursor() {
        dotX += (mouseX - dotX) * 0.8;
        dotY += (mouseY - dotY) * 0.8;
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        cursorRing.style.left = (ringX - 20) + 'px';
        cursorRing.style.top = (ringY - 20) + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .avatar, .skill-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('hover');
            cursorDot.style.transform = 'scale(2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('hover');
            cursorDot.style.transform = 'scale(1)';
        });
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressCircle = document.querySelector('.progress-circle');
    const scrollPercentage = document.querySelector('.scroll-percentage');
    
    if (progressCircle && scrollPercentage) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            const circumference = 2 * Math.PI * 25;
            const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;
            
            progressCircle.style.strokeDashoffset = strokeDashoffset;
            scrollPercentage.textContent = Math.round(scrollPercent) + '%';
        });
    }
}

// Magnetic Elements
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.3;
            const deltaY = (e.clientY - centerY) * 0.3;
            
            el.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.1)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// 3D Skill Cards with GSAP
function init3DSkillCards() {
    if (typeof gsap !== 'undefined') {
        const skillCards = document.querySelectorAll('.skill-3d');
        
        skillCards.forEach((card, index) => {
            // Entrance animation
            gsap.fromTo(card, {
                y: 100,
                opacity: 0,
                rotateY: -90
            }, {
                y: 0,
                opacity: 1,
                rotateY: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'back.out(1.7)'
            });
            
            // Hover animations
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    y: -10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// Advanced Animations with GSAP
function initAdvancedAnimations() {
    if (typeof gsap !== 'undefined') {
        // Hero text animation
        gsap.timeline()
            .fromTo('.hero-text h1', {
                y: 100,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out'
            })
            .fromTo('.hero-text p', {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5')
            .fromTo('.cta-buttons', {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3');
        
        // Scroll-triggered animations
        gsap.registerPlugin(ScrollTrigger);
        
        // Project cards animation
        gsap.fromTo('.project-card', {
            y: 100,
            opacity: 0,
            scale: 0.8
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 80%'
            }
        });
        
        // About section animation
        gsap.fromTo('.about-text', {
            x: -100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 80%'
            }
        });
        
        // Floating elements animation
        gsap.to('.floating-cube', {
            y: '-=20',
            rotation: 360,
            duration: 4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });
        
        gsap.to('.floating-sphere', {
            x: '+=30',
            y: '-=15',
            duration: 5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });
    }
}

// Parallax scrolling effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Interactive mountain scene
document.addEventListener('DOMContentLoaded', function() {
    const mountainScene = document.querySelector('.mountain-scene');
    
    if (mountainScene) {
        mountainScene.addEventListener('mousemove', (e) => {
            const rect = mountainScene.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Move sun based on mouse position
            const sun = mountainScene.querySelector('.sun');
            if (sun) {
                sun.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            }
            
            // Move clouds
            const clouds = mountainScene.querySelectorAll('.cloud');
            clouds.forEach((cloud, index) => {
                const moveX = (x - 50) * (0.05 * (index + 1));
                cloud.style.transform = `translateX(${moveX}px)`;
            });
        });
    }
});

// Typewriter effect for hero title
function typewriterEffect() {
    const text = document.querySelector('.hero-text h1');
    if (!text) return;
    
    const originalText = text.textContent;
    text.textContent = '';
    text.style.borderRight = '2px solid #8B5CF6';
    
    // Ensure the gradient is preserved
    text.style.background = 'linear-gradient(135deg, #8B5CF6, #F472B6)';
    text.style.webkitBackgroundClip = 'text';
    text.style.webkitTextFillColor = 'transparent';
    text.style.backgroundClip = 'text';
    text.style.display = 'inline-block';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < originalText.length) {
            text.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                text.style.borderRight = 'none';
                // Ensure gradient is still applied
                text.style.background = 'linear-gradient(135deg, #8B5CF6, #F472B6)';
                text.style.webkitBackgroundClip = 'text';
                text.style.webkitTextFillColor = 'transparent';
                text.style.backgroundClip = 'text';
            }, 1000);
        }
    }, 100);
}

// Initialize typewriter effect after loading (temporarily disabled for debugging)
// setTimeout(typewriterEffect, 3500);

// Add sparkle effect on click
document.addEventListener('click', (e) => {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        background: linear-gradient(45deg, #8B5CF6, #F472B6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: sparkleEffect 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 600);
}

// Add sparkle animation to CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleEffect {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);
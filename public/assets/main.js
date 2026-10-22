// ===== Video Modal Logic =====
const modal = document.getElementById('video-modal');
const closeBtn = document.getElementById('close-modal');
const player = document.getElementById('youtube-player');
const videoContainer = document.getElementById('video-container');
const externalLink = document.getElementById('youtube-external-link');

// Expose openVideo to global scope for onclick handler
window.openVideo = function (videoId) {
    if (!modal) return;
    modal.classList.remove('hidden');
    // Force reflow
    void modal.offsetWidth;
    modal.classList.remove('opacity-0');
    videoContainer.classList.remove('scale-95');

    // Setup embed src
    const origin = window.location.origin === 'null' ? '*' : window.location.origin;
    let src = `https://www.youtube.com/embed/${videoId}?autoplay=1&origin=${origin}`;

    player.src = src;

    // Setup external link
    if (externalLink) {
        let watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
        externalLink.href = watchUrl;
    }

    document.body.style.overflow = 'hidden'; // Prevent scrolling
};

function closeVideo() {
    if (!modal) return;
    modal.classList.add('opacity-0');
    videoContainer.classList.add('scale-95');

    // Wait for transition
    setTimeout(() => {
        modal.classList.add('hidden');
        player.src = ''; // Stop video
        document.body.style.overflow = '';
    }, 300);
}

if (closeBtn) closeBtn.addEventListener('click', closeVideo);

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeVideo();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideo();
});

// ===== Loading Screen Dismissal =====
// Hide on window load, but never keep content covered longer than LOADER_MAX_MS
const LOADER_MAX_MS = 1200;
let loaderDismissed = false;

function dismissLoader() {
    if (loaderDismissed) return;
    loaderDismissed = true;
    const loader = document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 100);
    }
}

window.addEventListener('load', dismissLoader);
setTimeout(dismissLoader, LOADER_MAX_MS);

// ===== Lazy GIF Loading with Intersection Observer =====
const gifObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const img = entry.target;
        if (entry.isIntersecting && img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            gifObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '200px',
    threshold: 0.1
});

// Observe all lazy GIFs
document.querySelectorAll('.lazy-gif').forEach(img => {
    gifObserver.observe(img);
});

// ===== Lenis Smooth Scroll =====
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: false,
    syncTouch: false,
});

// Integrate Lenis with GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);

// Disable GSAP lag smoothing to prevent jumps
gsap.ticker.lagSmoothing(0);

// ===== Unified Input Manager =====
// Single global mouse state — used by cursor, magnetic, tilt, and trail
const Mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', (e) => {
    Mouse.x = e.clientX;
    Mouse.y = e.clientY;
}, { passive: true });

// ===== Interactive Managers =====

// 1. Custom Cursor Manager
const cursorManager = {
    dot: document.querySelector('.cursor-dot'),
    outline: document.querySelector('.cursor-outline'),
    outlineX: 0,
    outlineY: 0,
    hoverables: document.querySelectorAll('a, button, .cursor-pointer, .glass-card, .work-card'),

    init() {
        if (!this.dot || !this.outline) return;

        this.hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => this.outline.classList.add('hover'), { passive: true });
            el.addEventListener('mouseleave', () => this.outline.classList.remove('hover'), { passive: true });
        });
    },

    update() {
        if (!this.dot || !this.outline) return;

        this.dot.style.transform = `translate(${Mouse.x - 5}px, ${Mouse.y - 5}px)`;

        this.outlineX += (Mouse.x - this.outlineX) * 0.12;
        this.outlineY += (Mouse.y - this.outlineY) * 0.12;
        this.outline.style.transform = `translate(${this.outlineX - 20}px, ${this.outlineY - 20}px)`;
    }
};

// 2. Magnetic Buttons Manager
const magneticManager = {
    elements: [],

    init() {
        document.querySelectorAll('.magnetic-btn').forEach(el => {
            this.elements.push({
                el: el,
                rect: null,
                isHovering: false
            });

            el.addEventListener('mouseenter', () => {
                const target = this.elements.find(item => item.el === el);
                if (target) {
                    target.isHovering = true;
                    target.rect = el.getBoundingClientRect();
                }
            }, { passive: true });

            el.addEventListener('mouseleave', () => {
                const target = this.elements.find(item => item.el === el);
                if (target) {
                    target.isHovering = false;
                    el.style.transform = 'translate(0px, 0px)';
                }
            }, { passive: true });
        });
    },

    update() {
        this.elements.forEach(item => {
            if (item.isHovering && item.rect) {
                const x = Mouse.x - item.rect.left - item.rect.width / 2;
                const y = Mouse.y - item.rect.top - item.rect.height / 2;
                item.el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            }
        });
    }
};

// 3. Tilt Card Manager
const tiltManager = {
    elements: [],

    init() {
        document.querySelectorAll('.tilt-card').forEach(el => {
            this.elements.push({
                el: el,
                rect: null,
                isHovering: false
            });

            el.addEventListener('mouseenter', () => {
                const target = this.elements.find(item => item.el === el);
                if (target) {
                    target.isHovering = true;
                    target.rect = el.getBoundingClientRect();
                    el.style.transition = 'transform 0.1s ease-out';
                }
            }, { passive: true });

            el.addEventListener('mouseleave', () => {
                const target = this.elements.find(item => item.el === el);
                if (target) {
                    target.isHovering = false;
                    el.style.transition = 'transform 0.5s ease-out';
                    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                }
            }, { passive: true });
        });
    },

    update() {
        this.elements.forEach(item => {
            if (item.isHovering && item.rect) {
                const centerX = item.rect.left + item.rect.width / 2;
                const centerY = item.rect.top + item.rect.height / 2;

                const rotateX = (Mouse.y - centerY) / 25;
                const rotateY = (centerX - Mouse.x) / 25;

                item.el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            }
        });
    }
};

// 4. Cursor Trail Manager (merged into GSAP ticker — no separate rAF)
const trailManager = {
    trails: [],
    active: false,

    init() {
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        if (isTouchDevice) return;

        this.active = true;
        const trailCount = 8;

        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.opacity = (1 - i / trailCount) * 0.5;
            trail.style.width = `${12 - i}px`;
            trail.style.height = `${12 - i}px`;
            document.body.appendChild(trail);
            this.trails.push({
                element: trail,
                x: 0,
                y: 0
            });
        }
    },

    update() {
        if (!this.active) return;

        let prevX = Mouse.x;
        let prevY = Mouse.y;

        this.trails.forEach((trail) => {
            trail.x += (prevX - trail.x) * 0.3;
            trail.y += (prevY - trail.y) * 0.3;

            trail.element.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`;

            prevX = trail.x;
            prevY = trail.y;
        });
    }
};

// ===== Initialization =====
const isDesktop = window.matchMedia('(pointer: fine)').matches;

if (isDesktop) {
    cursorManager.init();
    magneticManager.init();
    tiltManager.init();
    trailManager.init();
} else {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    if (dot) dot.style.display = 'none';
    if (outline) outline.style.display = 'none';
}

// ===== Unified Render Loop (GSAP Ticker) =====
let lastActivity = Date.now();
const IDLE_THRESHOLD = 2000;
let isIdle = false;
let frameCount = 0;

function hasActiveTweens() {
    return gsap.globalTimeline.getChildren(true, true, false).some(t => t.isActive());
}

function updateActivity() {
    if (isIdle) {
        isIdle = false;
        gsap.ticker.wake();
    }
    lastActivity = Date.now();
}

window.addEventListener('mousemove', updateActivity, { passive: true });
window.addEventListener('scroll', updateActivity, { passive: true });
window.addEventListener('keydown', updateActivity, { passive: true });
window.addEventListener('touchstart', updateActivity, { passive: true });
window.addEventListener('pointerdown', updateActivity, { passive: true });

// Single loop for ALL visual updates — cursor trail is now inside here
gsap.ticker.add((time) => {
    frameCount++;

    if (!lenis.isScrolling && Date.now() - lastActivity > IDLE_THRESHOLD) {
        if (!isIdle) {
            isIdle = true;
        }
        // Stop the rAF loop entirely while nothing is animating; any input wakes it
        if (!hasActiveTweens()) {
            gsap.ticker.sleep();
            return;
        }
    }

    lenis.raf(time * 1000);

    if (!isIdle && isDesktop) {
        cursorManager.update();
        trailManager.update();

        if (frameCount % 2 === 0) {
            magneticManager.update();
            tiltManager.update();
        }
    }
});

// ===== GSAP ScrollTrigger Animations (Delayed Init) =====
window.addEventListener('load', () => {
    setTimeout(() => {
        ScrollTrigger.batch('.reveal-text', {
            onEnter: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        stagger: 0.1
                    }
                );
            },
            start: 'top 85%',
            once: true
        });

        ScrollTrigger.batch('.work-card', {
            onEnter: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        stagger: 0.1
                    }
                );
            },
            start: 'top 90%',
            once: true
        });

        ScrollTrigger.batch('.why-me-item', {
            onEnter: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        stagger: 0.15
                    }
                );
            },
            start: 'top 85%',
            once: true
        });
        
        ScrollTrigger.refresh();
    }, 500);
});

// ===== Navbar Scroll Effect =====
lenis.on('scroll', ({ scroll }) => {
    const navbar = document.getElementById('navbar');
    if (scroll > 50) {
        navbar.classList.add('translate-y-2');
        navbar.querySelector('.nav-glass').classList.add('bg-[#0f172a]/80');
    } else {
        navbar.classList.remove('translate-y-2');
        navbar.querySelector('.nav-glass').classList.remove('bg-[#0f172a]/80');
    }
});

// ===== Mobile Menu Toggle (declared before nav link handlers) =====
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let isMenuOpen = false;

function setMenuOpen(open) {
    isMenuOpen = open;
    mobileMenu.classList.toggle('hidden', !open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
    menuBtn.querySelector('.menu-icon-open')?.classList.toggle('hidden', open);
    menuBtn.querySelector('.menu-icon-close')?.classList.toggle('hidden', !open);
}

menuBtn.addEventListener('click', () => setMenuOpen(!isMenuOpen));

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            if (isMenuOpen) setMenuOpen(false);
        }
    });
});

// ===== Scroll Progress Bar & Back to Top =====
const progressBar = document.getElementById('scroll-progress');
const goTopBtn = document.getElementById('go-top');
const goTopRing = goTopBtn?.querySelector('.go-top-ring-bar');
const GO_TOP_THRESHOLD = 600;
let scrollRange = 1;
let scrollTicking = false;

function measureScrollRange() {
    scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
}

function renderScrollState() {
    scrollTicking = false;
    const scrollTop = window.scrollY;
    const progress = Math.min(1, scrollTop / scrollRange);

    if (progressBar) progressBar.style.transform = `scaleX(${progress})`;

    if (goTopBtn) {
        const visible = scrollTop > GO_TOP_THRESHOLD;
        if (visible !== goTopBtn.classList.contains('is-visible')) {
            goTopBtn.classList.toggle('is-visible', visible);
            goTopBtn.tabIndex = visible ? 0 : -1;
        }
        if (goTopRing) goTopRing.style.strokeDashoffset = String(100 - progress * 100);
    }
}

function requestScrollRender() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(renderScrollState);
}

function remeasureScroll() {
    measureScrollRange();
    requestScrollRender();
}

remeasureScroll();
window.addEventListener('scroll', requestScrollRender, { passive: true });
window.addEventListener('resize', remeasureScroll, { passive: true });
window.addEventListener('load', remeasureScroll);
if ('ResizeObserver' in window) {
    new ResizeObserver(remeasureScroll).observe(document.body);
}

if (goTopBtn) {
    goTopBtn.addEventListener('click', () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            window.scrollTo(0, 0);
        } else {
            updateActivity(); // Lenis animates on the GSAP ticker, which may be asleep
            lenis.scrollTo(0, { duration: 1 });
        }
        goTopBtn.blur();
    });
}

// ===== Typewriter Effect =====
const line1Text = "Designing Logic.";
const line2Text = "Animating Emotion.";
const typewriterLine1 = document.getElementById('typewriter-line1');
const typewriterLine2 = document.getElementById('typewriter-line2');

async function typeWriter() {
    for (let i = 0; i < line1Text.length; i++) {
        typewriterLine1.textContent += line1Text[i];
        await new Promise(r => setTimeout(r, 80));
    }
    await new Promise(r => setTimeout(r, 300));
    for (let i = 0; i < line2Text.length; i++) {
        typewriterLine2.textContent += line2Text[i];
        await new Promise(r => setTimeout(r, 80));
    }
}

setTimeout(typeWriter, 800);

// ===== Portfolio Filter with FLIP Animation =====
const filterButtons = document.querySelectorAll('#portfolio-filter .filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterButtons.forEach(b => {
            b.classList.remove('active', 'bg-white/10', 'text-white');
            b.classList.add('bg-slate-800/50', 'text-slate-300');
        });
        btn.classList.add('active', 'bg-white/10', 'text-white');
        btn.classList.remove('bg-slate-800/50', 'text-slate-300');

        workCards.forEach(card => {
            const category = card.dataset.category || 'all';

            if (filter === 'all' || category.includes(filter)) {
                if (card.style.display === 'none') {
                    card.style.display = 'block';
                    card.classList.add('filtering-in');
                    setTimeout(() => card.classList.remove('filtering-in'), 400);
                }
            } else {
                card.classList.add('filtering-out');
                setTimeout(() => {
                    card.style.display = 'none';
                    card.classList.remove('filtering-out');
                }, 400);
            }
        });
    });
});

// ===== Konami Code Easter Egg (with debounce) =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
let konamiCooldown = false;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            konamiIndex = 0;
            if (!konamiCooldown) {
                konamiCooldown = true;
                triggerConfetti();
                setTimeout(() => { konamiCooldown = false; }, 5500);
            }
        }
    } else {
        konamiIndex = 0;
    }
});

// Reusable confetti style element (created once)
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0.8;
        }
        100% {
            transform: translateY(110vh) rotate(720deg) translateX(50px);
            opacity: 0;
        }
    }
`;

function triggerConfetti() {
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;overflow:hidden;';
    document.body.appendChild(container);

    document.body.classList.add('konami-active');
    setTimeout(() => document.body.classList.remove('konami-active'), 500);

    // Add style only once
    if (!confettiStyle.parentNode) {
        document.head.appendChild(confettiStyle);
    }

    const colors = ['#6366f1', '#a855f7', '#3b82f6', '#ec4899', '#10b981', '#f59e0b'];
    const shapes = ['circle', 'square', 'triangle'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const left = Math.random() * 100;
        const duration = 2 + Math.random() * 2;
        const delay = Math.random() * 0.5;

        confetti.style.cssText = `
            position: absolute;
            width: ${8 + Math.random() * 8}px;
            height: ${8 + Math.random() * 8}px;
            background: ${color};
            left: ${left}%;
            top: -20px;
            opacity: 0.8;
            animation: confetti-fall ${duration}s ${delay}s linear forwards;
            ${shape === 'circle' ? 'border-radius: 50%;' : shape === 'triangle' ? 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);' : ''}
        `;

        container.appendChild(confetti);
    }

    setTimeout(() => {
        container.remove();
    }, 5000);
}

// ===== Night Mode Shooting Stars (with interval cleanup) =====
let nightStarInterval = null;

function checkNightMode() {
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 6) {
        createShootingStars();
    }
}

function createShootingStars() {
    const container = document.createElement('div');
    container.id = 'night-stars';
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;';
    document.body.insertBefore(container, document.body.firstChild);

    function spawnStar() {
        // Stop spawning if no longer night
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 22) {
            if (nightStarInterval) {
                clearInterval(nightStarInterval);
                nightStarInterval = null;
            }
            const existing = document.getElementById('night-stars');
            if (existing) existing.remove();
            return;
        }

        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.top = `${Math.random() * 50}%`;
        star.style.left = `${Math.random() * 50}%`;
        star.style.animationDuration = `${2 + Math.random() * 2}s`;
        star.style.animationDelay = '0s';

        container.appendChild(star);
        setTimeout(() => star.remove(), 4000);
    }

    for (let i = 0; i < 3; i++) {
        setTimeout(spawnStar, i * 2000);
    }

    nightStarInterval = setInterval(spawnStar, 6000);
}


// ===== Copy Email Logic =====
window.copyEmail = function () {
    const email = 'flashjen@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const tooltip = document.getElementById('copy-tooltip');
        if (tooltip) {
            tooltip.classList.remove('opacity-0');
            tooltip.classList.add('opacity-100');

            setTimeout(() => {
                tooltip.classList.remove('opacity-100');
                tooltip.classList.add('opacity-0');
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
};

checkNightMode();


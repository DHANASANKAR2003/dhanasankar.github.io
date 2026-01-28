// Scroll Animations and Intersection Observer
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupScrollProgress();
        this.setupIntersectionObserver();
        this.setupCounterAnimations();
        this.setupSkillBars();
        this.setupHeaderScroll();
    }

    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const update = () => {
                        current += step;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(update);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    update();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    }

    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.2 });

        skillBars.forEach(b => observer.observe(b));
    }

    setupHeaderScroll() {
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// 3D Tilt Effect
class TiltEffect {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.element.addEventListener('mousemove', (e) => this.handleMove(e));
        this.element.addEventListener('mouseleave', () => this.handleReset());
    }

    handleMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    }

    handleReset() {
        this.element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    }
}

// Typewriter
class TypeWriter {
    constructor(element, phrases) {
        this.element = element;
        this.phrases = phrases;
        this.phraseIdx = 0;
        this.charIdx = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.phrases[this.phraseIdx];
        const text = this.isDeleting ? current.substring(0, this.charIdx - 1) : current.substring(0, this.charIdx + 1);
        this.element.textContent = text;
        this.charIdx = this.isDeleting ? this.charIdx - 1 : this.charIdx + 1;

        let speed = this.isDeleting ? 50 : 100;

        if (!this.isDeleting && text === current) {
            speed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && text === '') {
            this.isDeleting = false;
            this.phraseIdx = (this.phraseIdx + 1) % this.phrases.length;
            speed = 500;
        }

        setTimeout(() => this.type(), speed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();

    const tw = document.getElementById('typewriter');
    if (tw) {
        new TypeWriter(tw, [
            'VLSI Design Engineer',
            'RTL Design Specialist',
            'Design Verification Expert',
            'FPGA Developer'
        ]);
    }

    window.initTilt = () => {
        document.querySelectorAll('.project-card, .stat-card, .logo-chip').forEach(el => {
            if (!el.dataset.tiltInit) {
                new TiltEffect(el);
                el.dataset.tiltInit = 'true';
            }
        });
    };
    window.initTilt();
});

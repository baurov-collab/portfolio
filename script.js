// ==================== CUSTOM CURSOR ====================
const cursor = document.querySelector('.custom-cursor');

if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// ==================== HERO SLIDESHOW ====================
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

if (slides.length > 1) {
    setInterval(nextSlide, 2000); // каждые 2 секунды
}

// ==================== PARALLAX ON HERO ====================
const heroSlideshow = document.querySelector('.hero-slideshow');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroSlideshow && scrolled < window.innerHeight) {
        heroSlideshow.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// ==================== GALLERY ITEMS ====================
const floatingItems = document.querySelectorAll('.floating-item');

// ==================== FULLSCREEN OVERLAY ====================
const fullscreenOverlay = document.getElementById('fullscreen-overlay');
const fullscreenImg = document.getElementById('fullscreen-img');
const fullscreenVideo = document.getElementById('fullscreen-video');
const fullscreenClose = document.querySelector('.fullscreen-close');

// Open fullscreen for images and videos
floatingItems.forEach(item => {
    const img = item.querySelector('img');
    const video = item.querySelector('video');

    item.addEventListener('click', () => {
        if (img) {
            fullscreenImg.src = img.src;
            fullscreenImg.classList.add('active');
            fullscreenVideo.classList.remove('active');
            fullscreenVideo.pause();
        } else if (video) {
            const source = video.querySelector('source');
            fullscreenVideo.src = source ? source.src : video.src;
            fullscreenVideo.classList.add('active');
            fullscreenImg.classList.remove('active');
            fullscreenVideo.play();
        }
        fullscreenOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close fullscreen
if (fullscreenClose) {
    fullscreenClose.addEventListener('click', closeFullscreen);
}

if (fullscreenOverlay) {
    fullscreenOverlay.addEventListener('click', (e) => {
        if (e.target === fullscreenOverlay) {
            closeFullscreen();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFullscreen();
    }
});

function closeFullscreen() {
    if (fullscreenOverlay) {
        fullscreenOverlay.classList.remove('active');
        fullscreenImg.classList.remove('active');
        fullscreenVideo.classList.remove('active');
        fullscreenVideo.pause();
        fullscreenVideo.src = '';
        document.body.style.overflow = '';
    }
}

// ==================== VIDEO AUTOPLAY ON HOVER ====================
const videoItems = document.querySelectorAll('.floating-item[data-type="video"]');

videoItems.forEach(item => {
    const video = item.querySelector('video');

    if (video) {
        item.addEventListener('mouseenter', () => {
            video.play().catch(() => {});
        });

        item.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ==================== SCROLL ANIMATIONS FOR SECTIONS ====================
const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    sectionObserver.observe(section);
});

// ==================== GALLERY ITEMS SCROLL ANIMATION ====================
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            galleryObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

floatingItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease-out ${index * 0.05}s, transform 0.6s ease-out ${index * 0.05}s`;
    galleryObserver.observe(item);
});

// ==================== TOOL PILLS ANIMATION ====================
const toolPills = document.querySelectorAll('.tool-pill');

toolPills.forEach((pill, index) => {
    pill.style.opacity = '0';
    pill.style.transform = 'translateY(20px)';

    const pillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    pill.style.opacity = '1';
                    pill.style.transform = 'translateY(0)';
                    pill.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                }, index * 50);
                pillObserver.unobserve(pill);
            }
        });
    }, { threshold: 0.5 });

    pillObserver.observe(pill);
});

// ==================== CONTACT CARDS ANIMATION ====================
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                }, index * 150);
                cardObserver.unobserve(card);
            }
        });
    }, { threshold: 0.3 });

    cardObserver.observe(card);
});

// ==================== PAGE LOAD ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

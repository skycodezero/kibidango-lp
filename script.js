// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.stat-card, .project-card, .service-item, .partner-box');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header shadow on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Modal functionality
const modal = document.getElementById('contactModal');
const openBtn = document.getElementById('openFormBtn');
const closeBtn = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Open modal
if (openBtn) {
    openBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

// Close modal
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            phone: document.getElementById('phone').value,
            project: document.getElementById('project').value,
            timestamp: new Date().toISOString(),
            language: document.documentElement.lang || 'ja'
        };
        
        // TODO: Replace with your Google Apps Script Web App URL
        const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
        
        try {
            const submitBtn = contactForm.querySelector('.submit-button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;
            
            const response = await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            contactForm.reset();
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                contactForm.style.display = 'block';
                successMessage.style.display = 'none';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            console.error('Error:', error);
            alert('送信中にエラーが発生しました。もう一度お試しください。');
            const submitBtn = contactForm.querySelector('.submit-button');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

/**
 * emSphere CLMS Sitelink Landing Page Scripts
 * Handles modal popups, 50% scroll triggers, Google reCAPTCHA v2 rendering, and lead capture submissions.
 */

// Google reCAPTCHA v2 configuration
const RECAPTCHA_SITE_KEY = '6LcHXsItAAAAAC1mS6jgBpDhngKmB-a0e5fmTtvn'; // Google reCAPTCHA Site Key
let heroRecaptchaWidgetId = null;
let modalRecaptchaWidgetId = null;

// Explicit initialization callback for Google reCAPTCHA
window.initRecaptcha = function() {
    function renderWidgets() {
        const heroEl = document.getElementById('hero-recaptcha');
        if (heroEl && window.grecaptcha && heroRecaptchaWidgetId === null) {
            heroRecaptchaWidgetId = grecaptcha.render('hero-recaptcha', {
                'sitekey': RECAPTCHA_SITE_KEY
            });
        }
        const modalEl = document.getElementById('modal-recaptcha');
        if (modalEl && window.grecaptcha && modalRecaptchaWidgetId === null) {
            modalRecaptchaWidgetId = grecaptcha.render('modal-recaptcha', {
                'sitekey': RECAPTCHA_SITE_KEY
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderWidgets);
    } else {
        renderWidgets();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('leadModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const openModalButtons = document.querySelectorAll('.open-modal-btn');
    let hasTriggeredScrollPopup = false;

    // Open Modal Function
    function openModal() {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close Modal Function
    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Attach click listeners to all standalone CTA buttons
    openModalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    // Close modal on close button click
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal on background overlay click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 50% Scroll Trigger (Fires once per user session)
    window.addEventListener('scroll', () => {
        if (!hasTriggeredScrollPopup) {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;

            if (scrollPercentage >= 50) {
                hasTriggeredScrollPopup = true;
                if (modal && !modal.classList.contains('active')) {
                    openModal();
                }
            }
        }
    });

    // Global form submission handler
    window.handleFormSubmit = function(event) {
        event.preventDefault();
        const form = event.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const emailInput = form.querySelector('[name="email"]');
        const emailDomain = emailInput.value.trim().toLowerCase().split('@').pop();
        const freeEmailProviders = [
            'gmail.com', 'googlemail.com', 'rediffmail.com', 'rediff.com', 'yahoo.com',
            'yahoo.co.in', 'yahoo.co.uk', 'yahoo.ca', 'yahoo.com.au', 'yahoo.fr', 'yahoo.de',
            'yahoo.co.jp', 'yahoo.es', 'yahoo.com.br', 'yahoo.com.mx', 'ymail.com', 'rocketmail.com',
            'outlook.com', 'outlook.in', 'outlook.co.uk', 'hotmail.com', 'hotmail.co.in',
            'hotmail.co.uk', 'hotmail.fr', 'hotmail.de', 'live.com', 'live.in', 'live.co.uk',
            'msn.com', 'icloud.com', 'me.com', 'mac.com', 'aol.com', 'proton.me', 'protonmail.com',
            'zoho.com', 'yandex.com', 'mail.ru', 'mail.com', 'gmx.com', 'gmx.net', 'fastmail.com'
        ];

        if (freeEmailProviders.some(provider => emailDomain === provider || emailDomain.endsWith(`.${provider}`))) {
            alert('Please Enter Valid Business Email ID');
            emailInput.focus();
            return false;
        }

        // Verify reCAPTCHA
        if (typeof grecaptcha !== 'undefined') {
            let recaptchaResponse = '';
            if (form.querySelector('#hero-recaptcha') && heroRecaptchaWidgetId !== null) {
                recaptchaResponse = grecaptcha.getResponse(heroRecaptchaWidgetId);
            } else if (form.querySelector('#modal-recaptcha') && modalRecaptchaWidgetId !== null) {
                recaptchaResponse = grecaptcha.getResponse(modalRecaptchaWidgetId);
            } else {
                const respInput = form.querySelector('[name="g-recaptcha-response"]');
                if (respInput) {
                    recaptchaResponse = respInput.value;
                }
            }

            if (!recaptchaResponse) {
                alert('Please verify that you are not a robot by completing the reCAPTCHA.');
                return false;
            }
        }

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Submitting Request...";
        submitBtn.disabled = true;

        const formData = new FormData(form);

        fetch('/api/lp-lead/emsphere-clms-contractor-employee-master/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network error or server unavailable');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                window.location.href = data.redirect || 'https://www.emsphere.com/thank-you/';
            } else {
                alert(data.message || 'An error occurred while submitting your request. Please try again.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        })
        .catch(err => {
            console.warn('AJAX submit error, falling back to direct POST submission:', err);
            form.submit();
        });
    };
});

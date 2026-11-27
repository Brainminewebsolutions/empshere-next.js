/**
 * emSphere CLMS Sitelink Landing Page Scripts
 * Handles modal popups, 50% scroll triggers, the Cloudflare Turnstile check, and lead capture submissions.
 */

const PERSONAL_EMAIL_DOMAINS = new Set([
    'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.in', 'yahoo.co.uk', 'yahoo.ca', 'yahoo.com.au',
    'rediffmail.com', 'rediff.com', 'outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'icloud.com',
    'me.com', 'mac.com', 'aol.com', 'protonmail.com', 'proton.me', 'pm.me', 'tutanota.com', 'tuta.com',
    'yandex.com', 'yandex.ru', 'mail.ru', 'gmx.com', 'gmx.net', 'zoho.com', 'inbox.com', 'fastmail.com',
    'qq.com', '163.com', '126.com', 'yeah.net', 'sina.com', 'comcast.net', 'att.net', 'verizon.net',
    'btinternet.com'
]);
function isPersonalEmail(email) {
    const domain = email.trim().toLowerCase().split('@').pop();
    return [...PERSONAL_EMAIL_DOMAINS].some(blockedDomain => domain === blockedDomain || domain.endsWith(`.${blockedDomain}`));
}
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
        const emailInput = form.querySelector('[name="email"]');
        if (isPersonalEmail(emailInput.value)) {
            alert('Please Enter Valid Business Email ID');
            emailInput.focus();
            return false;
        }

        const submitBtn = form.querySelector('button[type="submit"]');

        // Cloudflare Turnstile (/lp-turnstile.js)
        if (window.lpCaptcha && !window.lpCaptcha.passed(form)) {
            alert('Please complete the security check above the button, then submit again.');
            return false;
        }

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Submitting Request...";
        submitBtn.disabled = true;

        const formData = new FormData(form);

        fetch('/api/lp-lead/emsphere-clms-wages-contractor-billing/', {
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
                window.lpCaptcha?.reset(form);
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

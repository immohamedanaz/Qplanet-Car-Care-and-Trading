document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = bookingForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        btn.style.opacity = '0.9';

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const location = document.getElementById('location').value;
        const message = document.getElementById('message').value || "No additional details";

        const waMessage = `New Booking:%0A Name: ${name}%0A Service: ${service}%0A Location: ${location}%0A Phone: ${phone}%0A Message: ${message}`;
        const waUrl = `https://wa.me/97431122453?text=${waMessage}`;

        // Redirect to WhatsApp
        setTimeout(() => {
            window.open(waUrl, '_blank');
            bookingForm.reset();
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
        }, 800);
    });

    // Smooth scrolling for anchor links (Book Now buttons)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(element => {
        observer.observe(element);
    });

    // Exit Intent Popup
    const exitPopup = document.getElementById('exitPopup');
    const closePopup = document.getElementById('closePopup');
    let popupShown = false;

    document.addEventListener('mouseleave', (e) => {
        if(e.clientY < 0 && !popupShown) {
            exitPopup.classList.add('show');
            popupShown = true;
        }
    });

    closePopup.addEventListener('click', () => {
        exitPopup.classList.remove('show');
    });

    exitPopup.addEventListener('click', (e) => {
        if(e.target === exitPopup) {
            exitPopup.classList.remove('show');
        }
    });

    // Popup WhatsApp Redirect
    const popupForm = document.getElementById('popupForm');
    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const popupPhone = document.getElementById('popupPhone').value;
        const waUrl = `https://wa.me/97431122453?text=Hi!%20I%20want%20to%20get%20a%20free%20quote.%20My%20number%20is%20${popupPhone}`;
        window.open(waUrl, '_blank');
        exitPopup.classList.remove('show');
    });

    // Before/After Slider Logic
    const baSlider = document.getElementById('baSlider');
    const beforeImage = document.getElementById('beforeImage');
    const baSliderLine = document.getElementById('baSliderLine');

    if(baSlider) {
        baSlider.addEventListener('input', (e) => {
            const sliderValue = e.target.value;
            beforeImage.style.width = `${sliderValue}%`;
            baSliderLine.style.left = `${sliderValue}%`;
        });
        
        // Handle window resize trick for responsive images in the slider
        const resizeBeforeImg = () => {
             const containerWidth = document.querySelector('.ba-slider-container').offsetWidth;
             const img = beforeImage.querySelector('img');
             img.style.width = `${containerWidth}px`;
        };
        
        window.addEventListener('resize', resizeBeforeImg);
        // Initial call
        setTimeout(resizeBeforeImg, 100);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.testimonial-wrapper');
    if (!wrapper) return;

    const carousel = wrapper.querySelector('.testimonial-carousel');
    const slides = carousel.querySelector('.testimonial-slides');
    const slideElements = carousel.querySelectorAll('.testimonial-slide');
    const slideCount = slideElements.length;

    const prevButton = wrapper.querySelector('.carousel-button.prev');
    const nextButton = wrapper.querySelector('.carousel-button.next');
    
    let currentIndex = 0;

    function updateSlidePosition() {
        if (slideElements.length === 0) return;
        // Get the full rendered width of a single slide, including padding and border.
        const slideWidth = slideElements[0].offsetWidth;
        const offset = -currentIndex * slideWidth;
        slides.style.transform = `translateX(${offset}px)`;
    }

    function goToSlide(index) {
        if (index < 0) {
            currentIndex = slideCount - 1;
        } else if (index >= slideCount) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        updateSlidePosition();
    }

    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    // Re-calculate on window resize to handle responsive changes
    window.addEventListener('resize', updateSlidePosition);

    // Initialize the carousel
    updateSlidePosition();

    // Smooth scroll for "Scroll for more" button
    const scrollButton = document.querySelector('.scroll-for-more');
    const servicesSection = document.getElementById('our-services');

    if (scrollButton && servicesSection) {
        scrollButton.addEventListener('click', (event) => {
            event.preventDefault();
            const offsetTop = servicesSection.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    }
});
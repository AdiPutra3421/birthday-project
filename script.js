document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Confetti Burst
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // 2. Scroll Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Optional: stop observing once revealed
            }
        });
    };

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Blow Candle Logic
    const blowBtn = document.getElementById('blow-candle-btn');
    const flame = document.getElementById('flame');
    const wishMessage = document.getElementById('wish-message');

    blowBtn.addEventListener('click', () => {
        // "Blow out" the candle
        flame.style.display = 'none';
        
        // Hide button
        blowBtn.style.display = 'none';
        
        // Show wish message
        wishMessage.classList.remove('hidden');

        // Shoot confetti again for celebration
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff8fab', '#ffc2d1', '#fcd5ce', '#ffffff']
        });
    });

    // 4. Scroll Indicator Fade Out
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const opacity = Math.max(0, 1 - (scrollY / 300));
            
            // Hapus animasi CSS agar opacity dari JS tidak ditimpa
            if (scrollY > 0) {
                scrollIndicator.style.animation = 'none';
            }
            
            scrollIndicator.style.opacity = opacity;
            
            if (opacity === 0) {
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
});

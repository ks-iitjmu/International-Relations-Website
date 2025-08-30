class InfiniteSlider {
    constructor() {
        this.slider = document.querySelector('.slider');
        this.navButtons = document.querySelectorAll('.slider-nav-but');
        this.originalSlides = document.querySelectorAll('.slider-image');

        this.config = {
            autoSlideInterval: 3000,
            transitionDuration: 300,
            pauseOnHover: true,
            pauseAfterManualNav: 5000
        };

        this.state = {
            currentSlide: 0,
            totalSlides: this.originalSlides.length,
            isTransitioning: false,
            isPaused: false,
            autoSlideTimer: null
        };

        this.init();
    }

    init() {
        if (!this.slider || !this.originalSlides.length || !this.navButtons.length) {
            console.error('Slider elements not found');
            return;
        }

        this.createInfiniteLoop();
        this.setupEventListeners();
        this.updateActiveNavButton(0);
        this.startAutoSlide();

        this.waitForImagesLoad().then(() => {
            this.positionSlider(false);
        });
    }

    waitForImagesLoad() {
        const imagePromises = Array.from(this.originalSlides).map(img => {
            return new Promise(resolve => {
                if (img.complete) {
                    resolve();
                } else {
                    img.addEventListener('load', resolve);
                    img.addEventListener('error', resolve);
                }
            });
        });

        return Promise.all(imagePromises);
    }

    createInfiniteLoop() {
        const existingClones = this.slider.querySelectorAll('[id^="clone-"]');
        existingClones.forEach(clone => clone.remove());

        const lastSlideClone = this.originalSlides[this.state.totalSlides - 1].cloneNode(true);
        lastSlideClone.id = 'clone-last';
        this.slider.insertBefore(lastSlideClone, this.slider.firstChild);

        const firstSlideClone = this.originalSlides[0].cloneNode(true);
        firstSlideClone.id = 'clone-first';
        this.slider.appendChild(firstSlideClone);

        this.positionSlider(false);
    }

    getSlideWidth() {
        return this.originalSlides[0]?.offsetWidth || 0;
    }

    positionSlider(smooth = true) {
        const slideWidth = this.getSlideWidth();
        if (slideWidth === 0) return;

        this.setScrollBehavior(smooth);
        this.slider.scrollLeft = slideWidth * (this.state.currentSlide + 1);
    }

    setScrollBehavior(smooth) {
        this.slider.style.scrollBehavior = smooth ? 'smooth' : 'auto';
    }

    updateActiveNavButton(index) {
        this.navButtons.forEach(button => button.classList.remove('active'));
        if (this.navButtons[index]) {
            this.navButtons[index].classList.add('active');
        }
    }

    goToSlide(targetIndex, smooth = true) {
        if (this.state.isTransitioning || targetIndex < 0 || targetIndex >= this.state.totalSlides) {
            return;
        }

        this.state.currentSlide = targetIndex;
        this.positionSlider(smooth);
        this.updateActiveNavButton(targetIndex);
    }

    nextSlide() {
        if (this.state.isTransitioning || this.state.isPaused) return;

        this.state.isTransitioning = true;

        const slideWidth = this.getSlideWidth();
        const currentPosition = this.state.currentSlide + 1;
        const nextPosition = currentPosition + 1;

        this.setScrollBehavior(true);
        this.slider.scrollLeft = slideWidth * nextPosition;

        this.state.currentSlide = (this.state.currentSlide + 1) % this.state.totalSlides;
        this.updateActiveNavButton(this.state.currentSlide);
        if (nextPosition === this.state.totalSlides + 1) {
            setTimeout(() => {
                this.setScrollBehavior(false);
                this.slider.scrollLeft = slideWidth * 1;

                setTimeout(() => {
                    this.setScrollBehavior(true);
                    this.state.isTransitioning = false;
                }, 50);
            }, this.config.transitionDuration);
        } else {
            setTimeout(() => {
                this.state.isTransitioning = false;
            }, this.config.transitionDuration);
        }
    }

    handleManualScroll() {
        if (this.state.isTransitioning) return;

        const slideWidth = this.getSlideWidth();
        const scrollLeft = this.slider.scrollLeft;
        const currentPosition = Math.round(scrollLeft / slideWidth);
        if (currentPosition === 0) {
            this.state.currentSlide = this.state.totalSlides - 1;
            this.setScrollBehavior(false);
            this.slider.scrollLeft = slideWidth * this.state.totalSlides;
            this.updateActiveNavButton(this.state.currentSlide);
            setTimeout(() => this.setScrollBehavior(true), 50);
        } else if (currentPosition === this.state.totalSlides + 1) {
            this.state.currentSlide = 0;
            this.setScrollBehavior(false);
            this.slider.scrollLeft = slideWidth * 1;
            this.updateActiveNavButton(this.state.currentSlide);
            setTimeout(() => this.setScrollBehavior(true), 50);
        } else {
            const newIndex = currentPosition - 1;
            if (newIndex >= 0 && newIndex < this.state.totalSlides && newIndex !== this.state.currentSlide) {
                this.state.currentSlide = newIndex;
                this.updateActiveNavButton(newIndex);
            }
        }
    }

    startAutoSlide() {
        if (this.state.autoSlideTimer) {
            clearInterval(this.state.autoSlideTimer);
        }

        this.state.autoSlideTimer = setInterval(() => {
            this.nextSlide();
        }, this.config.autoSlideInterval);
    }

    stopAutoSlide() {
        if (this.state.autoSlideTimer) {
            clearInterval(this.state.autoSlideTimer);
            this.state.autoSlideTimer = null;
        }
    }

    pauseAutoSlide() {
        this.state.isPaused = true;
        this.stopAutoSlide();
    }

    resumeAutoSlide() {
        this.state.isPaused = false;
        this.startAutoSlide();
    }

    setupEventListeners() {
        this.navButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.pauseAutoSlide();
                this.goToSlide(index);

                setTimeout(() => {
                    this.resumeAutoSlide();
                }, this.config.pauseAfterManualNav);
            });
        });

        let scrollTimeout;
        this.slider.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleManualScroll();
            }, 100);
        });

        if (this.config.pauseOnHover) {
            this.slider.addEventListener('mouseenter', () => {
                this.pauseAutoSlide();
            });

            this.slider.addEventListener('mouseleave', () => {
                this.resumeAutoSlide();
            });
        }

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.positionSlider(false);
            }, 100);
        });
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoSlide();
            } else {
                this.resumeAutoSlide();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.infiniteSlider = new InfiniteSlider();
});

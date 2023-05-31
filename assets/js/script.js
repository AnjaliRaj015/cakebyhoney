AOS.init({
    easing: 'ease-in',
    duration: 1000
});
const slides = document.querySelectorAll('.slider-container .slide'); // get all the slides
const eraser = document.querySelector('.eraser'); // the eraser
const prev = document.getElementById('previous'); // previous button
const next = document.getElementById('next'); // next button
const intervalTime = 6000; // time until nextSlide triggers in miliseconds
const eraserActiveTime = 500; // time to wait until the .eraser goes all the way
let sliderInterval; // variable used to save the setInterval and clear it when needed


const nextSlide = () => {
    // Step 1. Add the .active class to the eraser - this will trigger the eraser to move to the left.
    eraser.classList.add('active');
    // Step 2. Set a timeout that will allow the eraser to move all the way to the left. This is where we'll use the eraserActiveTime - it has to be the same as the CSS value we mentioned above.
    setTimeout(() => {
        // Step 3. Get the active .slide and toggle the .active class on it (in this case, remove it).
        const active = document.querySelector('.slide.active');
        active.classList.toggle('active');
        // Step 4. Check to see if the .slide has a next element sibling available. If it has, add the .active class to it.
        if (active.nextElementSibling) {
            active.nextElementSibling.classList.toggle('active');
        } else {
            // Step 5. If it's the last element in the list, add the .active class to the first slide (the one with index 0).
            slides[0].classList.toggle('active');
        }
        // Step 6.Remove the .active class from the eraser - this will trigger the eraser to move back to the right. It also waits 200 ms before doing this (just to give enough time for the next .slide to move in place).
        setTimeout(() => {
            eraser.classList.remove('active');
        }, 180);
    }, eraserActiveTime);
}

//Button functionality
const prevSlide = () => {
    eraser.classList.add('active');
    setTimeout(() => {
        const active = document.querySelector('.slide.active');
        active.classList.toggle('active');
        // The *changed* part from the nextSlide code
        if (active.previousElementSibling) {
            active.previousElementSibling.classList.toggle('active');
        } else {
            slides[slides.length - 1].classList.toggle('active');
        }
        // End of the changed part
        setTimeout(() => {
            eraser.classList.remove('active');
        }, 180);
    }, eraserActiveTime);
}

next.addEventListener('click', () => {
    nextSlide();
    clearInterval(sliderInterval);
    sliderInterval = setInterval(nextSlide, intervalTime);
});

prev.addEventListener('click', () => {
    prevSlide();
    clearInterval(sliderInterval);
    sliderInterval = setInterval(nextSlide, intervalTime);
});

sliderInterval = setInterval(nextSlide, intervalTime);

// Initial slide
setTimeout(nextSlide, 500);

const lenis = new Lenis()

lenis.on('scroll', (e) => {
    console.log(e)
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)



var winScrollTop = 0;
$.fn.is_on_screen = function () {
    var win = $(window);
    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

function parallax() {
    var scrolled = $(window).scrollTop();
    $('.parallax-section ').each(function () {
        if ($(this).is_on_screen()) {
            var firstTop = $(this).offset().top;
            var $span = $(this).find("img");
            var moveTop = (firstTop - winScrollTop) * 0.3; // speed
            $span.css("transform", "translate3d(0, " + -moveTop + "px, 0)");
        }
    });
}

$(window).scroll(function (e) {
    winScrollTop = $(this).scrollTop();
    parallax();
});
var swiper = new Swiper(".blog-slider", {
    loop: true,
    slidesPerView: "1",
    speed: 500,
    effect: "coverflow",
    coverflowEffect: {
        slideShadows: false,
    },
    mousewheel: {
        invert: false,
    },
    autoplay: {
        delay: 3000,
    },
    breakpoints: {
        0: {
            effect: "slide",
            centeredSlides: false,
        },
        768: {
            slidesPerView: "2",
            centeredSlides: true,
        },
        1200: {
            slidesPerView: "3",
            centeredSlides: true,
        }
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type: "fraction"
    },

});

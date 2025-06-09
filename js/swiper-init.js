// Initialize Swiper
function initModelSwiper() {
  if (document.querySelector(".modelSwiper")) {
    const modelSwiper = new Swiper(".modelSwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      lazy: {
        loadPrevNext: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: {
          coverflowEffect: {
            rotate: 10,
            stretch: 0,
            depth: 100,
            modifier: 1,
          },
        },
      },
    });
  }
}

// Initialize other Swiper
function initTechnologySwiper() {
  if (document.querySelector(".techSwiper")) {
    const techSwiper = new Swiper(".techSwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
        },
      },
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initModelSwiper();
  initTechnologySwiper();
});

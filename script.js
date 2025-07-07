var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
    },
    speed: 1000,
    effect: "slide",
});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".imagenes_slider");
  const images = document.querySelectorAll(".imagenes_slider img");
  let index = 0;
  const intervalTime = 5000;
  let interval;

  function moveSlider() {
      index++;
      
      if (index >= images.length) {
          index = 0;
      }

      const scrollAmount = slider.clientWidth * index;
      slider.scrollTo({
          left: scrollAmount,
          behavior: "smooth"
      });
  }

  function resetInterval() {
      clearInterval(interval);
      interval = setInterval(moveSlider, intervalTime);
  }

  slider.addEventListener("scroll", function () {
      index = Math.round(slider.scrollLeft / slider.clientWidth);
      resetInterval();
  });

  interval = setInterval(moveSlider, intervalTime);
});

let interval;
const slideDuration = 10000;
let currentIndex = 0;

function startAutoSlide() {
    const items = document.querySelectorAll('.item');
    if (items.length <= 1) return;

    interval = setInterval(() => {
        showNextSlide(items);
    }, slideDuration);
}

function showNextSlide(items) {
    currentIndex = (currentIndex + 1) % items.length;
    centerActiveItem(items);
}

function showPrevSlide(items) {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    centerActiveItem(items);
}

function centerActiveItem(items) {
    items.forEach((item, index) => {
        item.classList.remove('active');
        const video = item.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });

    const activeItem = items[currentIndex];
    activeItem.classList.add('active');
    
    const video = activeItem.querySelector('video');
    if (video) {
        video.play();
    }

    const container = document.querySelector('.contenedor');
    const translateX = -activeItem.offsetLeft + (container.offsetWidth / 2) - (activeItem.offsetWidth / 2);
    const carousel = document.querySelector('.carrusel');
    carousel.style.transform = `translateX(${translateX}px)`;
}

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    if (items.length > 0) {
        centerActiveItem(items);
        startAutoSlide();
    }

    const prevButton = document.querySelector('.previo');
    const nextButton = document.querySelector('.siguiente');

    prevButton.addEventListener('click', () => {
        showPrevSlide(items);
        resetAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        showNextSlide(items);
        resetAutoSlide();
    });

    const carousel = document.querySelector('.carrusel');
    carousel.addEventListener('scroll', () => {
        clearInterval(interval);
        const activeItem = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        if (activeItem && activeItem.classList.contains('item')) {
            items.forEach((item, index) => {
                if (item === activeItem) {
                    currentIndex = index;
                }
                item.classList.remove('active');
                const video = item.querySelector('video');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
            activeItem.classList.add('active');
            const video = activeItem.querySelector('video');
            if (video) {
                video.play();
            }
        }
        startAutoSlide();
    });

    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            centerActiveItem(items);
            resetAutoSlide();
        });
    });
});

function resetAutoSlide() {
    clearInterval(interval);
    startAutoSlide();
}

document.getElementById("mensaje").style.display = "block";
            let contador = 10;
            let intervalo = setInterval(function() {
                contador--;
                document.getElementById("cuenta").innerText = contador;
                if (contador === 0) {
                    clearInterval(intervalo);
                    document.getElementById("mensaje").style.display = "none";
                }
            }, 1000);
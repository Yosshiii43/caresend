const achievementsSwiper = new Swiper(".p-achievements__swiper", {
  loop: true,

  speed: 4000,

  autoplay: {
    delay: 0,                 //止まらず流れる
    disableOnInteraction: false,
  },

  /* 手動スワイプ不要なら触れないようにして滑らかに */
  allowTouchMove: false,

  slidesPerView: 'auto',
  spaceBetween: 63,            // ← SP の間隔

  centeredSlides: true,

  breakpoints: {
    768: {
      spaceBetween: 80         // ← tab の間隔
    }
  }
});
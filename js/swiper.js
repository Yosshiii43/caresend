const achievementsSwiper = new Swiper('.p-achievements__swiper', {
  /* ループを活かす（←折り返し防止） */
  loop: true,

  /* ベルトコンベア式に流す */
  freeMode: {
    enabled : true,
    momentum: false,     // 惰性 OFF ＝一定速度
    momentumBounce: false
  },

  slidesPerView : 'auto',
  centeredSlides: false,
  spaceBetween  : 63,
  breakpoints   : { 768: { spaceBetween: 80 } },

  speed   : 4000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false
  },

  allowTouchMove: false
});
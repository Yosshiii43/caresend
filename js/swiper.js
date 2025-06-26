const achievementsSwiper = new Swiper(".p-achievements__swiper", {
  loop: true,
  speed: 12000,
  autoplay: {
    delay: 0,                 //止まらず流れる
    disableOnInteraction: false,
  },
  
  allowTouchMove: false,      // 手動スワイプ不要なら触れないようにして滑らかに 
  slidesPerView: 'auto',
  spaceBetween: 63,
  centeredSlides: true,
  breakpoints: {
    768: {
      spaceBetween: 80
    }
  }
});

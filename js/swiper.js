/*************************************************************************
 * achievements__swiper
 *************************************************************************/
window.addEventListener('load', () => {
  const base = document.querySelectorAll('.p-achievements__swiper .swiper-slide');
  const wrapper = document.querySelector('.p-achievements__swiper .swiper-wrapper');
  for(let i=0;i<3;i++){            // 3 セット追加で計 20 枚
    base.forEach(slide=>wrapper.append(slide.cloneNode(true)));
  }
  const achievementsSwiper = new Swiper('.p-achievements__swiper', {
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed   : 10000,
    allowTouchMove: false,

    slidesPerView : 'auto',
    centeredSlides: false,
    spaceBetween  : 63,
    breakpoints   : { 768: { spaceBetween: 80 } },
    
    
    roundLengths: true,
    loopedSlides:20, 
    loopAdditionalSlides: 0,
  });
});


/* -----------------------------------------------------------
   examples-swiper.js  –  ページ内に複数 Swiper がある前提
----------------------------------------------------------- */
// …省略…
new Swiper('.p-examples__swiper', {
  loop            : true,
  speed           : 600,

  /* SP/Tab 共通 */
  slidesPerView   : 1,
  slidesPerGroup  : 1,
  centeredSlides  : false,  // ← OFF にして padding/overflow で隠す
  spaceBetween    : 0,

  /* PC のみ */
  breakpoints: {
    1024: {
      slidesPerView      : 2,
      slidesPerGroup     : 2,
      centeredSlides     : false,
      spaceBetween       : 70,
      /* 1024 − (425*2 + 70) = 62  → ÷2 = 31 */
      slidesOffsetBefore : 31,
      slidesOffsetAfter  : 31,
      loopAdditionalSlides: 4,
    }
  },

  navigation: {
    nextEl : '.p-examples__next',
    prevEl : '.p-examples__prev',
  },

  observer       : true,
  observeParents : true,
});
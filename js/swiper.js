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
window.addEventListener('load', () => {
  const sel = '.p-examples__swiper';
  const wrap = document.querySelector(sel);
  if (!wrap) return;

  const SLIDE_MAX     = 405;
  const ZONE_SP       = 32;   // 6 + 20 + 6
  const GUTTER_PC     = 70;
  const DESKTOP_MIN   = 1024;

  function setParams(swp){
    const w = wrap.clientWidth;
    const isPC = innerWidth >= DESKTOP_MIN;

    if (isPC){
      /* ─ PC ─ 2枚 + 70px、中央に配置 ─ */
      const offset = (1024 - (SLIDE_MAX*2 + GUTTER_PC)) / 2; // = 72
      Object.assign(swp.params, {
        slidesPerView        : 2,
        slidesPerGroup       : 2,
        spaceBetween         : GUTTER_PC,
        slidesOffsetBefore   : offset,
        slidesOffsetAfter    : offset,
      });
    } else {
      /* ─ SP / Tab ─ 1枚、左右64pxを除いた幅で中央 ─ */
      const slideW = Math.min(SLIDE_MAX, w - ZONE_SP*2);
      const offset = (w - slideW) / 2;
      Object.assign(swp.params, {
        slidesPerView        : 1,
        slidesPerGroup       : 1,
        spaceBetween         : 0,
        slidesOffsetBefore   : offset,
        slidesOffsetAfter    : offset,
      });
    }
  }

  const examplesSwiper = new Swiper(sel, {
    loop   : true,
    speed  : 600,
    navigation: {
      nextEl : `${sel} .swiper-button-next`,
      prevEl : `${sel} .swiper-button-prev`,
    },
    on: {
      beforeInit: setParams,
      resize    : swp => { setParams(swp); swp.update(); },
    },
    observer       : true,
    observeParents : true,
  });
});
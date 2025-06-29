/*************************************************************************
 * 多くのお客様に選ばれ続けています
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


/*************************************************************************
 * 導入事例
 *************************************************************************/
window.addEventListener('load', () => {
  const examplesSwiper = new Swiper('.p-examples__swiper', {
    loop: true,
    slidesPerView: 1,
    breakpoints   : { 1024: { slidesPerView: 2 } },
    spaceBetween  : 32,
    breakpoints   : { 1024: { 
      spaceBetween  : 70,
    } },
    navigation: {
      nextEl: '.swiper-button-next', // 「次へ」ボタン要素のクラス
      prevEl: '.swiper-button-prev', // 「前へ」ボタン要素のクラス
    },
  });
});
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


/*************************************************************************
 * examples-swiper
 *************************************************************************/
window.addEventListener('load', () => {
  const examplesSwiper = new Swiper('.p-examples__swiper', {
    /* 共通設定 ------------------------------------------------ */
    loop           : true,
    speed          : 600,
    navigation     : {
      nextEl : '.swiper-button-next',
      prevEl : '.swiper-button-prev',
    },

    /* スライド枚数・間隔 ------------------------------------ */
    breakpoints : {
      //  ─── SP / Tablet ───
      0 : {
        slidesPerView         : 1,
        slidesPerGroup        : 1,
        centeredSlides        : true,
        centeredSlidesBounds  : true, // ← “はみ出し” 抑止
        spaceBetween          : 0,
      },

      //  ─── PC ───
      1024 : {
        slidesPerView   : 2,
        slidesPerGroup  : 2,
        centeredSlides  : false,      // ← 1枚目が中央に来ないようオフ
        spaceBetween    : 70,
        /* 2枚セット全体を中央に寄せるためのオフセット */
        slidesOffsetBefore : 72,      // (1024 - (405*2 + 70)) / 2
        slidesOffsetAfter  : 72,
      },
    },

    /* リサイズに追従させる（仕様 1-⑤） ----------------------- */
    observer       : true,
    observeParents : true,
  });
});
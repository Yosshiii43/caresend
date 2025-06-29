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
    loop           : true,          // ① 永遠ループ
    centeredSlides : true,          // ① 横位置中央に配置
    speed          : 600,
    navigation     : {
      nextEl : '.swiper-button-next',
      prevEl : '.swiper-button-prev',
    },

    /* スライド枚数・間隔 ------------------------------------ */
    breakpoints : {
      // ── SP 〜 767px ─────────────────────────────
      0 : {
        slidesPerView  : 1,          // ②-SP 1枚
        slidesPerGroup : 1,
        spaceBetween   : 0,          // ②-SP 間隔なし
      },

      // ── Tablet 768px〜1023px ─────────────────────
      768 : {
        slidesPerView  : 1,          // ③-Tab 1枚
        slidesPerGroup : 1,
        spaceBetween   : 0,          // ③-Tab 間隔なし
      },

      // ── PC 1024px 以上 ───────────────────────────
      1024 : {
        slidesPerView  : 2,          // ④-PC 2枚
        slidesPerGroup : 2,          // 1スクロール＝2枚
        spaceBetween   : 70,         // ④-PC 70px 間隔
      },
    },

    /* リサイズに追従させる（仕様 1-⑤） ----------------------- */
    observer        : true,
    observeParents  : true,
    resizeObserver  : true,     // Swiper v9 以降はデフォルト true ですが念押し
  });
});
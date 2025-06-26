const achievementsSwiper = new Swiper(".p-achievements__swiper", {
  loop: true,

  /* ▼ 毎スライドの移動時間（ms）*/
  speed: 4000,                 // 好みで調整。大きいほどゆっくり

  /* ▼ 自動再生。delay=0 で「止まらない」*/
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },

  /* 手動スワイプ不要なら触れないようにして滑らかに */
  allowTouchMove: false,

  /* ------ レイアウト ------ */
  slidesPerView: 2,            // SP 基準
  spaceBetween: 63,            // ← SP の間隔

  centeredSlides: true,

  breakpoints: {
    /* 768px 以上では設定を上書き */
    768: {
      slidesPerView: 5,
      spaceBetween: 80         // ← PC の間隔
    }
  }
});
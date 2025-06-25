/*************************************************************************
 * main.js  –  var.1.4
 * ハンバーガーメニュー制御 + スムーススクロール + 幅切替リセット
 *************************************************************************/

// リロード時に勝手に元のスクロール位置へ戻らないように
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  /* ─────────────────────────────────────
     0. 定数 & 要素取得
  ───────────────────────────────────── */
  const header    = document.getElementById('js-header');
  const mqPC = window.matchMedia('(min-width: 1024px)');      // PC = 1024px↑
  const hamburger = document.getElementById('js-hamburger');
  const nav       = document.getElementById('global-nav');
  const body      = document.body;
  if (!nav) return;                                           // ナビが無ければ終了

  const getHeaderHeight = () => header ? header.offsetHeight : 0;

  // ユーティリティ
  const syncHeaderVar = () => { //「CSS 変数 --header-h をヘッダーの実寸で同期する」関数。
    document.documentElement.style.setProperty('--header-h', `${getHeaderHeight()}px`);
  };
  syncHeaderVar();                         // 初期設定
  window.addEventListener('resize', syncHeaderVar); //ブラウザのリサイズ時に毎回実行

  /* ─────────────────────────────────────
     1. ナビ状態を強制リセットするヘルパー
  ───────────────────────────────────── */
  const closeMobileMenu = () => {                             // SP 幅での初期状態
    hamburger?.classList.remove('is-open');
    hamburger?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    body.classList.remove('is-scrollLock');
    nav.setAttribute('aria-hidden', 'true');
    nav.setAttribute('inert', '');
  };

  const openDesktopNav = () => {                              // PC 幅の初期状態
    hamburger?.classList.remove('is-open');
    hamburger?.setAttribute('aria-expanded', 'false');
    body.classList.remove('is-scrollLock');
    nav.classList.remove('is-open');
    nav.removeAttribute('aria-hidden');
    nav.removeAttribute('inert');
  };

  /* ─────────────────────────────────────
     2. ハンバーガー開閉
  ───────────────────────────────────── */
  const toggleMenu = () => {
    const isOpen = nav.classList.toggle('is-open');
    hamburger?.setAttribute('aria-expanded', isOpen);
    nav.setAttribute('aria-hidden', !isOpen);
    body.classList.toggle('is-scrollLock', isOpen);

    if (isOpen) {
      nav.removeAttribute('inert');
    } else {
      const focused = document.activeElement;
      if (nav.contains(focused)) focused.blur();
      nav.setAttribute('inert', '');
    }
    syncHeaderVar();
  };

  hamburger?.addEventListener('click', toggleMenu);

/* ─────────────────────────────────────
   3. 共通スムーススクロール（prefers‐reduced-motion 対応）
───────────────────────────────────── */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const smoothScrollTo = (targetY, duration = 350) => { //速度をここで管理
    if (reduceMotion) {
      window.scrollTo(0, targetY);
      return;
    }
    const startY  = window.pageYOffset;
    const dist    = targetY - startY;
    const startT  = performance.now();
    const easeOut = t => t * (2 - t);       // お好みで変更可

    const step = now => {
      const t = Math.min(1, (now - startT) / duration);
      window.scrollTo(0, startY + dist * easeOut(t));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const scrollToTarget = target => {
    const headerH = getHeaderHeight();   // ←動的に取得
    const offsetY = target.getBoundingClientRect().top + window.pageYOffset - headerH;
    smoothScrollTo(offsetY);
  };

  /* ─────────────────────────────────────
     4. アンカーリンク（ページ内）クリック：スムーススクロール
  ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');     // "#first" 等
      e.preventDefault();                         // ★常に標準ジャンプ抑止

      if (!href || href === '#') return;          // ダミー "#" はここで終了

      const target = document.querySelector(href);
      if (!target) return;                        // 要素が無ければ終了

      history.pushState(null, '', href);          // URL の # を更新

      // ハンバーガーが開いていたら閉じる (nav がある時のみ)
      if (nav && nav.classList.contains('is-open')) toggleMenu();

      // 次フレームでスムーススクロール
      requestAnimationFrame(() => scrollToTarget(target));
    });
  });

  /* ─────────────────────────────────────
     5. PC ⇔ SP 幅切り替え時のリセット
  ───────────────────────────────────── */
  mqPC.addEventListener('change', e => {
    if (e.matches) {               // SP → PC
      openDesktopNav();
    } else {                       // PC → SP
      closeMobileMenu();
    }
  });

  // 画面読み込み時の初期判定
  if (mqPC.matches) {
    openDesktopNav();
  } else {
    closeMobileMenu();
  }
});

/*************************************************************************
 * フェードイン
 *************************************************************************/
document.addEventListener('DOMContentLoaded', () => {
  const targetElements = document.querySelectorAll('.js-fadeIn')
  // 該当の要素が存在しなければ処理を終了
  if (!targetElements) return

  // ブラウザの内側の高さ
  let windowHeight = window.innerHeight
  // スクロール量
  let lastScrollY = window.scrollY
  // スクロールイベントの連続発火を防ぐためのフラグ
  let isTicking = false

  // 画面リサイズ時にwindowHeightを更新
  window.addEventListener('resize', () => {
    windowHeight = window.innerHeight
  })

  // 要素が表示された時にクラスを付与する関数
  const inviewAnimation = () => {
    targetElements.forEach((element) => {
      const targetPosition = element.getBoundingClientRect().top + lastScrollY
      const isInview = lastScrollY > targetPosition - windowHeight + 100
      element.classList.toggle('is-inview', isInview)
    })
  }

  // スクロールイベント発火時に実行する関数
  const onScroll = () => {
    // inviewAnimationを実行中は処理をスキップ
    if (isTicking) return
    lastScrollY = window.scrollY
    isTicking = true
    // 1フレーム待ってからinviewAnimationを実行
    requestAnimationFrame(() => {
      inviewAnimation()
      isTicking = false
    })
  }

  // スクロールイベントを登録
  window.addEventListener('scroll', onScroll)
})


/*************************************************************************
 * 資料請求フォーム
 *************************************************************************/
(() => {
  const form = document.getElementById('dlForm');
  const btn  = document.getElementById('dlBtn');
  const msg  = document.getElementById('thanksMsg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    btn.disabled = true;
    btn.classList.add('is-disabled'); 

    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      credentials: 'same-origin'
    });

    if (res.ok) {
      msg.style.display = 'block';
    } else {
      alert('送信に失敗しました。時間をおいて再度お試しください');
      btn.disabled = false;
      btn.classList.remove('is-disabled');
    }
  });
})();

/*************************************************************************
 * アコーディオン
 *************************************************************************/
document.querySelectorAll('.js-accordionDetails').forEach(details => {
  const summary  = details.querySelector('.js-accordionSummary');
  const content  = details.querySelector('.js-accordionContent');
  let   anim     = null;                       // 進行中アニメを保持
  const DURATION = 300;                        // 時間(ms) 好みで

  summary.addEventListener('click', e => {
    e.preventDefault();

    /* 進行中アニメがあればキャンセル（連打で “ガクッ” とカクついて見えることの対策） */
    if (anim) { 
      anim.cancel(); 
    }

    const isOpening = !details.open;           // これから「開く」か？
    const startH    = content.offsetHeight;    // 今まさに見えている高さ
    const endH      = isOpening ? content.scrollHeight // 全部表示したときの高さ
                                : 0;                  // 閉じるときは 0

    /* 開くときは先に open=true にしてスクリーンリーダーにも知らせる */
    if (isOpening) {
      details.open = true;
    }

    /* Web Animations API で高さを補間 */
    anim = content.animate( //.animate()メソッドの返り値をanimに格納
      { height: [`${startH}px`, `${endH}px`] }, // from → to
      { duration: DURATION, easing: 'ease', fill: 'forwards' } //アニメーション終了後にアニメーション終了時の状態を維持するにはforwards
    );

    /* アニメ終了後の後始末 */
    anim.onfinish = () => {
      if (isOpening) {
        // 開き終わったら height:auto に戻す  →  中身が増減しても追従
        content.style.height = 'auto';
      } else {
        // 閉じ終わったら open=false に戻し、height 指定を撤去
        details.open = false;
        content.style.height = '';
      }
      anim = null;
    };
  });
});

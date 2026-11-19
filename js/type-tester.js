/* Rivet 타이핑 테스터
   - 큰 글자 영역에 직접 입력 → 아래 사이즈 단계(리플렛의 Rivet 워터폴)에 동시에 반영
   - 크기 / 자간 / 행간 슬라이더, 반전, 180° 회전
   - 글리프 표: 누르면 크게 보기 + 입력창에 추가 */
(() => {
  // Rivet-Regular.otf 에 들어 있는 문자
  const GLYPHS = ' !#%&()*,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\\^abcdefghijklmnopqrstuvwxyz~¡¿‘’“”…'
    .split('').filter(c => c !== ' ');
  const SUPPORTED = new Set([' ', '\n', ...GLYPHS]);
  const SIZES = [120, 88, 64, 44, 28, 16, 11];

  const PARA = 'Rivet are essential fasteners in construction and manufacturing, providing durable connections that can withstand immense pressure. They secure materials together with a sturdy grip, ensuring structural integrity. The industrial revolution significantly increased the use of rivets, revolutionizing construction and assembly methods. Bolts and rivets became synonymous with robust engineering, creating rigid joints for massive infrastructures.';

  window.mountTypeTester = function (mount) {
    mount.outerHTML = `
    <div class="tt" id="tt">
      <div class="tt-bar">
        <span class="tt-name">Rivet Regular</span>
        <label>Size <input type="range" id="tt-fs" min="24" max="360" value="200"><output id="tt-fs-o">200</output></label>
        <label>Tracking <input type="range" id="tt-tr" min="-10" max="40" value="0"><output id="tt-tr-o">0</output></label>
        <label>Leading <input type="range" id="tt-lh" min="80" max="180" value="105"><output id="tt-lh-o">1.05</output></label>
        <button type="button" id="tt-flip" aria-pressed="false">180°</button>
        <button type="button" id="tt-inv" aria-pressed="false">Invert</button>
        <button type="button" id="tt-reset">Reset</button>
      </div>
      <div class="tt-stage" id="tt-stage" contenteditable="true" spellcheck="false" data-ph="Type here" aria-label="Rivet 서체로 직접 입력해 보세요">Rivet</div>
      <p class="tt-hint" id="tt-hint">위 글자를 클릭해서 직접 입력해 보세요.</p>
      <div class="tt-fall" id="tt-fall"></div>
      <div class="tt-para">
        <h4>Rivet</h4>
        <p contenteditable="true" spellcheck="false">${PARA}</p>
      </div>
      <div class="tt-glyphs">
        <div class="tt-grid" id="tt-grid"></div>
        <div class="tt-big"><b id="tt-big">R</b><small id="tt-code">U+0052</small></div>
      </div>
    </div>`;

    const root = document.getElementById('tt');
    const q = s => root.querySelector(s);
    const stage = q('#tt-stage'), fall = q('#tt-fall'), hint = q('#tt-hint');

    // 워터폴
    fall.innerHTML = SIZES.map(s => `<div style="font-size:${s}px"><span>${s}pt</span><em style="font-style:normal"></em></div>`).join('');
    const rows = [...fall.querySelectorAll('em')];

    function sync() {
      const t = stage.innerText.replace(/\n+$/, '');
      rows.forEach(r => (r.textContent = t || 'Rivet'));
      const unsupported = [...t].some(c => !SUPPORTED.has(c));
      hint.textContent = unsupported
        ? 'Rivet은 라틴 문자 서체예요. 지원하지 않는 글자(한글 등)는 기본 서체로 보여요.'
        : '위 글자를 클릭해서 직접 입력해 보세요.';
    }
    stage.addEventListener('input', sync);
    stage.addEventListener('paste', e => { // 서식 없이 붙여넣기
      e.preventDefault();
      document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text'));
    });

    // 슬라이더
    const bind = (id, fn) => {
      const el = q('#' + id), out = q('#' + id + '-o');
      const run = () => { out.textContent = fn(+el.value); };
      el.addEventListener('input', run); run();
      return el;
    };
    const fs = bind('tt-fs', v => { stage.style.setProperty('--fs', v + 'px'); return v; });
    const tr = bind('tt-tr', v => { const em = (v / 100).toFixed(2); root.style.setProperty('--tr', em + 'em'); return em; });
    const lh = bind('tt-lh', v => { const l = (v / 100).toFixed(2); stage.style.setProperty('--lh', l); return l; });

    const toggle = (id, cls) => q('#' + id).addEventListener('click', e => {
      const on = root.classList.toggle(cls);
      e.currentTarget.setAttribute('aria-pressed', on);
    });
    toggle('tt-flip', 'flip');
    toggle('tt-inv', 'invert');

    q('#tt-reset').addEventListener('click', () => {
      stage.textContent = 'Rivet';
      [[fs, 200], [tr, 0], [lh, 105]].forEach(([el, v]) => { el.value = v; el.dispatchEvent(new Event('input')); });
      root.classList.remove('flip', 'invert');
      root.querySelectorAll('[aria-pressed]').forEach(b => b.setAttribute('aria-pressed', 'false'));
      sync();
    });

    // 반응형: 좁은 화면에서는 기본 크기 줄이기
    if (innerWidth < 760) { fs.value = 96; fs.dispatchEvent(new Event('input')); }

    // 글리프 표
    const grid = q('#tt-grid'), big = q('#tt-big'), code = q('#tt-code');
    grid.innerHTML = GLYPHS.map(c => `<button type="button" title="${c}">${c.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]))}</button>`).join('');
    const show = (btn) => {
      const c = btn.textContent;
      big.textContent = c;
      code.textContent = 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
      grid.querySelectorAll('.on').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
    };
    grid.addEventListener('mouseover', e => { if (e.target.tagName === 'BUTTON') show(e.target); });
    grid.addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') return;
      show(e.target);
      stage.textContent += e.target.textContent;
      sync();
    });

    sync();
  };
})();

/* Rivet 타이핑 — 견본 문장을 클릭해서 바로 입력하는 단순한 방식 */
(() => {
  const PARA = 'Rivet are essential fasteners in construction and manufacturing, providing durable connections that can withstand immense pressure.';

  window.mountTypeTester = function (mount) {
    mount.outerHTML = `
    <div class="tt" id="tt">
      <div class="tt-bar">
        <span>Rivet Regular</span>
        <input type="range" id="tt-fs" min="24" max="320" value="160" aria-label="글자 크기">
      </div>
      <div class="tt-line" id="tt-line" contenteditable="true" spellcheck="false" aria-label="Rivet 서체로 입력해 보세요">Type something</div>
      <p class="tt-small" contenteditable="true" spellcheck="false" aria-label="Rivet 서체로 입력해 보세요">${PARA}</p>
    </div>`;

    const root = document.getElementById('tt');
    const line = root.querySelector('#tt-line');
    const fs = root.querySelector('#tt-fs');
    const setSize = () => line.style.fontSize = fs.value + 'px';
    fs.addEventListener('input', setSize);
    if (innerWidth < 760) fs.value = 72;
    setSize();

    // 서식 없이 붙여넣기
    root.querySelectorAll('[contenteditable]').forEach(el => el.addEventListener('paste', e => {
      e.preventDefault();
      document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text'));
    }));
  };
})();

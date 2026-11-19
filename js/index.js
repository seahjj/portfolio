(() => {
  const NAV = window.NAV;
  const byId = Object.fromEntries(window.PROJECTS.map(p => [p.id, p]));
  const $ = s => document.querySelector(s);

  const colGroups = $('#col-groups');
  const colItems = $('#col-items');
  const colSub = $('#col-sub');
  const preview = $('#preview');
  const previewImg = preview.querySelector('img');
  const touch = matchMedia('(hover: none)').matches;

  $('#name').textContent = NAV.name;

  // 이전 페이지에서 돌아온 경우 부드럽게 등장
  if (sessionStorage.getItem('back')) {
    document.body.classList.add('enter');
    sessionStorage.removeItem('back');
  }

  /* ---------- 렌더 ---------- */
  function makeItem(node) {
    const el = document.createElement('a');
    el.className = 'item';
    el.textContent = node.label;
    if (node.id) {
      el.href = `work.html?id=${encodeURIComponent(node.id)}`;
      const p = byId[node.id];
      if (p && !p.blocks.length && !p.thumb) el.classList.add('empty');
    } else {
      el.href = '#';
      el.setAttribute('role', 'button');
    }
    return el;
  }

  function reveal(col, nodes, onHover) {
    col.classList.remove('show');
    col.innerHTML = '';
    if (!nodes) return;
    nodes.forEach(n => {
      const el = makeItem(n);
      el.addEventListener('mouseenter', () => onHover(n, el));
      el.addEventListener('focus', () => onHover(n, el));
      el.addEventListener('click', e => handleClick(e, n, el, onHover));
      col.appendChild(el);
    });
    requestAnimationFrame(() => requestAnimationFrame(() => col.classList.add('show')));
  }

  function setOn(col, el) {
    col.querySelectorAll('.item').forEach(i => i.classList.toggle('on', i === el));
  }

  NAV.groups.forEach((g, gi) => {
    const el = makeItem(g);
    el.addEventListener('mouseenter', () => openGroup(g, el));
    el.addEventListener('focus', () => openGroup(g, el));
    el.addEventListener('click', e => { e.preventDefault(); openGroup(g, el); });
    colGroups.appendChild(el);
  });

  let currentGroup = null;
  function openGroup(g, el) {
    if (currentGroup === g) return;
    currentGroup = g;
    setOn(colGroups, el);
    reveal(colSub, null);
    reveal(colItems, g.items, onItemHover);
    hidePreview();
  }

  let currentParent = null;
  function onItemHover(n, el) {
    setOn(colItems, el);
    if (n.children) {
      if (currentParent !== n) { currentParent = n; reveal(colSub, n.children, onSubHover); }
      hidePreview();
    } else {
      currentParent = null;
      reveal(colSub, null);
      showPreview(n.id);
    }
  }
  function onSubHover(n, el) { setOn(colSub, el); showPreview(n.id); }

  function handleClick(e, n, el, onHover) {
    e.preventDefault();
    if (n.children) { onHover(n, el); return; }
    // 터치 기기: 첫 탭은 선택, 두 번째 탭에서 이동
    if (touch && !el.classList.contains('on')) { onHover(n, el); return; }
    go(n.id, el);
  }

  /* ---------- 미리보기 (커서 따라다님) ---------- */
  let mx = innerWidth / 2, my = innerHeight / 2, px = mx, py = my, raf = null;
  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function loop() {
    px += (mx - px) * 0.16; py += (my - py) * 0.16;
    // 목차 글자 위쪽 빈 공간에 띄우고, 가로로만 커서를 따라감 (글자를 가리지 않게)
    const w = preview.offsetWidth, h = preview.offsetHeight;
    const textTop = document.getElementById('name').getBoundingClientRect().top;
    let x = Math.min(Math.max(px - w / 2, 16), innerWidth - w - 16);
    let y = Math.max(textTop - h - 28, 16);
    preview.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    raf = requestAnimationFrame(loop);
  }
  function showPreview(id) {
    const p = byId[id];
    if (!p || !p.thumb || touch) return hidePreview();
    if (!previewImg.src.endsWith(p.thumb)) previewImg.src = p.thumb;
    preview.classList.add('show');
    if (!raf) { px = mx; py = my; loop(); }
  }
  function hidePreview() { preview.classList.remove('show'); }
  document.getElementById('index').addEventListener('mouseleave', hidePreview);

  // 미리보기 이미지 미리 불러오기
  window.PROJECTS.forEach(p => { if (p.thumb) { const i = new Image(); i.src = p.thumb; } });

  /* ---------- 페이지 전환: 누른 단어가 좌상단 제목 자리로 ---------- */
  function cssPx(expr) {
    const probe = document.createElement('div');
    probe.style.cssText = `position:absolute;visibility:hidden;width:${expr}`;
    document.body.appendChild(probe);
    const v = probe.getBoundingClientRect().width;
    probe.remove();
    return v;
  }

  function go(id, el) {
    const href = `work.html?id=${encodeURIComponent(id)}`;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { location.href = href; return; }

    const r = el.getBoundingClientRect();
    const fs = parseFloat(getComputedStyle(el).fontSize);
    const pad = cssPx('var(--pad)');
    const titleFs = cssPx('var(--title)');

    const fly = document.createElement('div');
    fly.className = 'flyer';
    fly.textContent = el.textContent;
    const top0 = r.top + (r.height - fs) / 2;
    fly.style.cssText = `left:${r.left}px;top:${top0}px;font-size:${fs}px;line-height:1;`;
    document.body.appendChild(fly);
    el.classList.add('picked');
    el.style.visibility = 'hidden';
    document.body.classList.add('leaving');

    // 목표: work 페이지 제목 위치 (line-height 1)
    const s = titleFs / fs;
    const tx = pad - r.left;
    const ty = pad * 3.2 - top0;
    requestAnimationFrame(() => {
      fly.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    });
    sessionStorage.setItem('fly', '1');
    setTimeout(() => { location.href = href; }, 720);
  }

  // 뒤로가기(bfcache)로 돌아왔을 때 상태 복구
  addEventListener('pageshow', e => {
    if (!e.persisted) return;
    document.body.classList.remove('leaving');
    document.querySelectorAll('.flyer').forEach(f => f.remove());
    document.querySelectorAll('.picked').forEach(p => { p.classList.remove('picked'); p.style.visibility = ''; });
  });
})();

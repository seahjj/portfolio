/* 목차 (첫 페이지와 프로젝트 페이지가 같은 목차를 씀)
   window.initNav({ current: '프로젝트 id' | null, onIndex: true | false }) */
(() => {
  window.initNav = function ({ current = null, onIndex = true } = {}) {
    const NAV = window.NAV;
    const byId = Object.fromEntries(window.PROJECTS.map(p => [p.id, p]));
    const $ = s => document.querySelector(s);
    const nav = $('#index');
    const colGroups = $('#col-groups'), colItems = $('#col-items'), colSub = $('#col-sub');
    const preview = $('#preview');
    const previewImg = preview && preview.querySelector('img');
    const touch = matchMedia('(hover: none)').matches;
    $('#name').textContent = NAV.name;

    /* 현재 프로젝트의 위치 찾기 */
    let path = null;
    if (current) {
      NAV.groups.forEach(g => g.items.forEach(it => {
        if (it.id === current) path = { g, it };
        (it.children || []).forEach(ch => { if (ch.id === current) path = { g, it, ch }; });
      }));
    }

    const href = id => `work.html?id=${encodeURIComponent(id)}`;
    function makeItem(node) {
      const el = document.createElement('a');
      el.className = 'item';
      el.textContent = node.label;
      el.href = node.id ? href(node.id) : '#';
      if (!node.id) el.setAttribute('role', 'button');
      const p = node.id && byId[node.id];
      if (p && !p.blocks.length && !p.thumb) el.classList.add('empty');
      if (node.id && node.id === current) el.classList.add('here');
      return el;
    }
    function setOn(col, el) { col.querySelectorAll('.item').forEach(i => i.classList.toggle('on', i === el)); }

    function fill(col, nodes, onHover, animate = true) {
      col.classList.remove('show');
      col.innerHTML = '';
      if (!nodes) return [];
      const els = nodes.map(n => {
        const el = makeItem(n);
        el.addEventListener('mouseenter', () => onHover(n, el));
        el.addEventListener('focus', () => onHover(n, el));
        el.addEventListener('click', e => handleClick(e, n, el, onHover));
        col.appendChild(el);
        return el;
      });
      if (animate) requestAnimationFrame(() => requestAnimationFrame(() => col.classList.add('show')));
      else col.classList.add('show');
      return els;
    }

    let curGroup = null, curParent = null;
    function openGroup(g, el, animate = true) {
      if (curGroup === g) return;
      curGroup = g; curParent = null;
      setOn(colGroups, el);
      fill(colSub, null);
      hidePreview();
      return fill(colItems, g.items, onItemHover, animate);
    }
    function onItemHover(n, el) {
      setOn(colItems, el);
      if (n.children) {
        if (curParent !== n) { curParent = n; fill(colSub, n.children, onSubHover); }
        hidePreview();
      } else {
        curParent = null; fill(colSub, null); showPreview(n.id);
      }
    }
    function onSubHover(n, el) { setOn(colSub, el); showPreview(n.id); }

    function handleClick(e, n, el, onHover) {
      e.preventDefault();
      if (n.children) { onHover(n, el); return; }
      if (touch && !el.classList.contains('on')) { onHover(n, el); return; }
      go(n.id);
    }

    const groupEls = NAV.groups.map(g => {
      const el = makeItem(g);
      el.addEventListener('mouseenter', () => openGroup(g, el));
      el.addEventListener('focus', () => openGroup(g, el));
      el.addEventListener('click', e => { e.preventDefault(); openGroup(g, el); });
      colGroups.appendChild(el);
      return el;
    });

    /* 프로젝트 페이지: 현재 경로를 펼친 상태로 시작 */
    function restore() {
      if (!path) return;
      const gi = NAV.groups.indexOf(path.g);
      curGroup = null;
      const items = openGroup(path.g, groupEls[gi], false);
      const ii = path.g.items.indexOf(path.it);
      setOn(colItems, items[ii]);
      if (path.ch) {
        curParent = path.it;
        const subs = fill(colSub, path.it.children, onSubHover, false);
        setOn(colSub, subs[path.it.children.indexOf(path.ch)]);
      }
    }
    restore();
    // 목차 밖으로 마우스가 나가면 현재 위치로 되돌아감
    if (path) nav.addEventListener('mouseleave', () => { hidePreview(); restore(); });

    /* 미리보기 (목차 위 빈 공간에서 가로로 커서를 따라감) */
    let mx = innerWidth / 2, px = mx, raf = null;
    addEventListener('mousemove', e => { mx = e.clientX; });
    function loop() {
      px += (mx - px) * 0.16;
      const w = preview.offsetWidth, h = preview.offsetHeight;
      const top = $('#name').getBoundingClientRect().top;
      const x = Math.min(Math.max(px - w / 2, 16), innerWidth - w - 16);
      // 목차가 화면 위쪽에 있으면 아래에 띄움
      const below = top < h + 60;
      const y = below ? nav.getBoundingClientRect().bottom + 24 : top - h - 28;
      preview.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    }
    function showPreview(id) {
      const p = byId[id];
      if (!preview || !p || !p.thumb || touch || id === current) return hidePreview();
      if (!previewImg.src.endsWith(p.thumb)) previewImg.src = p.thumb;
      preview.classList.add('show');
      if (!raf) { px = mx; loop(); }
    }
    function hidePreview() { preview && preview.classList.remove('show'); }
    nav.addEventListener('mouseleave', hidePreview);
    window.PROJECTS.forEach(p => { if (p.thumb) { const i = new Image(); i.src = p.thumb; } });

    /* 이동: 첫 페이지에서는 목차가 위로 올라간 뒤 이동 */
    function go(id) {
      if (id === current) return;
      hidePreview();
      if (onIndex && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        sessionStorage.setItem('lifted', '1');
        document.body.classList.add('lifting');
        setTimeout(() => { location.href = href(id); }, 620);
      } else {
        location.href = href(id);
      }
    }

    addEventListener('pageshow', e => { if (e.persisted) document.body.classList.remove('lifting'); });
  };
})();

(() => {
  const list = window.PROJECTS;
  const id = new URLSearchParams(location.search).get('id');
  const p = list.find(x => x.id === id) || list[0];
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- 정보 카드 ---------- */
  document.title = `${p.title} — jung seah`;
  $('#title').textContent = p.title;
  $('#title-ko').textContent = p.titleKo || '';
  $('#summary').textContent = p.summary || '';
  const meta = [['Year', p.year], ['Category', p.category], ['Role', p.role], ['Tools', p.tools]].filter(([, v]) => v);
  $('#meta').innerHTML = meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('');

  if (sessionStorage.getItem('fly')) {
    document.body.classList.add('fly-in');
    sessionStorage.removeItem('fly');
  }

  /* ---------- 블록 ---------- */
  const cap = c => (c ? `<figcaption>${esc(c)}</figcaption>` : '');
  const R = {
    text: b => `<section class="b-text">${b.heading ? `<h3>${esc(b.heading)}</h3>` : ''}<p>${esc(b.body)}</p></section>`,
    image: b => `<figure class="b-frame"><img src="${b.src}" alt="${esc(b.caption || p.title)}" loading="lazy" />${cap(b.caption)}</figure>`,
    grid: b => `<div class="b-grid" style="--cols:${b.cols || 2}">${b.items.map(i =>
      `<figure class="b-frame"><img src="${i.src}" alt="${esc(i.caption || '')}" loading="lazy" />${cap(i.caption)}</figure>`).join('')}</div>`,
    video: b => `<figure class="b-frame"><video src="${b.src}" poster="${b.poster || ''}" autoplay muted loop playsinline controls></video>${cap(b.caption)}</figure>`,
    embed: b => `<figure class="b-embed"><iframe src="${b.src}" title="${esc(p.title)}" loading="lazy" allow="autoplay"></iframe>
      <figcaption><span>${esc(b.caption || '')}</span>${b.open ? `<a href="${b.src}" target="_blank" rel="noopener">전체 화면으로 보기 ↗</a>` : ''}</figcaption></figure>`,
    facts: b => `<section class="b-facts">${b.items.map(([k, v]) => `<div><strong>${esc(k)}</strong><span>${esc(v)}</span></div>`).join('')}</section>`,
    'type-tester': () => `<section class="b-tt"><div class="tt-mount"></div></section>`,
  };

  const wrap = $('#blocks');
  wrap.innerHTML = p.blocks.length
    ? p.blocks.map(b => (R[b.type] ? R[b.type](b) : '')).join('')
    : '<section class="b-text empty"><p>준비 중인 작업이에요.</p></section>';
  wrap.querySelectorAll('.tt-mount').forEach(m => window.mountTypeTester && window.mountTypeTester(m));

  // 영상 파일이 없으면 포스터 이미지로
  wrap.querySelectorAll('video').forEach(v => v.addEventListener('error', () => {
    if (!v.poster) return;
    const img = document.createElement('img'); img.src = v.poster; img.alt = p.title; v.replaceWith(img);
  }, { once: true }));

  /* ---------- 이전 / 다음 ---------- */
  const visible = list.filter(x => x.blocks.length || x.thumb);
  const vi = Math.max(0, visible.indexOf(p));
  const prev = visible[(vi - 1 + visible.length) % visible.length];
  const next = visible[(vi + 1) % visible.length];
  $('#prev').href = `work.html?id=${prev.id}`;
  $('#next').href = `work.html?id=${next.id}`;
  $('#next').title = next.title;
  $('#prev').title = prev.title;
  $('#toindex').addEventListener('click', () => sessionStorage.setItem('back', '1'));
})();

(() => {
  const list = window.PROJECTS;
  const id = new URLSearchParams(location.search).get('id');
  const idx = Math.max(0, list.findIndex(p => p.id === id));
  const p = list[idx];
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  document.title = `${p.title} — jung seah`;
  $('#title').textContent = p.title;
  $('#title-ko').textContent = p.titleKo || '';
  $('#summary').textContent = p.summary || '';

  const meta = [['Year', p.year], ['Category', p.category], ['Role', p.role], ['Tools', p.tools]].filter(([, v]) => v);
  $('#meta').innerHTML = meta.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');

  // 목차에서 날아온 경우: 제목은 그대로, 나머지만 올라오며 등장
  if (sessionStorage.getItem('fly')) {
    $('#head').classList.add('fly-in');
    sessionStorage.removeItem('fly');
  }

  /* ---------- 블록 렌더 ---------- */
  const R = {
    text: b => `<div class="b-text">${b.heading ? `<h3>${esc(b.heading)}</h3>` : '<span></span>'}<p>${esc(b.body)}</p></div>`,
    image: b => `<figure class="b-image ${b.size || 'full'}"><img src="${b.src}" alt="${esc(b.caption || p.title)}" loading="lazy" />${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ''}</figure>`,
    grid: b => `<div class="b-grid" style="grid-template-columns:repeat(${b.cols || 2},1fr)">${b.items.map(i =>
      `<figure><img src="${i.src}" alt="${esc(i.caption || '')}" loading="lazy" />${i.caption ? `<figcaption>${esc(i.caption)}</figcaption>` : ''}</figure>`).join('')}</div>`,
    video: b => `<figure class="b-video ${b.narrow ? 'narrow' : ''}"><video src="${b.src}" poster="${b.poster || ''}" autoplay muted loop playsinline controls></video>${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ''}</figure>`,
    embed: b => `<figure class="b-embed"><div class="frame" style="aspect-ratio:${b.ratio || '16 / 9'}"><iframe src="${b.src}" title="${esc(p.title)}" loading="lazy" allow="autoplay"></iframe></div>
      <figcaption class="cap"><span>${esc(b.caption || '')}</span>${b.open ? `<a href="${b.src}" target="_blank" rel="noopener">전체 화면으로 보기 ↗</a>` : ''}</figcaption></figure>`,
    facts: b => `<div class="b-facts">${b.items.map(([k, v]) => `<div><strong>${esc(k)}</strong><span>${esc(v)}</span></div>`).join('')}</div>`,
    'type-tester': () => `<div class="tt-mount"></div>`,
  };

  const wrap = $('#blocks');
  if (!p.blocks.length) {
    wrap.innerHTML = '<p class="empty-note">준비 중인 작업이에요.</p>';
  } else {
    wrap.innerHTML = p.blocks.map(b => (R[b.type] ? R[b.type](b) : '')).join('');
  }
  wrap.querySelectorAll('.tt-mount').forEach(m => window.mountTypeTester && window.mountTypeTester(m));

  // 영상 파일이 아직 없으면 포스터 이미지만 보여주기
  wrap.querySelectorAll('.b-video video').forEach(v => {
    v.addEventListener('error', () => {
      if (!v.poster) return;
      const img = document.createElement('img');
      img.src = v.poster; img.alt = p.title;
      v.replaceWith(img);
    }, { once: true });
  });

  /* ---------- 이전 / 다음 ---------- */
  const visible = list.filter(x => x.blocks.length || x.thumb);
  const vi = visible.indexOf(p);
  const prev = visible[(vi - 1 + visible.length) % visible.length];
  const next = visible[(vi + 1) % visible.length];
  $('#prev').href = `work.html?id=${prev.id}`;
  $('#next').href = `work.html?id=${next.id}`;
  $('#footer').innerHTML = `<small>next</small><a href="work.html?id=${next.id}">${esc(next.title)}</a>`;

  // index로 돌아갈 때 등장 효과
  document.querySelectorAll('#home, #toindex').forEach(a => a.addEventListener('click', () => sessionStorage.setItem('back', '1')));
})();

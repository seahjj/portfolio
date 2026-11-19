(() => {
  const list = window.PROJECTS;
  const id = new URLSearchParams(location.search).get('id');
  const p = list.find(x => x.id === id) || list[0];
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // 첫 페이지에서 목차가 올라오며 넘어온 경우: 내용만 서서히 등장
  if (sessionStorage.getItem('lifted')) { document.body.classList.add('arrive'); sessionStorage.removeItem('lifted'); }

  initNav({ current: p.id, onIndex: false });

  document.title = `${p.title} — jung seah`;
  $('#title-ko').textContent = p.titleKo || '';
  $('#summary').textContent = p.summary || '';
  const meta = [['year', p.year], ['category', p.category], ['role', p.role], ['tools', p.tools]].filter(([, v]) => v);
  $('#meta').innerHTML = meta.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');

  const cap = c => (c ? `<figcaption>${esc(c)}</figcaption>` : '');
  const R = {
    text: b => `<section class="b-text"><h3>${esc(b.heading || '')}</h3><p>${esc(b.body)}</p></section>`,
    image: b => `<figure class="b-media ${b.size || ''}"><img src="${b.src}" alt="${esc(b.caption || p.title)}" loading="lazy" />${cap(b.caption)}</figure>`,
    grid: b => `<div class="b-grid" style="--cols:${b.cols || 2}">${b.items.map(i =>
      `<figure class="b-media"><img src="${i.src}" alt="${esc(i.caption || '')}" loading="lazy" />${cap(i.caption)}</figure>`).join('')}</div>`,
    video: b => `<figure class="b-media"><video src="${b.src}" poster="${b.poster || ''}" autoplay muted loop playsinline controls></video>${cap(b.caption)}</figure>`,
    embed: b => `<figure class="b-embed"><iframe src="${b.src}" title="${esc(p.title)}" loading="lazy" allow="autoplay"></iframe>
      <figcaption><span>${esc(b.caption || '')}</span>${b.open ? `<a href="${b.src}" target="_blank" rel="noopener">open ↗</a>` : ''}</figcaption></figure>`,
    facts: b => `<section class="b-facts">${b.items.map(([k, v]) => `<div><strong>${esc(k)}</strong><span>${esc(v)}</span></div>`).join('')}</section>`,
    'type-tester': () => `<div class="tt-mount"></div>`,
  };

  const wrap = $('#blocks');
  wrap.innerHTML = p.blocks.length
    ? p.blocks.map(b => (R[b.type] ? R[b.type](b) : '')).join('')
    : '<p class="empty-note">준비 중인 작업이에요.</p>';
  wrap.querySelectorAll('.tt-mount').forEach(m => window.mountTypeTester && window.mountTypeTester(m));
  wrap.querySelectorAll('video').forEach(v => v.addEventListener('error', () => {
    if (!v.poster) return;
    const img = document.createElement('img'); img.src = v.poster; img.alt = p.title; v.replaceWith(img);
  }, { once: true }));

  const visible = list.filter(x => x.blocks.length || x.thumb);
  const vi = Math.max(0, visible.indexOf(p));
  const next = visible[(vi + 1) % visible.length];
  $('#footer').innerHTML = `<span>next</span><a href="work.html?id=${next.id}">${esc(next.title)}</a>`;
  $('#name').addEventListener('click', () => sessionStorage.setItem('back', '1'));
})();

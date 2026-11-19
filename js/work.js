(() => {
  const list = window.PROJECTS;
  const id = new URLSearchParams(location.search).get('id');
  const p = list.find(x => x.id === id) || list[0];
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // 첫 페이지에서 목차가 올라오며 넘어온 경우: 내용만 서서히 등장
  if (sessionStorage.getItem('lifted')) { document.body.classList.add('arrive'); sessionStorage.removeItem('lifted'); }

  window.applyTheme(p.theme);
  initNav({ current: p.id, onIndex: false });

  document.title = `${p.title} — jung seah`;
  $('#title-ko').textContent = p.titleKo || '';
  $('#summary').textContent = p.summary || '';
  $('#summary-ko').textContent = p.summaryKo || '';
  const meta = [['year', p.year], ['category', p.category], ['role', p.role], ['tools', p.tools]].filter(([, v]) => v);
  // 쉼표·가운뎃점으로 나눠 칩으로 보여줌
  const chips = v => String(v).split(/\s*[,·]\s*/).filter(Boolean).map(t => `<span class="chip">${esc(t)}</span>`).join('');
  $('#meta').innerHTML = meta.map(([k, v]) => `<dt>${k}</dt><dd>${chips(v)}</dd>`).join('');

  let no = 0;
  const cap = c => (c ? `<figcaption>${esc(c)}</figcaption>` : '');
  const R = {
    text: b => `<section class="b-text"><span class="b-no">${String(++no).padStart(2, '0')}</span><div>
      <p class="eyebrow"><span class="n">${String(no).padStart(2, '0')}</span><span>${esc(b.eyebrow || b.heading || '')}</span></p>
      ${b.title ? `<h2>${esc(b.title)}</h2>` : ''}
      ${b.body ? `<p class="body">${esc(b.body)}</p>` : ''}</div></section>`,
    cards: b => `<section class="b-cards"${b.items.length === 4 ? ' style="grid-template-columns:repeat(2,1fr)"' : ''}>${b.items.map(c => `<div class="card">
      ${c.label ? `<span class="pill">${esc(c.label)}</span>` : ''}<strong>${esc(c.title)}</strong>${c.body ? `<p>${esc(c.body)}</p>` : ''}</div>`).join('')}</section>`,
    image: b => `<figure class="b-media ${b.size || ''} ${b.wide ? 'wide' : ''}"><img src="${b.src}" alt="${esc(b.caption || p.title)}" loading="lazy" />${cap(b.caption)}</figure>`,
    grid: b => `<div class="b-grid ${b.crop ? 'crop' : ''}" style="--cols:${b.cols || 2}">${b.items.map(i =>
      `<figure class="b-media ${i.contain ? 'contain' : ''}"><img src="${i.src}" alt="${esc(i.caption || '')}" loading="lazy" />${cap(i.caption)}</figure>`).join('')}</div>`,
    stats: b => `<section class="b-stats"${b.items.length === 4 ? ' style="grid-template-columns:repeat(4,1fr)"' : ''}>${b.items.map(i => {
      const n = typeof i.value === 'number' ? i.value : parseFloat(String(i.value).replace(/,/g, ''));
      const bar = i.bar != null ? i.bar : (i.unit === '%' ? Math.min(100, n) : 0);
      return `<div class="stat"><strong>${esc(i.value)}<small>${esc(i.unit || '')}</small></strong>
        ${bar ? `<i class="bar"><b style="width:${bar}%"></b></i>` : '<i class="bar empty"></i>'}
        <span>${esc(i.label)}</span>${i.source ? `<em>${esc(i.source)}</em>` : ''}</div>`;
    }).join('')}</section>`,
    map: b => `<section class="b-map"><div class="plane">
      <span class="ax ax-l">${esc(b.x[0])}</span><span class="ax ax-r">${esc(b.x[1])}</span>
      <span class="ax ax-b">${esc(b.y[0])}</span><span class="ax ax-t">${esc(b.y[1])}</span>
      ${b.dots.map(d => `<span class="dot ${d.me ? 'me' : ''}" style="left:${d.x}%;bottom:${d.y}%"><i></i>${esc(d.label)}</span>`).join('')}
      </div></section>`,
    quote: b => `<section class="b-quote"><p>${esc(b.text)}</p>${b.sub ? `<span>${esc(b.sub)}</span>` : ''}</section>`,
    mosaic: b => `<section class="b-mosaic">${b.items.map(i => `<img src="${i.src}" alt="" loading="lazy" style="grid-column:span ${i.span || 1}" class="${i.tall ? 'tall' : ''}" />`).join('')}</section>`,
    logos: b => `<section class="b-logos">${b.items.map(i => `<figure><div class="logo-box"><img src="${i.src}" alt="${esc(i.label)}" /></div>
      <figcaption><b>${esc(i.label)}</b>${i.note ? `<span>${esc(i.note)}</span>` : ''}</figcaption></figure>`).join('')}</section>`,
    type: b => `<section class="b-type">${b.items.map(i => `<div class="row"><div class="who"><b>${esc(i.role)}</b><span>${esc(i.family)}</span></div>
      <img src="${i.src}" alt="${esc(i.family)}" loading="lazy" /></div>`).join('')}</section>`,
    colors: b => `<section class="b-colors">${b.items.map(i => {
      const h = i.hex.replace('#', ''); const lum = (parseInt(h.slice(0, 2), 16) * .3 + parseInt(h.slice(2, 4), 16) * .59 + parseInt(h.slice(4, 6), 16) * .11);
      return `<div class="chip ${lum < 140 ? 'dark' : ''}" style="background:${i.hex}"><b>${esc(i.name)}</b>
        <span>${esc(i.hex.toUpperCase())}</span>${i.cmyk && i.cmyk !== '-' ? `<span>CMYK ${esc(i.cmyk)}</span>` : ''}<span>RGB ${esc(i.rgb)}</span></div>`;
    }).join('')}</section>`,
    products: b => `<section class="b-products">${b.items.map(i => `<div class="product"><div class="pimg"><img src="${i.src}" alt="${esc(i.name)}" loading="lazy" /></div>
      <span class="pill">${esc(i.name)}</span><p>${esc(i.body)}</p></div>`).join('')}</section>`,
    note: b => `<p class="b-note">${esc(b.text)}</p>`,
    video: b => `<figure class="b-media"><video src="${b.src}" poster="${b.poster || ''}" autoplay muted loop playsinline controls></video>${cap(b.caption)}</figure>`,
    embed: b => `<figure class="b-embed"><iframe src="${b.src}" title="${esc(p.title)}" loading="lazy" allow="autoplay"></iframe>
      <figcaption><span>${esc(b.caption || '')}</span>${b.open ? `<a href="${b.src}">전체 화면으로 보기 ↗</a>` : ''}</figcaption></figure>`,
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

/* ------------------------------------------------------------
   포트폴리오 데이터
   - NAV: 첫 페이지 목차 구조 (2열 → 3열 → 4열)
   - PROJECTS: 프로젝트 하나 = 객체 하나. blocks 배열에 블록을 쌓아요.

   블록 종류
   { type: 'text',  eyebrow, title, body }          정보 섹션 (영문 라벨 + 한글 제목 + 설명)
   { type: 'cards', items: [{ label, title, body }] } 작은 카드 묶음
   { type: 'stats', items: [{ value, unit, label, source }] }  숫자 + 막대
   { type: 'map', x: [왼쪽, 오른쪽], y: [아래, 위], dots: [{ label, x, y, me }] } 포지셔닝 맵 (x, y 는 0~100)
   { type: 'quote', text, sub }                     큰 문장
   { type: 'mosaic', items: [{ src, span }] }       무드보드 콜라주 (span: 1~3)
   { type: 'logos', items: [{ src, label, note }] } 로고 카드
   { type: 'type', items: [{ role, family, src }] } 서체 견본
   { type: 'colors', items: [{ name, hex, cmyk, rgb }] } 컬러칩
   { type: 'products', items: [{ src, name, body }] } 상품 카드

   theme: { paper 바탕, ink 글자, accent 강조, card 카드, dark 어두운 테마 여부 }
          프로젝트 페이지 전체 색과, 첫 페이지에서 마우스를 올렸을 때 바뀌는 바탕색
   { type: 'image', src, caption, size }            이미지 (size: 'full' | 'wide' | 'medium' | 'small')
   { type: 'grid',  cols, items: [{ src, caption }] } 이미지 그리드
   { type: 'video', src, poster, caption }          영상 (mp4)
   { type: 'embed', src, ratio, caption, open }     다른 웹페이지를 iframe으로
   { type: 'type-tester' }                          Rivet 타이핑
   { type: 'facts', items: [[라벨, 값], ...] }      숫자/요약 표
------------------------------------------------------------ */

window.NAV = {
  name: 'jung seah',
  groups: [
    {
      label: 'visual design',
      items: [
        { label: 'motion', id: 'motion' },
        {
          label: 'branding',
          children: [
            { label: 'usual focus', id: 'branding-usual-focus' },
            { label: 'sid exhibition', id: 'branding-sid' },
          ],
        },
        { label: 'poster', id: 'poster' },
        { label: 'editorial', id: 'editorial' },
        { label: 'funding', id: 'funding' },
      ],
    },
    {
      label: 'ux/ui design',
      items: [
        { label: 'piko', id: 'uxui-piko' },
      ],
    },
    {
      label: 'web design',
      items: [
        { label: '악:카이브', id: 'web-akchive' },
        { label: 'bakadashi', id: 'web-bakadashi' },
      ],
    },
  ],
};

window.PROJECTS = [
  /* ---------------- motion ---------------- */
  {
    id: 'motion',
    theme: { paper: '#140f22', ink: '#f3f0ff', accent: '#3df58a', card: '#211a35', dark: true },
    title: 'motion',
    titleKo: '라스트씬 · 괴작용 화제',
    category: 'Motion Graphic',
    year: '2025',
    role: 'Motion, Graphic',
    tools: 'After Effects',
    thumb: 'assets/img/motion-poster.jpg',
    summary: '작업 소개 한두 줄을 여기에 적어주세요.',
    blocks: [
      { type: 'text', eyebrow: 'Motion', title: '작업 한 줄 소개를 여기에 적어주세요',
        body: '영상 파일(assets/video/motion.mp4)을 넣으면 아래에 재생돼요.' },
      { type: 'video', src: 'assets/video/motion.mp4', poster: 'assets/img/motion-poster.jpg' },
    ],
  },

  /* ---------------- branding: Usual Focus ---------------- */
  {
    id: 'branding-usual-focus',
    theme: { paper: '#ebe7df', ink: '#2a2120', accent: '#6f7560', card: '#dfd9cd' },
    title: 'usual focus',
    titleKo: '유주얼 포커스 아이케어',
    category: 'Branding',
    year: '2026',
    role: 'Brand Identity, Logo, Application',
    tools: 'Illustrator, Photoshop',
    thumb: 'assets/img/uf-09.jpg',
    summary:
      '노안을 교정의 대상이 아닌 변화로 바라보는 4050 노안 전문 안경 케어 브랜드. 대비를 낮추고 눈의 피로를 줄여 보다 편안한 시각 경험을 제공합니다.',
    blocks: [
      { type: 'image', src: 'assets/img/uf/app-bag.jpg', wide: true },

      { type: 'text', eyebrow: 'Background', title: '노안은 알지만, 안경은 미뤄요',
        body: '초고령화 사회 속에서 소비력과 경제력을 갖춘 액티브 시니어에 주목하며 시작했다. 시장 조사 결과, 4050세대의 대부분이 노안을 경험하고 있음에도 실제 안경 교정으로 이어지는 비율은 낮았다.' },
      { type: 'stats', items: [
        { value: 21.21, unit: '%', label: '2026년 고령인구 비율, 초고령사회 진입', source: '행정안전부, 2025 주민등록 인구통계' },
        { value: 96, unit: '%', label: '40~55세 한국인의 노안 인지도', source: '아큐브 아시아 중장년 노안 대응 조사' },
        { value: 59, unit: '%', label: '노안 검진 후 시력 교정을 미루는 비율', source: '아큐브 아시아 중장년 노안 대응 조사' },
      ] },

      { type: 'text', eyebrow: 'Pain Point', title: '불편하지만, 교정보다 회피를 선택해요',
        body: '사용자는 일상에서 시력 저하를 불편하게 느끼지만, 노화의 신호처럼 느껴지는 부담과 번거로움 때문에 임시방편에 기댄다.' },
      { type: 'cards', items: [
        { label: '심리', title: '노화 징후라는 심리적 부담감' },
        { label: '행동', title: '안경 착용의 번거로움' },
        { label: '임시방편', title: '글씨 크기 확대 37%', body: '사진 찍어 확대 36% · 팔 뻗어서 보기 33%' },
      ] },

      { type: 'text', eyebrow: 'Market Research', title: '4050을 위한 노안 전문 브랜드는 아직 없어요',
        body: '기존 안경 브랜드는 대부분 제품 중심의 일회성 구매에 머물러 있다. 시야 관리가 가장 필요한 4050세대를 위해, 사용자 경험을 중심으로 지속적인 관리를 돕는 자리가 비어 있었다.' },
      { type: 'map', x: ['일회성 사용', '지속적 관리'], y: ['제품 중심', '사용자 경험 중심'], dots: [
        { label: '브리즘', x: 22, y: 60 }, { label: '마노모스', x: 37, y: 38 },
        { label: 'JINS', x: 25, y: 29 }, { label: '다비치', x: 30, y: 22 },
        { label: 'Usual Focus', x: 72, y: 67, me: true },
      ] },

      { type: 'text', eyebrow: 'Target', title: '노안을 알지만 안경을 미루는 4050, 조기 노안을 겪는 2030' },

      { type: 'text', eyebrow: 'Naming & Slogan', title: '일상에 초점을 맞추다, 유주얼 포커스' },
      { type: 'quote', text: '필요할 때, 자연스럽게 보는 방법', sub: '우리는 항상 가까운 일상 속에서 시야를 관리한다. 우리는 절대 불편함이나 선택을 미루게 하지 않는다. 우리는 필요를 느낀 순간에만 개입한다.' },

      { type: 'text', eyebrow: 'Moodboard & Core Value', title: '기술의 정밀함과 일상의 편안함이 함께해요',
        body: '나무의 묵직한 하중과 나이테의 균일한 간격을 모티프로, 저채도와 저대비의 따뜻한 컬러를 중심으로 무드를 구축했다.' },
      { type: 'mosaic', items: [
        { src: 'assets/img/uf/mood-4.jpg', span: 1, tall: true }, { src: 'assets/img/uf/mood-3.jpg', span: 2 },
        { src: 'assets/img/uf/mood-7.jpg', span: 2 }, { src: 'assets/img/uf/mood-2.jpg', span: 1, tall: true },
        { src: 'assets/img/uf/mood-6.jpg', span: 2 }, { src: 'assets/img/uf/mood-5.jpg', span: 1 }, { src: 'assets/img/uf/mood-1.jpg', span: 1 },
      ] },
      { type: 'cards', items: [
        { label: 'Precision', title: '전문성', body: '전문적인 검안 과정과 개인 맞춤형 상담' },
        { label: 'Accessibility', title: '접근성', body: '필요를 느낀 순간에 자연스럽게' },
        { label: 'Continuity', title: '지속성', body: '한 번의 구매가 아닌 꾸준한 시야 관리' },
      ] },

      { type: 'text', eyebrow: 'Logo', title: '매체의 비율에 따라 워드마크를 골라 써요',
        body: '가로형과 정방형 워드마크, 그리고 심볼형 로고. 심볼형은 각인, 안경테처럼 아주 작은 공간에만 사용한다.' },
      { type: 'logos', items: [
        { src: 'assets/img/uf/logo-horizontal.svg', label: '가로형 워드마크', note: '최소 3mm / 16px' },
        { src: 'assets/img/uf/logo-square.svg', label: '정방형 워드마크', note: '최소 2mm / 60px' },
        { src: 'assets/img/uf/logo-symbol.svg', label: '심볼형 로고', note: '각인 · 안경테' },
      ] },

      { type: 'text', eyebrow: 'Typography', title: '세 가지 서체가 역할을 나눠 맡아요' },
      { type: 'type', items: [
        { role: 'Title (EN)', family: 'EB Garamond', src: 'assets/img/uf/type-garamond.png' },
        { role: 'Title (KR)', family: 'SD Petra', src: 'assets/img/uf/type-petra.png' },
        { role: 'Sub (EN)', family: '전용서체 Usual', src: 'assets/img/uf/type-usual.png' },
      ] },

      { type: 'text', eyebrow: 'Color', title: '대비를 낮춘 따뜻한 여섯 가지 색' },
      { type: 'colors', items: [
        { name: 'Neutral White', hex: '#F1F3F1', cmyk: '7/5/6/0', rgb: '241/243/241' },
        { name: 'Warm Ivory', hex: '#E8E4DD', cmyk: '11/10/13/0', rgb: '221/218/210' },
        { name: 'Usual Cream', hex: '#C5BBA6', cmyk: '27/25/35/0', rgb: '198/189/166' },
        { name: 'Usual Bright Green', hex: '#838875', cmyk: '56/43/55/0', rgb: '132/137/117' },
        { name: 'Usual Dark Green', hex: '#383D38', cmyk: '78/69/73/39', rgb: '50/54/50' },
        { name: 'Usual Brown', hex: '#323632', cmyk: '78/79/78/59', rgb: '42/34/32' },
      ] },

      { type: 'text', eyebrow: 'Application', title: '명함부터 가운까지, 일상 가까이에 놓여요',
        body: '브랜드 인지가 중심인 매체에는 로고를 크게, 정보 전달이 중심인 매체에는 로고를 작게 쓴다.' },
      { type: 'grid', cols: 2, crop: true, items: [
        { src: 'assets/img/uf/app-card.jpg', caption: '명함' },
        { src: 'assets/img/uf/app-letter.jpg', caption: '레터헤드' },
        { src: 'assets/img/uf/app-coat.jpg', caption: '검안사 가운' },
        { src: 'assets/img/uf/app-case.jpg', caption: '안경 · 케이스 각인' },
      ] },
      { type: 'note', text: '모델·의류·안경 케이스 이미지는 AI로 생성했습니다.' },
    ],
  },

  /* ---------------- branding: SID ---------------- */
  {
    id: 'branding-sid',
    theme: { paper: '#f5f3fb', ink: '#2b2840', accent: '#7a6ad8', card: '#e9e5f6' },
    title: 'sid exhibition',
    titleKo: '차곡차곡 담다 : 소중한 순간 하나하나를',
    category: 'Branding, Exhibition',
    year: '2026',
    role: 'Exhibition Identity, Poster, Banner',
    tools: 'Illustrator, Photoshop',
    thumb: 'assets/img/sid-poster.jpg',
    summary: '2025년 아트클래스 ‘힐링’, ‘추억’을 주제로 한 SID 2026년 정기전시회 아이덴티티.',
    blocks: [
      { type: 'text', eyebrow: 'Concept', title: '차곡차곡 쌓여가는 시간을 함께 나눠요',
        body: '따뜻한 파스텔톤과 테트리스를 모티브로 쌓여가는 시간을 관람객과 함께 나누고자 했습니다. SID는 갤러리 허브에서 관람객과 참여자가 자연스럽게 만나는 새로운 예술 접근 경험을 설계했습니다.' },
      { type: 'image', src: 'assets/img/sid-poster.jpg', caption: '포스터 — 2026. 02. 04 – 02. 10' },
      { type: 'text', eyebrow: 'Space', title: '입구 현수막부터 관람객이 남긴 한 장까지',
        body: '포스터의 레터링과 컬러를 입구 현수막, 배너로 확장하고, 관람객이 소중한 순간을 적어 붙이는 참여 벽을 만들었습니다.' },
      { type: 'grid', cols: 2, items: [
        { src: 'assets/img/sid-photo-2.jpg', caption: '입구 현수막' },
        { src: 'assets/img/sid-photo-1.jpg', caption: '관람객 참여 벽' },
      ] },
    ],
  },

  /* ---------------- poster ---------------- */
  {
    id: 'poster',
    theme: { paper: '#f1f6ec', ink: '#1c2a1a', accent: '#1f7fd1', card: '#e2ebd8' },
    title: 'poster',
    titleKo: 'Peace is crafted from the pieces of little peas',
    category: 'Poster',
    year: '2025',
    role: 'Graphic',
    tools: 'Illustrator, Photoshop',
    thumb: 'assets/img/poster.jpg',
    summary: '작은 완두콩 조각들로 빚어지는 평화.',
    blocks: [
      { type: 'text', eyebrow: 'Poster', title: '작은 완두콩 조각들이 모여 평화를 빚어요',
        body: 'Peace is crafted from the pieces of little peas. 하나하나의 작은 조각이 모여 그릇을 채우는 모습으로, 평화가 거창한 것이 아니라 작은 것들이 쌓여 만들어진다는 이야기를 담았습니다.' },
      { type: 'image', src: 'assets/img/poster.jpg' },
    ],
  },

  /* ---------------- editorial (Rivet) ---------------- */
  {
    id: 'editorial',
    theme: { paper: '#141414', ink: '#f0f0f0', accent: '#f0f0f0', card: '#202020', dark: true },
    title: 'editorial',
    titleKo: 'Rivet — 서체 리플렛',
    category: 'Editorial, Type Design',
    year: '2025',
    role: 'Type Design, Leaflet',
    tools: 'Glyphs, Illustrator',
    thumb: 'assets/img/editorial-1.jpg',
    summary:
      'Rivet is a modern, geometric font that exudes a solid, industrial feel reminiscent of the Industrial Revolution. Its low x-height and grotesque design make it a unique choice for impactful and timeless.',
    summaryKo:
      '리벳은 산업혁명을 떠올리게 하는 단단하고 공업적인 느낌의 모던한 기하학 서체입니다. 낮은 엑스하이트와 그로테스크한 형태 덕분에, 강렬하면서도 시대를 타지 않는 인상을 남깁니다.',
    blocks: [
      { type: 'text', eyebrow: 'Type Tester', title: '글자를 눌러 직접 입력해 보세요',
        body: '낮은 x-height와 그로테스크한 형태의 라틴 서체입니다. 오른쪽 슬라이더로 크기를 바꿀 수 있어요.' },
      { type: 'type-tester' },
      { type: 'text', eyebrow: 'Leaflet', title: '서체를 소개하는 A3 리플렛',
        body: '사이즈 단계와 문단 견본, 뒤집힌 글리프 표로 서체의 성격을 보여주는 앞면과, 서체를 이루는 키워드를 선으로 이은 뒷면.' },
      {
        type: 'grid',
        cols: 2,
        items: [
          { src: 'assets/img/editorial-1.jpg', caption: '앞면' },
          { src: 'assets/img/editorial-2.jpg', caption: '뒷면' },
        ],
      },
    ],
  },

  /* ---------------- funding ---------------- */
  {
    id: 'funding',
    theme: { paper: '#f5eee2', ink: '#3d3532', accent: '#5b86c9', card: '#ebe0cd' },
    title: 'funding',
    titleKo: 'KKOMO Retto 꼬모레토 — 함께 꺼내본 추억',
    category: 'Funding, Product Design, Communication',
    year: '2026',
    role: '회장 · 프로젝트 총괄, 기획 및 촬영 80%',
    tools: 'Illustrator, Photoshop, Notion',
    thumb: 'assets/img/funding-1.jpg',
    summary:
      '‘기억’을 주제로 한 네 차례의 아트클래스 결과물에서 그래픽 요소를 도출해 펀딩 상품으로 발전시키고, 작가님들의 작품 전시로 연결했습니다.',
    blocks: [
      { type: 'grid', cols: 2, items: [
        { src: 'assets/img/fd/hero.jpg' },
        { src: 'assets/img/fd/logo.png', contain: true, caption: 'Main logo' },
      ] },

      { type: 'text', eyebrow: 'Overview', title: '아트클래스의 ‘기억’을 펀딩 상품으로 꺼냈어요',
        body: '‘기억’을 주제로 한 네 차례의 아트클래스 결과물에서 그래픽 요소를 도출해 펀딩 상품으로 발전시키고, 작가님들의 작품 전시로 연결했습니다.' },
      { type: 'stats', items: [
        { value: 400, unit: '%', label: '펀딩 목표액 달성', bar: 100 },
        { value: '200만', unit: '원', label: '모금액 (2,002,000원)', bar: 100 },
        { value: 10, unit: '명', label: '디자인 · 대외활동 · 아트클래스팀', bar: 0 },
        { value: 6, unit: '개월', label: '프로젝트 기간', bar: 0 },
      ] },

      { type: 'text', eyebrow: 'Product Design', title: '작가님들의 그림을 일상에서 쓰는 물건으로' },
      { type: 'products', items: [
        { src: 'assets/img/fd/p-keyring.png', name: '아크릴 키링', body: '아트클래스에서 탄생한 작가님들의 그림을 아크릴 키링에 담았습니다. 가방이나 열쇠에 달아 작품을 일상 가까이에서 만나보세요.' },
        { src: 'assets/img/fd/p-cap.png', name: '볼캡', body: '작가님의 드로잉을 자수로 새긴 볼캡입니다. 그림의 개성을 살린 포인트로 일상에서도 작품을 함께할 수 있습니다.' },
        { src: 'assets/img/fd/p-bag-ivory.png', name: '스트링백', body: '작가님들의 그림과 색을 담아 완성한 스트링백입니다. 외출할 때 소지품을 챙기며 작품과 추억을 가까이에서 만나보세요.' },
      ] },

      { type: 'text', eyebrow: 'Photo', title: '레트로 하이틴 무드로 직접 기획하고 촬영했어요',
        body: '누끼컷, 연출컷, 모델컷으로 나눠 촬영 콘셉트와 장소를 정하고, 브라운과 블루가 잘 어울리는 대비 강한 의상으로 상품의 색을 살렸습니다. (기획 및 촬영 80%)' },
      { type: 'grid', cols: 2, items: [
        { src: 'assets/img/fd/shot-1.jpg' },
        { src: 'assets/img/fd/shot-2.jpg' },
      ] },

      { type: 'text', eyebrow: 'Communication', title: '편지 봉투처럼 꺼내 보는 홍보물',
        body: '발달장애인과 함께 마음 속 작은 추억을 꺼내보는 시간. 오려 붙인 레터링과 우표, 편지지로 ‘꺼내본 추억’을 표현했습니다.' },
      { type: 'image', src: 'assets/img/fd/promo.png', size: 'small' },

      { type: 'text', eyebrow: 'My Role', title: '회장으로서 10명의 팀과 6개월을 이끌었어요' },
      { type: 'cards', items: [
        { label: '콘셉트', title: '콘셉트 방향 설정', body: '‘기억’을 ‘함께 꺼내본 추억, 꼬모레토’로 구체화하고 상품과 홍보물의 디자인 방향을 잡았습니다.' },
        { label: '피드백', title: '팀원 피드백', body: '비전공자도 작업 방향을 이해하도록 구체적인 피드백을 제공해 팀 결과물의 완성도를 높였습니다.' },
        { label: '총괄', title: '프로젝트 총괄', body: '디자인·대외활동·아트클래스팀 10명의 역할과 6개월 일정을 조율했습니다.' },
        { label: '협업', title: '공용 노션 페이지 제작', body: '일정·담당 업무·진행 상황을 한곳에서 공유하도록 구성했습니다.' },
      ] },
    ],
  },

  /* ---------------- ux/ui: Piko ---------------- */
  {
    id: 'uxui-piko',
    theme: { paper: '#0f110f', ink: '#f5f5f5', accent: '#bbff46', card: '#1c1f1c', dark: true },
    title: 'piko',
    titleKo: 'Piko — 개인 맞춤 OTT 탐색 서비스',
    category: 'UX/UI Design, Branding',
    year: '2026',
    role: 'UX 리서치, UI 디자인, 브랜딩',
    tools: 'Figma',
    thumb: 'assets/img/pk/thumb.jpg',
    summary: 'Piko는 주 3회 이상 OTT를 소비하는 사용자가 콘텐츠 탐색에 쓰는 시간을 줄이고, 자신의 취향에 맞는 작품을 쉽게 발견할 수 있도록 돕는 개인 맞춤형 OTT 탐색 서비스입니다.',
    blocks: [
      { type: 'image', src: 'assets/img/pk/hero.jpg', wide: true },

      { type: 'text', eyebrow: 'Background', title: 'OTT를 켜고 나서, 정작 무엇을 볼지 못 정해요',
        body: '20~30분 동안 화면만 넘기다 결국 아무것도 보지 못한 경험. 시청하는 시간보다 무엇을 볼지 고르는 데 더 많은 시간을 쓰다 피로감에 시청을 포기하는 ‘넷플릭스 증후군’에서 출발했습니다.' },
      { type: 'stats', items: [
        { value: '18,214', unit: '개', label: '2023년 기준 넷플릭스 제공 콘텐츠 수', source: '디지털 포용 뉴스, 2025' },
        { value: '3', unit: '사', label: '넷플릭스 · 웨이브 · 유튜브 모두 협업 필터링 기반 추천 사용', bar: 0 },
      ] },

      { type: 'text', eyebrow: 'Problem', title: '콘텐츠는 늘었지만, 고르는 피로도 함께 늘었어요',
        body: '사용자는 과잉 공급된 선택지 속에서 오히려 피로를 느끼고 있어요. 기존 추천 시스템은 지금의 상황과 감정까지는 반영하지 못합니다.' },
      { type: 'cards', items: [
        { label: '01', title: '과잉 공급', body: '끝없이 늘어나는 콘텐츠와 선택지' },
        { label: '02', title: '선택 피로 증가', body: '고르다 지쳐 결국 시청을 포기' },
        { label: '03', title: '알고리즘 중심의 반복 소비', body: '비슷한 작품만 계속 추천받는 구조' },
      ] },

      { type: 'text', eyebrow: 'Research', title: '설문 37명, 심층 인터뷰 6명에게 물었어요',
        body: '1주일에 3회 이상 OTT를 이용하며 콘텐츠 선택 과정에서 고민과 지연을 경험하는 20·30대를 대상으로 설문(2026. 3. 23–26)과 심층 인터뷰(2026. 3. 30–4. 2)를 진행했습니다.' },
      { type: 'cards', items: [
        { label: 'Insight 1', title: '콘텐츠 선택은 상황에 따라 달라져요', body: '시간, 일정, 감정 상태, 여유 정도에 따라 다른 콘텐츠를 소비합니다. 밥 먹을 땐 가벼운 콘텐츠, 우울할 땐 슬픈 영화처럼요.' },
        { label: 'Insight 2', title: '익숙한 단서로 작품을 골라요', body: '콘텐츠가 많을수록 새로운 작품을 탐색하기보다 익숙한 배우, 감독, 장르를 기준으로 안전한 선택을 합니다.' },
        { label: 'Insight 3', title: '정보보다 분위기를 먼저 소비해요', body: '제목이나 장르보다 스틸컷, 포스터, 미장센 같은 감각적 요소에 먼저 반응합니다.' },
      ] },

      { type: 'text', eyebrow: 'Persona', title: '“내 소중한 시간을 빠르고 재밌게 쓰고 싶은데, 뭘 봐야 할지 모르겠어요”',
        body: '김탐색, 21세. 자취 3개월 차 대학생. 중간고사가 끝난 주말, 치킨과 맥주를 앞에 두고 추천 목록만 넘기다 결국 아무것도 고르지 못했습니다. 취향은 지키면서도 빠르고 만족스러운 선택을 원합니다.' },
      { type: 'cards', items: [
        { label: 'Pain Point', title: '선택 기준이 없어 고르는 데 오래 걸려요', body: '추천 알고리즘이 어떤 기준인지 몰라 믿기 어렵고, 기록하지 않아 예전에 본 작품도 잘 떠오르지 않아요.' },
        { label: 'Need', title: '상황에 맞는 작품을 빠르게 고르고 싶어요', body: '재밌게 본 건 쉽게 기록하고, 내 취향과 이어진 새 작품을 부담 없이 시도해보고 싶어요.' },
      ] },

      { type: 'text', eyebrow: 'Journey Map', title: '탐색에서 기록까지, 감정이 가장 떨어지는 순간을 찾았어요',
        body: '탐색·검색 → 비교·분석 → 인지·흥미 → 감상 → 기록·리뷰 남기기. 비교하고 고르는 구간에서 감정이 가장 낮았고, 이 지점에 Piko의 해결책을 두었습니다.' },
      { type: 'image', src: 'assets/img/pk/journey.jpg' },

      { type: 'text', eyebrow: 'Solution', title: '인사이트 세 가지가 핵심 기능 세 가지로' },
      { type: 'cards', items: [
        { label: '상황', title: '캘린더 연동 맞춤 추천', body: '사용자의 일정을 바탕으로 지금 바로 볼 수 있는 콘텐츠를 제안하고, 시청 일정을 관리합니다.' },
        { label: '단서', title: 'AI 추천', body: '이 작품이 왜 내 취향에 맞는지 구체적인 근거를 보여주며 선택을 돕습니다.' },
        { label: '분위기', title: '스틸컷 · 명대사 기반 탐색', body: '스틸컷과 명대사로 작품의 분위기를 직관적으로 파악하고 흥미를 끌어냅니다.' },
      ] },

      { type: 'text', eyebrow: 'Priority & IA', title: '기능의 우선순위를 정하고, 구조를 짰어요',
        body: '감각–근거, 축적–즉각 두 축으로 기능의 위치를 잡아 우선순위를 정하고, 홈 · 탐색 · AI · 리뷰 보관함 · 마이페이지로 이어지는 정보 구조를 설계했습니다.' },
      { type: 'grid', cols: 2, items: [
        { src: 'assets/img/pk/priority.jpg', caption: '기능 우선순위' },
        { src: 'assets/img/pk/ia.jpg', caption: 'IA' },
      ] },
      { type: 'image', src: 'assets/img/pk/wire.jpg', caption: '와이어프레임' },

      { type: 'text', eyebrow: 'Branding', title: 'Piko = Pick(고르다) + -o',
        body: '‘고르다’에 접미사 -o를 더해, 취향이 완성되는 경험이라는 의미를 담았습니다. 고르는 순간을 가리키는 화살표 심볼과 선명한 라임 그린으로 가볍고 경쾌한 인상을 만들었습니다.' },
      { type: 'image', src: 'assets/img/pk/brand.jpg', size: 'small' },
      { type: 'colors', items: [
        { name: 'Main Color', hex: '#BBFF46', cmyk: '-', rgb: '187/255/70' },
        { name: 'Gray 900', hex: '#0F110F', cmyk: '-', rgb: '15/17/15' },
        { name: 'Gray 800', hex: '#1A1A1A', cmyk: '-', rgb: '26/26/26' },
        { name: 'Gray 700', hex: '#262626', cmyk: '-', rgb: '38/38/38' },
        { name: 'Gray 500', hex: '#585858', cmyk: '-', rgb: '88/88/88' },
        { name: 'Gray 100', hex: '#F5F5F5', cmyk: '-', rgb: '245/245/245' },
      ] },
      { type: 'cards', items: [
        { label: 'Typography', title: 'Geom', body: '로고와 영문 헤드라인' },
        { label: 'Typography', title: 'Poppins', body: '영문 본문과 UI 텍스트, 한글 함께 사용' },
      ] },

      { type: 'text', eyebrow: 'Feature 01 · 캘린더 연동 추천', title: '내 캘린더에 맞춰, 지금 볼 수 있는 작품을 추천해요',
        body: '사이드탭에서 오늘 일정과 알림을 한눈에 보고, 남은 시간에 맞는 작품을 추천받아요. 찜하기 대신 ‘예약하기’로 원하는 날짜와 시간에 알림을 받을 수 있어요.' },
      { type: 'image', src: 'assets/img/pk/calendar.jpg' },
      { type: 'image', src: 'assets/img/pk/reserve.jpg' },

      { type: 'text', eyebrow: 'Feature 02 · AI 추천', title: '고민될 때는 AI에게 물어보세요',
        body: '대화와 기록을 바탕으로 취향을 분석해 딱 맞는 작품을 추천하고, 왜 추천했는지 이유를 함께 알려줘요. 대화할수록 내 취향을 더 잘 이해합니다.' },
      { type: 'image', src: 'assets/img/pk/ai.jpg' },

      { type: 'text', eyebrow: 'Feature 03 · 스틸컷 탐색', title: '오늘의 분위기, 색으로 골라보세요',
        body: '스틸컷에서 뽑아낸 컬러를 기준으로 비슷한 무드의 작품을 탐색할 수 있어요.' },
      { type: 'image', src: 'assets/img/pk/still.jpg' },

      { type: 'text', eyebrow: 'Feature 04 · 명대사 탐색', title: '기억에 남는 한 문장으로 시작해보세요',
        body: '명대사와 감정 키워드를 연결해, 지금의 감정에 어울리는 작품을 찾아드려요.' },
      { type: 'image', src: 'assets/img/pk/quote.jpg' },

      { type: 'text', eyebrow: 'More Screens', title: '기록하고, 다듬고, 다시 꺼내 봐요',
        body: '리뷰를 기록하는 아카이빙 페이지, 내 알고리즘을 직접 다듬는 마이페이지, 시청 화면과 상세 화면.' },
      { type: 'image', src: 'assets/img/pk/archive.jpg', caption: '아카이빙 페이지' },
      { type: 'grid', cols: 2, items: [
        { src: 'assets/img/pk/mypage.jpg', caption: '마이페이지' },
        { src: 'assets/img/pk/detail.jpg', caption: '시청 · 상세 화면' },
      ] },
      { type: 'quote', text: '고르는 시간은 줄이고, 고른 작품은 더 좋아지도록', sub: '시청 일정을 관리하는 캘린더 연동, AI와 대화하며 취향에 맞는 작품을 추천받는 인터랙티브 탐색, 스틸컷과 명대사 기반의 감각적 큐레이션.' },
    ],
  },

  /* ---------------- web: 악:카이브 ---------------- */
  {
    id: 'web-akchive',
    theme: { paper: '#100d0b', ink: '#ebe3d6', accent: '#c8a96a', card: '#1d1915', dark: true },
    title: '악:카이브',
    titleKo: 'Ak:chive — 아카이브 북',
    category: 'Web Design, Interactive',
    year: '2025',
    role: 'Concept, Web Design, Development',
    tools: 'HTML, CSS, JavaScript (turn.js)',
    thumb: 'assets/img/akchive-thumb.jpg',
    summary:
      '“우리는 모두 악마의 아이다.” 《악 : 카이브》는 악마가 된 노예를 조사하고 수집해 그들의 면천을 도모한다. 사전은 악마를 심판하지 않는다. 악을 규명하는 것으로써 질문한다.',
    blocks: [
      { type: 'text', eyebrow: 'Concept', title: '악마의 아이는 과연 악마인가요?',
        body: '이곳에 새겨지는 이름은 괴물의 것이 아니다. 악마라고 불리는 개체의 단면을 잘라 붙인 이름이다. 사전의 자료는 객관을 서술하며, 악은 어디서 시작되고 누구에게서 태어나는지 묻는다.' },
      { type: 'embed', src: 'archive/ak-chive/index.html', ratio: '16 / 10', open: true, caption: '책을 클릭해서 넘겨보세요. 소리가 있어요.' },
    ],
  },

  /* ---------------- web: bakadashi ---------------- */
  {
    id: 'web-bakadashi',
    theme: { paper: '#ffffff', ink: '#111111', accent: '#e0311c', card: '#f4f4f2' },
    title: 'bakadashi',
    titleKo: '작업 아카이브 웹사이트',
    category: 'Web Design',
    year: '2025',
    role: 'Web Design',
    tools: 'Visual Studio',
    thumb: 'assets/img/web-bakadashi.jpg',
    summary: '작업을 제목·카테고리·분야·툴·기간으로 정리한 아카이브 웹사이트.',
    blocks: [
      { type: 'text', eyebrow: 'Web Archive', title: '작업을 표 한 장으로 훑어보는 아카이브',
        body: '제목, 카테고리, 분야, 툴, 제작 기간을 한 줄씩 정리하고, 행을 누르면 작업 이미지와 설명이 열리도록 만든 개인 아카이브 웹사이트입니다.' },
      { type: 'video', src: 'assets/video/bakadashi.mp4', poster: 'assets/img/web-bakadashi.jpg' },
    ],
  },
];

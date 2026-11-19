/* ------------------------------------------------------------
   포트폴리오 데이터
   - NAV: 첫 페이지 목차 구조 (2열 → 3열 → 4열)
   - PROJECTS: 프로젝트 하나 = 객체 하나. blocks 배열에 블록을 쌓아요.

   블록 종류
   { type: 'text',  heading, body }                 글
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
        { label: 'typographic', id: 'typographic' },
        { label: 'funding', id: 'funding' },
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
    title: 'motion',
    titleKo: '라스트씬 · 괴작용 화제',
    category: 'Motion Graphic',
    year: '2025',
    role: 'Motion, Graphic',
    tools: 'After Effects',
    thumb: 'assets/img/motion-poster.jpg',
    summary: '작업 소개 한두 줄을 여기에 적어주세요.',
    blocks: [
      { type: 'video', src: 'assets/video/motion.mp4', poster: 'assets/img/motion-poster.jpg', narrow: true },
    ],
  },

  /* ---------------- branding: Usual Focus ---------------- */
  {
    id: 'branding-usual-focus',
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
      {
        type: 'text',
        heading: '01 배경',
        body:
          '초고령화 사회 속에서 소비력과 경제력을 갖춘 액티브 시니어에 주목하며 시작했다. 시장 조사 결과, 4050세대의 대부분이 노안을 경험하고 있음에도 실제 안경 교정으로 이어지는 비율은 낮았다.',
      },
      { type: 'image', src: 'assets/img/uf-02.jpg', size: 'full' },
      {
        type: 'facts',
        items: [
          ['21.21%', '2026년 고령인구 비율 — 초고령사회 진입'],
          ['96%', '40~55세 한국인의 노안 인지도'],
          ['59%', '노안 검진 후 시력 교정을 미루는 비율'],
        ],
      },
      {
        type: 'text',
        heading: '06 무드보드 & 핵심가치',
        body:
          '기술의 정밀함과 일상의 편안함이 공존하는 브랜드를 지향한다. 전문성, 접근성, 지속성을 핵심가치로 설정하고, 나무의 묵직한 하중과 나이테의 균일한 간격을 모티프로 저채도와 저대비의 따뜻한 컬러를 중심으로 무드를 구축했다.',
      },
      { type: 'image', src: 'assets/img/uf-07.jpg', size: 'full' },
      { type: 'text', heading: '07 로고', body: '가로형·정방형 워드마크와 심볼형 로고. 매체의 가로세로 비율에 따라 워드마크를 선택하고, 심볼형은 각인·안경테 등 국소형 공간에만 사용한다.' },
      { type: 'image', src: 'assets/img/uf-09.jpg', size: 'full' },
      { type: 'text', heading: '09 타이포그라피 & 컬러 시스템', body: 'EB Garamond, SD Petra, 전용서체 Usual. Neutral White부터 Usual Brown까지 저채도의 6가지 컬러.' },
      { type: 'image', src: 'assets/img/uf-14.jpg', size: 'full' },
      { type: 'text', heading: '15 어플리케이션', body: '명함, 레터헤드, 처방전, 시력 측정 검사표, 패키지, 쇼핑백.' },
      { type: 'image', src: 'assets/img/uf-28.jpg', size: 'full', caption: 'AI로 생성된 모델 이미지입니다.' },
    ],
  },

  /* ---------------- branding: SID ---------------- */
  {
    id: 'branding-sid',
    title: 'sid exhibition',
    titleKo: '차곡차곡 담다 : 소중한 순간 하나하나를',
    category: 'Branding, Exhibition',
    year: '2026',
    role: 'Exhibition Identity, Poster, Banner',
    tools: 'Illustrator, Photoshop',
    thumb: 'assets/img/sid-poster.jpg',
    summary:
      '이번 전시는 2025년 진행한 상반기, 하반기 아트클래스 ‘힐링’, ‘추억’을 주제로 진행되며, 따뜻한 파스텔톤과 테트리스를 모티브로 쌓여가는 시간을 관람객과 함께 나누고자 합니다. SID는 갤러리 허브에서 관람객과 참여자가 자연스럽게 만나는 새로운 예술 접근 경험을 설계할 것입니다.',
    blocks: [
      { type: 'image', src: 'assets/img/sid-poster.jpg', size: 'medium', caption: 'SID 2026년 정기전시회 포스터, 02.04 – 02.10' },
      {
        type: 'grid',
        cols: 2,
        items: [
          { src: 'assets/img/sid-photo-2.jpg', caption: '입구 현수막' },
          { src: 'assets/img/sid-photo-1.jpg', caption: '관람객 참여 벽' },
        ],
      },
    ],
  },

  /* ---------------- poster ---------------- */
  {
    id: 'poster',
    title: 'poster',
    titleKo: 'Peace is crafted from the pieces of little peas',
    category: 'Poster',
    year: '2025',
    role: 'Graphic',
    tools: 'Illustrator, Photoshop',
    thumb: 'assets/img/poster.jpg',
    summary: '작은 완두콩 조각들로 빚어지는 평화.',
    blocks: [{ type: 'image', src: 'assets/img/poster.jpg', size: 'medium' }],
  },

  /* ---------------- editorial (Rivet) ---------------- */
  {
    id: 'editorial',
    title: 'editorial',
    titleKo: 'Rivet — 서체 리플렛',
    category: 'Editorial, Type Design',
    year: '2025',
    role: 'Type Design, Leaflet',
    tools: 'Glyphs, Illustrator',
    thumb: 'assets/img/editorial-1.jpg',
    summary:
      'Rivet is a modern, geometric font that exudes a solid, industrial feel reminiscent of the Industrial Revolution. Its low x-height and grotesque design make it a unique choice for impactful and timeless.',
    blocks: [
      { type: 'type-tester' },
      {
        type: 'grid',
        cols: 2,
        items: [
          { src: 'assets/img/editorial-1.jpg', caption: '서체 리플렛 A3 — 앞면' },
          { src: 'assets/img/editorial-2.jpg', caption: '서체 리플렛 A3 — 뒷면' },
        ],
      },
    ],
  },

  /* ---------------- typographic ---------------- */
  {
    id: 'typographic',
    title: 'typographic',
    titleKo: '',
    category: 'Typography',
    year: '',
    role: '',
    tools: '',
    thumb: '',
    summary: '이 자리에 들어갈 작업을 추가해 주세요.',
    blocks: [],
  },

  /* ---------------- funding ---------------- */
  {
    id: 'funding',
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
      { type: 'image', src: 'assets/img/funding-1.jpg', size: 'full' },
      {
        type: 'text',
        heading: 'My Role & Contributions',
        body:
          '회장으로서 10명의 팀원과 6개월간 프로젝트를 이끌었습니다. ‘함께 꺼내본 추억, 꼬모레토’라는 콘셉트를 세우고 디자인 방향과 전체 일정을 조율했습니다. 비전공자도 작업 방향을 이해하도록 구체적인 피드백을 제공하고, 일정·담당 업무·진행 상황을 한곳에서 공유하는 공용 노션 페이지를 구성했습니다.',
      },
      { type: 'facts', items: [['400%', '텀블벅 펀딩 목표액 달성'], ['₩2,002,000', '모금액'], ['10명 · 6개월', '팀 규모와 기간']] },
      { type: 'image', src: 'assets/img/funding-2.jpg', size: 'full' },
    ],
  },

  /* ---------------- web: 악:카이브 ---------------- */
  {
    id: 'web-akchive',
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
      { type: 'embed', src: 'archive/ak-chive/index.html', ratio: '16 / 10', open: true, caption: '책을 클릭해서 넘겨보세요. 소리가 있어요.' },
    ],
  },

  /* ---------------- web: bakadashi ---------------- */
  {
    id: 'web-bakadashi',
    title: 'bakadashi',
    titleKo: '작업 아카이브 웹사이트',
    category: 'Web Design',
    year: '2025',
    role: 'Web Design',
    tools: 'Visual Studio',
    thumb: 'assets/img/web-bakadashi.jpg',
    summary: '작업을 제목·카테고리·분야·툴·기간으로 정리한 아카이브 웹사이트.',
    blocks: [{ type: 'video', src: 'assets/video/bakadashi.mp4', poster: 'assets/img/web-bakadashi.jpg', narrow: true }],
  },
];

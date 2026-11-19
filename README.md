# jung seah — portfolio

빌드 과정 없는 순수 HTML/CSS/JS 사이트예요. GitHub Pages에 그대로 올리면 돼요.

```
portfolio/
├─ index.html            첫 페이지 (목차)
├─ work.html             프로젝트 페이지 (work.html?id=프로젝트id)
├─ js/data.js            ★ 목차 구조 + 프로젝트 내용 (대부분 여기만 고치면 돼요)
├─ js/index.js           목차 호버 / 미리보기 / 페이지 전환
├─ js/work.js            프로젝트 페이지 블록 렌더
├─ js/type-tester.js     Rivet 타이핑
├─ css/style.css
├─ assets/img/           작업 이미지
├─ assets/video/         motion.mp4 를 여기에 넣어주세요
├─ assets/fonts/         Rivet-Regular (woff2 + otf)
└─ archive/ak-chive/     악:카이브 플립북 (원본 코드 그대로)
```

## 로컬에서 보기

`archive` 안의 iframe 때문에 파일을 더블클릭하지 말고 로컬 서버로 여세요.

```bash
cd ~/Desktop/portfolio
python3 -m http.server 8000
# → http://localhost:8000
```

## 프로젝트 추가 / 수정

`js/data.js`의 `PROJECTS`에 객체를 하나 추가하고, `NAV`에 `{ label, id }`를 넣으면 목차에 나타나요.

블록 종류: `text`, `image`, `grid`, `video`, `embed`, `type-tester`, `facts` (data.js 맨 위 설명 참고)

## GitHub Pages 배포

```bash
cd ~/Desktop/portfolio
git init
git add .
git commit -m "portfolio first version"
git branch -M main
git remote add origin https://github.com/<아이디>/portfolio.git
git push -u origin main
```

GitHub 저장소 → Settings → Pages → Branch: `main` / `(root)` → Save
몇 분 뒤 `https://<아이디>.github.io/portfolio/` 에서 열려요.

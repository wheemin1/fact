# Fact Flash Cards Mobile

재미있는 사실들을 학습할 수 있는 모바일 친화적인 플래시 카드 앱입니다.

## 🚀 배포하기

### Netlify에 배포

1. [Netlify](https://netlify.com)에 로그인
2. "New site from Git" 클릭
3. GitHub 리포지토리 연결
4. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy 클릭

### Vercel에 배포

1. [Vercel](https://vercel.com)에 로그인
2. "New Project" 클릭
3. GitHub 리포지토리 import
4. Framework Preset: Vite 선택
5. Deploy 클릭

### GitHub Pages에 배포

1. GitHub 리포지토리의 Settings > Pages로 이동
2. Source를 "GitHub Actions"로 선택
3. 코드를 push하면 자동으로 배포됩니다

## 🛠️ 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 📱 PWA 기능

- 오프라인 지원
- 설치 가능
- 모바일 최적화
- 푸시 알림 지원

## 🎯 주요 기능

- 200개 이상의 검증된 사실
- 6개 카테고리 (과학, 동물, 인체, 역사, 음식, 우주)
- 다크/라이트 모드
- 키보드 단축키
- 반응형 디자인
- PWA 지원

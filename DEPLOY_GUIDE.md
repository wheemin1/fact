# 🚀 Fact Flash Cards 배포 가이드

## 즉시 배포하기 (Netlify 드래그 앤 드롭)

### 1단계: 빌드 확인
✅ 빌드 완료됨 - `dist` 폴더가 생성되었습니다.

### 2단계: Netlify에서 배포
1. [netlify.com](https://netlify.com)에 접속
2. 회원가입 또는 로그인
3. 대시보드에서 **"Want to deploy a new site without connecting to Git?"** 클릭
4. **"Browse to upload"** 클릭
5. `dist` 폴더를 선택하여 업로드
6. 몇 초 후 배포 완료! 🎉

### 3단계: 커스텀 도메인 (선택사항)
- Site settings > Domain management에서 커스텀 도메인 추가 가능

## 자동 배포 설정 (GitHub 연동)

### GitHub에서 자동 배포하려면:
1. 코드를 GitHub 리포지토리에 push
2. Netlify에서 "New site from Git" 선택
3. GitHub 리포지토리 연결
4. 빌드 설정은 `netlify.toml`에서 자동으로 읽어옵니다
5. 코드 변경 시 자동으로 재배포됩니다

## 다른 배포 옵션

### Vercel
1. [vercel.com](https://vercel.com) 접속
2. GitHub 리포지토리 import
3. `vercel.json` 설정 자동 적용

### GitHub Pages
1. GitHub 리포지토리의 Settings > Pages
2. Source를 "GitHub Actions" 선택
3. `.github/workflows/deploy.yml`이 자동 배포

## 배포된 기능들
- ✅ 200개의 검증된 팩트
- ✅ 6개 카테고리 (과학, 동물, 인체, 역사, 음식, 우주)
- ✅ PWA 지원 (앱으로 설치 가능)
- ✅ 오프라인 동작
- ✅ 반응형 모바일 친화적 디자인
- ✅ 다크/라이트 모드
- ✅ 키보드 단축키
- ✅ SEO 최적화

## 배포 후 할 일
1. 📱 모바일에서 "홈 화면에 추가"로 앱 설치
2. 🔗 친구들과 링크 공유
3. 📊 Netlify Analytics로 방문자 확인
4. 🆕 새로운 팩트 추가나 기능 개선

배포 완료 후 URL을 알려주세요! 🎉

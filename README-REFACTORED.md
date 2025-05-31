# FactFact - Amazing Facts at Your Fingertips 🌟

리팩토링된 Fact Flash Cards 모바일 웹 앱입니다. React + TypeScript + Vite + shadcn/ui로 구축되었습니다.

## 🎉 **최신 업데이트 (v2.0)**

### 🌙 **다크 모드 지원**
- 라이트/다크/시스템 테마 자동 전환
- 모든 컴포넌트 다크 모드 최적화
- 사용자 설정 저장 및 자동 복원

### 📱 **PWA (Progressive Web App)**
- 오프라인 캐싱으로 네트워크 없이도 사용 가능
- 홈 화면에 추가하여 네이티브 앱처럼 사용
- 서비스 워커 기반 백그라운드 동기화

### ⚡ **키보드 단축키**
- `스페이스바`: 랜덤 Fact 보기
- `D`: 오늘의 Fact 보기  
- `Ctrl + T`: 테마 변경
- `R`: 페이지 새로고침

### 🎛️ **향상된 설정 패널**
- 사용 통계 (즐겨찾기, 조회 기록)
- 개인화 설정 관리
- 데이터 내보내기/가져오기 기능

### ❓ **FAQ 섹션**
- 접을 수 있는 아코디언 형태
- 앱 사용법 및 기능 안내

---

## 🚀 새로운 기능 (리팩토링 후)

### ✨ 개선된 기능들
- **중앙집중식 타입 관리**: 모든 타입이 `src/types/index.ts`에서 관리됩니다
- **상수 관리**: 카테고리, API 엔드포인트, 애니메이션 설정이 `src/constants/index.ts`에서 관리됩니다
- **사용자 환경설정**: 즐겨찾기, 조회 기록, 설정 등이 로컬 스토리지에 저장됩니다
- **관리자 패널**: 쉽게 새로운 Fact를 추가할 수 있는 관리 도구
- **향상된 데이터 구조**: 태그, 난이도, 검증 상태 등의 메타데이터 지원

### 🎯 새로운 컴포넌트들
- **FactActions**: 즐겨찾기, 난이도 표시, 조회 상태 표시
- **AdminPanel**: Fact 추가/관리 인터페이스
- **개선된 FactCard**: 태그 표시, 액션 버튼 추가

## 📚 데이터 관리 방법

### 🎛️ 관리자 패널 사용하기 (권장)
1. 우측 하단의 **"관리자"** 버튼을 클릭합니다
2. 관리자 패널에서 다음 정보를 입력:
   - **Fact 내용** (필수): 흥미로운 사실을 입력
   - **카테고리** (필수): Science, History, Animals, Food, Human Body 중 선택
   - **난이도**: 쉬움, 보통, 어려움 중 선택
   - **태그**: 관련 키워드들 (선택사항)
3. **"Fact 생성"** 버튼을 클릭하면 콘솔에 JSON이 출력됩니다
4. 출력된 JSON을 복사하여 `public/facts.json` 파일에 추가합니다

### 📝 벌크 데이터 입력
- 관리자 패널 하단의 **"벌크 생성"** 영역을 사용
- 텍스트 영역에 한 줄당 하나의 Fact를 입력
- 포커스를 벗어나면 자동으로 JSON이 생성됩니다

### 📤 데이터 가져오기/내보내기
- **내보내기**: 현재 모든 Facts를 JSON 파일로 다운로드
- **가져오기**: JSON 파일을 업로드하여 Facts 확인 (콘솔 출력)

### 💾 향상된 데이터 구조
새로운 Fact JSON 구조:
```json
{
  "id": 31,
  "text": "새로운 흥미로운 사실입니다.",
  "category": "Science",
  "difficulty": "medium",
  "tags": ["physics", "amazing", "discovery"],
  "verified": true,
  "createdAt": "2025-05-31T00:00:00Z",
  "updatedAt": "2025-05-31T00:00:00Z"
}
```

## 🏗️ 리팩토링된 프로젝트 구조

```
src/
├── types/                    # 🏷️ 타입 정의
│   └── index.ts             # Fact, Category, UserPreferences 타입
├── constants/               # 📋 상수 관리
│   └── index.ts             # 카테고리, API 엔드포인트, 애니메이션 설정
├── hooks/                   # 🪝 커스텀 훅
│   ├── useFacts.ts          # Fact 관련 로직 (로딩, 랜덤, 일일 Fact)
│   ├── useUserPreferences.ts # 사용자 설정 (즐겨찾기, 조회기록)
│   ├── use-toast.ts         # Toast 알림
│   └── use-mobile.tsx       # 모바일 감지
├── components/              # 🧩 컴포넌트
│   ├── AdminPanel.tsx       # 🔧 관리자 패널 (새 기능!)
│   ├── FactActions.tsx      # ❤️ Fact 액션 버튼 (새 기능!)
│   ├── FactCard.tsx         # 📄 향상된 Fact 카드
│   ├── CategoryFilter.tsx   # 🏷️ 카테고리 필터
│   └── ...                  # 기타 컴포넌트들
└── pages/
    ├── Index.tsx            # 🏠 메인 페이지 (간소화됨)
    └── NotFound.tsx         # 404 페이지
```

## ✨ 새로운 기능들

### 👤 사용자 기능
- **❤️ 즐겨찾기**: Fact에 하트를 눌러 즐겨찾기 추가/제거
- **👁️ 조회 기록**: 본 Fact들이 자동으로 기록됩니다
- **⭐ 난이도 표시**: 각 Fact의 난이도가 별점으로 표시
- **🏷️ 태그 시스템**: Fact와 관련된 태그들이 표시됩니다

### 🔧 관리자 기능
- **📊 통계 대시보드**: 총 Facts 수, 카테고리 수, 검증된 Facts 수
- **➕ 쉬운 Fact 추가**: GUI를 통한 직관적인 Fact 생성
- **📝 벌크 입력**: 여러 Fact를 한 번에 추가 가능
- **💾 가져오기/내보내기**: JSON 파일을 통한 데이터 관리

### 🎨 UI/UX 개선
- **🌈 향상된 애니메이션**: 부드러운 전환 효과
- **📱 반응형 디자인**: 모바일과 데스크톱 최적화
- **🎯 접근성**: 키보드 네비게이션 및 스크린 리더 지원

## 🚀 사용 방법

### 기본 사용법
1. **카테고리 선택**: 원하는 주제의 Facts 탐색
2. **랜덤 Fact**: "Next Fact" 버튼으로 무작위 Fact 보기
3. **오늘의 Fact**: "Today's Special" 버튼으로 일일 Fact 확인
4. **공유하기**: 각 Fact 우상단의 공유 버튼 활용

### 관리자로 사용하기
1. **관리자 모드 진입**: 우하단 "관리자" 버튼 클릭
2. **새 Fact 추가**: 폼을 작성하고 콘솔에서 JSON 복사
3. **JSON 파일 업데이트**: `public/facts.json`에 새 Fact 추가
4. **페이지 새로고침**: 새로운 Facts 확인

## 🛠️ 개발자를 위한 정보

### 타입 안전성
- 모든 컴포넌트가 TypeScript로 작성됨
- 컴파일 타임 오류 검출로 런타임 에러 방지
- 인터페이스와 타입 가드로 안전한 데이터 처리

### 성능 최적화
- React.memo와 useCallback으로 불필요한 리렌더링 방지
- 지연 로딩과 코드 스플리팅 적용
- 로컬 스토리지를 활용한 클라이언트 사이드 캐싱

### 확장성
- 모듈화된 컴포넌트 구조로 쉬운 기능 추가
- 커스텀 훅으로 로직 재사용 극대화
- 상수 파일로 설정 변경 간소화

## 🎯 다음 개발 계획

### 단기 목표 (1-2주)
- [ ] PWA 변환으로 오프라인 지원
- [ ] 다크 모드 지원
- [ ] 키보드 단축키 추가

### 중기 목표 (1-2개월)
- [ ] 백엔드 연동 (Firebase/Supabase)
- [ ] 사용자 계정 시스템
- [ ] 실시간 Fact 동기화

### 장기 목표 (3-6개월)
- [ ] AI 기반 Fact 추천 시스템
- [ ] 소셜 기능 (공유, 댓글, 평점)
- [ ] 다국어 지원
- [ ] 음성 읽기 기능

---

## 📞 문의 및 기여

이 프로젝트는 지속적으로 개선되고 있습니다. 새로운 아이디어나 버그 신고는 언제든지 환영합니다!

**리팩토링 완료! 🎉 이제 데이터 추가가 훨씬 쉬워졌습니다!**
1. 웹 앱 우하단의 "관리자" 버튼 클릭
2. 새로운 Fact 정보 입력:
   - Fact 내용 (필수)
   - 카테고리 선택 (필수)
   - 난이도 설정
   - 태그 추가
3. "Fact 생성" 버튼 클릭
4. 콘솔에서 생성된 JSON 복사
5. `public/facts.json` 파일의 facts 배열에 추가

### 2. JSON 파일 직접 편집
`public/facts.json` 또는 `public/facts-enhanced.json` 파일을 직접 편집할 수 있습니다.

#### 새로운 데이터 구조:
```json
{
  "id": 31,
  "text": "새로운 흥미로운 사실입니다.",
  "category": "Science",
  "difficulty": "medium",
  "tags": ["태그1", "태그2"],
  "verified": true,
  "createdAt": "2025-05-31T00:00:00Z"
}
```

#### 필드 설명:
- `id`: 고유 번호 (기존 최대값 + 1)
- `text`: Fact 내용 (필수)
- `category`: 카테고리 (Science, History, Human Body, Animals, Food)
- `difficulty`: 난이도 (easy, medium, hard)
- `tags`: 관련 태그들 (선택사항)
- `verified`: 검증 여부 (boolean)
- `createdAt`: 생성 날짜 (ISO 8601 형식)

### 3. 벌크 데이터 추가
관리자 패널의 "벌크 생성" 기능을 사용하여 여러 Fact를 한번에 생성할 수 있습니다:
1. 텍스트 영역에 한 줄당 하나의 Fact 입력
2. 포커스를 벗어나면 자동으로 JSON 생성
3. 콘솔에서 결과 확인 후 복사

## 🎨 카테고리 관리

### 새 카테고리 추가하기
1. `src/constants/index.ts`의 `CATEGORIES` 배열에 새 카테고리 추가:
```typescript
{
  id: 'new-category',
  name: 'New Category',
  icon: '🆕',
  description: '새로운 카테고리 설명',
  color: 'bg-teal-100 text-teal-700 border-teal-300'
}
```

2. `src/components/FactCard.tsx`에서 해당 카테고리 스타일링 확인

## 🛠 개발 가이드

### 프로젝트 구조
```
src/
├── components/          # UI 컴포넌트들
│   ├── ui/             # shadcn/ui 기본 컴포넌트
│   ├── FactCard.tsx    # 메인 카드 컴포넌트
│   ├── AdminPanel.tsx  # 관리자 패널
│   └── ...
├── hooks/              # 커스텀 훅들
│   ├── useFacts.ts     # Fact 관련 상태 관리
│   └── useUserPreferences.ts # 사용자 설정 관리
├── types/              # TypeScript 타입 정의
├── constants/          # 상수 및 설정
└── pages/              # 페이지 컴포넌트
```

### 주요 훅들
- **useFacts**: Fact 데이터 로딩, 카테고리 필터링, 랜덤/일일 Fact 관리
- **useUserPreferences**: 사용자 설정, 즐겨찾기, 조회 기록 관리

### 개발 명령어
```bash
npm install          # 의존성 설치
npm run dev         # 개발 서버 시작
npm run build       # 프로덕션 빌드
npm run preview     # 빌드된 앱 미리보기
```

## 📊 데이터 통계

현재 포함된 데이터:
- **총 30개의 Facts**
- **5개 카테고리**: Science, History, Human Body, Animals, Food
- **3단계 난이도**: Easy, Medium, Hard
- **태그 시스템**: 각 Fact에 관련 태그 포함

## 🔧 향후 개선 계획

1. **백엔드 연동**: REST API 또는 headless CMS 연동
2. **검색 기능**: 텍스트 및 태그 기반 검색
3. **사용자 계정**: 로그인, 개인화된 즐겨찾기
4. **소셜 기능**: 공유, 댓글, 평점 시스템
5. **오프라인 지원**: PWA 기능 추가
6. **다국어 지원**: i18n 구현
7. **음성 읽기**: TTS(Text-to-Speech) 기능
8. **퀴즈 모드**: Fact 기반 퀴즈 게임

## 🤝 기여하기

1. 새로운 Fact 제안: 관리자 패널 사용
2. 버그 리포트: 이슈 등록
3. 기능 개선: Pull Request 제출

## 📄 라이선스

MIT License

## 👨‍💻 개발자 노트

이 프로젝트는 AI에 의해 초기 생성되었으며, 다음과 같은 현대적인 웹 개발 패턴을 적용하여 리팩토링되었습니다:

- **타입 안정성**: TypeScript 완전 활용
- **컴포넌트 분리**: 단일 책임 원칙 적용  
- **상태 관리**: 커스텀 훅을 통한 로직 분리
- **사용자 경험**: 로컬 스토리지 활용한 개인화
- **개발자 경험**: 관리자 도구를 통한 쉬운 데이터 관리

데이터 추가나 수정이 필요하시면 관리자 패널을 활용하시거나, JSON 파일을 직접 편집해주세요!

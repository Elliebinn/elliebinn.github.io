# PRD: 포트폴리오 디자인 리뉴얼

> **Status:** Draft — 사용자 승인 대기 (Phase 0 시작 전)
> **Owner:** Hyebin Woo
> **Scope:** 랜딩, 프로젝트 상세, 블로그 (이력서 제외)
> **Constraint:** 콘텐츠 100% 보존, 현재 컬러 시스템 유지

---

## 1. Overview

### 1.1 배경
`/Users/ellie/Documents/portfolio`는 Astro 6 + React 19 + Tailwind 4 기반 퍼스널 포트폴리오. 현재 구조가 "모듈 쌓기" 패턴에 머물러 있고, 인터랙션이 페이지 로드 시 fade-up 한 번에 그침. 콘텐츠·색·브랜드 보이스는 유지하되 **시각 언어·레이아웃 리듬·인터랙션**을 상위 라인(Linear/Vercel/Rauno)급으로 끌어올리려 함.

### 1.2 목표 (Goals)
- **G1.** 기존 콘텐츠·카피·정보 구조 100% 보존
- **G2.** 현재 컬러 시스템 유지 (웜 에디토리얼 팔레트는 금지)
- **G3.** 섹션마다 리듬(밀도·정렬)을 변주하는 에디토리얼 레이아웃으로 전환
- **G4.** 스크롤 중심의 엔지니어링 인터랙션 8종 도입
- **G5.** 죽은 디자인 시스템(editorial/v2) 제거로 단일 시스템 확립
- **G6.** DESIGN.md 문서로 디자인 언어를 **코드와 동기화된 단일 진실**로 만들기
- **G7.** Lighthouse Performance ≥ 80, Accessibility ≥ 95 유지
- **G8.** `prefers-reduced-motion` 완벽 대응

### 1.3 비목표 (Non-Goals)
- **NG1.** 콘텐츠 변경·추가 (문구·카피·정보구조 건드리지 않음)
- **NG2.** 이력서 페이지 (`/ko/resume`, `/en/resume`, `resume-pdf`) 수정
- **NG3.** i18n 구조 변경
- **NG4.** 새 프로젝트 추가, 블로그 포스트 작성
- **NG5.** 백엔드·데이터·SEO 메타 변경
- **NG6.** 실제 이미지 촬영/제작 (이번 단계는 컬러 플레이스홀더로)

---

## 2. Scope

### 2.1 In-Scope (건드릴 것)

**페이지:**
- `src/pages/ko/index.astro` (한글 랜딩)
- `src/pages/en/index.astro` (영문 랜딩)
- `src/pages/ko/projects/jujutok.astro`
- `src/pages/ko/projects/quant-platform.astro`
- `src/pages/en/projects/jujutok.astro`
- `src/pages/en/projects/quant-platform.astro`
- `src/pages/ko/blog/index.astro` (한글 블로그 목록)
- `src/pages/en/blog/index.astro` (영문 블로그 목록)
- `src/pages/ko/blog/[slug].astro` (한글 블로그 상세)
- `src/pages/en/blog/[slug].astro` (영문 블로그 상세)
- `src/pages/blog/index.astro` (루트 blog — ko/en과 **동일 디자인**)
- `src/pages/blog/[slug].astro` (루트 blog 상세 — ko/en과 **동일 디자인**)

**컴포넌트 (root 시스템):**
- `Hero.tsx`, `About.tsx`, `Projects.tsx`, `CaseStudy.tsx`, `ProjectDetail.tsx`, `Journey.tsx`, `Skills.tsx`, `Certifications.tsx`, `Contact.tsx`, `Navbar.tsx`, `Footer.tsx`, `BottomNav.tsx`

**스타일:**
- `src/styles/global.css` — 토큰 정리 (추가/수정만, 기존 색 유지)
- `src/layouts/Layout.astro` — 필요 시 모션 유틸 주입

**신규 생성:**
- `DESIGN.md` (루트) — **한국어 + 영어 이중 언어**
- `src/components/motion/` — 인터랙션 훅·유틸
- `src/components/placeholders/ColorPlaceholder.tsx`
- `IMAGES-WISHLIST.md` (루트, 나중에 투입할 실제 이미지 스펙)

### 2.2 Out-of-Scope (절대 건드리지 않을 것)
- `src/pages/ko/resume.astro`, `src/pages/en/resume.astro`, `resume-pdf.astro` 및 그 경로의 모든 파일
- 이력서에서만 사용되는 컴포넌트 (사용처 검증 필수)
- `src/content/` (블로그 MDX 본문)
- `src/i18n/translations.ts` (문구)
- `src/data/`
- `public/images/` (기존 이미지 파일)

### 2.3 삭제 대상 (죽은 코드)
- `src/components/editorial/` 전체 (15개 파일)
- `src/styles/editorial.css`
- `src/layouts/EditorialLayout.astro`
- `src/pages/ko/v2/`, `src/pages/en/v2/` 하위 모든 페이지 (존재 시)

**⚠️ 완전 삭제**. archive 폴더로 보존하지 않음. (사용자 결정: Q3 = "안 써")

**삭제 전 안전 검증 (필수):**
1. 각 파일명으로 전역 grep → import/참조 0건 확인
2. 이력서 페이지에서 editorial을 참조하지 않는지 확인
3. 삭제 리스트 사용자 최종 승인 후 실행

---

## 3. Constraints

| ID | 제약 |
|---|---|
| C1 | 현재 컬러 시스템 변수 (`--color-*`) 유지. 새 색 추가는 OK, 기존 색 삭제 금지 |
| C2 | 기존 폰트 유지 (Plus Jakarta Sans + Be Vietnam Pro + Noto Sans KR + Geist) |
| C3 | 웜 에디토리얼 팔레트 (`#fef9f2`, `--ed-*`) 사용 금지 |
| C4 | 모든 문구·번역 텍스트 불변 |
| C5 | 번들 사이즈 증가 < 50KB gzip |
| C6 | Lighthouse Performance ≥ 80 (모바일) |
| C7 | `prefers-reduced-motion: reduce`일 때 모든 비필수 모션 OFF |
| C8 | 키보드 탐색·포커스 링 유지, 스크린 리더 호환 |
| C9 | 이력서 페이지 시각 변화 0 (회귀 방지) |

---

## 4. Design Direction

### 4.1 톤 (Direction C — Hybrid)
- **레이아웃**: 에디토리얼 매거진 (섹션마다 리듬 변주, 풀블리드, 비대칭 그리드, 오버레이드 타이포)
- **인터랙션**: 엔지니어링 프리시전 (스크롤 리빌, 카운트업, 마그네틱, 미세 모션)
- **컬러**: 기존 시스템 유지
- **참조**: Linear(밀도·보더), Vercel(타이포·여백), Rauno(모션·커서), Emil Kowalski(레이아웃 리듬)

### 4.2 핵심 디자인 원칙
1. **섹션마다 다른 리듬** — 모든 섹션이 같은 구조로 쌓이지 않음
2. **스크롤이 주인공** — 사용자가 스크롤할 때마다 페이지가 반응함
3. **이미지는 콘텐츠, 장식이 아님** — 풀블리드/마스크/오버레이로 주인공 만들기
4. **모션은 의미를 전달** — 장식 모션 금지, 모든 모션은 의도 있음
5. **기본값은 조용함** — 섹션당 모션 1개만 "크게", 나머지는 미세

---

## 5. DESIGN.md 스펙

**위치:** `/Users/ellie/Projects/elliebinn.github.io/DESIGN.md`
**언어:** 한국어 + 영어 이중 작성 (각 섹션에 두 언어 병기)

**포맷:** awesome-design-md의 9섹션 + 확장 2섹션

**목차:**
1. Visual Theme & Atmosphere — 현재 무드 문서화
2. Color Palette & Roles — `global.css`에서 추출한 `--color-*` 전수 (hex + 역할 + 사용처)
3. Typography Rules — Plus Jakarta Sans / Be Vietnam Pro / Noto Sans KR / Geist 하이어라키 테이블
4. Component Stylings — 버튼/카드/인풋/내비/태그 상태별 (default/hover/focus/active/disabled)
5. Layout Principles — max-width 1440, 6/8 px grid, 섹션 스페이싱 스케일
6. Depth & Elevation — 그림자 시스템 (`shadow-ambient` 등)
7. Do's and Don'ts — **"웜 팔레트 금지"**, **"editorial 컴포넌트 참조 금지"**, **"섹션 간 동일 리듬 반복 금지"** 포함
8. Responsive Behavior — 브레이크포인트 (sm/md/lg/xl)
9. Agent Prompt Guide — Claude에게 붙일 빠른 참조
10. **Motion Language** (확장) — 8개 인터랙션의 강도·타이밍·트리거·접근성 규칙
11. **Layout Rhythm Map** (확장) — 섹션별 리듬(dense/sparse, left/center/full-bleed) 지도

**작성 방법:**
- `global.css`에서 `--color-*`, `--font-*`, `--shadow-*` 전부 grep
- 현재 사용 중인 값만 문서화 (추측 금지)
- 코드와 문서가 어긋나면 **코드가 진실**

---

## 6. Layout Changes (섹션별 상세)

### 6.1 랜딩 페이지 (`/ko/`, `/en/`)

| 섹션 | 현재 | 변경 | 리듬 |
|---|---|---|---|
| **Hero** | 거대 타이포 + 좌상/우상 메타 + 통계 3개 | 유지 + **풀블리드 그라디언트 백드롭** + 통계 카운트업 + 스크롤 인디케이터 리디자인 | sparse · full-bleed |
| **About** | 12칼럼 5+7 | **4+7 비대칭** + 대형 인용구 블록 + 스킬 태그 재배치 | dense · left |
| **Methodology** | 좌 스텝 + 우 이미지 | **스티키 좌 타이틀 + 우 스크롤 스텝** (긴 스크롤) | dense · sticky |
| **Capabilities** | 가운데 레이더 폴리곤 SVG | 유지 + **스크롤 진입 시 선이 그려지는 SVG 애니메이션** + 주변 레이블 재배치 | sparse · center |
| **Projects** | 중앙 타이틀 + 썸네일/텍스트 교차 | **풀블리드 프로젝트 배너** (색 블록 + 오버레이드 타이포 + 태그 rail) | sparse · full-bleed |
| **Journey** | 카드 그리드 | **수직 타임라인** + 좌우 교차 배치 + 스크롤 라인 진행 | dense · timeline |
| **Skills** | 카테고리 그리드 | **태그 클라우드 + 카테고리 헤더** 미니멀 리스트 | dense · left |
| **Certifications** | 카드 그리드 | **미니멀 리스트** (한 줄당 1개, 좌 아이콘 + 우 메타) | sparse · left |
| **Contact** | 폼·소셜 | 유지 + 마그네틱 CTA 버튼 | sparse · center |
| **Footer** | 기본 | 유지 + 미세 호버 강조 | dense · left |

### 6.2 프로젝트 상세 (`/ko/projects/*`, `/en/projects/*`)
- **Hero 영역**: 프로젝트 타이틀 + 태그 + 요약 → **풀블리드 컬러 블록 + 오버레이드 거대 타이포**
- **본문 구조**: 기존 섹션 순서 유지, 각 섹션 진입 시 fade-up
- **이미지 자리**: `<ColorPlaceholder>` 교체 (프로젝트 이름 오버레이)
- **메타 사이드 레일** (sticky column):
  - 위치: 본문 좌측 (데스크톱 ≥ lg), 모바일은 Hero 아래 인라인
  - 내용 후보: 기간 / 역할 / 주요 영향 / 기술 스택
  - **선결 작업**: Phase 4에서 현재 프로젝트 상세 파일을 읽고 메타 필드 존재 여부 확인
    - 필드 존재 → 사이드 레일 구성
    - 필드 부재 → 기존 콘텐츠에서 추출하거나 사이드 레일 생략 (본문 집중)
- **다음 프로젝트 CTA**: 하단 풀블리드 링크 블록

### 6.3 블로그 목록 (`/ko/blog/`, `/en/blog/`, `/blog/`)
- **루트 blog는 ko/en과 동일 디자인** (Q2 결정)
- **변경**: **매거진 인덱스 스타일** — 최신 포스트는 큰 히어로 카드, 나머지는 조밀한 리스트
- **카테고리 필터**: 상단 고정 칩 (기존 카테고리 체계 유지)
- **진입 모션**: 각 카드 스크롤 리빌

### 6.4 블로그 상세 (`/ko/blog/[slug]`, `/en/blog/[slug]`, `/blog/[slug]`)
- **독서 환경 최우선**: 본문 폭 66ch, 타이포 스케일 재조정
- **스티키 TOC** (Table of Contents, 데스크톱만):
  - MDX 포스트의 `##`, `###` heading을 자동 추출
  - 좌측 또는 우측 sticky column
  - 현재 뷰포트에 있는 섹션 하이라이트 (IntersectionObserver)
  - **선결 작업**: Phase 5에서 MDX 포스트 샘플링 → heading 구조 확인
    - heading 2개 이상 → TOC 자동 표시
    - heading 부재 → TOC 자동 숨김
- **진행 인디케이터**: 상단 얇은 프로그레스 바 (I7 재사용)
- **히어로**: 제목 + 메타만, 이미지 없으면 컬러 블록
- **본문 내 인터랙션**: 최소 (집중 방해 금지)

---

## 7. Interaction Spec

### 7.1 인터랙션 배치 매트릭스

| # | 인터랙션 | 강도 | 위치 | 트리거 | 지속시간 | 감속 |
|---|---|---|---|---|---|---|
| I1 | **스크롤 트리거 리빌** | 기본 (전역) | 모든 섹션 타이틀·본문 | IntersectionObserver (threshold 0.2) | 600ms | cubic-bezier(0.22, 1, 0.36, 1) |
| I2 | **숫자 카운트업** | 히어로 | Hero의 38/200+/20+ | 뷰포트 진입 한 번 | 1800ms | easeOutExpo |
| I3 | **마그네틱 버튼** | 미세 | Hero CTA, Contact CTA | mousemove 근접 | 즉시 (스프링) | spring(stiffness 150, damping 15) |
| I4 | **커서 라이트 스팟** | 미세 | Hero 섹션 배경만 (데스크톱) | mousemove | 즉시 | linear |
| I5 | **텍스트 split reveal** | 히어로 | Hero 메인 헤드라인 | 페이지 로드 후 400ms | 900ms | cubic-bezier(0.22, 1, 0.36, 1) |
| I6 | **이미지 패럴럭스** | 미세 | 풀블리드 컬러 블록 | scroll | scroll-linked | linear |
| I7 | **섹션 배경 크로스페이드 / 독서 진행률** | 분위기 | 전체 페이지 배경 (랜딩), 블로그 상세 상단 바 | scroll progress | scroll-linked | linear |
| I8 | **프로젝트 카드 3D tilt** | 프로젝트 히어로 | Projects 섹션 카드 | hover | 즉시 | spring |

### 7.2 접근성 규칙
- `prefers-reduced-motion: reduce` 감지 시:
  - I1 → opacity 즉시 1 (transform 없음)
  - I2 → 숫자 즉시 최종값
  - I3, I4, I6, I7, I8 → **완전 비활성**
  - I5 → 즉시 표시
- 모바일 (< 768px):
  - I3, I4, I6, I8 → 비활성
  - I7 → 축소 강도
- 키보드 포커스는 언제나 표준 포커스 링 유지

### 7.3 기술 선택
- **모션 엔진**: `motion` 패키지 (framer-motion 후속, React 19 호환, 트리 셰이커블) — **사용자 승인됨 (Q1)**
- **카운트업**: 자체 훅 (`useCountUp`), requestAnimationFrame
- **마그네틱**: 자체 훅 (`useMagnetic`)
- **3D tilt**: CSS perspective + 자체 훅 (`useTilt`)
- **스크롤 진행률**: 자체 훅 (`useScrollProgress`) 또는 motion의 `useScroll`

### 7.4 Astro Islands 전략
- 모션 컴포넌트는 `client:visible` 또는 `client:load` 로드
- Hero는 `client:load` (첫 화면에 즉시 필요)
- 그 외 섹션은 `client:visible` (스크롤 도달 시 하이드레이션)
- 블로그 본문은 순수 정적 (hydration 없음)

---

## 8. Image Strategy

### 8.1 `<ColorPlaceholder>` 컴포넌트 스펙

**Props:**
- `variant`: `'gradient' | 'geometric' | 'label' | 'minimal'`
- `colors`: 토큰 이름 배열 (예: `['--color-accent', '--color-bg-secondary']`)
- `label?`: 오버레이 텍스트 (프로젝트명·키워드)
- `aspectRatio`: `'video' | 'square' | '4/5' | '16/9'`
- `className?`

**동작:**
- `gradient`: 2~3색 선형/방사 그라디언트
- `geometric`: SVG 도형 (원/선/그리드) + 색
- `label`: 거대 타이포 오버레이 + 단색 배경
- `minimal`: 단색 + 미세 노이즈

**목적:** 실제 이미지 투입 시 props만 바꿔 교체 가능

### 8.2 교체 대상 인벤토리
- Hero 비주얼 영역 (현재 프로필 이미지)
- Methodology 대시보드 이미지
- Projects 프로젝트 썸네일 2개 (jujutok, quant-platform)
- 프로젝트 상세 내부 스크린샷
- 블로그 히어로 이미지 (있을 경우)

### 8.3 `IMAGES-WISHLIST.md` (산출물)
나중에 진짜 이미지 투입할 때 참조할 위시리스트:
- 파일 경로
- 용도
- 권장 해상도·비율
- 톤·무드 가이드 (DESIGN.md 기반)
- 대체 텍스트 제안

---

## 9. Technical Decisions

### 9.1 신규 의존성
```json
{
  "motion": "^11.x"  // ~30KB gzip, tree-shakeable
}
```
**사용자 승인됨 (Q1)**

### 9.2 파일 구조 (신규)
```
src/components/
  motion/
    ScrollReveal.tsx        # I1
    CountUp.tsx             # I2
    MagneticButton.tsx      # I3
    CursorSpotlight.tsx     # I4
    SplitText.tsx           # I5
    ParallaxImage.tsx       # I6
    ScrollProgress.tsx      # I7
    TiltCard.tsx            # I8
    useReducedMotion.ts     # 공통 훅
  placeholders/
    ColorPlaceholder.tsx
  blog/
    StickyTOC.tsx           # 블로그 상세용
  project/
    MetaSideRail.tsx        # 프로젝트 상세용 (조건부)
```

### 9.3 CSS 전략
- 기존 `global.css` 토큰 유지
- 새 모션 유틸은 컴포넌트 스코프 (Tailwind `className` + 인라인 style)
- `@media (prefers-reduced-motion: reduce)` 전역 규칙 추가

### 9.4 타입 안전성
- 모든 모션 훅은 TypeScript
- DESIGN.md의 토큰 이름을 타입 유니온으로 (선택적)

---

## 10. Dead Code Cleanup

**Phase 0 실행:**

1. **탐지**: grep으로 사용처 검증
   - `grep -r "editorial" src/`
   - `grep -r "v2" src/pages/`
   - 이력서 페이지에서 editorial 참조 0건 확인
2. **삭제 리스트 작성** → 사용자 승인
3. **일괄 삭제** (archive 없음, 완전 삭제):
   - `src/components/editorial/` 전체
   - `src/styles/editorial.css`
   - `src/layouts/EditorialLayout.astro`
   - `/v2/` 페이지 (존재 시)
4. **빌드 검증**: `npm run build` 성공
5. **시각 회귀**: 이력서 페이지 스크린샷 비교

---

## 11. Phased Execution

### Phase 0 — Prep (문서·정리, 코드 변경 없음)
- P0.1 `global.css` 및 현재 토큰 전수 분석
- P0.2 `DESIGN.md` 초안 작성 (한국어 + 영어 이중) 및 루트 배치
- P0.3 죽은 코드 삭제 리스트 작성 → **사용자 승인**
- P0.4 삭제 실행 + 빌드 검증

**산출물:** `DESIGN.md`, 정리된 코드베이스
**검증:** `npm run build` 성공, 이력서 페이지 시각 변화 0

### Phase 1 — Motion Foundation
- P1.1 `motion` 의존성 설치
- P1.2 `useReducedMotion` 훅 작성
- P1.3 `ScrollReveal`, `CountUp`, `MagneticButton`, `CursorSpotlight`, `SplitText`, `ParallaxImage`, `ScrollProgress`, `TiltCard` 컴포넌트 작성
- P1.4 각 컴포넌트 단위 시각 확인

**산출물:** `src/components/motion/` 8개 컴포넌트
**검증:** 각 모션이 독립적으로 동작

### Phase 2 — ColorPlaceholder
- P2.1 `ColorPlaceholder.tsx` 4개 variant 구현
- P2.2 현재 모든 이미지 위치 인벤토리
- P2.3 각 자리 `ColorPlaceholder`로 1차 교체 (임시)
- P2.4 `IMAGES-WISHLIST.md` 작성

**산출물:** 컴포넌트 + 위시리스트
**검증:** 깨진 이미지 0건, 레이아웃 유지

### Phase 3 — Landing Page Redesign
- P3.1 Hero 재설계 (레이아웃 + I2/I3/I4/I5 적용)
- P3.2 About 비대칭 그리드
- P3.3 Methodology 스티키 레이아웃
- P3.4 Capabilities SVG 애니메이션
- P3.5 Projects 풀블리드 배너 + I8
- P3.6 Journey 수직 타임라인
- P3.7 Skills 태그 클라우드
- P3.8 Certifications 미니멀 리스트
- P3.9 Contact 마그네틱 CTA
- P3.10 I1/I7 전역 적용

**산출물:** 재설계된 랜딩 페이지 (ko/en)
**검증:** 각 섹션 스크롤 리빌, 카운트업, 모든 모션 동작. Lighthouse 체크.

### Phase 4 — Project Detail Redesign
- P4.1 **현재 프로젝트 상세 파일 정독** → 메타 필드 존재 여부 확인
- P4.2 프로젝트 상세 Hero 풀블리드 블록
- P4.3 `<MetaSideRail>` 구현 (조건부: 메타 필드 있을 때)
- P4.4 본문 섹션 스크롤 리빌
- P4.5 다음 프로젝트 CTA 블록
- P4.6 jujutok/quant-platform 모두 적용 (ko/en)

**산출물:** 재설계된 프로젝트 상세 4개 페이지
**검증:** 기존 콘텐츠 100% 보존, 새 레이아웃 적용

### Phase 5 — Blog Redesign
- P5.1 **MDX 포스트 샘플링** → heading 구조 확인
- P5.2 블로그 목록 매거진 인덱스 (ko/en/root 동일 디자인)
- P5.3 블로그 상세 독서 환경 (66ch, 타이포)
- P5.4 `<StickyTOC>` 구현 (조건부: heading 2개 이상)
- P5.5 독서 진행률 인디케이터 (I7 재사용)
- P5.6 ko/en/root 3개 경로 모두 적용

**산출물:** 재설계된 블로그 페이지
**검증:** MDX 렌더링 정상, 기존 포스트 100% 표시

### Phase 6 — Accessibility & Polish
- P6.1 `prefers-reduced-motion` 전역 검증
- P6.2 키보드 탐색 전수 테스트
- P6.3 스크린 리더 호환 체크 (랜드마크·ARIA)
- P6.4 모바일 반응형 조정
- P6.5 미세 폴리시 (`make-interfaces-feel-better` 스킬 활용)

**산출물:** 접근성 검증 리포트
**검증:** Lighthouse Accessibility ≥ 95

### Phase 7 — QA & Validation
- P7.1 `npm run build` 성공
- P7.2 Lighthouse Performance ≥ 80 (모바일)
- P7.3 `frontend-checkpoint` 스킬로 전/후 스크린샷 비교
- P7.4 이력서 페이지 시각 변화 0 확인
- P7.5 `web-design-guidelines` 스킬 감사
- P7.6 `code-reviewer` 에이전트 최종 리뷰

**산출물:** 검증 리포트
**검증:** 모든 acceptance criteria 통과

---

## 12. Acceptance Criteria

| ID | 기준 | 측정 방법 |
|---|---|---|
| AC1 | 모든 기존 콘텐츠·카피가 1:1로 보존됨 | diff 검사 (텍스트만) |
| AC2 | 이력서 페이지에 시각 변화 0 | 스크린샷 before/after |
| AC3 | editorial/v2 관련 파일 0개 잔존 | grep |
| AC4 | DESIGN.md 루트 존재, 11섹션 완비 (한/영) | 파일 검사 |
| AC5 | 8개 모션 컴포넌트 구현 및 동작 | 시각 확인 |
| AC6 | `prefers-reduced-motion` 시 비필수 모션 OFF | 디바이스 설정 + 스크린샷 |
| AC7 | Lighthouse Performance ≥ 80 (모바일) | Lighthouse CLI |
| AC8 | Lighthouse Accessibility ≥ 95 | Lighthouse CLI |
| AC9 | `npm run build` 성공 | CI |
| AC10 | 번들 사이즈 증가 < 50KB gzip | 빌드 출력 비교 |
| AC11 | 기존 색 토큰 삭제 0건 | `global.css` diff |
| AC12 | 웜 팔레트(`#fef9f2`, `--ed-*`) 사용 0건 | grep |
| AC13 | 블로그 MDX 포스트 렌더링 정상 | 시각 확인 |
| AC14 | 키보드 only 탐색 가능 | 수동 테스트 |

---

## 13. Risks & Mitigations

| 리스크 | 영향 | 완화 |
|---|---|---|
| 이력서 페이지 의도치 않은 회귀 | 높음 | Phase 0에서 사용처 grep, Phase 7에서 스크린샷 비교 |
| 모션 과다로 성능 저하 | 중 | Lighthouse 게이트, Astro `client:visible`로 지연 로드 |
| motion 패키지 번들 증가 | 중 | tree-shaking, 필요한 import만 |
| 레이아웃 변경으로 모바일 깨짐 | 중 | Phase 6에서 반응형 전수 검증 |
| editorial 삭제 시 알 수 없는 참조 발견 | 중 | Phase 0에서 grep 선행, 사용자 승인 |
| MDX 블로그 렌더링 간섭 | 높음 | 블로그 본문은 정적 유지, 모션은 메타·레이아웃에만 |
| `prefers-reduced-motion` 누락 | 높음 | `useReducedMotion` 훅을 모든 모션 컴포넌트에 강제 |
| 색 시스템 의도치 않은 변경 | 중 | `global.css`는 추가만 허용, 기존 값 수정 금지 |
| 프로젝트 상세 메타 필드 부재 | 낮음 | Phase 4 P4.1에서 먼저 확인, 없으면 사이드 레일 생략 |
| 블로그 포스트 heading 부재 | 낮음 | Phase 5 P5.1에서 먼저 확인, 없으면 TOC 자동 숨김 |

---

## 14. User Decisions (결정된 오픈 퀘스천)

| Q | 질문 | 결정 |
|---|---|---|
| Q1 | 모션 라이브러리 `motion` 추가 OK? | ✅ 추가 가능 |
| Q2 | 블로그 루트 경로(`/src/pages/blog/`)를 ko/en과 동일 디자인으로? | ✅ 동일 디자인 |
| Q3 | editorial/v2 완전 삭제 vs archive 보존? | ✅ 완전 삭제 (archive 없음) |
| Q4 | PRD를 파일로 저장? | ✅ `PRD-redesign.md` 저장 (이 파일) |
| Q5 | 프로젝트 메타 사이드 레일에 쓸 필드가 존재? | ⏳ Phase 4에서 확인 (조건부 구현) |
| Q6 | 블로그 스티키 TOC용 heading 존재? | ⏳ Phase 5에서 확인 (조건부 구현) |
| Q7 | DESIGN.md 작성 언어? | ✅ 한국어 + 영어 이중 |

---

## 15. Success Metrics (실행 후)

- ✅ 에디토리얼 리듬을 가진 단일 디자인 시스템
- ✅ 8종 인터랙션 + 접근성 완벽 대응
- ✅ DESIGN.md로 미래 작업의 기준선 확보
- ✅ Lighthouse Performance 80+, Accessibility 95+
- ✅ 콘텐츠·이력서 회귀 0건

---

## 16. 실행 개시 조건

다음 체크리스트가 모두 OK일 때 Phase 0 시작:

- [x] PRD 파일 저장 완료
- [x] Q1~Q4, Q7 결정 완료
- [ ] 사용자가 "시작해" 또는 "Phase 0 GO" 신호
- [ ] Q5, Q6은 해당 Phase 진입 시점에 확인 (사전 결정 불필요)

---

**End of PRD**

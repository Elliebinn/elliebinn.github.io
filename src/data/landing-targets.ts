/**
 * 공고별 맞춤 랜딩 페이지 데이터
 *
 * - 각 entry는 /ko/for/[company] 라우트에서 사용됨
 * - source: career-planner/reports/{n}-{company}-*.md Block E 기반
 * - 컬러/문구/프로젝트 매칭 이유를 데이터로 주입하여 회사별 고유 경험 생성
 * - noIndex: true → 검색엔진 미노출 (링크 아는 사람만 접근)
 */

export interface LandingTarget {
  /** 회사 표시명 */
  company: string;
  /** 공고 직무명 */
  role: string;
  /** 공고 링크 */
  jobUrl?: string;
  /** 공고 링크 버튼 라벨 (없으면 기본값) */
  jobUrlLabel?: string;

  /** 1순위 헤드라인 — 첫 화면에 큰 글씨로 */
  headline: string;
  /** 서브 헤드라인 — 3~4줄 이내 */
  subheadline: string;

  /**
   * 회사 아이덴티 시그널 컬러.
   * 본 사이트 톤을 유지하되 CTA · 헤어라인 · 수치 강조에만 한정 적용.
   */
  brand: {
    /** primary hex (예: Toss Blue `#0064FF`) */
    primary: string;
    /** 살짝 깔리는 배경 틴트 — 8~12% 투명도 컬러 (예: `rgba(0,100,255,0.06)`) */
    tint: string;
    /** 브랜드 공식 명칭 — alt text/주석용 */
    label: string;
  };

  /** 증거 포인트 — 3개가 최적. 모바일에서도 한 줄에 들어감 */
  proofPoints: { label: string; value: string; detail?: string }[];

  /** "왜 이 회사에" 메시지 — Hero 바로 다음 섹션으로 배치됨 */
  whyCompany: string;

  /** JD 키워드 기반 재배치된 역량 — 각 항목에 근거 프로젝트/경험 연결 */
  highlightSkills: {
    name: string;
    /** 근거 — 프로젝트 slug 또는 짧은 증거 문구 */
    evidence: string;
  }[];

  /**
   * 강조할 프로젝트 — 공고와 어떻게 매칭되는지 한 줄 설명 포함.
   * slug는 src/data/projects.ts 기준.
   */
  projectMatches: {
    slug: string;
    title: string;
    whyMatch: string;
  }[];

  /** CTA 섹션의 직접적 지원 메시지 (예: "... 포지션에 지원합니다.") */
  ctaMessage: string;

  /**
   * 맞춤 이력서 본문 — /ko/for/{company}/resume 페이지에서 렌더링됨.
   * 브라우저에서 ⌘+P 로 바로 PDF 변환 가능 (@media print CSS 적용).
   * - 문자열 안 `**텍스트**` 는 `<strong>` 으로 렌더링됨 (간이 마크다운)
   * - cv.md 원문 기반. 허위 사실 금지. 재배치/재표현만.
   */
  tailoredResume: {
    /** Professional Summary — 한 문단 */
    summary: string;
    /** Core Competencies — 카테고리별 그룹 */
    competencies: { label: string; items: string }[];
    /** Work Experience — JD 관련도 순 재배치 */
    experiences: {
      company: string;
      team?: string;
      period: string;
      employment?: string;
      subtitle: string;
      sections: {
        heading: string;
        bullets: string[];
      }[];
    }[];
    /** Side Project (있으면) */
    sideProject?: {
      title: string;
      meta: string;
      subtitle: string;
      bullets: string[];
    };
    /** Education */
    education: { school: string; degree: string; period: string }[];
    /** Certifications */
    certifications: { name: string; date: string }[];
    /** Languages */
    languages: string;
  };

  /** 검색엔진 노출 여부 */
  noIndex: boolean;
  /** 리포트 작성일 — 신선도 표시용 */
  updatedAt: string;
}

export const landingTargets: Record<string, LandingTarget> = {
  channeltalk: {
    company: '채널톡 (Channel Corp)',
    role: 'Product Manager (PM)',
    jobUrl: 'https://channel.io/ko/careers/6d95cc84-7664-438d-a841-4dc10ca79d26',
    jobUrlLabel: '채널톡 PM 채용 공고 ↗',

    headline: 'B2B SaaS 제품을 AI로 직접 만들고, 빠르게 개선하는 PM입니다.',
    subheadline:
      '알파브릿지에서 퀀트 리서치팀의 전략 대시보드를 IA 재설계부터 React 마이그레이션까지 End-to-End로 리딩했습니다. 3주 견적 작업을 5일에 완료하며 AI 코딩 도구로 빠른 실행력을 증명했고, 사이드로는 6개 에이전트가 토론하는 멀티에이전트 주식 분석 플랫폼(주주톡)을 1인으로 기획·개발했습니다.',

    brand: {
      primary: '#FF6060',
      tint: 'rgba(255, 96, 96, 0.06)',
      label: 'Channel Talk Red',
    },

    proofPoints: [
      {
        label: '마이그레이션 속도',
        value: '70%',
        detail: '3주 견적 → 5일 완료 · NiceGUI → React(Vite) 20+ 페이지',
      },
      {
        label: 'AI 멀티에이전트',
        value: '6+4',
        detail: '6개 분석 에이전트 + 4명 투자 페르소나 토론 구조 설계',
      },
      {
        label: '업무 자동화',
        value: '83%',
        detail: '매매·운용시간 단축 · AI 운용지원 시스템 기획',
      },
    ],

    whyCompany:
      '채널톡은 ALF v2로 80%+ 자동화율을 달성하며 AI 에이전트를 실제 고객사에 배포하는 몇 안 되는 B2B SaaS입니다. 제가 주주톡에서 설계한 멀티에이전트 구조와 알파브릿지에서 검증한 "빠른 실행 → 사용자 피드백 → 즉시 개선" 사이클이 채널톡의 "Ship fast, learn fast, iterate" 문화와 정확히 일치합니다. 고객 VOC를 제품에 반영하는 경험을 채널톡의 15만+ 브랜드 스케일에서 다시 검증하고 싶습니다.',

    highlightSkills: [
      { name: 'B2B SaaS 제품 기획', evidence: '알파브릿지 퀀트 대시보드 · 200+ 전략 관리' },
      { name: 'AI 에이전트 설계', evidence: '주주톡 6 에이전트 + 4 페르소나 토론 구조' },
      { name: '빠른 실행력', evidence: '3주→5일 마이그레이션 · AI 코딩 도구 활용' },
      { name: 'SQL · 데이터 분석', evidence: 'SQL 개발자 자격증 · 퍼널 관리 경험' },
      { name: '고객 중심 기획', evidence: '운용역 워크플로우 관찰 → 요건정의서 작성' },
      { name: '크로스펑셔널 협업', evidence: '퀀트 리서치팀 · 외부 UX 디자이너 협업' },
      { name: '풀스택 빌더', evidence: 'Python · FastAPI · React · TypeScript · Claude API' },
      { name: '성과 측정', evidence: '83% 시간 단축 · 70% 개발 기간 단축' },
    ],

    projectMatches: [
      {
        slug: 'quant-platform',
        title: '퀀트 리서치 플랫폼',
        whyMatch:
          'B2B SaaS 내부 도구를 IA 재설계부터 React 마이그레이션까지 End-to-End로 리딩. 200+ 전략 탐색 구조를 태그 기반으로 재편하고, 3주 견적을 5일에 완료한 빠른 실행력 증명. 채널톡의 "Ship fast, learn fast" 문화와 정합.',
      },
      {
        slug: 'jujutok',
        title: '주주톡',
        whyMatch:
          '6개 AI 에이전트 + 4명 페르소나가 토론하는 멀티에이전트 구조를 1인으로 기획·설계·구현. ALF v2와 유사한 AI 자동화 시스템을 End-to-End로 경험. 채널톡의 AI-first CX 플랫폼 비전과 직접 연결.',
      },
    ],

    ctaMessage: '채널톡 Product Manager (PM) 포지션에 지원합니다.',

    tailoredResume: {
      summary:
        '**B2B SaaS 제품을 AI로 직접 만들고, 빠르게 개선하는 Product Manager.** 알파브릿지에서 퀀트 리서치팀의 전략 대시보드를 IA 재설계부터 React 마이그레이션까지 End-to-End로 리딩했습니다. **3주 견적 작업을 5일에 완료**하며 AI 코딩 도구로 빠른 실행력을 증명했고, 사이드 프로젝트로 **6개 에이전트가 토론하는 멀티에이전트 주식 분석 플랫폼(주주톡)**을 1인으로 기획·개발했습니다. 에셋플러스에서는 AI 공모펀드 운용지원 시스템을 기획해 **매매·운용시간을 83% 단축**시켰고, 38개 AI 투자 알고리즘의 로보어드바이저 심사를 PM으로 주도해 전원 통과시켰습니다.',

      competencies: [
        {
          label: 'B2B SaaS · 제품 기획',
          items:
            '내부 사용자 대시보드 기획 · 정보구조(IA) 재설계 · 요건정의서 작성 · 디자인 시스템 구축',
        },
        {
          label: 'AI · 에이전트',
          items:
            'AI 에이전트 설계 · 멀티에이전트 구조 · Claude API · 프롬프트 엔지니어링 · AI 코딩 도구 (Claude Code)',
        },
        {
          label: '빠른 실행 · 개발',
          items:
            'Python · FastAPI · React · TypeScript · Vite · NiceGUI · 프레임워크 마이그레이션',
        },
        {
          label: '데이터 · 분석',
          items: 'SQL (SQLD 자격증) · ClickHouse · MySQL · Pandas · 퍼널 관리 · 성과 측정',
        },
        {
          label: '고객 중심 · 협업',
          items:
            'VOC 기반 기획 · 사용자 워크플로우 관찰 · 크로스펑셔널 협업 (퀀트 리서치팀, UX 디자이너)',
        },
        {
          label: '금융 도메인',
          items: '투자자산운용사 · AFPK · 증권/파생/펀드투자권유자문인력 (총 6개 자격증)',
        },
      ],

      experiences: [
        {
          company: '알파브릿지',
          team: '포트폴리오본부',
          period: '2025.03 – 현재',
          employment: '에셋플러스자산운용 자회사 · 정규직',
          subtitle: '퀀트 리서치팀 전략 모니터링·성과 분석 대시보드 기획 (B2B SaaS 내부 도구)',
          sections: [
            {
              heading: 'B2B SaaS 제품 기획 · IA 재설계 · 고객 중심 접근',
              bullets: [
                '펀드 운용 경험을 바탕으로 **사용자 요청 뒤 진짜 니즈를 파악**하여 리밸런싱 포인트 네비게이션, 태그 기반 전략 분류 등 **요청에 없던 기능 선제 설계**',
                '**200개+ 전략 탐색 구조를 태그 기반 분류 체계로 재편**하고, 사이드바 13개 메뉴를 워크플로우 기반으로 재구조화',
                '외부 UX/UI 디자이너 2인 피드백(2.5/5, 3.9/5)을 **7개 요구사항으로 분해**한 뒤, Bloomberg·Morningstar 등 14개 레퍼런스를 참조해 개선',
              ],
            },
            {
              heading: '빠른 실행력 · 프레임워크 마이그레이션 (NiceGUI → React Vite)',
              bullets: [
                '내부 사용자 확장으로 NiceGUI 서버 부하 한계에 도달하자 **20+ 페이지 전체를 React(Vite)로 재구축. 3주 견적 작업을 5일에 완료 (약 70% 단축)**',
                '이주 전 선제적으로 구축한 Living PRD, 자체 개발 Claude Code 스킬 **mockup-apply**, 의미 기반 CSS 변수 토큰을 재활용하여 반복 작업 제거',
                '빌드 시간 8s → **741ms**, HMR 즉시. URL·디자인 토큰 100% 유지로 사용자 공지 없이 무중단 배포',
              ],
            },
            {
              heading: 'AI 구현 품질 관리 워크플로우 구축',
              bullets: [
                '**mockup-apply**: HTML 목업을 코드에 적용할 때 ADD/CHANGE/KEEP 판단 프레임워크로 변경 범위 체계화, 기존 기능 100% 보존',
                '**frontend-checkpoint**: git stash 기반 변경 전·후 스크린샷 자동 비교 + 11개 체크포인트로 UI 변경 정량 추적',
                '두 프로세스를 Claude Code 스킬로 체계화하여 **반복 실행 가능한 워크플로우**로 구축',
              ],
            },
          ],
        },
        {
          company: '에셋플러스자산운용',
          team: 'AI자산운용팀',
          period: '2023.09 – 2025.03',
          employment: '정규직 (2023.11 - 2025.03 알파브릿지 겸임·상주)',
          subtitle: 'AI 공모펀드 기획·출시 · 로보어드바이저 운용심사 PM',
          sections: [
            {
              heading: 'AI 운용지원 시스템 기획 (업무 자동화 83% 단축)',
              bullets: [
                'AI 공모펀드 4개의 일일 매매·운용·성과분석 업무를 위한 내부 시스템 기획. **운용역 실제 워크플로우를 관찰**해 자동화 가능한 단계와 사람 판단이 필요한 단계를 분리하고 요건정의서 작성',
                '매매·운용시간 평균 **1시간+ → 10분** 내외로 단축 (**83% 감소**)',
              ],
            },
            {
              heading: '로보어드바이저 AI 알고리즘 기획 및 운용심사 (RATB 22~24차)',
              bullets: [
                'KOSCOM 로보어드바이저 테스트베드에서 AI 투자 알고리즘의 운용 능력을 심사받는 과정. 참여 신청부터 사전심사·본심사·재운용심사까지 전 과정을 **PM으로 주도**',
                '**38개 AI 투자 알고리즘**의 사전심사~본심사~재운용심사 전 과정 관리 및 심사 발표 직접 수행',
                'AI 전략 검증 과정에서 반복되는 작업의 병목을 파악하고 자동화 가능 영역을 식별하여 검증 프로세스 효율화에 기여',
                '22~24차 운용심사 및 재운용심사 **전 알고리즘 통과** · 최고 수익률 **1년 19.5%** (2024.12 기준)',
              ],
            },
            {
              heading: 'AI 기반 금융 투자 상품 기획 (공모펀드 · 외부 컨설팅)',
              bullets: [
                '**S&P500 AI 공모펀드 출시**: 같은 유니버스에서 투자 목적에 따라 AI 종목 선정 기준을 다르게 적용해 성장주·배당주 포커스를 분리한 구조 설계. **현재 실제 고객 자금 운용 중**',
                '외부 자산운용사·증권사 대상 AI 포트폴리오 컨설팅. 비정형 데이터(뉴스)를 LLM으로 분석하여 투자 유니버스를 구성하고 AI 모델로 종목 선별. LLM 기반 **XAI(종목 선정 근거 자연어 설명)** 포함 기획서 작성 → **다올자산운용 MOU 체결**',
              ],
            },
          ],
        },
      ],

      sideProject: {
        title: '주주톡 — AI 멀티에이전트 주식 분석 플랫폼',
        meta: '1인 기획 · 풀스택 개발',
        subtitle: '"단일 AI의 편향을 시스템 구조로 해결할 수 있을까?"',
        bullets: [
          '**6개 AI 에이전트**(거시·기술·공시·뉴스·재무·온체인)로 분석 축을 분리하고, **4명 투자 페르소나**(가치·성장·거시·모멘텀)가 **3 라운드 토론**하는 구조 설계',
          '서비스 컨셉·정보구조·UX 플로우 직접 설계 후 **FastAPI + React 19 + Claude API**로 풀스택 구현',
          'SSE(Server-Sent Events)로 실시간 토론 스트리밍, 카카오톡 스타일 채팅 UI, 사용자 질문 기능 구현',
        ],
      },

      education: [
        {
          school: 'Johns Hopkins University',
          degree: 'B.A. Economics · Minor in Marketing',
          period: '2017.08 – 2019.05',
        },
        {
          school: 'Fullerton College',
          degree: 'A.A. Economics',
          period: '2016.01 – 2017.05',
        },
      ],

      certifications: [
        { name: 'SQL 개발자 (SQLD)', date: '2026.03' },
        { name: '증권투자권유자문인력', date: '2024.05' },
        { name: '파생상품투자권유자문인력', date: '2024.02' },
        { name: '펀드투자권유자문인력', date: '2023.12' },
        { name: 'AFPK', date: '2022.04' },
        { name: '투자자산운용사', date: '2021.12' },
      ],

      languages: '한국어 (모국어) · 영어 (비즈니스 고급 · 미국 대학 졸업)',
    },

    noIndex: true,
    updatedAt: '2026-04-21',
  },

  tossbank: {
    company: '토스뱅크',
    role: 'Product Manager (LLM)',
    jobUrl:
      'https://toss.im/career/job-detail?job_id=7569679003&sub_position_id=7611090003&company=%ED%86%A0%EC%8A%A4%EB%B1%85%ED%81%AC',
    jobUrlLabel: '토스뱅크 채용 페이지 ↗',

    headline: 'LLM을 금융 제품에 직접 연결해본 사람입니다.',
    subheadline:
      '에셋플러스에서 AI 공모펀드 2건을 End-to-End로 출시하고, KOSCOM RATB에서 38개 AI 투자 알고리즘의 운용심사 전 과정을 PM으로 주도해 전원 통과시켰습니다. 사이드로는 6개 에이전트가 토론하는 멀티에이전트 주식 분석 플랫폼을 1인으로 만들었습니다.',

    brand: {
      primary: '#0064FF', // Toss Blue
      tint: 'rgba(0, 100, 255, 0.06)',
      label: 'Toss Blue',
    },

    proofPoints: [
      {
        label: 'AI 투자 알고리즘',
        value: '38',
        detail: 'KOSCOM RATB 22~24차 운용심사 전원 통과',
      },
      {
        label: 'AI 공모펀드',
        value: '2',
        detail: 'S&P500 AI 공모펀드 출시 · 현재 고객 자금 운용',
      },
      {
        label: '운용시간 단축',
        value: '83%',
        detail: '1시간+ → 10분 · AI 운용지원 시스템 기획',
      },
    ],

    whyCompany:
      '토스뱅크는 AI 네이티브 은행을 실제로 표방하는 유일한 1금융권이고, 제가 에셋플러스에서 쌓은 "금융 × AI × 빌더" 세 축이 가장 자연스럽게 제품으로 연결되는 곳입니다. LLM이 금융 규제 안에서 어디까지 자동화할 수 있는지를 End-to-End로 실험해본 기획자는 시장에 드물고, 그 실전을 토스뱅크의 스케일에서 다시 검증해보고 싶습니다.',

    highlightSkills: [
      { name: 'LLM · 멀티에이전트 설계', evidence: '주주톡 6 에이전트 구조 설계' },
      { name: 'ML 제품 End-to-End 리딩', evidence: 'RATB 38개 알고리즘 심사 PM' },
      { name: '금융 도메인 · 규제', evidence: '투자자산운용사 외 자격증 6개' },
      { name: 'Data Scientist · 퀀트 협업', evidence: '알파브릿지 리서치팀 대시보드' },
      { name: '프로덕트 임팩트 측정', evidence: '운용시간 83% 단축' },
      { name: '풀스택 빌더', evidence: 'Python · FastAPI · React · Claude API' },
      { name: '프롬프트 엔지니어링', evidence: '주주톡 3 라운드 토론 구조' },
      { name: 'AI 공모펀드 기획', evidence: 'S&P500 AI 공모펀드 2건 출시' },
    ],

    projectMatches: [
      {
        slug: 'jujutok',
        title: '주주톡',
        whyMatch:
          '6개 AI 에이전트가 토론하는 멀티에이전트 구조를 1인으로 기획·설계·구현. 공고의 "LLM · AI Agent 활용 서비스 경험"을 프로덕션 단위로 증명.',
      },
      {
        slug: 'quant-platform',
        title: '퀀트 리서치 플랫폼',
        whyMatch:
          '퀀트 리서치팀의 200+ 전략 탐색 구조를 IA부터 재설계하고 UX 플로우·디자인 시스템까지 End-to-End로 리딩. 공고의 "복잡한 도메인 요구사항 설계" 스코프와 정합.',
      },
    ],

    ctaMessage: '토스뱅크 Product Manager (LLM) 포지션에 지원합니다.',

    tailoredResume: {
      summary:
        '**LLM과 AI 에이전트를 금융 제품에 직접 연결해본 Product Planner.** 에셋플러스자산운용에서 **AI 공모펀드 2건을 End-to-End로 출시**하고, KOSCOM RATB에서 **38개 AI 투자 알고리즘의 운용심사 전 과정을 PM으로 주도해 전원 통과**시켰습니다. 매매·운용시간을 **83% 단축**한 AI 운용지원 시스템을 기획했고, 사이드 프로젝트로 **6개 에이전트가 토론하는 멀티에이전트 주식 분석 플랫폼(주주톡)**을 1인으로 기획·개발했습니다. 금융 도메인과 AI 제품 개발의 교차점에서 기획·심사·운용·구현을 직접 수행해 왔습니다.',
      competencies: [
        {
          label: 'AI · 개발',
          items:
            'Claude Code · Claude API · AI 에이전트 설계 · 프롬프트 엔지니어링 · 멀티에이전트 구조 설계',
        },
        {
          label: '기획 · UX',
          items: '서비스 기획 · 정보구조(IA) 설계 · 요건정의서 작성 · 디자인 시스템 구축',
        },
        {
          label: '금융 도메인',
          items:
            '로보어드바이저 운용심사 · AI 공모펀드 기획·출시 · 외부 운용사 AI 포트폴리오 컨설팅',
        },
        {
          label: '개발 · 데이터',
          items: 'Python · FastAPI · React · TypeScript · SQL · ClickHouse · MySQL · Pandas',
        },
        {
          label: '협업',
          items:
            '운용역 · 퀀트 리서치팀 · 외부 UX 디자이너 교차기능 협업 · 피드백 루프 설계',
        },
        {
          label: '자격증',
          items:
            '투자자산운용사 · AFPK · 증권/파생/펀드투자권유자문인력 · SQL 개발자 (총 6개)',
        },
      ],
      experiences: [
        {
          company: '에셋플러스자산운용',
          team: 'AI자산운용팀',
          period: '2023.09 – 2025.03',
          employment: '정규직',
          subtitle: 'AI 공모펀드 기획·출시 · 로보어드바이저 운용심사 PM',
          sections: [
            {
              heading: '로보어드바이저 AI 알고리즘 기획 및 운용심사 (RATB 22~24차)',
              bullets: [
                'KOSCOM 로보어드바이저 테스트베드에서 AI 투자 알고리즘의 운용 능력을 심사받는 과정. 참여 신청부터 사전심사·본심사·재운용심사까지 전 과정을 PM으로 주도',
                '**38개 AI 투자 알고리즘**의 사전심사~본심사~재운용심사 전 과정 관리 및 심사 발표 직접 수행',
                'AI 전략 검증 과정에서 반복되는 작업의 병목을 파악하고 자동화 가능 영역을 식별하여 검증 프로세스 효율화에 기여',
                '22~24차 운용심사 및 재운용심사 **전 알고리즘 통과** · 최고 수익률 **1년 19.5%** (2024.12 기준)',
              ],
            },
            {
              heading: 'AI 기반 금융 투자 상품 기획 (공모펀드 · 외부 컨설팅)',
              bullets: [
                '**S&P500 AI 공모펀드 출시**: 같은 유니버스에서 투자 목적에 따라 AI 종목 선정 기준을 다르게 적용해 성장주·배당주 포커스를 분리한 구조 설계. **현재 실제 고객 자금 운용 중**',
                '외부 자산운용사·증권사 대상 AI 포트폴리오 컨설팅. 비정형 데이터(뉴스)를 **LLM으로 분석**하여 투자 유니버스를 구성하고 AI 모델로 종목 선별. LLM 기반 **XAI(종목 선정 근거 자연어 설명)** 포함 기획서 작성 → **다올자산운용 MOU 체결**',
              ],
            },
            {
              heading: 'AI 운용지원 시스템 기획',
              bullets: [
                'AI 공모펀드 4개의 일일 매매·운용·성과분석 업무를 위한 내부 시스템 기획. 운용역 실제 워크플로우를 관찰해 자동화 가능한 단계와 사람 판단이 필요한 단계를 분리하고 요건정의서 작성',
                '매매·운용시간 평균 **1시간+ → 10분** 내외로 단축 (**83% 감소**)',
              ],
            },
          ],
        },
        {
          company: '알파브릿지',
          team: '포트폴리오본부',
          period: '2025.03 – 현재',
          employment: '에셋플러스자산운용 자회사',
          subtitle: '퀀트 리서치팀 전략 모니터링·성과 분석 대시보드 기획',
          sections: [
            {
              heading: '이해관계자 협력 · 도메인 설계',
              bullets: [
                '운용 현장 경험을 바탕으로 사용자가 말하지 않은 진짜 니즈를 파악해 **리밸런싱 포인트 네비게이션, 태그 기반 전략 분류** 등 요청에 없던 기능 선제 설계',
                '200+ 전략 탐색 구조를 태그 기반 IA로 재편, 사이드바 13개 메뉴를 워크플로우 기반으로 재구조화',
                '외부 UX/UI 디자이너 2인 피드백(2.5/5, 3.9/5)을 **7개 요구사항으로 분해**하고 Bloomberg·Morningstar 등 14개 레퍼런스 기반으로 재설계',
              ],
            },
            {
              heading: 'AI 코딩 도구 기반 빠른 프로덕트화',
              bullets: [
                '디자인 시스템 직접 구축 후 AI 코딩 도구로 **HTML 목업 25개를 20+ 분석 페이지로 일관되게 전환**',
                '내부 확장으로 NiceGUI 서버 한계 도달 시 20+ 페이지를 React(Vite)로 재구축 — **3주 견적을 5일에 완료 (70% 단축)**, URL·디자인 토큰 100% 유지로 무중단 배포',
                '반복 프로세스를 Claude Code 스킬(**mockup-apply**, **frontend-checkpoint**)로 체계화하여 AI 구현 품질 관리 워크플로우 구축',
              ],
            },
          ],
        },
      ],
      sideProject: {
        title: '주주톡 — AI 주식 분석 플랫폼',
        meta: '1인 기획 · 풀스택 개발',
        subtitle: '"단일 AI의 편향을 시스템 구조로 해결할 수 있을까?"',
        bullets: [
          '**6개 AI 에이전트**(거시·기술·공시·뉴스·재무·온체인)로 분석 축을 분리하고, **4명 투자 페르소나**(가치·성장·거시·모멘텀)가 **3 라운드 토론**하는 구조 설계',
          '서비스 컨셉·정보구조·UX 플로우 직접 설계 후 **FastAPI + React 19 + Claude API**로 풀스택 구현',
        ],
      },
      education: [
        {
          school: 'Johns Hopkins University',
          degree: 'B.A. Economics · Minor in Marketing',
          period: '2017.08 – 2019.05',
        },
        {
          school: 'Fullerton College',
          degree: 'A.A. Economics',
          period: '2016.01 – 2017.05',
        },
      ],
      certifications: [
        { name: 'SQL 개발자 (SQLD)', date: '2026.03' },
        { name: '증권투자권유자문인력', date: '2024.05' },
        { name: '파생상품투자권유자문인력', date: '2024.02' },
        { name: '펀드투자권유자문인력', date: '2023.12' },
        { name: 'AFPK', date: '2022.04' },
        { name: '투자자산운용사', date: '2021.12' },
      ],
      languages: '한국어 (모국어) · 영어 (비즈니스 고급 · 미국 대학 졸업)',
    },

    noIndex: true,
    updatedAt: '2026-04-09',
  },
};

/**
 * 정적 경로 생성용 — [company].astro 에서 import
 */
export function getLandingTargetSlugs(): string[] {
  return Object.keys(landingTargets);
}

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ★ Resume — Single Source of Truth
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 이 파일 하나를 수정하면 아래 4곳이 모두 업데이트됩니다:
 *   1. Web 이력서       → src/pages/ko/resume.astro       (자동, Astro 빌드 시)
 *   2. PDF 이력서       → src/pages/ko/resume-pdf.astro   (자동, Astro 빌드 시)
 *   3. Obsidian 원본    → ~/Desktop/obsidian/hyebin-vault/3-career/resume/resume-common.md
 *                        (npm run sync:resume 실행 필요)
 *   4. LinkedIn About ko → ~/Desktop/obsidian/hyebin-vault/3-career/linkedin-about.md
 *                        (npm run sync:resume 실행 필요, ko 섹션만. en은 수동 유지)
 *
 * 업데이트 워크플로우:
 *   1) 이 파일(resume.ts) 수정
 *   2) `npm run sync:resume`  (Obsidian 파일 두 개 regenerate)
 *   3) `npm run resume:audit` (4개 파일 일관성 검사)
 *   4) Web/PDF는 Astro dev 서버 또는 빌드로 자동 반영됨
 *
 * 포맷 규칙:
 *   - 불릿 문자열 안에서 **단어**는 bold로 렌더링됩니다 (모든 렌더러 공통).
 *   - Markdown과 같은 문법이지만 Astro/HTML 렌더러가 <strong>으로 변환.
 *   - LinkedIn 제너레이터는 bold 마커를 평문으로 strip합니다 (LinkedIn About은 bold 미지원).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

// ─── Types ──────────────────────────────────────────────────────────────

export type ResumeProject = {
  title: string;
  /** Optional italic description line shown under the project title */
  description?: string;
  /** Optional period for the project (e.g., "2025.03 - 현재") */
  period?: string;
  bullets: string[]; // use **bold** markers inline
};

export type ResumeJob = {
  company: string;
  department?: string;
  org?: string; // subline under company (e.g. "에셋플러스자산운용 자회사 · 정규직")
  period: string; // "2025.03 - 현재"
  projects: ResumeProject[];
};

export type ResumeSideProject = {
  title: string;
  sub: string; // "AI 주식 분석 플랫폼"
  role: string; // "1인 기획 · 풀스택 개발"
  quote: string;
  bullets: string[];
};

export type ResumeEducation = {
  name: string;
  degree: string;
  period: string;
};

export type ResumeCertification = {
  name: string;
  date: string;
};

export type ResumeSkillRow = {
  label: string; // "기획 · UX"
  items: string; // joined string "서비스 기획 · 정보구조(IA) 설계 · ..."
};

export type ResumeData = {
  name: { ko: string; en: string };
  role: string; // "AI Product Planner · Finance Domain"
  headline: {
    /** Lead line of the hero heading (web only) */
    lead: string;
    /** Accent line that wraps to a new line (web only) */
    accent: string;
  };
  contact: {
    phone: string;
    email: string;
    github: string;
    githubUrl: string;
    portfolio: string;
    portfolioUrl: string;
    linkedinUrl?: string;
    location?: string;
  };
  summary: {
    lead: string; // one-sentence positioning
    body: string; // multi-sentence context
  };
  jobs: ResumeJob[];
  sideProject: ResumeSideProject;
  education: ResumeEducation[];
  certifications: ResumeCertification[];
  skills: ResumeSkillRow[];
  language: {
    primary: string;
    note?: string;
  };
  /** LinkedIn About — fields that only appear in the LinkedIn ko section */
  linkedin: {
    headline: string; // "[💼금융을 알고, AI로 직접 만드는 기획자]"
    intro: string; // "AI 서비스 기획자 우혜빈입니다. ..."
    currentRole: string[]; // bullet points
    expertise: string[];
    achievements: string[];
  };
};

// ─── Data ───────────────────────────────────────────────────────────────

export const resume: ResumeData = {
  name: {
    ko: '우혜빈',
    en: 'Hye Bin Woo',
  },
  role: 'AI Product Manager · Finance Domain',
  headline: {
    lead: '금융 도메인을 알고,',
    accent: 'AI로 직접 만드는 서비스 기획자.',
  },
  contact: {
    phone: '010-4999-1517',
    email: 'elliebinn@gmail.com',
    github: 'github.com/Elliebinn',
    githubUrl: 'https://github.com/Elliebinn',
    portfolio: 'elliebinn.github.io',
    portfolioUrl: 'https://elliebinn.github.io',
    linkedinUrl: 'https://www.linkedin.com/in/hyebin-woo-62a261291/',
    location: '서울 · 성남',
  },
  summary: {
    lead: '금융 도메인을 알고, AI로 직접 만드는 서비스 기획자입니다.',
    body:
      '에셋플러스자산운용에서 AI 공모펀드 운용지원 시스템을 기획하여 매매·운용시간 **83% 단축**을 이끌었고, \n**38개 AI 투자 알고리즘**의 로보어드바이저 심사를 **PM으로 주도**했습니다.\n현재는 자회사인 알파브릿지에서 퀀트 리서치팀이 매일 사용하는 전략 모니터링·운용 관리 대시보드를 처음부터 다시 설계하고 있으며, 화면 설계부터 AI 코딩 도구를 활용한 **구현·품질 검증까지 직접 책임지고** 수행합니다. \n사이드 프로젝트로 주식 데이터를 AI가 분석하여 투자 인사이트를 생성하는 파이프라인을 설계하고 품질 검증까지 1인으로 수행하고 있습니다.',
  },
  jobs: [
    {
      company: '알파브릿지',
      department: '포트폴리오본부',
      org: '에셋플러스자산운용 자회사 · 정규직',
      period: '2025.04 - 현재',
      projects: [
        {
          title: '전략 모니터링·성과 분석·운용 관리 대시보드 서비스 기획',
          period: '2025.07 - 현재',
          bullets: [
            '리서처·운용매니저가 약 500개 AI 전략을 판단할 수 있도록, 운용 경험 기반으로 **성과 시각화·매매 검증·종목 분석 화면을 직접 설계**하고 AI 도구로 구현',
            '성과 차트에 학습/검증 기간 분리 표시로 **과적합 판단**, 종목 드릴다운 → 캔들차트로 **AI 매매 논리 검증**, 분포차트로 **시그널×변동성 분포 시각화**',
            '화면 구현 중 샤프지수 산식 오류 등 지표 품질 문제를 직접 감지하여 **10개 지표 산식을 표준화**하여 통합된 정의 사용',
            '리서처·운용매니저의 실사용 피드백을 **1~2일 사이클**로 빠르게 수렴하여 화면을 반복 개선. UX/UI 전문가 평가 56% 개선',
          ],
        },
        {
          title: 'AI 도구 활용 구현 및 품질 관리',
          period: '2025.07 - 현재',
          bullets: [
            'NiceGUI 서버 부하 한계 도달 시 React(Vite) 전환을 결정. 선제적으로 준비한 PRD·디자인 토큰·자체제작 스킬의 재활용으로 **3주 견적을 1주일에 완료**',
            'AI 구현 중 기존 기능 유실 문제를 발견하고 변경 범위(**ADD/CHANGE/KEEP**)와 시각 회귀 검증이라는 품질 기준을 정의. AI에 맡길 영역과 사람이 판단할 영역을 분리하는 검증 워크플로우를 체계화',
          ],
        },
      ],
    },
    {
      company: '에셋플러스자산운용',
      department: 'AI자산운용팀',
      org: '정규직 (2023.09 - 2025.03 알파브릿지 파견 겸직)',
      period: '2023.09 - 2025.03',
      projects: [
        {
          title: '로보어드바이저 AI 알고리즘 기획 및 운용심사 (RATB 22~24차)',
          period: '2023.11 - 2025.03',
          description:
            '코스콤 로보어드바이저 테스트베드에서 AI 투자 알고리즘의 운용 능력을 심사받는 과정. 참여 신청부터 사전심사·본심사·사후운용심사까지 전 과정을 PM으로 주도.',
          bullets: [
            '**38개 AI 투자 알고리즘**의 심사 전 과정을 관리하고 심사위원회 발표를 직접 수행. 퀀트팀과 협업하여 투자 유니버스 확장 방향을 제안',
            '금융 AI 규제 심사기준에 맞춰 알고리즘 적합성을 검증하고, 반복 병목을 파악하여 검증 프로세스를 효율화',
            '22~24차 운용심사 및 사후운용심사 전 알고리즘 통과.',
          ],
        },
        {
          title: 'S&P500 AI 공모펀드 출시 지원',
          period: '2024.06 - 2024.09',
          bullets: [
            'AI가 구성한 포트폴리오의 실제 매매·리밸런싱을 직접 수행하며 일일 운용 워크플로우의 병목을 체감 → 이후 운용지원 시스템 기획의 출발점',
            'S&P500 AI 공모펀드 2건 출시 (현재 상장·운용 중)',
          ],
        },
        {
          title: '외부 자산운용사 컨설팅',
          period: '2024.12 - 2025.02',
          bullets: [
            '외부 자산운용사 대상 AI 포트폴리오 제안서를 직접 작성. 고객사의 XAI(종목 선정 근거) 니즈를 포착하여 기획안에 반영',
            '다올자산운용 MOU 체결',
          ],
        },
        {
          title: 'AI 운용지원 시스템 기획',
          period: '2024.11 - 2025.02',
          bullets: [
            '직접 4개 AI 펀드의 일일 운용을 수행하며 3개 시스템 분산·수동 파일 업로드 등 병목을 체감. 분산된 시스템을 **통합한 모니터링 시스템 화면을 도식화**하고 요건정의서를 직접 작성하여 통합 모니터링 시스템 기획',
            '매매·운용시간 1시간 30분 → 10~20분으로 단축 (**83% 감소**). 5개 분산 화면을 **단일 모니터링 대시보드로 통합**',
          ],
        },
      ],
    },
  ],
  sideProject: {
    title: '주주곰',
    sub: 'AI 주식 분석 서비스 (개인 프로젝트)',
    role: '1인 기획 · 개발 진행 중',
    quote: '',
    bullets: [
      '현업에서 경험한 전문가 분석 과정을 비전문가 언어로 번역하는 AI 분석 서비스를 기획. **6개 전문 에이전트 분석과 4인 페르소나 토론**으로 종합 판단하는 파이프라인을 설계·구현',
      'AI가 하나의 답을 내리지 않고 결론 1줄에서 핵심 근거 3개, 에이전트별 상세 순서로 **판단 근거를 단계적으로 공개**하여 사용자가 직접 판단할 수 있는 정보 구조 설계',
      '실사용자(부모님) 관찰에서 능동적 검색이 일어나지 않는 것을 발견하고 홈 화면을 **AI 모닝 브리핑**으로 전환. 피드백에서 수정까지 하루 단위 사이클로 반복 개선',
    ],
  },
  education: [
    {
      name: 'Johns Hopkins University',
      degree: 'B.A. Economics · Minor in Marketing',
      period: '2017.08 - 2019.05',
    },
    {
      name: 'Fullerton College',
      degree: 'Economics',
      period: '2016.01 - 2017.05',
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
  skills: [
    {
      label: '기획 · UX',
      items: '서비스 기획 · 정보구조(IA) 설계 · UX 재설계 · 요건정의서 작성',
    },
    {
      label: 'AI · 도구',
      items: 'Claude Code/API · AI 에이전트 설계 · Python · SQL · GitHub',
    },
  ],
  language: {
    primary: '한국어 (모국어) · 영어 (비즈니스 고급)',
    note: '미국 대학 졸업 (Johns Hopkins University)',
  },
  linkedin: {
    headline: '[💼금융을 알고, AI로 직접 만드는 기획자]',
    intro:
      'AI 서비스 기획자 우혜빈입니다.\n에셋플러스자산운용에서 AI 공모펀드 운용지원 시스템을 기획하고, 지금은 핀테크 자회사인 알파브릿지에서 그 도메인 지식을 기획과 직접 구현에 연결하고 있어요.',
    currentRole: [
      '전략 모니터링·성과 분석·운용 관리 내부 대시보드 서비스 기획 및 UX 개선 주도',
      '프론트 0명 팀에서 화면 설계부터 AI 코딩 도구로 구현·검증까지 직접 책임',
      'AI 멀티에이전트 주식 분석 서비스 (주주곰) 1인 기획·개발 중',
    ],
    expertise: [
      '서비스 기획 · UX 설계 · 정보구조(IA) 재설계',
      '금융 도메인 이해 기반 기획 (공모펀드 · ETF · 퀀트 리서치 · 금융 AI 규제)',
      'AI 에이전트 설계 · AI 도구 활용 구현',
    ],
    achievements: [
      '로보어드바이저 알고리즘 38개 심사를 PM으로 주도 (RATB 22~24차)',
      'S&P500 AI 공모펀드 2건 출시 지원',
      '내부 운용지원 시스템 기획 주도, 매매운용시간 83% 단축',
      '전략 모니터링·성과 분석 대시보드 — 약 500개 전략의 성과 시각화·AI 매매 논리 검증·지표 표준화를 직접 설계·구현',
      '프레임워크 이주 (NiceGUI에서 React/Vite) — 3주 견적을 1주일에 완료',
    ],
  },
};

// ─── Render Helpers ─────────────────────────────────────────────────────

/**
 * Convert **bold** markers to HTML <strong> tags.
 * Used by both Astro pages and markdown-to-HTML paths.
 */
export function boldToHtml(text: string, strongClass = ''): string {
  const attr = strongClass ? ` class="${strongClass}"` : '';
  return text.replace(/\*\*([^*]+)\*\*/g, `<strong${attr}>$1</strong>`);
}

/**
 * Strip **bold** markers entirely. Used for LinkedIn About (no bold support).
 */
export function stripBold(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, '$1');
}

/**
 * Keep **bold** markers as-is. Used for Markdown output (resume-common.md).
 */
export function keepBold(text: string): string {
  return text;
}

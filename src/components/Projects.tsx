import type { Lang } from '../i18n/translations';
import TiltCard from './motion/TiltCard';
import ScrollReveal from './motion/ScrollReveal';

const BASE = import.meta.env.BASE_URL;

interface ProjectItem {
  number: string;
  category: string;
  title: string;
  desc: string;
  tags: string[];
  year: string;
  img: string;
  href: string;
  cta: string;
}

const projectsData: Record<Lang, ProjectItem[]> = {
  ko: [
    {
      number: '01',
      category: '서비스 기획 · 화면 설계 · 프론트',
      title: 'Alpha Storage — 전략 저장·운영·발행',
      desc: '단일전략을 합성전략으로 조합하고 고객에게 발행하는 전략 자산 원장. 17개 화면의 정보구조와 3축 상태 모델을 설계하고 프론트까지 구현했어요.',
      tags: ['FinTech', 'IA · 상태 모델', 'Design → Code'],
      year: '2026',
      img: 'images/alpha-storage/composite-composition.png',
      href: '/ko/work/alpha-storage/',
      cta: '케이스 스터디 보기',
    },
    {
      number: '02',
      category: '서비스 기획 · IA',
      title: '퀀트 전략 분석 플랫폼',
      desc: '리서처 4명이 매일 쓰는 도구. 200개+ 전략의 정보구조를 재설계하고, 20개+ 페이지를 직접 설계했어요.',
      tags: ['FinTech UX', 'System Architecture', 'Design System'],
      year: '2024 — Now',
      img: 'assets/landing/project-quant.jpg',
      href: '/ko/projects/quant-platform/',
      cta: '케이스 스터디 보기',
    },
    {
      number: '03',
      category: 'AI 설계 · 기획 · 개발',
      title: '주주톡: AI 주식 분석',
      desc: '6개 AI 에이전트가 병렬 분석하고, 4명의 투자 페르소나가 토론하는 구조를 설계했어요. 혼자 기획부터 개발까지.',
      tags: ['Multi-Agent', 'Solo Build', 'LLM'],
      year: '2025',
      img: 'assets/landing/project-jujutok.jpg',
      href: '/ko/projects/jujutok/',
      cta: '케이스 스터디 보기',
    },
    {
      number: '04',
      category: '알고리즘 운용 · 심사',
      title: 'RATB 로보어드바이저 운용',
      desc: '38개 AI 투자 알고리즘을 기획하고, 200개 계좌를 동시에 관리하는 프로세스를 설계했어요. 22~24차 전원 통과.',
      tags: ['Robo-Advisor', 'Algorithm', 'Process'],
      year: '2022 — 2024',
      img: 'assets/landing/project-ratb.jpg',
      href: '/ko/blog/2024-01-15-ratb-ai-national-exam/',
      cta: '관련 글 보기',
    },
    {
      number: '05',
      category: '워크플로우 · 자동화',
      title: 'AI 운용지원 시스템',
      desc: '운용역 워크플로우를 관찰해서 자동화/판단 단계를 분리. 매매·운용시간을 83% 단축했어요.',
      tags: ['Internal Tool', 'Automation', '−83% Time'],
      year: '2023 — 2024',
      img: 'assets/landing/project-aum.jpg',
      href: '/ko/projects/quant-platform/',
      cta: '케이스 스터디 보기',
    },
  ],
  en: [
    {
      number: '01',
      category: 'Service Planning · IA',
      title: 'Quant Strategy Platform',
      desc: 'A tool used daily by 4 researchers. Redesigned the information architecture for 200+ strategies and built 20+ pages from scratch.',
      tags: ['FinTech UX', 'System Architecture', 'Design System'],
      year: '2024 — Now',
      img: 'assets/landing/project-quant.jpg',
      href: '/en/projects/quant-platform/',
      cta: 'Read the case study',
    },
    {
      number: '02',
      category: 'AI Design · Planning · Build',
      title: 'JuJuTok: AI Stock Analysis',
      desc: '6 AI agents analyze in parallel, 4 investor personas debate. Designed and built solo from planning to development.',
      tags: ['Multi-Agent', 'Solo Build', 'LLM'],
      year: '2025',
      img: 'assets/landing/project-jujutok.jpg',
      href: '/en/projects/jujutok/',
      cta: 'Read the case study',
    },
    {
      number: '03',
      category: 'Algorithm · Review',
      title: 'RATB Robo-Advisor',
      desc: 'Planned 38 AI investment algorithms and designed the process for managing 200+ accounts simultaneously. Passed all 22~24 reviews.',
      tags: ['Robo-Advisor', 'Algorithm', 'Process'],
      year: '2022 — 2024',
      img: 'assets/landing/project-ratb.jpg',
      href: '/en/blog/2024-01-15-ratb-ai-national-exam/',
      cta: 'Read related post',
    },
    {
      number: '04',
      category: 'Workflow · Automation',
      title: 'AI Operations Support System',
      desc: 'Observed traders workflow, separated automation from judgment steps. Reduced trading and ops time by 83%.',
      tags: ['Internal Tool', 'Automation', '−83% Time'],
      year: '2023 — 2024',
      img: 'assets/landing/project-aum.jpg',
      href: '/en/projects/quant-platform/',
      cta: 'Read the case study',
    },
  ],
};

const sectionLabel: Record<Lang, string> = {
  ko: '04 / 만들어 온 것들',
  en: '04 / Selected Work',
};

const sectionHeading: Record<Lang, string> = {
  ko: '만들어 온 것들',
  en: 'Selected Work',
};

export default function Projects({ lang = 'en' as Lang }: { lang?: Lang }) {
  const projects = projectsData[lang];
  const total = projects.length;

  return (
    <section
      id="projects"
      className="py-24 sm:py-28"
      style={{ backgroundColor: 'var(--color-bg)', maxWidth: '1440px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}
    >
      {/* Section header */}
      <div
        className="flex items-end justify-between mb-20 pb-8"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div>
          <span
            className="block mb-4 text-[0.625rem] font-bold uppercase tracking-[0.2em]"
            style={{ color: 'var(--color-accent)' }}
          >
            {sectionLabel[lang]}
          </span>
          <h2
            className="text-[2.5rem] font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', letterSpacing: '-0.02em' }}
          >
            {sectionHeading[lang]}
          </h2>
        </div>
        <span
          className="text-[0.625rem] font-bold uppercase tracking-[0.2em] hidden sm:block"
          style={{ color: 'var(--color-text-faint)' }}
        >
          2024 — 2026
        </span>
      </div>

      {/* Project rows */}
      <div>
        {projects.map((p, i) => {
          const isReverse = i % 2 === 1;

          return (
            <ScrollReveal key={i} delay={i * 100} as="article">
              <div
                className={[
                  'grid gap-16 items-center mb-28',
                  'grid-cols-1',
                  isReverse ? 'sm:grid-cols-[7fr_5fr]' : 'sm:grid-cols-[5fr_7fr]',
                ].join(' ')}
              >
                {/* Text side */}
                <div
                  className={[
                    'py-4',
                    isReverse ? 'sm:order-2' : 'sm:order-1',
                    'order-2',
                  ].join(' ')}
                >
                  <span
                    className="block mb-4 text-sm font-bold tracking-[0.1em] tabular-nums"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}
                  >
                    {p.number} / {String(total).padStart(2, '0')}
                  </span>
                  <span
                    className="inline-block mb-3 pb-2 text-[0.625rem] font-bold uppercase tracking-[0.2em]"
                    style={{
                      color: 'var(--color-text-faint)',
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    {p.category}
                  </span>
                  <h3
                    className="mt-4 mb-5 text-[2.25rem] font-extrabold leading-[1.15] tracking-tight transition-colors duration-300 hover:text-[var(--color-accent)]"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', letterSpacing: '-0.02em', cursor: 'default' }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="mb-6 text-sm leading-[1.85]"
                    style={{ color: 'var(--color-text-muted)', maxWidth: '38ch' }}
                  >
                    {p.desc}
                  </p>

                  {/* Tags — hover interactive */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-3 py-1.5 text-[0.6875rem] font-medium transition-[background-color,color,transform] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[var(--color-accent)] hover:text-[var(--color-on-accent)] hover:-translate-y-0.5 cursor-default"
                        style={{
                          backgroundColor: 'var(--color-secondary-container)',
                          color: 'var(--color-on-secondary-container)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA — pill button style */}
                  <a
                    href={`${BASE}${p.href.replace(/^\//, '')}`}
                    className="group/cta inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-[gap,background-color,color,transform,box-shadow] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:gap-3.5 hover:bg-[var(--color-accent)] hover:text-[var(--color-on-accent)] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(69,98,114,0.15)]"
                    style={{
                      color: 'var(--color-accent)',
                      border: '1.5px solid rgba(69, 98, 114, 0.2)',
                    }}
                  >
                    {p.cta}
                    <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
                      →
                    </span>
                  </a>
                </div>

                {/* Image side */}
                <TiltCard
                  intensity={4}
                  className={[
                    isReverse ? 'sm:order-1' : 'sm:order-2',
                    'order-1',
                  ].join(' ')}
                >
                  <div
                    className="relative overflow-hidden rounded-xl group/img"
                    style={{
                      aspectRatio: '16/10',
                      backgroundColor: 'var(--color-bg-secondary)',
                      boxShadow: '0 4px 16px rgba(42, 52, 57, 0.04)',
                      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    <img
                      src={`${BASE}${p.img}`}
                      alt={p.title}
                      className="w-full h-full object-cover block transition-transform duration-500 group-hover/img:scale-[1.03]"
                      loading="lazy"
                    />
                    {/* Year badge */}
                    <span
                      className="absolute top-5 left-5 text-[0.625rem] font-bold uppercase tracking-[0.15em] rounded-full px-3.5 py-2"
                      style={{
                        color: 'rgba(255,255,255,0.9)',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {p.year}
                    </span>
                  </div>
                </TiltCard>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

#!/usr/bin/env node
/**
 * Regenerate the platform profile docs (리멤버 · 원티드) from src/data/resume.ts
 *
 * Only the content between <!-- GENERATED:START --> and <!-- GENERATED:END -->
 * markers is replaced, so hand-written notes above/below survive.
 *
 * Run with:
 *   node --experimental-strip-types scripts/gen-platform-profiles.ts
 * Or via npm:
 *   npm run sync:resume
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resume, stripBold, educationKo } from '../src/data/resume.ts';

const CAREER_PLANNER = '/Users/ellie/Projects/career-planner';

const TARGETS = [
  {
    key: 'remember',
    label: '리멤버',
    path: `${CAREER_PLANNER}/remember-about.md`,
    profile: resume.remember,
    limits: { 소개: 5000 },
  },
  {
    key: 'wanted',
    label: '원티드',
    path: `${CAREER_PLANNER}/wanted-about.md`,
    profile: resume.wanted,
    limits: {} as Record<string, number>,
  },
];

const START_MARKER =
  '<!-- GENERATED:START — 이 블록은 자동 생성됩니다. 수정하려면 src/data/resume.ts를 고치고 `npm run sync:resume` 실행. -->';
const END_MARKER = '<!-- GENERATED:END -->';

function renderProfile(profile: typeof resume.remember): string {
  const out: string[] = [START_MARKER];

  out.push('## 소개');
  out.push('');
  for (const para of profile.intro) {
    out.push(stripBold(para));
    out.push('');
  }

  for (const career of profile.careers) {
    out.push(`## 경력 — ${career.company}`);
    out.push('');
    out.push(career.meta);
    out.push('');
    for (const block of career.blocks) {
      out.push(`[${block.title}] (${block.period})`);
      for (const b of block.bullets) out.push(`- ${stripBold(b)}`);
      out.push('');
    }
  }

  for (const extra of profile.extraSections ?? []) {
    out.push(`## ${extra.label}`);
    out.push('');
    for (const b of extra.bullets) {
      const text = stripBold(b);
      // 항목당 상한이 있는 섹션(원티드 AI 활용 경험 = 50자)은 초과분을 바로 알린다.
      if (extra.maxPerBullet && [...text].length > extra.maxPerBullet) {
        console.error(
          `  ✗ [${extra.label}] ${[...text].length}자 (상한 ${extra.maxPerBullet}자 초과): ${text}`,
        );
        process.exitCode = 1;
      }
      out.push(`- ${text}`);
    }
    out.push('');
  }

  out.push('## 스킬');
  out.push('');
  out.push(profile.skills.join(', '));
  out.push('');

  // 학력·자격증은 플랫폼별로 따로 쓰지 않고 공유 데이터 하나만 본다.
  out.push('## 학력');
  out.push('');
  for (const e of educationKo) {
    out.push(`- ${e.name} · ${e.degree} · ${e.period}`);
  }
  out.push('');

  // 자격증은 플랫폼별로 따로 쓰지 않고 resume.certifications 하나만 본다.
  // 채널마다 취득일이 어긋나는 일을 막기 위한 것이므로 여기서 분기하지 않는다.
  out.push('## 자격증');
  out.push('');
  for (const c of resume.certifications) {
    const tail = [c.issuedOn ?? c.date, c.issuer].filter(Boolean).join(' · ');
    out.push(`- ${c.name} · ${tail}`);
  }
  out.push('');

  out.push('## 링크');
  out.push('');
  for (const l of profile.links) out.push(`- ${l}`);
  out.push('');

  out.push(END_MARKER);
  return out.join('\n');
}

function seed(label: string): string {
  return `# ${label} 프로필 (최종본)\n> 마지막 업데이트: (자동 갱신)\n\n---\n\n${START_MARKER}\n${END_MARKER}\n`;
}

function main() {
  for (const t of TARGETS) {
    if (!existsSync(t.path)) writeFileSync(t.path, seed(t.label), 'utf-8');

    const current = readFileSync(t.path, 'utf-8');
    const startIdx = current.indexOf(START_MARKER);
    const endIdx = current.indexOf(END_MARKER);
    if (startIdx === -1 || endIdx === -1) {
      console.error(`✗ Markers not found in ${t.path}`);
      process.exit(1);
    }

    const rendered = renderProfile(t.profile);
    const next =
      current.slice(0, startIdx) + rendered + current.slice(endIdx + END_MARKER.length);
    writeFileSync(t.path, next, 'utf-8');

    // 플랫폼 글자수 상한을 넘는 섹션이 있으면 알린다.
    for (const [section, limit] of Object.entries(t.limits)) {
      const m = rendered.split(`## ${section}`)[1]?.split('\n## ')[0] ?? '';
      const n = [...m.trim()].length;
      const mark = n > limit ? '✗ 초과' : '✓';
      console.log(`  ${mark} ${t.label} ${section}: ${n} / ${limit}자`);
    }
    console.log(`✓ ${t.label} 프로필 생성 → ${t.path}`);
  }
}

main();

#!/usr/bin/env node
/**
 * Regenerate the Korean section of linkedin-about.md from src/data/resume.ts
 *
 * Only the content between <!-- GENERATED:START --> and <!-- GENERATED:END --> markers
 * is replaced. The English section is preserved untouched.
 *
 * Run with:
 *   node --experimental-strip-types scripts/gen-linkedin-about.ts
 * Or via npm:
 *   npm run sync:resume
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resume, stripBold } from '../src/data/resume.ts';

const TARGET_PATH =
  '/Users/ellie/Projects/career-planner/linkedin-about.md';

const START_MARKER =
  '<!-- GENERATED:START — 이 블록은 자동 생성됩니다. 수정하려면 portfolio/src/data/resume.ts의 linkedin 필드를 수정하고 `npm run sync:resume` 실행. -->';
const END_MARKER = '<!-- GENERATED:END -->';

function renderKoSection(): string {
  const lines: string[] = [];
  lines.push(START_MARKER);
  lines.push(`**${resume.linkedin.headline}**`);
  lines.push('');
  lines.push(resume.linkedin.intro);
  lines.push('');
  lines.push('✦ 현재 역할');
  for (const item of resume.linkedin.currentRole) {
    lines.push(`• ${stripBold(item)}`);
  }
  lines.push('');
  lines.push('✦ 전문 분야');
  for (const item of resume.linkedin.expertise) {
    lines.push(`• ${stripBold(item)}`);
  }
  lines.push('');
  lines.push('✦ 주요 성과');
  for (const item of resume.linkedin.achievements) {
    lines.push(`• ${stripBold(item)}`);
  }
  lines.push('');
  lines.push('✦ 링크');
  lines.push(`• Portfolio: ${resume.contact.portfolio}`);
  lines.push(`• GitHub: ${resume.contact.github}`);

  // Experience 설명란. About과 붙여넣는 칸이 다르므로 H2로 갈라 둔다.
  for (const career of resume.linkedin.careers) {
    lines.push('');
    lines.push(`## 경력 — ${career.company}`);
    lines.push('');
    lines.push(career.meta);
    lines.push('');
    if (career.lead) {
      lines.push(stripBold(career.lead));
      lines.push('');
    }
    for (const block of career.blocks) {
      lines.push(`[${block.title}] ${block.period}`);
      for (const b of block.bullets) lines.push(`• ${stripBold(b)}`);
      lines.push('');
    }
    if (career.skills?.length) {
      lines.push(`보유기술: ${career.skills.join(', ')}`);
      lines.push('');
    }
  }

  lines.push(END_MARKER);
  return lines.join('\n');
}

function main() {
  let current: string;
  try {
    current = readFileSync(TARGET_PATH, 'utf-8');
  } catch (err) {
    console.error(`✗ Cannot read ${TARGET_PATH}`);
    console.error(err);
    process.exit(1);
  }

  const startIdx = current.indexOf(START_MARKER);
  const endIdx = current.indexOf(END_MARKER);

  if (startIdx === -1 || endIdx === -1) {
    console.error('✗ Markers not found in linkedin-about.md');
    console.error(
      '  Add these around the Korean section you want auto-generated:',
    );
    console.error(`  ${START_MARKER}`);
    console.error(`  ... (auto content) ...`);
    console.error(`  ${END_MARKER}`);
    process.exit(1);
  }

  const before = current.slice(0, startIdx);
  const after = current.slice(endIdx + END_MARKER.length);
  const newContent = before + renderKoSection() + after;

  writeFileSync(TARGET_PATH, newContent, 'utf-8');
  console.log(`✓ linkedin-about.md (ko section) regenerated → ${TARGET_PATH}`);
}

main();

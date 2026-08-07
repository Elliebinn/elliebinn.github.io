#!/usr/bin/env node
/**
 * Generate resume-common.md in Obsidian from src/data/resume.ts
 *
 * Run with:
 *   node --experimental-strip-types scripts/gen-resume-md.ts
 * Or via npm:
 *   npm run sync:resume
 *
 * Requires Node.js >= 22.12 for native TypeScript stripping.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { resume, keepBold } from '../src/data/resume.ts';

const OUTPUT_PATH =
  '/Users/ellie/Projects/career-planner/cv.md';

function renderMarkdown(): string {
  const parts: string[] = [];

  // Header
  parts.push(`# ${resume.name.ko} · ${resume.name.en}`);
  parts.push('');
  parts.push(`**${resume.role}**`);
  parts.push('');
  parts.push(
    `${resume.contact.phone} | ${resume.contact.email} | ${resume.contact.github} | ${resume.contact.portfolio}`,
  );
  parts.push('');
  parts.push('---');
  parts.push('');

  // Summary
  parts.push('## Summary');
  parts.push('');
  parts.push(resume.summary.lead);
  parts.push('');
  parts.push(keepBold(resume.summary.body));
  parts.push('');
  parts.push('---');
  parts.push('');

  // Work Experience
  parts.push('## Work Experience');
  parts.push('');

  for (const job of resume.jobs) {
    const heading = job.department
      ? `### ${job.company} · ${job.department}`
      : `### ${job.company}`;
    parts.push(heading);
    parts.push(`**${job.period}**${job.org ? ` · ${job.org}` : ''}`);
    parts.push('');

    for (const project of job.projects) {
      const titleLine = project.period
        ? `**${project.title}** · *${project.period}*`
        : `**${project.title}**`;
      parts.push(titleLine);
      parts.push('');
      if (project.description) {
        parts.push(`> ${project.description}`);
        parts.push('');
      }
      for (const bullet of project.bullets) {
        parts.push(`- ${keepBold(bullet)}`);
      }
      parts.push('');
    }
    parts.push('---');
    parts.push('');
  }

  // Side Project
  parts.push('## Side Project');
  parts.push('');
  parts.push(`### ${resume.sideProject.title} · ${resume.sideProject.sub}`);
  parts.push(`**${resume.sideProject.role}**`);
  parts.push('');
  parts.push(`> "${resume.sideProject.quote}"`);
  parts.push('');
  for (const bullet of resume.sideProject.bullets) {
    parts.push(`- ${keepBold(bullet)}`);
  }
  parts.push('');
  parts.push('---');
  parts.push('');

  // Education
  parts.push('## Education');
  parts.push('');
  for (const edu of resume.education) {
    parts.push(`- **${edu.name}** (${edu.period}) · ${edu.degree}`);
  }
  parts.push('');

  // Certifications
  parts.push('## Certifications');
  parts.push('');
  for (const cert of resume.certifications) {
    const detail = [cert.issuedOn ?? cert.date, cert.issuer].filter(Boolean).join(' · ');
    parts.push(`- ${cert.name} · ${detail}`);
  }
  parts.push('');
  parts.push('---');
  parts.push('');

  // Additional Information
  parts.push('## Additional Information');
  parts.push('');
  for (const row of resume.skills) {
    parts.push(`- **${row.label}**: ${row.items}`);
  }
  const languageLine = resume.language.note
    ? `${resume.language.primary} · ${resume.language.note}`
    : resume.language.primary;
  parts.push(`- **언어**: ${languageLine}`);
  parts.push('');

  return parts.join('\n');
}

function main() {
  const output = renderMarkdown();
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });

  // Prepend auto-gen banner so the user knows it's regenerated
  const banner = `<!--
  ⚠️  AUTO-GENERATED — DO NOT EDIT DIRECTLY

  이 파일은 자동 생성됩니다. 직접 수정하지 마세요!

  📝 수정 방법:
    1. portfolio/src/data/resume.ts 파일을 수정하세요
    2. cd portfolio && npm run sync:resume 실행
    3. 이 파일이 자동으로 업데이트됩니다

  Source: portfolio/src/data/resume.ts
  Generated: ${new Date().toISOString()}

  ⚠️  이 파일을 직접 수정하면 다음 sync:resume 실행 시 변경사항이 손실됩니다!
-->

`;

  writeFileSync(OUTPUT_PATH, banner + output, 'utf-8');
  console.log(`✓ resume-common.md generated → ${OUTPUT_PATH}`);
  console.log(`  ${output.split('\n').length} lines, ${output.length} chars`);
}

main();

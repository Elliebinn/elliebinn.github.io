#!/usr/bin/env node
/**
 * Generate career-statement.md in career-planner from src/data/career-statement.ts
 *
 * Run with:
 *   node --experimental-strip-types scripts/gen-career-statement-md.ts
 * Or via npm:
 *   npm run sync:career-statement
 *
 * Requires Node.js >= 22.12 for native TypeScript stripping.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { careerStatement } from '../src/data/career-statement.ts';

const OUTPUT_PATH =
  '/Users/ellie/Projects/career-planner/career-statement.md';

function keepBold(text: string): string {
  return text;
}

function renderMarkdown(): string {
  const parts: string[] = [];

  // Header
  parts.push('# 경력기술서 · Career Statement');
  parts.push('');
  parts.push('**STAR 구조 기반**');
  parts.push('');
  parts.push('---');
  parts.push('');

  // Summary
  parts.push('## Summary');
  parts.push('');
  parts.push(careerStatement.summary);
  parts.push('');
  parts.push('---');
  parts.push('');

  // Career Experiences
  parts.push('## Career Experiences');
  parts.push('');

  for (const exp of careerStatement.experiences) {
    const heading = exp.department
      ? `### ${exp.company} · ${exp.department}`
      : `### ${exp.company}`;
    parts.push(heading);
    parts.push(`**${exp.period}** · ${exp.role}`);
    parts.push('');

    for (const project of exp.projects) {
      parts.push(`#### ${project.title}`);
      parts.push(`*${project.period}*`);
      parts.push('');

      // Situation
      parts.push('**배경 (Situation)**');
      parts.push('');
      parts.push(project.situation);
      parts.push('');

      // Task
      parts.push('**역할 (Task)**');
      parts.push('');
      parts.push(project.task);
      parts.push('');

      // Action
      parts.push('**실행 (Action)**');
      parts.push('');
      for (const actionGroup of project.actions) {
        if (actionGroup.label) {
          const header = actionGroup.period
            ? `**${actionGroup.label}** · *${actionGroup.period}*`
            : `**${actionGroup.label}**`;
          parts.push(header);
          parts.push('');
        }
        for (const item of actionGroup.items) {
          parts.push(`- ${keepBold(item)}`);
        }
        parts.push('');
      }

      // Result
      parts.push('**성과 (Result)**');
      parts.push('');
      for (const result of project.results) {
        parts.push(`- ${keepBold(result)}`);
      }
      parts.push('');
      parts.push('---');
      parts.push('');
    }
  }

  return parts.join('\n');
}

function main() {
  const output = renderMarkdown();
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });

  // Prepend auto-gen banner
  const banner = `<!--
  ⚠️  AUTO-GENERATED — DO NOT EDIT DIRECTLY

  이 파일은 자동 생성됩니다. 직접 수정하지 마세요!

  📝 수정 방법:
    1. portfolio/src/data/career-statement.ts 파일을 수정하세요
    2. cd portfolio && npm run sync:career-statement 실행
    3. 이 파일이 자동으로 업데이트됩니다

  Source: portfolio/src/data/career-statement.ts
  Generated: ${new Date().toISOString()}

  ⚠️  이 파일을 직접 수정하면 다음 sync:career-statement 실행 시 변경사항이 손실됩니다!
-->

`;

  writeFileSync(OUTPUT_PATH, banner + output, 'utf-8');
  console.log(`✓ career-statement.md generated → ${OUTPUT_PATH}`);
  console.log(`  ${output.split('\n').length} lines, ${output.length} chars`);
}

main();

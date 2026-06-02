import { useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import type { Lang } from '../i18n/translations';
import { t, getOtherLang } from '../i18n/translations';

const BASE = '';

export default function Navbar({ lang = 'en' as Lang }: { lang?: Lang }) {
  const tr = t(lang);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  // Track scroll state for mobile menu and conditional classes
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80);
  });

  // Navbar background opacity: 0 at top → 1 after 100px scroll
  const navBgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  // Logo opacity: hidden at top → visible after scrolling
  const logoOpacity = useTransform(scrollY, [40, 140], [0, 1]);
  // Logo scale: slight scale-up entrance
  const logoScale = useTransform(scrollY, [40, 140], [0.85, 1]);
  // Logo translateY: slides down into place
  const logoY = useTransform(scrollY, [40, 140], [-8, 0]);

  const navLinks = [
    { label: tr.nav.home, href: `${BASE}/${lang}/` },
    { label: tr.nav.projects, href: `${BASE}/${lang}/#projects` },
    { label: tr.nav.blog, href: `${BASE}/${lang}/blog/` },
  ];

  const otherLang = getOtherLang(lang);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ willChange: 'auto' }}
    >
      {/* Animated glass background layer */}
      <motion.div
        className="absolute inset-0 glass"
        style={{
          opacity: navBgOpacity,
          borderBottom: '1px solid rgba(169, 180, 185, 0.15)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo — fades in on scroll */}
        <motion.a
          href={`${BASE}/${lang}/`}
          className="flex items-center gap-2"
          style={{
            opacity: logoOpacity,
            scale: logoScale,
            y: logoY,
          }}
        >
          <img
            src="/assets/logo-v2-character-circle.png"
            alt="HB."
            className="nav-logo"
            style={{ height: '28px', width: '28px', borderRadius: '50%' }}
          />
          <span
            className="text-base font-semibold tracking-[0.15em] text-[var(--color-text)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            HB.
          </span>
        </motion.a>

        {/* Desktop nav — links always visible but subtle at top */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              className="text-[13px] font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]">
              {link.label}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`${BASE}/${otherLang}/`}
            className="flex h-8 items-center rounded-full px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-card-hover)]"
          >
            {otherLang === 'ko' ? '한국어' : 'EN'}
          </a>
          <a href={`${BASE}/${lang}/#contact`}
            className="rounded-full gradient-primary px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-[var(--color-on-accent)] transition-opacity hover:opacity-90">
            {tr.nav.hireMe}
          </a>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <a href={`${BASE}/${otherLang}/`}
            className="text-[11px] font-semibold uppercase text-[var(--color-text-muted)]">
            {otherLang === 'ko' ? '한국어' : 'EN'}
          </a>
          <button onClick={() => setOpen(!open)} className="text-[var(--color-text-muted)]" aria-label="Menu">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="bg-[var(--color-bg-card)] px-6 py-6 md:hidden shadow-ambient">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}
              className="block py-2.5 text-sm uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">
              {link.label}
            </a>
          ))}
          <a href={`${BASE}/${lang}/#contact`} onClick={() => setOpen(false)}
            className="mt-4 block rounded-full gradient-primary py-2.5 text-center text-sm font-semibold uppercase tracking-wider text-[var(--color-on-accent)]">
            {tr.nav.hireMe}
          </a>
        </div>
      )}
    </motion.nav>
  );
}

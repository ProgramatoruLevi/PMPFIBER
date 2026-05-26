import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: Props) {
  return (
    <Reveal
      className={`${align === 'center' ? 'mx-auto text-center' : 'text-left'} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <span className="eyebrow">
          <span className="h-px w-8 bg-gold/50" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-semibold leading-tight text-cream sm:text-4xl lg:text-[2.7rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-sand sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

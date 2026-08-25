'use client';

type Props = {
  className?: string;
  /** Variante tipográfica por segmento. */
  brand?: 'gooday' | 'xpzone' | 'petshare' | 'one' | 'lingo';
};

/**
 * Logo Gooday em PNG — altura controlada via CSS.
 * /gamers → XP Zone · /pets → Petshare · /church → ONE · /language → LINGO
 */
export function GoodayLogo({ className = '', brand = 'gooday' }: Props) {
  if (brand === 'xpzone') {
    return (
      <span className={`gd-logo-xp ${className}`} aria-label="XP Zone">
        XP Zone
      </span>
    );
  }

  if (brand === 'petshare') {
    return (
      <span className={`gd-logo-petshare ${className}`} aria-label="Petshare">
        <span className="gd-logo-petshare__paw" aria-hidden>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <ellipse cx="7" cy="7.5" rx="2.2" ry="2.8" />
            <ellipse cx="12" cy="5.5" rx="2.2" ry="2.8" />
            <ellipse cx="17" cy="7.5" rx="2.2" ry="2.8" />
            <path d="M12 10.5c-3.2 0-5.8 2.2-5.8 5.2 0 1.6 1.1 2.8 2.6 3.2.7.2 1.4-.1 1.8-.6l.7-1c.4-.5 1.2-.5 1.6 0l.7 1c.4.5 1.1.8 1.8.6 1.5-.4 2.6-1.6 2.6-3.2 0-3-2.6-5.2-5.8-5.2z" />
          </svg>
        </span>
        Petshare
      </span>
    );
  }

  if (brand === 'one') {
    return (
      <span className={`gd-logo-one ${className}`} aria-label="ONE">
        ONE
      </span>
    );
  }

  if (brand === 'lingo') {
    return (
      <span className={`gd-logo-lingo ${className}`} aria-label="LINGO">
        LINGO
      </span>
    );
  }

  return (
    <img
      src="/uploads/gooday-logo.png"
      alt="Gooday"
      width={189}
      height={80}
      draggable={false}
      className={`gd-logo ${className}`}
    />
  );
}

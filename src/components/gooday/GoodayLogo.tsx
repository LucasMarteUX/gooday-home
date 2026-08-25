'use client';

type Props = {
  className?: string;
  /** No tema Gamers, mostra o wordmark XP Zone. */
  brand?: 'gooday' | 'xpzone';
};

/**
 * Logo Gooday em PNG — altura controlada via CSS (evita render no tamanho nativo 189×80).
 * Em /gamers (brand=xpzone): wordmark tipográfico "XP Zone".
 */
export function GoodayLogo({ className = '', brand = 'gooday' }: Props) {
  if (brand === 'xpzone') {
    return (
      <span className={`gd-logo-xp ${className}`} aria-label="XP Zone">
        XP Zone
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

type Props = {
  className?: string;
};

/**
 * Logo Gooday em PNG — altura controlada via CSS (evita render no tamanho nativo 189×80).
 */
export function GoodayLogo({ className = '' }: Props) {
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

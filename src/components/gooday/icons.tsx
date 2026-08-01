import React from 'react';

export type GoodayIconName = 'home' | 'search' | 'chat' | 'heart' | 'groups' | 'create' | 'pin';

export type GoodayIconProps = {
  active?: boolean;
  activeColor?: string;
  size?: number;
  className?: string;
};

function svgProps(size: number, className?: string, stroke = 'currentColor') {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };
}

export function HomeIcon({ size = 26, className }: GoodayIconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M4 10.5L12 4l8 6.5V19a1 1 0 01-1 1h-4v-5h-6v5H5a1 1 0 01-1-1z" />
    </svg>
  );
}

export function SearchIcon({ size = 26, className }: GoodayIconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <circle cx={11} cy={11} r={7} />
      <path d="M20 20l-3.4-3.4" />
    </svg>
  );
}

export function ChatIcon({ size = 26, className }: GoodayIconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M7 4h10a3 3 0 013 3v7a3 3 0 01-3 3h-5l-4 3v-3H7a3 3 0 01-3-3V7a3 3 0 013-3z" />
      <path d="M9 9.5h6" />
      <path d="M9 12.5h4" />
    </svg>
  );
}

export function HeartIcon({ size = 26, className }: GoodayIconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M12 20s-7.2-4.4-9-9a4.8 4.8 0 019-2.6A4.8 4.8 0 0121 11c-1.8 4.6-9 9-9 9z" />
    </svg>
  );
}

export function PinIcon({ size = 26, className }: GoodayIconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M12 21v-6" />
      <path d="M9.2 3.8l5.6 0a1.2 1.2 0 011.1.7l1.3 2.7-3.2 3.2.8 5.1-3.6-2.2-3.6 2.2.8-5.1-3.2-3.2 1.3-2.7a1.2 1.2 0 011.1-.7z" />
    </svg>
  );
}

export function GroupsIcon({ size = 26, className }: GoodayIconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <rect x={3.5} y={3.5} width={7} height={7} rx={2} />
      <rect x={13.5} y={3.5} width={7} height={7} rx={2} />
      <rect x={3.5} y={13.5} width={7} height={7} rx={2} />
      <rect x={13.5} y={13.5} width={7} height={7} rx={2} />
    </svg>
  );
}

export function CreateIcon({ size = 16, className }: GoodayIconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <circle cx={12} cy={12} r={9} />
      <path d="M12 8.4v7.2M8.4 12h7.2" />
    </svg>
  );
}

/** Botão criar do menu inferior — outline preto, conforme mock. */
export function CreateTabIcon({ size = 44 }: { brand?: string; size?: number }) {
  return (
    <span className="grid place-items-center text-gd-text" style={{ width: size, height: size }}>
      <CreateIcon size={Math.round(size * 0.72)} />
    </span>
  );
}

const ICON_MAP: Record<
  Exclude<GoodayIconName, 'create'>,
  React.ComponentType<GoodayIconProps>
> = {
  home: HomeIcon,
  search: SearchIcon,
  chat: ChatIcon,
  heart: HeartIcon,
  groups: GroupsIcon,
  pin: PinIcon,
};

export function renderGoodayIcon(
  name: GoodayIconName,
  props: GoodayIconProps = {},
): React.ReactNode {
  if (name === 'create') return <CreateIcon {...props} />;
  const Icon = ICON_MAP[name];
  return <Icon {...props} />;
}

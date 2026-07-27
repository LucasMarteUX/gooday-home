import React from 'react';

export type GoodayIconName = 'home' | 'search' | 'chat' | 'heart' | 'groups' | 'create';

export type GoodayIconProps = {
  active?: boolean;
  activeColor?: string;
  size?: number;
  className?: string;
};

function svgProps(active: boolean, activeColor: string, size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: active ? activeColor : 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };
}

export function HomeIcon({ active = false, activeColor = '#4667F5', size = 26, className }: GoodayIconProps) {
  const p = svgProps(active, activeColor, size, className);
  return (
    <svg {...p}>
      <path
        d="M4 10.5L12 4l8 6.5V19a1 1 0 01-1 1h-4v-5h-6v5H5a1 1 0 01-1-1z"
        fill={active ? 'rgba(70,103,245,.22)' : 'none'}
      />
    </svg>
  );
}

export function SearchIcon({ active = false, activeColor = '#4667F5', size = 26, className }: GoodayIconProps) {
  const p = svgProps(active, activeColor, size, className);
  return (
    <svg {...p}>
      <circle cx={11} cy={11} r={7} />
      <path d="M20 20l-3.4-3.4" />
    </svg>
  );
}

export function ChatIcon({ active = false, activeColor = '#4667F5', size = 26, className }: GoodayIconProps) {
  const stroke = active ? activeColor : 'currentColor';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d="M7 4h10a3 3 0 013 3v7a3 3 0 01-3 3h-5l-4 3v-3H7a3 3 0 01-3-3V7a3 3 0 013-3z"
        fill={active ? 'rgba(70,103,245,.18)' : 'none'}
      />
      <path d="M9 9.5h6" />
      <path d="M9 12.5h4" />
    </svg>
  );
}

export function HeartIcon({ active = false, activeColor = '#4667F5', size = 26, className }: GoodayIconProps) {
  const p = svgProps(active, activeColor, size, className);
  return (
    <svg {...p}>
      <path d="M12 20s-7.2-4.4-9-9a4.8 4.8 0 019-2.6A4.8 4.8 0 0121 11c-1.8 4.6-9 9-9 9z" />
    </svg>
  );
}

export function GroupsIcon({ active = false, activeColor = '#4667F5', size = 26, className }: GoodayIconProps) {
  const p = svgProps(active, activeColor, size, className);
  return (
    <svg {...p}>
      <rect x={3.5} y={3.5} width={7} height={7} rx={2} />
      <rect x={13.5} y={3.5} width={7} height={7} rx={2} />
      <rect x={3.5} y={13.5} width={7} height={7} rx={2} />
      <rect x={13.5} y={13.5} width={7} height={7} rx={2} />
    </svg>
  );
}

export function CreateIcon({ active = false, activeColor = 'currentColor', size = 16, className }: GoodayIconProps) {
  const stroke = active ? '#FFFFFF' : activeColor;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.8}
      strokeLinecap="round"
      className={className}
    >
      <circle cx={12} cy={12} r={9} />
      <path d="M12 8.4v7.2M8.4 12h7.2" />
    </svg>
  );
}

export function CreateTabIcon({ brand = '#4667F5', size = 52 }: { brand?: string; size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: brand,
        display: 'grid',
        placeItems: 'center',
        boxShadow: '0 8px 24px rgba(70,103,245,.45)',
      }}
    >
      <svg
        width={Math.round(size * 0.5)}
        height={Math.round(size * 0.5)}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth={2.2}
        strokeLinecap="round"
      >
        <path d="M12 6v12M6 12h12" />
      </svg>
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
};

export function renderGoodayIcon(
  name: GoodayIconName,
  props: GoodayIconProps = {},
): React.ReactNode {
  if (name === 'create') return <CreateIcon {...props} />;
  const Icon = ICON_MAP[name];
  return <Icon {...props} />;
}

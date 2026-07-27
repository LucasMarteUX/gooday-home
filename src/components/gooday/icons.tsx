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
    stroke: active ? activeColor : '#7B818C',
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
  const p = svgProps(active, activeColor, size, className);
  return (
    <svg {...p}>
      <path d="M20 12a7.5 7.5 0 01-10.9 6.7L4 20l1.4-4.2A7.5 7.5 0 1120 12z" />
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

export function CreateIcon({ active = false, activeColor = '#C3C7CF', size = 16, className }: GoodayIconProps) {
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

export function CreateTabIcon({ brand = '#4667F5' }: { brand?: string }) {
  return (
    <span
      style={{
        width: 52,
        height: 52,
        borderRadius: 999,
        background: brand,
        display: 'grid',
        placeItems: 'center',
        boxShadow: '0 8px 24px rgba(70,103,245,.45)',
      }}
    >
      <svg
        width={26}
        height={26}
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

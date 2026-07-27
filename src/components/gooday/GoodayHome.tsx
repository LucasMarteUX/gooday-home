'use client';

import { useGoodayHome } from '@/lib/gooday/useGoodayHome';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import { StoriesRow } from './StoriesRow';
import { FeedSection } from './FeedSection';
import { CommunitiesCarousel, RightRail } from './CommunitiesRail';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';
import { OverlayScreens } from './OverlayScreens';
import { StoryViewer } from './StoryViewer';
import { SheetModal } from './SheetModal';
import { AvatarMenu } from './AvatarMenu';
import { Toast } from './Toast';

export function GoodayHome() {
  const { vm } = useGoodayHome();

  return (
    <div className="min-h-dvh w-full bg-gd-bg text-gd-text antialiased selection:bg-gd-brand/30">
      <HeaderMobile vm={vm} />
      <HeaderDesktop vm={vm} />

      <StoriesRow vm={vm} />

      {/*
        Esquerda: menu nav (hug).
        Centro: timeline.
        Direita: painel adaptável (Grupos / Pessoas / …).
        Gap maior entre timeline e laterais.
      */}
      <div
        className={[
          'w-full pb-[calc(100px+env(safe-area-inset-bottom))]',
          'min-[800px]:grid min-[800px]:items-start min-[800px]:gap-8 min-[800px]:px-5 min-[800px]:pb-10',
          'min-[800px]:grid-cols-[max-content_minmax(280px,560px)_minmax(240px,1fr)]',
          'min-[1200px]:gap-10',
          'min-[1800px]:px-8 min-[1800px]:gap-12',
        ].join(' ')}
      >
        <div className="hidden min-[800px]:contents">
          <DesktopNav vm={vm} />
        </div>

        <main className="mx-auto w-full min-w-0 max-w-[640px] pt-1 min-[800px]:mx-0 min-[800px]:w-full min-[800px]:max-w-none min-[800px]:justify-self-stretch min-[800px]:pt-4">
          {vm.showCommunities ? (
            <div className="min-[800px]:hidden">
              <CommunitiesCarousel vm={vm} />
            </div>
          ) : null}
          <FeedSection vm={vm} />
        </main>

        {vm.showRail ? (
          <div className="hidden min-w-0 min-[800px]:contents">
            <RightRail vm={vm} />
          </div>
        ) : null}
      </div>

      <MobileNav vm={vm} />

      <OverlayScreens vm={vm} />
      <StoryViewer vm={vm} />
      <AvatarMenu vm={vm} />
      <SheetModal vm={vm} />
      <Toast vm={vm} />
    </div>
  );
}

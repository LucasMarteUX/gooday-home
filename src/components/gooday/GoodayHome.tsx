'use client';

import { useGoodayHome } from '@/lib/gooday/useGoodayHome';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import { StoriesRow } from './StoriesRow';
import { FeedSection } from './FeedSection';
import { SidebarSuggestions } from './SidebarSuggestions';
import { CommunitiesCarousel, CommunitiesRail } from './CommunitiesRail';
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
    <div className="min-h-dvh w-full bg-gd-bg text-white antialiased selection:bg-gd-brand/30">
      <HeaderMobile vm={vm} />
      <HeaderDesktop vm={vm} />

      <StoriesRow vm={vm} />

      <div className="w-full pb-[calc(88px+env(safe-area-inset-bottom))] min-[800px]:grid min-[800px]:grid-cols-[minmax(214px,1fr)_minmax(260px,640px)_minmax(214px,1fr)] min-[800px]:gap-4 min-[800px]:px-6 min-[800px]:pb-[120px]">
        <div className="hidden min-[800px]:contents">
          <SidebarSuggestions vm={vm} />
        </div>

        <main className="mx-auto w-full min-w-0 max-w-[640px] pt-1 min-[800px]:mx-0 min-[800px]:max-w-none min-[800px]:w-full min-[800px]:pt-4">
          {vm.showCommunities ? (
            <div className="min-[800px]:hidden">
              <CommunitiesCarousel vm={vm} />
            </div>
          ) : null}
          <FeedSection vm={vm} />
        </main>

        {vm.showRail ? (
          <div className="hidden min-[800px]:contents">
            <CommunitiesRail vm={vm} />
          </div>
        ) : null}
      </div>

      <MobileNav vm={vm} />
      <DesktopNav vm={vm} />

      <OverlayScreens vm={vm} />
      <StoryViewer vm={vm} />
      <AvatarMenu vm={vm} />
      <SheetModal vm={vm} />
      <Toast vm={vm} />
    </div>
  );
}

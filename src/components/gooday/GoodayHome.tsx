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
    <div className="min-h-screen bg-gd-bg font-sans text-white antialiased">
      {vm.isDesktop ? <HeaderDesktop vm={vm} /> : <HeaderMobile vm={vm} />}

      <StoriesRow vm={vm} />

      <div style={vm.rowGridStyle}>
        {vm.isDesktop && vm.showRail ? <SidebarSuggestions vm={vm} /> : null}

        <main className="w-full max-w-[640px] min-w-0 pt-4">
          {vm.isMobile && vm.showCommunities ? <CommunitiesCarousel vm={vm} /> : null}
          <FeedSection vm={vm} />
        </main>

        {vm.showRail ? <CommunitiesRail vm={vm} /> : null}
      </div>

      {vm.isMobile ? <MobileNav vm={vm} /> : <DesktopNav vm={vm} />}

      <OverlayScreens vm={vm} />
      <StoryViewer vm={vm} />
      <AvatarMenu vm={vm} />
      <SheetModal vm={vm} />
      <Toast vm={vm} />
    </div>
  );
}

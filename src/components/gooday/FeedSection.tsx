import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";
import { FeedPost } from "./FeedPost";

type Props = {
  vm: GoodayHomeViewModel;
};

export function FeedSection({ vm }: Props) {
  return (
    <section
      aria-label="Feed"
      className="flex flex-col gap-3.5 px-4"
    >
      {vm.feed.map((post, i) => (
        <FeedPost key={i} post={post} reactionsEnabled={vm.reactionsEnabled} />
      ))}
    </section>
  );
}

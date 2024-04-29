import { CategoryType, auctionType } from "@/utils/types";

import { AuctionCard } from "./auction-card";

type AuctionWithCategory = auctionType & {
  category: CategoryType | null;
};

interface AuctionsListProps {
  items: AuctionWithCategory[];
}

export const AuctionsList = ({ items }: AuctionsListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) =>
          item.close_time ? (
            <AuctionCard
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl!}
              price={item.start_price!}
              current_price={item.current_price!}
              category={item?.category?.name!}
              close_time={item.close_time}
            />
          ) : null
        )}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Auctions found
        </div>
      )}
    </div>
  );
};

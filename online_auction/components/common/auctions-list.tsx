import { CategoryType, AuctionType } from "@/utils/types";

import { AuctionCard } from "./Auction-card";

type AuctionWithProgressWithCategory = AuctionType & {
  category: CategoryType | null;
};

interface AuctionsListProps {
  items: AuctionWithProgressWithCategory[];
}

export const AuctionsList = ({ items }: AuctionsListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <AuctionCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            price={item.price!}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Auctions found
        </div>
      )}
    </div>
  );
};

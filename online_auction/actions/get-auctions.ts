import { CategoryType, auctionType } from "@/utils/types";

import axios from "@/utils/axios";

export type AuctionWithCategory = auctionType & {
  category: CategoryType | null;
};

type GetAuctions = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getAuctions = async ({
  userId,
  title,
  categoryId,
}: GetAuctions): Promise<AuctionWithCategory[]> => {
  try {
    const res = await axios.get("/search-auctions", {
      params: {
        userId,
        title,
        categoryId,
      },
    });
    const auctions = res.data;
    return auctions;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};

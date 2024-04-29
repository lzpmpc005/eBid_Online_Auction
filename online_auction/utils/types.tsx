export type auctionType = {
  id: string;
  ownerId: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  start_price: number | null;
  current_price: number | null;
  current_bidder: string | null;
  isPublished: boolean;
  categoryId: string | null;
  close_time: string | null;
  createdAt: string;
  updatedAt: string;
  bids: BidType[];
};

export type BidType = {
  id: string;
  userId: string;
  auctionId: string;
  bid_price: number;
  timestamp: string;
};

export type CategoryType = {
  id: string;
  name: string;
};

export type Purchase = {
  id: string;
  userId: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
};

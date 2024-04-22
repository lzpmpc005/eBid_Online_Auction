"use client";

import axios from "@/utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuctionIdPage = ({ params }: { params: { auctionId: string } }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    setUserId(userIdFromStorage);

    if (userIdFromStorage) {
      axios
        .get(`/auctions/${params.auctionId}/user/${userIdFromStorage}`)
        .then((response) => {
          const auction = response.data;
          if (!auction) {
            toast.error("Auction not found");
            router.push("/");
            return;
          } else {
            return;
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("An error occurred while fetching the auction");
        });
    }
  }, [params.auctionId, router]);

  return null;
};

export default AuctionIdPage;

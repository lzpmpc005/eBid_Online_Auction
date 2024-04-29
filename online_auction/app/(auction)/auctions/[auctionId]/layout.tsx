"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "@/utils/axios";
import { toast } from "react-toastify";

const AuctionLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { auctionId: string };
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [auction, setauction] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    setUserId(userIdFromStorage);

    if (userIdFromStorage) {
      axios
        .get(`/auctions/${params.auctionId}/user/${userIdFromStorage}`)
        .then(async (response) => {
          const auctionData = response.data;
          if (!auctionData) {
            toast.error("auction not found");
            router.push("/");
            return;
          } else {
            setauction(auctionData);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("An error occurred while fetching the auction");
        });
    } else {
      toast.error("You need to login to access this page");
      router.push("/");
      return;
    }
  }, []);

  if (!auction) {
    return null;
  }

  return (
    <div className="h-full">
      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default AuctionLayout;

"use client";

import axios from "@/utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuctionIdPage = ({ params }: { params: { auctionId: string } }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const [auction, setAuction] = useState<any | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [bid, setBid] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuctionData = () => {
      const userIdFromStorage = localStorage.getItem("userId");

      setUserId(userIdFromStorage);

      if (userIdFromStorage) {
        axios
          .get(`/auctions/${params.auctionId}/user/${userIdFromStorage}`)
          .then((response) => {
            const auctionData = response.data;
            if (!auctionData) {
              toast.error("Auction not found");
              router.push("/");
              return;
            } else {
              setAuction(auctionData);
              return;
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("An error occurred while fetching the auction");
          });
      }
    };

    fetchAuctionData();

    const interval = setInterval(fetchAuctionData, 5000);

    return () => clearInterval(interval);
  }, [params.auctionId, router]);

  useEffect(() => {
    if (auction) {
      setTimeLeft(
        new Date(auction.close_time).getTime() - new Date().getTime()
      );
    }
  }, [auction]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  if (!auction) return <div>Error...</div>;
  const suggestedBid = auction.current_price
    ? auction.current_price + 5
    : auction.start_price + 5;

  const submitBid = async (bid: number) => {
    try {
      const response = await axios.patch(`/auctions/${params.auctionId}`, {
        userId: userId,
        current_price: bid,
        current_bidder: userId,
      });

      if (response.status === 200) {
        setAuction(response.data);
        toast.success("Bid submitted successfully");
      }
    } catch (error) {
      if (error instanceof Error) {
        const axiosError = error as any;
        if (axiosError.response) {
          toast.error(axiosError.response.data.error);
        } else if (axiosError.request) {
          toast.error("No response from server");
        } else {
          toast.error("Error submitting bid");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          flex: 1,
          marginRight: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2em",
            color: "#333",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {auction.title}
        </h1>
        <img
          src={auction.imageUrl}
          style={{ maxWidth: "90%", height: "auto" }}
        />
        <p style={{ margin: "1em 0", fontSize: "1.5em" }}>
          {auction.description}
        </p>
        <p style={{ margin: "1em 0", fontSize: "1.5em", fontWeight: "bold" }}>
          Start Price: {auction.start_price} $
        </p>
        <p style={{ margin: "1em 0", fontSize: "1.5em", fontWeight: "bold" }}>
          Close Time:{" "}
          {timeLeft <= 0
            ? "Auction Closed"
            : `${days} days & ${hours}h ${minutes}m ${seconds}s`}
        </p>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: "1em 0", fontSize: "1.5em", fontWeight: "bold" }}>
          Current Price: {auction.current_price || "Be the first bidder"}
        </p>
        <p style={{ margin: "1em 0", fontSize: "1.5em", fontWeight: "bold" }}>
          Current Bidder: user {auction.current_bidder || "Be the first bidder"}
        </p>
        <p
          style={{
            margin: "1em 0",
            fontSize: "1.5em",
            fontWeight: "bold",
            color: "red",
          }}
        >
          Suggested Bid: {suggestedBid} $
        </p>
        <input
          type="number"
          value={bid || ""}
          onChange={(e) => setBid(e.target.value)}
          style={{ width: "60%", padding: "10px", fontSize: "1em" }}
          disabled={timeLeft <= 0}
        />
        <button
          onClick={() => {
            const bidNumber = Number(bid);

            if (
              bid &&
              bidNumber > (auction.current_price || auction.start_price)
            ) {
              submitBid(bidNumber);
            } else {
              toast.error("Your bid must be higher than the current price");
            }
          }}
          style={{
            width: "60%",
            padding: "10px",
            fontSize: "1em",
            marginTop: "10px",
            backgroundColor: timeLeft <= 0 ? "grey" : "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          disabled={timeLeft <= 0}
        >
          {timeLeft <= 0 ? "Auction Closed" : "Submit Bid"}
        </button>
      </div>
    </div>
  );
};

export default AuctionIdPage;

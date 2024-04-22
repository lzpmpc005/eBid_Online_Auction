"use client";

import axios from "@/utils/axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { auctionType } from "@/utils/types";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ActionsProps {
  disabled: boolean;
  auctionId: string;
  isPublished: boolean;
  onAuctionUpdate: (auction: auctionType) => void;
}

export const Actions = ({
  disabled,
  auctionId,
  isPublished,
  onAuctionUpdate,
}: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishedState, setIsPublishedState] = useState(isPublished);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId");

      if (isPublishedState) {
        const res = await axios.patch(`/auctions/${auctionId}/unpublish`, {
          userId,
        });
        setIsPublishedState(res.data.isPublished);

        onAuctionUpdate(res.data);
        toast.success("auction unpublished");
      } else {
        const res = await axios.patch(`/auctions/${auctionId}/publish`, {
          userId,
        });
        setIsPublishedState(res.data.isPublished);

        onAuctionUpdate(res.data);
        toast.success("auction published");
        confetti.onOpen();
      }
    } catch (error) {
      if (error instanceof Error) {
        const axiosError = error as any;
        if (axiosError.response) {
          toast.error(axiosError.response.data.error);
        } else if (axiosError.request) {
          toast.error("No response from server");
        } else {
          toast.error("Error setting up request");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId");

      await axios.delete(`/auctions/${auctionId}`, {
        data: { userId },
      });

      toast.success("auction deleted");

      router.push(`/seller/auctions`);
    } catch (error) {
      if (error instanceof Error) {
        const axiosError = error as any;
        if (axiosError.response) {
          toast.error(axiosError.response.data.error);
        } else if (axiosError.request) {
          toast.error("No response from server");
        } else {
          toast.error("Error setting up request");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublishedState ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

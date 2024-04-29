"use client";

import { useRouter } from "next/navigation";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";

import { IconBadge } from "@/components/common/icon-badge";
import { Banner } from "@/components/common/banner";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/start_price-form";
import { Actions } from "./_components/actions";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { auctionType, CategoryType } from "@/utils/types";
import { CloseTimeForm } from "./_components/close-time-form";

const auctionIdPage = ({ params }: { params: { auctionId: string } }) => {
  const [auction, setauction] = useState<auctionType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [completionText, setCompletionText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    (async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        router.push("/");
        return;
      }

      const response = await axios.get(`/auctions/${params.auctionId}`);
      const { auction, categories } = response.data;

      if (!auction) {
        router.push("/");
        return;
      }
      setauction(auction);
      handleauctionUpdate(auction);
      setCategories(categories);
      setLoading(false);
    })();
  }, [params.auctionId]);

  const handleauctionUpdate = (updatedauction: auctionType) => {
    setauction(updatedauction);

    const requiredFields = updatedauction
      ? [
          updatedauction.title,
          updatedauction.description,
          updatedauction.imageUrl,
          updatedauction.start_price,
          updatedauction.categoryId,
          updatedauction.close_time,
        ]
      : [];

    const completedFields = requiredFields.filter(Boolean).length;
    const totalFields = requiredFields.length;
    const newCompletionText = `(${completedFields}/${totalFields})`;
    const newIsComplete = requiredFields.every(Boolean);

    setCompletionText(newCompletionText);
    setIsComplete(newIsComplete);
  };

  return (
    <>
      {!auction?.isPublished && (
        <Banner label="This auction is unpublished. It will not be visible on the platform." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">auction setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          {auction && (
            <Actions
              disabled={!isComplete}
              auctionId={params.auctionId}
              isPublished={auction.isPublished}
              onAuctionUpdate={handleauctionUpdate}
            />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your auction</h2>
            </div>
            {auction ? (
              <>
                <TitleForm initialData={auction} auctionId={auction.id} />
                <DescriptionForm
                  initialData={{
                    ...auction,
                    description: auction.description || "",
                  }}
                  auctionId={auction.id}
                  onAuctionUpdate={handleauctionUpdate}
                />
                <ImageForm
                  initialData={{
                    ...auction,
                    imageUrl: auction.imageUrl || "",
                  }}
                  auctionId={auction.id}
                  onAuctionUpdate={handleauctionUpdate}
                />
                {categories.length > 0 && (
                  <CategoryForm
                    initialData={{ categoryId: auction.categoryId || "" }}
                    auctionId={auction.id}
                    options={categories.map((category: CategoryType) => ({
                      label: category.name,
                      value: category.id,
                    }))}
                    onAuctionUpdate={handleauctionUpdate}
                  />
                )}
              </>
            ) : null}
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sale your auction</h2>
              </div>
              {auction && (
                <>
                  <PriceForm
                    initialData={{ start_price: auction.start_price }}
                    auctionId={auction.id}
                    onAuctionUpdate={handleauctionUpdate}
                  />
                  <CloseTimeForm
                    initialData={{
                      close_time: auction.close_time
                        ? new Date(auction.close_time)
                        : null,
                    }}
                    auctionId={auction.id}
                    onAuctionUpdate={handleauctionUpdate}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default auctionIdPage;

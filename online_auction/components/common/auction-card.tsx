import Image from "next/image";
import Link from "next/link";
import { AlarmClock } from "lucide-react";

import { IconBadge } from "./icon-badge";
import { formatPrice } from "@/lib/format";
import { useState, useEffect } from "react";

interface auctionCardProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  current_price?: number;
  category: string;
  close_time: string;
}

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export const AuctionCard = ({
  id,
  title,
  imageUrl,
  price,
  current_price,
  category,
  close_time,
}: auctionCardProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const difference = +new Date(close_time) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    const key = interval as keyof TimeLeft;
    if (!timeLeft[key]) {
      return;
    }
    timerComponents.push(
      <span>
        {timeLeft[key]} {interval}{" "}
      </span>
    );
  });

  return (
    <Link href={`/auctions/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-800">
              <IconBadge size="sm" icon={AlarmClock} />
              {timerComponents.length ? (
                timerComponents
              ) : (
                <span>Auction Closed!</span>
              )}
            </div>
          </div>

          <p className="text-md md:text-sm font-medium text-slate-700">
            Start Price: {formatPrice(price)}
          </p>
          <p className="text-md md:text-sm font-medium text-slate-700">
            Current Bid: {formatPrice(current_price || price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

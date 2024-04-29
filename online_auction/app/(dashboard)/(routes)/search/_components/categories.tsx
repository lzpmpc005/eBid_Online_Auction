"use client";

import { CategoryType } from "@/utils/types";

import {
  FcStatistics,
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcLightAtTheEndOfTunnel,
  FcHome,
  FcMenu,
  FcKindle,
  FcBookmark,
  FcFolder,
  FcPackage,
} from "react-icons/fc";
import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: CategoryType[];
}

const iconMap: Record<CategoryType["name"], IconType> = {
  Kitchen: FcHome,
  Filming: FcFilmReel,
  Tools: FcEngineering,
  "Old things": FcOldTimeCamera,
  Music: FcMusic,
  Books: FcFolder,
  Clothes: FcPackage,
  Digital: FcMultipleDevices,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

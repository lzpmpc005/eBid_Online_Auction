// "use client";

// import axios from "@/utils/axios";
// import { useEffect, useState } from "react";

// import { SearchInput } from "@/components/common/search-input";
// import { getAuctions, AuctionWithCategory } from "@/actions/get-auctions";
// import { AuctionsList } from "@/components/common/Auctions-list";
// import { Categories } from "./_components/categories";

// interface SearchPageProps {
//   searchParams: {
//     title: string;
//     categoryId: string;
//   };
// }

// const SearchPage = ({ searchParams }: SearchPageProps) => {
//   const [categories, setCategories] = useState([]);
//   const [auctions, setAuctions] = useState<AuctionWithCategory[]>([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       const userId = localStorage.getItem("userId");
//       if (!userId) {
//         console.log("Search Page No user id");
//         window.location.href = "/";
//         return;
//       }

//       const categoriesData = await axios.get("/categories");
//       setCategories(categoriesData.data);

//       const Auctions = await getAuctions({
//         userId,
//         ...searchParams,
//       });
//       setAuctions(auctions);
//     };

//     fetchData();
//   }, [searchParams]);

//   return (
//     <>
//       <div className="px-6 pt-6 md:hidden md:mb-0 block">
//         <SearchInput />
//       </div>
//       <div className="p-6 space-y-4">
//         <Categories items={categories} />
//         <AuctionsList items={auctions} />
//       </div>
//     </>
//   );
// };

// export default SearchPage;

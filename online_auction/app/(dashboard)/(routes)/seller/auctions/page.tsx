"use client";

import { useEffect, useState } from "react";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

import axios from "@/utils/axios";

const AuctionsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        window.location.href = "/";
        return;
      }

      const response = await axios.get(`/auctions?userId=${userId}`);
      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AuctionsPage;

"use client";

import type { Metadata } from "next";

export const medadata: Metadata = {
  title: "eBid | Home",
  description: "eBid Home Page",
};

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
      <p>This is the home page to display the auctions of the current user</p>
    </div>
  );
}

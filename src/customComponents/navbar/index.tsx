"use client"; // Indicates that this component uses client-side rendering

import React from "react";
import { LayoutGrid, Heart } from "lucide-react"; // Importing icons

interface DashboardNavBarProps {
  tab: string;
  setTab: (tab: "dashboard" | "favourites") => void;
}

const DashboardNavBar: React.FC<DashboardNavBarProps> = ({ tab, setTab }) => {
  return (
    <div className="p-3 w-16 hidden xl:block lg:h-[100%] xl:h-[600px] my-4 ml-4 space-y-8 rounded-full bg-secondary">
      <div
        className={`rounded-full cursor-pointer p-2 ${
          tab === "dashboard" ? "bg-[#ECEAFF]" : "bg-[#F8F9FB]"
        }`}
      >
        <LayoutGrid
          color={tab === "dashboard" ? "#5041BC" : "#1E232AA1"}
          onClick={() => setTab("dashboard")}
        />
      </div>
      <div
        className={`rounded-full cursor-pointer p-2 ${
          tab === "favourites" ? "bg-[#ECEAFF]" : "bg-[#F8F9FB]"
        }`}
      >
        <Heart
          color={tab === "favourites" ? "#5041BC" : "#1E232AA1"}
          onClick={() => setTab("favourites")}
        />
      </div>
    </div>
  );
};

export default DashboardNavBar;

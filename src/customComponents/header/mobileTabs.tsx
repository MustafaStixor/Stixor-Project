"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

interface DashboardMobileTabsProps {
  setTab: (newTab: "dashboard" | "favourites") => void;
  setShowMobileTabs: (show: boolean) => void;
}

const DashboardMobileTabs: React.FC<DashboardMobileTabsProps> = ({
  setTab,
  setShowMobileTabs,
}) => {
  return (
    <div className="absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-50">
      <aside className="h-full w-full bg-indigo-800 relative">
        <div className="flex justify-between items-center mb-4">
          <Avatar className="ml-4 mt-4">
            <AvatarImage src="/Assets/Logo-256x256 2.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <button
            className="text-white text-5xl mr-4"
            onClick={() => setShowMobileTabs(false)}
          >
            ×
          </button>
        </div>
        <div
          className="dashboard-mobile-tabs__item text-white text-center font-bold text-3xl mt-8 cursor-pointer"
          onClick={() => {
            setTab("dashboard");
            setShowMobileTabs(false);
          }}
        >
          Dashboard
        </div>
        <hr className="h-px border-white my-6 mx-5" />
        <div className="bg-white"></div>
        <div
          className="dashboard-mobile-tabs text-white text-center font-bold text-3xl cursor-pointer"
          onClick={() => {
            setTab("favourites");
            setShowMobileTabs(false);
          }}
        >
          Favorite Events
        </div>
        <hr className="h-px border-white my-6 mx-5" />
      </aside>
    </div>
  );
};

export default DashboardMobileTabs;

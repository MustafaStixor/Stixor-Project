"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "../customComponents/header";
import DashboardNavBar from "../customComponents/navbar";
import DashboardTab from "../customComponents/dashboard";
import FavouritesTab from "../customComponents/favourite";
import moment from "moment";
import { useStore } from "@/stores";

const Home: React.FC = () => {
  const [tab, setTab] = useState<"dashboard" | "favourites">("dashboard");
  const { eventOfTheMonth, setEventOfTheMonth } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;

    if (hash === "#favourites" || path.includes("favourites")) {
      setTab("favourites");
    } else {
      setTab("dashboard");
    }

    const fetchEventOfTheMonth = async () => {
      setLoading(true);
      const params = {
        start: moment().format("YYYY-MM-DD"),
        sort: "-rank",
      };

      try {
        await setEventOfTheMonth(params);
      } catch (error) {
        console.error("Failed to fetch event of the month:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventOfTheMonth();
  }, [setEventOfTheMonth]);

  const handleTabChange = (newTab: "dashboard" | "favourites") => {
    setTab(newTab);
    const newPath = newTab === "favourites" ? "#favourites" : "#dashboard";
    window.history.replaceState({}, "", newPath);
  };

  return (
    <div className="App bg-primary h-screen w-screen xl:overflow-clip overflow-y-scroll">
      <div className="flex flex-row items-center justify-center">
        <DashboardHeader setTab={handleTabChange} tab={tab} />
      </div>
      <div className="flex flex-row items-stretch justify-start">
        <div className="justify-start">
          <DashboardNavBar setTab={handleTabChange} tab={tab} />
        </div>
        <div className="h-[85%] xl:p-4 w-screen">
          {tab === "dashboard" ? (
            eventOfTheMonth ? (
              <DashboardTab eventOfTheMonth={eventOfTheMonth!} />
            ) : (
              ""
            )
          ) : (
            <FavouritesTab />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

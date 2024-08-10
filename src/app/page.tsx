"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "../customComponents/header";
import DashboardNavBar from "../customComponents/navbar";
import DashboardTab from "../customComponents/dashboard";
import FavouritesTab from "../customComponents/favourite";
import { getData } from "../services";
import { Event } from "../types/index";
import moment from "moment";

const Home: React.FC = () => {
  const [tab, setTab] = useState<"dashboard" | "favourites">("dashboard");
  const [favouriteEvents, setFavoriteEvents] = useState<Event[]>([]);
  const [eventOfTheMonth, setEventOfTheMonth] = useState<Event>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventOfTheMonth = async () => {
      setLoading(true);
      const params = {
        start: moment().format("YYYY-MM-DD"),
        sort: "-rank",
      };

      try {
        const response = await getData(params);
        setEventOfTheMonth(response.results[0]);
      } catch (error) {
        console.error("Failed to fetch event of the month:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventOfTheMonth();
  }, []);

  return (
    <div className="App bg-[#F1F1F1] h-screen w-screen xl:overflow-clip overflow-y-scroll">
      <div className="flex flex-row items-center justify-center">
        <DashboardHeader setTab={setTab} tab={""} />
      </div>
      <div className="flex flex-row items-stretch justify-start">
        <div className="justify-start">
          <DashboardNavBar setTab={setTab} tab={tab} />
        </div>
        <div className="h-[85%] xl:p-4 w-screen">
          {tab === "dashboard" ? (
            eventOfTheMonth ? (
              <DashboardTab
                setFavoriteEvents={setFavoriteEvents}
                favouriteEvents={favouriteEvents}
                eventOfTheMonth={eventOfTheMonth!}
              />
            ) : (
              ""
            )
          ) : (
            <FavouritesTab
              setFavoriteEvents={setFavoriteEvents}
              favouriteEvents={favouriteEvents}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

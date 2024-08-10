"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import moment from "moment";
import { Event } from "@/types";

interface EventOfTheMonthProps {
  eventOfTheMonth: Event;
}

const EventOfTheMonthCard = (props: EventOfTheMonthProps) => {
  const { eventOfTheMonth } = props;
  return (
    <div className="w-auto mt-3 h-auto lg:min-w-[326px] mx-2 xl:mx-0 mb-2 xl:mb-0">
      <div className="text-white bg-[#5041BC] xl:h-full xl:ml-4z-10 px-2 pt-2 pb-1 rounded-xl">
        <div className="flex-row w-full">
          <div className="flex justify-between items-center">
            <div className="text-left text-[24px] font-[700] pl-3 pb-1 text-nowrap">
              Event of <br /> the Month
            </div>
            <div className="ml-auto">
              <Avatar className="w-[70px] h-[70px]">
                <AvatarImage src="/Assets/Events-Badge.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        <div className="flex-row mx-3 mb-3">
          <div className="bg-[#FFFFFF] border-spacing-10 flex-wrap justify-content-between rounded-lg grid grid-cols-2">
            <div className="col-span-1 text-left pl-4 py-2 font-bold text-[#5041BC]">
              {eventOfTheMonth.title}
            </div>
            <div className="col-span-1 pt-1 ml-auto">
              <Avatar className="size-12 w-[80px]">
                <AvatarImage src="/Assets/Group 6205.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="col-span-1 text-left pl-2 text-[#797D8C]">
              <div className="pl-2 mt-[-12px] pb-1">
                {eventOfTheMonth.category}
              </div>
              <div className="flex flex-row pl-2">
                <Avatar className="size-4 mt-1">
                  <AvatarImage src="/Assets/carbon_location-filled.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="pl-2 pb-1">{eventOfTheMonth.country}</div>
              </div>
            </div>
            <div className="col-span-1 mt-[-10px] text-[#D2D2D2] text-right pr-3">
              {moment(eventOfTheMonth.start).format("ddd D MMM YYYY")}
              <br />
              {moment(eventOfTheMonth.start).format(" hh:mm A")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOfTheMonthCard;

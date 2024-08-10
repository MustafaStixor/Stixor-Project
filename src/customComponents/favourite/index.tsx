import React from "react";
import { Heart } from "lucide-react";
import moment from "moment";
import { DropdownMenuCheckboxItem } from "../../ui/dropdown-menu";
import { ListEnd } from "lucide-react";
import { Event } from "../../types/index";

interface FavouritesTabProps {
  favouriteEvents: Event[];
  setFavoriteEvents: (events: Event[]) => void;
}

const FavouritesTab: React.FC<FavouritesTabProps> = (props) => {
  return (
    <div className="mt-8 overflow-hidden">
      <div className="flex flex-row justify-start">
        <p className="w-auto text-2xl font-semibold mb-2 ml-6">
          Favourite List
        </p>
      </div>
      <div className="overflow-x-auto max-w-screen xl:overflow-clip">
        <div className="h-full w-full lg:w-[100%] text-left min-w-[620px] mx-4 overflow-x-scroll">
          <div className="grid grid-cols-7 text-2xl text-black">
            <div className="col-span-1 pl-4">#</div>
            <div className="col-span-2 pl-3">Name</div>
            <div className="col-span-1">Time</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-1">Location</div>
            <div className="col-span-1"></div>
            <hr className="h-px border-[#6A6A6A] col-span-7" />
          </div>
          <div>
            {props.favouriteEvents.map((row: Event, index: number) => (
              <div
                key={row.id}
                className="grid grid-cols-7 p-2 border-1 my-2 rounded-lg bg-[#FFFFFF]"
              >
                <div className="font-bold col-span-1">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
                <div className="col-span-2 pr-5">{row.title}</div>
                <div>{moment(row.start).format("hh:mm A")}</div>
                <div>{moment(row.start).format("ddd D MMM")}</div>
                <div className="pl-10">{row.country}</div>
                <div>
                  <Heart
                    className={`w-9 m-auto ${
                      props.favouriteEvents.some((event) => event.id === row.id)
                        ? "fill-red-600"
                        : ""
                    }`}
                    color={
                      props.favouriteEvents.some((event) => event.id === row.id)
                        ? "red-600"
                        : "#5041BC"
                    }
                    onClick={() =>
                      props.setFavoriteEvents(
                        props.favouriteEvents.some(
                          (event) => event.id === row.id
                        )
                          ? props.favouriteEvents.filter(
                              (event) => event.id !== row.id
                            )
                          : [...props.favouriteEvents, row]
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavouritesTab;

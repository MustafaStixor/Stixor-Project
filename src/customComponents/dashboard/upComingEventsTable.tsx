import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import moment from "moment";
import TableSkeleton from "./tableSkeleton";
import { CircularProgress } from "@mui/material";
import { Event } from "@/types";
import { getData } from "@/services";
import InfiniteScroll from "react-infinite-scroll-component";

interface DashboardUpComingTableProps {
  setFavoriteEvents: (favouriteEvents: Event[]) => void;
  favouriteEvents: Event[];
}

const UpComingEventsTable = (props: DashboardUpComingTableProps) => {
  const [data, setData] = useState<Event[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleData = () => {
      const params = {
        "start.lte": moment().endOf("month").format("YYYY-MM-DD"),
        "start.gte": moment().format("YYYY-MM-DD"),
        sort: "start",
        offset: 0,
      };

      getData(params).then((response) => {
        setData(response.results);
      });
    };
    handleData();
  }, []);

  const fetchMoreData = () => {
    const params = {
      "start.lte": moment().endOf("month").format("YYYY-MM-DD"),
      "start.gte": moment().format("YYYY-MM-DD"),
      sort: "start",
      offset: (page + 1) * 10 - 10,
    };
    getData(params).then((response) => {
      setData([...data, ...response.results]);

      setLoading(false);
      setPage(page + 1);
      setHasMore(response.results.length > 0);
    });
  };

  return (
    <div className="border-x-zinc-100 h-full lg:h-[370px] lg:min-w-[385px] rounded-lg bg-[#FFFFFF] w-full">
      <div>
        <h1 className="text-2xl py-4 text-left px-4 font-[400]">
          Upcoming Events
        </h1>
      </div>

      <InfiniteScroll
        height={292}
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <div className="flex justify-center my-3">
            <CircularProgress />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid grid-cols-2 lg:grid-cols-1 pr-1 gap-2 px-2 lg:px-0">
          {data.length === 0 ? (
            <div className="bg-[#F1F1F1] col-span-2 xl:col-span-1 ">
              <TableSkeleton />
            </div>
          ) : null}
          {data.map((col: Event, index: number) => (
            <div
              key={index}
              className="grid grid-cols-5 text-left justify-around p-1 lg:mx-3 border-2 border-[#F3F3F3] rounded-lg h-fit bg-[#FFFFFF]"
            >
              <div className="col-span-4 grid-row-2">
                <div className="lg:size-4 text-black font-[600] lg:w-full min-h-7 truncate row-span-1">
                  {col.title}
                </div>
                <div className="row-span-1 text-[#797D8C] text-sm font-[400]">
                  {moment(col.start).format("ddd D MMM hh:mm A")}
                </div>
              </div>
              <Heart
                className={`w-9 lg:pr-4 pr-2 col-span-1 m-auto ${
                  props.favouriteEvents.some((event) => event.id === col.id)
                    ? "fill-red-600"
                    : ""
                }`}
                color={
                  props.favouriteEvents.some((event) => event.id === col.id)
                    ? "red-600"
                    : "#5041BC"
                }
                onClick={() =>
                  props.setFavoriteEvents(
                    props.favouriteEvents.some((event) => event.id === col.id)
                      ? props.favouriteEvents.filter(
                          (event) => event.id !== col.id
                        )
                      : [...props.favouriteEvents, col]
                  )
                }
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default UpComingEventsTable;

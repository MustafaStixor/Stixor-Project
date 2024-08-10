// pages/dashboard.tsx
import { useState, useEffect } from "react";
import { DropdownMenuCheckboxes } from "./dropDownMenu";
import { Heart } from "lucide-react";
import { ListEnd } from "lucide-react";
import moment from "moment";
import EventDialog from "./eventDialog";
import TableSkeleton from "./tableSkeleton";
import { getData } from "../../services";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import { Event } from "@/types";

interface DashboardTableProps {
  setFavoriteEvents: (favouriteEvents: Event[]) => void;
  favouriteEvents: Event[];
}

const DashboardTable = (props: DashboardTableProps) => {
  const [category, setCategory] = useState("all");
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const [modalRow, setModalRow] = useState<any>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    const handleData = () => {
      const params = {
        limit: 10,
        category: category === "all" ? undefined : category,
        "start.lte": endDate ? moment(endDate).format("YYYY-MM-DD") : undefined,
        "start.gte": startDate
          ? moment(startDate).format("YYYY-MM-DD")
          : undefined,
        offset: 0,
      };

      getData(params).then((response) => {
        setData(response.results);

        setLoading(false);
      });
    };
    handleData();
  }, [category, startDate, endDate]);

  const fetchMoreData = () => {
    const params = {
      limit: 10,
      category: category === "all" ? undefined : category,
      "start.lte": endDate ? moment(endDate).format("YYYY-MM-DD") : undefined,
      "start.gte": startDate
        ? moment(startDate).format("YYYY-MM-DD")
        : undefined,
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
    <div className="w-auto mb-2 xl:mb-0 mt-3 xl:mt-0 xl:min-h-[520px]">
      <div className="flex flex-row justify-between pb-2 mx-3">
        <p className="w-auto text-2xl font-[600] mb-2">Events List</p>
        <DropdownMenuCheckboxes
          startDate={startDate}
          endDate={endDate}
          category={category}
          setCategory={setCategory}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setPage={setPage}
        />
      </div>
      {openModal && (
        <EventDialog modalRow={modalRow} setOpenModal={setOpenModal} />
      )}

      <InfiniteScroll
        height={464}
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
        <div className="w-auto overflow-x-auto lg:overflow-x-hidden mx-3">
          <div
            className={`grid grid-cols-7 gap-2 md:text-2xl max-h-4/5 text-lg text-wrap text-black text-left min-w-[650px] ${
              loading ? "xl:min-w-[898px]" : ""
            }`}
          >
            <div className="col-span-1 pl-4 font-[600]">#</div>
            <div className="col-span-2 pl-3 font-[600]">Name</div>
            <div className="col-span-1 font-[600]">Time</div>
            <div className="col-span-1 font-[600]">Date</div>
            <div className="col-span-1 font-[600]">Location</div>
            <div className="col-span-1 font-[600]"></div>
            <hr className="h-px border-[#6A6A6A] col-span-7" />
            <div className="col-span-7 xl:min-w-[650px]">
              {data.length === 0 ? (
                <div className="xl:min-w-[890px] overflow-hidden">
                  <TableSkeleton />
                </div>
              ) : null}
              {data.map((row: any, index: number) => (
                <div
                  onClick={() => {
                    setOpenModal(true);
                    setModalRow(row);
                  }}
                  className="col-span-7 text-wrap grid grid-cols-7 border-1 my-2  p-2 rounded-lg bg-[#FFFFFF] font-normal text-base cursor-pointer"
                  key={index}
                >
                  <div className="text-black font-[600] col-span-1 xl:ml-2 ">
                    {index + 1}
                  </div>

                  <div className="text-[#797D8C] col-span-2 mr-4 font-[400] truncate">
                    {row.title}
                  </div>
                  <div className="text-[#797D8C] font-[600]">
                    {moment(row.start).format("hh:mm A")}
                  </div>
                  <div className="text-[#797D8C] pl-2 font-[600]">
                    {moment(row.start).format("ddd D MMM")}
                  </div>
                  <div className="text-[#797D8C] px-11 font-[500]">
                    {row.country}
                  </div>

                  <div onClick={(e) => e.stopPropagation()}>
                    <Heart
                      className={`w-9 m-auto md:ml-10 ${
                        props.favouriteEvents?.find(
                          (event: any) => event.id == row.id
                        )
                          ? "fill-red-600"
                          : ""
                      }`}
                      color={
                        props.favouriteEvents?.find(
                          (event: any) => event.id == row.id
                        )
                          ? "red-600"
                          : "#5041BC"
                      }
                      onClick={() =>
                        props.setFavoriteEvents(
                          props.favouriteEvents?.find(
                            (event: any) => event.id == row.id
                          )
                            ? props.favouriteEvents.filter(
                                (event: any) => event.id !== row.id
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
      </InfiniteScroll>
    </div>
  );
};

export default DashboardTable;

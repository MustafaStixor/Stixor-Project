import React, { useEffect, useRef } from "react";
import { Card } from "../../ui/card";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

interface EventDialogProps {
  modalRow: {
    title: string;
    start: string;
    category: string;
    description: string;
    country: string;
  };
  setOpenModal: (open: boolean) => void;
}

const EventDialog: React.FC<EventDialogProps> = ({
  modalRow,
  setOpenModal,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenModal]);

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Card ref={modalRef} className="fixed lg:w-[792px] w-[370px] h-auto">
        <div>
          {/* Visible on lg: and hidden otherwise */}
          <div className="lg:block hidden">
            <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center lg:m-6 mx-6">
              <div className="text-[#0F172A] font-bold text-[30px] text-left">
                {modalRow.title}
              </div>

              <div className="lg:bg-[#ECEAFF] lg:text-[#5041BC] lg:px-3 rounded-lg text-[14px] py-2 lg:py-1 min-w-[194px] text-left lg:text-right text-pretty">
                {moment(modalRow.start).format("ddd D MMM YYYY hh:mm A")}
              </div>
            </div>
            <div className="text-left text-[#475569] ml-6 lg:my-6 my-2 text-[20px]">
              Category:&nbsp;
              {modalRow.category}
            </div>
          </div>

          {/* Hidden on lg: and visible otherwise */}
          <div className="lg:hidden block">
            <div className="flex flex-col text-left">
              <div className="text-[#0F172A] font-bold text-[30px] my-2 ml-4">
                {modalRow.title}
              </div>

              <div className="text-left text-[#9AA8BD]  text-[20px] my-2 ml-4">
                Category:&nbsp;
                {modalRow.category}
              </div>

              <div className="  text-[#797D8C] rounded-lg text-[14px]  min-w-[194px] text-left my-2 ml-4">
                {moment(modalRow.start).format("ddd D MMM YYYY hh:mm A")}
              </div>
            </div>
          </div>
        </div>

        <hr className="h-px border-[#E2E8F0]" />
        <div className="m-6">
          <p className="text-[#1E232A] font-semibold text-left mb-3 text-[20px]">
            Description
          </p>
          <p className="text-[#9E9E9E] text-left text-[16px]">
            {modalRow.description}
          </p>
        </div>
        <hr className="h-px border-[#E2E8F0]" />
        <div className="flex m-6 md:justify-start justify-center">
          <Avatar className="h-[32.89px] w-[32.89px] mr-2">
            <AvatarImage src="/Assets/carbon_location-filled.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="text-[#797D8C] text-[21.93px]">
            {modalRow.country}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EventDialog;

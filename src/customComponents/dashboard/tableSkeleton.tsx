import React from "react";
import { Skeleton } from "../../ui/skeleton";

const TableSkeleton: React.FC = () => {
  return (
    <div>
      {Array.from({ length: 10 }, (_, index) => (
        <Skeleton
          key={index}
          className=" h-[40px] rounded-lg bg-[#FFFFFF] my-2"
        />
      ))}
    </div>
  );
};

export default TableSkeleton;

// components/DashboardHeader.tsx
import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Image from "next/image";
import { ListMinus, Search } from "lucide-react";
import DashboardMobileTabs from "./mobileTabs";

interface DashboardHeaderProps {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<"dashboard" | "favourites">>;
}

const DashboardHeader = (props: DashboardHeaderProps) => {
  const [showMobileTabs, setShowMobileTabs] = useState(false);

  return (
    <div className="flex flex-row items-left justify-evenly xl:justify-start w-full py-3 bg-[#FFFFFF] h-16">
      <Avatar className="xl:ml-7 ml-6 md:ml-4">
        <AvatarImage src="/Assets/Stixor-Logo.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="lg:w-1/3 w-2/3 lg:mx-52 mx-3 relative">
        <Search size={20} className="absolute left-3 top-2" />
        <div>
          <Input
            className="pl-10 rounded-lg bg-[#F9FAFC] placeholder:text-[#3D4756] border-0"
            type="text"
            placeholder="Search Events ..."
          />
        </div>
      </div>
      <div className="block xl:hidden my-auto mr-6 justify-end xl:ml-40 md:mr-4">
        <ListMinus onClick={() => setShowMobileTabs(!showMobileTabs)} />
        {showMobileTabs && (
          <DashboardMobileTabs
            setShowMobileTabs={setShowMobileTabs}
            setTab={props.setTab}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;

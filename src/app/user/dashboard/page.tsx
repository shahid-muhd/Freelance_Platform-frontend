"use client";
import React, { useEffect, useMemo, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaNetworkWired } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { LuBuilding2 } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import UserDetailsComponent from "../../../components/DashboardComponents/PersonalDetails/userDetailsComponent";
import JobOverviewComponent from "../../../components/DashboardComponents/JobOverviewComponent";
import userProfileServices from "@/app/services/userProfileServices";
import WorkProfiles from "../../../components/DashboardComponents/WorkProfile/WorkProfiles";
import workProfileServices from "@/app/services/workProfileServices";
import { WorkProfile } from "@/utils/types";
import { PiSignOutBold } from "react-icons/pi";
interface MenuItems {
  id: number;
  name: string;
  icon?: JSX.Element;
}

function page() {
  const [currentMenuId, setCurrentMenuId] = useState(1);
  const { getUserDetails, handleLogout } = userProfileServices();
  const { getWorkProfiles } = workProfileServices();
  const [workProfiles, setworkProfiles] = useState<WorkProfile[] | null>(null);
  const menuIdChanger = (menuId: number) => {
    setCurrentMenuId(menuId);
  };

  useEffect(() => {
    // The userDetails Service stores the fetched data in the context
    getUserDetails();

    getWorkProfiles().then((res: any) => {
      console.log(JSON.parse(res));

      setworkProfiles(JSON.parse(res));
    });
  }, []);

  const renderComponent = useMemo(() => {
    switch (currentMenuId) {
      case 1:
        return <UserDetailsComponent />;
      case 2:
        return <JobOverviewComponent />;
      case 3:
        return <WorkProfiles workProfiles={workProfiles} />;
      case 4:
        return null;
      default:
        return null;
    }
  }, [currentMenuId]);

  const menuItems: MenuItems[] = [
    {
      id: 1,
      name: "Personal Details",
      icon: <RxDashboard className="size-4" />,
    },
    {
      id: 2,
      name: "Jobs Overview",
      icon: <FaNetworkWired className="size-5" />,
    },
    { id: 3, name: "Work Profiles", icon: <LuBuilding2 className="size-4" /> },
    { id: 4, name: "Reviews", icon: <FaStar className="size-4" /> },
  ];

  return (
    <div className="container  h-svh p-0  ">
      <div className="wrapper  flex gap-4 h-5/6">
        <div className="side-panel w-1/5 h-full rounded-2xl bg-slate-100 drop-shadow-lg dark:bg-gray-900 p-10 pl-3">
          <div className="panel-menu-wrapper h-full">
            <div className="panel-menu-top  h-1/2">
              {menuItems &&
                menuItems.map((menu) => (
                  <div
                    key={menu.id}
                    className={`${
                      menu.id === currentMenuId
                        ? "text-blue-500 "
                        : " text-gray-500"
                    }  sidebar-menu text-left  w-full flex gap-3 items-baseline  p-2 px-3 rounded-md mb-5 hover:cursor-pointer  `}
                    onClick={() => {
                      menuIdChanger(menu.id);
                    }}
                  >
                    <div>{menu.icon}</div>
                    <p className="ml-2 text-lg">{menu.name}</p>
                  </div>
                ))}
            </div>
            <div className="panel-menu-bottom h-1/2  relative">
              <div className="absolute bottom-0 text-gray-500">
                <div
                  className={` sidebar-menu text-left  w-full flex gap-3 items-baseline  p-2 px-3 rounded-md mb-5 hover:cursor-pointer  `}
                >
                  <div>
                    <FaStar />
                  </div>
                  <p className="ml-2 text-lg">Help</p>
                </div>
                <div
                  onClick={handleLogout}
                  className={` sidebar-menu text-left  w-full flex gap-3 items-baseline  p-2 px-3 rounded-md mb-5 hover:cursor-pointer  `}
                >
                  <div>
                    <PiSignOutBold size={20} />
                  </div>

                  <p className="ml-2 text-lg ">Log Out</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="board rounded-2xl w-4/5  drop-shadow-lg overflow-y-scroll overflow-x-hidden no-scrollbar ">
          {renderComponent}
        </div>
      </div>
    </div>
  );
}

export default page;

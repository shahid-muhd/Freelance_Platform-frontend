import React from "react";
import ProjectListings from "./components/projectListings";
import SideBarProfile from "./components/sideBarProfile";

function page() {
  return (
    <div className="flex gap-5 w-100  min-h-screen ">
      <div className="w-9/12   rounded-xl">
        <ProjectListings />
      </div>
      <div className="w-3/12 pt-20">
        <div className="sidebar-wrapper fixed  w-[inherit]">
          <div className="w-11/12">
            <SideBarProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

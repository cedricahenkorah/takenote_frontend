import React from "react";
import { FcOpenedFolder } from "react-icons/fc";
import {
  LuFolderHeart,
  LuFolderCog,
  LuFolders,
  LuLogOut,
} from "react-icons/lu";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";

const Sidebar = ({ showModal, setShowModal }) => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-1/5 lg:flex flex-col hidden bg-white rounded-xl shadow-xl p-5">
      {/* logo */}
      <Link to="/">
        <div className="flex items-center gap-x-2 pb-5 border-b">
          <FcOpenedFolder size={30} />
          <h1 className="text-lg font-bold tracking-wider">
            take<span className="text-amber-400">Note</span>
          </h1>
        </div>
      </Link>

      {/* navigation */}
      <div className="mt-5 h-full flex flex-col justify-between">
        <div>
          <div className="bg-lime-600 py-2 rounded-md">
            <p
              className="text-center font-semibold text-white cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Add a note
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-y-3">
            <div className="flex items-center gap-x-2 bg-slate-100 rounded-md p-2">
              <LuFolders size={20} />
              <p className="font-semibold">Home</p>
            </div>

            {/* <div className="flex items-center gap-x-2 p-2">
              <LuFolderHeart size={20} className="text-red-500" />
              <p className="font-semibold">Favorites</p>
            </div>

            <div className="flex items-center gap-x-2 p-2">
              <LuFolderCog size={20} />
              <p className="font-semibold">Settings</p>
            </div> */}
          </div>
        </div>

        <div
          className="flex items-center gap-x-2 p-2 cursor-pointer"
          onClick={handleLogout}
        >
          <LuLogOut size={20} /> <p className="font-semibold">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

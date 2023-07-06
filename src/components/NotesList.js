import React, { useEffect, useState } from "react";
import { MdPostAdd } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { FiMenu } from "react-icons/fi";
import { FcOpenedFolder } from "react-icons/fc";
import { Tooltip, Dropdown } from "flowbite-react";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";

const NotesList = ({ showModal, setShowModal }) => {
  const { notes, dispatch } = useNotesContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);

      const response = await fetch(
        "https://takenote-server.onrender.com/api/notes",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_NOTES", payload: json });
      }

      setIsLoading(false);
    };

    if (user) {
      fetchNotes();
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {notes && !isLoading && notes.length > 0 ? (
        <div className="lg:w-4/5 w-full p-2 lg:p-5 flex flex-col">
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-x-2">
              <FcOpenedFolder size={25} />
              <h1 className="text-md lg:text-lg font-bold tracking-wider">
                take<span className="text-amber-400">Note</span>
              </h1>
            </div> */}

            <div className="flex lg:hidden">
              <FcOpenedFolder size={25} onClick={() => setShowModal(true)} />
            </div>

            <h1 className="text-md lg:text-2xl font-semibold text-gray-500">
              {user && <p className="text-black">hi, {user.username}</p>}
            </h1>

            <div className="md:hidden flex">
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={<FiMenu size={25} />}
              >
                <Dropdown.Header className="flex items-center gap-x-2">
                  <MdPostAdd size={25} onClick={() => setShowModal(true)} />
                  <p>Add note</p>
                </Dropdown.Header>
                <Dropdown.Item className="flex items-center gap-x-2">
                  <LuLogOut size={20} color="red" onClick={handleLogout} />
                  <p>Logout</p>
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>

          <div className="mt-5 grid lg:grid-cols-4 grid-cols-2 gap-3">
            {notes &&
              notes.map((note) => <NoteItem key={note._id} note={note} />)}
          </div>
        </div>
      ) : notes && notes.length === 0 ? (
        <div className="lg:w-4/5 w-full p-2 lg:p-5 bg-white rounded-xl border-2 shadow-xl">
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col">
              <img
                src="/assets/man_sitting.png"
                alt="welcome"
                className="h-[250px] lg:h-[300px] w-[250px] lg:w-[300px]"
              />

              <h1 className="text-center text-lg font-semibold">
                It's a bit lonely in here😅, take a{" "}
                <span
                  className="text-blue-500 underline underline-offset-4 cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  {" "}
                  note
                </span>
              </h1>
            </div>
          </div>

          {/* <div className="mt-5 flex justify-center">
            <div className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <h1 className="font-bold text-xl lg:text-3xl">
                  <span className="text-amber-400">Create.</span> Organize.
                  Remember
                </h1>

                <img
                  src="/assets/dart.png"
                  alt="dart"
                  className="h-5 lg:h-10"
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-5 items-center">
                <div className="p-3 lg:p-5 bg-slate-100 rounded-xl shadow-lg mt-5 w-80">
                  <h1 className="text-lime-600 font-semibold text-sm lg:text-lg">
                    #ideas
                  </h1>

                  <div className="mt-3 flex flex-col gap-y-1 font-medium lg:font-semibold text-sm">
                    <p>Set up your to-do list</p>
                    <p>Meeting brief</p>
                    <p>Create a project plan</p>
                    <p>Grocery list</p>
                  </div>
                </div>

                <div className="">
                  <div className="">
                    <Tooltip content="add a new note">
                      <FcOpenedFolder
                        size={120}
                        onClick={() => setShowModal(true)}
                      />
                    </Tooltip>

                    <p className="font-semibold text-sm lg:text-base">
                      what's on your mind? put it here...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      ) : (
        <div className="lg:w-4/5 w-full h-full p-2 lg:p-5 flex flex-col">
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col gap-y-3">
              <img
                src="/assets/loading.png"
                alt="loading"
                className="h-64 w-64"
              />
              <p className="text-center text-lg font-semibold">
                hang on tight...😁
              </p>
            </div>
          </div>
        </div>
      )}
      <AddNote showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default NotesList;

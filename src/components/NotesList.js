import React, { useEffect } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { MdPostAdd } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { Tooltip } from "flowbite-react";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const NotesList = ({ showModal, setShowModal }) => {
  const { notes, dispatch } = useNotesContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("/api/notes", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_NOTES", payload: json });
      }
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
      {notes && notes.length > 0 ? (
        <div className="lg:w-4/5 w-full p-2 lg:p-5 flex flex-col">
          <div className="flex justify-between">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-500">
              hi there,{" "}
              {user && <span className="text-black">{user.username}</span>}
            </h1>

            <div className="flex lg:hidden gap-x-3">
              <Tooltip content="Add a note">
                <MdPostAdd size={25} onClick={() => setShowModal(true)} />
              </Tooltip>

              <Tooltip content="Logout">
                <LuLogOut size={20} color="red" onClick={handleLogout} />
              </Tooltip>
            </div>
          </div>

          <div className="mt-5 grid lg:grid-cols-4 grid-cols-1 gap-3">
            {notes &&
              notes.map((note) => <NoteItem key={note._id} note={note} />)}
          </div>
        </div>
      ) : (
        <div className="lg:w-4/5 w-full p-2 lg:p-5 bg-white rounded-xl border-2 shadow-xl">
          <div className="flex justify-center mt-10 lg:mt-10">
            <img
              src="/assets/man_sitting.png"
              alt="welcome"
              className="h-[250px] lg:h-[300px] w-[250px] lg:w-[300px]"
            />
          </div>

          <div className="mt-5 flex justify-center">
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
          </div>
        </div>
      )}
      <AddNote showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default NotesList;

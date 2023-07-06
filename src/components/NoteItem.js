import React from "react";
import { Tooltip } from "flowbite-react";
import { FaTrashAlt } from "react-icons/fa";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useNotesContext } from "../hooks/useNotesContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const NoteItem = ({ note }) => {
  const { dispatch } = useNotesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `https://takenote-server.onrender.com/api/notes/${note._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_NOTE", payload: json });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg w-full h-full p-3 lg:p-5 flex flex-col mb-2">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <Link key={note._id} to={`/dashboard/${note._id}`}>
            <h1 className="font-semibold tracking-wide text-base lg:text-lg">
              {note.title}
            </h1>
          </Link>

          <div className="cursor-pointer">
            <Tooltip content="delete note">
              <FaTrashAlt
                size={15}
                className="text-red-500"
                onClick={handleClick}
              />
            </Tooltip>
          </div>
        </div>
      </div>

      <Link
        className="flex flex-col justify-end lg:justify-between h-full mt-2"
        key={note._id}
        to={`/dashboard/${note._id}`}
      >
        <p className="hidden lg:flex text-gray-500 line-clamp-3">{note.body}</p>

        <div className="flex flex-col lg:flex-row lg:justify-between">
          <p className="text-gray-400 text-sm">
            {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
          </p>

          <p className="text-gray-400 font-semibold text-sm">#{note.label}</p>
        </div>
      </Link>
    </div>
  );
};

export default NoteItem;

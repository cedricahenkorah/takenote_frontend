import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotesContext } from "../hooks/useNotesContext";
import { Badge } from "flowbite-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAuthContext } from "../hooks/useAuthContext";

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, dispatch } = useNotesContext();
  const { user } = useAuthContext();

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch(`/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_NOTE", payload: json });
      }
    };

    if (user) {
      fetchNotes();
    }
  }, [dispatch, id, user]);

  return (
    <div className="min-h-screen lg:px-48 px-5 md:px-10 flex bg-gradient-to-b from-slate-200 to-slate-100 py-10">
      <div className="w-full p-10 bg-white rounded-xl border-2 shadow-xl">
        <div className="mb-5">
          <IoMdArrowRoundBack size={30} onClick={goBack} />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">{notes?.title}</h1>

          <Badge color="warning">{notes?.label}</Badge>
        </div>

        <p className="mt-5">{notes?.body}</p>
      </div>
    </div>
  );
};

export default NoteDetails;

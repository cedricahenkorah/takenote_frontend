import React, { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);

      const response = await fetch(
        `https://takenote-server.onrender.com/api/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_NOTE", payload: json });
      }

      setIsLoading(false);
    };

    if (user) {
      fetchNotes();
    }
  }, [dispatch, id, user]);

  return (
    <div className="min-h-screen lg:px-48 px-5 md:px-10 flex bg-slate-50 py-10">
      <div className="w-full p-10 bg-white rounded-xl shadow-xl">
        {isLoading ? (
          // Content when loading is true
          <>
            <div className="mb-5">
              <IoMdArrowRoundBack size={30} onClick={goBack} />
            </div>

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
          </>
        ) : (
          // Content when loading is false (notes are available)
          <>
            <div className="mb-5">
              <IoMdArrowRoundBack size={30} onClick={goBack} />
            </div>

            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">{notes?.title}</h1>

              <Badge color="warning">{notes?.label}</Badge>
            </div>

            <p className="mt-5">{notes?.body}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteDetails;

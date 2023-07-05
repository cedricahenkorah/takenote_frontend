import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

export const useNotesContext = () => {
  const context = useContext(NotesContext);

  if (!context) {
    throw Error("useNotesContext must be used inside the NotesContextProvider");
  }

  return context;
};

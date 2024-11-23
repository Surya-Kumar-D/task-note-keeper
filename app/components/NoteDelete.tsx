import { BookX } from "lucide-react";
import { Note } from "../types/noteType";
import { deleteNote, revalidateNotes } from "@/utils/actions";
import { useActionState, useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import { InitialState } from "./NoteForm";
import { useFormStatus } from "react-dom";
export const initialState: InitialState = null;
function NoteDelete({ note }: { note: Note }) {
  const [deleteState, deleteAction] = useActionState(deleteNote, initialState);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (deleteState?.status === "failure") {
      toast.error(deleteState.message);
    }
    if (deleteState?.status === "success") {
      toast.success(deleteState.message);
      revalidateNotes();
    }
  }, [deleteState]);

  function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this note?")) {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      startTransition(() => deleteAction(formData));
    }
  }

  return (
    <form onSubmit={handleDelete}>
      <input type="hidden" name="id" value={note.id} />
      <ButtonDelete />
    </form>
  );
}

function ButtonDelete() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-error flex gap-2">
      {!pending ? (
        <>
          <BookX />
          Delete
        </>
      ) : (
        <>
          <span className="loading loading-dots loading-xs"></span>
          Deleting...
        </>
      )}
    </button>
  );
}

export default NoteDelete;

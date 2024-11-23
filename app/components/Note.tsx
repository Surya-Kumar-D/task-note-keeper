"use client";
import { BookX, CircleX, Pencil, Pin, PinOff } from "lucide-react";
import { type Note } from "../types/noteType";
import { InitialState } from "./NoteForm";
import { revalidateNotes, togglePin, updateNote } from "@/utils/actions";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import NotePinToggle from "./NotePinToggle";
import NoteDelete from "./NoteDelete";

export const initialState: InitialState = null;

function Note({ note }: { note: Note }) {
  const [updateState, updateAction] = useActionState(updateNote, initialState);
  const modalId = `modal_${note.id}`;
  useEffect(() => {
    if (updateState?.status === "failure") {
      toast.error(updateState.message);
    }
    if (updateState?.status === "success") {
      toast.success(updateState.message);
      revalidateNotes();
      document?.getElementById(modalId)?.close();
    }
  }, [updateState]);

  return (
    <div className="h-full w-full">
      <button
        className="btn relative min-w-[250px] flex flex-col gap-5 h-full p-[1rem] items-start "
        onClick={() => document?.getElementById(modalId)?.showModal()}
      >
        {note.pinned ? <Pin className="absolute top-0 right-0" /> : null}
        <h2 className="md:text-2xl font-bold">{note.title}</h2>
        <h3 className="md:text-xl font-semibold">{note.tagline}</h3>
        <p>{note.body.slice(0, 100) + "..."}</p>
      </button>
      <dialog id={modalId} className="modal md:text-[1.5rem] ">
        <div className="modal-box box-content p-[4rem]">
          <form className="flex flex-col  gap-5 " action={updateAction}>
            <input type="hidden" name="id" value={note.id} />
            <input type="hidden" name="pinned" value={note.pinned ? 1 : 0} />
            <div className="flex gap-5">
              <label className="w-1/5" htmlFor="title">
                Title
              </label>
              <input
                aria-label="Title of the note"
                className="w-4/5 p-[1rem]"
                type="text"
                id="title"
                name="title"
                defaultValue={note.title}
              />
            </div>
            <div className="flex gap-5">
              <label className="w-1/5" htmlFor="tagline">
                Tagline
              </label>
              <input
                className="w-4/5 p-[1rem]"
                type="text"
                id="tagline"
                name="tagline"
                defaultValue={note.tagline}
                aria-label="Tagline of the note"
              />
            </div>
            <div className="flex gap-5">
              <label className="w-1/5" htmlFor="body">
                Body
              </label>
              <textarea
                className="w-4/5 p-[1rem]"
                id="body"
                name="body"
                defaultValue={note.body}
                aria-label="Body of the note"
              />
            </div>
            <button className="btn btn-primary flex gap-2">
              <Pencil />
              Update
            </button>
          </form>
          <div className="modal-action">
            <NoteDelete note={note} />
            <NotePinToggle note={note} />
            <form method="dialog">
              <button className="btn btn-warning flex gap-2">
                <CircleX />
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Note;

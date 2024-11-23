"use client";

import { revalidateNotes, togglePin } from "@/utils/actions";
import { Loader, Pin, PinOff } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { Note } from "../types/noteType";
import { InitialState } from "./NoteForm";

export const initialState: InitialState = null;

function NotePinToggle({ note }: { note: Note }) {
  const [pinState, pinAction] = useActionState(togglePin, initialState);
  useEffect(() => {
    if (pinState?.status === "failure") {
      toast.error(pinState.message);
    }
    if (pinState?.status === "success") {
      toast.success(pinState.message);
      revalidateNotes();
    }
  }, [pinState]);
  return (
    <form action={pinAction}>
      <input type="hidden" name="id" value={note.id} />
      <input type="hidden" name="pinned" value={note.pinned ? 1 : 0} />
      <ButtonPin note={note} />
    </form>
  );
}

function ButtonPin({ note }: { note: Note }) {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-success flex gap-2">
      {note.pinned && !pending ? (
        <>
          <PinOff />
          Unpin
        </>
      ) : !pending ? (
        <>
          <Pin />
          Pin
        </>
      ) : (
        <>
          <span className="loading loading-dots loading-xs"></span>
          {note.pinned ? "Unpinning..." : "Pinning..."}
        </>
      )}
    </button>
  );
}

export default NotePinToggle;

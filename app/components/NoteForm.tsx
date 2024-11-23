"use client";
import { addNote, revalidateNotes } from "@/utils/actions";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "./Button";

export type InitialState = {
  message: string;
  status: "success" | "failure";
} | null;

export const initialState: InitialState = null;

function NoteForm() {
  const [state, formAction] = useActionState(addNote, initialState);
  useEffect(() => {
    if (state?.status === "failure") {
      toast.error(state.message);
    }
    if (state?.status === "success") {
      toast.success(state.message);
      revalidateNotes();
    }
  }, [state]);
  return (
    <div className="w-full flex items-center justify-center">
      <form
        action={formAction}
        className="flex md:text-[1.5rem] gap-y-5 flex-col  items-center justify-center w-[65%] xl:w-[45%]"
      >
        <label htmlFor="title" className="h-full w-full flex gap-[2rem]  ">
          Title
          <input
            className="border-0 p-[1rem] w-full"
            type="text"
            id="title"
            name="title"
            placeholder="Q4 Meeting..."
            aria-label="Note Title"
          />
        </label>
        <label htmlFor="tagline" className="h-full w-full flex gap-[2rem]  ">
          Tagline
          <input
            className="border-0 p-[1rem] w-full"
            type="text"
            id="tagline"
            name="tagline"
            placeholder="Minutes of the meeting..."
            aria-label="Note Tagline"
          />
        </label>
        <label htmlFor="body" className="h-full w-full flex gap-[2rem] ">
          Body
          <textarea
            className="border-0 p-[1rem] w-full"
            id="body"
            name="body"
            placeholder="Minutes of the meeting..."
            aria-label="Note Tagline"
          />
        </label>
        <Button />
      </form>
    </div>
  );
}

export default NoteForm;

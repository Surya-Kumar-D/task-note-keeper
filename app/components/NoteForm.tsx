"use client";
import { addNote } from "@/utils/actions";
import Button from "./Button";
import { Children } from "react";

function NoteForm() {
  return (
    <div className="w-full flex items-center justify-center">
      <form
        action={addNote}
        className="flex md:text-[2rem] gap-y-5 flex-col  items-center justify-center w-[65%]"
      >
        <label htmlFor="title" className="h-full w-full flex gap-[2rem]  ">
          Title
          <input
            className="border-0 "
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
            className="border-0 w"
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
            className="border-0 w-full"
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

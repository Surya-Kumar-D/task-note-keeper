"use client";
import { Pin } from "lucide-react";
import { type Note } from "../types/noteType";

function Note({ note }: { note: Note }) {
  return (
    <div className="h-full w-full">
      <button
        className="btn relative flex flex-col gap-5 h-full p-[1rem] items-start max-w-[350px]"
        onClick={() => document?.getElementById("my_modal_1")?.showModal()}
      >
        {note.pinned ? <Pin className="absolute top-0 right-0" /> : null}
        <h2 className="text-2xl font-bold">{note.title}</h2>
        <h3 className="text-xl font-semibold">{note.tagline}</h3>
        <p>{note.body.slice(0, 100) + "..."}</p>
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Note;
